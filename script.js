const products=[
  {id:1,name:'Ragi Cookies',price:180,image:'ragi.jpg',description:'Crunchy and healthy Ragi cookies.'},
  {id:2,name:'Jowar Chips',price:220,image:'jowar.jpg',description:'Crispy Jowar chips.'},
  {id:3,name:'Foxtail Bites',price:200,image:'foxtail.jpg',description:'Tasty Foxtail millet snacks.'},
  {id:4,name:'Kodo Mix',price:250,image:'kodo.jpg',description:'Healthy Kodo millet mix.'},
  {id:5,name:'Little Millet Laddoo',price:300,image:'little.jpg',description:'Nutritious laddoo.'},
];

let cart=JSON.parse(localStorage.getItem('cart'))||[];

function renderProducts(){
  const grid=document.getElementById('product-grid');
  grid.innerHTML='';
  products.forEach(p=>{
    const div=document.createElement('div');
    div.className='product-card';
    div.innerHTML=`
      <img src="${p.image}" onclick="openModal(${p.id})">
      <h4 onclick="openModal(${p.id})">${p.name}</h4>
      <p>₹${p.price}</p>
      <div class="quantity-controls">
        <button onclick="updateCart(${p.id},-1)">-</button>
        <span>${getQty(p.id)}</span>
        <button onclick="updateCart(${p.id},1)">+</button>
      </div>
    `;
    grid.appendChild(div);
  });
  updateCartDisplay();
}

function getQty(id){ const item=cart.find(i=>i.id===id); return item?item.qty:0; }

function updateCart(id,change){
  const item=cart.find(i=>i.id===id);
  if(item){ item.qty+=change; if(item.qty<=0) cart=cart.filter(i=>i.id!==id); }
  else if(change>0) cart.push({id,qty:1});
  localStorage.setItem('cart',JSON.stringify(cart));
  renderProducts();
}

function updateCartDisplay(){
  const count=cart.reduce((a,b)=>a+b.qty,0);
  document.querySelector('.cart-count').textContent=count;
}

// Cart Panel
const cartPanel=document.getElementById('cartPanel');
document.getElementById('cartIcon').onclick=()=>cartPanel.classList.add('active');
document.getElementById('closeCart').onclick=()=>cartPanel.classList.remove('active');

// Modal
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

// Popup
window.addEventListener('load',()=>{
  const popup=document.getElementById('popup');
  const closeBtn=document.querySelector('.popup-close');
  popup.style.display='flex';
  closeBtn.onclick=()=>popup.style.display='none';
  popup.onclick=(e)=>{ if(e.target===popup) popup.style.display='none'; }
});

renderProducts();
