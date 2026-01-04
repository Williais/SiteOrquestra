import { useState, useEffect } from 'react';
import '../style/agenda.css'

const mesesMap = {
    "JANEIRO": 0, "FEVEREIRO": 1, "MARÇO": 2, "ABRIL": 3, "MAIO": 4, "JUNHO": 5,
    "JULHO": 6, "AGOSTO": 7, "SETEMBRO": 8, "OUTUBRO": 9, "NOVEMBRO": 10, "DEZEMBRO": 11
}

function Agenda() {
    const anoAtual = new Date().getFullYear()
    const [todosEventos, setTodosEventos] = useState([])
    const [anoSelecionado, setAnoSelecionado] = useState(anoAtual)
    
    const [menuAnosAberto, setMenuAnosAberto] = useState(false);

    const [paginaAtual, setPaginaAtual] = useState(1)
    const eventosPorPagina = 3
    const [modalAberto, setModalAberto] = useState(false)
    const [eventoDetalhe, setEventoDetalhe] = useState(null)

    const formatarImagemDrive = (url) => {
        if (!url) return '';
        const id = url.split('/d/')[1]?.split('/')[0];
        return id ? `https://lh3.googleusercontent.com/d/${id}` : url;
    };

    const formatarHora = (horaGoogle) => {
        if (!horaGoogle) return '';
        if (typeof horaGoogle === 'string' && !horaGoogle.includes('T')) return horaGoogle;
        const data = new Date(horaGoogle);
        if (isNaN(data)) return ''; 
        return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    useEffect(() => {
        const fetchAgenda = async () => {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzSFjbvRA_VJQgWqAtJ-ikqJCR3Raz7_s4zXeenBYi2uDKCjfEkGW6xpq2bSQTR8pSE/exec')
            const data = await response.json()

            data.sort((a, b) => {
                const mesA = mesesMap[a.mes?.toUpperCase().trim()] ?? 0
                const mesB = mesesMap[b.mes?.toUpperCase().trim()] ?? 0
                const dataA = new Date(a.ano, mesA, a.dia)
                const dataB = new Date(b.ano, mesB, b.dia)
                return dataA - dataB
            })

            setTodosEventos(data)
            
            const anosNosDados = [...new Set(data.map(e => e.ano))];
            if (anosNosDados.length > 0 && !anosNosDados.includes(anoAtual)) {
                setAnoSelecionado(anosNosDados[0]);
            }
        }
        fetchAgenda()
    }, [])
    
    const eventosDoAno = todosEventos?.filter(e => e.ano == anoSelecionado) || []
    
    useEffect(() => {
        setPaginaAtual(1);
    }, [anoSelecionado]);

    const indexUltimo = paginaAtual * eventosPorPagina
    const indexPrimeiro = indexUltimo - eventosPorPagina
    const eventosVisiveis = eventosDoAno.slice(indexPrimeiro, indexUltimo)

    const abrirModal = (e) => {
        setEventoDetalhe(e)
        setModalAberto(true)
    }

    const verificarStatusEvento = (dia, mes, ano) => {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const mesNumero = mesesMap[mes?.toUpperCase().trim()]; 
        const dataEvento = new Date(ano, mesNumero, dia);
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
                    const status = verificarStatusEvento(e.dia, e.mes, e.ano)
                    const jaPassou = status === "REALIZADO"
                    
                    const imagemCorrigida = formatarImagemDrive(e.imagem);
                    const horaFormatada = formatarHora(e.hora);

                    return (
                        <div className="content-agenda" key={index} onClick={() => abrirModal(e)} style={{ opacity: jaPassou ? 0.6 : 1 }}>
                            <div className='container-data'>
                                <h1 style={{ color: jaPassou ? '#555' : '' }}>{e.dia}</h1>
                                <h3>{e.mes}</h3>
                            </div>

                            <div className='img-agenda' style={{
                                backgroundImage: `url(${imagemCorrigida})`, 
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
                                event.stopPropagation()
                                abrirModal(e)
                            }}>DETALHES</button>
                        </div>
                    )
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
                                <p><span className="modal-label">Onde:</span> {eventoDetalhe.local} - {eventoDetalhe.cidade}</p>
                                <p><span className="modal-label">Horário:</span> {formatarHora(eventoDetalhe.hora)}</p>
                                
                                <br/>
                                
                                {eventoDetalhe.repertorio && (
                                    <>
                                        <p className="modal-label">Repertório:</p>
                                        <p style={{fontStyle: 'italic', color: '#555'}}>{eventoDetalhe.repertorio}</p>
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
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Agenda