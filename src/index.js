import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './style.css';
import '/node_modules/slim-select/dist/slimselect.css';
import SlimSelect from "slim-select";
import Notiflix from "notiflix";


const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

function slim() {
  new SlimSelect({
    select: refs.select
  });
}

refs.error.classList.add('is-hidden');
refs.catInfo.classList.add('is-hidden');
refs.select.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    refs.select.innerHTML = createList(data);
    slim();
    refs.select.classList.remove('is-hidden');
    refs.loader.classList.replace('loader', 'is-hidden');
  })
  .catch(onFetchError);

refs.select.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  refs.loader.classList.replace('is-hidden', 'loader');
  refs.select.classList.add('is-hidden');
  refs.catInfo.classList.add('is-hidden');
  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      refs.loader.classList.replace('loader', 'is-hidden');
      refs.select.classList.remove('is-hidden');
      createMarkup(data);

      refs.catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function createList(arr) {
  return arr
    .map(({ name, id }) => 
    `<option value="${id}">${name}</option>`)
    .join('');
}

function createMarkup(data) {
  const card = data
    .map(el => {
      return `<li><img src="${el.url}" alt="${el.breeds[0].name}" width="400"/>
      <h2>${el.breeds[0].name}</h2>
      <p>${el.breeds[0].description}</p>
      <h3>Temperament</h3><p>${el.breeds[0].temperament}</p>
      </li>`;
    })
    .join('');
  refs.catInfo.innerHTML = card;
}

function onFetchError(error) {
  refs.select.classList.remove('is-hidden');
  refs.loader.classList.replace('loader', 'is-hidden');
  console.log(error);
  refs.catInfo.innerHTML = '';

  Notiflix.Notify.failure(
    `${refs.error.textContent}`
  );
}
