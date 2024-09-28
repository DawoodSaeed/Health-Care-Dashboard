/**
 * Renders the diagnostic list for the selected patient.
 * @function
 * @param {Array} diagnostics - Array of diagnostic records.
 */

export const renderDiagnosticList = function (diagnostics) {
  const diagnosticListRowsContainer =
    document.getElementById("diagnosticListRows");
  diagnosticListRowsContainer.innerHTML = ""; // Clear previous list

  // Render the diagnostic list
  diagnostics.forEach((diagnostic) => {
    const row = document.createElement("tr");

    const name = document.createElement("td");
    name.textContent = diagnostic["name"];

    const description = document.createElement("td");
    description.textContent = diagnostic["description"];

    const status = document.createElement("td");
    status.textContent = diagnostic["status"];

    row.appendChild(name);
    row.appendChild(description);
    row.appendChild(status);

    diagnosticListRowsContainer.appendChild(row);
  });
};
