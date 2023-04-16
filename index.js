const express = require('express');
const { alunos, filtrarPorNome, filtrarPorMedia, adicionarAluno, deletarAluno, atualizarAluno } = require('./alunos');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));

// Código abaixo referente ao Filtrar alunos 
app.get('/alunos', (req, res) => {
    let resultado = alunos;

    if (req.query.nome) {
        resultado = filtrarPorNome(req.query.nome);
    }
    if (req.query.media) {
        resultado = filtrarPorMedia(req.query.media);
    }

    res.json(resultado);
});

// Código abaixo: Adicionar novo aluno
app.post('/alunos', (req, res) => {
    const { nome, matricula, media } = req.body;
    const novoAluno = { nome, media: parseFloat(media), matricula };
    adicionarAluno(novoAluno);
    res.status(201).json({ mensagem: 'Aluno adicionado com sucesso!' });
});

app.put('/alunos/:index', (req, res) => {
    const index = req.params.index;
    const { nome, media } = req.body;

    if (!alunos[index]) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado' });
    }
    const alunoAtualizado = { nome, media: parseFloat(media), matricula: alunos[index].matricula };
    atualizarAluno(index, alunoAtualizado);
    res.json({ mensagem: 'Aluno atualizado com sucesso!' });
});

// Código abaixo: Deletar Aluno 
app.delete('/alunos/:index', (req, res) => {
    const index = req.params.index;

    if (alunos[index]) {
        deletarAluno(index);
        res.json({ mensagem: 'Aluno removido com sucesso!' });
    } else {
        res.status(404).json({ mensagem: 'Aluno não encontrado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
