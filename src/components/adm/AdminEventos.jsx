import { useState } from "react";
import { supabase } from "../../supabaseClient";

function AdminEventos() {
  const [form, setForm] = useState({
    data_evento: "",
    titulo_chamativo: "",
    titulo_principal: "",
    local: "",
    hora: "",
    repertorio: "",
    descricao: "",
  });
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalvar = async () => {
    setLoading(true);
    try {
      let imagemUrl = null;
      if (imagem) {
        const nomeArquivo = `eventos/${Date.now()}-${imagem.name}`;
        const { error: uploadError } = await supabase.storage
          .from("arquivos_orquestra")
          .upload(nomeArquivo, imagem);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage
          .from("arquivos_orquestra")
          .getPublicUrl(nomeArquivo);
        imagemUrl = data.publicUrl;
      }

      const { error } = await supabase.from("eventos").insert({
        ...form,
        imagem_url: imagemUrl,
      });

      if (error) throw error;
      alert("Evento Agendado!");
    } catch (error) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: "10px" }}>
      <h2>Novo Evento</h2>
      <input
        type="date"
        name="data_evento"
        onChange={handleChange}
        style={{ padding: "8px" }}
      />
      <input
        type="time"
        name="hora"
        onChange={handleChange}
        style={{ padding: "8px" }}
      />
      <input
        type="text"
        name="titulo_chamativo"
        placeholder="Título Chamativo (Ex: Festa de São João)"
        onChange={handleChange}
        style={{ padding: "8px" }}
      />
      <input
        type="text"
        name="titulo_principal"
        placeholder="Título Principal (Ex: Concerto Junino)"
        onChange={handleChange}
        style={{ padding: "8px" }}
      />
      <input
        type="text"
        name="local"
        placeholder="Local"
        onChange={handleChange}
        style={{ padding: "8px" }}
      />
      <textarea
        name="repertorio"
        placeholder="Repertório"
        onChange={handleChange}
        style={{ padding: "8px", height: "60px" }}
      />
      <textarea
        name="descricao"
        placeholder="Descrição Breve"
        onChange={handleChange}
        style={{ padding: "8px", height: "60px" }}
      />

      <label>Imagem do Evento:</label>
      <input type="file" onChange={(e) => setImagem(e.target.files[0])} />

      <button
        onClick={handleSalvar}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: "#004400",
          color: "white",
          cursor: "pointer",
        }}
      >
        {loading ? "Salvando..." : "Agendar Evento"}
      </button>
    </div>
  );
}
export default AdminEventos;
