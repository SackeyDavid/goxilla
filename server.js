function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

const express = require('express');
const path = require('path');

const app = express();
app.use(requireHTTPS);

// Serve only the static files form the dist directory
app.use(express.static('./dist/abp-zero-template'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/abp-zero-template/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);