const CONFIG = {
  SPREADSHEET_ID: '1FspAHsS-AdI3dyK-qUe_5PVyXqVGC7QxH-Pw3bRKgzg',
  SHEET_NAME: 'Portfolio Leads',
  NOTIFY_EMAIL: '',
};

const HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Phone / WhatsApp',
  'Country',
  'Opportunity Type',
  'Message',
  'Page URL',
  'User Agent',
  'Status',
  'Notes',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = parseRequest_(e);

    if (data.website) {
      return json_({ ok: false, message: 'Spam blocked.' });
    }

    const required = ['name', 'email', 'interest', 'message'];
    const missing = required.filter((key) => !String(data[key] || '').trim());
    if (missing.length) {
      return json_({ ok: false, message: 'Missing required fields.', missing });
    }

    const sheet = setupLeadSheet();
    const row = [
      new Date(),
      clean_(data.name),
      clean_(data.email),
      clean_(data.phone),
      clean_(data.country),
      clean_(data.interest),
      clean_(data.message),
      clean_(data.pageUrl),
      clean_(data.userAgent),
      'New',
      '',
    ];

    sheet.appendRow(row);
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, HEADERS.length)
      .setBackground(lastRow % 2 === 0 ? '#F8FAFC' : '#EEF8F7')
      .setFontColor('#0F172A')
      .setVerticalAlignment('middle')
      .setWrap(true);
    sheet.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm');
    sheet.getRange(lastRow, 10).setBackground('#FEF3C7').setFontColor('#92400E').setFontWeight('bold');

    if (CONFIG.NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: CONFIG.NOTIFY_EMAIL,
        subject: 'New portfolio lead from ' + clean_(data.name),
        body:
          'Name: ' + clean_(data.name) + '\n' +
          'Email: ' + clean_(data.email) + '\n' +
          'Phone: ' + clean_(data.phone) + '\n' +
          'Country: ' + clean_(data.country) + '\n' +
          'Opportunity: ' + clean_(data.interest) + '\n\n' +
          clean_(data.message),
      });
    }

    return json_({ ok: true, message: 'Lead saved successfully.' });
  } catch (error) {
    return json_({ ok: false, message: error.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  if (e && e.parameter && e.parameter.setup === '1') {
    setupLeadSheet();
    return json_({ ok: true, message: 'Portfolio Leads sheet formatted.' });
  }

  return json_({
    ok: true,
    message: 'Omar Farque portfolio lead endpoint is active.',
  });
}

function setupLeadSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  ss.setActiveSheet(sheet);
  sheet.setTabColor('#42E8D4');
  sheet.setHiddenGridlines(true);

  if (sheet.getMaxColumns() < HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), HEADERS.length - sheet.getMaxColumns());
  }

  if (sheet.getLastRow() < 3 || sheet.getRange(3, 1).getValue() !== HEADERS[0]) {
    sheet.getRange(1, 1, 3, HEADERS.length).breakApart();
    sheet.getRange(1, 1, 1, HEADERS.length).merge();
    sheet.getRange(2, 1, 1, HEADERS.length).merge();

    sheet.getRange(1, 1).setValue('Omar Farque | Portfolio Lead Inbox');
    sheet.getRange(2, 1).setValue('New website contact submissions will appear below. Update Status and Notes after follow-up.');
    sheet.getRange(3, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  sheet.setFrozenRows(3);

  sheet.getRange(1, 1)
    .setBackground('#06111F')
    .setFontColor('#FFFFFF')
    .setFontSize(18)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  sheet.getRange(2, 1)
    .setBackground('#0F766E')
    .setFontColor('#DFFDF8')
    .setFontSize(10)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  sheet.getRange(3, 1, 1, HEADERS.length)
    .setBackground('#111827')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);

  sheet.setRowHeights(1, 1, 42);
  sheet.setRowHeights(2, 1, 28);
  sheet.setRowHeights(3, 1, 42);

  const widths = [150, 170, 220, 165, 130, 180, 360, 250, 280, 120, 260];
  widths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));

  const maxRows = Math.max(sheet.getMaxRows() - 3, 100);
  const dataRange = sheet.getRange(4, 1, maxRows, HEADERS.length);
  dataRange.setWrap(true).setVerticalAlignment('middle');

  sheet.getRange('A4:A').setNumberFormat('yyyy-mm-dd hh:mm');

  const statusRange = sheet.getRange(4, 10, sheet.getMaxRows() - 3, 1);
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['New', 'Contacted', 'In Progress', 'Offer Discussion', 'Closed'], true)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(statusRule);

  const rules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('New')
      .setBackground('#FEF3C7')
      .setFontColor('#92400E')
      .setRanges([statusRange])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Contacted')
      .setBackground('#DBEAFE')
      .setFontColor('#1D4ED8')
      .setRanges([statusRange])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('In Progress')
      .setBackground('#EDE9FE')
      .setFontColor('#6D28D9')
      .setRanges([statusRange])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Offer Discussion')
      .setBackground('#DCFCE7')
      .setFontColor('#166534')
      .setRanges([statusRange])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Closed')
      .setBackground('#E5E7EB')
      .setFontColor('#374151')
      .setRanges([statusRange])
      .build(),
  ];
  sheet.setConditionalFormatRules(rules);

  if (sheet.getFilter()) {
    sheet.getFilter().remove();
  }
  sheet.getRange(3, 1, Math.max(sheet.getMaxRows() - 2, 1), HEADERS.length).createFilter();

  sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 4), HEADERS.length)
    .setBorder(true, true, true, true, true, true, '#D9E5E7', SpreadsheetApp.BorderStyle.SOLID);

  return sheet;
}

function parseRequest_(e) {
  if (!e) return {};

  if (e.parameter && Object.keys(e.parameter).length) {
    return e.parameter;
  }

  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      return {};
    }
  }

  return {};
}

function clean_(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 2000);
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
