Premium E-Pass Generation & Secure Verification System

Developed for: PRIVE – Chapter 1 Exclusive Ticketing

An automated, secure, and production-ready event ticketing, credential generation, and check-in validation system. Built to handle invite-only VIP guest lists, this system eliminates manual ticketing workflows, guarantees credential security, and ensures smooth gate operations through dynamic cloud integrations.

💎 Features

Anti-Forgery Pass Security: Computes randomized, secure member tokens (e.g., PRIVE-MEM-A5E8D2-4C10) for every guest, completely preventing pass sharing or ticket replication.

Branded Credential Merges: Custom-merges VIP metadata directly into high-fidelity PDF passes using AutoCrat, generating passes that match the event's high-end design aesthetics.

On-the-Fly QR Generation: Utilizes Google Apps Script and the Google Charts API to generate dynamic QR codes mapped directly to individual secure tokens.

Sub-Minute Automated Dispatch: Triggers an automated cloud mail-merge immediately upon guest RSVP, delivering PDF passes directly to the attendee's email inbox within seconds.

Digital Gatekeeper Database: Features a centralized, secure check-in database tracking arrival state (Checked In vs. Pending) and logging validation timestamps in real time.

🛠️ Technology Stack

Workflow Orchestration: AutoCrat Automation Engine

Database & Ingestion: Google Forms / Google Sheets

Custom Back-End Automation: JavaScript / Google Apps Script (V8 Engine)

Delivery Infrastructure: Gmail API & SMTP Engine

Asset & Visual Design: CorelDRAW & Figma (used for premium backdrop assets)

⚙️ Architecture & Data Pipeline

  [ VIP Guest RSVPs ] 
          │ (Form Submission)
          ▼
  [ Centralized Cloud DB ] ──▶ [ Apps Script Engine ] ──▶ [ QR Generation API ]
     (Google Sheets)            (Token Math & Logging)     (Dynamic Chart QR)
          │
          ▼ (Trigger Event)
  [ AutoCrat Merge Engine ] ──▶ [ High-Fidelity Asset Template ]
          │                          (Google Slides Backdrop)
          ▼ (Output Compilation)
  [ Secure Guest PDF Pass ]
          │
          ▼ (Automated Dispatch)
  [ Gmail API Delivery ] ──▶ [ Guest Inbox ]


🚀 How to Replicate This System

1. Database Configuration

Set up a Google Form linked to a target Google Sheet to collect guest RSVPs.

Ensure your spreadsheet has column headers for: Timestamp, Name, Email, Secure Member Token, Verification QR Code, Entry Status, and Entry Timestamp.

2. Back-End Script Deployment

In your Google Sheet, navigate to Extensions > Apps Script.

Copy the script inside src/validation-engine.js from this repository and paste it into the editor.

Save the project.

Navigate to the Triggers tab (clock icon on the left panel) and add a new trigger:

Choose which function to run: onRSVPSubmit

Choose which deployment should run: Head

Select event source: From spreadsheet

Select event type: On form submit

3. Template Setup

Design your premium pass backdrop on Google Slides (or upload a static backdrop from Figma/CorelDRAW to Google Slides).

Insert dynamic merge tags inside your layout exactly where you want them to render:

<<Guest_Name>>

<<Member_Token>>

<<QR_Code_Image>> (This will be mapped to pull the dynamic QR image directly into the slide).

4. AutoCrat Integration

Install and open the AutoCrat extension in your Google Sheet.

Create a new merge job and link it to your Google Slides template.

Map your spreadsheet columns to your merge tags. Crucially, map <<QR_Code_Image>> as an Image type pointing to your QR code URL column.

Set the file output type to PDF and choose an automated naming convention (e.g., PRIVE_Pass_<<Guest_Name>>).

Configure the automated email step to attach the compiled PDF and dispatch it using your linked Gmail account.

Enable "Run on form trigger" in the job settings so the entire loop executes instantly when someone submits their RSVP.

📄 License

This project is licensed under the MIT License - see the LICENSE file