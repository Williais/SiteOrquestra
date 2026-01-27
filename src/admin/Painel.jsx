import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

import AdminNoticias from "../components/adm/AdminNoticias";
import AdminMusicos from "../components/adm/AdminMusicos";
import AdminEventos from "../components/adm/AdminEventos"

function Painel() {
  const [abaAtiva, setAbaAtiva] = useState("noticias");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin");
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
        }}
      >
        <h1>Painel do Maestro</h1>
        <button
          onClick={handleLogout}
          style={{
            background: "black",
            color: "white",
            padding: "5px 15px",
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      </header>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setAbaAtiva("noticias")}>Notícias</button>
        <button onClick={() => setAbaAtiva("musicos")}>Músicos</button>
        <button onClick={() => setAbaAtiva("eventos")}>Eventos</button>
      </div>

      <div
        style={{ background: "#f4f4f4", padding: "20px", borderRadius: "8px" }}
      >
        {abaAtiva === "noticias" && <AdminNoticias />}
        {abaAtiva === "musicos" && <AdminMusicos />}
        {abaAtiva === "eventos" && <AdminEventos />}
      </div>
    </div>
  );
}

export default Painel;
