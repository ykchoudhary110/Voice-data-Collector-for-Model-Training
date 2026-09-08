# EdgeKWS Studio — Voice Dataset Collection Web App

Designed specifically for training **Edge Wake-Word / Keyword Spotting (KWS) Models** targeted to run under **< 256 KB RAM** and **< 10% CPU usage** on microcontrollers (e.g., ESP32, STM32, Cortex-M4/M7, TinyML, micro-transformers).

---

## ⚡ Quick Overview

- **Acoustic Diversity for TinyML**: Preloaded with **40 curated variation prompts** per keyword (Distance, Volume, Speed, Pitch, Angles, Background noise, and critical **Hard Negative confusers** like *"chhota"*, *"chhat"*, *"bhotu"* to eliminate false alarms).
- **16 kHz 16-bit Mono PCM WAV**: Direct browser-level resampling. No post-conversion required.
- **Free Google Drive Storage**: Direct, zero-credential upload into your Google Drive folder and Google Sheets via Google Apps Script.
- **Zero Data Loss Guarantee**: Local caching with instant **Download Dataset (ZIP + CSV)** button.
- **Free Instant Hosting**: Deploy to **Vercel** in 60 seconds or run locally on Wi-Fi for your team.

---

## 🚀 1. Google Drive Setup (Free Backend, 2 Minutes)

You don't need any Google Cloud billing or complex API keys. We use a free **Google Apps Script Web App**:

1. Open [Google Drive](https://drive.google.com) and create a folder named `Chhotu_WakeWord_Dataset`.
2. Open that folder and copy its **Folder ID** from the address bar:
   ```text
   https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE
   ```
3. Open [script.google.com](https://script.google.com) and click **New project**.
4. Delete any code in the editor and paste the entire contents of [`google-apps-script.js`](./google-apps-script.js).
5. Paste your folder ID into line 25:
   ```javascript
   const TARGET_FOLDER_ID = "PASTE_YOUR_FOLDER_ID_HERE";
   ```
6. Click **Deploy** (top right) ➔ **New deployment**.
   - Select type: **Web app** (click the gear icon ⚙️).
   - Description: `Wake Word Collector`
   - Execute as: **Me** (`your-email@gmail.com`)
   - Who has access: **Anyone**  *(Crucial so team members can upload without logging in!)*
7. Click **Deploy**, authorize access with your Google account.
8. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).
9. In the web app, click the **Settings ⚙️** icon in the header and paste this URL into **Google Apps Script Webhook URL**.

*Done! Every recording will automatically save to your Google Drive folder and create a `dataset_metadata` Google Sheet.*

---

## 🌐 2. Deploying to Vercel for Free (1 Minute)

### Option A: Via Command Line (Recommended)
From this project directory:
```bash
npx vercel
```
- When prompted:
  - *Set up and deploy?* ➔ `Y`
  - *Which scope?* ➔ Select your account
  - *Link to existing project?* ➔ `N`
  - *Project name?* ➔ `edge-kws-collector`
  - *Directory?* ➔ `./`
- You get an immediate live HTTPS URL (e.g. `https://edge-kws-collector.vercel.app`)!

### Option B: Drag & Drop via Vercel Web Dashboard
1. Push this folder to a GitHub repository, or zip this folder.
2. Go to [vercel.com](https://vercel.com) ➔ **Add New Project**.
3. Import your repo or folder. Click **Deploy**.

---

## 💻 3. Running Locally on Local Wi-Fi (Instant Testing)

To test immediately or collect data from team members connected to the same Wi-Fi:

```bash
python server.py
```
This will print:
```text
👉 Local Computer:  http://localhost:8000
📱 Team Phones/LAN: http://192.168.x.x:8000
```
Anyone on your Wi-Fi can open the URL on their mobile phone and immediately start recording!

---

## 👥 4. How the 6 Team Members Collect 240+ Samples

1. Share the Vercel link with the 6 team members.
2. Each member:
   - Enters their **Name** (e.g. `Yash`, `Member_2`).
   - Selects their gender and native accent.
   - Follows each prompt:
     - Prompts 1–4: **Distance** (close, desk, 1.5m, 3m).
     - Prompts 5–10: **Volume** (whisper, murmur, loud, shout, emergency).
     - Prompts 11–15: **Cadence** (fast, slow, drawn-out).
     - Prompts 16–22: **Pitch** (monotone, question, command, high, deep).
     - Prompts 23–26: **Angles** (0°, 45° left, 45° right, looking away).
     - Prompts 27–32: **Noise** (fan, typing, music, cafe, tapping, street).
     - Prompts 33–35: **Context** (sigh, clap, phrase).
     - Prompts 36–40: **Confusers** (*"chhota"*, *"chhat"*, *"khatu"*, *"photo"*, *"bhotu"*).
3. **Total Collected**: 6 members × 40 takes = **240 high-variance edge-ready samples** in ~20 minutes!
4. Even if internet drops, anyone can click the **Folder icon** ➔ **Download Dataset (ZIP + CSV)** to download their full session locally as a fallback.

---

## 🧠 5. Directory Structure for Training

The exported ZIP or Google Drive files match standard speech datasets:

```text
dataset/
├── metadata.csv
└── chhotu/
    ├── chhotu_yash_inst1_1725800000000.wav
    ├── chhotu_yash_inst2_1725800001000.wav
    ├── chhotu_yash_inst36_1725800035000.wav  (Hard negative)
    └── ...
```

Each `.wav` file is:
- **Sample Rate**: 16,000 Hz
- **Channels**: 1 (Mono)
- **Bit Depth**: 16-bit PCM Linear
- **Duration**: ~1.8 seconds (uniform window)
