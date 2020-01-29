window.onload = function() {
  // API containing products array will be stored in this letiable
  let products = null;

  //function to get the ajax link of the cart and parsing it.
  (function getProducts() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://react-shopping-cart-67954.firebaseio.com/products.json', false);

    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        let response = JSON.parse(this.response);
        products = response.products;
        productsMarkup(products);
      }
    };
    xhr.send();
  })();

  // function to create mark up of all the products and displaying it in the products section
  function productsMarkup(link) {
    let test = null;
    let block = document.createElement('ul');
    block.classList.add('product-block');

    if (localStorage.getItem('cart-array')) {
      test = localStorage.getItem('cart-array');
      test = JSON.parse(test);
    }

    link.forEach((value, index) => {
      if (test) {
        test.forEach((v, i) => {
          if (value.id == v.id) {
            value.addedToCart = true;
          }
        });
      }

      let cartBtnStatus = value.addedToCart ? 'Remove From Cart' : 'Add To Cart';

      block.innerHTML += `
      <li>
        <figure class="product-image">
          <img src="assets/images/product-common-img.jpg" alt="Picture Of Product">
        </figure>
        <div class="product-text">
          <h2 class="title">${value.title}</h2>
          <p class="style">${value.style}</p>
          <span class="price">${value.price} ${value.currencyFormat}</span>
          <button class="add-to-cart" title="${cartBtnStatus}">${cartBtnStatus}</button>
        </div>
      </li>`;
    });

    document.querySelector('main').innerHTML = `
    <section class="products">
      <div class="wrapper"></div>
    </section>`;
    document.querySelector('.products .wrapper').appendChild(block);
  }

  // add to cart
  let cartButtons = document.querySelectorAll('.add-to-cart');
  let cartArray = null;
  let cartCount = document.querySelector('.cart a');

  /* function to get the products array from browser storage and displaying the no of products 
  in the cart counter */
  (function cartCounter() {
    if (!localStorage.getItem('cart-array')) {
      cartCount.innerHTML = 0;
      cartArray = [];
    } else {
      cartArray = localStorage.getItem('cart-array');
      cartArray = JSON.parse(cartArray);
      cartCount.innerHTML = cartArray.length;
    }
  })();

  // function to add or remove products from the cart
  function addToCart(element, index, that) {
    if (that.innerHTML === 'Add To Cart') {
      cartArray.push(products[index]);
      that.innerHTML = 'Remove From Cart';
      that.setAttribute('title', 'Remove From Cart');
    } else {
      cartArray.forEach((elem, j) => {
        if (products[index].id === elem.id) {
          cartArray.splice(j, 1);
        }
      });
      that.innerHTML = 'Add To Cart';
      that.setAttribute('title', 'Add To Cart');
    }
    cartCount.innerHTML = cartArray.length;
    localStorage.setItem('cart-array', JSON.stringify(cartArray));
  }

  // adding event listener to add to cart button of each product
  cartButtons.forEach((element, index) => {
    element.addEventListener('click', function() {
      addToCart(element, index, this);
    });
  });
};
