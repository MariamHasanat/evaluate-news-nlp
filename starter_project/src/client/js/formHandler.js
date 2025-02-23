import { checkURL } from './urlChecker'

const serverURL = 'http://localhost:8081/api'

const form = document.getElementById('urlForm');

// form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;


    // Check if the URL is valid
    if (Client.checkURL(formText)) {
        // If the URL is valid, send it to the server using the serverURL constant above

        console.log(`::: Form Submitted :::`);
        console.log(`URL: ${formText}`);

        // Send the URL to the server
        fetch(serverURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: formText }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                const scores = data.sentiment_scores;
                const highestScoreType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
                document.getElementById('results').innerHTML = `
                </br>
                <ul>
                <li><strong>Sentiment:</strong> ${data.sentiment}</li>
                </br>
                <li><strong>Content Type:</strong> ${highestScoreType}</li>
                </br>
                <li><strong>Input Text Preview:</strong> ${data.text}</li>
                </ul>
                `;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


}

form.addEventListener('submit', handleSubmit);


export { handleSubmit }
