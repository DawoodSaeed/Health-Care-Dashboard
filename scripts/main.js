import { getPatientData } from "./api.js";
import {
  getActivePatient,
  renderAllPatients,
  searchFunctionality,
  setActivePatient,
} from "./ui/index.js";

import { initializePatientData } from "./helpers.js";

/**
 * For the mobile menu and sidebar toggling functionality
 */
function mobonav() {
  const moboNav = document.querySelector(".mobo-nav");
  moboNav.classList.toggle("active");
}

window.addEventListener("load", async function () {
  try {
    // Fetch patient data
    const patients = await getPatientData();
    const defaultPatient = patients[3]; // Default patient to display

    setActivePatient(defaultPatient);
    renderAllPatients(patients);
    initializePatientData(defaultPatient, "1 year");

    // Event listener for timeframe filter change
    document
      .getElementById("filterChart")
      .addEventListener("change", function (event) {
        const selectedTimeframe = event.target.value;
        initializePatientData(
          getActivePatient() ? getActivePatient() : defaultPatient,
          selectedTimeframe
        );
      });

    searchFunctionality(patients);
  } catch (error) {
    console.error("Error fetching or rendering patient data:", error);
  }
});
