import ClientApi from '../../hooks/clientApi';
import styles from './Login.module.css'

import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState(''); //useState armazena o que está dentro dos () - recebe apenas strings
    const [senha, setSenha] = useState('');

    return (
        <main>
            <div className={styles.section}>
                
                <div className={styles.Login}>
                    <h3>Faça Login</h3>
                    <p>Email</p>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                    />
                    <p>Senha</p>
                    <input
                        type="text"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite sua senha"
                    />

                    
                    <button 
                        onClick={async () => {
                            const logged = await ClientApi.singIn({ email, senha })
                            console.log(logged)
                            localStorage.setItem('logged', logged)
                            logged ? window.location.href = '/' : alert('Email ou senha incorretos')
                        }}
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Login;
