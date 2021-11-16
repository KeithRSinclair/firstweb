//Create Cart Functionality

let shoppingCart = (function() {
  //Private Methods & Properties

  //Shopping Cart Array
  let cart = [];
  //Declare Item
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  //save cart
  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // load cart
  function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }

  loadCart();

  //Public Methods & Properties
  let obj = {};

  // Add item to cart
  obj.addItemToCart = function(name, price, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count += count;
        saveCart();
        return;
      }
    }
    let item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };

  //Item Count
  obj.setCountForItem = function(name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
    saveCart();
  };

  //remove Item from cart (removes one item)
  obj.removeItemFromCart = function(name) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count--;
        if (cart[i].count === 0) {
          cart.splice(i, 1);
        }
        break;
      }
    }
    saveCart();
  };

  //remove a list item from cart
  obj.removeItemFromCartAll = function(name) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart.splice(i, 1);
        break;
      }
    }
    saveCart();
  };

  //clear Cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  };

  //count cart
  obj.countCart = function() {
    let totalCount = 0;
    for (let i in cart) {
      totalCount += cart[i].count;
    }
    return totalCount;
  };

  //total cart
  obj.totalCart = function() {
    let totalCost = 0;
    for (let i in cart) {
      totalCost += cart[i].price * cart[i].count;
    }
    return totalCost.toFixed(2);
  };

  //tax cart
  obj.taxCart = function() {
    let totalTax = 0;
    for (let i in cart) {
      totalTax += cart[i].price * cart[i].count * 1.15;
    }
    return totalTax.toFixed(2);
  };

  //List cart
  obj.listCart = function() {
    let cartCopy = [];
    for (let i in cart) {
      let item = cart[i];
      let itemCopy = {};
      for (let p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = (item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };

  return obj;
})();

//jQuery Code
$(".add-to-cart").click(function(event) {
  event.preventDefault();
  let name = $(this).attr("data-name");
  let price = Number($(this).attr("data-price"));

  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

$("#clear-cart").click(function(event) {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  let cartArray = shoppingCart.listCart();
  let output = "";
  for (let i in cartArray) {
    output +=
      "<li>" +
      cartArray[i].name +
      "<i class='fab fa-xbox tinyIcon'></i>" +
      " game" +
      " <button class='subtract-item btn-sm btn-primary' data-name='" +
      cartArray[i].name +
      "'>-</button> " +
      " <input class='item-count' type='number' data-name='" +
      cartArray[i].name +
      "' value='" +
      cartArray[i].count +
      "'>" +
      " <button class='plus-item btn-sm btn-success' data-name='" +
      cartArray[i].name +
      "'>+</button> " +
      " " +
      " = " +
      " R " +
      cartArray[i].total +
      " <button class='delete-item btn-sm btn-danger' data-name='" +
      cartArray[i].name +
      "'>X</button> " +
      "</li>";
  }
  $("#count-cart").html(shoppingCart.countCart());
  $("#show-cart").html(output);
  $("#total-cart").html(shoppingCart.totalCart());
  $(".total-tax").html(shoppingCart.taxCart());
}

$("#show-cart").on("click", ".delete-item", function(event) {
  let name = $(this).attr("data-name");
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

$("#show-cart").on("click", ".subtract-item", function(event) {
  let name = $(this).attr("data-name");
  shoppingCart.removeItemFromCart(name);
  displayCart();
});

$("#show-cart").on("click", ".plus-item", function(event) {
  let name = $(this).attr("data-name");
  shoppingCart.addItemToCart(name, 0, 1);
  displayCart();
});

$("#show-cart").on("change", ".item-count", function(event) {
  let name = $(this).attr("data-name");
  let count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

//Shopping Cart Modal
//Get modal Element
let modal = document.getElementById("simpleModal");
//get open modal button
let modalBtn = document.getElementById("modalBtn");
//Get Close button
let closeBtn = document.getElementsByClassName("closeBtn")[0];

//Listen for open click
modalBtn.addEventListener("click", openModal);
//Listen for  close click
closeBtn.addEventListener("click", closeModal);
//listen for outside click
window.addEventListener("click", clickOutside);
//function to open modal
function openModal() {
  modal.style.display = "block";
  displayCart();
}

//function to close modal
function closeModal() {
  modal.style.display = "none";
}

//function to close modal if outside click
function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

//Alert Item & Show Cart

function alertItem() {
  alert("Your current total is R " + shoppingCart.taxCart());
  openModal();
}

//CheckOut Modal
//Get modal Element
let checkOutModal = document.getElementById("checkOut-Modal");
//get open modal button
let checkoutBtn = document.getElementById("checkOutCart");
//Get Close button
let closeBtncheckout = document.getElementsByClassName("closeBtncheckout")[0];

//Listen for open click
checkoutBtn.addEventListener("click", opencheckoutModal);
//Listen for  close click
closeBtncheckout.addEventListener("click", closecheckoutModal);

//function to open checkout modal
function opencheckoutModal() {
  checkOutModal.style.display = "block";
}

//function to close modal
function closecheckoutModal() {
  checkOutModal.style.display = "none";
}

//Function to add Shipping charge
function shippingOption(collect) {
  document.getElementById("deliveryCharge").value = collect;
}

//function for Voucher
function voucherDiscount(voucher) {
  document.getElementById("discountVoucher").value = voucher;
}

// let grandTotalCheckout = $(".grandTotal");

// $("#grandTotal").html();

// let methods = document.getElementById("shippingRadio");
// let shippingMethod;
// for (let i = 0; i < methods.length; i++) {
//   if (methods[i].checked == true) {
//     shippingMethod = methods[i].value;
//   }
// }

function generateOrder() {
  closecheckoutModal();
  closeModal();
  shoppingCart.clearCart();
  alert("Order Finalized your tracking number is " + Math.random());
}
