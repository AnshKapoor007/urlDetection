const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors'); // Import the 'cors' module

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/detectUrl', (req, res) => {

    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: "'urls' property is missing or invalid" });
    }

    const pythonProcess = spawn('python', ['detectUrl.py']);
    pythonProcess.stdin.write(JSON.stringify(urls));
    pythonProcess.stdin.end();

    let dataToSend = '';

    pythonProcess.stdout.on('data', (data) => {
        dataToSend += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                const result = JSON.parse(dataToSend.trim());
                res.json({ result });
            } catch (err) {
                res.status(500).json({ error: 'Invalid response from Python script' });
            }
        } else {
            res.status(500).json({ error: 'Python process failed' });
        }
    });

    pythonProcess.on('error', (err) => {
        res.status(500).json({ error: 'Failed to spawn Python process' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
