'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопео', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_WIZARDS = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// функция, достающая случайный элемент массива
var getRandomElement = function (anyArray) {
  var randomElement = anyArray[Math.floor(Math.random() * anyArray.length)];
  return randomElement;
};

// функция, создающая одного рандомного волшебника
var createSomeWizard = function () {
  var someWizard = {};
  someWizard.name = getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES);
  someWizard.coatColor = getRandomElement(COAT_COLORS);
  someWizard.eyesColor = getRandomElement(EYES_COLORS);
  return someWizard;
};

// функция, создающая массив из n-ного количества волшебников
var createWizardsCollection = function (wizardsNumber) {
  var wizardsCollection = [];
  for (var i = 0; i < wizardsNumber; i++) {
    wizardsCollection.push(createSomeWizard());
  }
  return wizardsCollection;
};

// создаем массив волшебников
var wizardsArray = createWizardsCollection(NUMBER_OF_WIZARDS);

// функция, которая рендерит одного волшебника
var renderWizard = function (wizard) {
  var similarWizard = similarWizardTemplate.cloneNode(true);
  similarWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  similarWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  similarWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return similarWizard;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizardsArray.length; i++) {
  fragment.appendChild(renderWizard(wizardsArray[i]));
}

similarWizardsList.appendChild(fragment);

// открытие-закрытие окна по клику
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// валадация
var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// изменение цветов плаща/глаз/фаербола по нажатию

var wizard = document.querySelector('.setup-wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardCoatInput = document.querySelector('.wizard-coat-input');
var wizardEyesInput = document.querySelector('.wizard-eyes-input');
var fireballInput = document.querySelector('.fireball-input');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');

var changeColor = function (thing, colors) {
  var newColor = getRandomElement(colors);
  thing.style.fill = newColor;
  return newColor;
};

var changeFireball = function (thing, colors) {
  var newColor = getRandomElement(colors);
  thing.style.background = newColor;
  return newColor;
};

wizardCoat.addEventListener('click', function () {
  wizardCoatInput.value = changeColor(wizardCoat, COAT_COLORS);
});

wizardEyes.addEventListener('click', function () {
  wizardEyesInput.value = changeColor(wizardEyes, EYES_COLORS);
});

fireball.addEventListener('click', function () {
  fireballInput.value = changeFireball(fireball, FIREBALL_COLORS);
});
