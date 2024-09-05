// Get the chart canvas element
const ctx = document.getElementById("performance-chart").getContext("2d");

// Create the chart
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Data Quality", "Data Discovery", "Compliance Reporting", "Project Success", "Storage Costs"],
    datasets: [
      {
        label: "Improvement Percentage",
        data: [40, 60, 50, 30, 25],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
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
          text: "Improvement Percentage",
        },
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Data Governance Implementation Outcomes",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.parsed.y + "%";
          },
        },
      },
    },
  },
});
