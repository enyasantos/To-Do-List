const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TaskModel = require('./models/Task');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('<mongourl>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.get('/tarefas', async (request, response) => {
    try {
        const tasks = await TaskModel.find();
        return response.json(tasks);
    } catch(err) {
        return response.status(400).send({ error: 'Erro ao carregar tarefas.' });
    }
});

app.post('/tarefas', async (request, response) => {
    try {
        const { tarefa, categoria } = request.body;
        await TaskModel.create({
            tarefa,
            categoria
        });
        return response.status(202).send({ ok: 'Requisição bem sucedida' });
    } catch (err) {
        return response.status(400).send({ error: 'Erro ao criar tarefa.' });
    }
});

app.delete('/tarefas/:index', async (request, response) => {
    try {
        const idTarefa = request.params.index;
        const checkTarefa = await TaskModel.findOne({ _id: idTarefa });
        if(!checkTarefa) return response.status(404).send({ error: 'Tarefa não encontrado.'});
        await TaskModel.deleteOne({ _id: idTarefa });
        return response.status(200).send({ ok: 'Requisição bem sucedida' })
    } catch (err) {
        return response.status(400).send({ error: 'Não foi possivel deletar.'});
    }
});

app.listen(3333);
