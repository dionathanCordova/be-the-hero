import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit, FiEdit2, FiEdit3 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    if(!ongId) {
        history.push('/');
    }

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]); 

    async function handleDeleteIncident(incidentId) {
        try {
            await api.delete(`incidents/${incidentId}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== incidentId));
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    async function handleUpdateIncident(incidentId) {
        try{
            const incidente = await api.post(`incidents/${incidentId}`, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push({
                pathname: '/incidents/update',
                state: { detail: incidente.data }
            })
        }catch(err) {

        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span> Bem vindo(a), {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <article>
                <h1>Casos cadastrados </h1>

                <ul>
                    {incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO</strong>
                            <p>{incident.description}</p><br/>

                            <div className="input-group" style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div className="valor">
                                    <strong>VALOR:</strong>
                                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                                </div>

                                <div className="arrecadado" >
                                    <strong>VALOR ARRECADADO:</strong>
                                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.amount_collected)}</p>
                                </div>
                            </div>

                            <div className="group-btn">
                                <button type="button" onClick={() => handleUpdateIncident(incident.id)}>
                                    <FiEdit size={20} color="$a8a8b3" />
                                </button>

                                <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                    <FiTrash2 size={20} color="$a8a8b3" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </article>
        </div>
    );
}