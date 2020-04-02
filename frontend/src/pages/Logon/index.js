import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [subOk, setSubOk] = useState(false);
    const [bgError, setBgError] = useState(false);

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session', { email, pass });

            console.log(response);
            localStorage.setItem('ongId', response.data.data.id);
            localStorage.setItem('ongName', response.data.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Falha no login');
        }
    }

    function confirmSenha(e) {
        if(pass === e) {
            console.log(e);
            setSubOk(true);
        }else{
            setSubOk(false);
        }
    }
    
    function checkDone() {
        if(email !== '' && pass !== '' && subOk !== false) {
            setBgError('#ddd')
        }else{
            setBgError('#E02041')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        style={{borderColor: bgError}}
                        placeholder="E-MAIL"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                   
                    <input
                        style={{borderColor: bgError}}
                        placeholder="SENHA"
                        type="password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                    />
                   
                    <input
                        style={{borderColor: bgError}}
                        placeholder="CONFIRM A SENHA"
                        type="password"
                        onChange={e => confirmSenha(e.target.value)}
                    />

                    <button className="button" type={subOk ? 'submit' : 'button'} onClick={() => checkDone()}>Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />>
        </div>
    );
}