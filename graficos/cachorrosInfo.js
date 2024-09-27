const apiKey = 'live_KohkrbwAFCzGi5x2HjavjsVu3ctOyKXDv9gQqDP9l8vnLTkzpSZZPwErWj9Z0Zep';
const url = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;

async function obterDadosDeCachorros() {
    const res = await fetch(url);
    const dados = await res.json();
    
    // Calcular o número de raças e a expectativa de vida média
    const numeroDeRacas = dados.length;
    const expectativaTotal = dados.reduce((soma, cachorro) => soma + parseFloat(cachorro.life_span.split(" ")[0]), 0);
    const expectativaMedia = (expectativaTotal / numeroDeRacas).toFixed(1);

    // Exibir uma mensagem compacta em um espaço retangular estilizado
    const container = document.getElementById('info-container');
    const divInfo = document.createElement('div');
    divInfo.classList.add('info-box'); // Adiciona a classe para estilização
    divInfo.innerHTML = `
        <p>Existem <span>${numeroDeRacas}</span> raças de cachorros no mundo, e a maioria vive cerca de <span>${expectativaMedia}</span> anos.</p>
    `;
    container.appendChild(divInfo);

    // Exibir gráfico com apenas 10 raças
    criarGraficoDeExpectativaDeVida(dados.slice(0, 10)); // Seleciona as 10 primeiras raças
}

// Função para criar o gráfico com expectativa de vida por raça (somente 10 raças)
function criarGraficoDeExpectativaDeVida(cachorros) {
    const nomes = cachorros.map(cachorro => cachorro.name);
    const expectativas = cachorros.map(cachorro => parseFloat(cachorro.life_span.split(" ")[0]));

    const data = [
        {
            x: nomes,
            y: expectativas,
            type: 'bar',
            marker: {
                color: '#61dafb'
            }
        }
    ];

    const layout = {
        title: {
            text: 'Expectativa de Vida das 10 Principais Raças de Cachorros',
            font: {
                size: 24,
                color: '#ffffff'
            }
        },
        plot_bgcolor: '#282c34',
        paper_bgcolor: '#282c34',
        xaxis: {
            tickfont: {
                color: '#ffffff'
            },
            title: {
                text: 'Raças de Cachorros',
                font: {
                    color: '#ffffff'
                }
            }
        },
        yaxis: {
            tickfont: {
                color: '#ffffff'
            },
            title: {
                text: 'Expectativa de Vida (anos)',
                font: {
                    color: '#ffffff'
                }
            }
        }
    };

    const graficoDiv = document.createElement('div');
    graficoDiv.className = 'grafico';
    document.getElementById('graficos-container').appendChild(graficoDiv);
    Plotly.newPlot(graficoDiv, data, layout);
}

obterDadosDeCachorros();
