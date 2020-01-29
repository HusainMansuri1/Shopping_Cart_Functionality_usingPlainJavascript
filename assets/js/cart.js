window.onload = function() {
  document.querySelector('main').innerHTML = `
  <section class="cart-products">
    <div class="wrapper"></div>
  </section>`;

  let cartWraper = document.querySelector('.cart-products .wrapper');

  // function to get the products if exists in local storage or display error msg if not
  (function cartProducts() {
    if (localStorage.getItem('cart-array')) {
      let cart = JSON.parse(localStorage.getItem('cart-array'));

      if (cart.length) {
        generateCartMarkup(cart);
      } else {
        // displaying no products added to cart if there are no products added to cart
        cartWraper.innerHTML += `
        <div class="cart-error-container">
          <figure class="cart-error-img">
            <img src="./assets/images/cart-error-img.jpg" alt="Sorry Giffy Image">
          </figure>
          <p class="cart-error-msg">No Products added to cart</p>
        </div>`;
      }
    }
  })();

  // function to generate markup for the products added to the cart
  function generateCartMarkup(cart) {
    let cartBlock = document.createElement('ul');
    cartBlock.classList.add('cart-block');
    let totalAmount = 0;

    cart.forEach(function(item) {
      cartBlock.innerHTML += `<li>
        <h2 class="title">${item.title}</h2>
        <p class="style">${item.style}</p>
        <span class="cart-price">${item.price} ${item.currencyFormat}</span>
      </li>`;

      totalAmount += item.price;
    });

    cartWraper.append(cartBlock);
    cartWraper.innerHTML += `
    <div class="total-block">
      <span class="total">Total ${totalAmount.toFixed(2)} ${cart[0].currencyFormat}</span>
    </div>`;
  }

  cartWraper.innerHTML += `<a href="index.html" title="Continue Shopping"><button>Continue Shopping</button></a>`;
};
