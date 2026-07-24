import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { marked } from "marked";

const mdPath = "D:/SolarShare/SOLARSHARE_PROJECT_REPORT_10_PAGES.md";
const htmlPath = "D:/SolarShare/report_temp.html";
const pdfPath = "D:/SolarShare/SolarShare_Project_Report.pdf";

const mdContent = fs.readFileSync(mdPath, "utf-8");
const htmlBody = marked.parse(mdContent);

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SolarShare Project Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap');
    
    @page {
      size: A4;
      margin: 20mm 15mm 20mm 15mm;
      @bottom-right {
        content: counter(page);
      }
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1e293b;
      line-height: 1.6;
      background: #ffffff;
      padding: 0;
      margin: 0;
    }

    h1, h2, h3, h4 {
      color: #0f172a;
      font-weight: 700;
      page-break-after: avoid;
    }

    h1 {
      font-size: 26px;
      border-bottom: 3px solid #10b981;
      padding-bottom: 8px;
      margin-top: 35px;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 20px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-top: 25px;
      margin-bottom: 15px;
      color: #047857;
    }

    h3 {
      font-size: 16px;
      margin-top: 20px;
      margin-bottom: 10px;
      color: #1e293b;
    }

    p, li {
      font-size: 13px;
      color: #334155;
    }

    ul, ol {
      padding-left: 22px;
      margin-bottom: 15px;
    }

    li {
      margin-bottom: 4px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 12px;
      page-break-inside: avoid;
    }

    th {
      background-color: #064e3b;
      color: #ffffff;
      font-weight: 600;
      text-align: left;
      padding: 10px 12px;
      border: 1px solid #047857;
    }

    td {
      padding: 9px 12px;
      border: 1px solid #cbd5e1;
    }

    tr:nth-child(even) {
      background-color: #f8fafc;
    }

    code {
      font-family: 'Fira Code', monospace;
      font-size: 11px;
      background-color: #f1f5f9;
      color: #0f766e;
      padding: 2px 5px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }

    pre {
      background-color: #0f172a;
      color: #f8fafc;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
      font-size: 11px;
      line-height: 1.5;
      page-break-inside: avoid;
      margin: 18px 0;
    }

    pre code {
      background: transparent;
      color: inherit;
      padding: 0;
      border: none;
    }

    blockquote {
      border-left: 4px solid #10b981;
      background-color: #ecfdf5;
      margin: 15px 0;
      padding: 12px 18px;
      border-radius: 0 6px 6px 0;
      color: #065f46;
    }

    hr {
      border: none;
      border-top: 1px solid #cbd5e1;
      margin: 30px 0;
    }

    .cover-page {
      height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      page-break-after: always;
    }

    a {
      color: #059669;
      text-decoration: none;
    }
  </style>
</head>
<body>
  ${htmlBody}
</body>
</html>`;

fs.writeFileSync(htmlPath, fullHtml);

console.log("Generating PDF using Microsoft Edge...");
const edgePath = `"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"`;
const cmd = `${edgePath} --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${htmlPath}"`;

try {
  execSync(cmd);
  console.log(`PDF successfully generated at: ${pdfPath}`);
  fs.unlinkSync(htmlPath);
} catch (err) {
  console.error("PDF Generation failed:", err);
}
