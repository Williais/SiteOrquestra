import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro(null);

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) {
            setErro("E-mail ou senha incorretos.");
            setLoading(false);
        } else {
            navigate('/admin/painel');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Área Restrita</h2>
                
                <form onSubmit={handleLogin} className="login-form">
                    <input 
                        type="email" 
                        placeholder="E-mail de Acesso" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        className="input-field"
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={senha} 
                        onChange={e => setSenha(e.target.value)} 
                        className="input-field"
                        required
                    />
                    
                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? "Verificando..." : "ACESSAR PAINEL"}
                    </button>
                </form>

                {erro && <p className="erro-msg">{erro}</p>}
            </div>
        </div>
    );
}

export default Login;