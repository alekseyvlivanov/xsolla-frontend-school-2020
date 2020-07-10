import events from '../events.json';

const cities = new Set();
const months = new Set();
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getMonthName = (num) => monthNames[parseInt(num, 10)];
const getMonthNumber = (str) => monthNames.findIndex(str);

const selectCity = document.querySelector('#city');
const selectMonth = document.querySelector('#month');
const cards = document.querySelector('.cards');

let city = 'All';
let month = 'All';

const filterEvents = (city, month) => {
  const cardArray = document.querySelectorAll('.card');
  cardArray.forEach((card) => {
    const isVisible =
      (city === 'All' || city === card.dataset.city) &&
      (month === 'All' || month === card.dataset.month);
    card.style.display = isVisible ? '' : 'none';
  });
};

window.addEventListener('DOMContentLoaded', () => {
  events.forEach((event) => {
    const [day, month, year] = event.date.split('.');

    cities.add(event.city);
    months.add(month);

    const card = document.createElement('li');
    card.className = 'card';
    card.dataset.city = event.city;
    card.dataset.month = getMonthName(month);

    const eventDay = document.createElement('div');
    eventDay.className = 'event-day';
    eventDay.innerText = day;

    const eventName = document.createElement('div');
    eventName.className = 'event-name';
    eventName.innerText = event.name;

    const bgImg = new Image();
    bgImg.onload = () => {
      card.style.backgroundImage = `url(${bgImg.src})`;
    };
    bgImg.src = event.image;

    card.append(eventDay);
    card.append(eventName);

    cards.append(card);
  });

  Array.from(cities)
    .sort()
    .forEach((city) => {
      const option = document.createElement('option');
      option.text = city;
      selectCity.add(option);
    });

  Array.from(months)
    .sort()
    .forEach((month) => {
      const option = document.createElement('option');
      option.text = getMonthName(month);
      selectMonth.add(option);
    });
});

selectCity.addEventListener('change', (e) => {
  city = e.target.value;
  filterEvents(city, month);
});

selectMonth.addEventListener('change', (e) => {
  month = e.target.value;
  filterEvents(city, month);
});
