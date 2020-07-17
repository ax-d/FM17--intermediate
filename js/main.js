const page = document.querySelector('.page');
const filterItems = document.querySelector('.filter-items');
let filterBarFilters = [];
let cards = [];
let windowWidth = 0;
const cardHousing = document.querySelector('.wrapper--content');

let requestURL = '../data/data.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responsType = 'json';
request.send();

request.onload = function () {
    showCards(request.response);
    addFeatured();
}



page.addEventListener('click', init, false);
addFeatured();

function init(e) {
    if (hasClassName(event, 'clear-filter')) {
        stateChange(clearFilterBar());
    } else if (hasClassName(event, 'btn--remove')) {
        stateChange(removeFromFilterBar());
    } else if (hasClassName(event, 'card__filter-item')) {
        stateChange(addToFilterBar(filterItems));
    }

    windowWidth = window.outerWidth;
}

function addFeatured() {
    let cards = document.querySelectorAll('.m-card');
    if (cards !== 0) {
        cards.forEach((value, index) => {
            if (value.querySelector('.a-featured')) {
                cards[index].style.borderColor = 'var(--desaturated-dark-cyan)';
            }
        })
    }
}

function hasClassName(event, name) {
    if (event.target.className.includes(name) || event.target.parentNode.className.includes(name))
        return true;
    return false;
}

function stateChange(currentItems) {
    if (currentItems === 0) {
        filterItems.parentNode.classList.add('hide');
    } else {
        filterItems.parentNode.classList.remove('hide');
    }
}

function createFilterArray(filterObject) {
    let filterArray = [];

    filterObject.querySelectorAll('.a-filterItem').forEach((value, index) => {
        filterArray[index] = value.textContent;
    });

    return filterArray;
}

function addToFilterBar(currentFilters) {
    let filterBarGroup = document.querySelectorAll('.filterItem-group');
    let hasFilter = false;

    if (windowWidth < 1000){
        cardHousing.parentElement.classList.remove('heightItems');
    }

    filterBarGroup.forEach(value => {
        if (event.target.innerHTML === value.querySelector('.a-filterItem').innerHTML)
            hasFilter = true;
    });

    if (!hasFilter) {
        currentFilters.innerHTML += '<div class="filterItem-group"><p class="a-filterItem">' + event.target.innerHTML + '</p><button class="btn--remove" type="button"><img src="/img/icon-remove.svg" alt="close icon" class="img--remove"></button></div>';
        flipCards(createFilterArray(currentFilters));
        return 1;
    }

    if (hasFilter)
        return 1;

    return 0;
}

function removeFromFilterBar() {
    filterBarFilters.forEach((value, index) => {
        if (value === (createFilterArray(event.target.parentNode.parentNode)[0])) {
            event.target.parentNode.parentNode.remove();
            filterBarFilters.splice(index, 1);
        }
    })

    flipCards(filterBarFilters);

    return filterItems.querySelectorAll('.filterItem-group').length;
}

function clearFilterBar() {
    filterBarFilters = [];

    document.querySelectorAll('.filterItem-group').forEach((value, index) => {
        value.remove();
    });

    flipCards(filterBarFilters);

    if (windowWidth < 1000)
        cardHousing.parentElement.classList.add('heightItems');

    return 0;
}

function flipCards(filterKeywords) {
    let jobCards = document.querySelectorAll('.m-card');

    jobCards.forEach((value, index) => {
        let keywordCounter = 0;
        let jobKeywordCounter = 0;
        value.querySelectorAll('.a-filterItem').forEach(jobKeyword => {
            for (let i = 0; i < filterKeywords.length; i++) {
                if (jobKeyword.textContent === filterKeywords[i]) {
                    filterBarFilters[i] = filterKeywords[i];
                    jobKeywordCounter++;
                }
                keywordCounter = filterKeywords.length;
            }
        })

        if (jobKeywordCounter < keywordCounter)
            jobCards[index].classList.add('hide');
        else
            jobCards[index].classList.remove('hide');
    })
}

function addFeatured() {
    let cards = document.querySelectorAll('.m-card');
    if (cards !== 0) {
        cards.forEach((value, index) => {
            if (value.querySelector('.a-featured')) {
                cards[index].style.borderColor = 'var(--desaturated-dark-cyan)';
            }
        })
    }
}

function jsonTest(jsonObj) {
    for (let i = 0; i < jsonObj.length; i++) {
        console.log(jsonObj[i])
    }
}

function showCards(jsonObj) {
    const jsonCards = JSON.parse(jsonObj);

    for (let i = 0; i < jsonCards.length; i++) {

        const cardClass = document.createElement('div');
        cardClass.classList = 'm-card card';

        const cardImg = document.createElement('img');
        cardImg.classList = 'img card__img a-logoImg';

        const cardInfo = document.createElement('div');
        cardInfo.classList = 'card__info m-cardInfo';

        const cardInfoHead = document.createElement('div');
        cardInfoHead.classList = 'info__head';

        const cardNameCompany = document.createElement('h2');
        cardNameCompany.classList = 'info__name a-nameCompany';

        const cardJobPosition = document.createElement('h3');
        cardJobPosition.classList = 'info__position a-position';

        const cardInfoSub = document.createElement('div');
        cardInfoSub.classList = 'info__sub';

        const cardPostDate = document.createElement('p');
        cardPostDate.classList = 'info__post a-postDate';

        const cardContract = document.createElement('p');
        cardContract.classList = 'info__contract a-contract';

        const cardLocation = document.createElement('p');
        cardLocation.classList = 'info__location a-location';

        const cardCategories = document.createElement('div');
        cardCategories.classList = 'card__categories m-categories';


        cardHousing.appendChild(cardClass);
        cardClass.appendChild(cardImg);
        cardImg.src = jsonCards[i]['logo'];
        cardImg.alt = jsonCards[i]['company'] + ' logo';
        cardClass.appendChild(cardInfo);
        cardInfo.appendChild(cardInfoHead);
        cardInfoHead.appendChild(cardNameCompany);
        cardNameCompany.textContent = jsonCards[i]['company'];

        if (jsonCards[i]['new'] === true) {
            const cardNew = document.createElement('p');
            cardNew.classList = 'info__new a-new';
            cardInfoHead.appendChild(cardNew);
            cardNew.textContent = 'New';
        }

        if (jsonCards[i]['new'] === true) {

            const cardFeatured = document.createElement('p');
            cardFeatured.classList = 'info__featured a-featured';
            cardInfoHead.appendChild(cardFeatured);
            cardFeatured.textContent = 'Featured';
        }

        cardInfo.appendChild(cardJobPosition);
        cardJobPosition.textContent = jsonCards[i]['position'];

        cardInfo.appendChild(cardInfoSub);

        cardInfoSub.appendChild(cardPostDate);
        cardPostDate.textContent = jsonCards[i]['postedAt'];

        cardInfoSub.appendChild(cardContract);
        cardContract.textContent = jsonCards[i]['level'];

        cardInfoSub.appendChild(cardLocation);
        cardLocation.textContent = jsonCards[i]['location'];

        cardClass.appendChild(cardCategories);

        for (let j = 0; j < jsonCards[i]['languages'].length; j++) {
            const cardFilterItem = document.createElement('button');
            cardFilterItem.classList = 'card__filter-item a-filterItem';
            cardFilterItem.type = 'button';

            cardCategories.appendChild(cardFilterItem);
            cardFilterItem.textContent = jsonCards[i]['languages'][j];
        }

        for (let j = 0; j < jsonCards[i]['tools'].length; j++) {
            const cardFilterItem = document.createElement('button');
            cardFilterItem.classList = 'card__filter-item a-filterItem';
            cardFilterItem.type = 'button';

            cardCategories.appendChild(cardFilterItem);
            cardFilterItem.textContent = jsonCards[i]['tools'][j];
        }
    }
}