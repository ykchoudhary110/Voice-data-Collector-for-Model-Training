/**
 * 45 Curated Acoustic & Environmental Instructions for "VIKRAM" Wake-Word
 * Designed for Microcontroller Edge AI (<256 KB RAM, <10% CPU)
 */
const DEFAULT_KEYWORD = "vikram";

const DEFAULT_INSTRUCTIONS = [
  // --- 1. Distance & Proximity Scenarios ---
  {
    id: 1,
    category: "Distance",
    title: "Close Mic Proximity (15 cm)",
    instruction: "Hold phone or sit 15-20 cm directly in front of the mic. Speak at normal conversational volume.",
    isNegative: false,
    badge: "Proximity",
    icon: "📱",
    visualScene: "Holding device in hand, 15cm from mouth",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    id: 2,
    category: "Distance",
    title: "Desktop Arm's Length (50 cm)",
    instruction: "Place device on desk about arm's length (50 cm) away. Speak naturally looking at the screen.",
    isNegative: false,
    badge: "Desk",
    icon: "🖥️",
    visualScene: "Laptop / edge sensor on a work desk",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: 3,
    category: "Distance",
    title: "Room Distance (1.5 - 2 Meters)",
    instruction: "Stand 1.5 to 2 meters away from the microphone. Speak clearly toward the device.",
    isNegative: false,
    badge: "Medium Range",
    icon: "🚶",
    visualScene: "Standing in middle of the room speaking to device",
    color: "from-teal-500/20 to-emerald-500/20"
  },
  {
    id: 4,
    category: "Distance",
    title: "Far Field (3+ Meters)",
    instruction: "Step across the room (3 meters away). Speak firmly so the mic captures the reverberant acoustic signal.",
    isNegative: false,
    badge: "Far Field",
    icon: "🚪",
    visualScene: "Calling out from near the doorway / across room",
    color: "from-purple-500/20 to-indigo-500/20"
  },

  // --- 2. Volume & Energy Dynamics ---
  {
    id: 5,
    category: "Volume",
    title: "Normal Conversational Tone",
    instruction: "Say 'Vikram' in your everyday, casual speaking voice.",
    isNegative: false,
    badge: "Normal",
    icon: "🗣️",
    visualScene: "Standard conversational volume",
    color: "from-slate-500/20 to-slate-700/20"
  },
  {
    id: 6,
    category: "Volume",
    title: "Soft Whisper (Stealth Trigger)",
    instruction: "Whisper 'Vikram' softly into the mic (quiet night / bedside trigger).",
    isNegative: false,
    badge: "Whisper",
    icon: "🤫",
    visualScene: "Whispering quietly in a library or bedroom",
    color: "from-violet-500/20 to-purple-500/20"
  },
  {
    id: 7,
    category: "Volume",
    title: "Low Volume Murmur",
    instruction: "Speak under your breath at very low volume without fully whispering.",
    isNegative: false,
    badge: "Low Vol",
    icon: "🔉",
    visualScene: "Muttering quietly while focused",
    color: "from-indigo-500/20 to-blue-500/20"
  },
  {
    id: 8,
    category: "Volume",
    title: "Loud & Authoritative Command",
    instruction: "Speak loudly, clearly, and authoritatively: 'VIKRAM!'",
    isNegative: false,
    badge: "Loud",
    icon: "📢",
    visualScene: "Giving a clear military or smart device command",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: 9,
    category: "Volume",
    title: "Calling Out / Shouting",
    instruction: "Call out 'Vikram!' loudly as if calling across a noisy hall.",
    isNegative: false,
    badge: "Shout",
    icon: "📣",
    visualScene: "Shouting across a room or outdoor courtyard",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    id: 10,
    category: "Volume",
    title: "Urgent SOS / Emergency Tone",
    instruction: "Say 'Vikram!' with panic and urgent adrenaline in your voice.",
    isNegative: false,
    badge: "Urgent",
    icon: "🚨",
    visualScene: "Emergency wake-up in a distress situation",
    color: "from-rose-500/20 to-red-500/20"
  },

  // --- 3. Speech Rate & Cadence ---
  {
    id: 11,
    category: "Speed",
    title: "Fast / Rushed Pace",
    instruction: "Snap out 'Vikram' very quickly in one rapid burst.",
    isNegative: false,
    badge: "Fast",
    icon: "⚡",
    visualScene: "In a hurry, quick command burst",
    color: "from-yellow-500/20 to-amber-500/20"
  },
  {
    id: 12,
    category: "Speed",
    title: "Slow & Deliberate",
    instruction: "Pronounce clearly: 'Vik - ram', accentuating both syllables.",
    isNegative: false,
    badge: "Slow",
    icon: "🐢",
    visualScene: "Speaking very deliberately and slowly",
    color: "from-sky-500/20 to-cyan-500/20"
  },
  {
    id: 13,
    category: "Speed",
    title: "Elongated First Syllable",
    instruction: "Drag out the first syllable: 'Viiiiiik-ram'.",
    isNegative: false,
    badge: "Drawn Out",
    icon: "〰️",
    visualScene: "Hesitant or dragging the initial vowel",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: 14,
    category: "Speed",
    title: "Elongated Ending Syllable",
    instruction: "Drag out the ending: 'Vik-raaaam'.",
    isNegative: false,
    badge: "Drawn Out",
    icon: "🔊",
    visualScene: "Calling out singing or dragging the last syllable",
    color: "from-fuchsia-500/20 to-pink-500/20"
  },
  {
    id: 15,
    category: "Speed",
    title: "Sharp Staccato Stop",
    instruction: "Say 'Vikram' with a sudden, sharp, clipped stop at the end.",
    isNegative: false,
    badge: "Staccato",
    icon: "✂️",
    visualScene: "Abrupt, crisp military-style stop",
    color: "from-emerald-500/20 to-teal-500/20"
  },

  // --- 4. Pitch & Intonation Variations ---
  {
    id: 16,
    category: "Pitch",
    title: "Flat Monotone",
    instruction: "Speak robotic, without any musical pitch inflection.",
    isNegative: false,
    badge: "Monotone",
    icon: "🤖",
    visualScene: "Flat robotic expressionless voice",
    color: "from-slate-500/20 to-zinc-500/20"
  },
  {
    id: 17,
    category: "Pitch",
    title: "Inquisitive / Questioning (Rising)",
    instruction: "Say it as if asking: 'Vikram?' (rising pitch at the end).",
    isNegative: false,
    badge: "Question",
    icon: "❓",
    visualScene: "Checking if someone is there: 'Vikram?'",
    color: "from-amber-500/20 to-yellow-500/20"
  },
  {
    id: 18,
    category: "Pitch",
    title: "Firm Exclamation (Falling)",
    instruction: "Say it with falling emphatic pitch: 'Vikram!'",
    isNegative: false,
    badge: "Command",
    icon: "❗",
    visualScene: "Decisive triggering command",
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    id: 19,
    category: "Pitch",
    title: "High-Pitched Register",
    instruction: "Speak in a noticeably higher pitch than your normal voice.",
    isNegative: false,
    badge: "High Pitch",
    icon: "🎶",
    visualScene: "High vocal register (child/female pitch simulation)",
    color: "from-cyan-500/20 to-sky-500/20"
  },
  {
    id: 20,
    category: "Pitch",
    title: "Deep Chest Resonant Voice",
    instruction: "Speak in your deepest, lowest pitch chest resonance.",
    isNegative: false,
    badge: "Deep Voice",
    icon: "🎙️",
    visualScene: "Deep baritone / bass vocal tone",
    color: "from-indigo-500/20 to-purple-500/20"
  },
  {
    id: 21,
    category: "Pitch",
    title: "Warm & Cheerful Greeting",
    instruction: "Say 'Vikram' warmly with a friendly smile in your voice.",
    isNegative: false,
    badge: "Cheerful",
    icon: "😊",
    visualScene: "Friendly morning greeting to assistant",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: 22,
    category: "Pitch",
    title: "Sleepy / Drowsy Morning Voice",
    instruction: "Say it as if just waking up, raspy and half-asleep.",
    isNegative: false,
    badge: "Sleepy",
    icon: "🥱",
    visualScene: "Waking up in bed triggering alarm / lights",
    color: "from-indigo-500/20 to-slate-500/20"
  },

  // --- 5. Head Orientations & Angles ---
  {
    id: 23,
    category: "Angle",
    title: "Direct On-Axis (0°)",
    instruction: "Face directly into the microphone.",
    isNegative: false,
    badge: "Direct",
    icon: "🎯",
    visualScene: "Straight line of sight to microphone",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    id: 24,
    category: "Angle",
    title: "Turned 45° Left",
    instruction: "Turn your head 45 degrees to the left while speaking.",
    isNegative: false,
    badge: "Off-Axis",
    icon: "↖️",
    visualScene: "Head turned away towards left monitor / person",
    color: "from-slate-500/20 to-blue-500/20"
  },
  {
    id: 25,
    category: "Angle",
    title: "Turned 45° Right",
    instruction: "Turn your head 45 degrees to the right while speaking.",
    isNegative: false,
    badge: "Off-Axis",
    icon: "↗️",
    visualScene: "Head turned away towards right side",
    color: "from-slate-500/20 to-blue-500/20"
  },
  {
    id: 26,
    category: "Angle",
    title: "Looking Up / Away",
    instruction: "Tilt your head up towards the ceiling while speaking.",
    isNegative: false,
    badge: "Glancing",
    icon: "⬆️",
    visualScene: "Looking up while device sits on a lower table",
    color: "from-slate-500/20 to-teal-500/20"
  },

  // --- 6. Environmental Background Noise Scenarios ---
  {
    id: 27,
    category: "Noise",
    title: "Ceiling Fan / AC Noise",
    instruction: "Turn on high-speed fan or AC, sit under it and say 'Vikram'.",
    isNegative: false,
    badge: "Fan Noise",
    icon: "🌪️",
    visualScene: "Fan / blower blowing air current noise",
    color: "from-cyan-500/20 to-slate-500/20"
  },
  {
    id: 28,
    category: "Noise",
    title: "Mechanical Keyboard Typing",
    instruction: "Type rapidly on your keyboard while saying 'Vikram'.",
    isNegative: false,
    badge: "Typing",
    icon: "⌨️",
    visualScene: "Typing keystrokes happening simultaneously",
    color: "from-amber-500/20 to-slate-500/20"
  },
  {
    id: 29,
    category: "Noise",
    title: "Background Music / TV Playing",
    instruction: "Play music or a YouTube video at medium volume and say 'Vikram'.",
    isNegative: false,
    badge: "Media Noise",
    icon: "📺",
    visualScene: "TV or speaker playing audio nearby",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 30,
    category: "Noise",
    title: "Background Room Chatter / Cafe",
    instruction: "Say 'Vikram' while other people are talking or chatting in room.",
    isNegative: false,
    badge: "Chatter",
    icon: "☕",
    visualScene: "Cafe or shared office room with murmur",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    id: 31,
    category: "Noise",
    title: "Impulse Noise (Desk Tap / Rustling)",
    instruction: "Tap on the desk or rustle paper at the exact moment you say 'Vikram'.",
    isNegative: false,
    badge: "Impulse",
    icon: "📄",
    visualScene: "Desk banging, shuffling books or papers",
    color: "from-red-500/20 to-rose-500/20"
  },
  {
    id: 32,
    category: "Noise",
    title: "Outdoor / Balcony Traffic Ambient",
    instruction: "Record near an open window/balcony with ambient traffic.",
    isNegative: false,
    badge: "Outdoor",
    icon: "🚗",
    visualScene: "Street sounds, honking, outdoor wind",
    color: "from-emerald-500/20 to-cyan-500/20"
  },

  // --- 7. Conversational Embedding & Natural Pauses ---
  {
    id: 33,
    category: "Context",
    title: "After an Audible Breath / Sigh",
    instruction: "Inhale or sigh audibly, then immediately say 'Vikram'.",
    isNegative: false,
    badge: "Sigh",
    icon: "💨",
    visualScene: "Heavy breath before waking assistant",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    id: 34,
    category: "Context",
    title: "Hand Clap Followed by Keyword",
    instruction: "Clap hands once, then immediately say 'Vikram'.",
    isNegative: false,
    badge: "Transient",
    icon: "👏",
    visualScene: "Sharp impulse sound preceding the wake word",
    color: "from-amber-500/20 to-yellow-500/20"
  },
  {
    id: 35,
    category: "Context",
    title: "Natural Phrase: 'Hey Vikram'",
    instruction: "Say 'Hey Vikram' naturally in one smooth phrase.",
    isNegative: false,
    badge: "Hey Vikram",
    icon: "👋",
    visualScene: "Casual prefix before the main wake word",
    color: "from-indigo-500/20 to-purple-500/20"
  },
  {
    id: 36,
    category: "Context",
    title: "Continuous Phrase: 'Vikram listen'",
    instruction: "Say 'Vikram listen' smoothly without pausing between words.",
    isNegative: false,
    badge: "Command Follow",
    icon: "👂",
    visualScene: "Wake word flowing directly into command",
    color: "from-teal-500/20 to-emerald-500/20"
  },

  // --- 8. CRITICAL HARD NEGATIVES & CONFUSERS FOR 'VIKRAM' ---
  // Micro-transformers will falsely trigger on these unless trained on them!
  {
    id: 37,
    category: "Confuser",
    title: "Say 'Vishram' (Common Hindi Word)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VISHRAM' (meaning rest). Do NOT say Vikram!",
    isNegative: true,
    spokenWord: "vishram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Rhyming word 'Vishram' (to stop false trigger)",
    color: "from-rose-500/30 to-red-600/30"
  },
  {
    id: 38,
    category: "Confuser",
    title: "Say 'Vikrant' (Same Prefix 'Vikr-')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VIKRANT' clearly (do NOT say Vikram).",
    isNegative: true,
    spokenWord: "vikrant",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Shares identical 70% phoneme prefix 'Vikr-'",
    color: "from-rose-500/30 to-red-600/30"
  },
  {
    id: 39,
    category: "Confuser",
    title: "Say 'Vikas' (Same Prefix 'Vik-')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VIKAS' clearly.",
    isNegative: true,
    spokenWord: "vikas",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Common name sharing the 'Vik-' syllable",
    color: "from-rose-500/30 to-red-600/30"
  },
  {
    id: 40,
    category: "Confuser",
    title: "Say 'Bikram' (Regional 'B' Plosive)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'BIKRAM' with a distinct 'B' sound.",
    isNegative: true,
    spokenWord: "bikram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Tests model discrimination between V and B",
    color: "from-rose-500/30 to-red-600/30"
  },
  {
    id: 41,
    category: "Confuser",
    title: "Say 'Viram' (Shares '-ram' Suffix)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VIRAM' (pause) clearly.",
    isNegative: true,
    spokenWord: "viram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Missing the 'k' consonant cluster",
    color: "from-rose-500/30 to-red-600/30"
  },
  {
    id: 42,
    category: "Confuser",
    title: "Say 'Kram' (Sub-word in Vikram)",
    instruction: "CRITICAL HARD NEGATIVE: Speak only 'KRAM' sharply.",
    isNegative: true,
    spokenWord: "kram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Second half sub-word alone",
    color: "from-rose-500/30 to-red-600/30"
  },
  {
    id: 43,
    category: "Confuser",
    title: "Say 'Shram' (Rhyming Confuser)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'SHRAM' (effort/labour) clearly.",
    isNegative: true,
    spokenWord: "shram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Rhyming one-syllable confuser",
    color: "from-rose-500/30 to-red-600/30"
  },
  {
    id: 44,
    category: "Confuser",
    title: "Say 'Parakram' (Embedded Word)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'PARAKRAM' (valor).",
    isNegative: true,
    spokenWord: "parakram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Word containing '-kram' inside a larger word",
    color: "from-rose-500/30 to-red-600/30"
  },
  {
    id: 45,
    category: "Confuser",
    title: "Say Random Words / Silence",
    instruction: "CRITICAL NEGATIVE: Say 'Hello Google' or random conversation.",
    isNegative: true,
    spokenWord: "hello there",
    badge: "General Negative",
    icon: "🛑",
    visualScene: "General out-of-vocabulary speech sample",
    color: "from-rose-500/30 to-red-600/30"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_KEYWORD, DEFAULT_INSTRUCTIONS };
}
