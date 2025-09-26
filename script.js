// ---------- Products ----------
const products = [
  {id:1 name: "Ragi Mixture", image: "Ragi Mixture.jpeg", price: 360, description: "Crunchy and wholesome Ragi mixture.", offer: "", unit: "1Kg" },
  {id:2 name: "Ragi Chegodilu", image: "Ragi Chegodilu.jpeg", price: 360, description: "Traditional chegodilu made from ragi.", offer: "Fast Seller", unit: "1Kg" },
  {id:3 name: "Ragi Murukkulu", image: "Ragi Murukkulu.jpeg", price: 360, description: "Crispy murukkulu with millet goodness.", offer: "", unit: "1Kg" },
  {id:4 name: "Jowar Mixture", image: "Jowar Mixture.jpeg", price: 360, description: "Light and tasty jowar mixture.", offer: "", unit: "1Kg" },
  {id:5 name: "Jowar Murukkulu", image: "Jowar Murukkulu.jpeg", price: 360, description: "Light and tasty jowar mixture.", offer: "", unit: "1Kg" },
  {id:6 name: "Jowar Ribbon Pakodi", image: "Jowar Ribbon Pakodi.jpeg", price: 360, description: "Light and tasty jowar mixture.", offer: "Fast Seller", unit: "1Kg" },
  {id:7 name: "Arikalu Jantikalu", image: "Arikalu Jantikalu.jpeg", price: 360, description: "Light and tasty jowar mixture.", offer: "", unit: "1Kg" },
  {id:8 name: "Samalu Boondi", image: "Samalu Boondi.jpeg", price: 360, description: "Light and tasty jowar mixture.", offer: "Fast Seller", unit: "1Kg" },
  {id:9 name: "Foxtail Sev", image: "Foxtail Sev.jpeg", price: 360, description: "Light and tasty jowar mixture.", offer: "Fast Seller", unit: "1Kg" },
  {id:10 name: "Dry Fruit Laddu", image: "Dry Fruit Laddu.jpeg", price: 960, description: "Rich laddus with dry fruits.", offer: "Fast Seller", unit: "1Kg" },
  {id:11 name: "Cashew Bar", image: "Cashew Bar.jpeg", price: 150, description: "Crunchy cashew bars, great snack.", offer: "", unit: "1 Bar of 170g" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ---------- Render Products ----------
function renderProducts(){
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  products.forEach(product=>{
    const div = document.createElement('div');
    div.className='product-card';
    div.innerHTML=`
      ${product.offer?`<div class="offer-badge">${product.offer}</div>`:''}
      <img src="${product.image}" alt="${product.name}" onclick="openModal(${product.id})">
      <h4 onclick="openModal(${product.id})">${product.name}</h4>
      <p>₹${product.price}</p>
      <div class="quantity-controls">
        <button onclick="updateCart(${product.id}, -1)">-</button>
        <span>${getQty(product.id)}</span>
        <button onclick="updateCart(${product.id}, 1)">+</button>
      </div>
    `;
    grid.appendChild(div);
  });
  updateCartDisplay();
}
function getQty(id){ const item=cart.find(i=>i.id===id); return item?item.qty:0; }

// ---------- Cart Functions ----------
function updateCart(id,change){
  const item = cart.find(i=>i.id===id);
  if(item){ item.qty += change; if(item.qty<=0) cart=cart.filter(i=>i.id!==id); }
  else if(change>0) cart.push({id,qty:1});
  localStorage.setItem('cart',JSON.stringify(cart));
  renderProducts();
}
function updateCartDisplay(){
  const count = cart.reduce((a,b)=>a+b.qty,0);
  document.querySelector('.cart-count').textContent=count;
}

// ---------- Cart Panel ----------
const cartPanel=document.getElementById('cartPanel');
document.getElementById('cartIcon').onclick=()=>{ cartPanel.classList.add('active'); };
document.getElementById('closeCart').onclick=()=>{ cartPanel.classList.remove('active'); };

// ---------- Modal ----------
const modal=document.getElementById('productModal');
let currentProduct=null;
function openModal(id){
  currentProduct=products.find(p=>p.id===id);
  modal.style.display='flex';
  document.getElementById('modalImage').src=currentProduct.image;
  document.getElementById('modalName').textContent=currentProduct.name;
  document.getElementById('modalPrice').textContent='₹'+currentProduct.price;
  document.getElementById('modalDescription').textContent=currentProduct.description;
  document.getElementById('modalQty').textContent=getQty(id);
}
document.getElementById('closeProductModal').onclick=()=>modal.style.display='none';
document.getElementById('modalAddBtn').onclick=()=>{
  updateCart(currentProduct.id,1);
  document.getElementById('modalQty').textContent=getQty(currentProduct.id);
};
document.getElementById('modalRemoveBtn').onclick=()=>{
  updateCart(currentProduct.id,-1);
  document.getElementById('modalQty').textContent=getQty(currentProduct.id);
};

// ---------- Popup ----------
window.addEventListener("load", function () {
  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".popup-close");
  const shopBtn = document.querySelector(".popup-content .hero-btn");
  popup.style.display = "flex";
  closeBtn.onclick = () => popup.style.display = "none";
  popup.onclick = (e) => { if(e.target===popup) popup.style.display="none"; }
  shopBtn.onclick = () => popup.style.display = "none";
});

// ---------- Initialize ----------
renderProducts();
