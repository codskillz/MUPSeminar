function shopIconCount() {
  
}

const buttonList = document.querySelectorAll('article button.part-button');

for(let i = 0; i < buttonList.length; i++)
{
    const button = buttonList[i];
    button.addEventListener('click', handleButtonClick);
}

function handleButtonClick(e) {
    const clickedButton = e.currentTarget;

    const partCard = clickedButton.parentElement;
    const partName = partCard.querySelector('h3').textContent;
    const partPrice = partCard.querySelector('span > em').textContent;
    
    const instrumentPrice = partPrice.split(' ')[0];

  //Objekt za createNewShopItem()
  const partData = {
    name: partName,
    price: instrumentPrice
  };

  console.log(partData);

  createNewShopItem(partData);

  shopIconCount();
  calculateTotalPrice();
}

function createNewShopItem(partData) {
  const shopItem = document.createElement('div');
  shopItem.classList.add('shopping-item');
  shopItem.setAttribute('id', partData.name.toLowerCase());
  //Heading Itema
  const shopItemHeading = document.createElement('h3');
  shopItemHeading.textContent = partData.name;
  shopItem.appendChild(shopItemHeading);
  //Cijena Itema
  const shopItemPrice = document.createElement('p');
  shopItemPrice.textContent = partData.price + 'kn';
  shopItem.appendChild(shopItemPrice);

  addNewItemToShopList(shopItem);
}

function addNewItemToShopList(newItem) {
  const shopSideMenu = document.getElementById('menu-items');
  shopSideMenu.appendChild(newItem);
}

function calculateTotalPrice() {
  
}