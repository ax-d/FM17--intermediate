const filterBar = document.querySelector('.filter-bar');
const pageContent = document.querySelector('.page__content');

const clearFilter = document.querySelector('.clear-filter');

clearFilter.addEventListener('click', function () {
    filterBar.style.display = 'none';

    if (window.screen.width < 1250)
        pageContent.style.paddingTop = '56px';

});