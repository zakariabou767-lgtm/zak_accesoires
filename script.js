const products=[
 {name:"Collier Élégant",price:89,img:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"},
 {name:"Bracelet Doré",price:69,img:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"},
 {name:"Boucles Chic",price:59,img:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"},
 {name:"Montre Élégante",price:149,img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"},
 {name:"Bague Minimaliste",price:79,img:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"},
 {name:"Sac Tendance",price:129,img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"}
];

let cart=[];
const grid=document.getElementById("productsGrid");
const search=document.getElementById("search");

function render(list=products){
 grid.innerHTML=list.length?list.map((p,i)=>`
 <article class="card">
   <img src="${p.img}" alt="${p.name}" loading="lazy">
   <div class="card-body">
     <h3>${p.name}</h3>
     <div class="price">${p.price} DH</div>
     <button class="btn" onclick="addToCart(${products.indexOf(p)})">Acheter</button>
   </div>
 </article>`).join(""):"<p>Aucun produit trouvé.</p>";
}
function addToCart(i){cart.push(products[i]);updateCart();openCart()}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.length;
 document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`
 <div class="cart-item"><span>${p.name}</span><strong>${p.price} DH <button onclick="removeItem(${i})">×</button></strong></div>`).join(""):"<p>Votre panier est vide.</p>";
 document.getElementById("total").textContent=cart.reduce((s,p)=>s+p.price,0)+" DH";
}
function removeItem(i){cart.splice(i,1);updateCart()}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
search.oninput=()=>{const q=search.value.toLowerCase();render(products.filter(p=>p.name.toLowerCase().includes(q)))};

document.getElementById("themeBtn").onclick=()=>{
 document.body.classList.toggle("dark");
 document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀️":"🌙";
};

document.getElementById("orderBtn").onclick=()=>{
 if(!cart.length)return alert("Votre panier est vide.");
 const items=cart.map(p=>`${p.name} - ${p.price} DH`).join("\n");
 const total=cart.reduce((s,p)=>s+p.price,0);
 const msg=encodeURIComponent(`Bonjour ZAK Accessoires, je souhaite commander :\n${items}\nTotal: ${total} DH`);
 window.open(`https://www.instagram.com/zak_accesoires/`,"_blank");
 alert("Votre panier est prêt. Envoyez-nous les détails sur Instagram.");
};

render();
updateCart();
