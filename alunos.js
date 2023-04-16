
  const fs = require('fs');
const alunos = require('./db.json');

function filtrarPorNome(nome) {
    return alunos.filter((aluno) =>
        aluno.nome.toLowerCase().includes(nome.toLowerCase())
    );
}

function filtrarPorMedia(media) {
    return alunos.filter((aluno) => aluno.media >= media);
}

function adicionarAluno(novoAluno) {
    alunos.push(novoAluno);
    fs.writeFileSync('./db.json', JSON.stringify(alunos));
}

function deletarAluno(index) {
    alunos.splice(index, 1);
    fs.writeFileSync('./db.json', JSON.stringify(alunos));
}

function atualizarAluno(index, alunoAtualizado) {
    alunos[index] = alunoAtualizado;
    fs.writeFileSync('./db.json', JSON.stringify(alunos));
}

module.exports = {
    alunos,
    filtrarPorNome,
    filtrarPorMedia,
    adicionarAluno,
    deletarAluno,
    atualizarAluno,
};
