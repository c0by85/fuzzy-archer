let outTempGauge = echarts.init(document.getElementById('outTempGauge'));
outTempGauge.setOption(getGaugeOption('Temperatur', -20, 40, 6, [[0.333, '#428bca'], [1, '#b44242']], '°C', 1));

let barometerGauge = echarts.init(document.getElementById('barometerGauge'));
barometerGauge.setOption(getGaugeOption('Luftdruck', 970, 1050, 4, [[0.54, '#428bca'], [1, '#b44242']], 'mbar', 1));

let windDirGauge = echarts.init(document.getElementById('windDirGauge'));
let windDirOption = getGaugeOption('Windrichtung', 0, 360, 4, [[0.25, '#428bca'], [0.5, '#b44242'], [0.75, '#b44242'], [1, '#428bca']], '°');
windDirOption.series[0].startAngle = 90;
windDirOption.series[0].endAngle = -270;
windDirOption.series[0].axisLabel.distance = 10;
windDirOption.series[0].axisLabel.fontSize = 12;
windDirOption.series[0].axisLabel.fontWeight = 'bold';
windDirOption.series[0].axisLabel.formatter = 
                function (value) {
                    if (value === 360)
                        return 'N';
                    if (value === 90)
                        return 'O';
                    if (value === 180)
                        return 'S';
                    if (value === 270)
                        return 'W';
                };
windDirOption.series[0].title.offsetCenter = ['0', '-25%'];
windDirOption.series[0].detail.offsetCenter = ['0', '30%'];
windDirGauge.setOption(windDirOption);

let outHumidityGauge = echarts.init(document.getElementById('outHumidityGauge'));
outHumidityGauge.setOption(getGaugeOption('Luffeuchte', 0, 100, 5, [[1, '#428bca']], '%', 0));

let windSpeedGauge = echarts.init(document.getElementById('windSpeedGauge'));
windSpeedGauge.setOption(getGaugeOption('Wind', 0, 100, 5, [[0.75, '#428bca'], [1, '#b44242']], 'km/h', 0));

let windGustGauge = echarts.init(document.getElementById('windGustGauge'));
windGustGauge.setOption(getGaugeOption('Böen', 0, 160, 8, [[0.47, '#428bca'], [1, '#b44242']], 'km/h', 0));

function getGaugeOption(name, min, max, splitNumber, lineColor, unit, decimals) {
    return {
        series: [{
                name: name,
                type: 'gauge',
                min: min,
                max: max,
                splitNumber: splitNumber,
                radius: '95%',
                axisLine: {
                    lineStyle: {
                        width: 8,
                        color: lineColor,
                        shadowBlur: 3
                    }
                },
                pointer: {
                    width: 5,
                    itemStyle: {
                        color: '#428bca',
                        shadowBlur: 3
                    }
                },
                axisTick: {
                    length: 4,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                splitLine: {
                    length: 6,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                axisLabel: {
                    fontWeight: 'normal',
                    fontSize: 8,
                    color: '#777'
                },
                title: {
                    fontWeight: 'normal',
                    fontSize: 10,
                    color: '#777',
                    offsetCenter: ['0', '28%']
                },
                detail: {
                    fontWeight: 'bold',
                    fontSize: 12,
                    color: '#777',
                    formatter: function (value) {
                        if(decimals !== undefined && decimals >= 0) {
                          return value.toFixed(decimals) + unit;
                        } else {
                          return value + unit;
                        }
                    },
                    offsetCenter: ['0', '70%']
                },
                data: [{
                        value: 0,
                        name: name
                    }
                ]
            }
        ]
    };
}