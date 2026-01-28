import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function AdminGaleria() {
    const [categoria, setCategoria] = useState('Geral');
    const [arquivos, setArquivos] = useState([]);
    const [uploading, setUploading] = useState(false);
    

    const [fotosExistentes, setFotosExistentes] = useState([]);

    const categorias = [
        "Palco Principal", "Ensaios", "Cordas", "Sopros", "Metais", "Percussão", "Bastidores", "Viagens"
    ];


    useEffect(() => {
        fetchFotos();
    }, []);

    const fetchFotos = async () => {
        const { data } = await supabase
            .from('galeria')
            .select('*')
            .order('created_at', { ascending: false });
        setFotosExistentes(data || []);
    };

    const handleUpload = async () => {
        if (arquivos.length === 0) {
            alert("Selecione pelo menos uma foto!");
            return;
        }

        setUploading(true);
        let contagemSucesso = 0;

        try {
            for (let i = 0; i < arquivos.length; i++) {
                const arquivo = arquivos[i];
                const nomeArquivo = `galeria/${categoria}-${Date.now()}-${i}.${arquivo.name.split('.').pop()}`;

                const { error: uploadError } = await supabase.storage
                    .from('arquivos_orquestra')
                    .upload(nomeArquivo, arquivo);

                if (uploadError) {
                    console.error(`Erro upload:`, uploadError);
                    continue;
                }

                const { data: publicData } = supabase.storage
                    .from('arquivos_orquestra')
                    .getPublicUrl(nomeArquivo);

                const { error: dbError } = await supabase
                    .from('galeria')
                    .insert({
                        categoria: categoria,
                        imagem_url: publicData.publicUrl
                    });

                if (!dbError) contagemSucesso++;
            }

            alert(`${contagemSucesso} fotos enviadas!`);
            setArquivos([]);
            document.getElementById('inputFotos').value = "";
            fetchFotos();

        } catch (erro) {
            console.error(erro);
            alert("Ocorreu um erro inesperado.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id, imagemUrl) => {
        if (!confirm("Apagar esta foto permanentemente?")) return;

        try {

            if (imagemUrl) {

                const path = imagemUrl.split('/arquivos_orquestra/')[1];
                if (path) {
                    await supabase.storage.from('arquivos_orquestra').remove([path]);
                }
            }

            const { error } = await supabase
                .from('galeria')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setFotosExistentes(fotosExistentes.filter(f => f.id !== id));

        } catch (error) {
            console.error(error);
            alert("Erro ao apagar foto.");
        }
    };

    return (
        <div style={{ maxWidth: '100%' }}>
            <h2>Upload de Fotos</h2>
            
            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Categoria:</label>
                <select 
                    value={categoria} 
                    onChange={e => setCategoria(e.target.value)}
                    style={{ padding: '10px', width: '100%', marginBottom: '15px' }}
                >
                    {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <input 
                    id="inputFotos"
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={e => setArquivos(e.target.files)}
                    style={{ marginBottom: '15px' }}
                />

                <button 
                    onClick={handleUpload} 
                    disabled={uploading}
                    style={{ 
                        padding: '15px', background: uploading ? '#ccc' : '#1a1a1a', 
                        color: 'white', border: 'none', width: '100%', fontWeight: 'bold', cursor: 'pointer' 
                    }}
                >
                    {uploading ? "Enviando..." : "ENVIAR FOTOS"}
                </button>
            </div>

            <hr style={{ margin: '40px 0' }} />

            <h3>Gerenciar Galeria</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                {fotosExistentes.map(foto => (
                    <div key={foto.id} style={{ position: 'relative', height: '150px' }}>
                        <img 
                            src={foto.imagem_url} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} 
                        />
                        <button 
                            onClick={() => handleDelete(foto.id, foto.imagem_url)}
                            style={{
                                position: 'absolute', top: '5px', right: '5px',
                                background: 'rgba(255,0,0,0.8)', color: 'white',
                                border: 'none', width: '30px', height: '30px', borderRadius: '50%',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            title="Apagar foto"
                        >
                            X
                        </button>
                        <span style={{
                            position: 'absolute', bottom: '0', left: '0', right: '0',
                            background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '0.7em',
                            padding: '3px', textAlign: 'center'
                        }}>
                            {foto.categoria}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminGaleria;