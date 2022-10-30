const textElement = document.getElementById('text'),
  optionButtonsElement = document.getElementById('option-buttons');

// стан (відстежуємо, які предмети є в наявності у гравця)
let state = {};

// Запуск гри
function startGame() {
  state = {}
  showTextNode(1)
}

// відображення тексту при виборі варінту відповіді
function showTextNode(textNodeIndex) {
  // відображаємо опис глави нашого квеста
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  // видаляємо варіанти відповідей
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  // перебираємо всі варіанти відповідей по главі квеста
  textNode.options.forEach(option => {
    // умова відображення варіантів відповіді відповідно до наявності предметів гравця
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  })
}
// перевірка на наявність предметів у гравця
function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

// вибір варінтів відповідей
function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  // створюємо об'єкт, який ми встановлюємо у поточний стан
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

// історія квесту і варінти розвитку подій
const textNodes = [
  {
    id: 1,
    text: 'Ви берете участь у секретній місії під назвою "Кінець війні". Місія дуже небезпечна. Перед вами стоїть остання можливість відмовитись. Після підтверждення вас відправлять у Британію.',
    options: [
      {
        text: 'Ні, я не вірю в себе',
        nextText: 1.2
      },
      {
        text: 'Так, я хочу якнайшвидшої перемоги України',
        nextText: 2
      },
      {
        text: 'Я зможу виконати місію без поїздки в Британію',
        nextText: 1.1
      }
    ]
  },
  {
    id: 1.1,
    text: 'В Британії вас підготують і видадуть необхідні для виконання місії речі',
    options: [
      {
        text: 'Ні, я руками задушу Путіна',
        nextText: 1.3
      },
      {
        text: 'Так, звісно. Без підготовки нічого не вийде. Вирушаємо в Британію.',
        nextText: 2
      }
    ]
  }
]

startGame()