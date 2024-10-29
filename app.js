import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // remember to change this in production

app.get('/', (req, res) => {
    res.send('Hola nena');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});