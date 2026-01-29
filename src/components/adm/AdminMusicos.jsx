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
    const [editingId, setEditingId] = useState(null);
    const [imagemUrlAnterior, setImagemUrlAnterior] = useState(null);

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


    const handleEdit = (musico) => {
        setNome(musico.nome || '');
        setSobrenome(musico.sobrenome || '');
        setInstrumento(musico.instrumento || '');
        setNaipe(musico.naipe || '');
        setAno(musico.ano_inicio || '');
        setSocial(musico.social || '');
        setImagemUrlAnterior(musico.imagem_url);
        setEditingId(musico.id);
        

        setArquivo(null);
        document.getElementById('fileMusico').value = "";

   
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setImagemUrlAnterior(null);
        limparFormulario();
    };

    const limparFormulario = () => {
        setNome(''); setSobrenome(''); setInstrumento('');
        setNaipe(''); setAno(''); setSocial(''); setArquivo(null);
        if (document.getElementById('fileMusico')) {
            document.getElementById('fileMusico').value = "";
        }
    };

    const handleSave = async () => {
        if (!nome || !instrumento) {
            alert("Nome e Instrumento são obrigatórios.");
            return;
        }
        setLoading(true);

        try {
            let publicUrl = imagemUrlAnterior;


            if (arquivo) {
                const nomeArquivo = `${Date.now()}-${arquivo.name}`;
                const { error: uploadError } = await supabase.storage
                    .from('musicos') 
                    .upload(nomeArquivo, arquivo);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('musicos')
                    .getPublicUrl(nomeArquivo);
                
                publicUrl = data.publicUrl;
            }

            const dadosMusico = {
                nome,
                sobrenome,
                instrumento,
                naipe,
                ano_inicio: ano,
                social,
                imagem_url: publicUrl
            };

            if (editingId) {
            
                const { error } = await supabase
                    .from('musicos')
                    .update(dadosMusico)
                    .eq('id', editingId);

                if (error) throw error;
                alert("Músico atualizado com sucesso!");

            } else {
             
                const { error } = await supabase
                    .from('musicos')
                    .insert(dadosMusico);

                if (error) throw error;
                alert("Músico cadastrado com sucesso!");
            }

            handleCancelEdit();
            fetchMusicos();

        } catch (error) {
            console.error(error);
            alert("Erro ao salvar: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, imagemUrl) => {
        if (!confirm("Tem certeza que deseja remover este músico?")) return;

        try {
            if (imagemUrl) {
                const partesUrl = imagemUrl.split('/musicos/');
                if (partesUrl[1]) {
                    await supabase.storage.from('musicos').remove([partesUrl[1]]);
                }
            }

            const { error } = await supabase.from('musicos').delete().eq('id', id);
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
            <h2>{editingId ? "Editar Músico" : "Cadastrar Músico"}</h2>
            
            {editingId && (
                <div style={{ marginBottom: '10px', padding: '10px', background: '#fff3cd', borderRadius: '5px', border: '1px solid #ffeeba', color: '#856404' }}>
                    ✏️ Você está editando <strong>{nome}</strong>. 
                    <button onClick={handleCancelEdit} style={{ marginLeft: '10px', cursor: 'pointer', background: 'transparent', border: 'none', textDecoration: 'underline' }}>
                        Cancelar edição
                    </button>
                </div>
            )}

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
                    <option value="Baixo-Eletrico">Baixo Elétrico</option>
                    <option value="Flauta-Transversal">Flauta Transversal</option>
                    <option value="Clarinete">Clarinete</option>
                    <option value="Oboé">Oboé</option>
                    <option value="Fagote">Fagote</option>
                    <option value="Trompa">Trompa</option>
                    <option value="Trompete">Trompete</option>
                    <option value="Trombone">Trombone</option>
                    <option value="Tuba">Tuba</option>
                    <option value="Sax-Alto">Sax Alto</option>
                    <option value="Sax-Tenor">Sax Tenor</option>
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
                <label>Foto do Músico {editingId && "(Deixe vazio para manter a atual)"}:</label>
                <input id="fileMusico" type="file" accept="image/*" onChange={e => setArquivo(e.target.files[0])} />
            
                {editingId && imagemUrlAnterior && (
                    <div style={{ marginTop: '5px', fontSize: '0.9em', color: '#666' }}>
                        Foto atual: <a href={imagemUrlAnterior} target="_blank" rel="noreferrer">Ver imagem</a>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button 
                    onClick={handleSave} 
                    disabled={loading}
                    style={{ 
                        flex: 1, padding: '15px', background: editingId ? '#007bff' : '#1a1a1a', 
                        color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '5px' 
                    }}
                >
                    {loading ? "Salvando..." : (editingId ? "Atualizar Músico" : "Cadastrar Músico")}
                </button>
                
                {editingId && (
                    <button 
                        onClick={handleCancelEdit}
                        style={{ 
                            padding: '15px', background: '#ccc', color: '#333', 
                            border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '5px' 
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </div>

            <hr style={{ margin: '40px 0' }} />

            <h3>Lista de Músicos ({listaMusicos.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {listaMusicos.map(musico => (
                    <div key={musico.id} style={{ 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: '#f9f9f9', padding: '15px', borderRadius: '5px', border: '1px solid #ddd'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <img 
                                src={musico.imagem_url || 'https://via.placeholder.com/50'} 
                                alt={musico.nome} 
                                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                            />
                            <div>
                                <strong style={{ display: 'block' }}>{musico.nome} {musico.sobrenome}</strong>
                                <span style={{ fontSize: '0.9em', color: '#666' }}>{musico.instrumento} | {musico.ano_inicio}</span>
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={() => handleEdit(musico)}
                                style={{ 
                                    background: '#007bff', color: 'white', border: 'none', 
                                    padding: '8px 15px', borderRadius: '4px', cursor: 'pointer'
                                }}
                            >
                                ✏️ Editar
                            </button>

                            <button 
                                onClick={() => handleDelete(musico.id, musico.imagem_url)}
                                style={{ 
                                    background: '#9b2323', color: 'white', border: 'none', 
                                    padding: '8px 15px', borderRadius: '4px', cursor: 'pointer'
                                }}
                            >
                                🗑️ Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminMusicos;