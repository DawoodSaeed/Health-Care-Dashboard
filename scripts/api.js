/**
 * Fetch all the patients record and returns back a promise .
 * @function
 */

// api.js
export const getPatientData = async () => {
  const url = "https://fedskillstest.coalitiontechnologies.workers.dev";
  const username = "coalition";
  const password = "skills-test";

  // Encode the username and password
  const encodedCreds = btoa(`${username}:${password}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCreds}`,
      },
    });

    if (!response.ok) {
      throw new Error("Problem with network response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw error;
  }
};

/**
 * Returns an patient object accoridng to the name provided
 * if no object with given name is found it rerturns boolean false
 * @function
 */
export const getPatient = function (patients, patientName) {
  const filteredPatients = patients.filter(
    (patient) => patient["name"] === patientName
  );

  return filteredPatients.length > 0 ? filteredPatients[0] : false;
};
