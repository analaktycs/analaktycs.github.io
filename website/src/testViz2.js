

var svg3 = d3.select("#bipartite2").append("svg").attr("width", 2000).attr("height", 800);
var generation = [1,2,3,4,5,6]
var generations = d3.select("#bipartite2")

						    generations
								.append("select")
								.selectAll("option")
						        .data(generation)
						        .enter()
						        .append("option")
						        .attr("value", function(d){
						        	console.log(d)
						            return d;
						        })
						        .text(function(d){
						            return "generation " + String(d);


						        })


AbilitiesvsTypes(d3)

function AbilitiesvsTypes(d3) {


	svg3.selectAll("*").remove();

svg3.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("Abilities vs Types Count #")
	.style("fill", 'black');
	
svg3.append("text").attr("x",750).attr("y",70)
	.attr("class","header").text("Abilities vs Types Fraction %")
	.style("fill", 'black');

console.log('blaaacl')

var g =[svg3.append("g").attr("transform","translate(150,100)")
		,svg3.append("g").attr("transform","translate(650,100)")];



			const file_name1 = "data/test7_most_present_abs_test7_gen.csv"


	construct_graph(file_name1,g,"Abilities","Types",d3)

}



function TypesvsBody(d3){

	svg3.selectAll("*").remove();
svg3.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("Types vs BodyShape Count #")
	.style("fill", 'black');
	
svg3.append("text").attr("x",750).attr("y",70)
	.attr("class","header").text("Types vs BodyShape Fraction %")
	.style("fill", 'black');

var g =[svg3.append("g").attr("transform","translate(150,100)")
		,svg3.append("g").attr("transform","translate(650,100)")];

			const file_name2 = "data/type_vs_shape_merged_gen.csv"

	construct_graph(file_name2,g,"Types","Body Shape",d3)

}


function ColorvsBody(d3){

	svg3.selectAll("*").remove();
svg3.append("text").attr("x",250).attr("y",70)
	.attr("class","header").text("BodyShape vs Color Count #")
	.style("fill", 'black');
	
svg3.append("text").attr("x",750).attr("y",70)
	.attr("class","header").text("BodyShape vs Color Fraction %")
	.style("fill", 'black');

var g =[svg3.append("g").attr("transform","translate(150,100)")
		,svg3.append("g").attr("transform","translate(650,100)")];

			const file_name3 = "data/bodyvscolor_gen.csv"

	construct_graph(file_name3,g,"BodyShape","Color",d3)

}





function construct_graph(file_name,g,var1,var2,d3){



				d3.csv(file_name, function(error, data) {

					function onlyUnique(value, index, self) { 
						    return self.indexOf(value) === index;
						}



				function hashCode(str) { // java String#hashCode
				    var hash = 0;
				    for (var i = 0; i < str.length; i++) {
				       hash = str.charCodeAt(i) + ((hash << 5) - hash);
				    }
				    return hash;
				} 

				function intToRGB(i){
				    var c = (i & 0x00FFFFFF)
				        .toString(16)
				        .toUpperCase();

				    return "00000".substring(0, 6 - c.length) + c;
				}

					var data_= []
					var generation = []
					var color = {}
					data.forEach(function (d) {


						let interr = new Array(0)

					for (const [key, value] of Object.entries(d)) {
						

						if (key == "value" || key == "values"){

							interr.push(parseFloat(value))

						}else {

							if (key == "target" || key == "source" || key == "generation"){
								interr.push(value)

							}

							if (key == 'generation'){
								generation.push(value)
							}

							

							if(key == "source"){
								color[value] = intToRGB(hashCode(value))
							}
						}
						
					}
					data_.push(interr)
				})
							
					console.log(data_)
					generation= generation.filter( onlyUnique );
					console.log(generation)

				function initial_graph (data_,g,var1,var2,d3){

					var bp2=[ viz.bP()
						.data(data_)
						.min(12)
						.pad(1)
						.height(600)
						.width(250)
						.barSize(35)
						.fill(d=>color[d.primary])		
					,viz.bP()
						.data(data_)
						.value(d=>d[3])
						.min(12)
						.pad(1)
						.height(600)
						.width(250)
						.barSize(35)
						.fill(d=>color[d.primary])
				];
						
				[0,1].forEach(function(i){
					g[i].call(bp2[i])
						.transition()
                 			 .duration(1000)
					
					g[i].append("text").attr("x",-50).attr("y",-8).transition().duration(1000).style("text-anchor","left").text(var1)
					.style("fill", 'black');
					g[i].append("text").attr("x", 250).attr("y",-8).transition().duration(1000).style("text-anchor","left").text(var2)
						.style("fill", 'black');
					
					g[i].append("line").attr("x1",-100).transition().duration(1000).attr("x2",0);
					g[i].append("line").attr("x1",200).transition().duration(1000).attr("x2",300);
					
					g[i].append("line").attr("y1",610).transition().duration(1000).attr("y2",610).attr("x1",-100).attr("x2",0);
					g[i].append("line").attr("y1",610).transition().duration(1000).attr("y2",610).attr("x1",200).attr("x2",300);
					
					g[i].selectAll(".mainBars")
						.on("mouseover",mouseover)
						.on("mouseout",mouseout)
						.transition().duration(3000);

					g[i].selectAll(".mainBars").append("text").attr("class","label")
						.attr("x",d=>(d.part=="primary"? -30: 30))
						.attr("y",d=>+6)
						.text(d=>d.key)
						.transition()
                 			 .duration(1000)
						.style("fill", 'black')
						.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
					
					g[i].selectAll(".mainBars").append("text").attr("class","perc")
						.attr("x",d=>(d.part=="primary"? -100: 100))
						.style("fill", 'black')
						.attr("y",d=>+6)
						
						.text(function(d){ 

							if (i == 0) {
								return "  " + d3.format(".1f")(d.value)


							}else {
								return "  "+d3.format("0.0%")(d.value)
							}})
						.transition()
                  			.duration(1000)
							
						.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
						

				});

				function mouseover(d){
					[0,1].forEach(function(i){
						bp2[i].mouseover(d);
						console.log(d)
						
						let format = [".1f" ,"0.0%"]
						
						if (i == 0){
							g[i].selectAll(".mainBars").select(".perc")
							.text(function(d){ return "  "+d3.format(format[i])(d.value)})
							.transition()
                  			.duration(1000);;

						} else {
							g[i].selectAll(".mainBars").select(".perc")
							.text(function(d){ return "   " +d3.format(format[i])(d.value)})
							.transition()
                  			.duration(1000);;
						}

						
					});
				}
				function mouseout(d){
					[0,1].forEach(function(i){
						bp2[i].mouseout(d);
						
						let format = [".1f" ,"0.0%"]
						if (i == 0){
									g[i].selectAll(".mainBars").select(".perc")

							.text(function(d){ return d3.format(format[i])(d.value)})
							.transition()
                  			.duration(1000);

						} else {
									g[i].selectAll(".mainBars").select(".perc")

							.text(function(d){ return d3.format(format[i])(d.percent)})
							.transition()
                  			.duration(1000);
						}
					});
				}
				d3.select(self.frameElement).style("height", "800px");}

				 var updateGraph = function(value,g,var1,var2,d3){

 		// Filter the data to include only fruit of interest
					 		var selectGen= data_.filter(function(d){
					                return d[4] == value;
					              })

							svg3.selectAll("*").remove();
							svg3.append("text").attr("x",250).attr("y",70)
								.attr("class","header").text("BodyShape vs Color Count #")
								.transition()
                  			.duration(1000)
								.style("fill", 'black');
								
							svg3.append("text").attr("x",750).attr("y",70)
								.attr("class","header").text("BodyShape vs Color Fraction %")
								.transition()
                  			.duration(1000)
								.style("fill", 'black');

							var g =[svg3.append("g").attr("transform","translate(150,100)")
									,svg3.append("g").attr("transform","translate(650,100)")];


					 		// Select all of the grouped elements and update the data
						    initial_graph(selectGen,g,var1,var2,d3)

					

					 	}
					 	updateGraph(1,g,var1,var2,d3)






				     	generations.on('change', function(){

 		// Find which fruit was selected from the dropdown
						 		var selectedFruit = d3.select(this)
						            .select("select")
						            .property("value")



						        // Run update function with the selected fruit
						        updateGraph(selectedFruit,g,var1,var2,d3)


						    });


				})
				} 



   ;

   
   //Update data section (Called from the onclick)
