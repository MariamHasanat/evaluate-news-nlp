import { checkURL } from '../src/client/js/urlChecker'; // Adjust the import path as needed

describe('checkURL', () => {
    test('valid HTTP URL returns true', () => {
        expect(checkURL('http://example.com')).toBe(true);
    });

    test('valid HTTPS URL returns true', () => {
        expect(checkURL('https://example.com')).toBe(true);
    });

    test('valid URL with another protocol returns false', () => {
        expect(checkURL('ftp://example.com')).toBe(false);
    });

    test('invalid URL returns false', () => {
        // Mock alert to prevent actual alert dialog
        global.alert = jest.fn();

        expect(checkURL('invalid-url')).toBe(false);
        expect(global.alert).toHaveBeenCalledWith("Invalid URL");
    });

    test('empty string returns false', () => {
        expect(checkURL('')).toBe(false);
    });
});
