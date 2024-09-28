import { renderPatientCard } from "./patientCard.js";
import { renderPatientInfo } from "./patientInfo.js";
import { renderDiagnosticList } from "./diagnosticList.js";
import { renderLabReports } from "./labReports.js";
import { renderHealthBoxes } from "./healthBoxes.js";
import { renderChart } from "./chart.js";
import { renderStatsBoxes } from "./statusBoxes.js";
import { initializePatientData } from "../helpers.js";
import { searchFunctionality } from "./searchPatients.js";
let activePatient = null;
/**
 * Renders all patient cards.
 * @function
 * @param {Array} patients - Array of patient objects.
 */
export const renderAllPatients = (patients) => {
  const cardsContainer = document.getElementById("asideCardsPatient");
  const filterDropdown = document.getElementById("filterChart");
  cardsContainer.innerHTML = "";
  patients.forEach((patient, index) => {
    const card = renderPatientCard(patient);
    if (index === 3) card.classList.add("active");
    cardsContainer.appendChild(card);

    card.addEventListener("click", function () {
      activePatient = patient;
      filterDropdown.value = "1 year";
      const currentlyActive = cardsContainer.querySelector(".active");
      if (currentlyActive) currentlyActive.classList.remove("active");

      this.classList.add("active");
      initializePatientData(patient, "1 year");
    });
  });
};

export const getActivePatient = () => {
  return activePatient;
};

export const setActivePatient = (patient) => {
  activePatient = patient;
};

// Export the functions to be used elsewhere
export {
  renderPatientInfo,
  renderDiagnosticList,
  renderLabReports,
  renderHealthBoxes,
  renderChart,
  renderStatsBoxes,
  searchFunctionality,
};
