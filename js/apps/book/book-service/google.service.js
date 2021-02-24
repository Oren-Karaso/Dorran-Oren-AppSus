const KEY = 'AIzaSyDiZGdxi9rYCGptyWoyGhBae-FC9wg5AEs';

export const googleService = {
    getBooks
}

function getBooks(searchTerm) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
        .then(res => {
            console.log('Service Got Res:', res);
            return res.data.items;
        })
        .catch(err => {
            console.log('Service got Error:', err);
        })
}