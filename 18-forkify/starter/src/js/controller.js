import * as model from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Load Recipe
    await model.loadRecipe(id);

    // 2) Rendering

    recipeView.render(model.state.recipe);

    //
  } catch (err) {
    recipeView.renderError(err);
  }
};
// 5ed6604591c37cdc054bc886

const init = function () {
  recipeView.addHendlerRender(controlRecipes);
};
init();
