const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {

  try {

    const { email, password } = req.body
    console.log("EMAIL:", email)
    // Buscar usuario
    const user = await User.findOne({ email })

    const allUsers = await User.find()


    console.log("ALL USERS:", allUsers)

    console.log("USER:", user)
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      })
    }

    // Verificar password
    const validPassword = await bcrypt.compare(
      password,
      user.password
    )

    if (!validPassword) {
      return res.status(401).json({
        message: "Contraseña incorrecta"
      })
    }

    // Generar token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    )

    res.json({
      token
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

module.exports = {
  login
}