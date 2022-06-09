const naruciButton=document.querySelector("#side-menu-action button");
if(!!naruciButton){
  naruciButton.addEventListener("click",dodajNarudzbu);
}
function dodajNarudzbu() {
  const ukupnaCijena = parseFloat(document.querySelector('#side-menu-action .total-price em').textContent);
const parts = document.querySelectorAll('#side-menu-items .shopping-item');
let velikiString = '';
for(let i = 0; i < parts.length; i++)
{
const part = parts[i];
const ime = part.querySelector('h3').textContent;
const cijena = part.querySelector('.cijena p').textContent;
const kolicina = part.querySelector('.kolicina p').textContent;
velikiString += `${ime}(${cijena}x${kolicina})`;
if(i !== parts.length - 1)
{
velikiString += '_';
}
}
 
const params = {
action: 'addOrder',
totalPrice: ukupnaCijena, 
parts: velikiString
}
//postHTTP(params);
alert(velikiString);
}

/*

function postHTTP(parametri) 
{
$.ajax({
type: 'POST',
url: 'php/api.php',
dataType: 'json',
data: parametri,
success:function(odgovor){
  const kosarica=document.getElementById("side-menu-items");
  kosarica.innerHTML='';
  calculateTotalPrice();
  setShopIconCount();
  const poruka =document.getElementById('info');
  if(odgovor,success)
}
}
}

*/