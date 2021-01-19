"use strict";
import Model from "./js/model/model.js";
import Controller from "./js/controller/controller.js";
import View from "./js/view/view.js";

let init = function () {
  if (localStorage.getItem("weather") == null) {
    localStorage.setItem("weather", JSON.stringify([]));
  }

  let view = new View();
  let model = new Model(view);
  let controller = new Controller(view, model);
  model.startWidget();
  setInterval(() => {
    view.delWid();
    model.startWidget();
  }, 3600000);

  view.appRender();
  model.initWeather();
  controller.addHandle();
};

init();
