import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput (evt) {
    evt.preventDefault();
    let inputCountry = evt.target.value.trim();
    if (inputCountry) {
         countryInfoEl.innerHTML = '';
         countryListEl.innerHTML = '';
        
        return fetchCountries(inputCountry)
        .then(data => {
            choseMarkup(data);
        })
        .catch(error => {
             countryListEl.innerHTML = '';
            if (error.message === "404"){
                console.log(error.message);
                 return Notify.failure('Oops, there is no country with that name');
            } else  
                {
                 return Notify.failure(error.message);      
                }
        });
    }
    
    
 }

document.body.style.background = "beige";
document.body.style.marginLeft = "40%";
 countryListEl.style.listStyle = 'none';
 
function choseMarkup(countryArr) {
    if (countryArr.length === 1) {
        countryListEl.innerHTML = '';
        return markupCountry(countryArr);
    }
    if (countryArr.length >= 2 && countryArr.length <= 10) {
        countryInfoEl.innerHTML = '';
        return markupCountryItem(countryArr);
    }
    return Notify.info(
        'Too many matches found. Please enter a more specific name.'
    );
}

function markupCountryItem(data) {
    const markup = data.map(el => {
        return `<li class="country-item">
        <img src="${el.flags.svg}" alt="${el.name.official}" width="60" height="40" /> 
        <p>${el.name.official}</p>
        </li>`;
    })
    .join('');
    countryListEl.innerHTML = markup;
}

function markupCountry(data) {
    const markup = data.map(el => {
        return `<h1>
        <img src="${el.flags.svg}" alt="${
         el.name.official
       }" width="60" height="40" /> 
             
         ${el.name.official}
       </h1>
       <ul class="country-info_list">
         <li class="country-info_item">
           <h2>Capital:</h2>
           <p>${el.capital}</p>
         </li>
         <li class="country-info_item">
           <h2>Population:</h2>
           <p>${el.population}</p>
         </li>
         <li class="country-info_item">
           <h2>Languages:</h2>
           <p>${Object.values(el.languages).join(', ')}</p>
         </li>
       </ul>`;
    })
    .join('');
    countryInfoEl.innerHTML = markup;
}
