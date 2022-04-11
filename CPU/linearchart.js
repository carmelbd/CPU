var xValues = [];
var yValues = [];

function generateData(value, i1, i2, step = 1) {
    for (let x = i1; x <= i2; x += step) {
        yValues.push(eval(value));
        xValues.push(x);
    }
}

generateData("x * 2 + 7", 0, 10, 0.5);
new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            fill: true,
            pointRadius: 4,
            borderColor: "rgba(255,0,0,0.5)",
            data: yValues
        }]
    },
    options: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: "Aws instance CPU Usage",
            fontSize: 16
        }
    }
});
