let deleteButton = document.getElementsByClassName('btn-danger')
for (let i = 0; i < deleteButton.length; i++) {
    let button = deleteButton[i];
    button.addEventListener('click',deleteCartItem)
}   

let quantityInputs = document.getElementsByClassName("cart-input")
for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i]
    input.addEventListener("change", quantityChanged)
}

let addToCartButton = document.getElementsByClassName("shop-item-button")
for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i]
    button.addEventListener('click', addToCartClicked)
}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

const hearts = document.querySelectorAll('.heart');
let classObj = {
    heart: 'small',
    small: 'heart'
}

hearts.forEach(heart => {
    heart.addEventListener('click', ()=> {
        heart.classList = classObj[heart.classList[0]];
    })
});



function purchaseClicked() {
    alert('Thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }

    updateCartTotal()
}

function deleteCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()

    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src

    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('class-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let cartRowContents = `
        <div class="cart-items cart-column">
            <img src="${imageSrc}" width="60" height="60">
            <span class="class-item-title">${title}</span>
        </div>
        <span class="cart-price">${price}</span>
        <div class="cart-quantity">
            <input class="cart-input" type="number" value="1">
            <button class="btn btn-danger">DELETE</button>
        </div>`
        
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', deleteCartItem)
    cartRow.getElementsByClassName('cart-input')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }

    updateCartTotal()
}


function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    let cartRows = cartItemContainer.getElementsByClassName("cart-row")
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-input")[0]
        let price = parseFloat(priceElement.textContent.replace('$', ''))
        let quantity = quantityElement.value

        total += (price * quantity)
    }

    total = Math.round(total * 100) / 100
    document.getElementsByClassName("total-price")[0].textContent = '$' + total
}


