import { useEffect, useState } from "react"

export default function Employees() {

  const [employees, setEmployees] = useState([])

  const [search, setSearch] = useState("")

  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const [direccion, setDireccion] = useState("")

  const [editingId, setEditingId] = useState(null)

  const token = localStorage.getItem("token")

  // 🔵 GET EMPLOYEES
  const getEmployees = async () => {

    try {

      const res = await fetch(
        "http://localhost:3000/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await res.json()

      setEmployees(data)

    } catch (error) {

      console.log(error)

    }

  }

  // 🔎 SEARCH
  const searchEmployees = async () => {

    if (!search.trim()) {

      return getEmployees()

    }

    try {

      const res = await fetch(
        `http://localhost:3000/employees/search?nombre=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await res.json()

      setEmployees(data)

    } catch (error) {

      console.log(error)

    }

  }

  // ➕ CREATE
  const createEmployee = async () => {

    try {

      await fetch(
        "http://localhost:3000/employees",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            nombre,
            apellidos,
            telefono,
            correo,
            direccion
          })
        }
      )

      // limpiar form
      setNombre("")
      setApellidos("")
      setTelefono("")
      setCorreo("")
      setDireccion("")

      // actualizar lista
      getEmployees()

    } catch (error) {

      console.log(error)

    }

  }

  // 🗑 DELETE
  const deleteEmployee = async (id) => {

    try {

      await fetch(
        `http://localhost:3000/employees/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      getEmployees()

    } catch (error) {

      console.log(error)

    }

  }

  // ✏ UPDATE
  const updateEmployee = async () => {

    try {

      await fetch(
        `http://localhost:3000/employees/${editingId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            nombre,
            apellidos,
            telefono,
            correo,
            direccion
          })
        }
      )

      // limpiar form
      setNombre("")
      setApellidos("")
      setTelefono("")
      setCorreo("")
      setDireccion("")

      setEditingId(null)

      getEmployees()

    } catch (error) {

      console.log(error)

    }

  }

  // 📥 LOAD EMPLOYEE
  const loadEmployee = (emp) => {

    setNombre(emp.nombre)
    setApellidos(emp.apellidos)
    setTelefono(emp.telefono)
    setCorreo(emp.correo)
    setDireccion(emp.direccion)

    setEditingId(emp._id)

  }

  useEffect(() => {

    getEmployees()

  }, [])

  return (

    <div>

      <h1>Employees</h1>

      <h2>
        {
          editingId
            ? "Editar empleado"
            : "Crear empleado"
        }
      </h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) =>
          setNombre(e.target.value)
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Apellidos"
        value={apellidos}
        onChange={(e) =>
          setApellidos(e.target.value)
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Telefono"
        value={telefono}
        onChange={(e) =>
          setTelefono(e.target.value)
        }
      />

      <br /><br />

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) =>
          setCorreo(e.target.value)
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Direccion"
        value={direccion}
        onChange={(e) =>
          setDireccion(e.target.value)
        }
      />

      <br /><br />

      {
        editingId ? (

          <button onClick={updateEmployee}>
            Actualizar
          </button>

        ) : (

          <button onClick={createEmployee}>
            Guardar
          </button>

        )
      }

      <hr />

      <input
        type="text"
        placeholder="Buscar empleado..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <button onClick={searchEmployees}>
        Buscar
      </button>

      <button onClick={getEmployees}>
        Reset
      </button>

      <hr />

      {
        Array.isArray(employees) &&
        employees.map((emp) => (

          <div key={emp._id}>

            <h3>
              {emp.nombre} {emp.apellidos}
            </h3>

            <p>
              {emp.telefono}
            </p>

            <p>
              {emp.correo}
            </p>

            <p>
              {emp.direccion}
            </p>

            <button
              onClick={() =>
                deleteEmployee(emp._id)
              }
            >
              Eliminar
            </button>

            <button
              onClick={() =>
                loadEmployee(emp)
              }
            >
              Editar
            </button>

            <hr />

          </div>

        ))
      }

    </div>

  )

}