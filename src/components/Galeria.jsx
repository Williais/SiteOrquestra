import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { X, ChevronLeft, ChevronRight } from 'lucide-react'; 
import '../style/galeria.css';

const GridSlideshow = ({ categoria, imagens, aoClicar, classeExtra }) => {
    const [indiceAtual, setIndiceAtual] = useState(0);

    useEffect(() => { setIndiceAtual(0); }, [imagens]);

    useEffect(() => {
        if (!imagens || imagens.length <= 1) return;
        const intervalo = setInterval(() => {
            setIndiceAtual((prev) => (prev + 1) % imagens.length);
        }, 4000);
        return () => clearInterval(intervalo);
    }, [imagens]);

    const temImagens = imagens && imagens.length > 0;

    return (
        <div 
            className={`grid-item ${classeExtra}`} 
            onClick={() => temImagens && aoClicar(categoria)}
            style={{ cursor: temImagens ? 'pointer' : 'default' }}
        >
            {temImagens ? (
                imagens.map((img, index) => (
                    <img 
                        key={img.id}
                        src={img.imagem_url}
                        alt={`${categoria} ${index}`}
                        className={`bg-slide ${index === indiceAtual ? 'ativo' : ''}`}
                    />
                ))
            ) : (
                <div style={{width: '100%', height: '100%', background: '#333'}}></div>
            )}
            
            <div className="overlay">
                <h3>{categoria}</h3>
                <p>{temImagens ? `${imagens.length} fotos` : 'Sem fotos'}</p>
            </div>
        </div>
    );
};

const ModalGaleria = ({ isOpen, imagens, fecharModal }) => {
    const [indiceModal, setIndiceModal] = useState(0);

    useEffect(() => { setIndiceModal(0); }, [isOpen]);

    if (!isOpen || !imagens || imagens.length === 0) return null;

    const imagemAtual = imagens[indiceModal];

    const proximaFoto = (e) => {
        e.stopPropagation();
        setIndiceModal((prev) => (prev + 1) % imagens.length);
    };

    const fotoAnterior = (e) => {
        e.stopPropagation();
        setIndiceModal((prev) => (prev - 1 + imagens.length) % imagens.length);
    };

    return (
        <div className="modal-overlay" onClick={fecharModal}>
            <button className="btn-fechar" onClick={fecharModal}><X size={32} /></button>
            <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
                {imagens.length > 1 && (
                    <button className="btn-nav prev" onClick={fotoAnterior}><ChevronLeft size={40} /></button>
                )}
                
                <img src={imagemAtual.imagem_url} alt="Galeria Ampliada" className="modal-imagem" />
                
                {imagens.length > 1 && (
                    <button className="btn-nav next" onClick={proximaFoto}><ChevronRight size={40} /></button>
                )}
                <div className="modal-contador">{indiceModal + 1} / {imagens.length}</div>
            </div>
        </div>
    );
};


function Galeria() {
    const [fotos, setFotos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalAberto, setModalAberto] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState([]);

    useEffect(() => {
        const fetchGaleria = async () => {
            try {
                // Busca do Supabase
                const { data, error } = await supabase
                    .from('galeria')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                const fotosAgrupadas = data.reduce((acc, item) => {
                    const cat = item.categoria || 'Geral';
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(item);
                    return acc;
                }, {});

                setFotos(fotosAgrupadas);
            } catch (error) {
                console.error("Erro ao carregar galeria:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGaleria();
    }, []);

    const abrirCategoria = (nomeCategoria) => {
        if (fotos && fotos[nomeCategoria]) {
            setCategoriaSelecionada(fotos[nomeCategoria]);
            setModalAberto(true);
        }
    };

    const fecharModal = () => {
        setModalAberto(false);
        setCategoriaSelecionada([]);
    };

    if (loading) return <div className="loading" style={{textAlign:'center', padding:'50px'}}>Carregando galeria...</div>;
    if (!fotos) return null;

    return (
        <div className="galeria-container">
            <h2 className="titulo-secao">Em Palco</h2>
            
            <div className="grid-bento">
                <GridSlideshow 
                    categoria="Palco Principal" 
                    classeExtra="palco-Principal" 
                    imagens={fotos['Palco Principal']} 
                    aoClicar={abrirCategoria} 
                />

                <GridSlideshow 
                    categoria="Cordas" 
                    classeExtra="cordas"
                    imagens={fotos['Cordas']} 
                    aoClicar={abrirCategoria} 
                />

                <GridSlideshow 
                    categoria="Metais" 
                    classeExtra="metais"
                    imagens={fotos['Metais']} 
                    aoClicar={abrirCategoria} 
                />

                <GridSlideshow 
                    categoria="Ensaios" 
                    classeExtra="ensaios"
                    imagens={fotos['Ensaios']} 
                    aoClicar={abrirCategoria} 
                />
            </div>

            <ModalGaleria 
                isOpen={modalAberto} 
                imagens={categoriaSelecionada} 
                fecharModal={fecharModal} 
            />
        </div>
    );
}

export default Galeria;