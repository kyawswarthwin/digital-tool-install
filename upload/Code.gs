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

      const { columns, data } = getData(sheetName);

      const filterable = filterAttributeContains(columns, "Filterable");
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

function getData(sheetName) {
  const spreadsheet = SpreadsheetApp.getActive();
  const sheet = spreadsheet.getSheetByName(sheetName);
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const values = sheet.getRange(1, 1, lastRow, lastColumn).getValues();

  const columns = values.shift();
  const data = values.map((value) =>
    value.reduce((accumulator, currentValue, index) => {
      accumulator[columns[index]] = currentValue;
      return accumulator;
    }, {})
  );

  return {
    columns,
    data,
  };
}

function filterAttributeContains(keys, attribute) {
  return keys.filter((key) =>
    key
      .split("|")
      .slice(1)
      .find((value) => value.toLowerCase() === attribute.toLowerCase())
  );
}
