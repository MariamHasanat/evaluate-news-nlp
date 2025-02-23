import { handleSubmit } from '../src/client/js/formHandler'; // Adjust the import path as needed
import { checkURL } from '../src/client/js/urlChecker';

// Mock the checkURL function
jest.mock('../src/client/js/urlChecker');

const mockEvent = {
    preventDefault: jest.fn(),
};

describe('handleSubmit', () => {
    beforeEach(() => {
        // Setup DOM elements
        document.body.innerHTML = `
            <form id="urlForm">
                <input id="name" value="http://example.com" />
                <div id="results"></div>
            </form>
        `;
        fetch.resetMocks(); // Reset fetch mocks before each test
    });

    test('valid URL submits form and fetches data', async () => {
        // Mock checkURL to return true
        checkURL.mockReturnValue(true);

        // Mock the fetch response
        fetch.mockResponseOnce(JSON.stringify({
            sentiment: 'positive',
            sentiment_scores: { positive: 0.8, negative: 0.2 },
            text: 'This is a sample input text.',
        }));

        await handleSubmit(mockEvent); // Call the handleSubmit function

        expect(mockEvent.preventDefault).toHaveBeenCalled(); // Ensure preventDefault was called
        expect(checkURL).toHaveBeenCalledWith('http://example.com'); // Check if checkURL was called with the correct URL
        expect(fetch).toHaveBeenCalledWith('http://localhost:8081/api', { // Ensure fetch was called with correct arguments
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: 'http://example.com' }),
        });

        const resultsDiv = document.getElementById('results');
        expect(resultsDiv.innerHTML).toContain('Sentiment: positive'); // Check if results are rendered correctly
        expect(resultsDiv.innerHTML).toContain('Content Type: positive');
        expect(resultsDiv.innerHTML).toContain('Input Text Preview: This is a sample input text.');
    });

    test('invalid URL does not submit form', async () => {
        // Mock checkURL to return false
        checkURL.mockReturnValue(false);

        await handleSubmit(mockEvent); // Call the handleSubmit function

        expect(mockEvent.preventDefault).toHaveBeenCalled(); // Ensure preventDefault was called
        expect(checkURL).toHaveBeenCalledWith('http://example.com'); // Check if checkURL was called
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called for invalid URL
    });
});
