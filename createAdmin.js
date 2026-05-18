require("dotenv").config()

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const User = require("./src/models/user")

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  const hashedPassword = await bcrypt.hash(
    "admin123",
    10
  )

  const user = new User({
    email: "admin@test.com",
    password: hashedPassword
  })

  await user.save()

  console.log("Admin creado")

  process.exit()

})
.catch((error) => {

  console.log(error)

})