var data = [];

var text = '[{"SessionDate": "11/05/15", "SessionData": [{"time": 9.94, "emotion": "HAPPINESS"},{"time": 11.22,"emotion": "HAPPINESS"},{"time": 13.76,"emotion": "SADNESS"},{"time": 18.1,"emotion": "HAPPINESS"}]},{"SessionDate": "12/05/15","SessionData": [{"time": 2.12,"emotion": "SURPRISE"},{"time": 4.66,"emotion": "HAPPINESS"},{"time": 10.06,"emotion": "ANGER"},{"time": 18.76,"emotion": "HAPPINESS"}]},{"SessionDate": "13/05/15", "SessionData": [{"time": 14.33, "emotion": "SADNESS"}]},{"SessionDate": "14/05/15", "SessionData": [{"time": 1.98, "emotion": "HAPPINESS"},{"time": 5.03, "emotion": "SADNESS"},{"time": 12.12, "emotion": "HAPPINESS"},{"time": 14.17, "emotion": "SURPRISE"},{"time": 16.83, "emotion": "ANGER"}]},{"SessionDate": "15/05/15", "SessionData": [{"time": 6.22, "emotion": "SADNESS"},{"time": 7.13, "emotion": "ANGER"}]},{"SessionDate": "16/05/15", "SessionData": [{"time": 5.08, "emotion": "HAPPINESS"},{"time": 7.11, "emotion": "SURPRISE"},{"time": 9.9, "emotion": "SADNESS"},{"time": 13.27, "emotion": "SADNESS"},{"time": 16.93, "emotion": "ANGER"},{"time": 19.93, "emotion": "ANGER"}]},{"SessionDate": "17/05/15", "SessionData": [{"time": 6.28, "emotion": "SADNESS"},{"time": 16.08, "emotion": "HAPPINESS"}]},{"SessionDate": "18/05/15", "SessionData": [{"time": 9.12, "emotion": "SADNESS"}]},{"SessionDate": "19/05/15", "SessionData": [{"time": 12.12, "emotion": "HAPPINESS"},{"time": 16.28, "emotion": "SURPRISE"},{"time": 19.2, "emotion": "SURPRISE"}]},{"SessionDate": "20/05/15", "SessionData": [{"time": 5.66, "emotion": "HAPPINESS"},{"time": 10.38, "emotion": "HAPPINESS"},{"time": 12.9, "emotion": "SURPRISE"},{"time": 15.03, "emotion": "HAPPINESS"}]}]'

var obj = JSON.parse(text);

var data = []

for (var i=0;i<obj.length;i++){
    for (var j=0;j<obj[i].SessionData.length;j++){
        var time = obj[i].SessionData[j].time;
        var time_slot = ""
        var temp=parseInt(time);

        if(temp >= 0 && temp <= 2){
            time = "00.00-02.00";
        }else if(temp>2 && temp<=4){
            time = "02.00-04.00";
        }else if(temp>4 && temp<=6){
            time = "04.00-06.00";    
        }else if(temp>6 && temp<=8){
            time = "06.00-08.00";    
        }else if(temp>8 && temp<=10){
            time = "08.00-10.00";
        }else if(temp>12 && temp<=14){
            time = "12.00-14.00";
        }else if(temp>14 && temp<=16){
            time = "14.00-16.00";
        }else if(temp>16 && temp<=18){
            time = "16.00-18.00";
        }else if(temp>18 && temp<=20){
            time = "18.00-20.00";
        }else if(temp>20 && temp<=22){
            time = "20.00-22.00";
        }else{
            time = "22.00-24.00";
        }
        var emotion = obj[i].SessionData[j].emotion;
        data.push([time+" (secs)",emotion])
        
    }
}







var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");

if (window.devicePixelRatio > 1) {
    canvas.setAttribute('width', 800 * window.devicePixelRatio);
    canvas.setAttribute('height', 800 * window.devicePixelRatio);
    
}

ctx.beginPath();
ctx.arc(canvas.width/2, canvas.height/2, canvas.width * 0.3, 0, 2*Math.PI, false);
ctx.stroke();

ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.save();


var names = data.map(function(t) { return t[0] }).concat(data.map(function(t) { return t[1] })).filter(function(value, index, self) { return self.indexOf(value) === index; }).sort();

for (var i = 0; i < names.length; i++) {
	ctx.save();
	ctx.rotate(i / names.length *2* Math.PI);
	if (names[i]=="HAPPINESS"){
		ctx.fillStyle="#42A23B";
	}else if (names[i]=="SURPRISE"){
		ctx.fillStyle="#5E007A";
	}else if (names[i]=="SADNESS"){
		ctx.fillStyle="#000A91";
	}else if (names[i]=="ANGER"){
		ctx.fillStyle="#ff0000";
	}else{
		ctx.fillStyle="#000000";
	}
	ctx.font="20px Georgia";
	ctx.fillText(names[i], -canvas.width * 0.3 - ctx.measureText(names[i]).width-5, 0);
	ctx.beginPath();
	ctx.arc(-canvas.width * 0.3, 0, canvas.width * 0.003, 0, 2*Math.PI, false);
	ctx.fillStyle="#000000";
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}



for (var i = 0; i < data.length; i++) {
		ctx.beginPath();
	ctx.lineWidth=2;
	ctx.strokeStyle = "rgba(0, 0, 0, " + Math.max(0.5, 20 / data.length) + ")";	
	if (data[i][1]=="HAPPINESS"){
		ctx.strokeStyle = "rgba(66, 162, 60, " + Math.max(1.8, 10 / data.length) + ")";
	}else if (data[i][1]=="SURPRISE"){
		ctx.strokeStyle = "rgba(94, 0, 122, " + Math.max(0.5, 20 / data.length) + ")";
	}else if (data[i][1]=="SADNESS"){
		ctx.strokeStyle = "rgba(0, 10, 155, " + Math.max(0.5, 20 / data.length) + ")";
	}else if (data[i][1]=="ANGER"){
		ctx.strokeStyle = "rgba(255, 0, 0, " + Math.max(0.5, 20 / data.length) + ")";
	}
    var a = names.indexOf(data[i][0]);
    var b = names.indexOf(data[i][1]);
    
			var angle1 = a / names.length * Math.PI * 2;
			var angle2 = b / names.length * Math.PI * 2;
		
			var startRadius = -canvas.width * 0.3;
			if (i == 0) startRadius -= 40;
			var endRadius = -canvas.width * 0.3;
			if (i == names.length - 2) endRadius -= 40;
		
			ctx.save();
			ctx.rotate(angle1);
			ctx.beginPath();
			ctx.moveTo(startRadius, 0);
	
			ctx.restore();
			ctx.save();
			ctx.rotate(angle2);
			ctx.quadraticCurveTo(0, 0, endRadius, 0);
			ctx.stroke();
			ctx.restore();
}