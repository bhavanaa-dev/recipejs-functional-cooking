(function () {
  // -----------------------------
  // RECIPE DATA
  // -----------------------------
  const recipes = [
    {
      title: "Veg Sandwich",
      difficulty: "easy",
      time: 10,
      ingredients: ["Bread", "Butter", "Vegetables"],
      steps: [
        "Apply butter on bread",
        "Add vegetables",
        "Close sandwich and serve"
      ]
    },
    {
      title: "Pasta",
      difficulty: "medium",
      time: 25,
      ingredients: ["Pasta", "Sauce", "Cheese"],
      steps: [
        "Boil pasta",
        "Prepare sauce",
        "Mix pasta and sauce"
      ]
    },
    {
      title: "Fried Rice",
      difficulty: "medium",
      time: 20,
      ingredients: ["Rice", "Vegetables", "Soy sauce"],
      steps: [
        "Cook rice",
        "Stir fry vegetables",
        "Mix rice and sauce"
      ]
    },
    {
      title: "Omelette",
      difficulty: "easy",
      time: 8,
      ingredients: ["Eggs", "Salt", "Pepper"],
      steps: [
        "Beat eggs",
        "Cook on pan",
        "Fold and serve"
      ]
    },
    {
      title: "Biryani",
      difficulty: "hard",
      time: 60,
      ingredients: ["Rice", "Spices", "Vegetables"],
      steps: [
        "Cook rice",
        "Prepare masala",
        "Layer and cook"
      ]
    },
    {
      title: "Maggi",
      difficulty: "easy",
      time: 5,
      ingredients: ["Noodles", "Masala"],
      steps: [
        "Boil water",
        "Add noodles and masala",
        "Cook and serve"
      ]
    },
    {
      title: "Salad",
      difficulty: "easy",
      time: 7,
      ingredients: ["Vegetables", "Salt", "Lemon"],
      steps: [
        "Chop vegetables",
        "Add seasoning",
        "Mix and serve"
      ]
    },
    {
      title: "Grilled Cheese",
      difficulty: "medium",
      time: 15,
      ingredients: ["Bread", "Cheese", "Butter"],
      steps: [
        "Butter bread",
        "Add cheese",
        "Grill until golden"
      ]
    }
  ];

  // -----------------------------
  // STATE
  // -----------------------------
  let activeFilter = "all";
  let activeSort = null;
  let searchQuery = "";
  let showFavoritesOnly = false;
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const container = document.getElementById("recipe-container");

  // -----------------------------
  // FILTER + SORT + SEARCH
  // -----------------------------
  function updateDisplay() {
    let result = [...recipes];

    // Filter
    if (activeFilter === "quick") {
      result = result.filter(r => r.time < 30);
    } else if (activeFilter !== "all") {
      result = result.filter(r => r.difficulty === activeFilter);
    }

    // Search
    if (searchQuery) {
      result = result.filter(r =>
        r.title.toLowerCase().includes(searchQuery) ||
        r.ingredients.some(i => i.toLowerCase().includes(searchQuery))
      );
    }

    // Favorites filter
    if (showFavoritesOnly) {
      result = result.filter(r => favorites.includes(r.title));
    }

    // Sort
    if (activeSort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (activeSort === "time") {
      result.sort((a, b) => a.time - b.time);
    }

    renderRecipes(result);
    updateCounter(result.length, recipes.length);
  }

  // -----------------------------
  // RENDER RECIPES
  // -----------------------------
  function renderRecipes(list) {
    container.innerHTML = "";

    list.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";

      card.innerHTML = `
        <h3>
          ${recipe.title}
          <button class="fav-btn">${favorites.includes(recipe.title) ? "❤️" : "🤍"}</button>
        </h3>
        <p>Difficulty: ${recipe.difficulty}</p>
        <p>Time: ${recipe.time} min</p>

        <button class="toggle-btn">Show Ingredients & Steps</button>

        <div class="details" style="display:none;">
          <h4>Ingredients</h4>
          <ul>
            ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
          </ul>

          <h4>Steps</h4>
          <ol>
            ${recipe.steps.map(s => `<li>${s}</li>`).join("")}
          </ol>
        </div>
      `;

      // Toggle details
      card.querySelector(".toggle-btn").addEventListener("click", () => {
        const details = card.querySelector(".details");
        details.style.display = details.style.display === "none" ? "block" : "none";
      });

      // Favorite button
      card.querySelector(".fav-btn").addEventListener("click", () => {
        toggleFavorite(recipe.title);
      });

      container.appendChild(card);
    });
  }

  // -----------------------------
  // FAVORITES
  // -----------------------------
  function toggleFavorite(title) {
    if (favorites.includes(title)) {
      favorites = favorites.filter(t => t !== title);
    } else {
      favorites.push(title);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateDisplay();
  }

  // -----------------------------
  // COUNTER
  // -----------------------------
  function updateCounter(shown, total) {
    let counter = document.getElementById("recipeCount");
    if (!counter) {
      counter = document.createElement("p");
      counter.id = "recipeCount";
      document.querySelector(".controls").appendChild(counter);
    }
    counter.textContent = `Showing ${shown} of ${total} recipes`;
  }

  // -----------------------------
  // EVENT LISTENERS
  // -----------------------------
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      updateDisplay();
    });
  });

  document.querySelectorAll("[data-sort]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeSort = btn.dataset.sort;
      updateDisplay();
    });
  });

  // Search input (created dynamically)
  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search recipes...";
  document.querySelector(".controls").prepend(searchInput);

  let debounceTimer;
  searchInput.addEventListener("input", e => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = e.target.value.toLowerCase();
      updateDisplay();
    }, 300);
  });

  // Favorites-only toggle
  const favToggle = document.createElement("button");
  favToggle.textContent = "❤️ Favorites";
  favToggle.addEventListener("click", () => {
    showFavoritesOnly = !showFavoritesOnly;
    updateDisplay();
  });
  document.querySelector(".controls").appendChild(favToggle);

  // -----------------------------
  // INIT
  // -----------------------------
  updateDisplay();
})();
