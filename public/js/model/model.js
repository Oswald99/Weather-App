"use strict";

export default class Model {
  constructor(view) {
    this.weather = new Map();
    this.view = view;
    this.apiKey = "53167f951adbd29310abb990aee52a16";
  }


  getGeolocation() {
    fetch("http://ip-api.com/json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.getWeatherOurCity(data.city);
      })
      .catch((err) => console.log("request failed", err));
  }
  startWidget() {
    
    this.getRate();
    this.getGeolocation();
  }

  getWeatherOurCity(cityData) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityData}&units=metric&APPID=${this.apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.view.showWeatherOurCity(data);
        
      })
      .catch((err) => console.log("Request Failed", err));
  }


  getRate() {
    fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.view.showExchangeRates(data);
        console.log(data);
      })
      .catch((err) => console.log("Request Failed", err));
  }

  getWeather(city) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.apiKey}`
    ).then((response) => {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        this.view.renderAlert("This city does not exist");

        return;
      }

      response.json().then((data) => {
        if (!this.weather.has(data.name)) {
          this.setWeather(data.name, data);

          this.renderWeatherCard();
        } else {
          this.view.renderAlert("This city has already been added");
        }
      });
    });
  }

  renderWeatherCard() {
    this.view.cardRender(this.weather);
  }

  
  setWeather(city, data) {
    this.weather.set(city, data);
    localStorage.setItem("weather", JSON.stringify([...this.weather.keys()]));
  }
 
  delCity(city) {
    
    this.weather.delete(city);
    localStorage.setItem("weather", JSON.stringify([...this.weather.keys()]));
    this.renderWeatherCard();
    this.view.renderAlert("Сity removed");
  }

  editCity(city) {
    this.weather.delete(city);
    localStorage.setItem("weather", JSON.stringify([...this.weather.keys()]));
    this.view.mainInput.value = city;
    
  }

  clearCity() {
    this.weather.clear();
    localStorage.setItem("weather", JSON.stringify([...this.weather.keys()]));
    this.renderWeatherCard();
    this.view.renderAlert("City list cleared");
    
  }

  initWeather(){
    let db = JSON.parse(localStorage.getItem("weather"));
    db.forEach((value) => {
    this.getWeather(value);
    });
  }
}
