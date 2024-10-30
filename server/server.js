import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); // Create express app
app.use(cors()); // Allow CORS

const PORT = process.env.PORT; // Port at which server will run

app.get('/', async (req, res) => {
    try {
        const { text, source, target } = req.query;
        const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${source}|${target}`;
        const response = await fetch(url);
        const json = await response.json();
        const matches = await json.matches;
        const translatedText = matches[matches.length - 1].translation || 'No translation found';
        res.send(translatedText);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.send('Something went wrong!');
    }
}); // Route to translate text

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
