const assertivenessChartCanvas = document.getElementById("assertivenessChartCanvas");
const crowdAssertivenessChartCanvas = document.getElementById("crowdAssertivenessChartCanvas"); 
const rankingUsersChartCanvas = document.getElementById("rankingUsersChartCanvas");

var assertivenessChartData = {
    labels: ['Palpites incorretos', 'Palpites certos'],
    datasets: [{
        label: 'Quantidade',
        data: [5, 15],
        backgroundColor: [
          '#FFF',
          '#0B3822',
        ],
        hoverOffset: 4
    }]
}

const assertivenessChart = new Chart(assertivenessChartCanvas, {
    type: 'doughnut',
    data: assertivenessChartData,
    options: {
        cutout: 65,
        responsive: true,
        borderWidth: 0,
        plugins: {
            legend: {
                display: false
            },
        },
    },
    plugins: [
        {
            beforeDatasetsDraw(chart) {
                const ctx = chart.ctx;
                
                const canvasCenterCoords = {
                    x: ctx.canvas.clientHeight/2,
                    y: (ctx.canvas.clientWidth/2) + 3
                }

                ctx.save();

                ctx.font = '800 2.2rem Poppins';
                ctx.fillStyle = '#FFF';
                
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
    
                const text = '70%';
    
                ctx.fillText(text, canvasCenterCoords.x, canvasCenterCoords.y);
            }
        }
    ]
});

var crowdAssertivenessChartData = {
    labels: ['Palpites incorretos', 'Palpites certos'],
    datasets: [{
        label: 'Quantidade',
        data: [10, 15],
        backgroundColor: [
          '#FFF',
          '#0B3822',
        ],
        hoverOffset: 4
    }]
}

const crowdAssertivenessChart = new Chart(crowdAssertivenessChartCanvas, {
    type: 'doughnut',
    data: crowdAssertivenessChartData,
    options: {
        cutout: 65,
        responsive: true,
        borderWidth: 0,
        plugins: {
            legend: {
                display: false
            },
        },
    },
    plugins: [
        {
            beforeDatasetsDraw(chart) {
                const ctx = chart.ctx;

                const canvasCenterCoords = {
                    x: ctx.canvas.clientHeight/2,
                    y: (ctx.canvas.clientWidth/2) + 3
                }
    
                ctx.save();

                ctx.font = '800 2.2rem Poppins';
                ctx.fillStyle = '#FFF';
                
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
    
                const text = '60%';
    
                ctx.fillText(text, canvasCenterCoords.x, canvasCenterCoords.y);
            }
        }
    ]
});

var rankingUsersChartData = {
    labels: ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º'],
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40, 50, 80, 30],
        backgroundColor: '#006432',
        hoverOffset: 10
    }]
}

const rankingUsersContainer = document.querySelector('.usersRanking');

const rankingUsersChart = new Chart(rankingUsersChartCanvas, {
    type: 'bar',
    data: rankingUsersChartData,
    options: {
        aspectRatio: 2,
        responsive: true,
        borderRadius: 30,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#FFF',
                    font: {
                        family: 'Poppins',
                        size: 15
                    }
                },
                grid: {
                    display: false
                }
            },
            y: {
                ticks: {
                    color: '#FFF',
                    font: {
                        family: 'Poppins',
                        size: 15
                    },
                    stepSize: 15,
                    padding: 10
                },
                grid: {
                    color: '#FFFFFF1A',
                    lineWidth: 2,
                },
                border: {
                    display: false
                },
            }
        }
    },
});
