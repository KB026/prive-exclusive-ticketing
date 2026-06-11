🎫 PRIVE: Automated Event Access Control & Ticketing System

📌 Overview

PRIVE - Chapter 1: The Genesis is a high-profile, invite-only event requiring strict access control and zero margin for manual error. This project is a Fully Automated Guest Management and Ticketing Pipeline. It handles everything from dispatching personalized secure invitations to real-time verification and digital ticket generation, completely eliminating the need for manual data entry or monitoring.

🚀 The Problem vs. The Solution

The Problem: Managing a curated guest list manually leads to human errors, unauthorized RSVP entries, formatting issues in emails, and delayed ticket distribution.
The Solution: A centralized, low-code/scripted pipeline that acts as a "Digital Bouncer," automatically verifying RSVPs against a Master Database and dispatching cross-client compatible HTML tickets instantly.

⚙️ Key Features

🔒 The "Digital Bouncer" (Real-time Verification): An algorithmic check that intercepts RSVP submissions. It cross-references the submitting email against the verified Master_Data_Mirror sheet to grant or reject access instantly.

✉️ Smart Automated Invitations: Dispatches highly customized HTML emails containing personalized, pre-filled Google Form URLs to ensure guests cannot manipulate their RSVP credentials.

🎟️ Dynamic Member ID Generation: Auto-generates sequential, tamper-proof alphanumeric IDs (e.g., PRIVE-MEM-3226G01) for verified entries.

📱 Universal HTML Tickets: Developed highly responsive, table-based HTML/CSS email templates optimized for both Light/Dark modes across Gmail, Apple Mail, and Outlook.

💬 WhatsApp Bulk Outreach: Engineered parameterized URL strings for frictionless, personalized bulk WhatsApp marketing bypassing traditional API limits.

🏗️ System Architecture & Workflow

The system operates on a 4-tier automated workflow:

Approval Tier: Admin marks a guest as "Invited" (Checkbox in Col W) in the Master Database.

Dispatch Tier: System detects the trigger and emails a secure, pre-filled RSVP link.

Authentication Tier: User submits the RSVP. The database runs an ARRAYFORMULA check to verify if the submitting email matches the approved list.

Fulfillment Tier: If status is VERIFIED_MEMBER, the system automatically merges data into an HTML ticket template and emails the final Entry Pass.

💻 Core Logic Snippets

1. Dynamic Verification Engine (Spreadsheet Logic)
To ensure zero unauthorized entries, this array formula constantly listens to incoming form responses and verifies them against the approved Master List (Checking Email against Checkbox Status in Column W):

=ARRAYFORMULA(IF(D2:D="", "", IF(COUNTIFS(Master_Data_Mirror!D:D, D2:D, Master_Data_Mirror!W:W, TRUE)>0, "VERIFIED_MEMBER", "REJECTED")))


2. Automated ID Generation
Generates sequential IDs without requiring manual dragging:

=ARRAYFORMULA(IF(D2:D="", "", "PRIVE-MEM-3226G" & TEXT(ROW(D2:D)-1, "00")))


3. Parameterized Direct Marketing Links
Used for bulk, personalized WhatsApp outreach:

=HYPERLINK("[https://web.whatsapp.com/send?phone=91](https://web.whatsapp.com/send?phone=91)"&A2&"&text="&ENCODEURL("Hey *"&B2&"*, Your invite to PRIVE is here..."), "🚀 Send Pass")


🛠️ Technology Stack

Database & Logic: Google Sheets, Advanced ArrayFormulas, Data Validation.

Frontend Data Collection: Google Forms (with pre-filled parameters).

Automation Engine: Google Apps Script / Autocrat (Event-driven triggers).

UI/UX (Emails): HTML5, Inline CSS (Table-based layout for maximum email client compatibility).

🔮 Future Scope (AI Integration)

As an AI Engineering student, the next phase of this project could involve:

Facial Recognition Entry: Connecting the database to a Python/OpenCV script at the venue gate to scan faces and auto-check-in guests based on their PRIVE-MEM-ID.

Predictive Attendance: Using basic machine learning on past event data to predict the actual show-up rate of the RSVP'd guests.

Built with logic, automation, and a lot of coffee.
