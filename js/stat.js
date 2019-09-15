"use strict";

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var PADDING_TOP = 25;
var PADDING_LEFT = 30;
var PADDING_BOTTOM = 20;

var indent = 50;
var initPositionX = 150;
var initPositionY = 250;
var columnWidth = 40;
var indentTimesValue = 10;

// Функция, возвращающая случайное число между 0 (включительно) и 1 (не включая 1)
var getRandomNum = function () {
    return Math.random();
};
      
// Функция, возвращающая максимальное значение элемента в массиве
var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i ++) {
        if (arr[i] > maxElement) {
            maxElement = arr[i];
        }
    }
    return maxElement;
};

// Функция отрисовки облака
var renderClouds = function(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH + CLOUD_X, CLOUD_HEIGHT + CLOUD_Y);
};

// Функция отрисовки статистики
window.renderStatistics = function(ctx, names, times) {
    // Рисуем тень
    renderClouds(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
    // Рисуем облако
    renderClouds(ctx, CLOUD_X, CLOUD_Y, "white");

    // Сообщение в облаке
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура, вы победили!', CLOUD_X + PADDING_LEFT, CLOUD_Y + PADDING_TOP);
    ctx.fillText('Список результатов:', CLOUD_X + PADDING_LEFT, CLOUD_Y + PADDING_TOP * 2);

    // Находим коэфф для вычисления высоты колонок
    var histogramHeight = 150;
    var rate = histogramHeight / (getMaxElement(times) - 0);

    // Рисуем гистограмму
    for (var i = 0; i < times.length; i++) {
        var columnHeigth = -(Math.floor(times[i] * rate));
        //находим процент насыщенности
        var saturation = Math.floor(getRandomNum()*100) + "%";
        if (names[i] === "Вы") {
            ctx.fillStyle = "rgba(255, 0, 0, 1)";
        } else {
            ctx.fillStyle = "hsl(240, " + saturation + ", 50%)";
        }
        
        ctx.fillRect(CLOUD_X + PADDING_LEFT + columnWidth * i + indent * i, CLOUD_HEIGHT - PADDING_BOTTOM, columnWidth, columnHeigth);

        //Подпись к столбцам гистограммы
        ctx.fillStyle = "#222";
        ctx.fillText(names[i], CLOUD_X + PADDING_LEFT + columnWidth * i + indent * i, CLOUD_HEIGHT);
        ctx.fillText(Math.floor(times[i] / 1000) + "сек", CLOUD_X + PADDING_LEFT + columnWidth * i + indent * i, CLOUD_HEIGHT - PADDING_BOTTOM + columnHeigth - indentTimesValue);
    }
};
