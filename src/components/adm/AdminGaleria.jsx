import { useState } from 'react';
import { supabase } from '../../supabaseClient';

function AdminGaleria() {
    const [categoria, setCategoria] = useState('Geral');
    const [arquivos, setArquivos] = useState([]);
    const [uploading, setUploading] = useState(false);

    const categorias = [
        "Palco Principal",
        "Ensaios",
        "Cordas",
        "Sopros",
        "Metais",
        "Percussão",
        "Bastidores",
        "Viagens"
    ];

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
                    console.error(`Erro ao subir ${arquivo.name}:`, uploadError);
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

            alert(`${contagemSucesso} fotos enviadas com sucesso!`);
            setArquivos([]);
            document.getElementById('inputFotos').value = "";

        } catch (erro) {
            console.error(erro);
            alert("Ocorreu um erro inesperado.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px' }}>
            <h2>Adicionar Fotos à Galeria</h2>
            <p style={{ color: '#666', fontSize: '0.9em' }}>
                Você pode selecionar várias fotos de uma vez. Elas serão salvas automaticamente.
            </p>

            <div style={{ margin: '20px 0' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Categoria / Seção:</label>
                <select 
                    value={categoria} 
                    onChange={e => setCategoria(e.target.value)}
                    style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div style={{ border: '2px dashed #ccc', padding: '30px', textAlign: 'center', background: 'white' }}>
                <input 
                    id="inputFotos"
                    type="file" 
                    multiple
                    accept="image/*"
                    onChange={e => setArquivos(e.target.files)}
                />
                <p style={{ marginTop: '10px' }}>
                    {arquivos.length > 0 
                        ? `${arquivos.length} fotos selecionadas para envio.` 
                        : "Clique para escolher as fotos"}
                </p>
            </div>

            <button 
                onClick={handleUpload} 
                disabled={uploading}
                style={{ 
                    marginTop: '20px', 
                    padding: '15px 30px', 
                    background: uploading ? '#ccc' : '#1a1a1a', 
                    color: 'white', 
                    border: 'none', 
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    width: '100%',
                    fontWeight: 'bold'
                }}
            >
                {uploading ? `Enviando... (Aguarde)` : "ENVIAR TODAS AS FOTOS"}
            </button>
        </div>
    );
}

export default AdminGaleria;