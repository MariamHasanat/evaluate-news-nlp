// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}



// Initialize the Express application
const app = express();


// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Encapsulated function to scrape text from a URL
async function scrapeWithPuppeteer(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    await page.goto(url, { waitUntil: 'networkidle2' });

    const text = await page.evaluate(() => document.body.innerText.trim());
    await browser.close();
    
    return text.slice(0, 200);
}

// Route to analyze text from a URL
app.post('/api', async (req, res) => {
    const { url } = req.body;

    // Validate the input URL
    if (!url) {
        console.error('No URL provided in the request body');
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Step 1: Scrape text from the provided URL
        const text = await scrapeWithPuppeteer(url);

        if (!text) {
            return res.status(400).json({ error: 'No text content found at the provided URL' });
        }

        // Step 2: Connect to the AWS NLP API
        // --- Learner Task: Add the code to send the extracted text to the AWS NLP API below ---
        // Use `axios.post` to send a POST request to the API.
        // The endpoint URL is: https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer
        // Send the `text` as part of the request body.


        const response = await axios.post('https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer', { text: text });
        return res.json(response.data); // Send the NLP results back to the client
        

        // Placeholder response for learners to complete
        // return res.json({ message: 'NLP analysis result will be here. Complete the API call above!' });
    } catch (error) {
        console.error('Error during URL processing or API request:', error.message);
        return res.status(500).json({ error: 'Failed to analyze the URL' });
    }
});

app.get('/test', function (req, res) {
    res.json(json);
})

// Default route
app.get('/', (req, res) => {
    res.send("This is the server API page. You may access its services via the client app.");
});

// Start the server
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
