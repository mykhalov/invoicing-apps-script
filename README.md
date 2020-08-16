# Invocing Apps Script

Hassle-free monthly invoicing built on Google Apps Script.

## How It Works

Running the script will send you an email with an invoice and the report as PDF attachments (you can then forward this email as needed).

## Setup

1. Create copies of an invoice and a report in Google Drive (these will be your templates).
2. Replace static values with the following variables:
   - `{{documentNumber}}`
   - `{{en.date.today}}`
   - `{{en.date.monthEnd}}`
   - `{{en.date.monthStart}}`
   - `{{en.monthYear}}`
   - `{{uk.date.today}}`
   - `{{uk.date.monthEnd}}`
   - `{{uk.date.monthStart}}`
   - `{{uk.monthYear}}`
3. Enable Google Apps Script API in [settings](https://script.google.com/u/1/home/usersettings).
4. Run `npm run setup` (use URLs from step 1 when prompted for templates).
5. In the browser window run `scheduleSending` to set up montly sending (you can also run
   `sendInvoice` to send invoice manually).

## Development

To apply local changes to remote project run `./node_modules/.bin/clasp push`. For more options run
`./node_modules/.bin/clasp help` or browse [online documentation](https://developers.google.com/apps-script/guides/clasp).

## License

[MIT](./LICENSE).
