const productsData = [
    {
        id: 1,
        name: "Revolution 5 black",
        price: 5200,
        img: "/imagenes/market/Revolution_5_black.jpg",
        category: "Nike",
        novelty: "Novedades",
    },
    
    {
        id: 2,
        name: "Revolution 5 grey",
        price: 5200,
        img: "/imagenes/market/Revolution_5_grey.jpg",
        category: "Nike",
        
    },
    
    {
        id: 3,
        name: "Revolution 5 blue",
        price: 5200,
        img: "/imagenes/market/Revolution_5_blue.jpg",
        category: "Nike",
        
    },

    
    {
        id: 4,
        name: "Vans black",
        price: 5200,
        img: "/imagenes/market/vans_black.jpeg",
        category: "Vans",
        novelty: "Novedades",
    },

    {
        id: 5,
        name: "Vans sm",
        price: 5200,
        img: "/imagenes/market/vans_sm.jpg",
        category: "Vans",
        
    },

    {
        id: 6,
        name: "Puma toy",
        price: 5200,
        img: "/imagenes/market/Puma_toy.jpeg",
        category: "Puma",
        novelty: "Novedades",
    },

    {
        id: 7,
        name: "Puma negra",
        price: 5200,
        img: "/imagenes/market/Puma_negra.jpeg",
        category: "Puma",
        
    },

    {
        id: 8,
        name: "Converse classic",
        price: 5200,
        img: "/imagenes/market//Converse_classic.jpeg",
        category: "Converse",
        
    },

    {
        id: 9,
        name: "Adidas falcon black",
        price: 5200,
        img: "/imagenes/market/adidas_run_falcon_black.jpeg",
        category: "Adidas",
        
    },

    {
        id: 10,
        name: "Adidas falcon red",
        price: 5200,
        img: "/imagenes/market/adidas_run_falcon_red.jpeg",
        category: "Adidas",
        
    },
    {
        id: 11,
        name: "Adidas falcon red",
        price: 5200,
        img: "/imagenes/market/adidas_run_falcon_red.jpeg",
        category: "Adidas",
        novelty: "Novedades",
    },
    {
        id: 12,
        name: "Adidas falcon red",
        price: 5200,
        img: "/imagenes/market/adidas_run_falcon_red.jpeg",
        category: "Adidas",
        
    },


];

const splitProducts = (size) =>{
    let dividedProducts = [];
    for(let i = 0; i < productsData.length; i += size) 
        dividedProducts.push(productsData.slice(i, i + size));
    return dividedProducts;
    }


const productsController = {
    dividedProducts : splitProducts(5),
    nextProductsIndex : 1,
    productsLimit: splitProducts(5).length
    
}


   