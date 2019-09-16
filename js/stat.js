'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var PADDING_TOP = 25;
var PADDING_LEFT = 30;
var PADDING_BOTTOM = 20;

var INDENT = 50;
var COLUMN_WIDTH = 40;
var INDENT_TIMES_VALUE = 10;
var HISTOGRAM_HEIGHT = 150;

// Функция, возвращающая случайное число между 0 (включительно) и 1 (не включая 1)
var getRandomNum = function () {
  return Math.random();
};

// Функция, возвращающая максимальное значение элемента в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// Функция отрисовки облака
var renderClouds = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH + CLOUD_X, CLOUD_HEIGHT + CLOUD_Y);
};

var writeMessage = function (ctx, colorText, font, firstStroke, sndStroke) {
  ctx.fillStyle = colorText;
  ctx.font = font;
  ctx.fillText(firstStroke, CLOUD_X + PADDING_LEFT, CLOUD_Y + PADDING_TOP);
  ctx.fillText(sndStroke, CLOUD_X + PADDING_LEFT, CLOUD_Y + PADDING_TOP * 2);
};

// Функция отрисовки гистограммы
var renderHistogram = function (ctx, colorSign, names, times) {
  // Находим коэфф для вычисления высоты колонок
  var rate = HISTOGRAM_HEIGHT / (getMaxElement(times) - 0);

  for (var i = 0; i < times.length; i++) {
    var columnHeigth = -(Math.floor(times[i] * rate));

    // находим процент насыщенности
    var saturation = Math.floor(getRandomNum() * 100) + '%';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + saturation + ', 50%)';
    }

    ctx.fillRect(CLOUD_X + PADDING_LEFT + COLUMN_WIDTH * i + INDENT * i, CLOUD_HEIGHT - PADDING_BOTTOM, COLUMN_WIDTH, columnHeigth);
    ctx.fillStyle = colorSign;
    ctx.fillText(names[i], CLOUD_X + PADDING_LEFT + COLUMN_WIDTH * i + INDENT * i, CLOUD_HEIGHT);
    ctx.fillText(Math.floor(times[i] / 1000) + 'сек', CLOUD_X + PADDING_LEFT + COLUMN_WIDTH * i + INDENT * i, CLOUD_HEIGHT - PADDING_BOTTOM + columnHeigth - INDENT_TIMES_VALUE);
  }
};

// Функция отрисовки статистики
window.renderStatistics = function (ctx, names, times) {
  // Рисуем тень
  renderClouds(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  // Рисуем облако
  renderClouds(ctx, CLOUD_X, CLOUD_Y, 'white');

  // Сообщение в облаке
  writeMessage(ctx, '#000', '16px PT Mono', 'Ура, вы победили!', 'Список результатов:');
  // Рисуем гистограмму
  renderHistogram(ctx, '#000', names, times);
};
