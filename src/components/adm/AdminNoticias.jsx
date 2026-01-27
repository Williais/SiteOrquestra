import { useState } from "react";
import { supabase } from "../../supabaseClient";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AdminNoticias() {
  const [tema, setTema] = useState("");
  const [titulo, setTitulo] = useState("");
  const [textoHtml, setTextoHtml] = useState("");
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    setLoading(true);
    try {
      let imagemUrl = null;

      if (imagem) {
        const nomeArquivo = `news/${Date.now()}-${imagem.name}`;
        const { error: uploadError } = await supabase.storage
          .from("arquivos_orquestra")
          .upload(nomeArquivo, imagem);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("arquivos_orquestra")
          .getPublicUrl(nomeArquivo);
        imagemUrl = data.publicUrl;
      }

      // 2. Salvar no Banco
      const { error } = await supabase.from("noticias").insert({
        tema,
        titulo,
        texto_html: textoHtml,
        imagem_url: imagemUrl,
      });

      if (error) throw error;
      alert("Notícia Publicada!");
      setTitulo("");
      setTextoHtml("");
      setImagem(null);
    } catch (error) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Nova Notícia</h2>
      <input
        type="text"
        placeholder="Tema"
        value={tema}
        onChange={(e) => setTema(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          width: "100%",
          padding: "8px",
        }}
      />
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          width: "100%",
          padding: "8px",
        }}
      />

      <div style={{ background: "white", marginBottom: "10px" }}>
        <ReactQuill theme="snow" value={textoHtml} onChange={setTextoHtml} />
      </div>

      <input type="file" onChange={(e) => setImagem(e.target.files[0])} />
      <button
        onClick={handleSalvar}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          background: "#9b2323",
          color: "white",
        }}
      >
        {loading ? "Salvando..." : "Publicar"}
      </button>
    </div>
  );
}
export default AdminNoticias;
