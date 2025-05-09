const form = document.getElementById("form-atividade");
const imgAprovado = '<img src="./aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./reprovado.png" alt="Emoji decepcionado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

// Validação da nota mínima
let notaMinima = parseFloat(prompt('Digite a nota mínima:'));
if (isNaN(notaMinima)) {
    notaMinima = 7;
    alert('Nota mínima inválida. Usando valor padrão: 7');
}
console.log('Nota mínima usada:', notaMinima); // Para teste

let linhas = '';

form.addEventListener("submit", function (e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediafinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById("nome-atividade");
    const inputNotaAtividade = document.getElementById("nota-atividade");

    const nomeAtividade = inputNomeAtividade.value;
    const notaAtividade = parseFloat(inputNotaAtividade.value);

    if (atividades.includes(nomeAtividade)) {
        alert("A atividade já foi inserida!");
        return;
    }

    atividades.push(nomeAtividade);
    notas.push(notaAtividade);

    const emojiStatus = notaAtividade >= notaMinima ? imgAprovado : imgReprovado;

    let linha = '<tr>';
    linha += `<td>${nomeAtividade}</td>`;
    linha += `<td>${notaAtividade}</td>`;
    linha += `<td class="emoji-status">${emojiStatus}</td>`;
    linha += `</tr>`;

    linhas += linha;

    inputNomeAtividade.value = "";
    inputNotaAtividade.value = "";
}

function atualizaTabela() {
    const corpoTabela = document.querySelector("tbody");
    corpoTabela.innerHTML = linhas;
}

function atualizaMediafinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}


