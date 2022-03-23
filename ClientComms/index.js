const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Hello World!");
    }
);

app.get("/data/", (req, res) => {
    res.send("Such data! much wow!");
    }
);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});