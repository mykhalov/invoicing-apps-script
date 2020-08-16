const formats = {
  en: {
    date: "MMM d, yyyy",
    monthYear: "MMMM yyyy",
  },
  uk: {
    date: "dd.MM.yyyy р.",
    monthYear: "мммм yyyy р.",
  },
};

const dates = (() => {
  const monthStart = new Date().setDate(1);
  const nextMonthStart = new Date(monthStart).setMonth(
    new Date().getMonth() + 1
  );
  const monthEnd = new Date(nextMonthStart).setDate(0);

  return {
    today: Date.now(),
    monthStart,
    monthEnd,
  };
})();

function formatDate(timestamp: number, format: string): string {
  const date = new Date(timestamp);
  const tz = Session.getTimeZone();
  const month = Utilities.formatDate(date, tz, "MM");
  const monthUk = new Map([
    ["01", "січень"],
    ["02", "лютий"],
    ["03", "березень"],
    ["04", "квітень"],
    ["05", "травень"],
    ["06", "червень"],
    ["07", "липень"],
    ["08", "серпень"],
    ["09", "вересень"],
    ["10", "жовтень"],
    ["11", "листопад"],
    ["12", "грудень"],
  ]).get(month) as string;

  return Utilities.formatDate(date, tz, format).replace("мммм", monthUk);
}

function getMonthsSince(date: Date): number {
  const now = new Date();

  return (
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth())
  );
}
