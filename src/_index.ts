function scheduleSending(): void {
  for (const trigger of ScriptApp.getProjectTriggers()) {
    ScriptApp.deleteTrigger(trigger);
  }

  ScriptApp.newTrigger(sendInvoice.name)
    .timeBased()
    .onMonthDay(config.sendOnMonthDay)
    .create();
}

function sendInvoice(): void {
  const invoice = createFromTemplate(
    "Invoice",
    config.invoiceTemplateId,
    new Date(config.firstInvoiceSent)
  );
  const report = createFromTemplate(
    "Report",
    config.reportTemplateId,
    new Date(config.currentAgreementSigned)
  );

  sendAsAttachments([invoice, report]);
  removeFromDrive([invoice, report]);
}
