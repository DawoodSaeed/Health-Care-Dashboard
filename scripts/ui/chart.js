import { updateHealthAndStatusBoxes } from "../helpers.js";
import { getActivePatient } from "./index.js";

let myChart;

/**
 * Renders the chart based on the filtered data.
 * @param {Array} labels - The labels for the x-axis.
 * @param {Array} systolic - The systolic data points.
 * @param {Array} diastolic - The diastolic data points.
 */
export const renderChart = (labels, systolic, diastolic) => {
  const ctx = document.getElementById("myChart").getContext("2d");

  // Function to handle chart click events
  const handleChartClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;

      // Get the date label for the clicked point
      const clickedDate = labels[clickedIndex].trim(); // Ensure no extra spaces
      console.log(`Clicked Date: ${clickedDate}`);

      // Check if clickedDate is properly formatted
      const [month, year] = clickedDate.split(" ");

      if (!month || !year || isNaN(parseInt(year))) {
        console.error("Invalid date format or missing data.");
        return;
      }

      console.log(`Month: ${month}, Year: ${year}`);

      const diagnosisHistory = getActivePatient()["diagnosis_history"];

      // Filter the patient's diagnosis history based on the clicked month and year
      const filteredDiagnosisHistory = diagnosisHistory.filter((diagnosis) => {
        return diagnosis.month === month && diagnosis.year === parseInt(year);
      });

      if (filteredDiagnosisHistory.length === 0) {
        console.log("No diagnosis history found for the selected date.");
        return;
      }

      // Update health and status boxes with the filtered data
      updateHealthAndStatusBoxes(filteredDiagnosisHistory);
    }
  };

  if (myChart) {
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = systolic;
    myChart.data.datasets[1].data = diastolic;
    myChart.update();

    myChart.options.onClick = handleChartClick;
  } else {
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Systolic",
            data: systolic,
            borderColor: "#C26EB4",
            backgroundColor: "rgba(194, 110, 180, 0.2)",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Diastolic",
            data: diastolic,
            borderColor: "#7E6CAB",
            backgroundColor: "rgba(126, 108, 171, 0.2)",
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        onClick: handleChartClick,
      },
    });
  }
};
