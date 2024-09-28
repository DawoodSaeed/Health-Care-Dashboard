/**
 * Creates a lab report element for a single result.
 * @param {string} report - The lab result string.
 * @returns {HTMLElement} - The lab report element.
 */
const createLabReportElement = (report) => {
  const reportElement = document.createElement("div");
  reportElement.classList.add("result");

  reportElement.innerHTML = `
      <p>${report}</p>
      <img
        src="./images/download_FILL0_wght300_GRAD0_opsz24 (1)/download_FILL0_wght300_GRAD0_opsz24 (1).png"
        alt="Download Icon"
        class="download-icon"
      />
    `;

  return reportElement; // Return the constructed element
};

/**
 * Renders the Lab reports of the patient.
 * @param {Array} labResults - Lab results of the patient.
 */
export const renderLabReports = function (labResults) {
  const labResultContainer = document.querySelector(".labResults .results");
  labResultContainer.innerHTML = ""; // Clear previous results

  labResults.forEach((report) => {
    const reportElement = createLabReportElement(report);
    labResultContainer.appendChild(reportElement); // Append the report element to the container
  });
};
