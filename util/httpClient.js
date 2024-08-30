const https = require('https');

class HttpClient {
    static fetch(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';
                
                res.setEncoding('utf8');
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
                
                res.on('error', (err) => {
                    reject(err);
                });
            });
        });
    }
}

module.exports = HttpClient;
