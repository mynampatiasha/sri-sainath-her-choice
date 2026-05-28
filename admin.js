const firebaseConfig = {
  apiKey: "AIzaSyAv8WZPd7k6oGAsGX10NPAOp6iuqU3QE1w",
  authDomain: "experime-3251a.firebaseapp.com",
  projectId: "experime-3251a",
  storageBucket: "experime-3251a.firebasestorage.app",
  messagingSenderId: "256324869428",
  appId: "1:256324869428:web:02a6392b90e77b2f805961"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// UI Elements
const statusMsg = document.getElementById('status-msg');

function showStatus(msg) {
  statusMsg.textContent = msg;
  statusMsg.style.display = 'block';
  setTimeout(() => statusMsg.style.display = 'none', 3000);
}

// Tab Switching
document.querySelectorAll('.admin-sidebar nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.admin-sidebar nav a').forEach(a => a.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    
    link.classList.add('active');
    document.getElementById(`tab-${link.dataset.tab}`).classList.add('active');
  });
});

// ========================
// CATEGORIES MANAGEMENT
// ========================
const catForm = document.getElementById('cat-form');
const catsList = document.getElementById('cats-list');
const pCatSelect = document.getElementById('p-cat');

function loadCategories() {
  db.collection('categories').onSnapshot(snapshot => {
    catsList.innerHTML = '';
    pCatSelect.innerHTML = '<option value="">Select Category...</option>';
    
    snapshot.forEach(doc => {
      const cat = doc.data();
      catsList.innerHTML += `
        <div class="item-card">
          <strong>${cat.name}</strong>
          <span>ID: ${cat.id}</span>
          <button onclick="deleteCat('${doc.id}')">Delete</button>
        </div>
      `;
      pCatSelect.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
    });
  });
}

catForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('c-id').value.toLowerCase().replace(/\s+/g, '_');
  const name = document.getElementById('c-name').value;
  
  await db.collection('categories').add({ id, name });
  catForm.reset();
  showStatus('Category Added!');
});

window.deleteCat = async (id) => {
  if(confirm('Are you sure you want to delete this category?')) {
    await db.collection('categories').doc(id).delete();
  }
};

// ========================
// PRODUCTS MANAGEMENT
// ========================
const productForm = document.getElementById('product-form');
const productsList = document.getElementById('products-list');
const btnAddProduct = document.getElementById('btn-add-product');

function loadProducts() {
  db.collection('products').onSnapshot(snapshot => {
    productsList.innerHTML = '';
    snapshot.forEach(doc => {
      const p = doc.data();
      productsList.innerHTML += `
        <div class="item-card">
          <img src="${p.img}" alt="${p.name}">
          <strong>${p.name}</strong>
          <span>₹${p.price} <strike>₹${p.orig}</strike></span>
          <span>Cat: ${p.cat}</span>
          <button onclick="deleteProduct('${doc.id}')">Delete</button>
        </div>
      `;
    });
  });
}

productForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  btnAddProduct.disabled = true;
  btnAddProduct.textContent = "Uploading...";

  const file = document.getElementById('p-img').files[0];
  const name = document.getElementById('p-name').value;
  const price = Number(document.getElementById('p-price').value);
  const orig = Number(document.getElementById('p-orig').value);
  const cat = document.getElementById('p-cat').value;
  const desc = document.getElementById('p-desc').value;
  const tagsStr = document.getElementById('p-tags').value;
  const tags = tagsStr.split(',').map(t => t.trim()).filter(t => t);
  const metaTitle = document.getElementById('p-meta-title').value;
  const metaDesc = document.getElementById('p-meta-desc').value;

  try {
    const storageRef = storage.ref('products/' + Date.now() + '_' + file.name);
    const snapshot = await storageRef.put(file);
    const imgUrl = await snapshot.ref.getDownloadURL();

    await db.collection('products').add({
      name, price, orig, cat, desc, tags, metaTitle, metaDesc, img: imgUrl, inStock: true, createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    productForm.reset();
    showStatus('Product Added!');
  } catch (error) {
    console.error(error);
    alert('Error uploading product!');
  }

  btnAddProduct.disabled = false;
  btnAddProduct.textContent = "Add Product";
});

window.deleteProduct = async (id) => {
  if(confirm('Are you sure you want to delete this product?')) {
    await db.collection('products').doc(id).delete();
  }
};

// ========================
// BANNERS MANAGEMENT
// ========================
const bannerForm = document.getElementById('banner-form');
const bannersList = document.getElementById('banners-list');
const btnAddBanner = document.getElementById('btn-add-banner');

function loadBanners() {
  db.collection('banners').onSnapshot(snapshot => {
    bannersList.innerHTML = '';
    snapshot.forEach(doc => {
      const b = doc.data();
      bannersList.innerHTML += `
        <div class="item-card">
          <img src="${b.url}" alt="${b.alt}">
          <strong>${b.label}</strong>
          <button onclick="deleteBanner('${doc.id}')">Delete</button>
        </div>
      `;
    });
  });
}

bannerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  btnAddBanner.disabled = true;
  btnAddBanner.textContent = "Uploading...";

  const file = document.getElementById('b-img').files[0];
  const label = document.getElementById('b-label').value;
  const alt = document.getElementById('b-alt').value;

  try {
    const storageRef = storage.ref('banners/' + Date.now() + '_' + file.name);
    const snapshot = await storageRef.put(file);
    const imgUrl = await snapshot.ref.getDownloadURL();

    await db.collection('banners').add({
      label, alt, url: imgUrl, createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    bannerForm.reset();
    showStatus('Banner Added!');
  } catch (error) {
    console.error(error);
    alert('Error uploading banner!');
  }

  btnAddBanner.disabled = false;
  btnAddBanner.textContent = "Add Banner";
});

window.deleteBanner = async (id) => {
  if(confirm('Are you sure you want to delete this banner?')) {
    await db.collection('banners').doc(id).delete();
  }
};

// Initialize Admin Data
loadCategories();
loadProducts();
loadBanners();
