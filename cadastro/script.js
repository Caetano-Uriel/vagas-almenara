let vagas = JSON.parse(localStorage.getItem('vagas')) || [];

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