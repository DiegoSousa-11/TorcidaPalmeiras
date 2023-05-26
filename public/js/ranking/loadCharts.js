const assertivenessChartCanvas = document.getElementById("assertivenessChartCanvas");
const crowdAssertivenessChartCanvas = document.getElementById("crowdAssertivenessChartCanvas"); 
const rankingUsersChartCanvas = document.getElementById("rankingUsersChartCanvas");

function createUserAssertivenessChart(data) {
    const wrongGuesses = data[0];
    const rightGuesses = data[1];

    var assertivenessChartData = {
        labels: ['Palpites incorretos', 'Palpites certos'],
        datasets: [{
            label: 'Quantidade',
            data: [wrongGuesses, rightGuesses],
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
    
                    const wrongGuesses = chart.data.datasets[0].data[0];
                    const rightGuesses = chart.data.datasets[0].data[1];
    
                    var rightGuessesPercentage = (rightGuesses * 100)/(wrongGuesses + rightGuesses);
    
                    if(!rightGuessesPercentage) {
                        rightGuessesPercentage = 0;
                    }
                    
                    const canvasCenterCoords = {
                        x: ctx.canvas.clientHeight/2,
                        y: (ctx.canvas.clientWidth/2) + 3
                    }
    
                    ctx.save();
    
                    ctx.font = '800 2.2rem Poppins';
                    ctx.fillStyle = '#FFF';
                    
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
        
                    const text = `${rightGuessesPercentage.toFixed(1)}%`;
        
                    ctx.fillText(text, canvasCenterCoords.x, canvasCenterCoords.y);
                }
            }
        ]
    });

    const rightGuessesPercentageText = document.getElementById('userRightGuessesPercentage');
    const wrongGuessesPercentageText = document.getElementById('userWrongGuessesPercentage');

    const rightGuessesPercentage = (rightGuesses * 100)/(wrongGuesses + rightGuesses);
    const wrongGuessesPercentage = 100 - rightGuessesPercentage;

    rightGuessesPercentageText.innerHTML = rightGuessesPercentage.toFixed(2) + '%';
    wrongGuessesPercentageText.innerHTML = wrongGuessesPercentage.toFixed(2) + '%';
}

function createAssertivenessChart(data) {
    const wrongGuesses = data[0];
    const rightGuesses = data[1];

    var crowdAssertivenessChartData = {
        labels: ['Palpites incorretos', 'Palpites certos'],
        datasets: [{
            label: 'Quantidade',
            data: [wrongGuesses, rightGuesses],
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
    
                    const wrongGuesses = chart.data.datasets[0].data[0];
                    const rightGuesses = chart.data.datasets[0].data[1];
    
                    var rightGuessesPercentage = (rightGuesses * 100)/(wrongGuesses + rightGuesses);
    
                    if(!rightGuessesPercentage) {
                        rightGuessesPercentage = 0;
                    }
                    
                    const canvasCenterCoords = {
                        x: ctx.canvas.clientHeight/2,
                        y: (ctx.canvas.clientWidth/2) + 3
                    }
    
                    ctx.save();
    
                    ctx.font = '800 2.2rem Poppins';
                    ctx.fillStyle = '#FFF';
                    
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
        
                    const text = `${rightGuessesPercentage.toFixed(1)}%`;
        
                    ctx.fillText(text, canvasCenterCoords.x, canvasCenterCoords.y);
                }
            }
        ]
    });

    const rightGuessesPercentageText = document.getElementById('crowdRightGuessesPercentage');
    const wrongGuessesPercentageText = document.getElementById('crowdWrongGuessesPercentage');

    const rightGuessesPercentage = (rightGuesses * 100)/(wrongGuesses + rightGuesses);
    const wrongGuessesPercentage = 100 - rightGuessesPercentage;

    rightGuessesPercentageText.innerHTML = rightGuessesPercentage.toFixed(2) + '%';
    wrongGuessesPercentageText.innerHTML = wrongGuessesPercentage.toFixed(2) + '%';
} 

function createRankingChart(labels, data, images, userNames) {
    var barAvatar = {
        id: 'barAvatar',
        afterDatasetDraw(chart, args, options) {
            const { ctx, chartArea: { top, bottom, left, right, width, height }, 
                scales: { x, y } 
            } = chart;

            ctx.save();         
            
            ctx.font = '500 15px Poppins';
            ctx.fillStyle = '#FFF';

            for(var i = 0; i < images.length; i++) {
                const xCoordinate = x.getPixelForValue(i) - (30 / 2);
                const yCoordinate = y.getPixelForValue(data[i]) - 80;
                
                ctx.drawImage(images[i], xCoordinate, yCoordinate, 50, 50);

                ctx.fillText(userNames[i], xCoordinate - 20, yCoordinate + 70);
            }
        }
    }

    var rankingUsersChartData = {
        labels: labels,
        datasets: [{
            label: 'Número de palpites certos',
            data: data,
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
                        stepSize: 5,
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
        plugins: [barAvatar]
    });
}

function loadAllChartsData() {
    loadUserAssertivenessRate();
    loadCrowdAssertivenessRate();
    loadCrowdRanking();
}

