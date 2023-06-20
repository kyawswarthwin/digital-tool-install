function doGet(req) {
  const filterable = ["Item Code", "Description"];
  const filter = req.parameter.filter;

  const spreadsheet = SpreadsheetApp.getActive();
  const sheet = spreadsheet.getSheetByName("Micron Components List");
  const data = [];
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const values = sheet.getRange(1, 1, lastRow, lastColumn).getValues();
  for (let i = 1; i < values.length; i++) {
    const rowData = values[i];
    const record = {};
    for (let j = 0; j < lastColumn; j++) {
      record[values[0][j]] = rowData[j];
    }
    data.push(record);
  }

  const result = data.filter((record) =>
    filterable.some((field) => record[field].includes(filter))
  );
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON
  );
}
