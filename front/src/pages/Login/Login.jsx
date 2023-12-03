import ApiService from '../../hooks/useapi';
import styles from './Login.module.css'

import React, { useState } from 'react';

function Login() {
    const [user, setUser] = useState(''); //useState armazena o que está dentro dos () - recebe apenas strings
    const [password, setPassword] = useState('');

    const handleNameChange = (event) => {
        setUser(event.target.value);
        console.log(user);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        console.log(password);
    };

    return (
       
        <div className={styles.section}>
            
            <div className={styles.BemVindo}>
                <h3>Bem Vindo!</h3>

                <button>Criar Conta</button>
            </div>
            
            <div className={styles.Login}>
                <h3>Faça Login</h3>
                <p>Usuário</p>
                <input
                    type="text"
                    value={user}
                    onChange={handleNameChange}
                    placeholder="Digite seu nome"
                />
                <p>Senha</p>
                <input
                    type="text"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Digite sua senha"
                />

                
                <button onClick={() => ApiService.Login(user,password)}>Entrar</button>
                
            </div>
            
        </div>
        
    );
}

export default Login;
