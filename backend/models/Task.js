const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    tarefa: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Task', TaskSchema);