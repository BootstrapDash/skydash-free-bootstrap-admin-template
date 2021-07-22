$(function(){
  'use strict'

  // Line chart
  $('.peity-line').peity('line');

  // Bar charts
  $('.peity-bar').peity('bar');

  // Pie chart
  $('.peity-pie').peity('pie');

  // Donut chart
  $('.peity-donut').peity('donut');

	// Using data attributes
    $(".data-attributes span").peity("donut")

    // Evented example.
    $("select").change(function() {
        var text = $(this).val() + "/" + 5

        $(this)
            .siblings("span.graph")
            .text(text)
            .change()

        $("#notice").text("Chart updated: " + text)
    }).change()

    $("span.graph").peity("pie")

    // Updating charts.
    var updatingChart = $(".updating-chart").peity("line", { width: "100%",height:150 })

    setInterval(function() {
        var random = Math.round(Math.random() * 20)
        var values = updatingChart.text().split(",")
        values.shift()
        values.push(random)

        updatingChart
            .text(values.join(","))
            .change()
    }, 2500)

	
  // Bar chart is already initialized found in bracket.js
});