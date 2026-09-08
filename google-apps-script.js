/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT: Zero-Auth Direct Upload to Google Drive & Google Sheets
 * ==============================================================================
 * 
 * HOW TO SET THIS UP IN 2 MINUTES:
 * 1. Go to https://drive.google.com and create a new folder (e.g., "Chhotu_WakeWord_Dataset").
 * 2. Open that folder and copy the Folder ID from the URL:
 *    https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE
 * 3. Go to https://script.google.com and click "New project".
 * 4. Replace all code in the editor with this file's code.
 * 5. Paste your Folder ID in the `TARGET_FOLDER_ID` constant below.
 * 6. Click "Deploy" (top right) -> "New deployment".
 * 7. Click the gear icon next to "Select type" -> select "Web app".
 * 8. Set:
 *    - Description: "Wake Word Audio Collector"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone"  <-- CRITICAL so contributors can upload!
 * 9. Click "Deploy", grant permissions when prompted.
 * 10. Copy the "Web app URL" (ends with /exec).
 * 11. Paste this Webhook URL into the Web App settings!
 * ==============================================================================
 */

// Paste your Google Drive Folder ID here (or leave blank to auto-create a folder)
const TARGET_FOLDER_ID = ""; // e.g. "1a2b3c4d5e6f7g8h9i0j"
const DEFAULT_FOLDER_NAME = "Edge_WakeWord_Dataset";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJSON({ status: "error", message: "No post data received" }, 400);
    }

    const payload = JSON.parse(e.postData.contents);
    const {
      speaker = "anonymous",
      keyword = "keyword",
      instruction_id = "0",
      instruction_text = "",
      audio_base64,
      filename,
      device_info = ""
    } = payload;

    if (!audio_base64) {
      return responseJSON({ status: "error", message: "Missing audio_base64" }, 400);
    }

    // 1. Get or create root dataset folder
    let targetFolder;
    if (TARGET_FOLDER_ID && TARGET_FOLDER_ID.trim() !== "") {
      try {
        targetFolder = DriveApp.getFolderById(TARGET_FOLDER_ID.trim());
      } catch (err) {
        targetFolder = getOrCreateFolder(DEFAULT_FOLDER_NAME);
      }
    } else {
      targetFolder = getOrCreateFolder(DEFAULT_FOLDER_NAME);
    }

    // 2. Get or create keyword subfolder: e.g., "chhotu/"
    const safeKeyword = keyword.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
    const keywordFolder = getOrCreateSubFolder(targetFolder, safeKeyword);

    // 3. Decode base64 audio into 16kHz WAV file
    const decodedBytes = Utilities.base64Decode(audio_base64);
    const safeSpeaker = speaker.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
    const cleanFilename = filename || `${safeKeyword}_${safeSpeaker}_inst${instruction_id}_${Date.now()}.wav`;
    
    const blob = Utilities.newBlob(decodedBytes, "audio/wav", cleanFilename);
    const savedFile = keywordFolder.createFile(blob);

    // 4. Log to Google Sheet inside the root dataset folder
    logToSheet(targetFolder, {
      timestamp: new Date().toISOString(),
      speaker: safeSpeaker,
      keyword: safeKeyword,
      instruction_id: instruction_id,
      instruction_text: instruction_text,
      filename: cleanFilename,
      file_url: savedFile.getUrl(),
      file_id: savedFile.getId(),
      device_info: device_info
    });

    return responseJSON({
      status: "success",
      message: "Audio saved successfully",
      file_id: savedFile.getId(),
      file_url: savedFile.getUrl(),
      filename: cleanFilename
    }, 200);

  } catch (error) {
    return responseJSON({
      status: "error",
      message: error.toString()
    }, 500);
  }
}

// Enable CORS and test endpoint
function doGet(e) {
  return responseJSON({
    status: "online",
    service: "Edge Wake-Word Audio Collector",
    timestamp: new Date().toISOString()
  }, 200);
}

function responseJSON(data, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

function getOrCreateSubFolder(parentFolder, subFolderName) {
  const subFolders = parentFolder.getFoldersByName(subFolderName);
  if (subFolders.hasNext()) {
    return subFolders.next();
  }
  return parentFolder.createFolder(subFolderName);
}

function logToSheet(folder, entry) {
  try {
    const sheetName = "dataset_metadata";
    const files = folder.getFilesByName(sheetName);
    let spreadsheet;
    
    if (files.hasNext()) {
      spreadsheet = SpreadsheetApp.open(files.next());
    } else {
      spreadsheet = SpreadsheetApp.create(sheetName);
      const sheetFile = DriveApp.getFileById(spreadsheet.getId());
      sheetFile.moveTo(folder);
      
      const sheet = spreadsheet.getActiveSheet();
      sheet.appendRow([
        "Timestamp",
        "Speaker",
        "Keyword",
        "Instruction ID",
        "Instruction Text",
        "Filename",
        "File URL",
        "File ID",
        "Device Info"
      ]);
      sheet.setFrozenRows(1);
    }
    
    const sheet = spreadsheet.getActiveSheet();
    sheet.appendRow([
      entry.timestamp,
      entry.speaker,
      entry.keyword,
      entry.instruction_id,
      entry.instruction_text,
      entry.filename,
      entry.file_url,
      entry.file_id,
      entry.device_info
    ]);
  } catch (err) {
    Logger.log("Failed to log to sheet: " + err);
  }
}
