"use strict";
export default class View {
  constructor() {
    this.appDiv = document.querySelector("#app");
    this.mainContainer = document.createElement("div");
    this.mainRow = document.createElement("div");
    this.cardRow = document.createElement("div");
    this.inputCol = document.createElement("div");
    this.submitCol = document.createElement("div");
    this.clearCol = document.createElement("div");
    this.mainInput = document.createElement("input");
    this.mainButton = document.createElement("button");
    this.clearButton = document.createElement("button");
    this.alertSuccess = document.createElement("div");
    this.widgetBlock = document.createElement('div');


    this.mainContainer.className = "container p-5";
    this.mainRow.className = "form-row align-items-center";
    this.cardRow.className = "row align-items-start";
    this.inputCol.className = "col";
    this.submitCol.className = "col-md-2 col-lg-1 col-xl-1 col-sm-2 col-3";
    this.clearCol.className = "col-md-2 col-lg-1 col-xl-1 col-sm-2 col-3";
    this.mainInput.className = "form-control mb-4";
    this.mainInput.setAttribute ("placeholder", "Search city");
    this.mainButton.className = "btn btn-outline-warning mb-4";
    this.clearButton.className = "btn btn-outline-warning mb-4";
    this.widgetBlock.className = "fixed-bottom row align-items-end";
  }

  appRender() {
    this.mainButton.innerHTML = "Search";
    this.clearButton.innerHTML = "Clear";
    this.inputCol.append(this.mainInput);
    this.submitCol.append(this.mainButton);
    this.clearCol.append(this.clearButton);
    this.mainRow.append(this.inputCol, this.submitCol, this.clearCol);
    this.mainContainer.append(this.mainRow, this.cardRow);
    this.appDiv.append(this.widgetBlock);
    this.appDiv.append(this.mainContainer);
    
  }

  cardRender(weather) {
    this.cardRow.innerHTML = "";
    weather.forEach((value, key) => {
      let weatherCard = document.createElement("div");
      weatherCard.className = "media";
      weatherCard.insertAdjacentHTML("afterbegin",
        `<img src="https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png" class="mr-3"  alt="${key}">
        <div class="media-body clearfix">
        <h5 class="mt-0">${key} ${value.main.temp.toFixed(0)} °C</h5>
        Feels like ${value.main.feels_like.toFixed(0)}°C  |
        ${value.weather[0].description.toUpperCase()}  |
        Wind Speed ${value.wind.speed} m/s  |
        Visibility ${value.visibility / 1000} km
        <button type="button" class="float-right del btn btn-outline-warning btn-sm ml-1" value="${key}">&times;</button>
        </div>`
      );
      this.cardRow.append(weatherCard);
    });
  }

  showWeatherOurCity(weather) {
    let title = document.querySelector("#title");
    title.innerHTML = `${weather.name} ${weather.main.temp.toFixed(0)}°C`;
    this.widgetBlock.insertAdjacentHTML("afterbegin",
    `<div id = "wid2" class="col card ml-5 border-white">
    <img class="card-img" src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"  alt="${weather.weather[0].description}"  style="height:50px;width:50px">
    <h5 class="card-title">${weather.name} ${weather.main.temp.toFixed(0)}°C</h5>
    <p class="card-text">Feels like ${weather.main.feels_like.toFixed(0)}°C</p>
    <p class="card-text">${weather.weather[0].description.toUpperCase()}</p> 
    <p class="card-text">Wind Speed ${weather.wind.speed}m/s</>
    </div>`
);
  }

  showExchangeRates(data) {
    this.widgetBlock.insertAdjacentHTML(
      "afterbegin",
      `<div id = "wid1" class="col-auto order-2">
        <ul class="list-group list-group-flush"> <h5>Currency Exchang</h5>
        <li class="list-group-item">${data[0].ccy}: Buy ${data[0].buy} | Sale ${data[0].sale}</li>
        <li class="list-group-item">${data[1].ccy}: Buy ${data[1].buy} | Sale ${data[1].sale}</li>
        <li class="list-group-item">${data[2].ccy}: Buy ${data[2].buy} | Sale ${data[2].sale}</li>
        </ul>
      </div>`
    );
  }
  

  renderAlert(msg) {
    console.log("alert");
    const mainBlock = document.querySelector("#app");
    this.alertSuccess.innerHTML = msg;
    this.alertSuccess.className = "alert alert-danger text-center mt-2 shadow";
    mainBlock.append(this.alertSuccess);
    setTimeout(() => {
      this.alertSuccess.remove();
    }, 1000);
  }
delWid(){
  let wid1 = document.querySelector("#wid1");
  let wid2 = document.querySelector("#wid2");
  
  wid1.remove();
  wid2.remove();
}
}
