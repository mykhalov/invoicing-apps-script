function sendAsAttachments(files: GoogleAppsScript.Base.BlobSource[]): void {
  const to = Session.getActiveUser().getEmail();
  const month = formatDate(Date.now(), "MMMM");
  const name = config.fullName.toUpperCase();
  const attachments = files.map((f) => f.getAs("application/pdf"));

  MailApp.sendEmail({
    to,
    subject: `Invoice ${month} ${name}`,
    attachments,
  });
}
