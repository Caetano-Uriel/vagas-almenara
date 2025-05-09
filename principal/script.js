let vagas = JSON.parse(localStorage.getItem('vagas')) || [];

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
  <p>Quantidade de Vagas: ${vaga.quantidade}</p>
  <p>Descrição: ${vaga.descricao}</p>
  <p>Área: ${vaga.area}</p>
  <p>Tipo: ${vaga.tipo}</p>
  <p>Contato: ${vaga.contato}</p>
  <button class="btn-candidatar" onclick="abrirModal('${vaga.nome}')">Candidatar-se</button>
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

// Abrir e fechar modal
function abrirModal(vagaNome) {
  document.getElementById('modalCandidatura').style.display = 'block';
  document.getElementById('modalOverlay').style.display = 'block';
  document.getElementById('vagaSelecionada').innerText = vagaNome;
}

function fecharModal() {
  document.getElementById('modalCandidatura').style.display = 'none';
  document.getElementById('modalOverlay').style.display = 'none';
}


// Aplicar filtros
function aplicarFiltro() {
  const area = document.getElementById('filtroArea').value.toLowerCase();
  const tipo = document.getElementById('filtroTipo').value.toLowerCase();

  const vagasFiltradas = vagas.filter(vaga => {
    return (!area || vaga.area.toLowerCase().includes(area)) &&
           (!tipo || vaga.tipo.toLowerCase().includes(tipo));
  });

  renderVagas(vagasFiltradas);
  document.getElementById('modalFiltros').style.display = 'none';
}
function abrirModal(vagaNome) {
  document.getElementById('modalCandidatura').style.display = 'block';
  document.getElementById('vagaSelecionada').innerText = vagaNome;
}

function fecharModal() {
  document.getElementById('modalCandidatura').style.display = 'none';
  document.getElementById('formCandidatura').reset();
}

document.getElementById('formCandidatura').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Candidatura enviada com sucesso!');
  fecharModal();
});
