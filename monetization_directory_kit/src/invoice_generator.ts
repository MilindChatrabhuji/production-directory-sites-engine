// Automated HTML/PDF Invoice Synthesizer

export interface InvoiceDetails {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  listingName: string;
  tierName: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionRef: string;
  issuedDate: string;
}

export class InvoiceGenerator {
  public static generateHtml(inv: InvoiceDetails): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Invoice ${inv.invoiceNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1E293B; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #E2E8F0; padding-bottom: 20px; }
    .title { font-size: 24px; font-weight: 800; color: #0F172A; }
    .badge { background: #0D9488; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; }
    table { width: 100%; border-collapse: collapse; margin-top: 30px; }
    th { text-align: left; background: #F8FAFC; padding: 12px; border-bottom: 1px solid #CBD5E1; }
    td { padding: 12px; border-bottom: 1px solid #E2E8F0; }
    .total-row { font-weight: 800; font-size: 16px; color: #0F172A; }
    .footer { margin-top: 40px; font-size: 11px; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">DIRECTORY INVOICE</div>
      <div style="font-size: 12px; color: #64748B;">Publisher: Milind Chatrabhuji (support@example.com)</div>
    </div>
    <div style="text-align: right;">
      <span class="badge">PAID</span>
      <div style="margin-top: 6px; font-size: 12px;"><strong>Invoice #:</strong> ${inv.invoiceNumber}</div>
      <div style="font-size: 12px;"><strong>Date:</strong> ${inv.issuedDate}</div>
    </div>
  </div>

  <div style="margin-top: 24px; font-size: 13px;">
    <strong>Billed To:</strong><br>
    ${inv.customerName} (${inv.customerEmail})<br>
    Listing: <em>${inv.listingName}</em>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Period</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${inv.tierName}</td>
        <td>30 Days (Monthly Sponsor)</td>
        <td>${inv.currency} ${inv.amount.toFixed(2)}</td>
      </tr>
      <tr class="total-row">
        <td colspan="2">Total Paid (${inv.paymentMethod} &bull; Ref: ${inv.transactionRef})</td>
        <td>${inv.currency} ${inv.amount.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    Thank you for sponsoring the Clinical &amp; Developer Tools Directory. This is an electronic invoice. RFC 2606 sample records.
  </div>
</body>
</html>`;
  }
}
