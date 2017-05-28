var number_of_players =[];



$(function () {

var session_data = [];
 $.ajaxSetup({
        async: false
    });
$.getJSON('SessionOutput.json', function(punchcard_data) {
	  sum_array=[{up:0,down:0,right:0,left:0},
				  {up:0,down:0,right:0,left:0},
				  {up:0,down:0,right:0,left:0},
				  {up:0,down:0,right:0,left:0},
				  {up:0,down:0,right:0,left:0},
				  {up:0,down:0,right:0,left:0},
				  {up:0,down:0,right:0,left:0},
				  {up:0,down:0,right:0,left:0},
				  {up:0,down:0,right:0,left:0},
				  {up:0,down:0,right:0,left:0}];
		var mySeries = [{
			
            name: 'UP',
            data: [],
            stack: 'pitch'
        }, {
            name: 'DOWN',
            data: [],
            stack: 'pitch'
        }, {
            name: 'LEFT',
            data: [],
            stack: 'yaw'
        }, {
            name: 'RIGHT',
            data: [],
            stack: 'yaw'
        }];
	  $.each(punchcard_data, function(playerIndex, player) {
		number_of_players.push(playerIndex+1);
		
        $.each(player.SessionData, function(sessionIndex, val) {
			if (val.time > 0 && val.time <= 2) { 
	 
				if (val.direction === "UP") {
				 sum_array[0].up++;
			   } else if (val.direction === "DOWN") {
				 sum_array[0].down++;
			   } else if (val.direction === "LEFT") {
				 sum_array[0].left++;
			   }
				else if (val.direction === "RIGHT") {
				sum_array[0].right++;
				}
			}
			if (val.time > 2 && val.time <= 4) { 
	 
				if (val.direction === "UP") {
				 sum_array[1].up++;
			   } else if (val.direction === "DOWN") {
				 sum_array[1].down++;
			   } else if (val.direction === "LEFT") {
				 sum_array[1].left++;
			   }
				else if (val.direction === "RIGHT") {
				sum_array[1].right++;
				}

			}
			
			if (val.time > 4 && val.time <= 6) { 
	 
				if (val.direction === "UP") {
				 sum_array[2].up++;
			   } else if (val.direction === "DOWN") {
				 sum_array[2].down++;
			   } else if (val.direction === "LEFT") {
				 sum_array[2].left++;
			   }
				else if (val.direction === "RIGHT") {
				sum_array[2].right++;
				}

			}
			
			if (val.time > 6 && val.time <= 8) { 
	 
				if (val.direction === "UP") {
				 sum_array[3].up++;
			   } else if (val.direction === "DOWN") {
				 sum_array[3].down++;
			   } else if (val.direction === "LEFT") {
				 sum_array[3].left++;
			   }
				else if (val.direction === "RIGHT") {
				sum_array[3].right++;
				}

			}
			
			if (val.time > 8 && val.time <= 10) { 
	 
				if (val.direction === "UP") {
				 sum_array[4].up++;
			   } else if (val.direction === "DOWN") {
				 sum_array[4].down++;
			   } else if (val.direction === "LEFT") {
				 sum_array[4].left++;
			   }
				else if (val.direction === "RIGHT") {
				sum_array[4].right++;
				}

			}
			if (val.time > 10 && val.time <= 12) { 
	 
				if (val.direction === "UP") {
				 sum_array[5].up++;
			   } else if (val.direction === "DOWN") {
				 sum_array[5].down++;
			   } else if (val.direction === "LEFT") {
				 sum_array[5].left++;
			   }
				else if (val.direction === "RIGHT") {
				sum_array[5].right++;
				}

			}
			
			if (val.time > 12 && val.time <= 14) { 
	 
				if (val.direction === "UP") {
				 sum_array[6].up++;
			   } else if (val.direction === "DOWN") {
				 sum_array[6].down++;
			   } else if (val.direction === "LEFT") {
				 sum_array[6].left++;
			   }
				else if (val.direction === "RIGHT") {
				sum_array[6].right++;
				}

			}
			if (val.time > 14 && val.time <= 16) { 
	 
				if (val.direction === "UP") {
				 sum_array[7].up++;
			   } else if (val.direction === "DOWN") {
				 sum_array[7].down++;
			   } else if (val.direction === "LEFT") {
				 sum_array[7].left++;
			   }
				else if (val.direction === "RIGHT") {
				sum_array[7].right++;
				}

			}
			if (val.time > 16 && val.time <= 18) { 
	 
				if (val.direction === "UP") {
				 sum_array[8].up++;
			   } else if (val.direction === "DOWN") {
				 sum_array[8].down++;
			   } else if (val.direction === "LEFT") {
				 sum_array[8].left++;
			   }
				else if (val.direction === "RIGHT") {
				sum_array[8].right++;
				}

			}
			if (val.time > 18 && val.time <= 20) { 
	 
				if (val.direction === "UP") {
				 sum_array[9].up++;
			   } else if (val.direction === "DOWN") {
				 sum_array[9].down++;
			   } else if (val.direction === "LEFT") {
				 sum_array[9].left++;
			   }
				else if (val.direction === "RIGHT") {
				sum_array[9].right++;
				}

			}
			
			
			});

	  });
	
	$.each(sum_array, function(index, val) {
		mySeries[0].data.push(val.up)
		mySeries[1].data.push(val.down)
		mySeries[2].data.push(val.left)
		mySeries[3].data.push(val.right)
	});

	


    // draw chart
    $('#container').highcharts({

        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 25,
                beta: 15,
                viewDistance: 50,
                depth: 40
            },
            marginTop: 80,
            marginRight: 40
        },
        
        credits: {
            enabled: false},

        title: {
            text: "Total players' movement, grouped by direction"	
        },

        xAxis: {
		    //tickAmount: 10,
			//tickInterval: 2
            categories: ['0-2 sec', '2-4 sec', '4-6 sec', '6-8 sec', '8-10 sec', '10-12 sec', '12-14 sec', '14-16 sec', '16-18 sec', '18-20 sec']
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of Movements'
            }
        },

        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40,
				pointPadding: 0.2
            }
        },

        series: mySeries
    });

   });



});
