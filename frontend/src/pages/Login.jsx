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

      console.log(data)

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

    <div>

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Correo"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleLogin}>
        Entrar
      </button>

    </div>

  )

}