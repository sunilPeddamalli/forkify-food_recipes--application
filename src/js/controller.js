import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';


// https://forkify-api.herokuapp.com/v2

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //1)loading recipe
    await model.loadRecipe(id)

    // rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  };
};

const controlSearchResults = async function () {
  try {

    resultsView.renderSpinner()

    //1)Get value from search input
    const query = searchView.getQuery();
    if (!query) return;

    //2)loading search result
    await model.loadSearchResults(query);

    // 3) Render search result
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());

    // 4) Render Initial Pagination
    paginationView.render(model.state.search)


  } catch (err) {
    console.log(err)
  }
};

const controlPagination = function (goToPage) {
  // 1) Render search result
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render Initial Pagination
  paginationView.render(model.state.search)
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();