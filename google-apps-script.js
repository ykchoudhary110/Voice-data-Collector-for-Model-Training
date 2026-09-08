/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT: Multi-Class Edge Dataset Classifier & Storage
 * Automatically organizes into:
 *   📁 01_POSITIVE_VIKRAM/     (All variations of the target keyword)
 *   📁 02_HARD_NEGATIVES/       (Confusers: vishram, vikrant, vikas, etc.)
 *   📁 03_BACKGROUND_NOISE/     (Room silence, fan hum, typing, coughing)
 * ==============================================================================
 */

// Paste your Google Drive Folder ID here
const TARGET_FOLDER_ID = "1jYxlbTNiLccSvmPPqXiJ4qYyqHUCcaqD";
const DEFAULT_FOLDER_NAME = "Vikram_WakeWord_Dataset";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJSON({ status: "error", message: "No post data received" }, 400);
    }

    const payload = JSON.parse(e.postData.contents);
    const {
      speaker = "anonymous",
      keyword = "vikram",
      spoken_word = "vikram",
      sample_type = "POSITIVE", // "POSITIVE", "HARD_NEGATIVE", "BACKGROUND_NOISE"
      subfolder_name = "01_POSITIVE_VIKRAM",
      instruction_id = "0",
      instruction_text = "",
      instruction_category = "General",
      audio_base64,
      filename,
      device_info = ""
    } = payload;

    if (!audio_base64) {
      return responseJSON({ status: "error", message: "Missing audio_base64" }, 400);
    }

    // 1. Get root dataset folder
    let targetFolder;
    let folderId = TARGET_FOLDER_ID ? TARGET_FOLDER_ID.trim() : "";
    if (folderId.includes("/folders/")) {
      const parts = folderId.split("/folders/")[1];
      folderId = parts.split("/")[0].split("?")[0].trim();
    }

    if (folderId !== "") {
      try {
        targetFolder = DriveApp.getFolderById(folderId);
      } catch (err) {
        targetFolder = getOrCreateFolder(DEFAULT_FOLDER_NAME);
      }
    } else {
      targetFolder = getOrCreateFolder(DEFAULT_FOLDER_NAME);
    }

    // 2. Automatically sort into class subfolders:
    //    e.g. "01_POSITIVE_VIKRAM", "02_HARD_NEGATIVES", "03_BACKGROUND_NOISE"
    let classFolderName = subfolder_name;
    if (!classFolderName) {
      if (sample_type === "HARD_NEGATIVE") {
        classFolderName = "02_HARD_NEGATIVES";
      } else if (sample_type === "BACKGROUND_NOISE") {
        classFolderName = "03_BACKGROUND_NOISE";
      } else {
        classFolderName = `01_POSITIVE_${keyword.toUpperCase()}`;
      }
    }
    const classFolder = getOrCreateSubFolder(targetFolder, classFolderName);

    // 3. Decode base64 audio into 16kHz WAV file
    const decodedBytes = Utilities.base64Decode(audio_base64);
    const cleanFilename = filename || `${sample_type}_${spoken_word}_${speaker}_inst${instruction_id}_${Date.now()}.wav`;
    
    const blob = Utilities.newBlob(decodedBytes, "audio/wav", cleanFilename);
    const savedFile = classFolder.createFile(blob);

    // 4. Log to Google Sheet inside the root dataset folder
    logToSheet(targetFolder, {
      timestamp: new Date().toISOString(),
      sample_type: sample_type,
      class_folder: classFolderName,
      spoken_word: spoken_word,
      keyword: keyword,
      speaker: speaker,
      instruction_id: instruction_id,
      instruction_category: instruction_category,
      instruction_text: instruction_text,
      filename: cleanFilename,
      file_url: savedFile.getUrl(),
      file_id: savedFile.getId(),
      device_info: device_info
    });

    return responseJSON({
      status: "success",
      message: "Audio saved in class folder",
      folder: classFolderName,
      sample_type: sample_type,
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
    target_folder: TARGET_FOLDER_ID,
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
    }
    
    const sheet = spreadsheet.getActiveSheet();
    const headers = [
      "Timestamp",
      "Class / Sample Type",
      "Target Folder",
      "Spoken Word",
      "Keyword",
      "Speaker",
      "Instruction ID",
      "Category",
      "Instruction Text",
      "Filename",
      "File URL",
      "File ID",
      "Device Info"
    ];

    // Automatically fix or upgrade Row 1 if it has old headers (less than 13 columns)
    const lastCol = sheet.getLastColumn();
    if (lastCol < headers.length) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    sheet.appendRow([
      entry.timestamp,
      entry.sample_type,
      entry.class_folder,
      entry.spoken_word,
      entry.keyword,
      entry.speaker,
      entry.instruction_id,
      entry.instruction_category,
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
