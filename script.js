const url = "https://restcountries.com/v3.1/all";
const mainContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
let allCountryData;
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer ");
const themeChangerIcon = document.querySelector(".theme-changer i");

async function getdata() {
  const res = await fetch(url);
  const data = await res.json();
  data.forEach((country) => {
    // console.log(country.capital)
    const countryCard = document.createElement("a");
    countryCard.className = "country-card";
    countryCard.href = `./country.html?name=${country.name.common}`;
    const cardHtml = `
                    <img src=${country.flags.svg} alt=${country.name.common}>
                    <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population: </b>${country.population.toLocaleString()}</p>
                        <p><b>Region: </b>${country.region}</p>
                        <p><b>Capital: </b>${country.capital}</p>
                    </div>
    
                `;

    countryCard.innerHTML = cardHtml;
    mainContainer.appendChild(countryCard);

    // console.log(countryCard);
  });
}

getdata();

filterByRegion.addEventListener("change", (e) => {
  // console.log(e.target.value)
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      mainContainer.innerHTML = "";
      data.forEach((country) => {
        const countryCard = document.createElement("a");
        countryCard.className = "country-card";
        countryCard.href = `./country.html?name=${country.name.common}`;
        const cardHtml = `
                    <img src=${country.flags.svg} alt=${country.name.common}>
                    <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population: </b>${country.population.toLocaleString()}</p>
                        <p><b>Region: </b>${country.region}</p>
                        <p><b>Capital: </b>${country.capital}</p>
                    </div>
    
                `;

        countryCard.innerHTML = cardHtml;
        mainContainer.appendChild(countryCard);

        // console.log(countryCard);
      });
    });
});

fetch(`https://restcountries.com/v3.1/all`)
  .then((res) => res.json())
  .then((data) => {
    allCountryData = data;
    // console.log(data)
    getdata();
  });

searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value;
  // console.log(searchValue)
  const filteredData = allCountryData.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });
  // console.log(filteredData)
  mainContainer.innerHTML = "";
  filteredData.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.className = "country-card";
    countryCard.href = `./country.html?name=${country.name.common}`;
    const cardHtml = `
                    <img src=${country.flags.svg} alt=${country.name.common}>
                    <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population: </b>${country.population.toLocaleString()}</p>
                        <p><b>Region: </b>${country.region}</p>
                        <p><b>Capital: </b>${country.capital}</p>
                    </div>
    
                `;

    countryCard.innerHTML = cardHtml;
    mainContainer.appendChild(countryCard);

    // console.log(countryCard);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // Check for saved theme in local storage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);
  }
});

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const currentTheme = document.body.classList.contains("dark")
    ? "dark"
    : "light";
  localStorage.setItem("theme", currentTheme);
  updateThemeIcon(currentTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeChangerIcon.classList.remove("fa-regular", "fa-moon");
    themeChangerIcon.classList.add("fa-solid", "fa-sun");
  } else {
    themeChangerIcon.classList.add("fa-regular", "fa-moon");
    themeChangerIcon.classList.remove("fa-solid", "fa-sun");
  }
}

// const mainContainer = document.querySelector(".countries-container");
// const countryCardHref = document.createElement("a")
// countryCardHref.href ="#";
// const countryCard =  document.createElement("div")
// countryCard.className = "country-card"
// const imageComponent = document.createElement("img")
// imageComponent.src= "https://flagcdn.com/gd.svg"
// imageComponent.alt= "flag"
// const cardText = document.createElement("div")
// cardText.className = "card-text"
// const cardTitle = document.createElement("h3")
// cardTitle.className = "card-title"
// cardTitle.textContent = "Grenada"
// const cardPopulation = document.createElement("p")
// cardPopulation.innerHTML = "<b>Population:</b> 81,770,900"
// const cardRegion = document.createElement("p")
// cardRegion.innerHTML = "<b>Region:</b> Europe"
// const cardCapital = document.createElement("p")
// cardCapital.innerHTML = "<b>Capital:</b> Berlin"
// countryCard.append(imageComponent)
// cardText.append(cardTitle,cardPopulation,cardRegion,cardCapital)
// countryCard.append(cardText)
// countryCardHref.append(countryCard)
// mainContainer.appendChild(countryCardHref)

// console.log(countryCardHref)
