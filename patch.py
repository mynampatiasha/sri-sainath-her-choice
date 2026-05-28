import re

with open(r'c:\Users\user\Downloads\sri-sainath\index.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add firebase init
firebase_code = '''
const firebaseConfig = {
  apiKey: "AIzaSyAv8WZPd7k6oGAsGX10NPAOp6iuqU3QE1w",
  authDomain: "experime-3251a.firebaseapp.com",
  projectId: "experime-3251a",
  storageBucket: "experime-3251a.firebasestorage.app",
  messagingSenderId: "256324869428",
  appId: "1:256324869428:web:02a6392b90e77b2f805961"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let PRODUCTS = [];
let GALLERY_IMAGES = [];
'''

content = re.sub(r'const PRODUCTS = \[.*?\];', firebase_code, content, flags=re.DOTALL)
content = re.sub(r'const GALLERY_IMAGES = \[.*?\];', '', content, flags=re.DOTALL)

# In renderProducts, we need to load from DB first if PRODUCTS is empty
init_code = '''
async function initFirebaseData() {
  const pSnap = await db.collection('products').get();
  PRODUCTS = pSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  const gSnap = await db.collection('banners').get();
  GALLERY_IMAGES = gSnap.docs.map(doc => ({ url: doc.data().url, alt: doc.data().alt, label: doc.data().label }));
  
  renderProducts();
  renderGallery();
}

document.addEventListener('DOMContentLoaded', () => {
  initFirebaseData();
  renderReviews();
  setupFilterButtons();
  setupContactForm();
  updateCartCount();
});
'''

# Replace the existing DOMContentLoaded listener
content = re.sub(r'document\.addEventListener\(''DOMContentLoaded'', \(\) => \{.*?\}\);', init_code, content, flags=re.DOTALL)

with open(r'c:\Users\user\Downloads\sri-sainath\index.js', 'w', encoding='utf-8') as f:
    f.write(content)
