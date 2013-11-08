$(document).ready(function() {

	// the data
	var dataset = [
		{"name": "Andy", "score": 71},
		{"name": "Brad", "score": 59},
		{"name": "Chloe", "score": 79},
		{"name": "David", "score": 95},
		{"name": "Emma", "score": 86},
		{"name": "Felicia", "score": 42}
	];

	var datasetPerformance = [
		{"status": "fail", "value": 2},
		{"status": "pass", "value": 4}
	]



	// set up the svg for #1 (student grades)
	var w = 800;
	var h = 500;
	var padding = 30;
	var viz = d3.select("#viz");
	viz.attr("width", w).attr("height", h);



	// set up the svg for #2 (pass/fail ratio)	
	var vizPerformance = d3.select("#viz-performance");
	vizPerformance.attr("width", w).attr("height", h);
	var r = 150;
	var colors = ["#ab2e2e","#222"];
	var arc = d3.svg.arc()
		.outerRadius(r)	
	var pie = d3.layout.pie()
		.value(function(d) {
			return d.value;
		});



	// set up the scale
/*
	// basic example of scaling
	var scale = d3.scale.linear()
		.domain([0, 100])
		.range([0, 500]);

	// you can also set the scaling so it corresponds to the maximum value of the data observed
	// this doesn't make sense in our example, since the range is clearly defined from 0 to 100 (the range of test scores)
	// if we're dealing with student population growth, for example, there isn't necessarily a "ceiling"; as such, we may want to take the maximum value into consideration so the chart will be automatically adjusted
	// the scaling code may look something like this:
	var scale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) {return d.population})])
		.range([0, 500]);

*/

	var yScale = d3.scale.linear()
		.domain([0, 100])
		.range([0, (h-100)]);

	var yAxisScale = d3.scale.linear()
		.domain([0, 100])
		.range([(h-100), 0]);



	//----------------------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	// VISUALIZATION #1

	// set up the y-axis
	var yAxis = d3.svg.axis()
		.scale(yAxisScale)
		.orient("left")
		.ticks(5);

	// then draw it
	viz.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + padding + ", 50)")
		.call(yAxis);

	// draw the grid lines
	for (var j=0; j<5; j++) {
	    viz.append("line")
	    	.attr({
		    	"x1": padding,
		    	"x2": w - padding,
		    	"y1": yAxisScale((j+1)*20) + 50,
		    	"y2": yAxisScale((j+1)*20) + 50,
		    	"class": "grid"
	    	});
	};




	// draw the bars
	viz.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr({
			"width": 70,
			"height": function(d, i) {
			    return yScale(d.score);
			},
			"x": function(d, i) {
				return i * 90 + 50;
			},
			"y": function(d, i) {
			    return h - yScale(d.score) - 50;
			},
			"class": function(d, i) {
			    if (d.score < 60) {
			        return "fail";
			    }
			},
			"desc": function(d, i) {
				return d.score;
			}
	    });



	// draw the names
	viz.selectAll("text.name")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d, i) {
		    return d.name;
		})
		.attr({
			"x": function(d, i) {
			    return (i * 90) + 85;
			},
			"y": h - 30,
			"text-anchor": "middle",
			"class": "name"
		});



	// draw the base line
	viz.append("line")
		.attr({
			"x1": 25,
			"x2": 750,
			"y1": h - 50,
			"y2": h - 50
	});



	// hover event interaction
	$("#viz rect").on("mouseenter", function() {
		var self = $(this);
		// fade out slightly
		self.animate({"opacity":.8}, 100);
		// change the position of the "score-popup" div, its content (to reflect the score), then show it
		$("#score-popup")
			.css({
				"left": parseInt(self.position().left) + parseInt(self.attr("width")) - 70,
				"top": self.position().top + 5
			})
			.text(self.attr("desc"))
			.stop(true,true)
			.fadeIn(50);
	}).on("mouseleave", function() {
		var self = $(this);
		// fade the bar back in
		self.animate({"opacity":1}, 100);
		// fade out the score
		$("#score-popup").stop(true,true).fadeOut(50);
	});



	//----------------------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	// VISUALIZATION #2 

	// set up the arc for the pie chart
	var gPie = vizPerformance.selectAll(".slice")
		.data(pie(datasetPerformance))
		.enter()
		.append("g")
		.attr({
			"class": "slice",
			// shift the center of the pie chart so it's in the middle of the svg
			"transform": "translate(" + w/2 + "," + h/2 + ")",
			"title": function(d, i) {
				return d.data.status + ": " + d.data.value + " students";
			}
		});

	// draw the pie chart
	gPie.append("path")
		.attr({
			"fill": function(d, i) {
				return colors[i];
			},
			"d": arc
	});



	// hover event interaction
	$("#viz-performance path").on("mouseenter", function() {
		// get the label from the parent's "title" attribute
		var value = $(this).parent().attr("title");
		// change the text, show the tooltip, and fade out the pie section slightly
		$("#performance-popup").text(value).fadeIn(50);
		$(this).animate({"opacity":.8}, 100);
	}).on("mouseleave", function() {
		// hide the tooltip, and fade the pie section back in
		$("#performance-popup").fadeOut(50);
		$(this).animate({"opacity":1}, 100);
	}).on("mousemove", function(e) {
		var parentOffset = $(this).parent().offset();
		// move the tooltip as the mouse moves around
		$("#performance-popup").show()
        	.offset({
	        	"left": e.pageX + 10,
	        	"top": e.pageY + 10
	        });
	});

});