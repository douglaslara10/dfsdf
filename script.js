function fetchAndUpdateData() {
  // Substitua a URL pela sua API real
  fetch('https://quizz-guima.onrender.com/https://231223')
    .then(response => response.json())
    .then(data => {
      updateTable(data.resultados);
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
}

function updateTable(resultados) {
  const tableBody = document.querySelector('#ranking tbody');
  tableBody.innerHTML = '';

  resultados.sort((a, b) => {
    // Ordenando por pontuação (decrescente) e, em caso de empate, por tempo (crescente)
    if (b.pontuacao !== a.pontuacao) {
      return b.pontuacao - a.pontuacao;
    } else {
      return a.tempo - b.tempo;
    }
  });

  // Extraindo os três primeiros colocados (pódio)
  const podio = resultados.slice(0, 3);

  // Extraindo os demais colaboradores a partir do 4º colocado
  const restante = resultados.slice(3);

  // Preenchendo o pódio na tabela
  podio.forEach((resultado, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${resultado.nome}</td>
      <td>${resultado.pontuacao}</td>
      <td>${resultado.tempo}</td>
    `;
    tableBody.appendChild(row);
  });

  // Adicionando uma linha vazia para separar o pódio do restante
  const linhaSeparadora = document.createElement('tr');
  linhaSeparadora.innerHTML = '<td colspan="4"></td>';
  tableBody.appendChild(linhaSeparadora);

  // Preenchendo o restante na tabela
  restante.forEach((resultado, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 4}</td>
      <td>${resultado.nome}</td>
      <td>${resultado.pontuacao}</td>
      <td>${resultado.tempo}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Atualizar a cada segundo
setInterval(fetchAndUpdateData, 1000);

// Inicializar a tabela
fetchAndUpdateData();
