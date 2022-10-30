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
  },
  {
    id: 1.2,
    text: 'Ми допоможемо вам підготуватись і віримо в ваші сили!',
    options: [
      {
        text: 'Добре, я зроблю все від мене залежне. Я готовий до пригод.',
        nextText: 2
      }
    ]
  },
  {
    id: 1.3,
    text: 'Ви потрапили до Росії, але у вас немає навичок та предметів, щоб наблизитись до Путіна. Вас вбивають, коли ви намагаєтесь проникнути в Кремль.',
    options: [
      {
        text: 'Почати спочатку',
        nextText: -1
      }
    ]
  },
  {
    id: 2,
    text: 'Ви прибули в Лондон. Від подальшого вибору залежатиме успішність місії.',
    options: [
      {
        text: 'Відправитися в школу чародійства Hogwarts (так так, вона існує) і освоїти навички чаклування',
        nextText: 3
      },
      {
        text: 'Відправитися в МІ-6 і освоїти навички розвідки',
        nextText: 4
      },
      {
        text: 'Відправитися в казарми, де Ви оволодієте навичками тактики бою і володіння зброєю',
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: 'Ви прибули до школи чародійства. Всі дуже раді вас бачити і кожен хоче допомогти. Дуже хочется вивчити все, але немає на це часу і треба вибирати. Вже скоро треба переправлятись в Росію через таємний тунель з Фінляндії',
    options: [
      {
        text: 'Пройти курс по зілляварення та отримати чарівну паличку, трави і колбу',
        setState: { herbsАndPotionFlask: true, magicWand: true, potions: true },
        nextText: 6
      },
      {
        text: 'Прийняти подарунок мантію невидимку, чарівну паличку і мапу мародерів',
        setState: { invisibilityCloak: true, magicWand: true, maraudersMap: true },
        nextText: 6
      },
      {
        text: 'Отримати чарівну паличку та вивчити закляття Авада Кедавра',
        setState: { magicWand: true, deathSpells: true },
        nextText: 6
      },
    ]
  },
  {
    id: 4,
    text: 'Ви володієте навичками розвідки і ніндзюцу і можете відправитись в Росію. Тепер ви зможете з легкісттю проникнути до Путіна.',
    options: [
      {
        text: 'Взяти з собою сюрікен',
        setState: { shuriken: true, ninja: true },
        nextText: 6
      },
      {
        text: 'Взяти з собою ніж',
        setState: { knife: true, ninja: true },
        nextText: 6
      },
      {
        text: 'Взяти з собою кунай',
        setState: { kunai: true, ninja: true },
        nextText: 6
      },
      {
        text: 'Взяти з собою пістолет і глушник',
        setState: { gun: true, ninja: true },
        nextText: 6
      }
    ]
  },
  {
    id: 5,
    text: 'Тепер ви ідеальний солдат. Вам пропонують взяти з собою будь-яку зброю і відправитись в Росію через підземний тонель з Фінляндії',
    options: [
      {
        text: 'Взяти автомат',
        setState: { superGun: true },
        nextText: 6
      },
      {
        text: 'Взяти гранатомет',
        setState: { superGun: true },
        nextText: 6
      },
      {
        text: 'Взяти пулемет',
        setState: { superGun: true, hardWeapon: true },
        nextText: 5.1
      }
    ]
  },
  {
    id: 5.1,
    text: 'Пулемет виявився занадто важким...Варто змінити його на іншу зброю.',
    options: [
      {
        text: 'Взяти іншу зброю',
        nextText: 5
      },
      {
        text: 'Продовжити місію з пулеметом',
        nextText: 6
      }
    ]
  },
  {
    id: 6,
    text: 'Ви пробрались в Кремль і знаходитесь в безпечній кімнаті. По даним від розвідки США Путін знаходиться в своєму кабінеті поверхом вище. По дорозі багато охорони. Що будете робити? В цей момент до кімнати хтось підходить. Я чую голос Шойгу.',
    options: [
      {
        text: 'Відкриваю двері з іншої сторони кімнати і заходжу в неї.',
        requiredState: (currentState) => currentState.herbsАndPotionFlask,
        nextText: 6.1
      },
      {
        text: "Коли він зайшов до кімнати я підкрадаюсь позаду і вирубаю його. Беру волос Шойгу, варю зілля і випиваю його. Теперь я зовні один в один як Шойгу. Їдемо на аудієнцію до Путіна.",
        requiredState: (currentState) => currentState.herbsАndPotionFlask,
        nextText: 8
      },
      {
        text: 'Надягаю мантію невидимку і виходжу в коридор розминувшись з Шойгу. Хоча він такий дурень, що без мантії не побачив би мене))',
        requiredState: (currentState) => currentState.invisibilityCloak,
        nextText: 7
      },
      {
        text: 'Він заходить і я використовую закляття Авада Кедавра. Шойгу падає... Я виходжу в коридор.',
        requiredState: (currentState) => currentState.deathSpells,
        nextText: 7
      },
      {
        text: 'Використовуючи навички ніндзюцу підкрадась до Шойгу і знешкоджую його. Виходжу в коридор.',
        requiredState: (currentState) => currentState.ninja,
        nextText: 7
      },
      {
        text: 'Використовую зброю, що взяв з собою з Британії і вбиваю Шойгу.',
        requiredState: (currentState) => currentState.ninja,
        nextText: 7
      },
      {
        text: 'Відкриваю двері з іншої сторони кімнати і заходжу в неї.',
        requiredState: (currentState) => currentState.hardWeapon,
        nextText: 6.1
      },
      {
        text: 'Як заходить Шойга стріляю в нього і вибігаю в коридор',
        requiredState: (currentState) => !currentState.hardWeapon && currentState.superGun,
        nextText: 7
      }
    ]
  },
  {
    id: 6.1,
    text: 'Ви потрапляєте в невеличку кімнату, з якої немає виходу. Це глухий кут. Треба повернутися назад',
    options: [
      {
        text: 'Повернутися назад',
        nextText: 6
      },
      {
        text: 'Ви занадто стомлені і засипаєте',
        requiredState: (currentState) => currentState.hardWeapon,
        nextText: 6.2
      },
    ]
  },
  {
    id: 6.2,
    text: "Вас знаходить Шойгу. Тепер ви в'язень і не зможете закінчити місію.",
    options: [
      {
        text: 'Почати спочатку',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'В коридорі знаходиться багато охоронців',
    options: [
      {
        text: 'Намагаюся їх всіх вбити за допомогою закляття Авада Кедавра.',
        requiredState: (currentState) => currentState.deathSpells,
        nextText: 7.1
      },
      {
        text: 'Спокійно проходжу повз них. Оце так річь ця мантія! Дивлячись на мапу мародерів йду до Путіна робити йому сюрприз.',
        requiredState: (currentState) => currentState.invisibilityCloak,
        nextText: 8
      },
      {
        text: 'Спокійно проходжу повз них. Оце так річь ця мантія! Дивлячись на мапу мародерів хочу спочатку встановити український прапор на Кремлі (оце так новини будуть зранку), а потім на зустріч з Путіним',
        requiredState: (currentState) => currentState.invisibilityCloak,
        nextText: 8
      },
      {
        text: 'Проводжу диверсійну роботу, відвертаю увагу охоронців і проходжу по коридору',
        requiredState: (currentState) => currentState.ninja,
        nextText: 8
      },
      {
        text: 'Використовуючи всі свої навички, якими навчили в Британії вбиваю всіх охоронців і проходжу по коридору',
        requiredState: (currentState) => currentState.ninja,
        nextText: 8
      },
      {
        text: 'Хочу спочатку встановити український прапор на Кремлі (оце так новини будуть зранку), а потім на зустріч з Путіним',
        requiredState: (currentState) => currentState.ninja,
        nextText: 7.2
      },
      {
        text: 'Влаштовую перестрілку з охоронцями',
        requiredState: (currentState) => !currentState.hardWeapon && currentState.superGun,
        nextText: 7.1
      },
      {
        text: 'Вирішую, що спочатку встановити український прапор на Кремлі',
        requiredState: (currentState) => !currentState.hardWeapon && currentState.superGun,
        nextText: 7.2
      }
    ]
  },
  {
    id: 7.1,
    text: 'Нажаль, охоронців занадто багато і ми падаємо від куль одного з охоронців. Остання наша думка: треба було брати мантію невидимку...',
    options: [
      {
        text: 'Почати спочатку',
        nextText: -1
      }
    ]
  },
  {
    id: 7.2,
    text: 'Встановлюємо прапор на Кремлі, це бачать росіяни. Нас вбивають охоронці, але запізно. Починається революція на Червоній площі.',
    options: [
      {
        text: 'Хоча Путіна Ви не вбили, але почали революцію всередині країни і стали героєм. Почати спочатку',
        nextText: -1
      }
    ]
  },
  {
    id: 8,
    text: 'Ви заходите до кімнати, де знаходиться Путін. Виявляється це не так вже й важко. Чому з самого початку війни ніхто не направив людину на цю місію...',
    options: [
      {
        text: 'Знаходжу важкий предмет на столі і вбиваю Путіна',
        requiredState: (currentState) => currentState.invisibilityCloak,
        nextText: 9
      },
      {
        text: 'Під плащем жбурляю в Путіна всі предмети, які потрапляють під руку. Путін божеволіє і вмирає від сердцевого нападу. В новинах розкажуть, що помер на роботі)',
        requiredState: (currentState) => currentState.invisibilityCloak,
        nextText: 9
      },
      {
        text: 'Вбиваю Путіна зброєю отриманою в Британії',
        requiredState: (currentState) => currentState.ninja,
        nextText: 9
      },
      {
        text: 'Швидкими рухамі за кілька секунд підбігаю до Путіна, вирубаю його і встановлюю сцену самогубства.',
        requiredState: (currentState) => currentState.ninja,
        nextText: 9
      },
      {
        text: "Вбиваю Путіна і виходячи з кабінету спеціально проходжу повз камеру. Ранкові новини розкажуть як Шойгу вбив Путіна.",
        requiredState: (currentState) => currentState.herbsАndPotionFlask,
        nextText: 9
      },
      {
        text: "Під час розмиви з Путіним непомітно підсипаю йому отруту, яку він випиває. Путін падає на підлогу, я гукаю на допомогу і під час суматохи спокійно виходжу з кімнати.",
        requiredState: (currentState) => currentState.herbsАndPotionFlask,
        nextText: 9
      },
    ]
  },
  {
    id: 9,
    text: 'Ви виконали місію!',
    options: [
      {
        text: 'Ви справжній герой! Чудова робота! Почати гру спочатку.',
        nextText: -1
      }
    ]
  }
]

startGame()