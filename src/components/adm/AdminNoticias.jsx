import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function AdminNoticias() {
    const [titulo, setTitulo] = useState("");
    const [tema, setTema] = useState("");
    const [texto, setTexto] = useState("");
    const [arquivo, setArquivo] = useState(null);
    const [loading, setLoading] = useState(false);
    

    const [listaNoticias, setListaNoticias] = useState([]);

    useEffect(() => {
        fetchNoticias();
    }, []);

    const fetchNoticias = async () => {
        const { data } = await supabase
            .from('noticias')
            .select('*')
            .order('created_at', { ascending: false });
        setListaNoticias(data || []);
    };

    const handleUpload = async () => {
        if (!titulo || !texto || !arquivo) {
            alert("Preencha título, texto e escolha uma imagem.");
            return;
        }
        setLoading(true);

        try {
            const nomeArquivo = `noticias/${Date.now()}-${arquivo.name}`;
            
            const { error: uploadError } = await supabase.storage
                .from('capas_noticias')
                .upload(nomeArquivo, arquivo);

            if (uploadError) throw uploadError;

            const { data: publicData } = supabase.storage
                .from('capas_noticias')
                .getPublicUrl(nomeArquivo);

            const { error: dbError } = await supabase
                .from('noticias')
                .insert({
                    titulo,
                    tema,
                    texto_html: texto,
                    imagem_url: publicData.publicUrl
                });

            if (dbError) throw dbError;

            alert("Notícia publicada com sucesso!");
            setTitulo("");
            setTema("");
            setTexto("");
            setArquivo(null);
            document.getElementById('fileInput').value = "";
            
            fetchNoticias();

        } catch (error) {
            console.error(error);
            alert("Erro ao publicar.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, imagemUrl) => {
        if (!confirm("Tem certeza que deseja apagar esta notícia?")) return;

        try {

            if (imagemUrl) {

                const path = imagemUrl.split('/capas_noticias/')[1]; 
                if (path) {
                    await supabase.storage.from('capas_noticias').remove([path]);
                }
            }


            const { error } = await supabase
                .from('noticias')
                .delete()
                .eq('id', id);

            if (error) throw error;


            setListaNoticias(listaNoticias.filter(item => item.id !== id));
            alert("Notícia apagada.");

        } catch (error) {
            console.error(error);
            alert("Erro ao apagar. Verifique o console.");
        }
    };

    return (
        <div>
            <h2>Nova Notícia</h2>
            
            <input 
                type="text" 
                placeholder="Tema (Ex: Institucional, Concerto)" 
                value={tema} 
                onChange={e => setTema(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Título da Notícia" 
                value={titulo} 
                onChange={e => setTitulo(e.target.value)} 
            />
            
            <div style={{ background: 'white', marginBottom: '20px' }}>
                <ReactQuill theme="snow" value={texto} onChange={setTexto} />
            </div>

            <input 
                id="fileInput"
                type="file" 
                accept="image/*" 
                onChange={e => setArquivo(e.target.files[0])} 
            />

            <button 
                onClick={handleUpload} 
                disabled={loading}
                style={{
                    background: '#1a1a1a', color: 'white', padding: '15px 30px', 
                    border: 'none', cursor: 'pointer', marginTop: '10px', width: '100%', fontWeight: 'bold'
                }}
            >
                {loading ? "Publicando..." : "Publicar Notícia"}
            </button>

            <hr style={{ margin: '50px 0', border: '1px solid #ccc' }} />

            <h3 style={{ fontFamily: 'Playfair Display', marginBottom: '20px' }}>Gerenciar Notícias</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {listaNoticias.map(news => (
                    <div key={news.id} style={{ 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: '#f9f9f9', padding: '15px', borderRadius: '5px', border: '1px solid #ddd'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {news.imagem_url && (
                                <img src={news.imagem_url} alt="capa" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                            )}
                            <div>
                                <strong style={{ display: 'block', fontSize: '1.1em' }}>{news.titulo}</strong>
                                <span style={{ fontSize: '0.9em', color: '#666' }}>{new Date(news.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => handleDelete(news.id, news.imagem_url)}
                            style={{ 
                                background: '#9b2323', color: 'white', border: 'none', 
                                padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' 
                            }}
                        >
                            🗑️ Excluir
                        </button>
                    </div>
                ))}
                
                {listaNoticias.length === 0 && <p>Nenhuma notícia cadastrada.</p>}
            </div>
        </div>
    );
}

export default AdminNoticias;