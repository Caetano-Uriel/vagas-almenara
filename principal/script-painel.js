let vagas = JSON.parse(localStorage.getItem('vagas')) || [];

const vagasPendentesList = document.getElementById('vagasPendentesList');
if (vagasPendentesList) {
  renderVagas(vagas);

  const filtrarButton = document.querySelector('button[onclick="filtrarVagas()"]');
  if (filtrarButton) {
    filtrarButton.addEventListener('click', filtrarVagas);
  }
}

// Função para renderizar a lista de vagas
function renderVagas(lista) {
  vagasPendentesList.innerHTML = '';
  if (lista.length === 0) {
    vagasPendentesList.innerHTML = '<li>Nenhuma vaga encontrada.</li>';
    return;
  }

  lista.forEach((vaga, index) => {
    const li = document.createElement('li');
    li.classList.add('vaga');
    li.innerHTML = `
  <h3>Vaga: ${vaga.nome}</h3>
  <p>Descrição: ${vaga.descricao}</p>
  <p>Área: ${vaga.area}</p>
  <p>Tipo: ${vaga.tipo}</p>
  <p>Contato: ${vaga.contato}</p>
  <button class="editar" onclick="editarVaga(${index})">Editar</button>
  <button class="excluir" onclick="deletarVaga(${index})">Excluir</button>
`;

    vagasPendentesList.appendChild(li);
  });
}

// Função para excluir uma vaga
function deletarVaga(index) {
  // Remove a vaga do array
  vagas.splice(index, 1);
  // Atualiza o localStorage
  localStorage.setItem('vagas', JSON.stringify(vagas));
  // Re-renderiza a lista
  renderVagas(vagas);
}

// Função para editar uma vaga
function editarVaga(index) {
  const vaga = vagas[index];
  // Exemplo de como você pode preencher um formulário de edição
  document.getElementById('nome').value = vaga.nome;
  document.getElementById('descricao').value = vaga.descricao;
  document.getElementById('area').value = vaga.area;
  document.getElementById('tipo').value = vaga.tipo;
  document.getElementById('contato').value = vaga.contato;
  
  // Altera o evento do botão de "Salvar" para atualizar a vaga
  const saveButton = document.getElementById('saveButton');
  saveButton.onclick = () => atualizarVaga(index);
}

// Função para atualizar uma vaga
function atualizarVaga(index) {
  const vagaAtualizada = {
    nome: document.getElementById('nome').value,
    descricao: document.getElementById('descricao').value,
    area: document.getElementById('area').value,
    tipo: document.getElementById('tipo').value,
    contato: document.getElementById('contato').value
  };

  // Atualiza o array com a vaga editada
  vagas[index] = vagaAtualizada;
  // Atualiza o localStorage
  localStorage.setItem('vagas', JSON.stringify(vagas));
  // Re-renderiza a lista
  renderVagas(vagas);
  
  // Limpa o formulário
  document.getElementById('nome').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('area').value = '';
  document.getElementById('tipo').value = '';
  document.getElementById('contato').value = '';
}

