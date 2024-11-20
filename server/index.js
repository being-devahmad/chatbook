import express from 'express' // type -> module
const app = express()

app.listen(5001, () => {
    console.log("server is running on port 5001")
})