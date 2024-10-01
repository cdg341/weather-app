# Weather App

This Weather App provides current weather forecasts based on a user's zip code. The app uses the AccuWeather API to retrieve location and weather data. Users can search for weather data by zip code, save multiple zip codes for future use, and delete any saved zip codes.

## Features

- Search weather by zip code.
- Save multiple zip codes for quick access.
- View weather forecasts including high/low temperatures, wind speed, chance of rain, and weather conditions.
- Display weather icons based on current conditions.
- Manage saved zip codes (add or delete).

## Prerequisites

Before setting up the project, ensure you have the following:

- A modern web browser (Chrome, Firefox, etc.)
- Internet connection (required for fetching data from the AccuWeather API)
- Basic understanding of JavaScript, HTML, and CSS

## Setup Instructions

### Step 1: Clone the Repository

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/your-username/weather-app.git
```

### Step 2: Obtain an API Key from AccuWeather

1. Go to AccuWeather Developer Portal.
2. Sign up or log in to your account.
3. Create an application in your developer account to obtain an API key.
4. You will need to use this API key in the project to make requests to the AccuWeather API.

### Step 3: Set Up API Key

Once you have your API key, follow these steps to integrate it into the project:

1. Open script.js.
2. Replace the placeholder API key (const apiKey = 'YOUR_API_KEY_HERE';) with your actual AccuWeather API key.

### Step 4: Host the App
To run the app, open your local development server (such as Live Server for VS Code), right-click the index.html and select "Open with Live Server."

## Notable Design & Development Choices
1. **AccuWeather API Usage**:
The app interacts with two endpoints:

- **Location API**: Takes a zip code and returns a location key required for retrieving weather data.
- **Weather Forecast API**: Uses the location key to fetch the 1-day weather forecast with details such as temperature, wind speed, and rain probability.

2. **Weather Icons**:
The app dynamically changes the weather icons based on the forecast received from the API. A switch statement maps AccuWeather's weather codes to corresponding icons stored in the assets/images folder.

3. **Saving Zip Codes**:
The app uses localStorage to save multiple zip codes locally. This ensures that users can access previously searched zip codes even after refreshing the browser. The list of saved zip codes is interactive—users can select a zip code to load the forecast for that location or delete the zip code from the saved list.

4. **Error Handling**:
Error handling is implemented to ensure smooth user experience. If the user enters an invalid zip code, they are alerted with a message to provide a valid zip code.

5. **Loading Indicator**:
Shows a loading screen if the user has slow internet while the data is being fetched.