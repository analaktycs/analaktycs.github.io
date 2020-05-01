


draw_generation(1)


function draw_generation(number){
	var chart = d3.parsets()
      .dimensions(["abilities", "types", "Body_Stylee", "Color"]);

var vis = d3.select("#vis").append("svg")
    .attr("width", chart.width())
    .attr("height", chart.height());


	switch(number) {
  case 1:
    // code block

    file_name = "data/parallel_1.csv"
    break;
  case 2:
   file_name = "data/parallel_2.csv"
    // code block
    break;
  default:
    // code block

    console.log("draw")
}

d3.csv(file_name, function(error, csv) {
  vis.datum(csv).call(chart);
});

}