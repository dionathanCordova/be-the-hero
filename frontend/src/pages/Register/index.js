import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [pass, setPass] = useState('');
    const [uf, setUf] = useState('');
    const [submitOk, setSubmitOk] = useState(false);
    const [bgError, setBgError] = useState(false);
    const [passIncorrect, setPassIncorrect] = useState(false);

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            pass,
            city,
            uf
        };

        try {
            const response = await api.post('ongs', data);

            alert(`Seu cadastro foi efetuado com sucesso`);
            history.push('/');
        } catch (error) {
            alert(`Erro no cadastro, tente novamente. - apresentou o seginte erro: ${error}` );
        }
    }

    function confirmSenha(e) {
        console.log(passIncorrect);
        if(pass === e) {
            setSubmitOk(true);
            setPassIncorrect(false);
            setBgError("#FFF");
        }else{
            setBgError("#E02041");
            setSubmitOk(false);
            setPassIncorrect(true);
        }
    }

    function replaceWhiteSpace(val) {
        let repWhats = val.replace(' ', '');
        
        repWhats = repWhats.replace('+', '');
        if(repWhats.length <= 11) {
            setWhatsapp(repWhats);
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Já possuo cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        style={{borderColor: bgError}}
                        placeholder={passIncorrect ? "verifique se a senha está correta" : "INFORME SUA SENHA"}
                        type="password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                    />

                    <input
                        style={{borderColor: bgError}}
                        placeholder={passIncorrect ? "verifique se a senha está correta" : "CONFIRMAR A SENHA"}
                        type="password"
                        onChange={e => confirmSenha(e.target.value)}
                    />

                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        type="number"
                        onChange={e => replaceWhiteSpace(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type={submitOk ? "submit" : "button"}>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}