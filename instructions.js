/**
 * Preloaded 40 Curated Acoustic & Environmental Instructions
 * Specially formulated for Edge Microcontroller Wake-Word (KWS) Training (<256 KB RAM)
 */
const DEFAULT_INSTRUCTIONS = [
  // --- 1. Distance Variations (Mic Proximity & Reverberation) ---
  {
    id: 1,
    category: "Distance",
    title: "Close Mic Proximity (15-20 cm)",
    instruction: "Hold phone or sit 15-20 cm away from mic. Speak at normal conversational volume.",
    isNegative: false,
    badge: "Proximity"
  },
  {
    id: 2,
    category: "Distance",
    title: "Desktop Distance (50 cm)",
    instruction: "Place device on desk about an arm's length (50 cm) away and speak naturally.",
    isNegative: false,
    badge: "Desk"
  },
  {
    id: 3,
    category: "Distance",
    title: "Room Distance (1.5 Meters)",
    instruction: "Step back 1.5 to 2 meters away from the mic. Speak clearly toward the device.",
    isNegative: false,
    badge: "Medium Range"
  },
  {
    id: 4,
    category: "Distance",
    title: "Far Room Distance (3+ Meters)",
    instruction: "Step across the room (3 meters away). Speak firmly so the mic catches the utterance.",
    isNegative: false,
    badge: "Far Field"
  },

  // --- 2. Volume & Energy Dynamics ---
  {
    id: 5,
    category: "Volume",
    title: "Normal Conversational Tone",
    instruction: "Speak in your everyday, relaxed speaking voice.",
    isNegative: false,
    badge: "Normal"
  },
  {
    id: 6,
    category: "Volume",
    title: "Soft Whisper",
    instruction: "Whisper the keyword softly (quiet room wake-up scenario).",
    isNegative: false,
    badge: "Whisper"
  },
  {
    id: 7,
    category: "Volume",
    title: "Low Volume Murmur",
    instruction: "Speak quietly under your breath at low volume.",
    isNegative: false,
    badge: "Low Vol"
  },
  {
    id: 8,
    category: "Volume",
    title: "Loud & Firm",
    instruction: "Speak loudly, clearly, and authoritatively.",
    isNegative: false,
    badge: "Loud"
  },
  {
    id: 9,
    category: "Volume",
    title: "Shouting / Calling Out",
    instruction: "Call out the keyword loudly as if calling someone from another room.",
    isNegative: false,
    badge: "Shout"
  },
  {
    id: 10,
    category: "Volume",
    title: "Urgent Emergency Tone",
    instruction: "Speak urgently with panic/stress in your voice (emergency trigger).",
    isNegative: false,
    badge: "Urgent"
  },

  // --- 3. Speech Rate & Cadence ---
  {
    id: 11,
    category: "Speed",
    title: "Fast / Rushed Pace",
    instruction: "Say the keyword very quickly in one snappy burst.",
    isNegative: false,
    badge: "Fast"
  },
  {
    id: 12,
    category: "Speed",
    title: "Slow & Deliberate",
    instruction: "Pronounce the keyword slowly, separating the syllables clearly.",
    isNegative: false,
    badge: "Slow"
  },
  {
    id: 13,
    category: "Speed",
    title: "Elongated First Syllable",
    instruction: "Drag out the first syllable (e.g., 'Chhooooo-tu').",
    isNegative: false,
    badge: "Drawn Out"
  },
  {
    id: 14,
    category: "Speed",
    title: "Elongated Ending Syllable",
    instruction: "Drag out the last syllable (e.g., 'Chho-tuuuuu').",
    isNegative: false,
    badge: "Drawn Out"
  },
  {
    id: 15,
    category: "Speed",
    title: "Sharp Staccato",
    instruction: "Speak with a very abrupt, clipped ending.",
    isNegative: false,
    badge: "Staccato"
  },

  // --- 4. Pitch & Intonation Variations ---
  {
    id: 16,
    category: "Pitch",
    title: "Monotone / Flat Pitch",
    instruction: "Speak without any melodic emotion, completely flat tone.",
    isNegative: false,
    badge: "Monotone"
  },
  {
    id: 17,
    category: "Pitch",
    title: "Questioning Pitch (Rising)",
    instruction: "Say it as if asking a question with rising pitch (e.g., 'Chhotu?').",
    isNegative: false,
    badge: "Question"
  },
  {
    id: 18,
    category: "Pitch",
    title: "Exclamation Pitch (Falling)",
    instruction: "Say it firmly as an imperative command (e.g., 'Chhotu!').",
    isNegative: false,
    badge: "Command"
  },
  {
    id: 19,
    category: "Pitch",
    title: "High-Pitched Register",
    instruction: "Speak in a noticeably higher pitch than your normal voice.",
    isNegative: false,
    badge: "High Pitch"
  },
  {
    id: 20,
    category: "Pitch",
    title: "Deep Chest Voice",
    instruction: "Speak in your deepest, low-pitch chest voice.",
    isNegative: false,
    badge: "Deep Voice"
  },
  {
    id: 21,
    category: "Pitch",
    title: "Cheerful Greeting",
    instruction: "Say it warmly with a smile and upbeat energy.",
    isNegative: false,
    badge: "Cheerful"
  },
  {
    id: 22,
    category: "Pitch",
    title: "Tired / Sleepy Voice",
    instruction: "Say it slowly with a drowsy, sleepy morning tone.",
    isNegative: false,
    badge: "Sleepy"
  },

  // --- 5. Direction & Head Angles ---
  {
    id: 23,
    category: "Angle",
    title: "Direct Face-On (0°)",
    instruction: "Look straight directly at the microphone and speak.",
    isNegative: false,
    badge: "Direct"
  },
  {
    id: 24,
    category: "Angle",
    title: "Turned 45° Left",
    instruction: "Turn your head 45 degrees to the left while speaking.",
    isNegative: false,
    badge: "Off-Axis"
  },
  {
    id: 25,
    category: "Angle",
    title: "Turned 45° Right",
    instruction: "Turn your head 45 degrees to the right while speaking.",
    isNegative: false,
    badge: "Off-Axis"
  },
  {
    id: 26,
    category: "Angle",
    title: "Looking Up / Away",
    instruction: "Tilt your head upwards towards the ceiling and speak.",
    isNegative: false,
    badge: "Glancing"
  },

  // --- 6. Environmental Background Noise (Crucial for Robustness) ---
  {
    id: 27,
    category: "Noise",
    title: "Ceiling Fan / AC Noise",
    instruction: "Turn on ceiling fan or AC at high speed and speak the keyword.",
    isNegative: false,
    badge: "Fan Noise"
  },
  {
    id: 28,
    category: "Noise",
    title: "Typing on Keyboard",
    instruction: "Type vigorously on your laptop/keyboard while saying the keyword.",
    isNegative: false,
    badge: "Typing"
  },
  {
    id: 29,
    category: "Noise",
    title: "Music / Video in Background",
    instruction: "Play a YouTube video or music in the background and speak clearly.",
    isNegative: false,
    badge: "Background Music"
  },
  {
    id: 30,
    category: "Noise",
    title: "Background Chatter / Cafe",
    instruction: "Speak while other people are talking or murmuring in the room.",
    isNegative: false,
    badge: "Chatter"
  },
  {
    id: 31,
    category: "Noise",
    title: "Desk Tapping / Paper Rustling",
    instruction: "Tap on the desk or rustle a piece of paper right as you speak.",
    isNegative: false,
    badge: "Impulse Noise"
  },
  {
    id: 32,
    category: "Noise",
    title: "Outdoor / Balcony Ambient",
    instruction: "Record near an open window or balcony with ambient traffic/breeze.",
    isNegative: false,
    badge: "Outdoor"
  },

  // --- 7. Natural Pre/Post Utterances ---
  {
    id: 33,
    category: "Context",
    title: "Spoken After a Breath/Sigh",
    instruction: "Take an audible breath/sigh, then immediately say the keyword.",
    isNegative: false,
    badge: "Sigh"
  },
  {
    id: 34,
    category: "Context",
    title: "Hand Clap Followed by Keyword",
    instruction: "Clap your hands once, then immediately say the keyword.",
    isNegative: false,
    badge: "Transient"
  },
  {
    id: 35,
    category: "Context",
    title: "Embedded in Short Phrase",
    instruction: "Say 'Hey [keyword] please' naturally within the 2-second window.",
    isNegative: false,
    badge: "Conversational"
  },

  // --- 8. Hard Negatives / Confuser Words (Zero False Trigger Training) ---
  {
    id: 36,
    category: "Confuser",
    title: "Say 'Chhota' (Close Vowel Confuser)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'CHHOTA' clearly (do NOT say the keyword).",
    isNegative: true,
    spokenWord: "chhota",
    badge: "Confuser"
  },
  {
    id: 37,
    category: "Confuser",
    title: "Say 'Chhat' (Truncated Confuser)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'CHHAT' sharply.",
    isNegative: true,
    spokenWord: "chhat",
    badge: "Confuser"
  },
  {
    id: 38,
    category: "Confuser",
    title: "Say 'Khatu' (Rhyming Confuser)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'KHATU' clearly.",
    isNegative: true,
    spokenWord: "khatu",
    badge: "Confuser"
  },
  {
    id: 39,
    category: "Confuser",
    title: "Say 'Photo' (Phonetic Confuser)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'PHOTO' clearly.",
    isNegative: true,
    spokenWord: "photo",
    badge: "Confuser"
  },
  {
    id: 40,
    category: "Confuser",
    title: "Say 'Bhotu' (Consonant Confuser)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'BHOTU' clearly.",
    isNegative: true,
    spokenWord: "bhotu",
    badge: "Confuser"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_INSTRUCTIONS };
}
