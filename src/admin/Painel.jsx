import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

import './Painel.css';

import AdminNoticias from '../components/adm/AdminNoticias';
import AdminMusicos from '../components/adm/AdminMusicos';
import AdminEventos from '../components/adm/AdminEventos';
import AdminGaleria from '../components/adm/AdminGaleria';

function Painel() {
    const [abaAtiva, setAbaAtiva] = useState('noticias');
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) navigate('/admin');
        });
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin');
    };

    return (
        <div className="admin-container">

            <header className="admin-header">
                <h1 className="admin-title">Painel do Maestro</h1>
                <button onClick={handleLogout} className="btn-logout">
                    Sair do Sistema
                </button>
            </header>

            <div className="admin-main">

                <div className="tabs-container">
                    <button 
                        className={`tab-btn ${abaAtiva === 'noticias' ? 'active' : ''}`}
                        onClick={() => setAbaAtiva('noticias')}
                    >
                        📰 Notícias
                    </button>
                    
                    <button 
                        className={`tab-btn ${abaAtiva === 'musicos' ? 'active' : ''}`}
                        onClick={() => setAbaAtiva('musicos')}
                    >
                        🎻 Músicos
                    </button>
                    
                    <button 
                        className={`tab-btn ${abaAtiva === 'eventos' ? 'active' : ''}`}
                        onClick={() => setAbaAtiva('eventos')}
                    >
                        📅 Agenda
                    </button>
                    
                    <button 
                        className={`tab-btn ${abaAtiva === 'galeria' ? 'active' : ''}`}
                        onClick={() => setAbaAtiva('galeria')}
                    >
                        📷 Galeria
                    </button>
                </div>

                <div className="content-area">
                    {abaAtiva === 'noticias' && <AdminNoticias />}
                    {abaAtiva === 'musicos' && <AdminMusicos />}
                    {abaAtiva === 'eventos' && <AdminEventos />}
                    {abaAtiva === 'galeria' && <AdminGaleria />}
                </div>
            </div>
        </div>
    );
}

export default Painel;