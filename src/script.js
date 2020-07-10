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

window.addEventListener('DOMContentLoaded', () => {
  console.log(events);

  const cards = document.querySelector('.cards');
  events.forEach((event) => {
    const [day, month, year] = event.date.split('.');

    cities.add(event.city);
    months.add(month);

    const card = document.createElement('li');
    card.className = 'card';
    card.innerText = `${event.date} - ${event.name} - ${event.city}`;

    const bgImg = new Image();
    bgImg.onload = () => {
      card.style.backgroundImage = `url(${bgImg.src})`;
    };
    bgImg.src = event.image;

    cards.append(card);
  });

  const selectCity = document.querySelector('#city');
  Array.from(cities)
    .sort()
    .forEach((city) => {
      const option = document.createElement('option');
      option.text = city;
      selectCity.add(option);
    });

  const selectMonth = document.querySelector('#month');
  Array.from(months)
    .sort()
    .forEach((month) => {
      const option = document.createElement('option');
      option.text = getMonthName(month);
      selectMonth.add(option);
    });
});
