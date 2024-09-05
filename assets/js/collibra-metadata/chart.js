// assets/js/collibra-metadata/chart.js
document.addEventListener("DOMContentLoaded", function () {
  var ctx = document.getElementById("performance-chart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Terminology Inconsistencies", "Time Spent on Data Discrepancies"],
      datasets: [
        {
          label: "Before Implementation",
          data: [100, 100],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "After Implementation",
          data: [5, 40],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Relative Percentage",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Impact of Metadata Management Implementation",
        },
        legend: {
          position: "top",
        },
      },
    },
  });
});
