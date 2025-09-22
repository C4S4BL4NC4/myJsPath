import * as model from './model.js';
import { TESTING } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import View from './views/view.js';

// const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

// TOGGLE TESTING FROM CONFIG FILE:

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

    //
  } catch (err) {
    console.error(err);
    recipeView.renderError(err);
  }
};
// 5ed6604591c37cdc054bc886

const controlSearchResults = async function () {
  resultsView.renderSpinner();
  // 1) Get Search Query
  const query = searchView.getQuery().toLowerCase();
  if (!query) return;

  try {
    // 2) Load Search Results
    await model.loadSearchResults(query);
    // model.state.search.results.map(rec => resultsView.render(rec));

    // 3) Render Results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHendlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
