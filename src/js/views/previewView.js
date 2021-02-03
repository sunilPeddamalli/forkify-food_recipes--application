import View from './View.js';
// import icons from '../img/icons.svg' //parcel1
import icons from 'url:../../img/icons.svg' // parcel 2

class PreviewView extends View {
    _parentElement = '';

    _generateMarkup(result) {
        const id = window.location.hash.slice(1)
        return `
        <li class="preview">
            <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.image}" alt="${result.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                </div>
            </a>
        </li>
        `;
    }
};

export default new PreviewView();