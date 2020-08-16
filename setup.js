const inquirer = require("inquirer");
const fs = require("fs");

const PATH = "src/config.ts";
const VAR = "config";

const existing = readConfig();
const thisYear = new Date().getFullYear();
const questions = [
  {
    type: "string",
    name: "fullName",
    message: "Full name",
    default: existing.fullName,
  },
  {
    type: "string",
    name: "currentAgreementSigned",
    message: "Agreement signed (updated annualy)",
    default: existing.currentAgreementSigned || `${thisYear}-01-01`,
    filter: filterDate,
  },
  {
    type: "string",
    name: "firstInvoiceSent",
    message: "First invoice sent",
    default: existing.firstInvoiceSent || `${thisYear}-01-15`,
    filter: filterDate,
  },
  {
    type: "string",
    name: "invoiceTemplateId",
    message: "Invoice template",
    default: existing.invoiceTemplateId,
    filter: filterDocumentId,
  },
  {
    type: "string",
    name: "reportTemplateId",
    message: "Report template",
    default: existing.reportTemplateId,
    filter: filterDocumentId,
  },
  {
    type: "number",
    name: "sendOnMonthDay",
    message: "Send on month day",
    default: existing.sendOnMonthDay || 15,
  },
];

inquirer.prompt(questions).then(writeConfig);

function readConfig() {
  if (fs.existsSync(PATH)) {
    const content = fs.readFileSync(PATH, "utf-8");
    return eval(`${content};${VAR}`);
  }

  return {};
}

function writeConfig(answers) {
  const content = `const ${VAR} = ${JSON.stringify(answers, null, "  ")};\n`;
  fs.writeFileSync(PATH, content);
}

function filterDate(input) {
  return new Date(input).toJSON();
}

function filterDocumentId(input) {
  return input.match(
    new RegExp("^(https://docs.google.com/document/d/)?([\\w-]+)", "i")
  )[2];
}
