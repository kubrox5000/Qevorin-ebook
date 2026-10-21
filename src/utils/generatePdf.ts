/**
 * Generates an authentic formatted digital PDF document blob for the Smart Money eBook
 * allowing the user to test and verify instant file delivery immediately!
 */
export function downloadSmartMoneyEBook(customerName: string, customerEmail: string) {
  // Create a printable HTML window / Blob that downloads or opens as a clean document
  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Smart Money – QEVORIN Digital Edition</title>
      <style>
        @page { size: letter; margin: 20mm; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #172B4D;
          line-height: 1.6;
          margin: 0;
          padding: 24px;
        }
        .header {
          border-bottom: 2px solid #2A9D8F;
          padding-bottom: 16px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .brand { font-size: 20px; font-weight: 800; color: #172B4D; letter-spacing: 1px; }
        .licensed { font-size: 11px; color: #64748b; }
        h1 { font-size: 28px; color: #172B4D; margin: 0 0 8px 0; }
        .subtitle { font-size: 16px; color: #2A9D8F; font-weight: 600; margin-bottom: 24px; }
        .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 8px; margin-bottom: 24px; font-size: 13px; }
        .chapter { margin-top: 28px; }
        h2 { font-size: 18px; color: #172B4D; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
        p { font-size: 14px; color: #334155; }
        .worksheet-box {
          border: 1px dashed #2A9D8F;
          padding: 16px;
          border-radius: 8px;
          margin-top: 20px;
          background: #f0fdfa;
        }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
        th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; }
        th { background: #f1f5f9; }
        .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 12px; font-size: 11px; color: #94a3b8; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="brand">QEVORIN</div>
        <div class="licensed">Authorized Digital Copy · Licensed to: ${customerName || 'Customer'} (${customerEmail || 'support@qevorin.online'})</div>
      </div>

      <h1>SMART MONEY</h1>
      <div class="subtitle">A Simple Guide to Budgeting, Saving, and Feeling More in Control</div>

      <div class="meta-box">
        <strong>Product:</strong> Smart Money Official Digital Edition & Worksheets<br>
        <strong>Brand:</strong> QEVORIN · Plan Smarter. Save Better. Live With Confidence.<br>
        <strong>Support Email:</strong> support@qevorin.online
      </div>

      <div class="chapter">
        <h2>Chapter 01: Start With Your Money Snapshot</h2>
        <p>Before designing any budget or making cuts, establish an objective baseline of your current cash flow. Most personal finance approaches fail because they begin with judgment and shame. In Smart Money, we start with clarity.</p>
        <p><strong>Step 1:</strong> List your guaranteed net monthly income.</p>
        <p><strong>Step 2:</strong> Total your fixed commitments (housing, utilities, insurance, loan minimums).</p>
        <p><strong>Step 3:</strong> Calculate your discretionary buffer. When this number is known, stress declines immediately.</p>
      </div>

      <div class="chapter">
        <h2>Chapter 02: Build a Budget You Can Maintain</h2>
        <p>The 3-Bucket Framework replaces 50-category spreadsheets with 3 simple streams:</p>
        <ul>
          <li><strong>Bucket 1: Essentials (50-60%)</strong> — Housing, groceries, utilities, transit.</li>
          <li><strong>Bucket 2: Cushion & Future (20%)</strong> — Emergency fund, retirement, high-interest debt payoffs.</li>
          <li><strong>Bucket 3: Guilt-Free Living (20-30%)</strong> — Dining out, personal interests, hobbies.</li>
        </ul>
      </div>

      <div class="worksheet-box">
        <h3 style="margin: 0 0 8px 0; color: #172B4D;">Monthly Budget Worksheet Template</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Planned Allocation</th>
              <th>Actual Spent</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fixed Essentials (Housing, Bills)</td>
              <td>$__________</td>
              <td>$__________</td>
              <td>$__________</td>
            </tr>
            <tr>
              <td>Savings & Emergency Cushion</td>
              <td>$__________</td>
              <td>$__________</td>
              <td>$__________</td>
            </tr>
            <tr>
              <td>Guilt-Free Discretionary</td>
              <td>$__________</td>
              <td>$__________</td>
              <td>$__________</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="footer">
        &copy; ${new Date().getFullYear()} QEVORIN. All rights reserved. For customer support, contact support@qevorin.online.
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Smart-Money-eBook-QEVORIN.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadWorksheetsPack() {
  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Smart Money – Printable Worksheets Pack (QEVORIN)</title>
      <style>
        @page { size: letter; margin: 15mm; }
        body { font-family: system-ui, sans-serif; color: #172B4D; padding: 20px; }
        h1 { color: #172B4D; font-size: 24px; border-bottom: 2px solid #2A9D8F; padding-bottom: 8px; }
        .box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; font-size: 13px; }
        th { background: #f8fafc; }
      </style>
    </head>
    <body>
      <h1>QEVORIN · Smart Money Printable Worksheets</h1>
      <p>Print this document (US Letter or A4) to track your monthly spending and 30-day savings milestones.</p>
      
      <div class="box">
        <h3>1. 30-Day Savings Tracker</h3>
        <p>Color in a circle for every day you avoid unnecessary impulse spending:</p>
        <div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 10px; margin-top: 15px;">
          ${Array.from({ length: 30 }).map((_, i) => `
            <div style="border: 2px solid #2A9D8F; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; color: #172B4D;">
              ${i + 1}
            </div>
          `).join('')}
        </div>
      </div>

      <div class="box">
        <h3>2. Monthly Expense Log</h3>
        <table>
          <thead>
            <tr><th>Date</th><th>Item Description</th><th>Category</th><th>Amount</th></tr>
          </thead>
          <tbody>
            ${Array.from({ length: 8 }).map(() => `
              <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <p style="font-size: 11px; color: #64748b; text-align: center;">Official QEVORIN Material · support@qevorin.online</p>
    </body>
    </html>
  `;

  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Smart-Money-Worksheets-Pack-QEVORIN.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
