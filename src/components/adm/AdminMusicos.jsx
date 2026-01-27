import { useState } from "react";
import { supabase } from "../../supabaseClient";

function AdminMusicos() {
  const [nome, setNome] = useState("");
  const [instrumento, setInstrumento] = useState("");
  const [ano, setAno] = useState("");
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    setLoading(true);
    try {
      let imagemUrl = null;
      if (imagem) {
        const nomeArquivo = `musicos/${Date.now()}-${imagem.name}`;
        const { error: uploadError } = await supabase.storage
          .from("arquivos_orquestra")
          .upload(nomeArquivo, imagem);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("arquivos_orquestra")
          .getPublicUrl(nomeArquivo);
        imagemUrl = data.publicUrl;
      }

      const { error } = await supabase.from("musicos").insert({
        nome,
        instrumento,
        ano_inicio: ano,
        imagem_url: imagemUrl,
      });

      if (error) throw error;
      alert("Músico Adicionado!");
      setNome("");
      setInstrumento("");
      setImagem(null);
    } catch (error) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Novo Músico</h2>
      <input
        type="text"
        placeholder="Nome Completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          width: "100%",
          padding: "8px",
        }}
      />
      <input
        type="text"
        placeholder="Instrumento (ex: Violino I)"
        value={instrumento}
        onChange={(e) => setInstrumento(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          width: "100%",
          padding: "8px",
        }}
      />
      <input
        type="text"
        placeholder="Ano Início (ex: Desde 2018)"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          width: "100%",
          padding: "8px",
        }}
      />

      <label>Foto:</label>
      <input
        type="file"
        onChange={(e) => setImagem(e.target.files[0])}
        style={{ display: "block", margin: "10px 0" }}
      />

      <button
        onClick={handleSalvar}
        disabled={loading}
        style={{ padding: "10px 20px", background: "#1a1a1a", color: "white" }}
      >
        {loading ? "Salvando..." : "Adicionar Músico"}
      </button>
    </div>
  );
}
export default AdminMusicos;
