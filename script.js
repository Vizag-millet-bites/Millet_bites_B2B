// ---------- Products ----------
const products = [
  {id:1,name:'Ragi Cookies',price:180,description:'Crunchy Ragi cookies.',image:'ragi.jpg',offer:'10% Off'},
  {id:2,name:'Jowar Chips',price:220,description:'Healthy Jowar chips.',image:'jowar.jpg',offer:'5% Off'},
  {id:3,name:'Foxtail Bites',price:200,description:'Tasty Foxtail millet snacks.',image:'foxtail.jpg',offer:''},
  {id:4,name:'Kodo Mix',price:250,description:'Kodo millet mix.',image:'kodo.jpg',offer:'15% Off'},
  {id:5,name:'Little Millet Laddoo',price:300,description:'Nutritious laddoo.',image:'little.jpg',offer:''},
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
