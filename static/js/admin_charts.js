const progressCanvas = document.getElementById('progressChart');
const riskCanvas = document.getElementById('riskChart');

if (progressCanvas) {
    new Chart(progressCanvas, {
        type: 'doughnut',
        data: {
            labels: ['Não iniciados', 'Em andamento', 'Concluídos'],
            datasets: [{
                data: [
                    progressoData.naoIniciados,
                    progressoData.emAndamento,
                    progressoData.concluidos
                ],
                backgroundColor: [
                    '#9B111E',
                    '#f59e0b',
                    '#16a34a'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

if (riskCanvas) {
    new Chart(riskCanvas, {
        type: 'bar',
        data: {
            labels: ['Baixo risco', 'Médio risco', 'Alto risco'],
            datasets: [{
                label: 'Usuários',
                data: [
                    riscoData.baixo,
                    riscoData.medio,
                    riscoData.alto
                ],
                backgroundColor: [
                    '#16a34a',
                    '#f59e0b',
                    '#9B111E'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}