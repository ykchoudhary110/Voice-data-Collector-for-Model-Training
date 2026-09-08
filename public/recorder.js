/**
 * Audio Recorder & 16kHz 16-bit Mono PCM WAV Encoder
 * Specifically designed for Edge Machine Learning / Wake-Word Datasets
 */
class EdgeAudioRecorder {
  constructor(options = {}) {
    this.targetSampleRate = options.targetSampleRate || 16000;
    this.audioContext = null;
    this.mediaStream = null;
    this.sourceNode = null;
    this.analyserNode = null;
    this.scriptProcessor = null;
    this.isRecording = false;
    this.recordedBuffers = [];
    this.recordingLength = 0;
    this.actualSampleRate = 44100;
  }

  async initMic() {
    if (this.mediaStream) return true;
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
      return true;
    } catch (err) {
      console.warn("Retrying microphone with basic constraints:", err);
      // Fallback for browsers that reject strict constraints (some mobile phones)
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    }
  }

  startRecording(canvasElement = null) {
    if (this.isRecording) return;
    
    // Create AudioContext
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContextClass();
    this.actualSampleRate = this.audioContext.sampleRate;

    this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream);
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 256;
    this.sourceNode.connect(this.analyserNode);

    // Buffer collection using ScriptProcessorNode for universal browser support
    const bufferSize = 4096;
    this.scriptProcessor = this.audioContext.createScriptProcessor(bufferSize, 1, 1);

    this.recordedBuffers = [];
    this.recordingLength = 0;

    this.scriptProcessor.onaudioprocess = (e) => {
      if (!this.isRecording) return;
      const inputData = e.inputBuffer.getChannelData(0);
      this.recordedBuffers.push(new Float32Array(inputData));
      this.recordingLength += inputData.length;
    };

    this.sourceNode.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.audioContext.destination);

    this.isRecording = true;

    if (canvasElement) {
      this.startVisualizer(canvasElement);
    }
  }

  stopRecording() {
    if (!this.isRecording) return null;
    this.isRecording = false;

    if (this.scriptProcessor && this.sourceNode) {
      this.sourceNode.disconnect();
      this.scriptProcessor.disconnect();
    }

    // Merge Float32 buffers
    const mergedBuffer = new Float32Array(this.recordingLength);
    let offset = 0;
    for (let i = 0; i < this.recordedBuffers.length; i++) {
      mergedBuffer.set(this.recordedBuffers[i], offset);
      offset += this.recordedBuffers[i].length;
    }

    // Resample from actualSampleRate to 16000 Hz
    const resampled16k = this.downsampleTo16k(mergedBuffer, this.actualSampleRate, this.targetSampleRate);

    // Encode to 16-bit Mono PCM WAV
    const wavBlob = this.encodeWAV(resampled16k, this.targetSampleRate);

    return {
      blob: wavBlob,
      duration: (resampled16k.length / this.targetSampleRate).toFixed(2),
      sampleRate: this.targetSampleRate,
      samples: resampled16k.length
    };
  }

  downsampleTo16k(buffer, fromRate, toRate) {
    if (fromRate === toRate) return buffer;
    if (fromRate < toRate) {
      console.warn("Input sample rate lower than target 16kHz!");
      return buffer;
    }

    const sampleRateRatio = fromRate / toRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Float32Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;

    while (offsetResult < result.length) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      // Simple linear interpolation / window average
      let accum = 0;
      let count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
        accum += buffer[i];
        count++;
      }
      result[offsetResult] = count > 0 ? accum / count : 0;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result;
  }

  encodeWAV(samples, sampleRate) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    /* RIFF identifier */
    this.writeString(view, 0, "RIFF");
    /* RIFF chunk length */
    view.setUint32(4, 36 + samples.length * 2, true);
    /* RIFF type */
    this.writeString(view, 8, "WAVE");
    /* format chunk identifier */
    this.writeString(view, 12, "fmt ");
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw PCM) */
    view.setUint16(20, 1, true);
    /* channel count (1 = mono) */
    view.setUint16(22, 1, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sampleRate * blockAlign) */
    view.setUint32(28, sampleRate * 2, true);
    /* block align (channels * bytes per sample) */
    view.setUint16(32, 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    this.writeString(view, 36, "data");
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    // Write PCM 16-bit samples (clamped between -1 and 1)
    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return new Blob([view], { type: "audio/wav" });
  }

  writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  startVisualizer(canvas) {
    const ctx = canvas.getContext("2d");
    const bufferLength = this.analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!this.isRecording) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      requestAnimationFrame(draw);

      this.analyserNode.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;

        // Gradient from cyan to purple
        const r = Math.min(255, 60 + barHeight * 1.5);
        const g = Math.max(80, 220 - barHeight);
        const b = 250;
        ctx.fillStyle = `rgb(${r},${g},${b})`;

        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    draw();
  }

  static blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Remove data:audio/wav;base64, header prefix
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
