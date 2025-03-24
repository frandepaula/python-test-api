import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    let formattedCpf = value;
    if (value.length > 3) {
      formattedCpf = value.slice(0, 3) + "." + value.slice(3);
    }
    if (value.length > 6) {
      formattedCpf = formattedCpf.slice(0, 7) + "." + formattedCpf.slice(7);
    }
    if (value.length > 9) {
      formattedCpf = formattedCpf.slice(0, 11) + "-" + formattedCpf.slice(11);
    }

    setCpf(formattedCpf);
  };

  const formatCpfForApi = (cpf: string) => cpf.replace(/\D/g, "");

  const checkCpf = async () => {
    const formattedCpf = formatCpfForApi(cpf);
    if (formattedCpf.length !== 11) {
      setError("O CPF deve conter exatamente 11 dígitos.");
      setStatus(null);
      return;
    }

    setLoading(true);
    setStatus(null);
    setError(null);

    try {
      const response = await axios.get(`http://127.0.0.1:5000/${formattedCpf}`);
      setStatus(response.data.status);
    } catch (error) {
      setError("Erro na consulta. Verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>🔍 Verificador de CPF</h2>
        <input
          type="text"
          placeholder="Digite o CPF"
          value={cpf}
          onChange={handleCpfChange}
          maxLength={14}
          style={styles.input}
        />
        <button onClick={checkCpf} style={styles.button} disabled={loading}>
          {loading ? "Consultando..." : "Consultar"}
        </button>

        {error && <p style={styles.error}>{error}</p>}
        {status && (
          <p style={styles.status}>
            Status:{" "}
            <strong style={{ color: status === "BLOCK" ? "#d9534f" : "#5cb85c" }}>
              {status === "BLOCK" ? "🚫 BLOQUEADO" : "✅ LIVRE"}
            </strong>
          </p>
        )}
      </div>
    </div>
  );
};

// 🎨 Estilos modernizados
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    width: "100%",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  button: {
    padding: "10px",
    width: "100%",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "#d9534f",
    marginTop: "10px",
  },
  status: {
    marginTop: "15px",
    fontSize: "18px",
  },
};

export default App;
