import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';

const app = express();
app.use(express.json()); 
app.use(cors()); // remember to change this in production

dotenv.config();
const port = process.env.PORT || 3000;

const characters = [
    'Sponge Bob',
    'Patrick',
    'Squidward',
    'Mr. Krabs',
    'Sandy',
    'Plankton'
 ];

 app.get('/', (req, res) => {
    res.json({ message: `Wrong endpoint ${characters[Math.floor(Math.random() * characters.length)]}, try /api/incidentes`});
 });

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});