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
    allItems: (params) => {
      const { sheetName, group, subgroup, filter } = params;

      const data = getData(sheetName);
      const config = getConfig(sheetName);

      const groupKey = filterPropertyContains(config, "type", "group").shift();
      const subgroupKey = filterPropertyContains(
        config,
        "type",
        "subgroup"
      ).shift();
      const filterable = filterPropertyContains(config, "filterable", "true");

      let sql = "SELECT * FROM ?";
      if (
        (groupKey && group) ||
        (groupKey && group && subgroupKey && subgroup) ||
        (filterable?.length && filter)
      ) {
        sql += " WHERE";
        if (groupKey && group) {
          sql += ` ${groupKey}='${group}'`;
        }
        if (groupKey && group && subgroupKey && subgroup) {
          sql += ` AND ${subgroupKey}='${subgroup}'`;
        }
        if (filterable?.length && filter) {
          if (
            (groupKey && group) ||
            (groupKey && group && subgroupKey && subgroup)
          ) {
            sql += " AND (";
          } else {
            sql += " ";
          }
          sql += filterable.reduce((accumulator, currentValue, index) => {
            if (index > 0) {
              accumulator += " OR ";
            }
            accumulator += `${currentValue} LIKE '%${filter}%'`;
            return accumulator;
          }, "");
          if (
            (groupKey && group) ||
            (groupKey && group && subgroupKey && subgroup)
          ) {
            sql += ")";
          }
        }
      }
      sql += ";";
      const result = {
        data: alasql(sql, [data]),
        meta: config,
      };

      return result;
    },
    itemGroups: (params) => {
      const { sheetName } = params;

      const data = getData(sheetName);
      const config = getConfig(sheetName);

      const groupKey = filterPropertyContains(config, "type", "group").shift();

      const sql = `SELECT ${groupKey} FROM ? GROUP BY ${groupKey} ORDER BY ${groupKey};`;
      const result = {
        data: alasql(sql, [data]),
        meta: {
          groupKey,
        },
      };

      return result;
    },
    itemSubgroups: (params) => {
      const { sheetName, group } = params;

      const data = getData(sheetName);
      const config = getConfig(sheetName);

      const groupKey = filterPropertyContains(config, "type", "group").shift();
      const subgroupKey = filterPropertyContains(
        config,
        "type",
        "subgroup"
      ).shift();

      const sql = `SELECT ${subgroupKey} FROM ? WHERE ${groupKey}='${group}' GROUP BY ${subgroupKey} ORDER BY ${subgroupKey};`;
      const result = {
        data: alasql(sql, [data]),
        meta: {
          subgroupKey,
        },
      };

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

  return data;
}

function getConfig(sheetName) {
  const config = JSON.parse(
    DriveApp.getFileById("1QfnayBRPFl3ibhM9GFcFxrarkHL7FkTT")
      .getBlob()
      .getDataAsString() || "{}"
  );

  return config[sheetName] || {};
}

function filterPropertyContains(object, property, filter) {
  return Object.entries(object)
    .filter(
      ([key, value]) =>
        `${value[property]}`.toLowerCase() === `${filter}`.toLowerCase()
    )
    .reduce((accumulator, [key, value]) => accumulator.concat(key), []);
}
