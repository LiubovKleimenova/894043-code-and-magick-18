'use strict';


// константы для облака
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = "rgba(0, 0, 0, 0.7)";
var GAP = 10;

var CLOUD_PADDING = 20;
var LINE_HEIGHT = 18;

var FONT_STYLE = '16px PT Mono';

// константы и переменные для столбцов гистограммы
var MAX_COLUMN = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var GAP_COLUMN_NAME = 10;

var namesY = CLOUD_Y + CLOUD_HEIGHT - CLOUD_PADDING;
var columnY =  CLOUD_Y + CLOUD_HEIGHT - CLOUD_PADDING-LINE_HEIGHT;


// рисование прямоугольного облачка
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}


//  поиск максимального элемента в массиве
var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, (CLOUD_X + GAP), (CLOUD_Y + GAP), SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = '#000';
  ctx.font = FONT_STYLE;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING + LINE_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X+CLOUD_PADDING+(COLUMN_WIDTH+COLUMN_GAP)*i, namesY);

    ctx.fillStyle = 'hsl(240,  ' + Math.random() * 100 + '%, ' + Math.random() * 100 + '%)';
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    times[i]=Math.round(times[i]);

    var columnHeight = (MAX_COLUMN * times[i]) / maxTime;

    ctx.fillRect(CLOUD_X + CLOUD_PADDING + (COLUMN_WIDTH + COLUMN_GAP) * i, columnY, COLUMN_WIDTH, -columnHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(times[i], CLOUD_X + CLOUD_PADDING + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - columnHeight - CLOUD_PADDING - LINE_HEIGHT - GAP_COLUMN_NAME);
  }
};
