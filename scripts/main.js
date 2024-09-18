console.log("Attached Js File");

const DIAGNOSTIC_HISTORY = [];

function getPatientData() {
  const url = "https://fedskillstest.coalitiontechnologies.workers.dev";
  const username = "coalition";
  const password = "skills-test";

  // Ecode the username and password;
  const encodedCreds = btoa(`${username}:${password}`);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCreds}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problem with network response");
        }

        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const getPatient = function (patients, patientName) {
  const filteredPatients = patients.filter(
    (patient) => patient["name"] == patientName
  );

  if (!filteredPatients.length) {
    return false;
  }

  const patientToRender = filteredPatients[0];

  return patientToRender;
};

const renderAllPateints = function (patients) {
  const cards = document.getElementById("asideCardsPatient");
  patients.forEach(({ name, age, gender, profile_picture }) => {
    const card = document.createElement("div");
    card.classList.add("card");

    if (name == "Jessica Taylor") {
      card.classList.add("active");
    }
    const cardDetails = document.createElement("div");
    cardDetails.classList.add("card-details");

    const img = document.createElement("img");
    img.src = profile_picture;
    img.alt = name + "image";

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    const p1 = document.createElement("p");
    p1.textContent = name;

    const p2 = document.createElement("p");
    p2.textContent = gender + ", " + age;

    cardInfo.appendChild(p1);
    cardInfo.appendChild(p2);

    cardDetails.appendChild(img);
    cardDetails.appendChild(cardInfo);

    const cardIcon = document.createElement("div");
    cardIcon.classList.add("card-icon");

    cardIcon.innerHTML = ` <img
                  src="./images/horizontal-icons/more_horiz_FILL0_wght300_GRAD0_opsz24.png"
                  alt="Horizontal Icon"
                />`;

    //
    card.appendChild(cardDetails);
    card.appendChild(cardIcon);

    cards.appendChild(card);
  });
};

const renderPatientInfo = function (patients, patientName) {
  const patientToRender = getPatient(patients, patientName);

  if (!patientToRender) {
    alert("Patient not found");
    return;
  }

  const htmlToDOM = `
          <div class="patient-image">
            <img src=${patientToRender["profile_picture"]} />
          </div>

          <div class="patient-info">
            <div class="patient-name">
              <p>${patientToRender["name"]}</p>
            </div>

            <div class="pateint-iconInfo">
              <div class="Icon">
                <img src="./images/birthIcons/BirthIcon.png" alt="" />
              </div>
              <div class="info">
                <p>Date Of birth</p>
                <p>${patientToRender["date_of_birth"]}</p>
              </div>
            </div>

            <div class="pateint-iconInfo">
              <div class="Icon">
                <img src="./images/gendericon/FemaleIcon.png" alt="" />
              </div>
              <div class="info">
                <p>Gender</p>
                <p>${patientToRender["gender"]}</p>
              </div>
            </div>


            <div class="pateint-iconInfo">
              <div class="Icon">
                <img src="./images/PhoneIcon.png" alt="PhoneIcon.png" />
              </div>
              <div class="info">
                <p>Contact Info</p>
                <p>${patientToRender["phone_number"]}</p>
              </div>
            </div>

            <div class="pateint-iconInfo">
              <div class="Icon">
                <img src="./images/PhoneIcon.png" alt="PhoneIcon.png" />
              </div>
              <div class="info">
                <p>Emergency Contact</p>
                <p>${patientToRender["emergency_contact"]}</p>
              </div>
            </div>

            <div class="pateint-iconInfo">
              <div class="Icon">
                <img src="./images/InsuranceIcon.png" alt="InsuranceIcon" />
              </div>
              <div class="info">
                <p>Insurance Provider</p>
                <p>${patientToRender["insurance_type"]}</p>
              </div>
            </div>
            <div class='patient-infoBtn'>
            <button>Show All Information</button>
          </div>
          </div>


          
        `;

  document.querySelector(".main-leftBar .patientInfo").innerHTML = htmlToDOM;
};

const renderDiagnosticList = function (patients, patientName) {
  const patientToRender = getPatient(patients, patientName);

  if (!patientToRender) {
    alert("Patient not found");
    return;
  }

  const diagnosticList = patientToRender["diagnostic_list"];

  const diagnosticListRowsContainer =
    document.getElementById("diagnosticListRows");

  diagnosticList.forEach((diagnostic) => {
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

const setCrosspondingDiagnosistics = function (diagnostics) {
  console.log(diagnostics[0]);
  const arr = [diagnostics[0]["systolic"], diagnostics[0]["diastolic"]];

  const healthBoxesData = [
    diagnostics[0]["respiratory_rate"],
    diagnostics[0]["temperature"],
    diagnostics[0]["heart_rate"],
  ];
  console.log(healthBoxesData);
  const boxes = document.querySelectorAll(".stats .box");
  boxes.forEach((box, index) => {
    const text = box.querySelector(".text");
    const number = box.querySelector(".number");

    text.textContent = arr[index]["levels"];
    number.textContent = arr[index]["value"];
  });

  const healthBoxes = document.querySelectorAll(".healthBoxes .box");
  console.log(healthBoxesData);
  healthBoxes.forEach((box, index) => {
    const text = box.querySelector(".text");
    const number = box.querySelector(".number");

    text.textContent = healthBoxesData[index]["levels"];
    number.textContent =
      index % 2 == 0
        ? healthBoxesData[index]["value"] + " bpm"
        : healthBoxesData[index]["value"] + " F";
  });
};

let myChart = null; // Global variable to hold the chart instance

const renderChart = function (labels, systolic, diastolic) {
  const ctx = document.getElementById("myChart").getContext("2d");

  // If the chart instance already exists, update the data
  if (myChart) {
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = systolic;
    myChart.data.datasets[1].data = diastolic;
    myChart.update(); // Update the chart with new data
  } else {
    let recentLabel = "";
    // Create a new chart instance if it doesn't exist
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels, // X-axis labels
        datasets: [
          {
            label: "Systolic Data Set", // Name of the first line
            data: systolic, // Data points for the first line
            borderColor: "#C26EB4", // Color of the first line
            backgroundColor: "rgba(194, 110, 180, 0.2)", // Background color under the line
            fill: false, // Don't fill the area under the line
            tension: 0.3, // Curve the line slightly
          },
          {
            label: "Diastolic Data Set", // Name of the second line
            data: diastolic, // Data points for the second line
            borderColor: "#7E6CAB", // Color of the second line
            backgroundColor: "rgba(126, 108, 171, 0.2)", // Background color under the line
            fill: false, // Don't fill the area under the line
            tension: 0.3, // Curve the line slightly
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
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                recentLabel = labels[tooltipItem.dataIndex];
                console.log(recentLabel);
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },

        onClick: (e) => {
          const [month, year] = recentLabel.split(" ");

          const arr = DIAGNOSTIC_HISTORY.filter(
            (itm) =>
              itm["year"] == parseInt(year) &&
              itm["month"] == getFullMonthName(month)
          );

          setCrosspondingDiagnosistics(arr);
        },
      },
    });
  }
};
const renderChartData = function (patients, patientName) {
  const patientToRender = getPatient(patients, patientName);

  if (!patientToRender) {
    alert("Patient not found");
    return;
  }

  const diagnosisHistory = patientToRender["diagnosis_history"];
  console.log(diagnosisHistory);

  const labels = [];
  const systolic = [];
  const diastolic = [];

  diagnosisHistory.forEach((diagnosis) => {
    const obj = {
      systolic: diagnosis["blood_pressure"]["systolic"],
      diastolic: diagnosis["blood_pressure"]["diastolic"],
      month: diagnosis["month"],
      year: diagnosis["year"],
      temperature: diagnosis["temperature"],
      heart_rate: diagnosis["heart_rate"],
      respiratory_rate: diagnosis["respiratory_rate"],
    };
    DIAGNOSTIC_HISTORY.push(obj);
  });

  const array = filterDataByTimeframe(DIAGNOSTIC_HISTORY, "1 year");

  console.log(array);
  array.forEach((diagnosis) => {
    labels.push(
      diagnosis["month"][0] +
        diagnosis["month"][1] +
        diagnosis["month"][2] +
        " " +
        diagnosis["year"]
    );
    systolic.push(diagnosis["systolic"].value);
    diastolic.push(diagnosis["diastolic"].value);
  });
  renderChart(labels, systolic, diastolic);
  setCrosspondingDiagnosistics(array);
};

window.addEventListener("load", function () {
  const response = getPatientData();

  response.then((data) => {
    renderAllPateints(data);

    renderPatientInfo(data, "Jessica Taylor");
    renderDiagnosticList(data, "Jessica Taylor");
    renderChartData(data, "Jessica Taylor");

    console.log(DIAGNOSTIC_HISTORY);
  });
});

// ###################### For the filter process ###############
function filterDataByTimeframe(data, timeframe) {
  const currentDate = new Date();

  const timeframes = {
    "1 year": 12,
    "6 months": 6,
    "2 years": 24,
    "3 years": 36,
    "8 months": 8,
  };

  const monthsOffset = timeframes[timeframe];

  if (!monthsOffset) {
    throw new Error(
      "Invalid timeframe. Valid options are: 1 year, 6 months, 2 years, 3 years, 8 months"
    );
  }

  const cutoffDate = new Date(currentDate);
  cutoffDate.setMonth(currentDate.getMonth() - monthsOffset);

  const filteredData = data.filter((item) => {
    const itemDate = new Date(`${item.year}-${getMonthIndex(item.month)}-01`);
    return itemDate >= cutoffDate;
  });

  return filteredData;
}

function getMonthIndex(month) {
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
}

document
  .getElementById("filterChart")
  .addEventListener("change", function (event) {
    let selectedValue = event.target.value;
    console.log("Selected value:", selectedValue);

    if (selectedValue === "last1year") {
      selectedValue = "1 year";
    } else if (selectedValue === "last6months") {
      selectedValue = "6 months";
    } else if (selectedValue === "last2year") {
      selectedValue = "2 years";
    } else if (selectedValue === "last3year") {
      selectedValue = "3 years";
    } else if (selectedValue === "last8months") {
      selectedValue = "8 months";
    }

    console.log(selectedValue);
    const array = filterDataByTimeframe(DIAGNOSTIC_HISTORY, selectedValue);
    const labels = [];
    const systolic = [];
    const diastolic = [];
    console.log(array);
    array.forEach((diagnosis) => {
      labels.push(
        diagnosis["month"][0] +
          diagnosis["month"][1] +
          diagnosis["month"][2] +
          " " +
          diagnosis["year"]
      );
      systolic.push(diagnosis["systolic"].value);
      diastolic.push(diagnosis["diastolic"].value);
    });
    renderChart(labels, systolic, diastolic);
  });

function getFullMonthName(monthAbbreviation) {
  switch (monthAbbreviation) {
    case "Jan":
      return "January";
    case "Feb":
      return "February";
    case "Mar":
      return "March";
    case "Apr":
      return "April";
    case "May":
      return "May";
    case "Jun":
      return "June";
    case "Jul":
      return "July";
    case "Aug":
      return "August";
    case "Sep":
      return "September";
    case "Oct":
      return "October";
    case "Nov":
      return "November";
    case "Dec":
      return "December";
    default:
      return "Invalid month";
  }
}
