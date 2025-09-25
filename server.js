const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Increase payload limit (in case you send large JSON)
app.use(express.json({ limit: '1mb' }));

// 🔴 REPLACE WITH YOUR FIREBASE DATABASE URL (from your code)
const FIREBASE_DB = "bmsdata-efcbe-default-rtdb.asia-southeast1.firebasedatabase.app";

// Endpoint: POST /send
app.post('/send', async (req, res) => {
  try {
    console.log("📡 Received data:", req.body);

    // Send to Firebase (using PUT to replace /test.json)
    const firebaseUrl = `https://${FIREBASE_DB}/test.json`;
    const response = await axios.put(firebaseUrl, req.body);

    console.log("✅ Sent to Firebase | Status:", response.status);
    res.status(200).json({ success: true, firebaseStatus: response.status });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check (so you can test in browser)
app.get('/', (req, res) => {
  res.json({ status: "Firebase Relay is running!", endpoint: "/send" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
