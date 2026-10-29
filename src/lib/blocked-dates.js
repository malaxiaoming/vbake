// Delivery dates the bakery has marked as closed or fully booked, kept in a Google Sheet
// (File → Share → Publish to web → CSV) with two columns: Date, Reason ("Closed" or "Full").
// BLOCKED_DATES_CSV_URL can override the sheet, e.g. for tests.
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTKmTRKgw5769wvkkC-QNy-Buj4q4NOH82v0tNlX2ESvbV-zqcX75p1SQVxFl8ayuAkpH4Wlt3liDq/pub?gid=0&single=true&output=csv";

const csvUrl = () => process.env.BLOCKED_DATES_CSV_URL || SHEET_CSV_URL;

// Minimal CSV parser: handles quoted fields and escaped quotes ("")
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field || row.length) rows.push([...row, field]);
  return rows;
}

const pad = (n) => String(n).padStart(2, "0");

// Accepts 2026-11-20, 20/11/2026 (Malaysian day-first) or 11/20/2026 when the day can't be a month.
// Returns YYYY-MM-DD, or null if the cell isn't a date.
export function parseSheetDate(value) {
  const text = value.trim();
  let match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (match) return isValidDate(+match[1], +match[2], +match[3]);
  match = text.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2}|\d{4})$/);
  if (match) {
    let [first, second] = [+match[1], +match[2]];
    const year = match[3].length === 2 ? 2000 + +match[3] : +match[3];
    // Day first unless that's impossible (e.g. 11/20/2026 from a US-locale sheet)
    if (second > 12 && first <= 12) [first, second] = [second, first];
    return isValidDate(year, second, first);
  }
  return null;
}

function isValidDate(year, month, day) {
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return `${year}-${pad(month)}-${pad(day)}`;
}

// { "2026-11-20": "Full", "2026-12-25": "Closed", ... }
export async function getBlockedDates() {
  const url = csvUrl();
  if (!url) return {};
  try {
    const response = await fetch(url, { next: { revalidate: 300 }, signal: AbortSignal.timeout(4000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blocked = {};
    for (const [dateCell = "", reasonCell = ""] of parseCsv(await response.text())) {
      const date = parseSheetDate(dateCell);
      if (date) blocked[date] = /close/i.test(reasonCell) ? "Closed" : "Full";
    }
    return blocked;
  } catch (error) {
    // Never stop customers ordering because the sheet is unreachable; just block nothing
    console.error("Could not load blocked delivery dates:", error.message);
    return {};
  }
}
