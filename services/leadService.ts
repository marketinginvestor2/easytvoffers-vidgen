// This service handles sending lead data to a webhook (Google Apps Script)
// which then saves to Google Sheets and sends the email via Gmail.

// ============================================================================
// ⚠️ IMPORTANT: GOOGLE APPS SCRIPT CODE ⚠️
// This code MUST match the headers in your Google Sheet: 
// 1.Date | 2.Business Name | 3.Name | 4.Email | 5.Phone | 6.Script Generated | 7.Offer | 8.qrType | 9.qrValue | 10.businessType | 11.extraInfo
//
// INSTRUCTIONS:
// 1. Go to script.google.com
// 2. Paste the code below completely replacing the old code.
// 3. Make sure your Sheet is named 'Sheet1'. If it is named 'Leads', change getSheetByName('Sheet1') to getSheetByName('Leads').
// 4. Save (Ctrl+S) -> Deploy -> Manage Deployments -> Edit -> New Version -> Deploy.
/*
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('Sheet1'); // <--- CHECK THIS NAME MATCHES YOUR TAB NAME

    var data = JSON.parse(e.postData.contents);

    // MAPPING STRICTLY TO YOUR HEADERS:
    sheet.appendRow([
      new Date(),           // 1. Date
      data.businessName || "",    // 2. Business Name
      data.name || "",            // 3. Name
      data.email || "",           // 4. Email
      data.phone || "",           // 5. Phone
      data.script || "",          // 6. Script Generated
      data.offer || "",           // 7. Offer
      data.qrType || "",          // 8. qrType
      data.qrValue || "",         // 9. qrValue
      data.businessType || "",    // 10. businessType
      data.extraInfo || ""        // 11. extraInfo
    ]);

    try {
       GmailApp.sendEmail("easytvoffers@gmail.com", "New Lead: " + data.businessName, JSON.stringify(data));
    } catch(e) {}

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": e })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
*/
// ============================================================================

// YOUR WEBHOOK URL - Verified as Version 4 Deployment ID
const GOOGLE_SCRIPT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby1c2EHSaay3MEd6dnw5tJDI6rMnsbJ04eEcuvvsa3eFN6yQk2q1hED_2lnIDwFKeA/exec'; 

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  offer: string;
  extraInfo: string;
  qrType: string;
  qrValue: string;
  script: string;
}

export const submitLead = async (data: LeadData): Promise<boolean> => {
  // 1. Basic Validation
  if (!GOOGLE_SCRIPT_WEBHOOK_URL || GOOGLE_SCRIPT_WEBHOOK_URL.includes('PASTE_YOUR_WEB_APP_URL')) {
    console.error("❌ Lead submission failed: Webhook URL is invalid or missing.");
    alert("System Error: Lead Webhook URL is not configured.");
    return false;
  }

  try {
    // Robust payload creation with fallbacks to ensure alignment
    const safeData = {
      businessName: data.businessName || "",
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      script: data.script || "",
      offer: data.offer || "",
      qrType: data.qrType || "",
      qrValue: data.qrValue || "",
      businessType: data.businessType || "",
      extraInfo: data.extraInfo || ""
    };

    const payloadString = JSON.stringify(safeData);
    
    // Debug Logging to match Sheet Headers
    console.log("🚀 (Client v5) Sending Lead Data to Sheet Columns:");
    console.log(`1. Date: (Server Time)`);
    console.log(`2. Business Name: ${safeData.businessName}`);
    console.log(`3. Name: ${safeData.name}`);
    console.log(`4. Email: ${safeData.email}`);
    console.log(`5. Phone: ${safeData.phone}`);
    console.log(`6. Script: ${safeData.script.substring(0, 15)}...`);
    console.log(`7. Offer: ${safeData.offer}`);
    console.log(`8. qrType: ${safeData.qrType}`);
    console.log(`9. qrValue: ${safeData.qrValue}`);
    console.log(`10. businessType: ${safeData.businessType}`);
    console.log(`11. extraInfo: ${safeData.extraInfo}`);

    // 2. Append cache buster to URL to prevent browser/proxy caching of old script versions
    const urlWithCacheBust = `${GOOGLE_SCRIPT_WEBHOOK_URL}?cb=${new Date().getTime()}`;

    // 3. Send Data using 'no-cors' mode
    await fetch(urlWithCacheBust, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', 
      },
      body: payloadString,
    });

    // In 'no-cors' mode, we cannot read the response status (it returns 0/opaque).
    // If the fetch didn't throw an error, the request was sent successfully.
    console.log("✅ Lead request sent successfully to:", urlWithCacheBust);
    return true;

  } catch (error) {
    console.error("❌ Error submitting lead:", error);
    return false;
  }
};