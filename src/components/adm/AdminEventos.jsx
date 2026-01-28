import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function AdminEventos() {
    const [titulo, setTitulo] = useState('');
    const [subtitulo, setSubtitulo] = useState('');
    const [dataEvento, setDataEvento] = useState('');
    const [hora, setHora] = useState('');
    const [local, setLocal] = useState('');
    const [cidade, setCidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [repertorio, setRepertorio] = useState('');
    const [linkIngresso, setLinkIngresso] = useState('');
    const [arquivo, setArquivo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [listaEventos, setListaEventos] = useState([]);

    useEffect(() => {
        fetchEventos();
    }, []);

    const fetchEventos = async () => {
        const { data } = await supabase
            .from('eventos')
            .select('*')
            .order('data', { ascending: false });
        setListaEventos(data || []);
    };

    const handleUpload = async () => {
        if (!titulo || !dataEvento || !hora) {
            alert("Título, Data e Hora são obrigatórios.");
            return;
        }
        setLoading(true);

        try {
            let publicUrl = null;

            if (arquivo) {
                const nomeArquivo = `eventos/${Date.now()}-${arquivo.name}`;
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
                .from('eventos')
                .insert({
                    titulo,
                    subtitulo,
                    data: dataEvento,
                    hora,
                    local,
                    cidade,
                    descricao,
                    repertorio,
                    link_ingresso: linkIngresso,
                    imagem_url: publicUrl
                });

            if (dbError) throw dbError;

            alert("Evento criado com sucesso!");
            setTitulo('');
            setSubtitulo('');
            setDataEvento('');
            setHora('');
            setLocal('');
            setCidade('');
            setDescricao('');
            setRepertorio('');
            setLinkIngresso('');
            setArquivo(null);
            document.getElementById('fileEvento').value = "";
            fetchEventos();

        } catch (error) {
            console.error(error);
            alert("Erro ao criar evento.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, imagemUrl) => {
        if (!confirm("Deseja apagar este evento?")) return;

        try {
            if (imagemUrl) {
                const path = imagemUrl.split('/arquivos_orquestra/')[1];
                if (path) {
                    await supabase.storage.from('arquivos_orquestra').remove([path]);
                }
            }

            const { error } = await supabase
                .from('eventos')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setListaEventos(listaEventos.filter(e => e.id !== id));
            alert("Evento removido.");

        } catch (error) {
            console.error(error);
            alert("Erro ao remover evento.");
        }
    };

    return (
        <div>
            <h2>Novo Evento</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" placeholder="Título do Concerto" value={titulo} onChange={e => setTitulo(e.target.value)} />
                <input type="text" placeholder="Subtítulo (Opcional)" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <input type="date" value={dataEvento} onChange={e => setDataEvento(e.target.value)} />
                <input type="time" value={hora} onChange={e => setHora(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <input type="text" placeholder="Local" value={local} onChange={e => setLocal(e.target.value)} />
                <input type="text" placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
            </div>

            <textarea 
                placeholder="Descrição do evento..." 
                value={descricao} 
                onChange={e => setDescricao(e.target.value)} 
                style={{ marginTop: '15px', height: '100px', resize: 'vertical' }}
            />

            <textarea 
                placeholder="Repertório (Use <br> para quebrar linha)" 
                value={repertorio} 
                onChange={e => setRepertorio(e.target.value)} 
                style={{ marginTop: '15px', height: '80px', resize: 'vertical' }}
            />

            <input 
                type="text" 
                placeholder="Link para Ingresso (URL)" 
                value={linkIngresso} 
                onChange={e => setLinkIngresso(e.target.value)} 
                style={{ marginTop: '15px' }}
            />

            <div style={{ marginTop: '15px' }}>
                <label>Capa do Evento:</label>
                <input id="fileEvento" type="file" accept="image/*" onChange={e => setArquivo(e.target.files[0])} />
            </div>

            <button 
                onClick={handleUpload} 
                disabled={loading}
                style={{ 
                    marginTop: '20px', padding: '15px', background: '#1a1a1a', 
                    color: 'white', border: 'none', width: '100%', cursor: 'pointer', fontWeight: 'bold' 
                }}
            >
                {loading ? "Criando Evento..." : "Publicar Evento"}
            </button>

            <hr style={{ margin: '40px 0' }} />

            <h3>Eventos Agendados</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {listaEventos.map(evento => (
                    <div key={evento.id} style={{ 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: '#f9f9f9', padding: '15px', borderRadius: '5px', border: '1px solid #ddd'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {evento.imagem_url && (
                                <img src={evento.imagem_url} alt="Capa" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                            )}
                            <div>
                                <strong style={{ display: 'block' }}>{evento.titulo}</strong>
                                <span style={{ fontSize: '0.9em', color: '#666' }}>{new Date(evento.data).toLocaleDateString('pt-BR')} às {evento.hora.slice(0, 5)}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleDelete(evento.id, evento.imagem_url)}
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

export default AdminEventos;