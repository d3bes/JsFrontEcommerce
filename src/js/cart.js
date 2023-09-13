
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// get the cart list element
var cartList = document.getElementById('cart-list');
var totalPriceElement = document.getElementById('total-price');

// create a list item for each cart item
function displayCart(){
  cartList.innerHTML = ""; // clear the cart list before re-displaying items
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var li = document.createElement('div');
li.className = "li"
var imgDiv = document.createElement("div")
imgDiv.className = "imgCard"
var img = document.createElement('img');
img.src = item.imageLink;
imgDiv.appendChild(img);
li.appendChild(imgDiv);

var detailsDiv = document.createElement("div");
detailsDiv.className = "count_details";
var nameHeading = document.createElement("h3");
nameHeading.textContent = `Name: ${item.name}`;
detailsDiv.appendChild(nameHeading);
var priceHeading = document.createElement("h3");
priceHeading.textContent = `Price: ${item.price}`;
detailsDiv.appendChild(priceHeading);
var brandHeading = document.createElement("h3");
brandHeading.textContent = `Brand: ${item.brand}`;
detailsDiv.appendChild(brandHeading);

var buttonsDiv = document.createElement("div");
buttonsDiv.className = "count_buttons";
var plusButton = document.createElement("button");
plusButton.className = "plus";
plusButton.textContent = "+";
buttonsDiv.appendChild(plusButton);
var quantityLabel = document.createElement("label");
quantityLabel.className = "quantity";
quantityLabel.textContent = "1";
buttonsDiv.appendChild(quantityLabel);
var subButton = document.createElement("button");
subButton.className = "sub";
subButton.textContent = "-";
buttonsDiv.appendChild(subButton);

detailsDiv.appendChild(buttonsDiv);
li.appendChild(detailsDiv);

var closeButton = document.createElement("button");
closeButton.className = "remove";
closeButton.id = item.id;
closeButton.textContent = "Delete";
li.appendChild(closeButton);

cartList.appendChild(li);
    // plusSign.addEventListener("click", function() {
    //   incrementQuantity(this);
    // });

    // subSign.addEventListener("click", function() {
    //   decrementQuantity(this);
    // });
  }
  updateTotalPrice()
  registerRemoveBtn(); // register event listeners for the "Remove" buttons
  registerPlus()
  registerSub()
}

function removeItem(id) {
  console.log("removeItem called with id = " + id);
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      console.log("Removing item at index " + i);
      cart.splice(i, 1); // remove the item at the specified index
      localStorage.setItem('cart', JSON.stringify(cart)); // save the updated Cart array to local storage
      displayCart(); // update the cart display
      console.log("Item removed successfully");
      return;
    }
  }
  console.log("Item with id " + id + " not found in cart");
}

function registerRemoveBtn() {
  var removeBtns = document.getElementsByClassName("remove");
  for (var i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener('click', function() {
      var id = this.id; // get the ID of the clicked button
      console.log("Remove button clicked with id = " + id);
      removeItem(id); // pass the ID of the clicked button to the removeItem function
    });
  }
}

displayCart(); // display the cart items on page load

// Total price 


function incrementQuantity(button) {
  var item = button.parentNode;
 
  if (item) {
    var quantityElem = item.querySelector(".quantity");
    if (quantityElem) {
      var quantity = parseInt(quantityElem.textContent);
       if(quantity>=0)
      quantityElem.textContent = quantity + 1;
    }
  
}
  updateTotalPrice()
}

function decrementQuantity(button) {
  var item = button.closest('.li');
  
  if (item) {
    var quantityElem = item.querySelector(".quantity");
    if (quantityElem) {
      var quantity = parseInt(quantityElem.textContent);
      if(quantity>0)
      quantityElem.textContent = quantity - 1;
     
     
    }
  }

  updateTotalPrice()
}

function registerPlus(){
var plus = document.getElementsByClassName("plus")
for(let i =0 ;i<plus.length;i++){
plus[i].addEventListener("click",function(){
  incrementQuantity(this);
})
}
}
function registerSub(){
  var sub = document.getElementsByClassName("sub")
  for(let i =0 ;i<sub.length;i++){
  sub[i].addEventListener("click",function(){
    decrementQuantity(this)
  })
  }
  }
function updateTotalPrice() {
  var total = 0;
  var items = cartList.querySelectorAll('.li');
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var price = parseInt(item.textContent.match(/\d+/)[0]);
    var quantity = parseInt(item.querySelector('.quantity').textContent.trim());
    total += price * quantity;
  }
  totalPriceElement.textContent = `Total Price: ${total}`;
}
