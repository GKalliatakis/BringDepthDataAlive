var text = '[{"SessionDate":"08/May/15","SessionData":[{"time":0.45,"direction":"UP","intensity":6.21441},{"time":6.67,"direction":"UP","intensity":9.38992},{"time":9.99,"direction":"RIGHT","intensity":6.64818},{"time":14.27,"direction":"RIGHT","intensity":5.72149},{"time":14.84,"direction":"LEFT","intensity":5.78074},{"time":17.98,"direction":"LEFT","intensity":5.23937}]},{"SessionDate":"08/May/15","SessionData":[{"time":3.94,"direction":"LEFT","intensity":6.74131},{"time":7.79,"direction":"UP","intensity":8.06202},{"time":14.93,"direction":"RIGHT","intensity":7.99714},{"time":15.88,"direction":"LEFT","intensity":5.9314},{"time":18.56,"direction":"RIGHT","intensity":14.4218}]},{"SessionDate":"08/May/15","SessionData":[{"time":9.69,"direction":"LEFT","intensity":5.97083},{"time":14.46,"direction":"RIGHT","intensity":5.66509},{"time":14.64,"direction":"RIGHT","intensity":6.26326}]},{"SessionDate":"08/May/15","SessionData":[{"time":7.88,"direction":"DOWN","intensity":5.27548},{"time":11.02,"direction":"RIGHT","intensity":11.4221},{"time":14.64,"direction":"RIGHT","intensity":6.42895}]},{"SessionDate":"08/May/15","SessionData":[{"time":0.47,"direction":"UP","intensity":6.53054},{"time":3.35,"direction":"LEFT","intensity":6.55545},{"time":5.46,"direction":"RIGHT","intensity":8.7874},{"time":8.65,"direction":"UP","intensity":5.00297},{"time":9.22,"direction":"DOWN","intensity":6.41506},{"time":12.54,"direction":"RIGHT","intensity":8.82215},{"time":15.33,"direction":"RIGHT","intensity":5.79061}]},{"SessionDate":"19/May/15","SessionData":[{"time":0.88,"direction":"DOWN","intensity":6.51841},{"time":5.77,"direction":"DOWN","intensity":9.76992},{"time":14.27,"direction":"RIGHT","intensity":5.72149},{"time":16.08,"direction":"RIGHT","intensity":5.77937}]},{"SessionDate":"19/May/15","SessionData":[{"time":3.34,"direction":"UP","intensity":6.89431},{"time":6.29,"direction":"LEFT","intensity":8.26002},{"time":8.91,"direction":"RIGHT","intensity":7.77465},{"time":12.08,"direction":"DOWN","intensity":5.6139},{"time":15.65,"direction":"DOWN","intensity":14.8211},{"time":18.05,"direction":"RIGHT","intensity":11.6789}]},{"SessionDate":"19/May/15","SessionData":[{"time":6.69,"direction":"LEFT","intensity":5.8874},{"time":10.86,"direction":"LEFT","intensity":5.9656},{"time":12.03,"direction":"UP","intensity":6.8905},{"time":15.64,"direction":"RIGHT","intensity":6.45326},{"time":18.96,"direction":"RIGHT","intensity":12.45654}]},{"SessionDate":"19/May/15","SessionData":[{"time":3.98,"direction":"DOWN","intensity":9.43248},{"time":11.52,"direction":"UP","intensity":11.2321},{"time":13.02,"direction":"RIGHT","intensity":11.4221},{"time":16.64,"direction":"RIGHT","intensity":8.769},{"time":19.84,"direction":"LEFT","intensity":6.4321}]},{"SessionDate":"19/May/15","SessionData":[{"time":3.47,"direction":"UP","intensity":6.53054},{"time":10.35,"direction":"DOWN","intensity":7.4568},{"time":12.06,"direction":"LEFT","intensity":8.0094},{"time":14.56,"direction":"RIGHT","intensity":6.00297},{"time":16.11,"direction":"DOWN","intensity":6.51403},{"time":18.14,"direction":"UP","intensity":12.82215}]}]';

var obj = JSON.parse(text);

var data = []

var counts = [10][4];

function zeros(rows, cols) {
  var array = [];
  var row = [];
  while (cols--) row.push(0);
  while (rows--) array.push(row.slice());
  return array;
}

var counts = zeros(10, 4);

for (var i=0;i<obj.length;i++){
    for (var j=0;j<obj[i].SessionData.length;j++){
        var direction = obj[i].SessionData[j].direction;
        var time = obj[i].SessionData[j].time;
        var time_slot = ""
        var temp=parseFloat(time);

        var x = 0;
        if (direction=="UP"){
            x=parseInt(0);
        }else if (direction=="RIGHT"){
            x=parseInt(1);
        }else if (direction=="DOWN"){
            x=parseInt(2);
        }else{
            x=parseInt(3);
        }

        if(temp >= 0 && temp <= 2){
            time = "00.00-02.00";
            counts[0][x]++;
        }else if(temp>2 && temp<=4){
            time = "02.00-04.00";
            counts[1][x] ++;
        }else if(temp>4 && temp<=6){
            time = "04.00-06.00";
            counts[2][x] ++;    
        }else if(temp>6 && temp<=8){
            time = "06.00-08.00";
            counts[3][x] ++;    
        }else if(temp>8 && temp<=10){
            time = "08.00-10.00";
            counts[4][x] ++;
        }else if(temp>10 && temp<=12){
            time = "10.00-12.00";
            counts[5][x] ++;
        }else if(temp>12 && temp<=14){
            time = "12.00-14.00";
            counts[6][x] ++;
        }else if(temp>14 && temp<=16){
            time = "14.00-16.00";
            counts[7][x] ++;
        }else if(temp>16 && temp<=18){
            time = "16.00-18.00";
            counts[8][x] ++;
        }else{
            time = "18.00-20.00";
            counts[9][x] ++;
        
        data.push([time+" (s)",direction])
        
    }
}
}

var totalc =0;
for (var i=0;i<counts.length;i++){
    totalc = totalc+counts[0].reduce((a, b) => a + b, 0);
}

for (var i=0;i<counts.length;i++){
    for (var j=0;j<counts[i].length;j++){
        counts[i][j] = parseFloat(((counts[i][j]/totalc)*100).toFixed(2));
    }
}
var colors = ['#CD0D0D','#CD400D','#CD860D','#CDC60D','#A0CD0D','#0DCD0D','#0DCD9A','#0DB3CD','#0D13CD','#6D0DCD'],
    categories = ['0-2'+ '<br>'+'(secs)', '2-4'+ '<br>'+'(secs)', '4-6'+ '<br>'+'(secs)', '6-8'+ '<br>'+'(secs)','8-10'+ '<br>'+'(secs)','10-12'+ '<br>'+'(secs)','12-14'+ '<br>'+'(secs)','14-16'+ '<br>'+'(secs)','16-18'+ '<br>'+'(secs)','18-20'+ '<br>'+'(secs)'],
    name = 'Head pose direction',
    data = [{
            y: (counts[0].reduce((a, b) => a + b, 0)),
            color: "rgba(41,128,185,1)",
            drilldown: {
                name: '0-2 intreval',
                categories: ['UP', 'RIGHT', 'DOWN', 'LEFT'],
                data: counts[0],
                color: colors[0]
            }
        }, {
            y: (counts[1].reduce((a, b) => a + b, 0)),
            color: "rgba(243,156,18,1)",
            drilldown: {
                name: '2-4 intreval',
                categories: ['UP', 'RIGHT', 'DOWN', 'LEFT'],
                data: counts[1],
                color: colors[1]
            }
        }, {
            y: (counts[2].reduce((a, b) => a + b, 0)),
            color: "rgba(192,57,43,1)",
            drilldown: {
                name: '4-6 intreval',
                categories: ['UP', 'RIGHT', 'DOWN', 'LEFT'],
                data: counts[2],
                color: colors[2]
            }
        }, {
            y: (counts[3].reduce((a, b) => a + b, 0)),
            color: "rgba(39,174,96,1)",
            drilldown: {
                name: '6-8 intreval',
                categories: ['UP', 'RIGHT', 'DOWN', 'LEFT'],
                data: counts[3],
                color: colors[3]
            }
        }, {
            y: (counts[4].reduce((a, b) => a + b, 0)),
            color: "rgba(39,174,96,1)",
            drilldown: {
                name: '8-10 intreval',
                categories: ['UP', 'RIGHT', 'DOWN', 'LEFT'],
                data: counts[4],
                color: colors[4]
            }
        }, {
            y: (counts[5].reduce((a, b) => a + b, 0)),
            color: "rgba(39,174,96,1)",
            drilldown: {
                name: '10-12 intreval',
                categories: ['UP', 'RIGHT', 'DOWN', 'LEFT'],
                data: counts[5],
                color: colors[5]
            }
        }, {
            y: (counts[6].reduce((a, b) => a + b, 0)),
            color: "rgba(39,174,96,1)",
            drilldown: {
                name: '12-14 intreval',
                categories: ['UP', 'RIGHT', 'DOWN', 'LEFT'],
                data: counts[6],
                color: colors[6]
            }
        }, {
            y: (counts[7].reduce((a, b) => a + b, 0)),
            color: "rgba(39,174,96,1)",
            drilldown: {
                name: '14-16 intreval',
                categories: ['UP', 'RIGHT', 'DOWN', 'LEFT'],
                data: counts[7],
                color: colors[3]
            }
        }, {
            y: (counts[8].reduce((a, b) => a + b, 0)),
            color: "rgba(39,174,96,1)",
            drilldown: {
                name: '16-18 intreval',
                categories: ['UP', 'RIGHT', 'DOWN', 'LEFT'],
                data: counts[8],
                color: colors[3]
            }
        }, {
            y: (counts[9].reduce((a, b) => a + b, 0)),
            color: "rgba(39,174,96,1)",
            drilldown: {
                name: '18-20 intreval',
                categories: ['UP', 'RIGHT', 'DOWN', 'LEFT'],
                data: counts[9],
                color: colors[3]
            }
        }];


// Build the data arrays
var browserData = [];
var versionsData = [];
for (var i = 0; i < data.length; i++) {

    // add browser data
    browserData.push({
        name: categories[i],
        y: data[i].y,
        color: colors[i]
    });

    // add version data
    for (var j = 0; j < data[i].drilldown.data.length; j++) {
        var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
        versionsData.push({
            name: data[i].drilldown.categories[j],
            y: data[i].drilldown.data[j],
            color: colors[i]
        });
    }
}



// Create the chart
$('#chart').highcharts({
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Head pose estimations by time of the experiment'
    },
    yAxis: {
        title: {
            text: 'Time precentage'
        }
    },
    plotOptions: {
        pie: {
            shadow: true,
            center: ['50%', '50%']
        }
    },
    tooltip: {
      valueSuffix: '%'
    },
    series: [{
        name: 'Head pose',
        data: browserData,
        size: '100%',
        dataLabels: {
            formatter: function() {
                return this.y > 2 ? this.point.name : null;
            },
            color: 'white',
            distance: -60
        }
    }, {
        name: 'Time per pose',
        data: versionsData,
        size: '100%',
        innerSize: '80%',
        dataLabels: {
            formatter: function() {
                // display only if larger than 1
                return this.y > 1 ? '<b>'+ this.point.name +':</b> '+ this.y +'%'  : null;
            }
        }
    }]
});