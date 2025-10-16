// DOM Elements
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const resultsSection = document.getElementById("results");

// Data storage
let travelData = {
  beaches: [],
  temples: [],
  countries: [],
};

// Fetch JSON data
fetch("travel_recommendation.json")
  .then((res) => res.json())
  .then((data) => {
    travelData = data;
    console.log("Travel data loaded:", travelData);
  })
  .catch((err) => console.error("Failed to load travel data:", err));

// Normalize keyword
function normalizeKeyword(input) {
  return input.trim().toLowerCase();
}

// Get local time (Task 10 - optional)
function getLocalTime(timeZone) {
  if (!timeZone) return "";
  const options = {
    timeZone: timeZone,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date().toLocaleTimeString("en-US", options);
}

// Display cards
function displayCards(items, type) {
  resultsSection.innerHTML = ""; // Clear previous results

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "recommendation-card";
    card.innerHTML = `
      <h3>${item.name}</h3>
      <img src="${item.imageUrl}" alt="${item.name}" />
      <p>${item.description}</p>
      ${item.country ? `<p><strong>Country:</strong> ${item.country}</p>` : ""}
    `;
    resultsSection.appendChild(card);
  });
}

// Search logic
searchBtn.addEventListener("click", () => {
  const keyword = normalizeKeyword(searchInput.value);
  if (!keyword) return alert("Please enter a keyword.");

  let results = [];

  if (["beach", "beaches"].includes(keyword)) {
    results = travelData.beaches.slice(0, 2);
  } else if (["temple", "temples"].includes(keyword)) {
    results = travelData.temples.slice(0, 2);
  } else {
    const countryMatch = travelData.countries.find(
      (c) => c.name.toLowerCase() === keyword
    );
    if (countryMatch) {
      results = countryMatch.cities.slice(0, 2).map((city) => ({
        ...city,
        country: countryMatch.name,
      }));
    }
  }

  if (results.length === 0) {
    resultsSection.innerHTML = `<p>No recommendations found for "${keyword}".</p>`;
  } else {
    displayCards(results);
  }
});

// Clear logic
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  resultsSection.innerHTML = "";
});
