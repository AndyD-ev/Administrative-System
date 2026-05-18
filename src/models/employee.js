const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true
  },

  apellidos: {
    type: String,
    required: true
  },

  telefono: {
    type: String,
    required: true
  },

  correo: {
    type: String,
    required: true
  },

  direccion: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model(
  "Employee",
  employeeSchema
)