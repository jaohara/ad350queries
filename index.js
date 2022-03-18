const barChartCanvas    = document.getElementById("barchart");
const barChartCtx       = barChartCanvas?.getContext('2d');

const lineChartCanvas   = document.getElementById("linechart");
const lineChartCtx      = lineChartCanvas?.getContext('2d');

const blue = "#008BF8";
const green = "#47e65b";
const red = "#F93943";

const lightBlue = `${blue}bb`;
const lightGreen = `${green}bb`;
const lightRed = `${red}bb`;

// stacked bar chart (vote breakdown by age)
const barChartLables = [ "18 - 29", "30 - 44", "45 - 64", "65+" ];

/*
  Range vote tallies:

  18-29
    r: 1
    d: 7
    o: 2

  30-44:
    r: 2
    d: 4
    o: 1

  45-64:
    r: 3
    d: 3
    o: 0

  65+:
    r: 3
    d: 2
    o: 0
*/

const barChartData = {
  labels: barChartLables,
  datasets: [
    {
      label: "Other",
      data: [252, 151, 69, 15],
      backgroundColor: lightGreen,
      borderColor: green,
      borderWidth: 2
    },
    { 
      label: "Democrat",
      data: [753, 482, 364, 291],
      backgroundColor: lightBlue,
      borderColor: blue,
      borderWidth: 2
    },
    { 
      label: "Republican",
      data: [101, 242, 341, 402],
      backgroundColor: lightRed,
      borderColor: red,
      borderWidth: 2
    },
  ]
};

const barChartConfig = {
  type: 'bar',
  data: barChartData,
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Voter Breakdown By Age Demographics'
      },
    },
    // responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    },
    scale: {
      pointLabels: {
        fontStyle: "bold",
      }
    }
  }
};

const barChart = new Chart(barChartCtx, barChartConfig);



// line graph (multi-party trends)
/*
  Voter: 

  - R
  - R
  - R
  - D
  - R
  - D
  - D
  - D
  - D
  - D
*/

const lineChartLabels = 
  ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"];

const lineChartData = {
  labels: lineChartLabels,
  datasets: [
  //   {
  //   backgroundColor: blue,
  //   borderColor: blue,
  //   data: [0, -1, -2, -3, -2, -3, -2, -1, 0, 1, 2],
  //   // label: "Elliot Gauvin's Voting Trends Over Time",
  // },
  {
    backgroundColor: red,
    borderColor: lightRed,
    data: [0, -1, -2, -3],
    // label: "Elliot Gauvin's Voting Trends Over Time",
  },
  {
    backgroundColor: blue,
    borderColor: lightBlue,
    data: [undefined, undefined, undefined, -3, -2],
    // label: "Elliot Gauvin's Voting Trends Over Time",
  },
  {
    backgroundColor: lightRed,
    borderColor: red,
    data: [undefined, undefined, undefined, undefined, -2, -3],
    // label: "Elliot Gauvin's Voting Trends Over Time",
  },
  {
    backgroundColor: lightBlue,
    borderColor: blue,
    data: [undefined, undefined, undefined, undefined, undefined, -3, -2, -1, 0, 1, 2],
    // label: "Elliot Gauvin's Voting Trends Over Time",
  },
  {
    backgroundColor: "#000",
    borderColor:"#000", 
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pointHoverRadius: 1,
    pointRadius: 1
  }]
};

const lineChartConfig = {
  type: 'line',
  data: lineChartData,
  options: {
    plugins: {
      legend: { 
        display: false
      }
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1
        }
      }
    }
  }
};

const lineChart = new Chart(lineChartCtx, lineChartConfig);
