var text = '[{"SessionDate":"08/May/15","SessionData":[{"time":0.45,"direction":"UP","intensity":6.21441},{"time":6.67,"direction":"UP","intensity":9.38992},{"time":9.99,"direction":"RIGHT","intensity":6.64818},{"time":14.27,"direction":"RIGHT","intensity":5.72149},{"time":14.84,"direction":"LEFT","intensity":5.78074},{"time":17.98,"direction":"LEFT","intensity":5.23937}]},{"SessionDate":"08/May/15","SessionData":[{"time":3.94,"direction":"LEFT","intensity":6.74131},{"time":7.79,"direction":"UP","intensity":8.06202},{"time":14.93,"direction":"RIGHT","intensity":7.99714},{"time":15.88,"direction":"LEFT","intensity":5.9314},{"time":18.56,"direction":"RIGHT","intensity":14.4218}]},{"SessionDate":"08/May/15","SessionData":[{"time":9.69,"direction":"LEFT","intensity":5.97083},{"time":14.46,"direction":"RIGHT","intensity":5.66509},{"time":14.64,"direction":"RIGHT","intensity":6.26326}]},{"SessionDate":"08/May/15","SessionData":[{"time":7.88,"direction":"DOWN","intensity":5.27548},{"time":11.02,"direction":"RIGHT","intensity":11.4221},{"time":14.64,"direction":"RIGHT","intensity":6.42895}]},{"SessionDate":"08/May/15","SessionData":[{"time":0.47,"direction":"UP","intensity":6.53054},{"time":3.35,"direction":"LEFT","intensity":6.55545},{"time":5.46,"direction":"RIGHT","intensity":8.7874},{"time":8.65,"direction":"UP","intensity":5.00297},{"time":9.22,"direction":"DOWN","intensity":6.41506},{"time":12.54,"direction":"RIGHT","intensity":8.82215},{"time":15.33,"direction":"RIGHT","intensity":5.79061}]},{"SessionDate":"19/May/15","SessionData":[{"time":0.88,"direction":"DOWN","intensity":6.51841},{"time":5.77,"direction":"DOWN","intensity":9.76992},{"time":14.27,"direction":"RIGHT","intensity":5.72149},{"time":16.08,"direction":"RIGHT","intensity":5.77937}]},{"SessionDate":"19/May/15","SessionData":[{"time":3.34,"direction":"UP","intensity":6.89431},{"time":6.29,"direction":"LEFT","intensity":8.26002},{"time":8.91,"direction":"RIGHT","intensity":7.77465},{"time":12.08,"direction":"DOWN","intensity":5.6139},{"time":15.65,"direction":"DOWN","intensity":14.8211},{"time":18.05,"direction":"RIGHT","intensity":11.6789}]},{"SessionDate":"19/May/15","SessionData":[{"time":6.69,"direction":"LEFT","intensity":5.8874},{"time":10.86,"direction":"LEFT","intensity":5.9656},{"time":12.03,"direction":"UP","intensity":6.8905},{"time":15.64,"direction":"RIGHT","intensity":6.45326},{"time":18.96,"direction":"RIGHT","intensity":12.45654}]},{"SessionDate":"19/May/15","SessionData":[{"time":3.98,"direction":"DOWN","intensity":9.43248},{"time":11.52,"direction":"UP","intensity":11.2321},{"time":13.02,"direction":"RIGHT","intensity":11.4221},{"time":16.64,"direction":"RIGHT","intensity":8.769},{"time":19.84,"direction":"LEFT","intensity":6.4321}]},{"SessionDate":"19/May/15","SessionData":[{"time":3.47,"direction":"UP","intensity":6.53054},{"time":10.35,"direction":"DOWN","intensity":7.4568},{"time":12.06,"direction":"LEFT","intensity":8.0094},{"time":14.56,"direction":"RIGHT","intensity":6.00297},{"time":16.11,"direction":"DOWN","intensity":6.51403},{"time":18.14,"direction":"UP","intensity":12.82215}]}]';

var obj = JSON.parse(text);

var data = []

var counts = [4][11];

function zeros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
}

var carg_intensity = zeros([4, 10]);

for (var i=0;i<obj.length;i++){
    for (var j=0;j<obj[i].SessionData.length;j++){
        var direction = obj[i].SessionData[j].direction;
        var intensity = obj[i].SessionData[j].intensity;
        var time = obj[i].SessionData[j].time;
        var time_slot = ""
        var temp=parseFloat(time);


        var x = 0;
        if (direction=="UP"){
            x=0;
        }else if (direction=="RIGHT"){
            x=1;
        }else if (direction=="DOWN"){
            x=2;
        }else{
            x=3
        }

        if(temp >= 0 && temp <= 2){
            time = "00.00-02.00";
            if (carg_intensity[x][0]==0){
                carg_intensity[x][0]=carg_intensity[x][0]+parseFloat(intensity);
            }else{
                carg_intensity[x][0]=(carg_intensity[x][0]+parseFloat(intensity))/2;
            }
        }else if(temp>2 && temp<=4){
            time = "02.00-04.00";
            if (carg_intensity[x][1]==0){
                carg_intensity[x][1]=carg_intensity[x][1]+parseFloat(intensity);
            }else{
                carg_intensity[x][1]=(carg_intensity[x][1]+parseFloat(intensity))/2;
            }
        }else if(temp>4 && temp<=6){
            time = "04.00-06.00";
            if (carg_intensity[x][2]==0){
                carg_intensity[x][2]=carg_intensity[x][2]+parseFloat(intensity);
            }else{
                carg_intensity[x][2]=(carg_intensity[x][2]+parseFloat(intensity))/2;
            }  
        }else if(temp>6 && temp<=8){
            time = "06.00-08.00";
            if (carg_intensity[x][3]==0){
                carg_intensity[x][3]=carg_intensity[x][3]+parseFloat(intensity);
            }else{
                carg_intensity[x][3]=(carg_intensity[x][3]+parseFloat(intensity))/2;
            }    
        }else if(temp>8 && temp<=10){
            time = "08.00-10.00";
            if (carg_intensity[x][4]==0){
                carg_intensity[x][4]=carg_intensity[x][4]+parseFloat(intensity);
            }else{
                carg_intensity[x][4]=(carg_intensity[x][4]+parseFloat(intensity))/2;
            }
        }else if(temp>10 && temp<=12){
            time = "10.00-12.00";
            if (carg_intensity[x][5]==0){
                carg_intensity[x][5]=carg_intensity[x][5]+parseFloat(intensity);
            }else{
                carg_intensity[x][5]=(carg_intensity[x][5]+parseFloat(intensity))/2;
            }
        }else if(temp>12 && temp<=14){
            time = "12.00-14.00";
            if (carg_intensity[x][6]==0){
                carg_intensity[x][6]=carg_intensity[x][6]+parseFloat(intensity);
            }else{
                carg_intensity[x][6]=(carg_intensity[x][6]+parseFloat(intensity))/2;
            }
        }else if(temp>14 && temp<=16){
            time = "14.00-16.00";
            if (carg_intensity[x][7]==0){
                carg_intensity[x][7]=carg_intensity[x][7]+parseFloat(intensity);
            }else{
                carg_intensity[x][7]=(carg_intensity[x][7]+parseFloat(intensity))/2;
            }
        }else if(temp>16 && temp<=18){
            time = "16.00-18.00";
            if (carg_intensity[x][8]==0){
                carg_intensity[x][8]=carg_intensity[x][8]+parseFloat(intensity);
            }else{
                carg_intensity[x][8]=(carg_intensity[x][8]+parseFloat(intensity))/2;
            }
        }else{
            time = "18.00-20.00";
            if (carg_intensity[x][9]==0){
                carg_intensity[x][9]=carg_intensity[x][9]+parseFloat(intensity);
            }else{
                carg_intensity[x][9]=(carg_intensity[x][9]+parseFloat(intensity))/2;
            }
        data.push([time+" (sec.)",direction])
        
    }
}
}

console.log(carg_intensity[0]);



//Based on a pen by @tedgoas
var ctx = document.getElementById("myChart").getContext("2d");
var data = {
    labels: ["0-2 (secs)", "2-4 (secs)", "4-6 (secs)", "6-8 (secs)", "8-10 (secs)", "10-12 (secs)", "12-14 (secs)", "14-16 (secs)", "16-18 (secs)","18-20 (secs)"],
    datasets: [
        {
            label: "UP",
            fillColor: "rgba(41,128,185,0.3)",
            strokeColor: "rgba(41,128,185,1)",
            pointColor: "rgba(41,128,185,1)",
            pointHighlightStroke: "rgba(41,128,185,1)",
            data: carg_intensity[0]
        },
        {
            label: "RIGHT",
            fillColor: "rgba(243,156,18,0.3)",
            strokeColor: "rgba(243,156,18,1)",
            pointColor: "rgba(243,156,18,1)",
            pointHighlightStroke: "rgba(243,156,18,1)",
            data: carg_intensity[1]
        },
      {
            label: "DOWN",
            fillColor: "rgba(192,57,43,0.3)",
            strokeColor: "rgba(192,57,43,1)",
            pointColor: "rgba(192,57,43,1)",
            pointHighlightStroke: "rgba(192,57,43,1)",
            data: carg_intensity[2]
        },
      {
            label: "LEFT",
            fillColor: "rgba(39,174,96,0.3)",
            strokeColor: "rgba(39,174,96,1)",
            pointColor: "rgba(39,174,96,1)",
            pointHighlightStroke: "rgba(39,174,96,1)",
            data: carg_intensity[3]
        }
    ]
};
new Chart(ctx).Radar(data, {
    animationSteps: 30,
    animationEasing: "easeInOutExpo",
    responsive: true,
    showTooltips: true,
    scaleOverride: true,
    scaleSteps: 8,
    scaleStepWidth: 2,
    scaleStartValue: 0,
    scaleLineColor: "rgba(0,0,0,0.3)",
    
    angleShowLineOut: true,
    angleLineWidth : 1,
    angleLineColor : "rgba(0,0,0,0.3)",
    pointLabelFontFamily : "'freight-sans-pro', Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
    pointLabelFontSize : 14,
    pointLabelFontColor : "#000",
    pointDot : false,
    datasetStrokeWidth : 1
});