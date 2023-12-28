

const express = require("express");

const app = express();



// http://localhost:3000
app.get('/', (req, res) => {
   res.send(`<h1>Cool </h1>`);
});

app.post("/cheese", (req, res) => {
   console.log('cheese')
})

app.listen(3000);