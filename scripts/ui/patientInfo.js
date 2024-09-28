/**
 * Renders detailed information about a single patient.
 * @function
 * @param {Object} patient - Patient object containing details.
 */
export const renderPatientInfo = function (patient) {
  const htmlToDOM = `
            <div class="patient-image">
              <img src=${patient["profile_picture"]} />
            </div>
  
            <div class="patient-info">
              <div class="patient-name">
                <p>${patient["name"]}</p>
              </div>
  
  
              <div class="d-data">
              <div class="pateint-iconInfo">
                <div class="Icon">
                  <img src="./images/birthIcons/BirthIcon.png" alt="" />
                </div>
                <div class="info">
                  <p>Date Of birth</p>
                  <p>${patient["date_of_birth"]}</p>
                </div>
              </div>
  
              <div class="pateint-iconInfo">
                <div class="Icon">
                  <img src="./images/gendericon/FemaleIcon.png" alt="" />
                </div>
                <div class="info">
                  <p>Gender</p>
                  <p>${patient["gender"]}</p>
                </div>
              </div>
  
  
              <div class="pateint-iconInfo">
                <div class="Icon">
                  <img src="./images/PhoneIcon.png" alt="PhoneIcon.png" />
                </div>
                <div class="info">
                  <p>Contact Info</p>
                  <p>${patient["phone_number"]}</p>
                </div>
              </div>
  
              <div class="pateint-iconInfo">
                <div class="Icon">
                  <img src="./images/PhoneIcon.png" alt="PhoneIcon.png" />
                </div>
                <div class="info">
                  <p>Emergency Contact</p>
                  <p>${patient["emergency_contact"]}</p>
                </div>
              </div>
  
              <div class="pateint-iconInfo">
                <div class="Icon">
                  <img src="./images/InsuranceIcon.png" alt="InsuranceIcon" />
                </div>
                <div class="info">
                  <p>Insurance Provider</p>
                  <p>${patient["insurance_type"]}</p>
                </div>
              </div>
              </div>
              <div class='patient-infoBtn'>
              <button>Show All Information</button>
            </div>
            </div>
  
  
            
          `;

  document.querySelector(" .patientInfo").innerHTML = htmlToDOM;
};
