import app from './config/app';

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`RedditDailySoup API listening on port ${PORT}`);
})
