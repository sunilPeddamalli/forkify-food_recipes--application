import View from './View.js';
import previewView from './previewView.js';
// import icons from '../img/icons.svg' //parcel1
import icons from 'url:../../img/icons.svg' // parcel 2

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
    _message = '';

    _generateMarkup() {
        return this._data.map(bookmark => previewView._generateMarkup(bookmark)).join('')
    }
};

export default new BookmarksView();