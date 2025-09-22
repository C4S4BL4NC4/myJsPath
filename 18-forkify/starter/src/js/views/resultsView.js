import View from './view';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    return this._data
      .map(recObj => this._generateMarkupPreview(recObj))
      .join('');
  }
  _generateMarkupPreview(recObj) {
    //
    // `
    // <li class="preview">
    //         <a class="preview__link preview__link--active" href="#${this._data.id}">
    //           <figure class="preview__fig">
    //             <img src="${this._data.image}" alt="${this._data.title}" />
    //           </figure>
    //           <div class="preview__data">
    //             <h4 class="preview__title">${this._data.title}</h4>
    //             <p class="preview__publisher">${this._data.publisher}</p>
    //             <div class="preview__user-generated">
    //               <svg>
    //                 <use href="${icons}#icon-user"></use>
    //               </svg>
    //             </div>
    //           </div>
    //         </a>
    //       </li>
    //       `;

    return `
    <li class="preview">
            <a class="preview__link preview__link--active" href="#${recObj.id}">
              <figure class="preview__fig">
                <img src="${recObj.image}" alt="${recObj.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recObj.title}</h4>
                <p class="preview__publisher">${recObj.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
          `;
  }
}

export default new ResultsView();
