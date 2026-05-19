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
  const handleLogout = () => {
  localStorage.removeItem("token")
  window.location.href = "/"
  }

  // 🔵 GET EMPLOYEES
  const getEmployees = async () => {

    try {

      const res = await fetch(
        "https://administrative-system.onrender.com/employees",
        //"http://localhost:3000/employees",
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
        `https://administrative-system.onrender.com/employees/search?nombre=${search}`,
        //`http://localhost:3000/employees/search?nombre=${search}`,
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
         "https://administrative-system.onrender.com/employees",
        //"http://localhost:3000/employees",
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

      clearForm()

      getEmployees()

    } catch (error) {

      console.log(error)

    }

  }

  // 🗑 DELETE
  const deleteEmployee = async (id) => {

    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este empleado?"
    )

    if (!confirmDelete) return

    try {

      await fetch(
        `https://administrative-system.onrender.com/employees/${id}`,
        //`http://localhost:3000/employees/${id}`,
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
         `https://administrative-system.onrender.com/employees/${editingId}`,
        //`http://localhost:3000/employees/${editingId}`,
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

      clearForm()

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

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

  }

  // 🧹 CLEAR FORM
  const clearForm = () => {

    setNombre("")
    setApellidos("")
    setTelefono("")
    setCorreo("")
    setDireccion("")

  }

  useEffect(() => {

    getEmployees()

  }, [])

  return (

    <div style={styles.page}>

      <div style={styles.container}>

        <h1 style={styles.title}>
          Employee System
        </h1>

        <div style={styles.card}>

          <h2 style={styles.subtitle}>
            {
              editingId
                ? "Editar empleado"
                : "Crear empleado"
            }
          </h2>

          <div style={styles.grid}>

            <input
              style={styles.input}
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
            />

            <input
              style={styles.input}
              type="text"
              placeholder="Apellidos"
              value={apellidos}
              onChange={(e) =>
                setApellidos(e.target.value)
              }
            />

            <input
              style={styles.input}
              type="text"
              placeholder="Telefono"
              value={telefono}
              onChange={(e) =>
                setTelefono(e.target.value)
              }
            />

            <input
              style={styles.input}
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) =>
                setCorreo(e.target.value)
              }
            />

          </div>

          <input
            style={styles.input}
            type="text"
            placeholder="Direccion"
            value={direccion}
            onChange={(e) =>
              setDireccion(e.target.value)
            }
          />

          <div style={styles.buttonContainer}>
            <button
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "15px"
              }}
              onClick={() => {
                localStorage.removeItem("token")
                window.location.href = "/"
              }}
            >
              Salir
            </button>

            {
              editingId ? (

                <button
                  style={styles.updateButton}
                  onClick={updateEmployee}
                >
                  Actualizar
                </button>

              ) : (

                <button
                  style={styles.primaryButton}
                  onClick={createEmployee}
                >
                  Guardar
                </button>

              )
            }

          </div>

        </div>

        <div style={styles.searchContainer}>

          <input
            style={styles.searchInput}
            type="text"
            placeholder="Buscar empleado por nombre..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button
            style={styles.searchButton}
            onClick={searchEmployees}
          >
            Buscar
          </button>

          <button
            style={styles.resetButton}
            onClick={getEmployees}
          >
            Reset
          </button>

        </div>

        <div style={styles.employeeGrid}>

          {
            Array.isArray(employees) &&
            employees.map((emp) => (

              <div
                key={emp._id}
                style={styles.employeeCard}
              >

                <h3 style={styles.employeeName}>
                  {emp.nombre} {emp.apellidos}
                </h3>

                <p style={styles.employeeText}>
                  📞 {emp.telefono}
                </p>

                <p style={styles.employeeText}>
                  📧 {emp.correo}
                </p>

                <p style={styles.employeeText}>
                  📍 {emp.direccion}
                </p>

                <div style={styles.actionButtons}>

                  <button
                    style={styles.editButton}
                    onClick={() =>
                      loadEmployee(emp)
                    }
                  >
                    Editar
                  </button>

                  <button
                    style={styles.deleteButton}
                    onClick={() =>
                      deleteEmployee(emp._id)
                    }
                  >
                    Eliminar
                  </button>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  )

}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    padding: "40px 20px",
    fontFamily: "Arial"
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto"
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1e293b",
    fontSize: "40px"
  },

  subtitle: {
    marginBottom: "20px",
    color: "#334155"
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    marginBottom: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "15px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    marginBottom: "15px",
    boxSizing: "border-box"
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center"
  },

  primaryButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px"
  },

  updateButton: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px"
  },

  searchContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px"
  },

  searchInput: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px"
  },

  searchButton: {
    background: "#0f172a",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  resetButton: {
    background: "#64748b",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  employeeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },

  employeeCard: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  employeeName: {
    marginBottom: "10px",
    color: "#0f172a"
  },

  employeeText: {
    color: "#475569",
    marginBottom: "8px"
  },

  actionButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "15px"
  },

  editButton: {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  deleteButton: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer"
  }

}
