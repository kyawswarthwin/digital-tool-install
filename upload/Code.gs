function doGet(e) {
  const method = e.parameter.method;
  const params = e.parameter.params && JSON.parse(e.parameter.params);

  const functions = {
    list: () => {
      const spreadsheet = SpreadsheetApp.getActive();
      const sheets = spreadsheet.getSheets();

      const result = sheets.map((sheet) => sheet.getName());

      return result;
    },
    filter: (params) => {
      const sheetName = params.sheetName;
      const filter = params.filter;
      const filterable = ["Item Code", "Description"];

      const spreadsheet = SpreadsheetApp.getActive();
      const sheet = spreadsheet.getSheetByName(sheetName);
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
        filterable.some((field) =>
          `${record[field]}`.toLowerCase().includes(filter.toLowerCase())
        )
      );

      return result;
    },
  };

  const result = functions[method](params);

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON
  );
}
