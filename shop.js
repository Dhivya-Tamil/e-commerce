let product=localStorage.getItem("name");
const proDetails=document.getElementById("pro-details")
const productContainer=document.querySelector(".product-container")
console.log(product)

async function singleProduct()
{
    const response=await fetch(`https://dummyjson.com/products/search?q=${product}`)
    const data = await response.json();
    console.log(data);
    displayProduct(data.products[0])
}


singleProduct();

function displayProduct(product)
{
    const proimage=document.createElement("div");
    proimage.className="pro-image"
    proDetails.innerHTML='';
    proimage.innerHTML=`
    <img src=${product.thumbnail} alt="" width="100%" id="MainImg">
   
    <div class="small-imgs">
        <div class="small-imgs-col">
            <img src=${product.images[0]} alt="" width="100%" class="small-img">
        </div>
        <div class="small-imgs-col">
            <img src=${product.images[1]} alt="" width="100%" class="small-img">
        </div>
        <div class="small-imgs-col">
            <img src=${product.images[2]} alt="" width="100%" class="small-img">
        </div>           
    </div>`
    proDetails.appendChild(proimage);

const MainImg=document.getElementById("MainImg");
const SmallImg=document.getElementsByClassName("small-img");

for(let img of SmallImg)
{
    img.addEventListener("click",()=>
    {
      MainImg.src=img.src
    })
}

const singleProDetails=document.createElement("div");
singleProDetails.className="single-pro-details";
singleProDetails.innerHTML=`

<h6>${product.brand}</h6>
<h2>${product.title}</h2>
<h2>$${product.price}</h2>

<button onclick="addCart(${product.id})" class="normal">Add to Cart</button>
<button onclick='window.location.href="cart.html"' class="normal">Go to Cart</button>
<h4>Product Details</h4>
<p>${product.description}</p>
<div class="desc-pro">
<h2 >${product.stock} <span style="color: green;">On stock</span></h2>
</div>
<div class="desc-pro">
<h2>${product.rating} <span style="color: red;">Reviews</span></h2>

</div>
`

proDetails.appendChild(singleProDetails)
 let category=product.category;
 getCategory(category)
 window.scrollTo({
    top:0,
    behavior:"smooth"
 })

}

async function getCategory(category)
{
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data= await response.json();
    displayCategory(data.products)
   
}

function displayCategory(datas)
{
   let productList=[...datas];
   

   productList.map((products)=>
   {
    
   let product=document.createElement("div");
  
    product.className="product"
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
    
       
        product.onclick=()=>displayProduct(products)
         productContainer.appendChild(product)
   })
}


// Add cart

function addCart(id){
    alert("Item added to cart")
    console.log("new id",id);
    addTocart(id);
}
 
function addTocart(id){
    console.log(id);

    fetch(`https://dummyjson.com/products/${id}`)
    .then((response)=> response.json())
    .then(data =>{
        console.log("single",data);

        const productCart = JSON.parse(localStorage.getItem('productCart')) || [];
        productCart.push(data);
        localStorage.setItem("productCart", JSON.stringify(productCart));       
    })
    const data = JSON.parse(localStorage.getItem('productCart'))
    displayCart();
}
 
function delElement(id){
    const productCart = JSON.parse(localStorage.getItem('productCart'))
    const filtered = productCart.filter((data)=> data.id != id);
    const ele = document.querySelector(".row");
    ele.remove();
    setTimeout(()=>{
        document.location.reload();
    },0)
    localStorage.setItem("productCart", JSON.stringify(filtered));
    console.log(filtered)
    displayCart();
}

function displayCart(){
    let total = 0;
    const data = JSON.parse(localStorage.getItem('productCart'))
    document.getElementById("count").innerHTML=data.length;
    const tableDataCart = document.getElementById('table-data');
    const coupon = document.getElementById('coupon');

    console.log(data,"datalent")

    if(data.length===0){
        document.getElementById('subtotal').innerHTML = "Your cart is empty";
        document.getElementById('cart').style.display = "none";
        document.getElementById('checkout-btn').style.display = "none";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else{
        data.map((item,i) =>{
            let tableRow = document.createElement('tr');
            tableRow.innerHTML = `
            <td><img src=${item.thumbnail} /></td>
            <td id="title"><span>${item.title}</span></td>
            <td class="price">${item.price}</td>
            <td><input type="number" value="0"  class="cart-input" oninput="handleprice(${item.price})"></td>
            <td class="sub-tot">${item.price}</td>
            <td><i class="far fa-times-circle"  onclick='delElement(${item.id})'></i></td>`;
        
            tableRow.classList.add('row');
            tableDataCart.appendChild(tableRow);
            
            // total = total + Number(`${data.price}`);
            // document.getElementById("total").innerHTML = total;
          })
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click',()=>{
        checkoutBtn.innerHTML = " Your order placed successfully";
        setTimeout(()=>{
            checkoutBtn.innerHTML = "Proceed to checkout";
        },2000)
    })

}
displayCart()


document.getElementById("total").innerHTML = `$ ${0.00}`;
function handleprice(price){
    let total = 0, newPrice=0;
    let cartValue = document.querySelector(".cart-input").value;
    console.log("cartValue",cartValue);
    console.log("price",price);

   if(cartValue > 0){
    newPrice = newPrice +  Number(price) *  Number(cartValue);  

    document.querySelector(".sub-tot").innerHTML = newPrice;
    
   }
   
       total = total + newPrice ;
       document.getElementById("total").innerHTML = total;
}

