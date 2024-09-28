import { renderAllPatients } from "./index.js";

// Function to toggle the search input visibility
const handleSearchToggle = (patients) => {
  const patientSearchIcon = document.querySelector(".patient-searchIcon");
  const patientSearch = document.querySelector(".patient-search");
  const patientHeading = document.querySelector(".patient-searchHeading");

  patientSearchIcon.addEventListener("click", function () {
    patientSearch.classList.toggle("active");

    if (patientSearch.classList.contains("active")) {
      patientHeading.style.display = "none";
      this.src =
        "https://img.icons8.com/?size=100&id=83149&format=png&color=000000";
    } else {
      renderAllPatients(patients);
      patientHeading.style.display = "inline-block";
      this.src = "./images/search-icons/search_FILL0_wght300_GRAD0_opsz24.png";
    }
  });
};

// Function to filter patients based on search input
const filterPatients = (query, patients) => {
  if (!query) return patients; // Return all patients if search query is empty
  return patients.filter((patient) =>
    patient.name.toLowerCase().includes(query.toLowerCase())
  );
};

// Main search functionality
export const searchFunctionality = (patients) => {
  const patientSearch = document.querySelector(".patient-search");

  handleSearchToggle(patients); // Toggle search bar visibility

  patientSearch.addEventListener("keyup", function (event) {
    // Trigger search on 'Enter' key
    if (event.key === "Enter") {
      event.preventDefault();
      const query = this.value.trim();
      const filteredPatients = filterPatients(query, patients);

      if (filteredPatients.length === 0) {
        const cardsContainer = document.getElementById("asideCardsPatient");
        cardsContainer.innerHTML = "";
        const noResultsMessage = document.createElement("p");
        noResultsMessage.classList.add("no-results-message");
        noResultsMessage.textContent = "No patients found.";
        cardsContainer.appendChild(noResultsMessage);
        return;
      }
      renderAllPatients(filteredPatients);
    }
  });
};
