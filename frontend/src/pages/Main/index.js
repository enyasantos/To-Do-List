import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './styles.css';

import deleteIcon from '../../assets/images/icons/delete.png';

import gymImage from '../../assets/images/typeIcons/gym.png';
import studiesImage from '../../assets/images/typeIcons/studies.png';
import origamiImage from '../../assets/images/typeIcons/origami.png';
import foodImage from '../../assets/images/typeIcons/food.png';
import businessImage from '../../assets/images/typeIcons/business.png';
import homeImage from '../../assets/images/typeIcons/home.png';
import ideaImage from '../../assets/images/typeIcons/idea.png';
import travelImage from '../../assets/images/typeIcons/travel.png';
import watchImage from '../../assets/images/typeIcons/watch.png';
import petImage from '../../assets/images/typeIcons/pet.png';
import workImage from '../../assets/images/typeIcons/work.png';

export default function Main(props) {

    const [ tasks, setTasks ] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState('');
    
    function handleDelete(e, index){
        e.preventDefault();
        const i = document.getElementById(`box-${index}`);
        i.classList.add('deleteAnimation');
        setTimeout(() => {
            try {
                api.delete(`/tarefas/${index}`)
            } catch (err) {
                alert(err.data);
            }
        }, 900);
    }

    function handleCategoryColor(category) {
        if(category === 'Exercicío Físico') return '#F05064';
        else if(category === 'Estudos') return '#4E7BFC';
        else if(category === 'Criatividade') return '#5ED285';
        else if(category === 'Comida') return '#FD3030';
        else if(category === 'Dinheiro') return '#FD5530';
        else if(category === 'Casa') return '#7C78FD';
        else if(category === 'Ideia') return '#FDC130';
        else if(category === 'Viagem') return '#74DEFF';
        else if(category === 'Padrão') return '#D4A269';
        else if(category === 'Pet') return '#9fd664';
        else if(category === 'Trabalho') return '#6F9379';
    }

    function handleCategoryImage(category) {
        if(category === 'Exercicío Físico') return gymImage;
        else if(category === 'Estudos') return studiesImage;
        else if(category === 'Criatividade') return origamiImage;
        else if(category === 'Comida') return foodImage;
        else if(category === 'Dinheiro') return businessImage;
        else if(category === 'Casa') return homeImage;
        else if(category === 'Ideia') return ideaImage;
        else if(category === 'Viagem') return travelImage;
        else if(category === 'Padrão') return watchImage;
        else if(category === 'Pet') return petImage;
        else if(category === 'Trabalho') return workImage;
    }

    useEffect(() => {
        api.get('tarefas')
        .then(response => {
            if(response.data.length === 0) setErrorMsg('Ainda não há tarefas adicionadas.');
            else setErrorMsg('');
            setTasks(response.data)
        }).catch(err => {
            setErrorMsg('Não foi possivel carregar as tarefas.');
        });
        console.log(errorMsg);
    }, [handleDelete]);

    return (
        <div className="container" id="main">
            {errorMsg 
            ? <p className="error">{errorMsg}</p>
            : <></>}
            <section id="list" className="container">
                {tasks.map( task => (
                    <div 
                        data-cy="row-task"
                        className='box' 
                        key={task._id}
                        id={`box-${task._id}`}
                    >
                        <div className="box-header" style={{background: handleCategoryColor(task.categoria)}}>
                            <img src={handleCategoryImage(task.categoria)} alt='studiesImage' />
                        </div>
                        <div className="box-body" data-cy="row-task-body">
                            <p>{task.tarefa}</p>
                        </div>
                        <div className="box-delete">
                            <button 
                                data-cy="btn-delete-task"
                                className="btn-delete"
                                onClick={(e) => {
                                    handleDelete(e, task._id);
                                }}
                            >
                                <img src={deleteIcon} alt="button delete" />
                            </button>
                    </div>
                </div>
                ))}

            </section>
        </div>
    )
}