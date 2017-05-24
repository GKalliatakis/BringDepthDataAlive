	var w = 1800;
	var h = 850;
	var pad = 40;
	var left_pad = 110;
	var Data_url = '/SessionOutput.json';

	var tooltip = d3.select('body')
	  .append('div')
	  .attr('class', 'tooltip')
	  .style("opacity", 0);
	  
	  $( ".point" ).hover(function() {
		  
		  $(this).attr("style","fill: Navy;");});

	var svg = d3.select("#punchcard")
	  .append("svg")
	  .attr("width", w)
	  .attr("height", h);
	  
	  svg.append("text")
        .attr("x", (w / 2))             
        .attr("y", 28)
        .attr("text-anchor", "middle")  
        .style("font-size", "25px") 
        .attr("fill", "#414241")
        .style("text-decoration", "underline")  
        .text("Player Movement vs Time Graph ");

	//set x axis number of ticks
	var x_axis_ticks = 22;
	
	d3.json('SessionOutput.json', function(punchcard_data) {
	  var x = d3.scale.linear().domain([0, x_axis_ticks]).range([left_pad, w - pad]),
		y = d3.scale.linear().domain([punchcard_data.length, 0]).range([pad, h - pad * 2]);

      //set y axis number of ticks (number of players)
	  var sessions = [];
	  $.each(punchcard_data, function(playerIndex, player) {
		sessions.push("Player " + (playerIndex+1));
		console.log(playerIndex);	
	  });
	  var xAxis = d3.svg.axis().scale(x).orient("bottom")
		.ticks(x_axis_ticks * 1.5)

	  yAxis = d3.svg.axis().scale(y).orient("left")
		.ticks(punchcard_data.length)
		.tickFormat(function(d, i) {
		  return sessions[d];
		});

	  svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0, " + (h - pad) + ")")
		.call(xAxis);

	  svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + (left_pad - pad) + ", 0)")
		.call(yAxis);

	  svg.append("text")
		.attr("fill", "#414241")
		.attr("text-anchor", "end")
		.attr("x", w / 2)
		.attr("y", h - 1)
		.text("Time (sec)");
		
     //Display Loading until the data are loaded from JSON
	  svg.append("text")
		.attr("class", "loading")
		.text("Loading ...")
		.attr("x", function() {
		  return w / 2;
		})
		.attr("y", function() {
		  return h / 2 - 5;
		});

	  var session_data = [];
	  $.each(punchcard_data, function(playerIndex, player) {

		$.each(player.SessionData, function(sessionIndex, val) {
		  var rotation;
		  var color_fill;
		  var intensity;

		  switch (val.direction) {
			case "UP":
			  if (val.intensity >= 4 && val.intensity <= 5.5) {
				color_fill = "#fdae6b";
			  } else if (val.intensity > 5 && val.intensity <= 7) {
				color_fill = "#fd8d3c";
			  } else if (val.intensity > 7 && val.intensity <= 9) {
				color_fill = "#e6550d";
			  } else if (val.intensity > 9) {
				color_fill = "#d62728";
			  }
			  rotation = "";
			  break;
			case "DOWN":
			  if (Math.abs(val.intensity) >= 4 && Math.abs(val.intensity) <= 5.5) {
				color_fill = "#fdae6b";
			  } else if (Math.abs(val.intensity) > 5 && Math.abs(val.intensity) <= 7) {
				color_fill = "#fd8d3c";
			  } else if (Math.abs(val.intensity) > 7 && Math.abs(val.intensity) <= 9) {
				color_fill = "#e6550d";
			  } else if (Math.abs(val.intensity) > 9) {
				color_fill = "#d62728";
			  }
			  rotation = "rotate(-180)";
			  break;
			case "LEFT":
			  if (val.intensity >= 4 && val.intensity <= 5.5) {
				color_fill = "#fdae6b";
			  } else if (val.intensity > 5 && val.intensity <= 7) {
				color_fill = "#fd8d3c";
			  } else if (val.intensity > 7 && val.intensity <= 9) {
				color_fill = "#e6550d";
			  } else if (val.intensity > 9) {
				color_fill = "#d62728";
			  }

			  rotation = "rotate(-90)";
			  break;
			case "RIGHT":
			  if (Math.abs(val.intensity) >= 4 && Math.abs(val.intensity) <= 5.5) {
				color_fill = "#fdae6b";
			  } else if (Math.abs(val.intensity) > 5 && Math.abs(val.intensity) <= 7) {
				color_fill = "#fd8d3c";
			  } else if (Math.abs(val.intensity) > 7 && Math.abs(val.intensity) <= 9) {
				color_fill = "#e6550d";
			  } else if (Math.abs(val.intensity) > 9) {
				color_fill = "#d62728";
			  }
			  rotation = "rotate(90)";
			  break;
		  }
		  session_data.push({
			x: val.time,
			y: playerIndex,
			direction: rotation,
			color_fill: color_fill,
			intensity:Math.abs(val.intensity)
		  });
		  
		});
	  });

	  svg.selectAll(".loading").remove();
	  svg.selectAll(".point")
		.data(session_data)
		.enter()
		.append("path")
		.style('cursor','auto')
		.on("mouseover", function(d, i) {
		  d3.select(this).style("fill", "#c6dbef")
		  d3.select('.tooltip')
		  tooltip.transition()
			.duration(250)
			.style("opacity", .95);
		  tooltip.html(d.x + " sec<br/>" + d.intensity.toFixed(1) +" intensity")
			.style("left", (d3.event.pageX -38) + "px")
			.style("top", (d3.event.pageY - 48) + "px");
		})
		.on("mouseout", function(d, i) {
			d3.select(this).style("fill", d.color_fill)
		  tooltip.transition()
			.duration(500)
			.style("opacity", 0);
		})
			
		.attr("class", "point")
		.attr("transform", "translate(0,0)")
		.transition()
		.duration(1000)
		.attr("d", d3.svg.symbol().type("triangle-up"))
		.style("fill", function(d) {
		  return d.color_fill;
		})
		.attr("transform", function(d) {
		  return "translate(" + x(d.x) + "," + y(d.y) + ") " + d.direction;
		});

	});
