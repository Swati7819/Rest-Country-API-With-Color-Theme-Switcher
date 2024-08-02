const countryName = new URLSearchParams(location.search).get("name");
const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

const flagImage = document.querySelector(".country-details img");
const countryNameH1 = document.querySelector(".details-text-container h2");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currency = document.querySelector(".currency");
const language = document.querySelector(".language");
const borderCountries = document.querySelector(".border-countries");
const themeChanger = document.querySelector(".theme-changer ");
const themeChangerIcon = document.querySelector(".theme-changer i");

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data)
  // console.log(data[0])

  flagImage.src = data[0]?.flags.svg;
  countryNameH1.innerText = data[0]?.name?.common;
  if (data[0]?.name?.nativeName) {
    nativeName.innerText = Object.values(data[0]?.name?.nativeName)[0]?.common;
  } else nativeName.innerText = data[0]?.name?.common;

  if (data[0].capital) {
    capital.innerText = Object.values(data[0].capital)?.join(", ");
  } else {
    capital.innerText = "N/A";
  }

  if (data[0]?.currencies) {
    currency.innerText = Object.values(data[0]?.currencies)[0]?.name;
  } else {
    currency.innerText = "N/A";
  }

  if (data[0]?.languages) {
    language.innerText = Object.values(data[0]?.languages).join(", ");
  } else {
    language.innerText = "N/A";
  }
  population.innerText = data[0]?.population || "N/A";
  region.innerText = data[0]?.region || "N/A";
  subRegion.innerText = data[0]?.subregion || "N/A";
  topLevelDomain.innerText = data[0]?.tld.join(", ") || "N/A";

if(data[0].borders){
    data[0].borders.forEach(border => {
        // console.log(border)
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then(res => res.json())
        .then(countryData => {
            // console.log(countryData[0])
            const borderCountryTag = document.createElement("a")
            borderCountryTag.innerText = countryData[0].name.common
            borderCountryTag.href = `./country.html?name=${countryData[0].name.common}`
            borderCountries.appendChild(borderCountryTag)
        })
    });

}
}

getData();


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


