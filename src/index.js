import { slice } from 'lodash';
import './style.css';

const h1 = document.querySelector('h1');
// function comp() {
//     // Lodash, currently included via a script, is required for this line to work
//     // element.textContent = _.join(['Hello', 'webpack'], ' ');
//     // return element;
// }
// document.body.append(comp());


// function getApi() {
//     return fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=02aac3f8bc0f0ae8dc16cdcea142f857', { mode: 'cors' })
//         .then(resource => {
//             const arr = resource.json()
//             return (arr);
//         })
//         .then(data => {
//             console.log(data[0].name);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }
// getApi()

const mainSection = document.querySelector('.mainSection');
const inputCountry = document.querySelector('.inputCountry');
const submitBtn = document.querySelector('#submitBtn');
const temp1 = document.querySelector('.temp1');
const temp2 = document.querySelector('.temp2');
const element = document.createElement('div');

const locationName = document.querySelector('.locationName');
const humidity = document.querySelector('.humidity');
const visibility = document.querySelector('.visibility');



const WeatherMain = document.querySelector('.WeatherMain');
const temperature = document.querySelector('.temperature');
const temperatureMin = document.querySelector('.temperatureMin');
const temperatureMax = document.querySelector('.temperatureMax');


const time = document.querySelector('.time');
const date = document.querySelector('.date');

async function getAPI(placeName) {
    // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&cnt=3&appid=02aac3f8bc0f0ae8dc16cdcea142f857`, { mode: 'cors' })
    // const data = await res.json();
    // console.log(currentData)

    try {
        const response = await Promise.all(
            [
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${placeName}&cnt=3&appid=02aac3f8bc0f0ae8dc16cdcea142f857&units=metric`, { mode: 'cors' }),
                fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${placeName}&appid=02aac3f8bc0f0ae8dc16cdcea142f857&units=metric`, { mode: 'cors' })
            ]
        );
        const fetchAllUrl = Promise.all(response.map(each => each.json()));
        const data = await fetchAllUrl;
        console.log(data);
        locationName.textContent = `${data[0].name}, ${data[0].sys.country}`;
        humidity.textContent = `${data[0].main.humidity}%`;
        visibility.textContent = data[0].visibility;


        console.log(data[0].weather[0].main)
        WeatherMain.textContent = data[0].weather[0].description;
        temperature.textContent = `${data[0].main.temp}℃`;
        temperatureMin.textContent = `${data[0].main.temp_min}℃`;
        temperatureMax.textContent = `${data[0].main.temp_max}℃`;

        const offset = data[0].timezone * 1000;
        console.log(offset);
        if (offset > 0) {
            // const sike = formatTime(data[0].dt + offset);
            const timeValue = new Date(data[0].dt * 1000 + offset).toUTCString();
            const sliceTime = timeValue.slice(17, 23);
            const hour = sliceTime.slice(0, 2);
            const sliceDay = timeValue.slice(0, 16);
            // console.log(sliceDay)

            if (hour >= 0 && hour < 12) {
                time.textContent = `${sliceTime}am`;

            }
            else {
                time.textContent = `${sliceTime}pm`;
            }
            date.textContent = sliceDay;
        }
        else {
            // const sike = formatTime(data[0].dt - offset);
            const timeValue = new Date(data[0].dt * 1000 - -offset).toUTCString();
            const sliceTime = timeValue.slice(17, 23)
            const hour = sliceTime.slice(0, 2);
            const sliceDay = timeValue.slice(0, 16);
            // console.log(sliceDay);

            if (hour >= 0 && hour < 12) {
                time.textContent = `${sliceTime}am`;
            }
            else {
                time.textContent = `${sliceTime}pm`;
            }
            date.textContent = sliceDay;
        }

    }
    catch (err) {
        throw new Error(err);
    }
}

// function formatTime(s) {
//     const dtFormat = new Intl.DateTimeFormat('en-GB', {
//         timeStyle: 'medium',
//         timeZone: 'UTC'
//     });

//     return dtFormat.format(new Date(s * 1e3));
// }


async function getAPI1(name) {
    // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=london&appid=02aac3f8bc0f0ae8dc16cdcea142f857&units=imperial`, { mode: 'cors' })
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=london&appid=02aac3f8bc0f0ae8dc16cdcea142f857`, { mode: 'cors' })
    const data = await res.json();
    console.log(data);
    element.textContent = data.main.temp;
    mainSection.body.append(element);
}

function submitBtnPressed() {
    submitBtn.addEventListener('click', e => {
        e.preventDefault();
        const getCountryName = inputCountry.value;
        console.log(getCountryName)
        getAPI(getCountryName)
        // time.textContent = '';
        // setTimeout(getAPI, 1000);


    })
}
function changeTemp() {
    temp2.addEventListener("click", async e => {
        // const element = document.createElement('div');
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=london&appid=02aac3f8bc0f0ae8dc16cdcea142f857&units=metric`, { mode: 'cors' })
        // const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=02aac3f8bc0f0ae8dc16cdcea142f857`, { mode: 'cors' })
        const data = await res.json();
        console.log(data);
        element.textContent = data.main.temp;
        // document.body.append(element);
    })

    temp1.addEventListener("click", async e => {
        // const element = document.createElement('div');
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=london&appid=02aac3f8bc0f0ae8dc16cdcea142f857&units=imperial`, { mode: 'cors' })
        // const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=02aac3f8bc0f0ae8dc16cdcea142f857`, { mode: 'cors' })
        const data = await res.json();
        console.log(data);
        element.textContent = data.main.temp;
        // document.body.append(element);
    })
}

// getAPI1()
changeTemp()
submitBtnPressed()