/*
recipe, search, and bookmark
*/
import { async } from 'regenerator-runtime';
import { API_URL, SEARCH_API } from './config';
import { getJSON } from './helpers';
import { TESTING } from './config';
import * as ts from './testing';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    // const data = TESTING
    //   ? ts.getFakeRecIdObj(id)
    //   : await getJSON(`${API_URL}recipes/${id}`);

    const data = await getJSON(`${API_URL}recipes/${id}`);

    // console.log(data);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = !TESTING
      ? await getJSON(`${API_URL}recipes?search=${query}`)
      : ts.fakeLoadedRecipes;
    // QUERY pizza
    //https://forkify-api.jonas.io/api/v2/recipes?search=pizza

    // ID
    //https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};
