import styles from './Cadastro.module.css'

import React, { useState } from 'react';

function Cadastro() {

    const [prenome, setPrenome] = useState(''); //useState armazena o que está dentro dos () - recebe apenas strings
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [senha, setSenha] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');


    const handlePrenomeChange = (event) => {
        setPrenome(event.target.value);
        console.log(prenome);
    };

    const handleSobrenomeChange = (event) => {
        setSobrenome(event.target.value);
        console.log(sobrenome);
    };

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
        console.log(cpf);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log(email);
    };

    const handleRuaChange = (event) => {
        setRua(event.target.value);
        console.log(rua);
    };

    const handleNumeroChange = (event) => {
        setNumero(event.target.value);
        console.log(numero);
    };

    const handleCepChange = (event) => {
        setCep(event.target.value);
        console.log(cep);
    };

    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
        console.log(senha);
    };

    const handleBairroChange = (event) => {
        setBairro(event.target.value);
        console.log(bairro);
    };

    const handleComplementoChange = (event) => {
        setComplemento(event.target.value);
        console.log(complemento);
    };

    return (
        <main>
            <div className={styles.section}>

                <div className={styles.Cadastro}>
                    <h1>Faça seu Cadastro</h1>

                    <p>Nome:</p>
                    <input
                        type="text"
                        value={prenome}
                        onChange={handlePrenomeChange}
                        placeholder="Digite seu Nome"
                    />

                    <p>Sobrenome:</p>
                    <input
                        type="text"
                        value={sobrenome}
                        onChange={handleSobrenomeChange}
                        placeholder="Digite seu Sobrenome"
                    />
                    <p>CPF:</p>
                    <input
                        type="text"
                        value={cpf}
                        onChange={handleCpfChange}
                        placeholder="Digite seu CPF"
                    />

                    <p>Email:</p>
                    <input
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Digite seu Email"
                    />
                

                </div>

                <div className={styles.Cadastro}>
                
                    <p>Senha:</p>
                    <input
                        type="text"
                        value={senha}
                        onChange={handleSenhaChange}
                        placeholder="Crie uma Senha"
                    />

                    <p>Bairro:</p>
                    <input
                        type="text"
                        value={bairro}
                        onChange={handleBairroChange}
                        placeholder="Seu bairro"
                    />

                    <p>Rua:</p>
                    <input
                        type="text"
                        value={rua}
                        onChange={handleRuaChange}
                        placeholder="Digite o nome da sua rua"
                    />

                    <p>Complemento:</p>
                    <input
                        type="text"
                        value={complemento}
                        onChange={handleComplementoChange}
                        placeholder="Complemento endereço"
                    />


                    <p>CEP:</p>
                    <input
                        type="text"
                        value={cep}
                        onChange={handleCepChange}
                        placeholder="Digite seu cep?"
                    />

                    <div className={styles.BotaoSubmeter}>
                    <button>
                        Submeter 
                    </button>
                    </div>
                </div>

            </div>
        </main>
    );
}
export default Cadastro;