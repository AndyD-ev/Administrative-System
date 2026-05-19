const Employee = require("../models/employee")

const createEmployee = async (req, res) => {

  try {

    const employee = new Employee(req.body)

    await employee.save()

    res.status(201).json(employee)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

const getEmployees = async (req, res) => {

  try {

    const employees = await Employee.find()

    res.json(employees)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

const searchEmployee = async (req, res) => {
  try {
    const { nombre } = req.query

    if (!nombre) {
      return res.status(400).json({
        message: "Debes enviar el parámetro 'nombre'"
      })
    }

    const safeName = nombre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    const employees = await Employee.find({
      nombre: {
        $regex: safeName,
        $options: "i"
      }
    })

    res.json(employees)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const updateEmployee = async (req, res) => {

  try {

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    )

    res.json(employee)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

const deleteEmployee = async (req, res) => {

  try {

    await Employee.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message: "Empleado eliminado"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

module.exports = {
  createEmployee,
  getEmployees,
  searchEmployee,
  updateEmployee,
  deleteEmployee
}
