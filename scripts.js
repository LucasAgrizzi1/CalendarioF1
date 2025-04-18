


// Função para adicionar cronômetros às corridas
function mostrarCorridas() {
  const container = document.getElementById('races-container');
  const dataAtual = new Date();
  const ano = 2025; // Definindo o ano atual para as corridas

  // Itera sobre a lista de corridas
  races.forEach(({ race, date, url, primeiraEdicao, tempoRecorde, comprimento, numVoltas, maiorVencedor }) => {
    const div = document.createElement('div');
    div.className = 'race';// Adiciona a classe CSS 'race'  

    const raceId = race.replace(/\s+/g, '-').toLowerCase(); // Gera um ID único para cada corrida
    const countdownId = `countdown-${raceId}`; // Gera um ID único para o cronômetro da corrida

    // Divide a data da corrida em dia e mês
    const dataParts = date.split(' de ');
    const dia = parseInt(dataParts[0]);
    const mes = obterNumeroMes(dataParts[1]);

    // Adicionar 14 horas para compensar o problema de fuso horário
    const dataCorrida = new Date(ano, mes, dia, 14, 0, 0);

    // Verificar se a corrida já aconteceu
    const corridaJaAconteceu = dataCorrida < dataAtual;

    // Define o layout HTML para exibir as informações da corrida
    div.innerHTML = `
        <strong style="cursor:pointer; color:#e10600;" onclick="toggleImagem('${raceId}', '${url}')">${race}</strong> - ${date}
        <div id="countdown-container-${raceId}" class="countdown-container">
          ${corridaJaAconteceu ?
        '<span class="race-completed">Corrida já realizada</span>' :
        `<div id="${countdownId}" class="countdown"></div>`
      }
        </div>
        <div id="${raceId}" style="display: none; margin-top:10px;">
        
          <div class="race-layout">
            <div class="race-img">
              <img src="${url}" alt="Mapa do ${race}" style="width:100%; max-width:600px; border-radius:8px;" />
            </div>
            
            <div class="race-info-layout">
              <div class="race-info">
                <strong>Primeira Edição:</strong> ${primeiraEdicao}
                <p><strong>Tempo Recorde de Volta:</strong> ${tempoRecorde}</p
                <strong>Comprimento do Circuito:</strong> ${comprimento}</p>
                <strong>Número de Voltas:</strong> ${numVoltas}<p>
                <strong>Maior Vencedor:</strong> ${maiorVencedor}
              </div>
            </div>
          </div>
        </div>
      `;
    container.appendChild(div); // Adiciona o elemento da corrida ao contêiner

    // Iniciar o cronômetro se a corrida ainda não aconteceu
    if (!corridaJaAconteceu) {
      iniciarCronometro(countdownId, dataCorrida);
    }
  });
}

// Função para converter nome do mês para número (0-11)
function obterNumeroMes(nomeMes) {
  const meses = {
    'Janeiro': 0,
    'Fevereiro': 1,
    'Março': 2,
    'Abril': 3,
    'Maio': 4,
    'Junho': 5,
    'Julho': 6,
    'Agosto': 7,
    'Setembro': 8,
    'Outubro': 9,
    'Novembro': 10,
    'Dezembro': 11
  };
  return meses[nomeMes];
}

// Função para iniciar o cronômetro de uma corrida específica
function iniciarCronometro(id, dataCorrida) {
  const cronometroElement = document.getElementById(id); // Seleciona o elemento do cronômetro

  // Função para atualizar o cronômetro
  function atualizarCronometro() {
    const agora = new Date(); // Obtém a data e hora atual
    const diferenca = dataCorrida - agora;// Calcula a diferença entre a data da corrida e a data atual

    // Verificar se a corrida já aconteceu
    if (diferenca <= 0) {
      clearInterval(interval);
      cronometroElement.innerHTML = 'Corrida em andamento ou já realizada';
      return;
    }

    // Calcular dias, horas, minutos e segundos restantes
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Exibir o tempo restante
    cronometroElement.innerHTML = `
        <div class="countdown-time">
          <span class="countdown-number">${dias}</span>
          <span class="countdown-text">dias</span>
        </div>
        <div class="countdown-time">
          <span class="countdown-number">${horas.toString().padStart(2, '0')}</span>
          <span class="countdown-text">horas</span>
        </div>
        <div class="countdown-time">
          <span class="countdown-number">${minutos.toString().padStart(2, '0')}</span>
          <span class="countdown-text">min</span>
        </div>
        <div class="countdown-time">
          <span class="countdown-number">${segundos.toString().padStart(2, '0')}</span>
          <span class="countdown-text">seg</span>
        </div>
      `;
  }

  atualizarCronometro(); // Atualiza o cronômetro imediatamente

  // Atualizar o cronômetro a cada segundo
  const interval = setInterval(atualizarCronometro, 1000);
}

// Função para alternar a exibição da imagem (mantida como estava)
function toggleImagem(id, url) {
  const imgDiv = document.getElementById(id); // Seleciona o elemento da imagem
  if (imgDiv.style.display === 'none' || imgDiv.style.display === '') {
    imgDiv.style.display = 'block'; // Mostra a imagem
  } else {
    imgDiv.style.display = 'none'; // Oculta a imagem
  }
}

// Mostra as corridas automaticamente ao carregar a página
window.onload = mostrarCorridas;

function toggleEquipes() {     // Função para alternar a exibição de equipes e pilotos através de um botão
  const container = document.getElementById('teams-container'); // Seleciona o contêiner das equipes
  const button = document.getElementById('toggle-btn'); // Seleciona o botão de alternância
  if (container.style.display === 'none' || container.style.display === '') {
    container.style.display = 'block'; // Mostra o contêiner
    button.textContent = 'Ocultar Equipes e Pilotos'; // Atualiza o texto do botão
    container.innerHTML = ''; // Limpa o conteúdo do contêiner
    mostrarEquipes(); // Chama a função para exibir as equipes
  } else {
    container.style.display = 'none';
    button.textContent = 'Ver Equipes e Pilotos';
  }
}

// Função para exibir as equipes e seus pilotos
function mostrarEquipes() {
  const container = document.getElementById('teams-container');
  // Itera sobre a lista de equipes
  teams.forEach(({ team, drivers, imagem, logo }) => {
    const div = document.createElement('div'); // Cria um elemento div para cada equip
    div.className = 'team'; // Adiciona a classe CSS 'team'

    // Define o layout HTML para exibir as informações da equipe
    const layout = `
            <h2>
              <img src="${logo}" alt="Logo ${team}">${team}
            </h2>
            <div class="team-layout">
              <button class="driver-btn" onclick="mostrarDetalhes('${drivers[0].nome}')">
                ${drivers[0].nome}
                <img src="https://flagcdn.com/w40/${drivers[0].bandeira}.png" style="width:18px; vertical-align:middle; margin-left:6px;">
              </button>
              <img src="${imagem}" alt="Carro da ${team}" class="car-img">
              <button class="driver-btn" onclick="mostrarDetalhes('${drivers[1].nome}')">
                ${drivers[1].nome}
                <img src="https://flagcdn.com/w40/${drivers[1].bandeira}.png" style="width:18px; vertical-align:middle; margin-left:6px;">
              </button>
            </div>
          `;

    div.innerHTML = layout; // Insere o layout no elemento div
    container.appendChild(div); // Adiciona o elemento da equipe ao contêiner
  });
}

function mostrarDetalhes(nome) {
  const piloto = driverStats[nome]; // Obtém os dados do piloto pelo nome
  if (!piloto) return alert("Dados do piloto não encontrados.");

  const driverDiv = document.getElementById('driver-info'); // Seleciona o contêiner de informações do piloto
  const overlay = document.getElementById('overlay'); // Seleciona o overlay para exibição

  // Define o layout HTML para exibir os detalhes do piloto
  driverDiv.innerHTML = `
          <h3>${nome}</h3>
          <img src="${piloto.foto}" alt="${nome}">
          <p>Numero: ${piloto.numero}
          <p>Idade: ${piloto.idade} anos</p>
          <p>Nacionalidade: ${piloto.nacionalidade}</p>
          <p>Títulos: ${piloto.titulos}</p>
          <p>Corridas: ${piloto.corridas}</p>
          <p>Vitórias: ${piloto.vitorias}</p>
          <p>Pódios: ${piloto.podios}</p>
          <button onclick="fecharDetalhes()">Fechar</button>
        `;

  driverDiv.style.display = 'block'; // Exibe o contêiner de informações do piloto
  overlay.style.display = 'block'; // Exibe o overlay
}

// Função para fechar os detalhes do piloto
function fecharDetalhes() {
  document.getElementById('driver-info').style.display = 'none'; // Oculta o contêiner de informações do piloto
  document.getElementById('overlay').style.display = 'none'; // Oculta o overlay
}

