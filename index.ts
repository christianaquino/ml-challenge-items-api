import express from "express";
import itemsRouter from './src/routes/items'
const app = express();

app.get('/', (req, res) => {
    res.send('App is up and running')
});

app.use('/api', itemsRouter)

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));