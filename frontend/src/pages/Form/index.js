import React, { useState } from 'react';

import api from '../../services/api';

import './styles.css';

export default function Form(props) {

    const [ error, setError ] = useState('');
    const [ task, setTask ] = useState('');
    const [ category, setCategory ] = useState('');

    const categories = [
        [ 'Exercicío Físico' ],
        [ 'Estudos' ],
        [ 'Criatividade' ],
        [ 'Comida' ],
        [ 'Dinheiro' ],
        [ 'Casa' ],
        [ 'Ideia' ],
        [ 'Viagem' ],
        [ 'Padrão' ],
        [ 'Pet' ],
        [ 'Trabalho' ],
    ];

    async function handleCreateTask(e) {
        setError('');
        e.preventDefault();
        const data = {
            tarefa: task,
            categoria: category,
        };
        if(task === '' || category === '') return setError('Preencha todos os campos');
        try {
            await api.post('tarefas', data);
            setTask('');
            setCategory('');
        } catch (err) {
            alert(err.data);
        }
    }

    return (
        <div className="container" id="form">
            {error 
            ?   <p className="error">{`ERRO: ${error}*`}</p>
            :   <p className="error" hidden></p>
            }
            <form className="formAddTask">
                <input 
                    data-cy="task-add"
                    type="text" 
                    name="task" 
                    id="task" 
                    placeholder="Digite aqui a tarefa*"
                    value={task}
                    onChange={  e => setTask(e.target.value) }
                />
                <div className="addTask">
                    <select 
                        data-cy="task-category"
                        name="selectCategory" 
                        className="selectCategory"
                        value={category}
                        onChange={ e => setCategory(e.target.value) }
                    >
                        <option value="">--- Selecione uma categoria --- *</option>
                        {categories.map(caregory => (
                            <option value={caregory}>
                                {caregory}
                            </option> 
                        ))}
                    </select>
                    <button
                            data-cy="btn-add-task"
                            className="btn-addTask"
                            onClick={(e) => {  
                                handleCreateTask(e);
                            }}
                        >
                            +
                    </button>
                </div>
            </form>
        </div>
    )
}