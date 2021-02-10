import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';



// https://forkify-api.herokuapp.com/v2

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // // 0)update resultview to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // update bookmark view
    bookmarksView.update(model.state.bookmarks);

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

const controlServings = function (newServings) {
  // update recipe serving (in state)
  model.updateServings(newServings);

  // update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Delete Bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deletebookmark(model.state.recipe.id);

  // update recipe
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks)
}

const controlUploadRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // Upload recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    //Success message
    addRecipeView.renderMessage();

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change ID in URl
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }

}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlUploadRecipe);
};
init();