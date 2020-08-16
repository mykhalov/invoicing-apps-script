function createFromTemplate(
  name: string,
  templateId: string,
  sequenceStart: Date
): GoogleAppsScript.Drive.File {
  const templateData = new Map([
    ["documentNumber", (getMonthsSince(sequenceStart) + 1).toString()],
    ["en.date.monthEnd", formatDate(dates.monthEnd, formats.en.date)],
    ["en.date.monthStart", formatDate(dates.monthStart, formats.en.date)],
    ["en.date.today", formatDate(dates.today, formats.en.date)],
    ["en.monthYear", formatDate(dates.monthStart, formats.en.monthYear)],
    ["uk.date.monthEnd", formatDate(dates.monthEnd, formats.uk.date)],
    ["uk.date.monthStart", formatDate(dates.monthStart, formats.uk.date)],
    ["uk.date.today", formatDate(dates.today, formats.uk.date)],
    ["uk.monthYear", formatDate(dates.monthStart, formats.uk.monthYear)],
  ]);

  const file = DriveApp.getFileById(templateId).makeCopy(name);
  const document = DocumentApp.openById(file.getId());
  const body = document.getBody();

  for (const [key, value] of templateData.entries()) {
    body.replaceText(`{{${key}}}`, value);
  }

  document.saveAndClose();

  return file;
}

function removeFromDrive(files: GoogleAppsScript.Drive.File[]): void {
  for (const file of files) {
    DriveApp.removeFile(file);
  }
}
