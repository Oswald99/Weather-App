"use strict";
export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.getWeather = this.getWeather.bind(this);
    this.cngWeatherCard = this.cngWeatherCard.bind(this);
    this.delWeatherCard = this.delWeatherCard.bind(this);
    this.clearCity = this.clearCity.bind(this);
  }

  getWeather() {
    let city = this.view.mainInput.value;
    this.view.mainInput.value = "";
    this.model.getWeather(city);
  }

  delWeatherCard(event) {
    this.model.delCity(event.target.value);
  }

  cngWeatherCard(event) {
    this.model.editCity(event.target.value);
  }

  clearCity() {
    this.model.clearCity();
  }
  addHandle() {
    this.view.mainButton.addEventListener("click", this.getWeather);
    this.view.clearButton.addEventListener("click", this.clearCity);
    $("#app").on("click", ".del", this.delWeatherCard);
    $("#app").on("click", ".cng", this.cngWeatherCard);
  }
}
