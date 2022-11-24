//contenedor de categorias:
const categories_container = document.getElementById("categories");
//contenedor de cards
const product_container = document.getElementById("market");
//lista de categorias:
const categorieList = document.querySelectorAll(".category_btn");
//ver mas button
const btn_see_more = document.getElementById("button_see_more");
//boton del carrito:
const open_cart = document.getElementById("open_cart");
//boton del cierre del carrito:
const close_cart_btn = document.getElementById("close_cart_btn")
//cart section:
const cart_section = document.getElementById("cart_section");
//contenedor de card cart : 
const cart_render = document.getElementById("cart_render");
//agregar al carrito button
//const button_add = document.querySelector("#add_prod");
//btns carrito comprar y vaciar:
const button_buy_cart = document.getElementById("cart_buy");
const button_clear_cart = document.getElementById("empty_cart");
//card producoto : 
const card_cart = document.querySelector("card_one");
//contenedor para renderizar el total:
const cart_total = document.querySelector(".Total");
//contenedor de botones de cantidad:
const quantity_buttons = document.querySelector(".button_box");
//toggle menu:
const toggleMenu = document.getElementById("toggle_menu");
//contenedor de iconos
const menu_respon = document.querySelector(".menu_responsive")
//notificacion:

const succesModal = document.querySelector(".add_modal")



//local storage

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) =>{
    localStorage.setItem("cart", JSON.stringify(cartList));
};


//renderizar productos:

const renderProduct = (product) =>{
    const { id, name, price, img} = product

    return`

    <div class="card_one">
        <img src=${img} alt=${name}>
            <div class="description">
                <a href="zapatilla.html"><p>${name}</p></a>
                <span><p>$${price}</p></span>
            </div>
            <button 
            class="buy" id="add_prod"
            data-id='${id}'
            data-name='${name}'
            data-img='${img}'
            data-price='${price}'>AGREGAR AL CARRITO</button>
           
           
  </div>

    `;
};

const renderDividedProducts = (index = 0) => {
    product_container.innerHTML += productsController.dividedProducts[index].map(renderProduct).join('');
};


const renderfilteredProducts = (category) =>{
    const productsList = productsData.filter(
        (product) => product.category === category
    );
    product_container.innerHTML = productsList.map(renderProduct).join('');
};

const renderfilterednovel = (category) =>{
    const productsList = productsData.filter(
        (product) => product.novelty === category
    );
     product_container.innerHTML = productsList.map(renderProduct).join('');
};

const renderProducts = (index = 0, category = undefined) =>{
    if (!category) {
        renderDividedProducts(index)
        return;
    }
    renderfilteredProducts(category);
     productsController.nextProductsIndex = 1;    
};


const changeFilterState = (e) =>{
    const selectedCategory = e.target.dataset.category;
    
    changeButtonActiveState(selectedCategory);
    changeShowMoreButton(selectedCategory);  
};


const changeButtonActiveState = (selectedCategory) => {

    const categories = [...categorieList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {

            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    })
};


changeShowMoreButton = (category) =>{
    if(!category) {
        btn_see_more.classList.remove("hidden");
        return;
    }
    btn_see_more.classList.add("hidden")
};


const applyFilter = (e) =>{

    if (!e.target.classList.contains("category_btn")) return;
    changeFilterState(e);
    if (!e.target.dataset.category) {
        product_container.innerHTML = '';
        renderProducts();        
    }if(e.target.dataset.category == productsData[0].novelty){
            product_container.innerHTML = '';
           renderfilterednovel(e.target.dataset.category)
    }
    else{
        product_container.innerHTML = '';
         renderProducts(0, e.target.dataset.category)
        }
};


const restartIndex = () =>{

}

const isLastIndexOF = () =>{
    return productsController.nextProductsIndex === productsController.productsLimit;

};

const showMoreProducts = () =>{
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex ++;
    if (isLastIndexOF()) {
        btn_see_more.classList.add("hidden")        
    }
}

//carrito

const renderCartProduct = (cartProduct) => {
    const { id, name , img, price, quantity} = cartProduct ;
    return`
        <div class="cart_element" >

            <img src=${img} alt=${name}>

            <div class="description_container">
            <div class="element_description">
            <h3>${name}</h3>
            </div>
            <div class="price_button">
            <div class="price_cart">
            <span>$${price}</span>
            </div>
            <div class="button_box">
            <button class="button_quantity down" id="btn_down" data-id=${id}>-</button>
                <span>${quantity}</span>
            <button class="button_quantity up" id="btn_up" data-id=${id}>+</button>
            </div>
            </div>
            </div>
        </div>
        `  
};

const opencart = (e) =>{
    if (e.target) {
        cart_section.classList.remove("hidden");
    }
    
};

const closecart = (e) =>{
    
    if (e.target) {
        cart_section.classList.add("hidden");
    }
}

const renderCart = () => {
    
    if (!cart.length) {
        cart_render.innerHTML = `<p class="empty_cart" > No hay productos en el carrito.</p>`;
        return;
    }
    cart_render.innerHTML = cart.map(renderCartProduct).join('');
};

const getCartTotal = () =>{
   return cart.reduce((acc, cur) => acc + Number(cur.price) * Number(cur.quantity), 0);
   
};

const showTotal = () =>{
    cart_total.innerHTML = `Total: $${getCartTotal().toFixed(2)}`;
};

const btnscart = () => {
    if (!cart.length) {
        button_buy_cart.classList.remove("cart_btns");
        button_clear_cart.classList.remove("cart_btns");
        button_buy_cart.classList.add("inactive")
        button_clear_cart.classList.add("inactive")
    } else{
        button_buy_cart.classList.remove("inactive");
        button_clear_cart.classList.remove("inactive");
        button_buy_cart.classList.add("cart_btns");
        button_clear_cart.classList.add("cart_btns");
    }
};

const productinfo = (id, name, img, price) =>{
    return {id, name, img, price};
}
const showSuccssModal = (msg) =>{
    succesModal.classList.add("active_modal");
    succesModal.textContent = msg ;
    setTimeout(() =>{
        succesModal.classList.remove("active_modal");
    },1500);

};

const checkCartState = () =>{
    saveLocalStorage(cart);
    renderCart(cart);
    showTotal(cart);
    btnscart();
}
const addUnitProduct = (product) =>{
    cart = cart.map(cartProduct =>{
    return cartProduct.id === product.id
        ? {...cartProduct, quantity: cartProduct.quantity + 1}
        : cartProduct
    })
}

const createCartProduct = (product) =>{
    cart = [...cart,{...product, quantity: 1}];
}


const addCart = (e) =>{
    if (!e.target.classList.contains("buy")) return;
    const  { id, name, img, price} = e.target.dataset;
    const product = productinfo(id, name, img, price);

    if (cart.some((p) => p.id === product.id)) {
        const producto = cart.find((p) => p.id === product.id)
        addUnitProduct(product);
        showSuccssModal("Se agregó una unidad correctamente");
    } 
    
    else{
        createCartProduct(product);
        showSuccssModal("El producto se a agregado al carrito")
    }

    checkCartState();
    
    
}

const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
}

const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    checkCartState();
}

const substractProductUnit = (existingProduct) =>{
    cart = cart.map((cartProduct) => {
        return cartProduct.id === existingProduct.id 
        ? {...cartProduct, quantity: cartProduct.quantity - 1}
        : cartProduct;
    });
};


const handleMinusBtnEvent = (id) =>{
    const existingCartProduct = cart.find((item) => item.id === id);

    if (existingCartProduct.quantity === 1) {
        if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
            removeProductFromCart(existingCartProduct);
        }
        return;
    }
    substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnitProduct(existingCartProduct);
};

const resetCartItems = () =>{
    
    if (cart.length > 0){
                cart = []
                checkCartState();
    }else {
        alert("no hay productos en el carrito")
    }

    
};

const handleQuantity = (e) => {
    
    if (e.target.classList.contains("down")) {
        handleMinusBtnEvent(e.target.dataset.id);
    }
    if (e.target.classList.contains("up")){
        handlePlusBtnEvent(e.target.dataset.id);
    }
    if (e.target.id === "cart_buy" && cart.length > 0) {
        if (window.confirm("¿Desea confirmar la compra?")) {
            resetCartItems();
            return
        }
    }else if (e.target.id === "empty_cart" && cart.length> 0) {
        if(window.confirm("¿Desea vaciar el carrito?")){
        resetCartItems();
        return;
        }
    }
    checkCartState();
};




//responsive menu 
const openToggle = (e) =>{

    if (e.target.id) {
        menu_respon.classList.toggle("hidden");
        menu_respon.innerHTML = "<a href='register.html'><p>Iniciar Sesion</p></a> <p id ='open_cart'>Carrito</p>"
    }

}

const CloseOnScroll = (e) =>{
    if (e) {
        menu_respon.classList.add("hidden");
        cart_section.classList.add("hidden")
    }
}

const hideMenu = (e) =>{
    if (e) {
        if (!menu_respon.classList.contains("hidden")) {
            menu_respon.classList.add("hidden")
        }
    }
}


const init = () =>{
    renderProducts();
    categories_container.addEventListener('click', applyFilter);
    btn_see_more.addEventListener('click', showMoreProducts);
    open_cart.addEventListener('click', opencart);
    close_cart_btn.addEventListener('click',closecart);
    document.addEventListener('DOMContentLoaded', renderCart);
    document.addEventListener('DOMContentLoaded', showTotal);
    product_container.addEventListener('click', addCart);
    cart_section.addEventListener('click', handleQuantity);
    toggleMenu.addEventListener('click', openToggle);
    menu_respon.addEventListener('click', opencart);
    window.addEventListener("scroll",CloseOnScroll);
    window.addEventListener("resize", hideMenu)
    };

init(); 

