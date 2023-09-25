import express from "express";

const app = express();
const PORT = 80;

app.use(express.static('public'));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend Server ready at http://localhost:${PORT}`)
});

