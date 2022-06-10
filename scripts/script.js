let cartState = []
window.addEventListener("load", onInit);

function onInit() {
    db.forEach(entity => {
        $('#items').append(`
          <div id="${entity.name.toLowerCase()}" class="section-box">
            <h3 class="section-title">${entity.name}:</h3>
            <span class="title-underline"></span>
            <div id="part-holder" class="container"></div>
          </div>
        `)
        entity.items.forEach(item => {
          $(`#${entity.name.toLowerCase()} > #part-holder`).append(`
              <article class="part-card">
                <img class="part-image" src="${item.image}" alt="${item.name}" />
                <h3 class="part-name">${item.name}</h3>
                <p class="part-description">${item.description}</p>
                <span class="part-price">Već od: <em>${item.price} kn</em></span>
                <button id="${entity.id}-${item.id}" class="part-button">Naruči</button>
              </article>
          `);
        })
    });

    $(document).ready(function(){
      $('.part-button').click(function(e){
        addItemToCart(this.id.split('-')[0], this.id.split('-')[1]);
      });
    });
}

$(document).ready(function(){
  $('#shopping-cart').click(function(e){
    $('#cart-modal').toggle();
  });
});

function addItemToCart(entityId, itemId) {
  const selectedItem = db.find(entity => entity.id === Number(entityId)).items.find(item => item.id === Number(itemId));
  cartState.push(selectedItem);

  $('#menu-items').append(`
    <div class="shopping-item">
      <h3>${selectedItem.name}</h3>
      <p>${selectedItem.price} kn</p>
    </div>
  `);

  $('#shopping-count').text(cartState.length);
  $('#cart-amount').text(`${cartState.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0)} kn`);
}