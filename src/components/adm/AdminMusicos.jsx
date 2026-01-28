import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function AdminMusicos() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [instrumento, setInstrumento] = useState('');
    const [naipe, setNaipe] = useState('');
    const [ano, setAno] = useState('');
    const [social, setSocial] = useState('');
    const [arquivo, setArquivo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [listaMusicos, setListaMusicos] = useState([]);

    useEffect(() => {
        fetchMusicos();
    }, []);

    const fetchMusicos = async () => {
        const { data } = await supabase
            .from('musicos')
            .select('*')
            .order('nome', { ascending: true });
        setListaMusicos(data || []);
    };

    const handleUpload = async () => {
        if (!nome || !instrumento) {
            alert("Nome e Instrumento são obrigatórios.");
            return;
        }
        setLoading(true);

        try {
            let publicUrl = null;

            if (arquivo) {
                const nomeArquivo = `musicos/${Date.now()}-${arquivo.name}`;
                const { error: uploadError } = await supabase.storage
                    .from('arquivos_orquestra')
                    .upload(nomeArquivo, arquivo);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('arquivos_orquestra')
                    .getPublicUrl(nomeArquivo);
                
                publicUrl = data.publicUrl;
            }

            const { error: dbError } = await supabase
                .from('musicos')
                .insert({
                    nome,
                    sobrenome,
                    instrumento,
                    naipe,
                    ano,
                    social,
                    foto_url: publicUrl
                });

            if (dbError) throw dbError;

            alert("Músico cadastrado com sucesso!");
            setNome('');
            setSobrenome('');
            setInstrumento('');
            setNaipe('');
            setAno('');
            setSocial('');
            setArquivo(null);
            document.getElementById('fileMusico').value = "";
            fetchMusicos();

        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, fotoUrl) => {
        if (!confirm("Tem certeza que deseja remover este músico?")) return;

        try {
            if (fotoUrl) {
                const path = fotoUrl.split('/arquivos_orquestra/')[1];
                if (path) {
                    await supabase.storage.from('arquivos_orquestra').remove([path]);
                }
            }

            const { error } = await supabase
                .from('musicos')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setListaMusicos(listaMusicos.filter(m => m.id !== id));
            alert("Músico removido.");

        } catch (error) {
            console.error(error);
            alert("Erro ao remover.");
        }
    };

    return (
        <div>
            <h2>Cadastrar Músico</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={e => setSobrenome(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <select value={instrumento} onChange={e => setInstrumento(e.target.value)} style={{ padding: '10px' }}>
                    <option value="">Selecione o Instrumento</option>
                    <option value="Violino I">Violino I</option>
                    <option value="Violino II">Violino II</option>
                    <option value="Viola">Viola</option>
                    <option value="Violoncelo">Violoncelo</option>
                    <option value="Contrabaixo">Contrabaixo</option>
                    <option value="Flauta-Transversal">Flauta Transversal</option>
                    <option value="Clarinete">Clarinete</option>
                    <option value="Oboé">Oboé</option>
                    <option value="Fagote">Fagote</option>
                    <option value="Trompa">Trompa</option>
                    <option value="Trompete">Trompete</option>
                    <option value="Trombone">Trombone</option>
                    <option value="Tuba">Tuba</option>
                    <option value="Percussão">Percussão</option>
                    <option value="Piano">Piano</option>
                    <option value="Spalla">Spalla</option>
                    <option value="Regente">Regente</option>
                </select>
                <input type="text" placeholder="Naipe (Opcional)" value={naipe} onChange={e => setNaipe(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <input type="text" placeholder="Ano de Entrada (Ex: 2020)" value={ano} onChange={e => setAno(e.target.value)} />
                <input type="text" placeholder="Instagram (Ex: @usuario)" value={social} onChange={e => setSocial(e.target.value)} />
            </div>

            <div style={{ marginTop: '15px' }}>
                <label>Foto do Músico:</label>
                <input id="fileMusico" type="file" accept="image/*" onChange={e => setArquivo(e.target.files[0])} />
            </div>

            <button 
                onClick={handleUpload} 
                disabled={loading}
                style={{ 
                    marginTop: '20px', padding: '15px', background: '#1a1a1a', 
                    color: 'white', border: 'none', width: '100%', cursor: 'pointer', fontWeight: 'bold' 
                }}
            >
                {loading ? "Salvando..." : "Cadastrar Músico"}
            </button>

            <hr style={{ margin: '40px 0' }} />

            <h3>Lista de Músicos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {listaMusicos.map(musico => (
                    <div key={musico.id} style={{ 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: '#f9f9f9', padding: '15px', borderRadius: '5px', border: '1px solid #ddd'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <img 
                                src={musico.foto_url || 'https://via.placeholder.com/50'} 
                                alt={musico.nome} 
                                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                            />
                            <div>
                                <strong style={{ display: 'block' }}>{musico.nome} {musico.sobrenome}</strong>
                                <span style={{ fontSize: '0.9em', color: '#666' }}>{musico.instrumento}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleDelete(musico.id, musico.foto_url)}
                            style={{ 
                                background: '#9b2323', color: 'white', border: 'none', 
                                padding: '8px 15px', borderRadius: '4px', cursor: 'pointer'
                            }}
                        >
                            Excluir
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminMusicos;