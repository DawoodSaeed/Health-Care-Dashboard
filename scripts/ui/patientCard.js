/**
 * Renders a single patient card.
 * @function
 * @param {Object} patient - Patient object containing details.
 * @returns {HTMLElement} - The card element.
 */

export const renderPatientCard = function (patient) {
  const { name, age, gender, profile_picture } = patient;

  const card = document.createElement("div");
  card.classList.add("card");

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

  card.appendChild(cardDetails);
  card.appendChild(cardIcon);

  return card;
};
