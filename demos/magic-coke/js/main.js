//var hypothesis = "Sample hypothesis"; //Enter hypothesis here
//var independentVariables = ["IV1", "IV2", "IV3"]; //Enter IVs here
//var dependentVariables = ["DV1", "DV2", "DV3"]; //Enter DVs here
//var randomVariables = ["RV1", "RV2"]; //Enter RVs here
//var controlVariables = ["CV1", "CV2"]; //Enter CVs here
//var experimentalConditions = ["IV1DV1", "IV1DV2", "IV1DV3", "IV2DV1", "IV2DV2", "IV2DV3", "IV3DV1", "IV3DV2", "IV3DV3"];
//var designTypes = [["between_subject", "No_of_participants"], ["within_subject", "No_of_participants"]]; //Enter the number of participants required for each design

var data = {
  "name": "Magic Coke is better than Pepsi and coca-cola if drink it every meal in slim weight and taste",
  "children": [
    {
      "name": "Independent Variables",
      "children": [
        {
          "name": "Pepsi"
        },
        {
          "name": "Coca Cola"
        },
        {
          "name": "Magic Coke"
        },
        {
          "name": "Breakfast"
        },
        {
          "name": "Lunch"
        },
        {
          "name": "Dinner"
        }
        ]
    },
    {
      "name": "Dependent Variables",
      "children": [
        {
          "name": "Slim Weight"
        },
        {
          "name": "Taste Scale"
        }
        ]
    },
    {
      "name": "Random Variables",
      "children": [
        {
          "name": "Age"
        },
        {
          "name": "Gender"
        }
        ]
    },
    {
      "name": "Control Variables",
      "children": [
        {
          "name": "Food Type"
        },
        {
          "name": "Personal Health"
        }
        ]
    },
    {
      "name": "Design Types",
      "children": [
        {
          "name": "Between Subject"
        },
        {
          "name": "Within Subject"
        }
        ]
    },
    {
      "name": "Experimental Conditions",
      "children": [
        {
          "name": "Pepsi x Breakfast"
        },
        {
          "name": "Pepsi x Lunch"
        },
        {
          "name": "Pepsi x Dinner"
        },
        {
          "name": "Coca Cola x Breakfast"
        },
        {
          "name": "Coca Cola x Lunch"
        },
        {
          "name": "Coca Cola x Dinner"
        },
        {
          "name": "Magic Coke x Breakfast"
        },
        {
          "name": "Magic Coke x Lunch"
        },
        {
          "name": "Magic Coke x Dinner"
        }
        ]
    }
  ]
};

var margin = {
  top: 20,
  right: 120,
  bottom: 20,
  left: 120
};

var SVGwidth = $(window).width();
var SVGHeight = 700;

var treeSpanWidth = SVGwidth - margin.right - margin.left;
var treeLength = SVGHeight;

var i = 0;
var duration = 750;
var root;

var tree = d3.layout.tree()
  .size([treeSpanWidth, treeLength]);

var color = d3.scale.linear()
  .domain([0, 300 * 2])
  .range(["#ffffff", "#cc0000"]);

var circleSize = function (currentX) {
  return 20 * (1 - 0.8 * (currentX / treeLength));
}

var fontSize = function (currentX) {
  return 15 * (1 - 0.8 * currentX / treeLength) + "px";
}

var diagonal = d3.svg.diagonal()
  .projection(function (d) {
    return [d.x, d.y];
  });

var svg = d3.select("#svg-board").append("svg")
  .attr("width", "100%")
  .attr("height", SVGHeight)
  .style("background", "white")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var drawTree = function (flare) {

  root = flare;
  root.x0 = treeSpanWidth / 2;
  root.y0 = 0;

  // collapse children
  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  root.children.forEach(collapse);
  update(root);
};


var update = function (source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root),
    links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function (d, index) {
    var indentLength = (index + 1) % 2 * 30;
    d.y = d.depth * 300 + indentLength;
  });

  // Update the nodes…
  var node = svg.selectAll("g.node")
    .data(nodes, function (d) {
      return d.id || (d.id = ++i);
    });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + source.x0 + "," + source.y0 + ")";
    })
    .on("click", click);

  nodeEnter.append("circle")
    .attr("r", function (d) {
      return circleSize(d.y)
    })
    .style("fill", function (d) {
      if (d._children) {
        return color(d.y)
      };
    })
    .style("stroke", function (d) {
      return color(d.y);
    });;

  nodeEnter.append("text")
    .attr("dy", "0.75em")
    .attr("text-anchor", function (d) {
      return d.children || d._children ? "end" : "start";
    })
    .text(function (d) {
      return d.name;
    })
    .style("fill-opacity", 1e-6)
    .style("font-size", function (d) {
      return fontSize(source.y);
    })
    .attr("fill", "#595959");

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  nodeUpdate.select("circle")
    .attr("r", function (d) {
      return circleSize(d.y)
    })
    .style("fill", function (d) {
      if (d._children) {
        return color(d.y)
      };
    });

  nodeUpdate.select("text")
    .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function (d) {
      return "translate(" + source.x + "," + source.y + ")";
    })
    .remove();

  nodeExit.select("circle")
    .attr("r", function (d) {
      return circleSize(d.y)
    });

  nodeExit.select("text")
    .style("fill-opacity", 1e-6)
    .style("font-size", "10px");

  // Update the links…
  var link = svg.selectAll("path.link")
    .data(links, function (d) {
      return d.target.id;
    });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", function (d) {
      var o = {
        x: source.x0,
        y: source.y0
      };
      return diagonal({
        source: o,
        target: o
      });
    })
    .style("stroke", function (d) {
      return color(d.target.y);
    })
    .style("opacity", 0.5)
    .style("stroke-width", function (d) {
      return 2 * circleSize(d.target.y);
    });

  // Transition links to their new position.
  link.transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
    .duration(duration)
    .attr("d", function (d) {
      var o = {
        x: source.x,
        y: source.y
      };
      return diagonal({
        source: o,
        target: o
      });
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function (d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

drawTree(data)
