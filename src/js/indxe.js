//Variables & Const
const catogriesIMGS = [
    "./imges/liplinear.jpeg", "./imges/lipstick.jpeg", "./imges/foundation.jpeg",
    "./imges/eyeshadow.jpeg", "./imges/blush.jpeg", "./imges/mascara.jpeg",
    "./imges/eyebrow.jpeg", "./imges/eyeliner.jpeg", "./imges/bronzer.jpeg",];

const bransIMGS = [
    "./imges/colourpop.jpeg", "./imges/boosh.jpeg", "./imges/deciem.jpeg",
    "./imges/alva.jpeg", "./imges/glossier.jpeg", "./imges/nyx.jpeg"];

// Slider
fetch('http://makeup-api.herokuapp.com/api/v1/products.json?limit=15')
    .then(response => response.json())
    .then(data => {
        var images = [];
        for (let i = 0; i < data.length; i++) {
            images.push(data[i].api_featured_image);
        }
        let currentIndex = 0;
        var updateImage = () => {
            var sliderImage = document.querySelector('.imges_first img');
            sliderImage.src = images[currentIndex];
            sliderImage.style.height = "250px";
            currentIndex = (currentIndex + 1) % images.length;
        };
        var sliderImage = document.querySelector('.imges_first img');
        sliderImage.src = images[0];
        setInterval(updateImage, 1500);
    });
    
// ===================================HOME_API=======================================
function get_data() {
    numProduct()
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?price_greater_than=0&limit=100`)
        .then(res => res.json())
        .then(data => {
            const filteredData = data.slice(0, 100).map(item => {
                if (item.price === null || item.price === undefined) {
                    item.price = 65; 
                }
                return item;
            });
            document.getElementById("container").style.display = 'none'
            console.log(data)
            brands(filteredData)
            catogries(filteredData);
            display(filteredData);
        })
}

function display(res) {
    var box = ``
    res.forEach(item => {
        if (item.api_featured_image && item.price) {
            box += `<div class="section_product" id="${item.id}" ondblclick="sendData(id)">
            <img src=${item.api_featured_image} alt="">
            <span class = "brand">${item.brand}</span>
            <h3 class="womensTcard">${item.name}</h3>
            <ul>
              <li><span class="price" =>${item.price} $</span></li>
              <li><span><i class="fa-solid fa-star"></i></span></li>
            </ul>
            <div class="add_card">
              <button id="add_card"  onclick="GetSelectItem(this)" ><h3>+ ADD TO CART<h3></button>   
            </div>
          </div>`;
        }
    })
    document.getElementById("first_sction_home").innerHTML = box
}
// =========================cloth  search data ================================
const inputSearch = document.getElementById('input_search');
const searchResults = document.getElementById('search_results');
const productDetails = document.getElementById('first_sction_home');
let products = [];

fetch('http://makeup-api.herokuapp.com/api/v1/products.json?limit=10')
    .then(response => response.json())
    .then(data => {
        products = data;

        inputSearch.addEventListener('input', () => {
            searchResults.innerHTML = '';

            const userInput = inputSearch.value.trim().toLowerCase();
            if (userInput.length === 1) {
                const matchingProducts = products.filter(product => {
                    const firstLetter = product.name[0].toLowerCase();
                    return firstLetter === userInput;
                });

                matchingProducts.forEach(product => {
                    const li = document.createElement('li');
                    li.style.listStyle = "preventFormat";
                    li.textContent = product.name;
                    searchResults.appendChild(li);
                });
            } else if (userInput.length > 1) {
                const filteredProducts = products.filter(product => {
                    const productName = product.name.toLowerCase();
                    return productName.includes(userInput);
                });

                filteredProducts.forEach(product => {
                    const li = document.createElement('li');
                    li.style.listStyle = "preventFormat";
                    li.textContent = product.name;
                    searchResults.appendChild(li);
                });
            } else {
                searchResults.style.display = 'none';
                get_data();
            }
        });
    });

searchResults.addEventListener('click', e => {
    const clickedLi = e.target.closest('li');
    if (!clickedLi) return;

    const productName = clickedLi.textContent;

    const product = products.find(p => p.name === productName);

    const details = `<div class="section_product" ondblclick="sendData(id)">
  <img src=${product.api_featured_image} alt="">
  <span>${product.brand}</span>
  <h3 class="womensTcard">${product.name}</h3>
  <ul>
      <li><span>${product.price} ${product.price_sign}</span></li>
      <li><span><i class="fa-solid fa-star"></i></span></li>
  </ul>
  <div class="add_card">
    <button id="${product.id}" onclick="sendData(id)" style="background-color:transparent;border:none"><h3>Details<h3></button>
  </div>
</div>`
    productDetails.innerHTML = details;


    searchResults.style.display = 'none';
});

inputSearch.addEventListener('input', () => {
    if (searchResults.style.display === 'none') {
        searchResults.style.display = '';
    }
});

document.addEventListener('click', e => {
    if (!searchResults.contains(e.target) && e.target !== inputSearch) {
        searchResults.style.display = 'none';
    }
});
function displayshow() {
    document.getElementById("search_results").style.display = "block"
}

//----------------------------catogries ya shabab--------------//
function get_catogry() {
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?price_greater_than=0&limit=100`)
        .then(res => res.json())
        .then(data => {

            const filteredData = data.slice(0, 100).map(item => {
                if (item.price === null || item.price === undefined) {
                    item.price = 65; 
                }
                // return item;
            });
            document.getElementById("container").style.display = 'none'
            display11(filteredData);
        })
}

var arrayCatogry;
function catogries(data) {
    var catogries = [];
    data.forEach(item => {
        catogries.push(item.product_type);
    });
    arrayCatogry = [...new Set(catogries)];
    return arrayCatogry;
}

function display11(res) {
    var i = -1;
    var box = ``
    arrayCatogry.forEach(item => {
        i++;
        console.log(item);
        box += `
       <div class="categories">
                <div class="categories_slid">
                    <span>${item}</span>
                </div>
                <div class="title_categories" id="${item}" onclick="getProductType(id)">
                <img src=${catogriesIMGS[i]} alt="" >
                </div>  
            </div>`
    })
    document.getElementById("first_sction_home").innerHTML = box
}

function getProductType(type) {
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?price_greater_than=0&limit=100&product_type=` + type)
        .then(res => res.json())
        .then(data => {

            const filteredData = data.slice(0, 100).map(item => {
                if (item.price === null || item.price === undefined) {
                    item.price = 65; // set price to 65 if it is null or undefined
                }
                // return item;
            });
            displayProductType(data);
        })
}


function displayProductType(res) {
    var box = ``
    res.forEach(item => {
        if (item.api_featured_image && item.price) {
            box += `<div class="section_product" id="${item.id}" ondblclick="sendData(id)">
            <img src=${item.api_featured_image} alt="">
            <span class = "brand">${item.brand}</span>
            <h3 class="womensTcard">${item.name}</h3>
            <ul>
              <li><span class="price" =>${item.price} $</span></li>
              <li><span><i class="fa-solid fa-star"></i></span></li>
            </ul>
            <div class="add_card">
              <button id="add_card"  onclick="GetSelectItem(this)" ><h3>+ ADD TO CART<h3></button>   
            </div>
                    </div>`
        }
    })
    document.getElementById("first_sction_home").innerHTML = box
}

//----------------------------brand ya shabab--------------//
function get_brand() {
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?price_greater_than=0&limit=100`)
        .then(res => res.json())
        .then(data => {

            const filteredData = data.slice(0,100).map(item => {
                if (item.price === null || item.price === undefined) {
                    item.price = 65; // set price to 65 if it is null or undefined
                }
                // return item;
            });
            displaybrands(filteredData);
        })
}

var arrayBrands;
function brands(data) {
    var brand = [];
    data.forEach(item => {
        brand.push(item.brand);
    });
    arrayBrands = [...new Set(brand)];
    return arrayBrands;
}

function displaybrands(res) {
    var i = -1;
    var box = ``
    arrayBrands.forEach(item => {
        i++;
        console.log(item);
        box += `
        <div class="brands">
            <div class="slid_word">
                <span>${item}</span>
            </div>
            <div class="title_brands" id="${item}" onclick="getProductbrand(id)">
                <img src=${bransIMGS[i]} alt="" >
            </div>  
        </div>`
    })
    document.getElementById("first_sction_home").innerHTML = box
}

function getProductbrand(type) {
    console.log("hey brand")
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?price_greater_than=0&limit=100&brand=` + type)
        .then(res => res.json())
        .then(data => {

            const filteredData = data.slice(0, 100).map(item => {
                if (item.price === null || item.price === undefined) {
                    item.price = 65; // set price to 65 if it is null or undefined
                }
                // return item;
            });
            displayProductbrand(data);
        })
}

function displayProductbrand(res) {
    var box = ``
    res.forEach(item => {
        if (item.api_featured_image && item.price) {
            box += `<div class="section_product" id="${item.id}" ondblclick="sendData(id)">
            <img src=${item.api_featured_image} alt="">
            <span class = "brand">${item.brand}</span>
            <h3 class="womensTcard">${item.name}</h3>
            <ul>
              <li><span class="price" =>${item.price} $</span></li>
              <li><span><i class="fa-solid fa-star"></i></span></li>
            </ul>
            <div class="add_card">
              <button id="add_card"  onclick="GetSelectItem(this)" ><h3>+ ADD TO CART<h3></button>   
            </div>
                    </div>`
        }
    })
    document.getElementById("first_sction_home").innerHTML = box
}




// /*
// // ========================================================================================================================================================================================================
//                                           Cart functions 
// ========================================================================================================================================================================================================
// */
//num of product in cart when reload
function numProduct() {
    var cart = localStorage.getItem('cart');
    if (!cart) {
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      cart = JSON.parse(cart);
    }
    c = cart.length;
    var counter = document.getElementById('count');
    counter.textContent = c;
  }
setInterval(numProduct(),1000)
// increment when click add to cart 
var count = document.getElementById("add_card")
var c;

function counterIncrement() {
    c++
    var counter = document.getElementById("count")
    counter.textContent = c
}
var final = c


// get select item data 

var Cart = [];    // Cart product 
function GetSelectItem(button) {
    var item = button.closest('.section_product');
    var itemId = item.id;
    var itemBrand = item.querySelector('.brand').textContent;
    var itemName = item.querySelector('.womensTcard').textContent;
    var itemPrice = item.querySelector('.price').textContent;
    var itemImage = item.querySelector('img').src;


    // push the item data into the Cart array

    var itemsCart = JSON.parse(localStorage.getItem('cart'))
            console.log("length "+itemsCart.length)
            if (itemsCart.length >= 0) {
                itemsCart.forEach(element => {
                    Cart.push({
                        id: element.id,
                        name: element.name,
                        price: element.price,
                        imageLink: element.imageLink,
                        brand: element.brand
                    });
                })
            }

    Cart.push({
        id: itemId,
        name: itemName,
        price: itemPrice,
        imageLink: itemImage,
        brand: itemBrand

    });
    counterIncrement(); // increment when click add to cart 
    console.log(itemId)
    console.log(itemName)
    console.log(itemPrice)
    for (var i = 0; i < Cart.length; i++)
        console.log(Cart[i].id)
    localStorage.setItem('cart', JSON.stringify(Cart));
    Cart = [];
}

function sendData(id) {
    console.log("go "+id)
    window.location.href = "./seconddetails.html?id=" + id;
}



function logout() {
    localStorage.removeItem('sessionUsername')
}


