/**
 * ============================================================================
 * PRIVE - Chapter 1: Exclusive Guest Validation & QR Engine
 * ============================================================================
 * 
 * Description:
 * A custom Google Apps Script developed to handle secure invitation workflows
 * for high-profile private events. This script executes on-the-fly generation
 * of randomized, high-security member verification tokens, requests dynamic
 * QR codes using secure query parameters, and provides check-in validation.
 * 
 * Author: Portfolio Project Integration
 * Platform: Google Apps Script (JavaScript ES6 Runtime)
 * ============================================================================
 */


/**
 * Trigger function executing automatically on every Google Form RSVP submission.
 * This binds RSVP submissions instantly to the token computation engine.
 * 
 * @param {Object} e Google Sheets form submission trigger event object
 */
function onRSVPSubmit(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    // Column Index Mapping (Adjust index values based on your Sheet layout):
    // Column A (1): Timestamp
    // Column B (2): Name
    // Column C (3): Email
    // Column D (4): Secure Member Token (Destination)
    // Column E (5): Verification QR Code Image Link (Destination)
    
    const tokenColumnIndex = 4;
    const qrColumnIndex = 5;
    
    const tokenRange = sheet.getRange(lastRow, tokenColumnIndex);
    const qrRange = sheet.getRange(lastRow, qrColumnIndex);
    
    Logger.log(`Processing RSVP row ${lastRow}...`);
    
    // 1. Generate unique high-security token
    const secureToken = generateSecureToken();
    tokenRange.setValue(secureToken);
    Logger.log(`Token successfully computed: ${secureToken}`);
    
    // 2. Generate Google Charts QR verification endpoint URL
    const qrUrl = generateVerificationQRCode(secureToken);
    qrRange.setValue(qrUrl);
    Logger.log(`Dynamic QR Code URL mapped successfully.`);
    
    SpreadsheetApp.flush(); // Force write update to database before process ends
    
  } catch (error) {
    Logger.log(`CRITICAL ERROR inside onRSVPSubmit pipeline: ${error.toString()}`);
  }
}


/**
 * Computes a high-security, pseudo-randomized alphanumeric member token.
 * Combines static identification signatures, random high-entropy strings, 
 * and localized current time hex-hashes to prevent guessing and ticket spoofing.
 * 
 * Example Output: "PRIVE-MEM-A5E8D2-4C10"
 * 
 * @return {string} High-security PRIVE VIP Member Token
 */
function generateSecureToken() {
  const prefix = "PRIVE-MEM-";
  
  // Create an 8-character random string using base-36 characters
  const randomEntropy = Math.random().toString(36).substring(2, 10).toUpperCase();
  
  // Extract a 4-digit unique hexadecimal timestamp snippet
  const timestampHex = Date.now().toString(16).slice(-4).toUpperCase();
  
  return `${prefix}${randomEntropy}-${timestampHex}`;
}


/**
 * Generates an dynamic QR Code image API endpoint linking to our verification system.
 * Employs the Google Charts API with query mapping parameters.
 * 
 * @param {string} token The VIP guest's secure member token
 * @return {string} Direct URL to render the QR Code in email merges
 */
function generateVerificationQRCode(token) {
  const verificationBaseUrl = "https://prive-verification-portal.example.com/verify";
  
  // Package parameter query string safely for HTTP transmission
  const fullDestinationUrl = `${verificationBaseUrl}?token=${encodeURIComponent(token)}`;
  
  // Assemble final Google Charts API target URL string
  const qrBaseUrl = "https://chart.googleapis.com/chart";
  const size = "200x200";
  const format = "qr";
  const encoding = "UTF-8";
  
  const finalQrUrl = `${qrBaseUrl}?chs=${size}&cht=${format}&chl=${encodeURIComponent(fullDestinationUrl)}&choe=${encoding}`;
  return finalQrUrl;
}


/**
 * Primary gatekeeping validation engine. 
 * Invoked by scanner webhooks or front-end personnel portals when scanning QR passes.
 * Updates the database dynamically and handles double-entry (reuse) attempts securely.
 * 
 * @param {string} scannedToken The token scanned at physical security checkpoints
 * @return {string} Action verification code for client-side feedback
 */
function verifyAndCheckInGuest(scannedToken) {
  try {
    if (!scannedToken) {
      Logger.log("WARNING: Verification triggered with null token.");
      return "INVALID_INPUT";
    }
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Column references in spreadsheet database
    const tokenColumnOffset = 3;  // Column D (0-indexed is 3)
    const statusColumnIndex = 6;  // Column F: Entry State (Checked In vs Pending)
    const timestampColumnIndex = 7; // Column G: Entry Timestamp log
    
    // Scan all database rows (Skip headers at index 0)
    for (let i = 1; i < data.length; i++) {
      const dbToken = data[i][tokenColumnOffset];
      
      if (dbToken === scannedToken) {
        const rowNumber = i + 1;
        const statusRange = sheet.getRange(rowNumber, statusColumnIndex);
        const timestampRange = sheet.getRange(rowNumber, timestampColumnIndex);
        
        const currentStatus = statusRange.getValue();
        
        // Anti-Forgery check: Prevent duplicate use of the same credential
        if (currentStatus === "Checked In") {
          const checkInTime = timestampRange.getValue();
          Logger.log(`SECURITY ALERT: Token ${scannedToken} scan attempted again. Already checked in at ${checkInTime}.`);
          return "ALREADY_USED";
        }
        
        // Authorized verification: Grant entry
        statusRange.setValue("Checked In");
        timestampRange.setValue(new Date());
        
        Logger.log(`ACCESS GRANTED: Token ${scannedToken} verified successfully.`);
        return "ACCESS_GRANTED";
      }
    }
    
    // No match found in the whole spreadsheet database
    Logger.log(`ACCESS DENIED: Attempted entry with unregistered/forged Token: ${scannedToken}`);
    return "INVALID_TOKEN";
    
  } catch (error) {
    Logger.log(`CRITICAL ERROR inside validation mechanism: ${error.toString()}`);
    return "SYSTEM_ERROR";
  }
}
