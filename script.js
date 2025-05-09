// Recupera as vagas do localStorage ou inicia vazio
let vagas = JSON.parse(localStorage.getItem('vagas')) || [];

// ======= PÁGINA DE CADASTRO (cadastro.html) =======
const form = document.getElementById('vagaForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const novaVaga = {
      nome: document.getElementById('nome').value,
      descricao: document.getElementById('descricao').value,
      area: document.getElementById('area').value,
      tipo: document.getElementById('tipo').value,
      contato: document.getElementById('contato').value
    };

    vagas.push(novaVaga);
    localStorage.setItem('vagas', JSON.stringify(vagas));
    alert('Vaga cadastrada com sucesso!');
    window.location.href = 'index.html';
  });

  document.getElementById('voltar').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

// ======= PÁGINA PRINCIPAL (index.html) =======
const vagasList = document.getElementById('vagasList');
if (vagasList) {
  renderVagas(vagas);

  document.querySelector('button[onclick="filtrarVagas()"]').addEventListener('click', filtrarVagas);
}

function renderVagas(lista) {
  vagasList.innerHTML = '';
  if (lista.length === 0) {
    vagasList.innerHTML = '<li>Nenhuma vaga encontrada.</li>';
    return;
  }

  lista.forEach(vaga => {
    const li = document.createElement('li');
    li.classList.add('vaga');
    li.innerHTML = `
      <h3>Vaga: ${vaga.nome}</h3>
      <p>Descrição: ${vaga.descricao}</p>
      <p>Área: ${vaga.area}</p>
      <p>Tipo: ${vaga.tipo}</p>
      <p>Contato: ${vaga.contato}</p>
    `;
    vagasList.appendChild(li);
  });
}

function filtrarVagas() {
  const area = document.getElementById('area').value;
  const tipo = document.getElementById('tipo').value;

  const filtradas = vagas.filter(vaga => {
    const areaOk = area ? vaga.area === area : true;
    const tipoOk = tipo ? vaga.tipo === tipo : true;
    return areaOk && tipoOk;
  });

  renderVagas(filtradas);
}
