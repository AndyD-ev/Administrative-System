const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const employeeRoutes = require("./routes/employeeRoutes")

const app = express()

app.use(cors())

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/employees", employeeRoutes)

app.get("/", (req, res) => {
  res.send("API funcionando")
})

module.exports = app