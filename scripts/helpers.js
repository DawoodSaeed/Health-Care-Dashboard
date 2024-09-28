import {
  renderHealthBoxes,
  renderChart,
  renderPatientInfo,
  renderDiagnosticList,
  renderLabReports,
  renderStatsBoxes,
} from "./ui/index.js";

/**
 * Filters the diagnostics data based on the selected timeframe.
 * @param {Array} data - The full diagnostics data.
 * @param {string} timeframe - The selected timeframe (e.g., "1 year").
 * @returns {Array} - The filtered diagnostics data.
 */
export const filterDataByTimeframe = (data, timeframe) => {
  const currentDate = new Date();
  const monthsMap = {
    "1 year": 12,
    "6 months": 6,
    "2 years": 24,
    "3 years": 36,
    "8 months": 8,
  };

  const monthsOffset = monthsMap[timeframe];
  if (!monthsOffset) {
    throw new Error(
      "Invalid timeframe. Valid options are: 1 year, 6 months, 2 years, 3 years, 8 months"
    );
  }

  const cutoffDate = new Date(currentDate);
  cutoffDate.setMonth(currentDate.getMonth() - monthsOffset);

  return data.filter((item) => {
    const itemDate = new Date(`${item.year}-${getMonthIndex(item.month)}-01`);
    return itemDate >= cutoffDate;
  });
};

/**
 * Given the name of the month, returns the index (0-11).
 * @param {string} month - The name of the month.
 * @returns {number} - The index of the month.
 */
const getMonthIndex = (month) => {
  const monthMap = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  return monthMap[month];
};

/**
 * Utility function to prepare health data for rendering health boxes.
 * @param {Array} filteredData - Array of filtered diagnostic data.
 * @returns {Array} healthArray - Array of health data objects for rendering.
 */
export const prepareHealthData = (filteredData) => {
  const latestData = filteredData[filteredData.length - 1];

  return [
    {
      image: "./images/respiratory_rate/respiratory_rate.png",
      label: "Respiratory Rate",
      reading: latestData["respiratory_rate"]["value"],
      grade: latestData["respiratory_rate"]["levels"],
    },
    {
      image: "./images/HeartBPM/HeartBPM.png",
      label: "Heart Rate",
      reading: latestData["heart_rate"]["value"],
      grade: latestData["heart_rate"]["levels"],
    },
    {
      image: "./images/temperature/temperature.png",
      label: "Temperature",
      reading: latestData["temperature"]["value"],
      grade: latestData["temperature"]["levels"],
    },
  ];
};

const prepareStatusBoxData = function (filteredData) {
  const latestData = filteredData[filteredData.length - 1];

  const systolic = latestData["blood_pressure"]["systolic"];
  const diastolic = latestData["blood_pressure"]["diastolic"];
  return [systolic, diastolic];
};

/**
 * Updates the health boxes and status boxes based on the active patient and timeframe.
 * @param {Object} activePatient - The currently active patient.
 * @param {string} timeframe - The timeframe for filtering the diagnostic history.
 */
export const updateHealthAndStatusBoxes = (filteredData) => {
  const healthArray = prepareHealthData(filteredData);
  renderHealthBoxes(healthArray);

  const statusArray = prepareStatusBoxData(filteredData);
  renderStatsBoxes(statusArray);
};

/**
 * Function to handle the rendering of charts and health boxes.
 * @param {Object} defaultPatient - Patient data object.
 * @param {string} timeframe - Timeframe for filtering the data.
 */
export const renderPatientData = (defaultPatient, timeframe) => {
  const filteredData = filterDataByTimeframe(
    defaultPatient.diagnosis_history,
    timeframe
  );
  const labels = filteredData.map((d) => `${d.month} ${d.year}`);
  const systolic = filteredData.map((d) => d.blood_pressure.systolic.value);
  const diastolic = filteredData.map((d) => d.blood_pressure.diastolic.value);

  updateHealthAndStatusBoxes(filteredData);
  renderChart(labels, systolic, diastolic);
};

export const initializePatientData = (patient, timeframe) => {
  renderPatientInfo(patient);
  renderDiagnosticList(patient.diagnostic_list);
  renderLabReports(patient.lab_results);
  renderPatientData(patient, timeframe); // Handle chart and health boxes
};
