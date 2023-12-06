//Create you project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];
// Use moviesList array for displaing the Name in the dropdown menu
//Add eventLister to each unoccupied seat
//Add eventLsiter to continue Button
//Add eventListerner to Cancel Button
const movie_name = document.getElementById("selectMovie");

const movie_price = document.getElementById("moviePrice");

const movie_name_update = document.getElementById("movieName");

const total_price = document.getElementById("totalPrice");

for (let movie of moviesList) {
  let name = movie.movieName;
  let option1 = document.createElement("option");
  option1.className = `${name}`;
  option1.value = name;
  option1.text = name;
  movie_name.appendChild(option1);
}

function fetchSelectedOption() {
  // Get the dropdown element

  // Get the selected option
  var selectedOption = movie_name.options[movie_name.selectedIndex].value;

  // Display the selected option
  var displayElement = document.querySelector(`.${selectedOption}`);
  return displayElement.textContent;
}

let movie_ticket_price = 0;
updater();
function updater() {
  let updatedMovie = fetchSelectedOption();
  let movieInfo = moviesList.find((obj) => {
    return obj.movieName === updatedMovie;
  });
  console.log(movieInfo);
  movie_price.textContent = `$ ${movieInfo.price}`;
  movie_name_update.textContent = movieInfo.movieName;
  movie_ticket_price = movieInfo.price;
}

let seat_number = 1;
const allseats = document.querySelectorAll("#seatCont .seat");
for (let seat of allseats) {
  seat.value = seat_number;
  seat_number++;
}

const seats = document.querySelectorAll("#seatCont .seat:not(.occupied)");
for (let seat of seats) {
  seat.addEventListener("click", () => {
    seatbooking(seat);
  });
}

const seat_count = document.querySelector("#numberOfSeat");

let selectedDisplay = document.querySelector("#selectedSeatsHolder");

let noelement = document.querySelector(".noSelected");

function seatbooking(seat) {
  let seat_no = document.createElement("span");
  seat_no.textContent = seat.value;
  seat_no.className = `seat${seat.value}`;

  if (seat.classList.contains("selected")) {
    seat.className = "seat";
    seat_count.textContent = parseInt(seat_count.textContent) - 1;
    let seat_rem = document.querySelector(`.seat${seat.value}`);
    total_price.textContent = `$ ${
      parseInt(seat_count.textContent) * movie_ticket_price
    }`;
    seat_rem.remove();
  } else {
    seat.className = "seat selected";
    seat_count.textContent = parseInt(seat_count.textContent) + 1;
    total_price.textContent = `$ ${
      parseInt(seat_count.textContent) * movie_ticket_price
    }`;
    selectedDisplay.append(seat_no);
  }

  if (parseInt(seat_count.textContent) > 0) {
    noelement.style.visibility = "hidden";
  } else {
    noelement.style.visibility = "visible";
  }
}

const conti_nue = document.querySelector("#proceedBtn");
conti_nue.addEventListener("click", proceed);

function proceed() {
  if (parseInt(seat_count.textContent) === 0) {
    alert("Oops no seat selected");
    return;
  }
  const reserved = document.querySelectorAll(".selected");
  for (let reserve of reserved) {
    reserve.className = "seat occupied";
  }
  alert("Yayy!Your seats has been booked");
  defaulter();
  selectedDisplay.remove("span:not(.noSelected)");
  seat_count.textContent = 0;
  total_price.textContent = "$ 0";
}

function defaulter() {
  let movieInfo = moviesList[0];
  console.log(movieInfo);
  movie_price.textContent = `$ ${movieInfo.price}`;
  movie_name_update.textContent = movieInfo.movieName;
  movie_ticket_price = movieInfo.price;
}

const canc_el = document.querySelector("#cancelBtn");
canc_el.addEventListener("click", reload_intial);

function reload_intial() {
  const reserved = document.querySelectorAll(".selected");
  for (let reserve of reserved) {
    reserve.className = "seat";
  }
  selectedDisplay.remove("span:not(.noSelected)");
  seat_count.textContent = 0;
  total_price.textContent = "$ 0";
  defaulter();
}
