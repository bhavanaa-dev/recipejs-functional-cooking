// ===============================
// RecipeJS Part 3 (Full App)
// Expandable Cards + Recursion + IIFE
// ===============================

const RecipeApp = (() => {
  /* -------------------------
     Recipe Data (Enhanced)
  -------------------------- */

  const recipes = [
    {
      id: 1,
      title: "Creamy Alfredo Pasta",
      time: 25,
      difficulty: "easy",
      description: "A quick creamy pasta dish perfect for dinner.",
      category: "pasta",
      ingredients: ["Pasta", "Cream", "Garlic", "Cheese", "Butter"],
      steps: [
        "Boil pasta in salted water",
        "Prepare creamy sauce with butter + garlic",
        "Mix pasta with sauce",
        "Serve with cheese on top"
      ]
    },

    {
      id: 2,
      title: "Chicken Biryani",
      time: 75,
      difficulty: "hard",
      description: "A flavorful rice dish cooked with spices and chicken.",
      category: "curry",
      ingredients: ["Rice", "Chicken", "Onions", "Spices", "Curd"],
      steps: [
        "Boil rice until 70% cooked",
        {
          step: "Prepare chicken masala",
          substeps: [
            "Fry onions until golden",
            "Add spices and tomatoes",
            "Add chicken and cook well"
          ]
        },
        "Layer rice and chicken masala",
        "Cook on low flame for 20 minutes"
      ]
    },

    {
      id: 3,
      title: "Fresh Veg Salad Bowl",
      time: 15,
      difficulty: "easy",
      description: "A healthy mix of fresh veggies with dressing.",
      category: "salad",
      ingredients: ["Cucumber", "Tomato", "Lettuce", "Olive oil", "Salt"],
      steps: ["Chop vegetables", "Add dressing", "Mix and serve fresh"]
    },

    {
      id: 4,
      title: "Paneer Butter Masala",
      time: 45,
      difficulty: "medium",
      description: "Soft paneer cubes in rich buttery tomato gravy.",
      category: "curry",
      ingredients: ["Paneer", "Tomato", "Butter", "Cream", "Spices"],
      steps: [
        "Prepare tomato gravy",
        "Add butter + spices",
        "Add paneer cubes",
        "Simmer with cream"
      ]
    },

    {
      id: 5,
      title: "Homemade Pizza",
      time: 70,
      difficulty: "hard",
      description: "Cheesy pizza with fresh toppings baked at home.",
      category: "snack",
      ingredients: ["Pizza base", "Cheese", "Sauce", "Veggies"],
      steps: [
        "Prepare toppings",
        {
          step: "Assemble pizza",
          substeps: [
            "Spread sauce on base",
            "Add cheese layer",
            "Add veggies on top"
          ]
        },
        "Bake at 200°C for 15 minutes",
        "Serve hot"
      ]
    },

    {
      id: 6,
      title: "Vegetable Fried Rice",
      time: 30,
      difficulty: "medium",
      description: "Quick fried rice loaded with crunchy vegetables.",
      category: "rice",
      ingredients: ["Rice", "Carrot", "Beans", "Soy sauce", "Spices"],
      steps: ["Cook veggies", "Add rice", "Mix with sauces", "Serve"]
    },

    {
      id: 7,
      title: "Chocolate Mug Cake",
      time: 10,
      difficulty: "easy",
      description: "A soft instant chocolate cake made in a mug.",
      category: "dessert",
      ingredients: ["Flour", "Cocoa", "Sugar", "Milk"],
      steps: ["Mix ingredients", "Microwave for 2 minutes", "Enjoy"]
    },

    {
      id: 8,
      title: "Slow Cooked Dal Tadka",
      time: 65,
      difficulty: "hard",
      description: "Traditional Indian dal cooked slowly with spices.",
      category: "curry",
      ingredients: ["Dal", "Garlic", "Ghee", "Spices"],
      steps: [
        "Boil dal until soft",
        "Prepare tadka with ghee + garlic",
        "Mix tadka into dal",
        "Simmer for 10 minutes"
      ]
    }
  ];

  /* -------------------------
     DOM Selection
  -------------------------- */

  const recipeContainer = document.querySelector("#recipe-container");

  /* -------------------------
     State (Filter + Sort)
  -------------------------- */

  let activeFilter = "all";
  let activeSort = null;

  /* -------------------------
     Recursive Steps Renderer
  -------------------------- */

  const renderStepsRecursive = (steps) => {
    return `
      <ul>
        ${steps
          .map((item) => {
            if (typeof item === "string") {
              return `<li>${item}</li>`;
            }

            return `
              <li>
                <strong>${item.step}</strong>
                ${renderStepsRecursive(item.substeps)}
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
  };

  /* -------------------------
     Ingredients Renderer
  -------------------------- */

  const renderIngredients = (ingredients) => {
    return `
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
      </ul>
    `;
  };

  /* -------------------------
     Recipe Card Creator
  -------------------------- */

  const createRecipeCard = (recipe) => {
    return `
      <div class="recipe-card" data-id="${recipe.id}">

        <h3>${recipe.title}</h3>

        <div class="recipe-meta">
          <span>⏱ ${recipe.time} min</span>
          <span class="difficulty ${recipe.difficulty}">
            ${recipe.difficulty}
          </span>
        </div>

        <p>${recipe.description}</p>

        <!-- Expand Buttons -->
        <button class="toggle-steps">Show Steps</button>
        <button class="toggle-ingredients">Show Ingredients</button>

        <!-- Hidden Expand Sections -->
        <div class="steps hidden">
          <h4>Steps:</h4>
          ${renderStepsRecursive(recipe.steps)}
        </div>

        <div class="ingredients hidden">
          <h4>Ingredients:</h4>
          ${renderIngredients(recipe.ingredients)}
        </div>

      </div>
    `;
  };

  /* -------------------------
     Render Recipes
  -------------------------- */

  const renderRecipes = (recipesArray) => {
    recipeContainer.innerHTML = recipesArray
      .map((recipe) => createRecipeCard(recipe))
      .join("");
  };

  /* -------------------------
     Filter Function (Pure)
  -------------------------- */

  const filterRecipes = (recipesArray, filterType) => {
    if (filterType === "all") return recipesArray;

    if (filterType === "quick") {
      return recipesArray.filter((r) => r.time < 30);
    }

    return recipesArray.filter((r) => r.difficulty === filterType);
  };

  /* -------------------------
     Sort Function (Pure)
  -------------------------- */

  const sortRecipes = (recipesArray, sortType) => {
    const copy = [...recipesArray];

    if (sortType === "name") {
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "time") {
      return copy.sort((a, b) => a.time - b.time);
    }

    return copy;
  };

  /* -------------------------
     Update Display (Central)
  -------------------------- */

  const updateDisplay = () => {
    let updated = filterRecipes(recipes, activeFilter);
    updated = sortRecipes(updated, activeSort);

    renderRecipes(updated);
  };

  /* -------------------------
     Event Handling (Delegation)
  -------------------------- */

  recipeContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".recipe-card");

    if (!card) return;

    if (e.target.classList.contains("toggle-steps")) {
      card.querySelector(".steps").classList.toggle("hidden");
    }

    if (e.target.classList.contains("toggle-ingredients")) {
      card.querySelector(".ingredients").classList.toggle("hidden");
    }
  });

  /* -------------------------
     Filter + Sort Button Events
  -------------------------- */

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      updateDisplay();
    });
  });

  document.querySelectorAll("[data-sort]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeSort = btn.dataset.sort;
      updateDisplay();
    });
  });

  /* -------------------------
     Init App
  -------------------------- */

  const init = () => {
    updateDisplay();
  };

  return { init };
})();

/* -------------------------
   Start the App
-------------------------- */

RecipeApp.init();
