import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {

    try {

      const res = await fetch(
        "http://localhost:3000/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await res.json()

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        )

        navigate("/employees")

      } else {

        alert("Credenciales incorrectas")

      }

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Employee <br />
          <span style={{
            color: "#2563eb"
          }}>
           <br /> System
          </span>
        </h1>

        <p style={styles.subtitle}>
          Inicia sesión para continuar
        </p>

        <input
          style={styles.input}
          type="email"
          placeholder="Correo"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Contraseña"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          style={styles.button}
          onClick={handleLogin}
        >
          Entrar
        </button>

      </div>

    </div>

  )

}

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9",
    fontFamily: "Arial"
  },

  card: {
    width: "350px",
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  title: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#0f172a"
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "-1px"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px"
  },

  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "10px"
  }

}