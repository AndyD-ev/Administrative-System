const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const employeeRoutes = require("./routes/employeeRoutes")

const app = express()

app.use(cors({
  origin: [
    "https://administrative-system.vercel.app",
    "https://administrative-system-a4g36e0eq-andyd-evs-projects.vercel.app"
  ]
}))

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/employees", employeeRoutes)

app.get("/", (req, res) => {
  res.send("API funcionando")
})

module.exports = app