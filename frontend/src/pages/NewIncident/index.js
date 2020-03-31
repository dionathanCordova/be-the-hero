import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    
    function registerValue(valueChange) {
        let value = valueChange.replace(',', '.');
        setValue(value);
    }

    async function handleNewIncident(e) {
        e.preventDefault();

        var data = {
            title,
            description,
            value
        }

        try {
            const response = await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            if(response.status === 200) {
                history.push('/profile');
            }else{
                alert(response.msgStatus);
            }
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente')
        }
    }
    
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamenteo para encontrar herói para resolver isso.</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => registerValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}