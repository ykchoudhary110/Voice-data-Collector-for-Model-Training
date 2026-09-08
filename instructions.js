/**
 * Comprehensive Edge AI Wake-Word Training Dataset (65 Curated Instructions)
 * Target Keyword: "VIKRAM"
 * Designed for Microcontroller Edge AI (<256 KB RAM, <10% CPU usage)
 */
const DEFAULT_KEYWORD = "vikram";

const DEFAULT_INSTRUCTIONS = [
  // ==========================================
  // SECTION 1: DISTANCE & ACOUSTIC PROXIMITY (1-6)
  // ==========================================
  {
    id: 1,
    category: "Distance",
    title: "Close Mic Proximity (15 cm)",
    instruction: "Hold phone or sit 15-20 cm directly in front of the mic. Speak at normal conversational volume.",
    isNegative: false,
    badge: "Proximity",
    icon: "📱",
    visualScene: "Holding device in hand, 15cm from mouth"
  },
  {
    id: 2,
    category: "Distance",
    title: "Ultra Close Mic (5 cm)",
    instruction: "Hold phone right next to your lips (5 cm) and speak softly without clipping.",
    isNegative: false,
    badge: "Ultra Close",
    icon: "🎙️",
    visualScene: "Speaking directly into the microphone grille"
  },
  {
    id: 3,
    category: "Distance",
    title: "Desktop Arm's Length (50 cm)",
    instruction: "Place device on desk about arm's length (50 cm) away. Speak naturally looking at screen.",
    isNegative: false,
    badge: "Desk",
    icon: "🖥️",
    visualScene: "Laptop / edge sensor on a work desk"
  },
  {
    id: 4,
    category: "Distance",
    title: "Room Distance (1.5 - 2 Meters)",
    instruction: "Stand 1.5 to 2 meters away from the microphone. Speak clearly toward the device.",
    isNegative: false,
    badge: "Medium Range",
    icon: "🚶",
    visualScene: "Standing in middle of the room speaking to device"
  },
  {
    id: 5,
    category: "Distance",
    title: "Far Field (3+ Meters)",
    instruction: "Step across the room (3 meters away). Speak firmly so the mic captures the reverberant signal.",
    isNegative: false,
    badge: "Far Field",
    icon: "🚪",
    visualScene: "Calling out from near the doorway / across room"
  },
  {
    id: 6,
    category: "Distance",
    title: "Behind Obstacle / Corner",
    instruction: "Speak from behind an open door or around a corner (non-line-of-sight acoustic reflection).",
    isNegative: false,
    badge: "Non-LOS",
    icon: "🧱",
    visualScene: "Speaking around a partition or corner"
  },

  // ==========================================
  // SECTION 2: VOLUME & ENERGY DYNAMICS (7-13)
  // ==========================================
  {
    id: 7,
    category: "Volume",
    title: "Normal Conversational Tone",
    instruction: "Say 'Vikram' in your everyday, casual speaking voice.",
    isNegative: false,
    badge: "Normal",
    icon: "🗣️",
    visualScene: "Standard conversational volume"
  },
  {
    id: 8,
    category: "Volume",
    title: "Soft Whisper (Stealth Trigger)",
    instruction: "Whisper 'Vikram' softly into the mic (quiet night / bedside trigger).",
    isNegative: false,
    badge: "Whisper",
    icon: "🤫",
    visualScene: "Whispering quietly in a library or bedroom"
  },
  {
    id: 9,
    category: "Volume",
    title: "Low Volume Murmur",
    instruction: "Speak under your breath at very low volume without whispering.",
    isNegative: false,
    badge: "Low Vol",
    icon: "🔉",
    visualScene: "Muttering quietly while focused"
  },
  {
    id: 10,
    category: "Volume",
    title: "Loud & Authoritative Command",
    instruction: "Speak loudly, clearly, and authoritatively: 'VIKRAM!'",
    isNegative: false,
    badge: "Loud",
    icon: "📢",
    visualScene: "Giving a clear military or device command"
  },
  {
    id: 11,
    category: "Volume",
    title: "Calling Out / Shouting",
    instruction: "Call out 'Vikram!' loudly as if calling across a noisy hall.",
    isNegative: false,
    badge: "Shout",
    icon: "📣",
    visualScene: "Shouting across a room or courtyard"
  },
  {
    id: 12,
    category: "Volume",
    title: "Urgent SOS / Emergency Tone",
    instruction: "Say 'Vikram!' with panic and urgent adrenaline in your voice.",
    isNegative: false,
    badge: "Urgent",
    icon: "🚨",
    visualScene: "Emergency wake-up in a distress situation"
  },
  {
    id: 13,
    category: "Volume",
    title: "Firm & Stern Voice",
    instruction: "Say 'Vikram' strictly and firmly as if commanding a robot.",
    isNegative: false,
    badge: "Stern",
    icon: "⚖️",
    visualScene: "Stern disciplinary or robotic instruction"
  },

  // ==========================================
  // SECTION 3: SPEECH RATE & CADENCE (14-19)
  // ==========================================
  {
    id: 14,
    category: "Speed",
    title: "Fast / Rushed Pace",
    instruction: "Snap out 'Vikram' very quickly in one rapid burst.",
    isNegative: false,
    badge: "Fast",
    icon: "⚡",
    visualScene: "In a hurry, quick command burst"
  },
  {
    id: 15,
    category: "Speed",
    title: "Slow & Deliberate",
    instruction: "Pronounce clearly: 'Vik - ram', accentuating both syllables.",
    isNegative: false,
    badge: "Slow",
    icon: "🐢",
    visualScene: "Speaking deliberately and slowly"
  },
  {
    id: 16,
    category: "Speed",
    title: "Elongated First Syllable",
    instruction: "Drag out the first syllable: 'Viiiiiik-ram'.",
    isNegative: false,
    badge: "Drawn Out",
    icon: "〰️",
    visualScene: "Hesitant or dragging the initial vowel"
  },
  {
    id: 17,
    category: "Speed",
    title: "Elongated Ending Syllable",
    instruction: "Drag out the ending: 'Vik-raaaam'.",
    isNegative: false,
    badge: "Drawn Out",
    icon: "🔊",
    visualScene: "Calling out singing or dragging the last syllable"
  },
  {
    id: 18,
    category: "Speed",
    title: "Sharp Staccato Stop",
    instruction: "Say 'Vikram' with a sudden, sharp, clipped stop at the end.",
    isNegative: false,
    badge: "Staccato",
    icon: "✂️",
    visualScene: "Abrupt, crisp military-style stop"
  },
  {
    id: 19,
    category: "Speed",
    title: "Double Stutter Utterance",
    instruction: "Say 'Vik-Vikram' with a slight initial stumble.",
    isNegative: false,
    badge: "Hesitation",
    icon: "🔁",
    visualScene: "Natural hesitation before completing the word"
  },

  // ==========================================
  // SECTION 4: PITCH & INTONATION VARIATIONS (20-26)
  // ==========================================
  {
    id: 20,
    category: "Pitch",
    title: "Flat Monotone",
    instruction: "Speak robotic, without any musical pitch inflection.",
    isNegative: false,
    badge: "Monotone",
    icon: "🤖",
    visualScene: "Flat robotic expressionless voice"
  },
  {
    id: 21,
    category: "Pitch",
    title: "Inquisitive / Questioning (Rising)",
    instruction: "Say it as if asking: 'Vikram?' (rising pitch at the end).",
    isNegative: false,
    badge: "Question",
    icon: "❓",
    visualScene: "Checking if someone is there: 'Vikram?'"
  },
  {
    id: 22,
    category: "Pitch",
    title: "Firm Exclamation (Falling)",
    instruction: "Say it with falling emphatic pitch: 'Vikram!'",
    isNegative: false,
    badge: "Command",
    icon: "❗",
    visualScene: "Decisive triggering command"
  },
  {
    id: 23,
    category: "Pitch",
    title: "High-Pitched Register",
    instruction: "Speak in a noticeably higher pitch than your normal voice.",
    isNegative: false,
    badge: "High Pitch",
    icon: "🎶",
    visualScene: "High vocal register (simulates child/female pitch)"
  },
  {
    id: 24,
    category: "Pitch",
    title: "Deep Chest Resonant Voice",
    instruction: "Speak in your deepest, lowest pitch chest resonance.",
    isNegative: false,
    badge: "Deep Voice",
    icon: "🎙️",
    visualScene: "Deep baritone / bass vocal tone"
  },
  {
    id: 25,
    category: "Pitch",
    title: "Warm & Cheerful Greeting",
    instruction: "Say 'Vikram' warmly with a friendly smile in your voice.",
    isNegative: false,
    badge: "Cheerful",
    icon: "😊",
    visualScene: "Friendly morning greeting to assistant"
  },
  {
    id: 26,
    category: "Pitch",
    title: "Sleepy / Drowsy Morning Voice",
    instruction: "Say it as if just waking up, raspy and half-asleep.",
    isNegative: false,
    badge: "Sleepy",
    icon: "🥱",
    visualScene: "Waking up in bed triggering alarm / lights"
  },

  // ==========================================
  // SECTION 5: PHYSICAL STATES & MASK / OCCLUSION (27-31)
  // ==========================================
  {
    id: 27,
    category: "Physical",
    title: "Wearing Face Mask / Covering",
    instruction: "Speak while wearing a mask or holding a cloth over your mouth (acoustic high-frequency dampening).",
    isNegative: false,
    badge: "Mask On",
    icon: "😷",
    visualScene: "Mask / scarf muffling higher frequencies"
  },
  {
    id: 28,
    category: "Physical",
    title: "Lightly Out of Breath / Panting",
    instruction: "Jog in place for 5 seconds, then say 'Vikram' while breathing heavily.",
    isNegative: false,
    badge: "Panting",
    icon: "🏃",
    visualScene: "Speaking while walking upstairs or jogging"
  },
  {
    id: 29,
    category: "Physical",
    title: "While Chewing / Eating",
    instruction: "Speak while chewing a snack (mouth shape acoustic variation).",
    isNegative: false,
    badge: "Chewing",
    icon: "🥪",
    visualScene: "Speaking during a meal or snack"
  },
  {
    id: 30,
    category: "Physical",
    title: "Speaking into a Cup / Mug",
    instruction: "Hold a cup or mug near your mouth while saying 'Vikram' (resonator cavity effect).",
    isNegative: false,
    badge: "Resonance",
    icon: "☕",
    visualScene: "Drinking coffee while issuing command"
  },
  {
    id: 31,
    category: "Physical",
    title: "Head Turned 45° Left & Right",
    instruction: "Turn your head away from the microphone and say 'Vikram'.",
    isNegative: false,
    badge: "Off-Axis",
    icon: "↔️",
    visualScene: "Head facing sideways towards a second monitor"
  },

  // ==========================================
  // SECTION 6: REAL-WORLD ENVIRONMENTAL NOISE (32-38)
  // ==========================================
  {
    id: 32,
    category: "Noise",
    title: "Ceiling Fan / AC on High Speed",
    instruction: "Sit under a high-speed fan or AC blower and say 'Vikram'.",
    isNegative: false,
    badge: "Fan Noise",
    icon: "🌪️",
    visualScene: "Air turbulence and motor hum"
  },
  {
    id: 33,
    category: "Noise",
    title: "Mechanical Keyboard Typing",
    instruction: "Type vigorously on your keyboard while saying 'Vikram'.",
    isNegative: false,
    badge: "Typing",
    icon: "⌨️",
    visualScene: "Clicking mechanical keys simultaneously"
  },
  {
    id: 34,
    category: "Noise",
    title: "Background Music / TV Audio",
    instruction: "Play music or YouTube video in the background and say 'Vikram'.",
    isNegative: false,
    badge: "Media Noise",
    icon: "📺",
    visualScene: "TV or song playing in room"
  },
  {
    id: 35,
    category: "Noise",
    title: "Room Chatter / Cafe Murmur",
    instruction: "Speak while friends/colleagues are chatting nearby.",
    isNegative: false,
    badge: "Chatter",
    icon: "👥",
    visualScene: "Shared room or cafe environment"
  },
  {
    id: 36,
    category: "Noise",
    title: "Impulse Noise (Desk Tap / Utensils)",
    instruction: "Tap on desk or clink a glass/spoon at the moment you say 'Vikram'.",
    isNegative: false,
    badge: "Impulse",
    icon: "🥄",
    visualScene: "Kitchen utensils or desk clatter"
  },
  {
    id: 37,
    category: "Noise",
    title: "Balcony / Street Traffic Ambient",
    instruction: "Record near an open window with street vehicle traffic.",
    isNegative: false,
    badge: "Outdoor",
    icon: "🚗",
    visualScene: "Traffic, horns, and street noise"
  },
  {
    id: 38,
    category: "Noise",
    title: "Water Tap Running",
    instruction: "Turn on sink faucet / water tap and say 'Vikram'.",
    isNegative: false,
    badge: "Water Flow",
    icon: "🚰",
    visualScene: "Running water white-noise interference"
  },

  // ==========================================
  // SECTION 7: CONTEXTUAL PHRASE EMBEDDINGS (39-42)
  // ==========================================
  {
    id: 39,
    category: "Context",
    title: "Prefix Phrase: 'Hey Vikram'",
    instruction: "Say 'Hey Vikram' smoothly in one breath.",
    isNegative: false,
    badge: "Hey Vikram",
    icon: "👋",
    visualScene: "Common natural greeting prefix"
  },
  {
    id: 40,
    category: "Context",
    title: "Prefix Phrase: 'OK Vikram'",
    instruction: "Say 'OK Vikram' naturally.",
    isNegative: false,
    badge: "OK Vikram",
    icon: "👌",
    visualScene: "Assistant trigger prefix"
  },
  {
    id: 41,
    category: "Context",
    title: "Follow-Up: 'Vikram start'",
    instruction: "Say 'Vikram start' without pause between words.",
    isNegative: false,
    badge: "Follow-Up",
    icon: "▶️",
    visualScene: "Wake word flowing into trigger action"
  },
  {
    id: 42,
    category: "Context",
    title: "Sentence Embedded: 'Please Vikram'",
    instruction: "Say 'Please Vikram' naturally.",
    isNegative: false,
    badge: "Embedded",
    icon: "💬",
    visualScene: "Wake word preceded by conversational word"
  },

  // ==========================================
  // SECTION 8: PURE NOISE & SILENCE SAMPLES (43-46)
  // Essential for the background/noise training class!
  // ==========================================
  {
    id: 43,
    category: "Background",
    title: "Pure Room Silence / Ambient",
    instruction: "CRITICAL: Do NOT speak at all. Record 1.8 seconds of room silence.",
    isNegative: true,
    spokenWord: "[ ROOM SILENCE ]",
    badge: "Pure Silence",
    icon: "🤫",
    visualScene: "Baseline room silence / noise floor"
  },
  {
    id: 44,
    category: "Background",
    title: "Fan / AC Noise Only (No Speech)",
    instruction: "CRITICAL: Do NOT speak. Record fan or AC running alone.",
    isNegative: true,
    spokenWord: "[ FAN NOISE ONLY ]",
    badge: "Fan Background",
    icon: "🌪️",
    visualScene: "Pure fan noise for negative noise class"
  },
  {
    id: 45,
    category: "Background",
    title: "Keyboard Typing Only (No Speech)",
    instruction: "CRITICAL: Do NOT speak. Just type on your keyboard for 1.8 seconds.",
    isNegative: true,
    spokenWord: "[ TYPING NOISE ONLY ]",
    badge: "Typing Background",
    icon: "⌨️",
    visualScene: "Pure keyboard clicks"
  },
  {
    id: 46,
    category: "Background",
    title: "Coughing / Throat Clearing",
    instruction: "CRITICAL: Cough or clear your throat naturally into the mic.",
    isNegative: true,
    spokenWord: "[ COUGH / CLEAR THROAT ]",
    badge: "Throat Noise",
    icon: "🤧",
    visualScene: "Human biological non-speech transient"
  },

  // ==========================================
  // SECTION 9: EXTENSIVE HARD NEGATIVES & CONFUSERS (47-65)
  // Crucial: Edge micro-transformers false-trigger on these unless trained!
  // ==========================================
  {
    id: 47,
    category: "Confuser",
    title: "Say 'Vishram' (Identical Cadence)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VISHRAM' (meaning rest). Do NOT say Vikram!",
    isNegative: true,
    spokenWord: "vishram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Rhyming word 'Vishram' (to stop false trigger)"
  },
  {
    id: 48,
    category: "Confuser",
    title: "Say 'Vikrant' (Same Prefix 'Vikr-')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VIKRANT' clearly (do NOT say Vikram).",
    isNegative: true,
    spokenWord: "vikrant",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Shares 70% phoneme prefix 'Vikr-'"
  },
  {
    id: 49,
    category: "Confuser",
    title: "Say 'Vikas' (Same Prefix 'Vik-')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VIKAS' clearly.",
    isNegative: true,
    spokenWord: "vikas",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Common name sharing the 'Vik-' syllable"
  },
  {
    id: 50,
    category: "Confuser",
    title: "Say 'Bikram' (Plosive 'B' Variation)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'BIKRAM' with a distinct 'B' sound.",
    isNegative: true,
    spokenWord: "bikram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Tests model discrimination between V and B"
  },
  {
    id: 51,
    category: "Confuser",
    title: "Say 'Viram' (Shares '-ram' Suffix)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VIRAM' (pause) clearly.",
    isNegative: true,
    spokenWord: "viram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Missing the 'k' consonant cluster"
  },
  {
    id: 52,
    category: "Confuser",
    title: "Say 'Kram' (Second Syllable Alone)",
    instruction: "CRITICAL HARD NEGATIVE: Speak only 'KRAM' sharply.",
    isNegative: true,
    spokenWord: "kram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Second half sub-word alone"
  },
  {
    id: 53,
    category: "Confuser",
    title: "Say 'Shram' (Rhyming Confuser)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'SHRAM' (effort/labour) clearly.",
    isNegative: true,
    spokenWord: "shram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Rhyming one-syllable confuser"
  },
  {
    id: 54,
    category: "Confuser",
    title: "Say 'Parakram' (Embedded Word)",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'PARAKRAM' (valor).",
    isNegative: true,
    spokenWord: "parakram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Word containing '-kram' inside a larger word"
  },
  {
    id: 55,
    category: "Confuser",
    title: "Say 'Vikral' (Formidable - 'Vikr-')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VIKRAL' clearly.",
    isNegative: true,
    spokenWord: "vikral",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Word sharing initial 'Vikr-' with different ending"
  },
  {
    id: 56,
    category: "Confuser",
    title: "Say 'Vikrit' (Distorted - 'Vikr-')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VIKRIT' clearly.",
    isNegative: true,
    spokenWord: "vikrit",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Shares 'Vikr-' with dental ending"
  },
  {
    id: 57,
    category: "Confuser",
    title: "Say 'Vigyan' (Science - 'Vi-')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VIGYAN' clearly.",
    isNegative: true,
    spokenWord: "vigyan",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Shares 'Vi-' prefix"
  },
  {
    id: 58,
    category: "Confuser",
    title: "Say 'Viman' (Aeroplane - 'Vi-')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VIMAN' clearly.",
    isNegative: true,
    spokenWord: "viman",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Shares 'Vi-' prefix and ending nasal"
  },
  {
    id: 59,
    category: "Confuser",
    title: "Say 'Vichar' (Thought - 'Vi-')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'VICHAR' clearly.",
    isNegative: true,
    spokenWord: "vichar",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Common Hindi word with 'Vi-'"
  },
  {
    id: 60,
    category: "Confuser",
    title: "Say 'Garam' (Rhyming Ending '-ram')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'GARAM' (hot) clearly.",
    isNegative: true,
    spokenWord: "garam",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Very common rhyming word ending in '-ram'"
  },
  {
    id: 61,
    category: "Confuser",
    title: "Say 'Karam' (Rhyming Ending '-ram')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'KARAM' (deed) clearly.",
    isNegative: true,
    spokenWord: "karam",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Common word ending in '-ram'"
  },
  {
    id: 62,
    category: "Confuser",
    title: "Say 'Dharam' (Rhyming Ending '-ram')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'DHARAM' clearly.",
    isNegative: true,
    spokenWord: "dharam",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Common word ending in '-ram'"
  },
  {
    id: 63,
    category: "Confuser",
    title: "Say 'Aashram' (Ending in '-ram')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'AASHRAM' clearly.",
    isNegative: true,
    spokenWord: "aashram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Two-syllable word ending in '-shram'"
  },
  {
    id: 64,
    category: "Confuser",
    title: "Say 'Sitaram' (Ending in '-ram')",
    instruction: "CRITICAL HARD NEGATIVE: Speak 'SITARAM' clearly.",
    isNegative: true,
    spokenWord: "sitaram",
    badge: "Confuser",
    icon: "🛑",
    visualScene: "Compound name ending in '-ram'"
  },
  {
    id: 65,
    category: "Confuser",
    title: "Say Competitor Triggers: 'Hey Google / Alexa'",
    instruction: "CRITICAL NEGATIVE: Speak 'Hey Google' or 'Alexa'.",
    isNegative: true,
    spokenWord: "hey google / alexa",
    badge: "Competitor",
    icon: "🛑",
    visualScene: "Standard assistant wake word to ignore"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_KEYWORD, DEFAULT_INSTRUCTIONS };
}
