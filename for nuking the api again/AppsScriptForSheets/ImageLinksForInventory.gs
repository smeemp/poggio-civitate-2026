/* VARIABLES */
const THIS_SCRIPT = DriveApp.getFileById("1dbyNLw0nnVfJ1KQd3FVkUTVDBU4WM_XXAzbTHkTp-s8mQiug9cmTrHd8");


const FOLDER = THIS_SCRIPT.getParents().next();  // Parent folder of everything that will be accessed
const LINKS_FOLDER = FOLDER.getFoldersByName("Image Link Sheet").next();  // Folder containing link map
const LINKS_SHEET_ID = LINKS_FOLDER.getFilesByName("Image Links by PC Number").next().getId();  // Sheet with PC nums, URLs, and img links
const LINKS = SpreadsheetApp.openById(LINKS_SHEET_ID).getSheets()[0];
const LINKS_2DARR = LINKS.getSheetValues(2,1,LINKS.getLastRow(),2);
// Folders for each mag section
const SHEET_FOLDERS = [FOLDER.getFoldersByName("Conservation Mag").next(),  // Folder with all cons. scaffele
                       FOLDER.getFoldersByName("Catalog / Research Mag").next()];  // Folder with all research scaffele



/* DICT FOR PC NUM --> LINK MATCHING */
let linkMap = new Map();

for (let i = 0; i < LINKS_2DARR.length; i++){
  linkMap.set(LINKS_2DARR[i][0], LINKS_2DARR[i][1]);
}

Logger.log("Link map complete. Starting link population...")


/* FUNCTIONS (TO EXECUTE)*/
/*
* Updates the image links of all Conservation scaffale.
*/
function updateConservation(){
  // for (let folder of SHEET_FOLDERS){
  let folder = SHEET_FOLDERS[0];

  // Get all spreadsheets in current folder
  let spreadsheets = folder.getFilesByType(MimeType.GOOGLE_SHEETS);

  while (spreadsheets.hasNext()){

    let sheetFile = spreadsheets.next();
    let sheetID = sheetFile.getId();

    let spreadsheet = SpreadsheetApp.openById(sheetID);

    Logger.log("New scaff: %s", spreadsheet.getName())

    // Current spreadsheet
    let sheets = spreadsheet.getSheets();  // List of sheets in this document

    // Loop through all active sheets
    for (let sheet of sheets){

      // Logger.log("New cass: %s", sheet.getName());
      let lastRow = sheet.getLastRow();  // Index of last row so we don't go through like a billion empty rows

      // Add and set header for image link column if not present
      if (sheet.getRange('C1').getValue() != "image"){
        sheet.insertColumnAfter(2);
        sheet.getRange('C1').setValues([["image"]]);
        Logger.log("column was not present in %s", sheet.getName())
      } else {
        Logger.log("column was already present in %s", sheet.getName())
      }

      // Getting data as array to make the code faster
      let pcNums = sheet.getRange(1,1,sheet.getLastRow());

      // For every PC number 
      for (let i = 2; i <= lastRow; i++){

        let target = pcNums[i];  // Get PC number

        // Skip if empty pc number
        if (!target){
          continue;
        }

        // Set value!
        try {
          sheet.getRange(i, 3).setValues([[linkMap.get(`${target}`)]]);
        } catch {
          Logger.log("missing value at pc num %s", target);
        }

      }
    }
  }
}


/*
* Updates the image links of all Catalog / Research scaffale.
*/
function updateCatalogResearch(){
  // for (let folder of SHEET_FOLDERS){
  let folder = SHEET_FOLDERS[1];

  // Get all spreadsheets in current folder
  let spreadsheets = folder.getFilesByType(MimeType.GOOGLE_SHEETS);

  while (spreadsheets.hasNext()){

    let sheetFile = spreadsheets.next();
    let sheetID = sheetFile.getId();

    let spreadsheet = SpreadsheetApp.openById(sheetID);

    Logger.log("New scaff: %s", spreadsheet.getName())

    // Current spreadsheet
    let sheets = spreadsheet.getSheets();  // List of sheets in this document

    // Loop through all active sheets
    for (let sheet of sheets){

      // Logger.log("New cass: %s", sheet.getName());
      let lastRow = sheet.getLastRow();  // Index of last row so we don't go through like a billion empty rows

      // Add and set header for image link column if not present
      if (sheet.getRange('C1').getValue() != "image"){
        sheet.insertColumnAfter(2);
        sheet.getRange('C1').setValues([["image"]]);
        Logger.log("column was not present in %s", sheet.getName())
      } else {
        Logger.log("column was already present in %s", sheet.getName())
      }

      // Getting data as array to make the code faster
      let pcNums = sheet.getRange(1,1,sheet.getLastRow());

      // For every PC number 
      for (let i = 2; i <= lastRow; i++){

        let target = pcNums[i];  // Get PC number

        // Skip if empty num
        if (!target){
          continue;
        }

        // Set value!
        try {
          sheet.getRange(i, 3).setValues([[linkMap.get(`${target}`)]]);
        } catch {
          Logger.log("missing value at pc num %s", target);
        }

        // bada bing bada boom

      }
    }
  }
}



/*
* Updates the image links of all scaffale.
* WARNING: MAY NOT RUN IN MAX EXECUTION TIME (6 min) RUN SEPARATELY IF SO! SORRY IN ADVANCE :-)
*/
function updateAll(){
  updateConservation();
  updateCatalogResearch();
}