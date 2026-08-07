# EverTech Partnership Agreement — Electronic Signing App

A static web app where the 4 named partners (Waheed Gulzar, Muhammad Ateeb,
Muhammad Saad Iftikhar, Moqaddas Arooj) can each review the partnership
agreement, enter their CNIC and address, and sign electronically. Once all
4 have signed, anyone can download the complete, merged agreement as a PDF
with all signatures, details, and the system-generated Effective Date
already filled in.

## How it works

- **Firebase Firestore** stores each partner's signature, CNIC, address,
  and a server-generated timestamp (not the visitor's own device clock —
  see `firestore.rules`, which makes this tamper-proof).
- The status board updates **live** for everyone viewing the page —
  no refresh needed.
- Once all 4 signatures exist, the **Effective Date** is automatically
  calculated as the date of the 4th (last) signature, and the download
  button appears for everyone.
- The final PDF is generated **entirely in the visitor's browser** —
  no server needed to build the document.

## Setup (before deploying)

1. **Create a Firebase project** at https://console.firebase.google.com
   → Add project → skip Analytics → Create.
2. **Enable Firestore**: Build → Firestore Database → Create database →
   "Start in production mode" → pick a region → Enable.
3. **Register a web app**: Project Settings (gear icon) → scroll to
   "Your apps" → click the `</>` icon → register it → copy the config
   object it shows you.
4. **Paste your config into `firebase-config.js`** — replace every
   `PASTE_YOUR_..._HERE` placeholder with the real value from step 3.
   This file being public on GitHub is completely normal for Firebase
   web apps — it is not a secret. Security comes from step 5, not from
   hiding this file.
5. **Set the security rules**: Firestore Database → Rules tab → replace
   everything with the contents of `firestore.rules` in this project →
   Publish.

## Deploying to GitHub Pages

1. Create a new GitHub repository, push all files in this folder to it.
2. Go to the repo's **Settings → Pages**.
3. Under "Build and deployment," set Source to **Deploy from a branch**,
   branch `main`, folder `/ (root)` → Save.
4. GitHub will give you a live URL, typically
   `https://<your-username>.github.io/<repo-name>/` — that's the link
   to send your partners.

## Testing before sending to real partners

Open the deployed link yourself, select each of the 4 names one at a time
from the dropdown (in different browser tabs/windows, or just switch the
dropdown and refresh between each), and sign as a test to confirm the
whole flow works end to end. **You'll need to manually delete the 4 test
documents from the Firestore console afterward** (Firestore Database →
Data tab → `signatures` collection → delete each test document) before
your real partners sign — the rules prevent re-signing over an existing
document, including test ones.

## Files

- `index.html` — page structure
- `style.css` — EverTech brand styling
- `contract-data.js` — the full agreement text, and the fixed list of 4 partners
- `firebase-config.js` — **you must edit this** with your own Firebase project keys
- `firestore.rules` — paste into Firebase Console, not used directly by the app
- `app.js` — all app logic: live sync, signature capture, PDF generation

## Known limitations

- This is **not** a substitute for a licensed e-signature platform
  (DocuSign, etc.) for anything that needs to be airtight in court —
  it's a solid, honest internal tool for a 4-person partnership, not a
  certified e-signature service with identity verification.
- The Firebase free tier (Spark plan) comfortably covers this use case —
  4 signatures is nowhere near its limits — but if you reuse this app
  pattern for something with heavy traffic later, check Firebase's
  current free-tier limits.
- If a partner needs to correct a mistake after signing (wrong CNIC,
  etc.), the rules block editing — you'd need to manually delete their
  document in the Firestore console and have them re-sign.
