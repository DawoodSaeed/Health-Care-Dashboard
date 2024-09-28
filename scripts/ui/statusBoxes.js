/**
 * Render the systolic and distolic information of the patient.
 * @param {*} diagnostics diagnistic array that systolic and distolic information.
 */
export const renderStatsBoxes = function (diagnostics) {
  // For the stats box
  const boxes = document.querySelectorAll(".stats .box");
  boxes.forEach((box, index) => {
    const text = box.querySelector(".text");
    const number = box.querySelector(".number");

    text.textContent = diagnostics[index]["levels"];
    number.textContent = diagnostics[index]["value"];
  });
};
