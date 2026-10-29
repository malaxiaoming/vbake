// Stand-in for the bakery's published Google Sheet of closed/holiday/full dates, used by the e2e tests.
// Serves dates relative to today (in Malaysia) so the tests never go stale.
const http = require("http");

const PORT = Number(process.env.PORT || 3101);

// Date `days` from today in Asia/Kuala_Lumpur, as [year, month, day]
function malaysiaDate(days) {
  const date = new Date(Date.now() + 8 * 60 * 60 * 1000 + days * 24 * 60 * 60 * 1000);
  return [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()];
}
const iso = ([y, m, d]) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const dayFirst = ([y, m, d]) => `${d}/${m}/${y}`;

http
  .createServer((req, res) => {
    const rows = [
      "Date,Reason",
      `${iso(malaysiaDate(3))},Full`, // the usual default date, so the form must skip to the next day
      `${iso(malaysiaDate(10))},Full`,
      `${dayFirst(malaysiaDate(11))},Closed`, // Malaysian-locale date format
      `${iso(malaysiaDate(13))},Closed for public holiday`, // a holiday label wins over "closed"
      `"${iso(malaysiaDate(12))}","Full, sorry"`, // quoted fields
      "not a date,Full",
      "",
    ];
    res.writeHead(200, { "Content-Type": "text/csv" });
    res.end(rows.join("\n"));
  })
  .listen(PORT);
