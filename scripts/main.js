/* Dodati referencu na klik na "shopping-card" ikonu
  kojom se dodaje klasa 'active' "shopping-card-menu" elementu */
const ikona = document.getElementById('shopping-card');
ikona.addEventListener('click', () => {
  const sideMenu = document.getElementById('shopping-side-menu');
  sideMenu.classList.toggle('active');
});

// Funkcija koja će postaviti broj pokraj ikone košarice ovisno o tome šta je u košarici
function setShopIconCount() {
  const countCircle = document.getElementById('shopping-count');
  let totalCount = 0;
  // Prvo dohvati sve 'shopping-item'-e iz košarice
  const itemsInShop = document.querySelectorAll(
    '#shopping-side-menu .shopping-item'
  );
  for (let i = 0; i < itemsInShop.length; i++) {
    const itemInShop = itemsInShop[i];
    // Za svakog dohvati količinu
    const itemCount = itemInShop.querySelector('.amount-box p').textContent;
    totalCount += parseInt(itemCount);
  }
  // Zapiši dobiveni 'count' u žuti krug pokraj ikone košarice
  countCircle.textContent = totalCount;
}

// Dohvatiti listu svih <button> elemenata unutar <article> elemenata
const buttonList = document.querySelectorAll('article button.part-button');
// Dodati referencu na klik na svaki dohvaćeni "button"
for (let i = 0; i < buttonList.length; i++) {
  const button = buttonList[i];
  // Referenca na funkciju "handleButtonClick" koja automatski šalje "event" parametar
  button.addEventListener('click', handleButtonClick);
}

/* Funkcija koja prepoznaje koji se "button" kliknuo,
  i kupi informacije iz te kartice (naziv pizze i cijenu) */
function handleButtonClick(e) {
  // Dohvati "button" koji je kliknut
  const clickedButton = e.currentTarget;

  // Pronađi njegovog roditelja preko kojeg ćemo prikupiti naziv i cijenu pizze
  const partCard = clickedButton.parentElement;
  const partName = partCard.querySelector('h3').textContent;
  const partPrice = partCard.querySelector('span > em').textContent;

  /* "partPrice" je zapravo string npr. "24,00 kn", pa je potrebno uzeti samo prvi dio,
    tj. riješiti se ovog "kn" dijela koristeći split() */
  const onlyPrice = partPrice.split(' ')[0];

  /* Kreirati objekt sa svim podacima za pizzu i proslijediti ga fukciji "createNewShopItem()"
    koja će "iscrtati" element u "shopping-side-menu"-u */
  const partData = {
    name: partName,
    price: onlyPrice
  };

  /**************** 2. ZADATAK ************************/
  // Prvo provjeriti da li već postoji part s ovim imenom u '#side-menu-items' elementu
  const getCurrentpart = document.querySelector(
    `#side-menu-items .shopping-item#${partName.toLowerCase()}`
  );
  if (!getCurrentpart) {
    // Ako ne postoji, kreiraj novi element i ubaci ga u košaricu
    createNewShopItem(partData);
  } else {
    // Ako već postoji, uvećaj joj količinu za 1
    const amountItem = getCurrentpart.querySelector('.amount-box > p');
    let amountNumber = parseInt(amountItem.textContent);
    amountNumber++;
    amountItem.textContent = amountNumber;
  }
  /********************************************************/

  // Pozovi funkciju koja će postaviti broj pokraj "shopping-card" ikone
  setShopIconCount();

  /**************** 3. ZADATAK ************************/
  // Nakon svakog klika, ponovno izračunaj ukupnu cijenu
  calculateTotalPrice();
  /********************************************************/
}

function createNewShopItem(pData) {
  /* 1. način pristupa:
    Prvo se kreira HTML element (tag) koji želimo (u ovom slučaju <div>), 
    zatim mu dodajemo atribute i na kraju "append"-amo sadržaj koji želimo */
  const shopItem = document.createElement('div');
  shopItem.setAttribute('class', 'shopping-item'); // shopItem.classList.add('shopping-item');

  /**************** 1. ZADATAK ************************/
  // Dodati 'id' <div> elementu i postaviti ga da bude jednak nazivu pizze
  shopItem.setAttribute('id', pData.name.toLowerCase());
  /********************************************************/

  const shopItemHeading = document.createElement('h3');
  shopItemHeading.textContent = pData.name;
  shopItem.appendChild(shopItemHeading);

  /* 2. način pristupa: (da ne kreiramo svaki element pojedinačno) 
    Kreiramo dugi HTML string i njega postavimo kao "innerHTML" njegovog roditelja */
  const shopItemDescription = document.createElement('div');
  shopItemDescription.setAttribute('class', 'description');
  const descriptionInnerHTML = `
    <div class="cijena">
      <small>Cijena:</small>
      <p>${pData.price}</p>
    </div>
    <div class="kolicina">
      <small>Količina:</small>
      <div class="amount-box">
        <button class="minus"><i class="fas fa-minus"></i></button>
        <p>1</p>
        <button class="plus"><i class="fas fa-plus"></i></button>
      </div>
    </div>`; // Template Literals
  shopItemDescription.innerHTML = descriptionInnerHTML;
  shopItem.appendChild(shopItemDescription);

  /**************** OPCIONALNI DIO ************************/
  // Dodati 'close' ikonu na '.shopping-item'
  const shopItemCloseIcon = document.createElement('i');
  shopItemCloseIcon.classList.add('fas', 'fa-times', 'close');
  shopItem.appendChild(shopItemCloseIcon);
  
  shopItemCloseIcon.addEventListener('click', removeShopItem);
  shopItemDescription
    .querySelector('button.plus')
    .addEventListener('click', handlePlusButtonClick);
  shopItemDescription
    .querySelector('button.minus')
    .addEventListener('click', handleMinusButtonClick);
  
  addNewItemToShopList(shopItem);
}

function addNewItemToShopList(newItem) {
  const shopSideMenu = document.getElementById('side-menu-items');
  shopSideMenu.appendChild(newItem);
}

function calculateTotalPrice() {
  let totalPrice = 0;
  const shopItems = document.querySelectorAll(
    '#side-menu-items .shopping-item'
  );
  for (let i = 0; i < shopItems.length; i++) {
    const item = shopItems[i];
    const itemPrice = item.querySelector('.cijena > p').textContent;
    const itemAmount = item.querySelector('.amount-box > p').textContent;
    const itemTotalPrice = parseFloat(itemPrice) * parseInt(itemAmount);
    totalPrice += itemTotalPrice;
  }
  document.querySelector(
    '#side-menu-action > .total-price > em'
  ).textContent = totalPrice.toFixed(2);
}
function removeShopItem(e) {
  const clickedX = e.currentTarget;
  const shopItem = clickedX.parentElement;
  shopItem.remove();
  setShopIconCount();
  calculateTotalPrice();
}
function handlePlusButtonClick(e) {
  const clickedPlus = e.currentTarget;
  const amountBox = clickedPlus.parentElement;
  let getAmountItem = amountBox.querySelector('p');
  getAmountItem.textContent = parseInt(getAmountItem.textContent) + 1;
  setShopIconCount();
  calculateTotalPrice();
}

function handleMinusButtonClick(e) {
  const clickedMinus = e.currentTarget;
  const amountBox = clickedMinus.parentElement;
  const getAmountItem = amountBox.querySelector('p');
  let getAmountItemInt = parseInt(getAmountItem.textContent);

  if (getAmountItemInt > 1) {
    getAmountItem.textContent = getAmountItemInt - 1;
    setShopIconCount();
    calculateTotalPrice();
  }
}

  /**************** 2. ZADATAK ************************/
  // Prvo provjeriti da li već postoji part s ovim imenom u '#side-menu-items' elementu
  const getCurrentpart = document.querySelector(
    `#side-menu-items .shopping-item#${partName.toLowerCase()}`
  );
  if (!getCurrentpart) {
    // Ako ne postoji, kreiraj novi element i ubaci ga u košaricu
    createNewShopItem(partData);
  } else {
    // Ako već postoji, uvećaj joj količinu za 1
    const amountItem = getCurrentpart.querySelector('.amount-box > p');
    let amountNumber = parseInt(amountItem.textContent);
    amountNumber++;
    amountItem.textContent = amountNumber;
  }
  /********************************************************/

  // Pozovi funkciju koja će postaviti broj pokraj "shopping-card" ikone
  setShopIconCount();

  /**************** 3. ZADATAK ************************/
  // Nakon svakog klika, ponovno izračunaj ukupnu cijenu
  calculateTotalPrice();
  /********************************************************/
