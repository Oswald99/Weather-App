"use strict";
export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  getWeather = () => {
    let city = this.view.mainInput.value;
    this.view.mainInput.value = "";
    this.model.getWeather(city);
  }

  delWeatherCard = (event) => {
    this.model.delCity(event.target.value);
  }

  cngWeatherCard = (event) => {
    this.model.editCity(event.target.value);
  }

  clearCity = () => {
    this.model.clearCity();
  }

  addHandle() {
    this.view.mainButton.addEventListxener("click", this.getWeather);
    this.view.clearButton.addEventListener("click", this.clearCity);cc
    $("#app").on("click", ".del", this.delWeatherCard);
  }
}
