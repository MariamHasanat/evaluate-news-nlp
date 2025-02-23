function checkURL(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        alert("Invalid URL");
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}


export { checkURL };
