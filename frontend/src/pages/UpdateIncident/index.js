import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(props) {
    const idIncident = props.location.state.detail.id;
    const [title, setTitle] = useState(props.location.state.detail.title);
    const [description, setDescription] = useState(props.location.state.detail.description);
    const [value, setValue] = useState(props.location.state.detail.value);
    const [amountCollected, setAmountCollected] = useState(props.location.state.detail.amount_collected);

    console.log(idIncident)
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    
    function registerValue(valueChange) {
        let value = valueChange.replace(',', '.');
        setAmountCollected(value);
    }

    async function handleUpdateIncident(e) {
        e.preventDefault();

        var data = {
            id: idIncident,
            title,
            value,
            description,
            amount_collected: amountCollected
        }

        try {
            const response = await api.put(`incidents/${idIncident}`, data, {
                headers: {
                    Authorization: ongId
                }
            });
             
            console.log(response);

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
                    <h1>Alterar informações do seu caso</h1>
                    <p>Descreva o caso detalhadamenteo para encontrar pessoas que ajudariam a resolver.</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleUpdateIncident}>
                    <label htmlFor="title">Título</label>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    /> 

                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <label htmlFor="value">Valor</label>
                    <input
                        disabled
                        placeholder="Valor em reais ou quantidade"
                        value={value}
                        onChange={e => registerValue(e.target.value)}
                    />

                    <label htmlFor="value">Valor arrecadado</label>
                    <input
                        type="number"
                        placeholder="Valor em reais ou quantidade"
                        value={amountCollected ? amountCollected : 0}
                        onChange={e => registerValue(e.target.value)}
                    />

                    <button className="button" type="submit">Alterar</button>
                </form>
            </div>
        </div>
    );
}