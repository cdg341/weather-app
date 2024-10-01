const search = document.querySelector('.search-input');
const highTemp = document.querySelector('.high-temp');
const lowTemp = document.querySelector('.low-temp');
const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const button = document.querySelector('button');
const wind = document.querySelector('.wind');
const rainChance = document.querySelector('.chance-of-rain');
const phrase = document.querySelector('.phrase');
const saveZipcodeButton = document.querySelector('#save-zipcode-button');
const zipcodeList = document.querySelector('#zipcode-list');
const spanText = document.querySelectorAll('span');
const preloader = document.querySelector(".preloader");

// Show and remove loading indicator
const showLoading = () => {
  preloader.classList.add('show');
}

const removeLoading = () => {
  preloader.classList.remove('show');
}

// API keys and URLs
const apiKey = 'Qe7t0F9cFAfObesKa6G1NmLZD8ARewZH';
const postalApi = 'https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=';
const apiUrl = 'https://dataservice.accuweather.com/forecasts/v1/daily/1day/';

// Function to get saved zipcodes from localStorage
const getSavedZipcodes = () => {
  return JSON.parse(localStorage.getItem('zipcodes')) || [];
};

// Function to save zipcodes to localStorage
const saveZipcode = (zipcode) => {
  const zipcodes = getSavedZipcodes();
  if (!zipcodes.includes(zipcode)) {
    zipcodes.push(zipcode);
    localStorage.setItem('zipcodes', JSON.stringify(zipcodes));
    displaySavedZipcodes();
  } else {
    alert('Zipcode is already saved');
  }
};

// Display saved zip codes in the UI
const displaySavedZipcodes = () => {
  const zipcodes = getSavedZipcodes();
  zipcodeList.innerHTML = '';

  zipcodes.forEach((zipcode, index) => {
    const li = document.createElement('li');
    li.textContent = zipcode;
    li.addEventListener('click', () => {
      search.value = zipcode;
      forecast();
      spanText.forEach(element => {
        element.classList.add('show');
      });
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      zipcodes.splice(index, 1);
      localStorage.setItem('zipcodes', JSON.stringify(zipcodes));
      displaySavedZipcodes();
    });

    li.appendChild(deleteButton);
    zipcodeList.appendChild(li);
  });
};

// Get the location key based on zip code
const getZip = async () => {
  const postResponse = await fetch(`${postalApi}${apiKey}&q=${search.value}`);
  const postalData = await postResponse.json();
  
  if (postalData.length > 0) {
    city.textContent = `${postalData[0].LocalizedName}, ${postalData[0].AdministrativeArea.ID}`;
    return postalData[0].Key;
  } else {
    alert('Please enter a valid postal code');
    throw new Error('Postal code not found');
  }
};

// Get the weather forecast using the location key
const forecast = async () => {
  try {
    // Show the loading indicator
    showLoading();

    const locationKey = await getZip();
    const apiResponse = await fetch(`${apiUrl}${locationKey}?apikey=${apiKey}&details=true`);
    const apiData = await apiResponse.json();

    // Update weather details
    lowTemp.textContent = apiData.DailyForecasts[0].Temperature.Minimum.Value + '°';
    highTemp.textContent = apiData.DailyForecasts[0].Temperature.Maximum.Value + '°';
    wind.textContent = `${apiData.DailyForecasts[0].Day.Wind.Speed.Value} ${apiData.DailyForecasts[0].Day.Wind.Speed.Unit}`;
    rainChance.textContent = apiData.DailyForecasts[0].Day.RainProbability + '%';
    phrase.textContent = apiData.DailyForecasts[0].Day.IconPhrase;

    // Update weather icon based on forecast data
    const icon = apiData.DailyForecasts[0].Day.Icon;
    switch (icon) {
      case 1:
      case 2:
      case 3:
        weatherIcon.src = 'assets/images/clear.png';
        break;
      case 4:
      case 6:
      case 7:
      case 8:
        weatherIcon.src = 'assets/images/clouds.png';
        break;
      case 5:
      case 11:
        weatherIcon.src = 'assets/images/mist.png';
        break;
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        weatherIcon.src = 'assets/images/rain.png';
        break;
      case 19:
      case 20:
        weatherIcon.src = 'assets/images/snow.png';
        break;
      default:
        weatherIcon.src = 'assets/images/clear.png';
    }

     // Hide the loading indicator once data is fetched
    removeLoading();

  } catch (error) {
    console.error('Error fetching weather forecast:', error);

    // Hide the loading indicator in case of an error
    removeLoading();
  }
};

// Event listener for saving a zipcode
saveZipcodeButton.addEventListener('click', () => {
  if (search.value !== '') {
    saveZipcode(search.value);
  } else {
    alert('Please enter a zipcode to save');
  }
});

// Event listener for getting the weather forecast on button click
button.addEventListener('click', () => {
  forecast();

  spanText.forEach(element => {
    element.classList.add('show');
  });
});

// Trigger forecast on "Enter" key press
document.addEventListener('keydown', (e) => {
  if (search.value !== '' && e.key === 'Enter') {
    forecast();

    spanText.forEach(element => {
      element.classList.add('show');
    });
  }
});

// Display saved zipcodes when the page loads
document.addEventListener('DOMContentLoaded', displaySavedZipcodes);
