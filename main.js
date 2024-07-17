const express = require("express")
const app = express()
app.use(express.json());

require("dotenv").config();

app.get('/', (req,res) => {
    res.send("hello world")
})

const Tasks = require("./Routes/tasks");
app.use(Tasks);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`App is live: http://localhost:${port} and listening on port ${port}`)
})