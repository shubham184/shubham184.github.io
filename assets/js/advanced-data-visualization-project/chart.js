var ctx = document.getElementById('performance-chart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Data Processing Latency', 'Prediction Accuracy', 'Query Response Time', 'Cost Savings'],
      datasets: [{
          label: 'Before Platform Implementation',
          data: [5000, 75, 10, 0],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
      }, {
          label: 'After Platform Implementation',
          data: [100, 95, 0.5, 30],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
      }]
  },
  options: {
      responsive: true,
      scales: {
          y: {
              beginAtZero: true,
              title: {
                  display: true,
                  text: 'Value'
              }
          }
      },
      plugins: {
          title: {
              display: true,
              text: 'Performance Metrics of Supply Chain Analytics Platform'
          },
          tooltip: {
              callbacks: {
                  label: function(context) {
                      var label = context.dataset.label || '';
                      if (label) {
                          label += ': ';
                      }
                      if (context.parsed.y !== null) {
                          label += context.parsed.y;
                          if (context.dataIndex === 0) label += ' ms';
                          if (context.dataIndex === 1) label += '%';
                          if (context.dataIndex === 2) label += ' s';
                          if (context.dataIndex === 3) label += '%';
                      }
                      return label;
                  }
              }
          }
      }
  }
});