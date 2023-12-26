window.onload= fetchData();
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");
const cartNav = document.getElementById("cart-nav");
const productContainer  = document.getElementById("product1");
const searchText = document.getElementById("search-input");
const data = JSON.parse(localStorage.getItem('productCart'))
document.getElementById("count").innerHTML=data.length;

let productList = [];

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    })
}


function fetchData(){
    
    fetch('https://dummyjson.com/products')
    .then((response)=> response.json())
    .then((dataResponse)=> { 
        console.log(dataResponse)
        
        displayProducts(dataResponse.products)
    })
}




function displayProducts(data)
{
    productList=[...data];
   
    productContainer.innerHTML=''

   productList.map((products)=>
   {
    
   let product=document.createElement("div");
  
    product.className="pro"
    product.innerHTML=  `
     <img src=${products.thumbnail} alt="pro-1">
     <div class="des">
            <span>${products.brand}</span>
            <h5>${products.title}</h5>
            <div class="star">
            <i class="fa-solid fa-star"></i> <span>${products.rating}</span>
            </div>
            <h4>$${products.price}</h4>
    </div>
    <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a> `
    
        product.onclick=()=>sendName(products.title)
    
         productContainer.appendChild(product)
   })
}


function sendName(product)
{
   console.log(product)
  
    let name=localStorage.getItem("name")
    if(name!=null)
    {
        localStorage.removeItem("name")
    }

    localStorage.setItem("name",product)
    window.location.href="shop.html"

}

function handleChange(){
    let searchValue = searchText.value;
    if(searchValue == null || searchValue == ""){
        fetchData()
    }
    else{
        searchProduct(searchValue);
    }
}

function searchProduct(text)
{
   console.log(productList)
    let temp;
    temp=productList.filter((product)=>(product.title.toLowerCase().includes(text.toLowerCase()))||(product.brand.toLowerCase().includes(text.toLowerCase())))
    
    productContainer.innerHTML=''

    displayProducts(temp);
}









