// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let browser; // Puppeteer instance

// Initialize Puppeteer once and reuse it
(async () => {
    browser = await puppeteer.launch({ headless: true });
})();

// Optimized Puppeteer Scraper
async function scrapeWithPuppeteer(url) {
    if (!browser) browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
        const text = await page.evaluate(() => document.body.innerText.trim());
        return text.slice(0, 200);
    } catch (error) {
        console.error('Puppeteer scraping failed:', error.message);
        return null;
    } finally {
        await page.close(); // Close only the page, not the browser
    }
}

// API Route
app.post('/api', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const text = await scrapeWithPuppeteer(url);
        if (!text) return res.status(400).json({ error: 'No text content found' });

        const response = await axios.post('https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer', { text });
        return res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ error: 'Failed to analyze the URL' });
    }
});

app.get('/', (req, res) => {
    res.send("Server is running.");
});

// Start the server
app.listen(8081, () => console.log('Server running on port 8081'));