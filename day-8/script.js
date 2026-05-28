// script.js

let total = 0;

function addToCart(price) {

    total = total + price;

    document.getElementById("total").innerText = total;

    document.getElementById("finalPrice").innerText = total;
}

function applyCoupon() {

    let discount =
    document.getElementById("couponSelect").value;

    let discountedPrice =
    total - (total * discount / 100);

    document.getElementById("finalPrice")
    .innerText = discountedPrice;
}