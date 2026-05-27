/* ═══════════════════════════════════════════════
   SRI SAINATH HER CHOICE — index.js
   Handles: Products, Cart, Reviews, Gallery,
            Contact Form, Filters, Nav, FAQ
═══════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const PRODUCTS = [
  {
    id: 1,
    name: "Floral Vine Kurti Set",
    cat: 'ladies_wear',
    price: 1200,
    orig: 1600,
    img: 'Floral_Vine_Kurta_Set_2.png',
    tags: ['Kurti', 'Daily Wear', 'Floral'],
    inStock: true,
    desc: 'Elegant ladies kurti set with beautiful floral vine designs for daily wear.',
  },
  {
    id: 2,
    name: 'Premium Girls Party Dress',
    cat: 'kids_wear',
    price: 850,
    orig: 1100,
    img: 'girl_dress.webp',
    tags: ['Kids', 'Party', 'Cute'],
    inStock: true,
    desc: 'Cute and comfortable party wear dress for young girls. Excellent fabric quality.',
  },
  {
    id: 3,
    name: 'Red Bridal Ethnic Wear',
    cat: 'ethnic_wear',
    price: 4500,
    orig: 5500,
    img: 'srs_kanjeevaram_red_1779810369174.png',
    tags: ['Bridal', 'Red', 'Premium'],
    inStock: true,
    desc: 'Stunning red bridal wear with intricate gold detailing for special occasions.',
  },
  {
    id: 4,
    name: 'Traditional Art Saree',
    cat: 'ladies_wear',
    price: 1550,
    orig: 1750,
    img: 'Dashavatara_Panel_Saree_2.png',
    tags: ['Traditional', 'Art', 'Exclusive'],
    inStock: true,
    desc: 'Exclusive hand-painted traditional artwork saree for a unique, cultural look.',
  },
  {
    id: 5,
    name: 'Assorted Silk Bundle',
    cat: 'ethnic_wear',
    price: 8500,
    orig: 9500,
    img: 'srs_saree_circle_1779812099822.png',
    tags: ['Bundle', 'Gift', 'Silk'],
    inStock: true,
    desc: 'A beautiful multi-color bundle of premium silk sarees. Great for gifting!',
  }
];

const REVIEWS = [
  {
    name: 'Prashanthi Kovuru',
    loc: 'Anantapur',
    stars: 5,
    text: 'Collection in her choice anantapur is too good must visit ..staff is very supportive and very cooperative',
    date: '7 months ago',
  },
  {
    name: 'Naga Bindu',
    loc: 'Local Guide',
    stars: 4,
    text: 'Nice wearable items and reasonable prices.',
    date: '5 months ago',
  },
  {
    name: 'Happy Customer',
    loc: 'Anantapur',
    stars: 5,
    text: 'Best place for shopping in whole Anantapuram for kids & ladies collection.',
    date: 'Recent',
  },
  {
    name: 'Verified Shopper',
    loc: 'Anantapur',
    stars: 5,
    text: 'Very good shopping experience with reasonable prices. Definitely coming back for more ethnic wear.',
    date: 'Recent',
  },
  {
    name: 'Frequent Buyer',
    loc: 'Kamalanagar',
    stars: 5,
    text: 'Staff is excellent and the boutique has a fantastic atmosphere. Quality of the material is great.',
    date: 'Recent',
  }
];

const GALLERY_IMAGES = [
  {
    url: 'Floral_Vine_Kurta_Set_2.png',
    alt: 'Premium ladies wear',
    label: 'Premium Ladies Wear',
  },
  {
    url: 'girl_dress.webp',
    alt: 'Beautiful kids party dress',
    label: 'Beautiful Kids Collection',
  },
  {
    url: 'srs_kanjeevaram_red_1779810369174.png',
    alt: 'Colorful ethnic styles',
    label: 'Ethnic Styles',
  },
  {
    url: 'Dashavatara_Panel_Saree_2.png',
    alt: 'Reasonable and stylish prices',
    label: 'Reasonable Prices',
  },
  {
    url: 'sainath_contact_cropped.png',
    alt: 'Boutique interior in Raghuveera Towers',
    label: 'Raghuveera Towers',
  },
];

const FREE_SHIPPING_THRESHOLD = 2000;
const SHIPPING_COST           = 50;

/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */

let cart         = [];
let activeFilter = 'all';

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function inr(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function discount(price, orig) {
  if (price === 0) return 'Free';
  return Math.round(((orig - price) / orig) * 100) + '% off';
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ─────────────────────────────────────────────
   PRODUCTS
───────────────────────────────────────────── */

function renderProducts(filter) {
  const grid    = document.getElementById('products-grid');
  const countEl = document.getElementById('prod-count');

  const filtered = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === filter);

  countEl.textContent = filter === 'all'
    ? `Showing all ${PRODUCTS.length} pieces`
    : `Showing ${filtered.length} of ${PRODUCTS.length} pieces`;

  grid.innerHTML = filtered.map(p => {
    const savings = discount(p.price, p.orig);
    return `
      <div class="card" data-id="${p.id}">
        <div class="card-img">
          <img
            src="${p.img}"
            alt="${p.name}"
            loading="lazy"
            onerror="this.style.background='#d4b896';this.removeAttribute('src')"
          />
          ${!p.inStock ? `
            <div class="out-stock-overlay">
              <div class="out-stock-label">Out of Stock</div>
            </div>` : ''}
        </div>
        <div class="card-body">
          <div class="card-cat">${p.cat.replace('_', ' ')}</div>
          <div class="card-name">${p.name}</div>
          <div class="card-desc">${p.desc}</div>
          <div class="card-row">
            <div>
              <span class="price">${inr(p.price)}</span>
              <span class="price-old">${inr(p.orig)}</span>
              <span class="savings-pill">${savings}</span>
            </div>
            <button
              class="add-btn"
              data-product-id="${p.id}"
              ${!p.inStock ? 'disabled' : ''}
              aria-label="${p.inStock ? 'Add ' + p.name + ' to cart' : 'Out of stock'}"
            >
              ${p.inStock ? 'Add to cart' : 'Sold out'}
            </button>
          </div>
          <div class="card-tags">
            ${p.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(parseInt(btn.dataset.productId, 10));
    });
  });
}

/* ─────────────────────────────────────────────
   FILTERS
───────────────────────────────────────────── */

function initFilters() {
  const container = document.getElementById('filters');
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.cat;
    renderProducts(activeFilter);
  });
}

/* ─────────────────────────────────────────────
   CART
───────────────────────────────────────────── */

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product || !product.inStock) return;
  cart.push({ ...product });
  renderCart();
  showToast(`${product.name} added to cart 🛍️`);
  
  const panel = document.getElementById('cart-panel');
  if (!panel.classList.contains('open')) {
    toggleCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');

  countEl.textContent   = cart.length;
  countEl.style.display = cart.length ? 'flex' : 'none';

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        Your cart is empty.<br>
        Explore our collection and add some pieces!
      </div>`;
    return;
  }

  const subtotal = cart.reduce((sum, p) => sum + p.price, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total    = subtotal + shipping;

  itemsEl.innerHTML = `
    ${cart.map((p, i) => `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${p.img}" alt="${p.name}"
            onerror="this.style.background='#d4b896';this.removeAttribute('src')" />
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${inr(p.price)}</div>
        </div>
        <button class="cart-rm" data-index="${i}" aria-label="Remove ${p.name} from cart">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('')}
    <div class="cart-total-box">
      <div class="cart-total-row"><span>Subtotal</span><span>${inr(subtotal)}</span></div>
      <div class="cart-total-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : inr(shipping)}</span></div>
      ${shipping === 0
        ? `<div class="free-ship-note">✓ Free shipping applied on orders above ${inr(FREE_SHIPPING_THRESHOLD)}</div>`
        : `<div style="font-size:11px;color:var(--muted);margin-bottom:4px">
             Add ${inr(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
           </div>`}
      <div class="cart-total-row grand"><span>Total</span><span>${inr(total)}</span></div>
    </div>
    <button class="checkout-btn" id="checkout-btn">Proceed to Checkout →</button>
  `;

  itemsEl.querySelectorAll('.cart-rm').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.index, 10)));
  });

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      document.getElementById('checkout-modal').classList.add('open');
      document.getElementById('checkout-overlay').classList.add('active');
    });
  }
}

function toggleCart() {
  const panel   = document.getElementById('cart-panel');
  const overlay = document.getElementById('cart-overlay');
  const isOpen  = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  overlay.classList.toggle('active', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function initCart() {
  document.getElementById('cart-toggle-btn').addEventListener('click', toggleCart);
  document.getElementById('cart-close-btn').addEventListener('click', toggleCart);
  document.getElementById('cart-overlay').addEventListener('click', toggleCart);
}

/* ── CHECKOUT ───────────────────────────────── */

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('open');
  document.getElementById('checkout-overlay').classList.remove('active');
}

function initCheckout() {
  document.getElementById('checkout-close-btn').addEventListener('click', closeCheckout);
  document.getElementById('checkout-overlay').addEventListener('click', closeCheckout);
  
  const locBtn = document.getElementById('co-location-btn');
  locBtn.addEventListener('click', () => {
    const status = document.getElementById('co-location-status');
    status.textContent = 'Locating...';
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser.';
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      document.getElementById('co-coords').value = `${lat},${lon}`;
      status.textContent = `Location captured (${lat.toFixed(4)}, ${lon.toFixed(4)}). Fetching address...`;
      locBtn.style.background = '#e6f4ea';
      locBtn.style.color = '#137333';
      locBtn.style.borderColor = '#ceead6';
      
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await res.json();
        if (data && data.display_name) {
          document.getElementById('co-address').value = data.display_name;
          status.textContent = `Location and address captured successfully.`;
        } else {
          status.textContent = `Location captured, but could not fetch street address.`;
        }
      } catch (e) {
        status.textContent = `Location captured, but could not fetch street address.`;
      }
    }, (err) => {
      status.textContent = 'Unable to retrieve your location. Please check browser permissions.';
    });
  });
  
  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const name = document.getElementById('co-name').value;
    const phone = document.getElementById('co-phone').value;
    const address = document.getElementById('co-address').value;
    const coords = document.getElementById('co-coords').value;
    
    let text = `*New Order - SRI SAINATH HER CHOICE*\n\n`;
    text += `*Customer Details*\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n`;
    if (coords) {
      text += `GPS Location: https://maps.google.com/?q=${coords}\n`;
    }
    
    text += `\n*Order Items*\n`;
    const subtotal = cart.reduce((sum, p) => sum + p.price, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shipping;
    
    cart.forEach((p, i) => {
      text += `${i+1}. ${p.name} - ₹${p.price.toLocaleString('en-IN')}\n`;
    });
    
    text += `\nSubtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;
    text += `Shipping: ${shipping === 0 ? 'Free' : '₹' + shipping}\n`;
    text += `*Total: ₹${total.toLocaleString('en-IN')}*`;
    
    const waUrl = `https://wa.me/918978499561?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    
    closeCheckout();
    cart = [];
    renderCart();
    const panel = document.getElementById('cart-panel');
    if (panel.classList.contains('open')) toggleCart();
    
    document.getElementById('checkout-form').reset();
    document.getElementById('co-location-status').textContent = '';
    locBtn.style = 'width: 100%; font-size: 13px; padding: 10px; display: flex; align-items: center; justify-content: center; gap: 8px;';
    showToast('Order placed successfully!');
  });
}

/* ─────────────────────────────────────────────
   REVIEWS
───────────────────────────────────────────── */

function renderReviews() {
  document.getElementById('reviews-grid').innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(r.stars)}</div>
      <div class="review-text">"${r.text}"</div>
      <div class="review-author">${r.name} · ${r.loc}</div>
      <div class="review-date">${r.date}</div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   GALLERY
───────────────────────────────────────────── */

function renderGallery() {
  document.getElementById('gallery-grid').innerHTML = GALLERY_IMAGES.map(g => `
    <div class="g-img">
      <img
        src="${g.url}"
        alt="${g.alt}"
        loading="lazy"
        onerror="this.style.background='#d4b896';this.removeAttribute('src')"
      />
      <div class="g-label">${g.label}</div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */

function initCustomFields() {
  const typeSelect  = document.getElementById('cf-type');
  const customFields = document.getElementById('custom-fields');
  typeSelect.addEventListener('change', () => {
    customFields.style.display = typeSelect.value === 'custom_order' ? 'flex' : 'none';
  });
}

function validateForm() {
  let valid = true;
  const rules = [
    { id: 'cf-name',    errId: 'err-name',    test: v => v.trim().length >= 2,                         msg: 'Please enter your full name.' },
    { id: 'cf-phone',   errId: 'err-phone',   test: v => /^[6-9]\d{9}$/.test(v.replace(/\s/g, '')),   msg: 'Please enter a valid 10-digit Indian mobile number.' },
    { id: 'cf-email',   errId: 'err-email',   test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email address.' },
    { id: 'cf-type',    errId: 'err-type',    test: v => v !== '',                                     msg: 'Please select an enquiry type.' },
    { id: 'cf-message', errId: 'err-message', test: v => v.trim().length >= 10,                        msg: 'Please write at least a short message (10+ characters).' },
  ];
  rules.forEach(rule => {
    const field = document.getElementById(rule.id);
    const errEl = document.getElementById(rule.errId);
    const ok    = rule.test(field.value);
    errEl.textContent = ok ? '' : rule.msg;
    field.classList.toggle('error', !ok);
    if (!ok) valid = false;
  });
  return valid;
}

function clearFormErrors() {
  ['cf-name','cf-phone','cf-email','cf-type','cf-message'].forEach(id => {
    document.getElementById(id).classList.remove('error');
  });
  ['err-name','err-phone','err-email','err-type','err-message'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  clearFormErrors();
  if (!validateForm()) return;

  const submitBtn  = document.getElementById('form-submit');
  const submitText = document.getElementById('submit-text');
  const submitIcon = document.getElementById('submit-icon');
  const successEl  = document.getElementById('form-success');

  const name = document.getElementById('cf-name').value;
  const phone = document.getElementById('cf-phone').value;
  const email = document.getElementById('cf-email').value;
  const type = document.getElementById('cf-type').options[document.getElementById('cf-type').selectedIndex].text;
  const product = document.getElementById('cf-product').options[document.getElementById('cf-product').selectedIndex].text;
  const motif = document.getElementById('cf-motif').value;
  const fabric = document.getElementById('cf-fabric').options[document.getElementById('cf-fabric').selectedIndex].text;
  const colors = document.getElementById('cf-colors').value;
  const budget = document.getElementById('cf-budget').options[document.getElementById('cf-budget').selectedIndex].text;
  const message = document.getElementById('cf-message').value;
  const isWhatsapp = document.getElementById('cf-whatsapp').checked;

  let text = `*New Contact / Enquiry (Sri Sainath Her Choice)*\n\n`;
  text += `*Details*\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nEnquiry Type: ${type}\n`;
  
  if (document.getElementById('cf-product').value) text += `Product Category: ${product}\n`;
  
  if (document.getElementById('cf-type').value === 'custom_order') {
    text += `\n*Preferences*\n`;
    if (motif) text += `Specific Requirements: ${motif}\n`;
    if (document.getElementById('cf-fabric').value) text += `Fabric: ${fabric}\n`;
    if (colors) text += `Colors: ${colors}\n`;
    if (document.getElementById('cf-budget').value) text += `Budget: ${budget}\n`;
  }
  
  text += `\n*Message*\n${message}\n`;
  if (isWhatsapp) text += `\n_(Customer is happy to be contacted on WhatsApp)_`;

  const waUrl = `https://wa.me/918978499561?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
  
  document.getElementById('contact-form').reset();
  document.getElementById('custom-fields').style.display = 'none';
  showToast('Redirecting to WhatsApp...');
  successEl.style.display = 'flex';
}

function initContactForm() {
  initCustomFields();
  document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
  ['cf-name','cf-phone','cf-email','cf-type','cf-message'].forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const errEl = document.getElementById(id.replace('cf-','err-'));
      if (errEl) errEl.textContent = '';
    });
  });
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all others
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
      });
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ─────────────────────────────────────────────
   NAV HAMBURGER
───────────────────────────────────────────── */

function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  renderReviews();
  renderGallery();
  renderCart();
  initFilters();
  initCart();
  initCheckout();
  initContactForm();
  initFAQ();
  initNav();
});
