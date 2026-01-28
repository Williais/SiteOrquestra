import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../style/agenda.css';


const mesesMap = {
    0: "JANEIRO", 1: "FEVEREIRO", 2: "MARÇO", 3: "ABRIL", 4: "MAIO", 5: "JUNHO",
    6: "JULHO", 7: "AGOSTO", 8: "SETEMBRO", 9: "OUTUBRO", 10: "NOVEMBRO", 11: "DEZEMBRO"
};

function Agenda() {
    const anoAtual = new Date().getFullYear();
    const [todosEventos, setTodosEventos] = useState([]);
    const [anoSelecionado, setAnoSelecionado] = useState(anoAtual);
    const [menuAnosAberto, setMenuAnosAberto] = useState(false);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const eventosPorPagina = 3;
    const [modalAberto, setModalAberto] = useState(false);
    const [eventoDetalhe, setEventoDetalhe] = useState(null);

    const formatarHora = (hora) => {
        if (!hora) return '';
        return hora.slice(0, 5);
    };

    useEffect(() => {
        const fetchAgenda = async () => {
            const { data, error } = await supabase
                .from('eventos')
                .select('*')
                .order('data', { ascending: true });

            if (error) {
                console.error("Erro agenda:", error);
                return;
            }

            const eventosFormatados = data.map(evento => {
                const dataObj = new Date(evento.data + 'T00:00:00');
                const mesIndex = dataObj.getMonth();
                
                return {
                    ...evento,
                    dia: dataObj.getDate(),
                    mes: mesesMap[mesIndex],
                    ano: dataObj.getFullYear(),
                    mesIndex: mesIndex
                };
            });

            setTodosEventos(eventosFormatados);

            const anosNosDados = [...new Set(eventosFormatados.map(e => e.ano))];
            if (anosNosDados.length > 0 && !anosNosDados.includes(anoAtual)) {

                setAnoSelecionado(Math.max(...anosNosDados));
            }
        };
        fetchAgenda();
    }, []);
    
    const eventosDoAno = todosEventos?.filter(e => e.ano == anoSelecionado) || [];
    
    useEffect(() => {
        setPaginaAtual(1);
    }, [anoSelecionado]);

    const indexUltimo = paginaAtual * eventosPorPagina;
    const indexPrimeiro = indexUltimo - eventosPorPagina;
    const eventosVisiveis = eventosDoAno.slice(indexPrimeiro, indexUltimo);

    const abrirModal = (e) => {
        setEventoDetalhe(e);
        setModalAberto(true);
    };

    const verificarStatusEvento = (eventoData) => {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const dataEvento = new Date(eventoData + 'T00:00:00'); 
        return dataEvento < hoje ? "REALIZADO" : "EM BREVE";
    };

    const anosDisponiveis = [...new Set(todosEventos.map(e => e.ano))].sort().reverse();
    const listaAnos = anosDisponiveis.length > 0 ? anosDisponiveis : [anoAtual];

    return (
        <div>
            <section className='container-agenda'>
                <div className="header-agenda">
                    <h1>Temporada {anoSelecionado}</h1>

                    <div className="seletor-anos-container">
                        <span 
                            className="btn-calendario" 
                            onClick={() => setMenuAnosAberto(!menuAnosAberto)}
                        >
                            VER CALENDÁRIO COMPLETO {menuAnosAberto ? '▲' : '▼'}
                        </span>
                        
                        {menuAnosAberto && (
                            <div className="menu-anos">
                                {listaAnos.map(ano => (
                                    <button 
                                        key={ano} 
                                        className={ano === anoSelecionado ? 'ativo' : ''}
                                        onClick={() => {
                                            setAnoSelecionado(ano);
                                            setMenuAnosAberto(false);
                                        }}
                                    >
                                        Temporada {ano}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {eventosVisiveis.map((e, index) => {

                    const status = verificarStatusEvento(e.data);
                    const jaPassou = status === "REALIZADO";
                    const horaFormatada = formatarHora(e.hora);

                    return (
                        <div className="content-agenda" key={e.id || index} onClick={() => abrirModal(e)} style={{ opacity: jaPassou ? 0.6 : 1 }}>
                            <div className='container-data'>
                                <h1 style={{ color: jaPassou ? '#555' : '' }}>{e.dia}</h1>
                                <h3>{e.mes ? e.mes.substring(0, 3) : ''}</h3>
                            </div>

                            <div className='img-agenda' style={{
                                backgroundImage: `url(${e.imagem_url || ''})`, 
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>

                            <div className="container-infos">
                                {jaPassou && <span className="tag-realizado">EVENTO REALIZADO</span>}

                                <h3 className="title">{e.subtitulo}</h3>
                                <h2 className="programa">{e.titulo}</h2>
                                <p className="local">{e.local}{horaFormatada ? `, ${horaFormatada}` : ''}</p>
                            </div>

                            <button onClick={(event) => {
                                event.stopPropagation();
                                abrirModal(e);
                            }}>DETALHES</button>
                        </div>
                    );
                })}

                {eventosDoAno.length > eventosPorPagina && (
                    <div style={{ display: 'flex', gap: '20px', marginTop: '30px', justifyContent: 'center' }}>
                        <button 
                            disabled={paginaAtual === 1}
                            onClick={() => setPaginaAtual(prev => prev - 1)}
                            style={{ cursor: 'pointer', padding: '10px', opacity: paginaAtual === 1 ? 0.5 : 1 }}
                        >
                            Anterior
                        </button>
                        <span style={{alignSelf: 'center'}}>Página {paginaAtual}</span>
                        <button 
                            disabled={indexUltimo >= eventosDoAno.length}
                            onClick={() => setPaginaAtual(prev => prev + 1)}
                            style={{ cursor: 'pointer', padding: '10px', opacity: indexUltimo >= eventosDoAno.length ? 0.5 : 1 }}
                        >
                            Próxima
                        </button>
                    </div>
                )}

                {modalAberto && eventoDetalhe && (
                    <div className="modal-overlay" onClick={() => setModalAberto(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-btn" onClick={() => setModalAberto(false)}>X</button>

                            <h2 style={{fontFamily: 'Playfair Display', fontSize: '2em', marginBottom: '5px'}}>
                                {eventoDetalhe.titulo}
                            </h2>
                            <h3 style={{color: '#9b2323', fontStyle: 'italic', marginBottom: '20px', fontWeight: '400'}}>
                                {eventoDetalhe.subtitulo}
                            </h3>
                            
                            <hr style={{border: '0', borderTop: '1px solid #eee', margin: '20px 0'}}/>

                            <div className="modal-body">
                                <p><span className="modal-label">Quando:</span> {eventoDetalhe.dia} de {eventoDetalhe.mes} de {eventoDetalhe.ano}</p>
                                <p><span className="modal-label">Onde:</span> {eventoDetalhe.local} {eventoDetalhe.cidade ? `- ${eventoDetalhe.cidade}` : ''}</p>
                                <p><span className="modal-label">Horário:</span> {formatarHora(eventoDetalhe.hora)}</p>
                                
                                <br/>
                                
                                {eventoDetalhe.repertorio && (
                                    <>
                                        <p className="modal-label">Repertório:</p>
                                        <div 
                                            style={{fontStyle: 'italic', color: '#555'}}
                                            dangerouslySetInnerHTML={{ __html: eventoDetalhe.repertorio }}
                                        />
                                    </>
                                )}

                                <br/>

                                {eventoDetalhe.descricao && (
                                    <>
                                        <p className="modal-label">Sobre o Evento:</p>
                                        <p style={{textAlign: 'justify', lineHeight: '1.6'}}>
                                            {eventoDetalhe.descricao}
                                        </p>
                                    </>
                                )}

                                {eventoDetalhe.link_ingresso && (
                                    <div style={{marginTop: '20px', textAlign: 'center'}}>
                                        <a 
                                            href={eventoDetalhe.link_ingresso} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="btn-ingresso"
                                            style={{
                                                background: '#9b2323', color: 'white', padding: '10px 20px', 
                                                textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold'
                                            }}
                                        >
                                            GARANTIR INGRESSO
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Agenda;