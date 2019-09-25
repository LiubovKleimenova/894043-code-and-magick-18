'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопео', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var NUMBER_OF_WIZARDS = 4;

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

//функция, достающая случайный элемент массива
var getRandomElement = function (anyArray) {
  var randomElement = anyArray[Math.floor(Math.random() * anyArray.length)];
  return randomElement;
}

//функция, создающая одного рандомного волшебника
var createSomeWizard = function () {
  var someWizard = {};
  someWizard.name = getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES);
  someWizard.coatColor = getRandomElement(COAT_COLORS);
  someWizard.eyesColor = getRandomElement(EYES_COLORS);
  return someWizard;
};

//функция, создающая массив из n-ного количества волшебников
var createWizardsCollection = function(wizardsNumber) {
  var wizardsCollection = [];
  for (var i = 0; i < wizardsNumber; i++ ) {
    wizardsCollection.push(createSomeWizard());
  }
  return wizardsCollection
}

//создаем массив волшебников
var wizardsArray = createWizardsCollection(NUMBER_OF_WIZARDS);

//функция, которая рендерит одного волшебника
var renderWizard = function (wizard) {
  var similarWizard = similarWizardTemplate.cloneNode(true);
  similarWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  similarWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  similarWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return similarWizard;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizardsArray.length; i++) {
  fragment.appendChild(renderWizard(wizardsArray[i]));
}

similarWizardsList.appendChild(fragment);
