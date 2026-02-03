/* -------------------------
   Step 1: Recipe Data Array
-------------------------- */

const recipes = [
  {
    id: 1,
    title: "Creamy Alfredo Pasta",
    time: 25,
    difficulty: "easy",
    description: "A quick creamy pasta dish perfect for dinner.",
    category: "pasta"
  },

  {
    id: 2,
    title: "Chicken Biryani",
    time: 75,
    difficulty: "hard",
    description: "A flavorful rice dish cooked with spices and chicken.",
    category: "curry"
  },

  {
    id: 3,
    title: "Fresh Veg Salad Bowl",
    time: 15,
    difficulty: "easy",
    description: "A healthy mix of fresh veggies with dressing.",
    category: "salad"
  },

  {
    id: 4,
    title: "Paneer Butter Masala",
    time: 45,
    difficulty: "medium",
    description: "Soft paneer cubes in rich buttery tomato gravy.",
    category: "curry"
  },

  {
    id: 5,
    title: "Homemade Pizza",
    time: 70,
    difficulty: "hard",
    description: "Cheesy pizza with fresh toppings baked at home.",
    category: "snack"
  },

  {
    id: 6,
    title: "Vegetable Fried Rice",
    time: 30,
    difficulty: "medium",
    description: "Quick fried rice loaded with crunchy vegetables.",
    category: "rice"
  },

  {
    id: 7,
    title: "Chocolate Mug Cake",
    time: 10,
    difficulty: "easy",
    description: "A soft instant chocolate cake made in a mug.",
    category: "dessert"
  },

  {
    id: 8,
    title: "Slow Cooked Dal Tadka",
    time: 65,
    difficulty: "hard",
    description: "Traditional Indian dal cooked slowly with spices.",
    category: "curry"
  }
];

let activeFilter = "all";
let activeSort = null;

const filterRecipes = (recipesArray, filterType) => {
  if (filterType === "all") return recipesArray;

  if (filterType === "quick") {
    return recipesArray.filter((r) => r.time < 30);
  }

  return recipesArray.filter((r) => r.difficulty === filterType);
};
const sortRecipes = (recipesArray, sortType) => {
  const copiedArray = [...recipesArray];

  if (sortType === "name") {
    return copiedArray.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sortType === "time") {
    return copiedArray.sort((a, b) => a.time - b.time);
  }

  return copiedArray;
};
const updateDisplay = () => {
  let updatedRecipes = filterRecipes(recipes, activeFilter);
  updatedRecipes = sortRecipes(updatedRecipes, activeSort);

  renderRecipes(updatedRecipes);
};

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
   Step 2: DOM Selection
-------------------------- */

const recipeContainer = document.querySelector("#recipe-container");


/* -------------------------
   Step 3: Create Recipe Card Function
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

    </div>
  `;
};


/* -------------------------
   Step 4: Render Recipes Function
-------------------------- */

const renderRecipes = (recipesArray) => {
  const allCards = recipesArray
    .map((recipe) => createRecipeCard(recipe))
    .join("");

  recipeContainer.innerHTML = allCards;
};


/* -------------------------
   Step 5: Initialize the App
-------------------------- */

updateDisplay();
