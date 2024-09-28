/**
 * Creates a health box element for displaying health metrics.
 * @param {Object} health - The health data for rendering.
 * @param {string} health.image - The URL of the image to display.
 * @param {string} health.label - The label for the health metric (e.g., "Respiratory Rate").
 * @param {number} health.reading - The value of the health metric (e.g., 75).
 * @param {string} health.grade - The grade or description of the health metric (e.g., "Normal").
 * @returns {HTMLElement} - The health box element.
 */
const createHealthBox = function (health) {
  const boxElement = document.createElement("div");
  boxElement.classList.add("box");

  boxElement.innerHTML = `
    <img src=${health.image} alt="respiratory image" />
    <p class="label">${health.label}</p>

    <p class="number">${health.reading}</p>

    <p class="text">${health.grade}</p>
  `;

  return boxElement;
};

/**
 * Renders the health boxes of the patient.
 *  @param {Array<Object>} healthResults - Array of health results of the patient.
 * * Each object should contain properties:
 * - image: URL of the health metric image
 * - label: The label for the health metric
 * - reading: The value of the health metric
 * - grade: The grade or description of the health metric
 *
 */
export const renderHealthBoxes = function (healthResults) {
  const healthContainer = document.querySelector(".healthBoxes");
  healthContainer.innerHTML = ""; // Clear previous results

  healthResults.forEach((health) => {
    const healthBox = createHealthBox(health);
    healthContainer.appendChild(healthBox); // Append the report element to the container
  });
};
