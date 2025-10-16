// ======== Travel Recommendation Logic ========

// Fetch JSON data when the page loads
fetch("assets/data/travel_recommendation.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("✅ JSON data loaded:", data); // check if data is fetched
    setupSearch(data);
  })
  .catch((error) => console.error("❌ Error loading JSON:", error));

// ======== Setup Search Function ========
function setupSearch(data) {
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const searchInput = document.getElementById("searchInput");
  const resultsDiv = document.getElementById("results");

  // 🔍 Handle Search Button
  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase(); // make case-insensitive
    resultsDiv.innerHTML = ""; // clear previous results

    if (!keyword) {
      resultsDiv.innerHTML = "<p>Please enter a search keyword.</p>";
      return;
    }

    let results = [];

    // ===== BEACH SEARCH =====
    if (keyword.includes("beach")) {
      results = data.beaches;
    }

    // ===== TEMPLE SEARCH =====
    else if (keyword.includes("temple")) {
      results = data.temples;
    }

    // ===== COUNTRY SEARCH =====
    else if (
      keyword.includes("country") ||
      keyword.includes("australia") ||
      keyword.includes("japan") ||
      keyword.includes("brazil")
    ) {
      results = data.countries.flatMap((country) => country.cities);
    }

    // ===== SHOW RESULTS =====
    if (results.length > 0) {
      displayResults(results);
    } else {
      resultsDiv.innerHTML =
        "<p>No matches found. Try 'beach', 'temple', or 'country'.</p>";
    }
  });

  // 🧹 Handle Clear Button
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    resultsDiv.innerHTML = "";
  });
}

// ======== Display Results ========
// ======== Display Results ========
function displayResults(items) {
  const resultsDiv = document.getElementById("results");

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("result-card");

    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    `;

    resultsDiv.appendChild(card);
  });
}
