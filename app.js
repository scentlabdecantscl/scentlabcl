/* =========================================================================
   SCENT LAB CHILE - BASE DE DATOS DE PERFUMES E INTERACTIVIDAD
   ========================================================================= */

const CONFIG = {
  whatsappNumber: '56934040525',
  instagramUrl: 'https://www.instagram.com/scentlabdecants.cl/',
  instagramHandle: '@scentlabdecants.cl'
};

const PERFUMES_DATA = [
  {
    id: 'lattafa-yara',
    brand: 'Lattafa',
    name: 'Yara',
    concentration: 'Eau de Parfum',
    category: 'Árabes',
    tags: ['Árabes', 'Dulces / Noche'],
    images: ['yara-1.jpg', 'yara-2.jpg'],
    badge: 'Favorito Viral',
    description: 'Fragancia femenina dulce y cremosa inspirada en notas tropicales, vainilla dorada y orquídea suave.',
    notes: {
      salida: 'Mandarina, Orquídea, Heliotropo',
      corazon: 'Acorde tropical, Frutas golosas',
      fondo: 'Vainilla, Sándalo, Almizcle'
    },
    prices: { '3ml': 2000, '5ml': 3000, '10ml': 5000 }
  },
  {
    id: 'most-wanted-parfum',
    brand: 'Azzaro',
    name: 'The Most Wanted Parfum',
    concentration: 'Parfum',
    category: 'Diseñador',
    tags: ['Diseñador', 'Dulces / Noche'],
    images: ['most-wanted-parfum-1.jpg', 'most-wanted-parfum-2.jpg'],
    badge: 'Alta Gama',
    description: 'Seducción intensa y cálida con jengibre rojo especiado, maderas calientes y rica vainilla Bourbon.',
    notes: {
      salida: 'Jengibre rojo especiado',
      corazon: 'Acorde amaderado caliente',
      fondo: 'Vainilla Bourbon de Madagascar'
    },
    prices: { '3ml': 5000, '5ml': 7500, '10ml': 13500 }
  },
  {
    id: 'odyssey-mandarin-sky',
    brand: 'Armaf',
    name: 'Odyssey Mandarin Sky',
    concentration: 'Eau de Parfum',
    category: 'Árabes',
    tags: ['Árabes', 'Dulces / Noche'],
    images: ['odyssey-mandarin-sky-1.jpg', 'odyssey-mandarin-sky-2.jpg'],
    badge: 'Edición Especial',
    description: 'Mandarina jugosa acaramelada con matices de haba tonka y salvia. Gran proyección y dulzura.',
    notes: {
      salida: 'Mandarina, Naranja, Azafrán, Salvia',
      corazon: 'Caramelo, Haba tonka, Tagetes',
      fondo: 'Ambroxan, Sándalo, Cedro'
    },
    prices: { '3ml': 2500, '5ml': 3200, '10ml': 6000 }
  },
  {
    id: 'hawas-for-him',
    brand: 'Rasasi',
    name: 'Hawas For Him',
    concentration: 'Eau de Parfum',
    category: 'Árabes',
    tags: ['Árabes', 'Frescos / Diario'],
    images: ['hawas-for-him-1.jpg', 'hawas-for-him-2.jpg'],
    badge: 'Popular',
    description: 'Combinación icónica acuática y frutal con manzana verde, canela especiada y base de ámbar gris.',
    notes: {
      salida: 'Manzana, Bergamota, Limón, Canela',
      corazon: 'Ciruela, Flor de azahar, Cardamomo',
      fondo: 'Ámbar gris, Almizcle, Madera flotante, Pachulí'
    },
    prices: { '3ml': 2000, '5ml': 3000, '10ml': 5000 }
  },
  {
    id: 'amber-oud-gold',
    brand: 'Al Haramain',
    name: 'Amber Oud Gold Edition',
    concentration: 'Eau de Parfum',
    category: 'Árabes',
    tags: ['Árabes', 'Dulces / Noche'],
    images: ['amber-oud-gold-1.jpg', 'amber-oud-gold-2.jpg'],
    badge: 'Best Seller',
    description: 'Explosión frutal de melón dulce y piña envuelta en un manto dorado de ámbar, vainilla y almizcle.',
    notes: {
      salida: 'Bergamota, Notas verdes',
      corazon: 'Melón, Piña, Notas dulces, Ámbar',
      fondo: 'Almizcle, Vainilla, Notas amaderadas'
    },
    prices: { '3ml': 3500, '5ml': 5000, '10ml': 7500 }
  },
  {
    id: 'hawas-ice',
    brand: 'Rasasi',
    name: 'Hawas Ice',
    concentration: 'Eau de Parfum',
    category: 'Árabes',
    tags: ['Árabes', 'Frescos / Diario'],
    images: ['hawas-ice-1.jpg', 'hawas-ice-2.jpg'],
    badge: 'Top Ventas',
    description: 'Fragancia fresca y helada con notas de manzana verde helada, cítricos de Sicilia y fondo almizclado.',
    notes: {
      salida: 'Manzana congelada, Limón italiano, Bergamota, Anís estrellado',
      corazon: 'Ciruela, Flor de azahar del naranjo, Cardamomo',
      fondo: 'Almizcle, Ámbar, Musgo, Maderas a la deriva'
    },
    prices: { '3ml': 2500, '5ml': 4000, '10ml': 6000 }
  }
];

let currentCategory = 'Todos';
let searchQuery = '';
let cart = [];
const selectedSizes = {};
const selectedPhotoIndex = {};

try {
  const savedCart = localStorage.getItem('scentlab_cart');
  if (savedCart) cart = JSON.parse(savedCart);
} catch (e) {
  cart = [];
}

PERFUMES_DATA.forEach(p => {
  selectedSizes[p.id] = '5ml';
  selectedPhotoIndex[p.id] = 0;
});

const formatCLP = (amount) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(amount);
};

function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  } catch (err) {}
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {}
  document.body.removeChild(textArea);
}

function saveCart() {
  try {
    localStorage.setItem('scentlab_cart', JSON.stringify(cart));
  } catch (e) {}
}

function setPhotoIndex(perfumeId, index, event) {
  if (event) event.stopPropagation();
  selectedPhotoIndex[perfumeId] = index;
  renderPerfumes();
}

function changeSize(perfumeId, size) {
  selectedSizes[perfumeId] = size;
  renderPerfumes();
}

function buildSingleOrderMessage(perfumeId) {
  const perfume = PERFUMES_DATA.find(p => p.id === perfumeId);
  const size = selectedSizes[perfumeId] || '5ml';
  const price = perfume.prices[size];

  return `¡Hola Scent Lab Chile! 👋 Quisiera encargar este decant:\n\n` +
    `• Perfume: ${perfume.brand} - ${perfume.name} (${perfume.concentration})\n` +
    `• Formato: ${size}\n` +
    `• Valor: ${formatCLP(price)}\n\n` +
    `📍 Punto de entrega preferido (Talagante / Metro Línea 1 / Envío por pagar): `;
}

function getWhatsAppUrl(perfumeId) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(buildSingleOrderMessage(perfumeId))}`;
}

function copySingleOrder(perfumeId) {
  const text = buildSingleOrderMessage(perfumeId);
  copyToClipboard(text);
  showToast('Pedido copiado. Pégalo en nuestro DM de Instagram');
}

function renderPerfumes() {
  const grid = document.getElementById('perfumes-grid');
  const noResults = document.getElementById('no-results');
  
  const filtered = PERFUMES_DATA.filter(p => {
    const matchCategory = (currentCategory === 'Todos') || p.category === currentCategory || p.tags.includes(currentCategory);
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) ||
      p.notes.salida.toLowerCase().includes(q) ||
      p.notes.corazon.toLowerCase().includes(q) ||
      p.notes.fondo.toLowerCase().includes(q);

    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }
  
  noResults.classList.add('hidden');
  grid.innerHTML = filtered.map(perfume => {
    const activeSize = selectedSizes[perfume.id] || '5ml';
    const currentPrice = perfume.prices[activeSize];
    const activePhoto = selectedPhotoIndex[perfume.id] || 0;
    const currentImgUrl = perfume.images[activePhoto] || perfume.images[0];
    const fallbackSvg = `https://placehold.co/600x800/141418/d4af37?text=${encodeURIComponent(perfume.name)}`;
    const waUrl = getWhatsAppUrl(perfume.id);

    return `
      <div class="bg-brand-card rounded-2xl border border-white/10 hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg">
        
        <div onclick="openProductModal('${perfume.id}')" class="relative h-64 bg-gradient-to-b from-brand-black to-brand-card overflow-hidden flex items-center justify-center p-3 cursor-pointer" title="Haz clic para ver detalles">
          <img src="${currentImgUrl}" alt="${perfume.name}" class="h-full w-full object-cover rounded-xl filter drop-shadow-md group-hover:scale-105 transition-transform duration-500" onerror="this.onerror=null; this.src='${fallbackSvg}';">
          
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span class="px-2.5 py-1 rounded-full bg-brand-black/85 border border-brand-gold/40 text-[10px] text-brand-gold font-semibold uppercase tracking-wider backdrop-blur-sm">
              ${perfume.category}
            </span>
            ${perfume.badge ? `<span class="px-2.5 py-1 rounded-full bg-brand-gold text-black text-[10px] font-bold uppercase tracking-wider">${perfume.badge}</span>` : ''}
          </div>
          
          <div class="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 z-10">
            <button type="button" onclick="setPhotoIndex('${perfume.id}', 0, event)" class="px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${activePhoto === 0 ? 'bg-brand-gold text-black shadow-md' : 'text-gray-400 hover:text-white'}">
              Foto 1
            </button>
            <button type="button" onclick="setPhotoIndex('${perfume.id}', 1, event)" class="px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${activePhoto === 1 ? 'bg-brand-gold text-black shadow-md' : 'text-gray-400 hover:text-white'}">
              Foto 2
            </button>
          </div>
        </div>

        <div class="p-5 flex-grow flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="text-xs text-brand-gold uppercase tracking-widest font-semibold">${perfume.brand}</span>
              <button type="button" onclick="openProductModal('${perfume.id}')" class="text-[11px] text-gray-400 hover:text-brand-gold underline">Ver ficha</button>
            </div>
            <h3 onclick="openProductModal('${perfume.id}')" class="font-serif text-xl font-bold text-white leading-tight mb-1 cursor-pointer hover:text-brand-gold transition-colors">${perfume.name}</h3>
            <span class="text-[11px] text-gray-400 block mb-3 font-light">${perfume.concentration}</span>

            <p class="text-xs text-gray-300 font-light mb-4 leading-relaxed">${perfume.description}</p>

            <div class="bg-brand-black/60 p-3 rounded-xl border border-white/5 text-[11px] space-y-1 mb-5">
              <div><strong class="text-brand-gold font-medium">Salida:</strong> <span class="text-gray-300">${perfume.notes.salida}</span></div>
              <div><strong class="text-brand-gold font-medium">Corazón:</strong> <span class="text-gray-300">${perfume.notes.corazon}</span></div>
              <div><strong class="text-brand-gold font-medium">Fondo:</strong> <span class="text-gray-300">${perfume.notes.fondo}</span></div>
            </div>
          </div>

          <div>
            <label class="text-[10px] text-gray-400 uppercase tracking-wider block mb-2 font-semibold">Seleccionar Formato Decant:</label>
            <div class="grid grid-cols-3 gap-2 mb-4">
              <button type="button" onclick="changeSize('${perfume.id}', '3ml')" class="size-btn ${activeSize === '3ml' ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/10 text-gray-400 hover:border-white/30'} py-2 px-1 rounded-lg border text-center transition-all">
                <span class="block text-xs font-bold">3 ml</span>
                <span class="block text-[9px] opacity-75">${formatCLP(perfume.prices['3ml'])}</span>
              </button>
              <button type="button" onclick="changeSize('${perfume.id}', '5ml')" class="size-btn ${activeSize === '5ml' ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/10 text-gray-400 hover:border-white/30'} py-2 px-1 rounded-lg border text-center transition-all">
                <span class="block text-xs font-bold">5 ml</span>
                <span class="block text-[9px] opacity-75">${formatCLP(perfume.prices['5ml'])}</span>
              </button>
              <button type="button" onclick="changeSize('${perfume.id}', '10ml')" class="size-btn ${activeSize === '10ml' ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/10 text-gray-400 hover:border-white/30'} py-2 px-1 rounded-lg border text-center transition-all">
                <span class="block text-xs font-bold">10 ml</span>
                <span class="block text-[9px] opacity-75">${formatCLP(perfume.prices['10ml'])}</span>
              </button>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-white/10 mb-4">
              <span class="text-xs text-gray-400">Precio (${activeSize}):</span>
              <span class="font-serif text-xl font-bold text-brand-gold">${formatCLP(currentPrice)}</span>
            </div>

            <div class="space-y-2">
              <a href="${waUrl}" target="_blank" rel="noopener" class="w-full py-2.5 rounded-xl gold-button font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                Pedir por WhatsApp
              </a>

              <a href="${CONFIG.instagramUrl}" target="_blank" rel="noopener" onclick="copySingleOrder('${perfume.id}')" class="w-full py-2.5 rounded-xl ig-button font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Encargar por Instagram
              </a>

              <button type="button" onclick="addToCart('${perfume.id}')" class="w-full py-2 rounded-xl border border-white/10 hover:border-brand-gold/60 text-gray-300 hover:text-white text-xs font-semibold tracking-wider transition-colors flex items-center justify-center gap-1.5">
                <span>+ Agregar a mi lista de pedido</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }).join('');
}

function openProductModal(perfumeId) {
  const perfume = PERFUMES_DATA.find(p => p.id === perfumeId);
  if (!perfume) return;

  const modal = document.getElementById('product-modal');
  const content = document.getElementById('modal-content');
  const activeSize = selectedSizes[perfume.id] || '5ml';
  const currentPrice = perfume.prices[activeSize];
  const fallbackSvg = `https://placehold.co/600x800/141418/d4af37?text=${encodeURIComponent(perfume.name)}`;
  const waUrl = getWhatsAppUrl(perfume.id);

  content.innerHTML = `
    <button type="button" onclick="closeProductModal()" class="absolute top-4 right-4 z-20 bg-black/70 text-gray-300 hover:text-white p-2 rounded-full border border-white/15">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>

    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="bg-brand-black p-4 flex flex-col gap-3 justify-center">
        <img src="${perfume.images[0]}" alt="${perfume.name}" class="w-full h-64 object-cover rounded-xl" onerror="this.onerror=null; this.src='${fallbackSvg}';">
        <div class="grid grid-cols-2 gap-2">
          <img src="${perfume.images[0]}" alt="Vista 1" class="w-full h-20 object-cover rounded-lg border border-brand-gold/40" onerror="this.onerror=null; this.src='${fallbackSvg}';">
          <img src="${perfume.images[1] || perfume.images[0]}" alt="Vista 2" class="w-full h-20 object-cover rounded-lg border border-white/10" onerror="this.onerror=null; this.src='${fallbackSvg}';">
        </div>
      </div>

      <div class="p-6 flex flex-col justify-between space-y-4">
        <div>
          <span class="text-xs text-brand-gold uppercase tracking-widest font-semibold">${perfume.brand} • ${perfume.category}</span>
          <h3 class="font-serif text-2xl font-bold text-white mt-1">${perfume.name}</h3>
          <p class="text-xs text-gray-400 mb-3">${perfume.concentration}</p>
          <p class="text-xs text-gray-300 leading-relaxed mb-4">${perfume.description}</p>

          <div class="bg-brand-black/70 p-3 rounded-xl border border-white/5 text-xs space-y-1.5">
            <div><strong class="text-brand-gold">Salida:</strong> <span class="text-gray-300">${perfume.notes.salida}</span></div>
            <div><strong class="text-brand-gold">Corazón:</strong> <span class="text-gray-300">${perfume.notes.corazon}</span></div>
            <div><strong class="text-brand-gold">Fondo:</strong> <span class="text-gray-300">${perfume.notes.fondo}</span></div>
          </div>
        </div>

        <div class="space-y-3 pt-2 border-t border-white/10">
          <div class="grid grid-cols-3 gap-2">
            ${['3ml', '5ml', '10ml'].map(sz => `
              <button type="button" onclick="changeSize('${perfume.id}', '${sz}'); openProductModal('${perfume.id}')" class="${activeSize === sz ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/10 text-gray-400'} py-2 rounded-lg border text-center">
                <span class="block text-xs font-bold">${sz}</span>
                <span class="block text-[10px]">${formatCLP(perfume.prices[sz])}</span>
              </button>
            `).join('')}
          </div>

          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-400">Total seleccionado:</span>
            <span class="font-serif text-xl font-bold text-brand-gold">${formatCLP(currentPrice)}</span>
          </div>

          <a href="${waUrl}" target="_blank" rel="noopener" class="w-full py-2.5 rounded-xl gold-button font-bold text-xs uppercase tracking-wider flex items-center justify-center">
            Pedir por WhatsApp
          </a>
          <a href="${CONFIG.instagramUrl}" target="_blank" rel="noopener" onclick="copySingleOrder('${perfume.id}')" class="w-full py-2.5 rounded-xl ig-button font-bold text-xs uppercase tracking-wider flex items-center justify-center">
            Encargar por Instagram
          </a>
          <button type="button" onclick="addToCart('${perfume.id}'); closeProductModal()" class="w-full py-2 rounded-xl border border-white/15 text-gray-200 hover:text-white text-xs font-semibold">
            + Agregar a mi lista
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function addToCart(perfumeId) {
  const perfume = PERFUMES_DATA.find(p => p.id === perfumeId);
  const size = selectedSizes[perfumeId] || '5ml';
  const price = perfume.prices[size];

  const existingIndex = cart.findIndex(item => item.id === perfumeId && item.size === size);
  
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      id: perfume.id,
      brand: perfume.brand,
      name: perfume.name,
      size: size,
      price: price,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Agregado: ${perfume.name} (${size})`);
}

function buildCartOrderMessage() {
  const deliverySelect = document.getElementById('delivery-select');
  const deliveryMethod = deliverySelect ? deliverySelect.value : 'Talagante (Sin costo $0)';
  let text = `¡Hola Scent Lab Chile! 👋 Quisiera encargar la siguiente lista de decants:\n\n`;
  let total = 0;

  cart.forEach((item, i) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    text += `${i + 1}. ${item.brand} - ${item.name}\n   • Formato: ${item.size} x${item.quantity} (${formatCLP(subtotal)})\n`;
  });

  text += `\n--------------------------\n`;
  text += `💰 TOTAL ESTIMADO: ${formatCLP(total)}\n`;
  text += `📍 Entrega: ${deliveryMethod}`;
  return text;
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const cartContainer = document.getElementById('cart-items-container');
  const totalDisplay = document.getElementById('cart-total-price');
  const titleCount = document.getElementById('cart-count-title');
  const clearBtn = document.getElementById('cart-clear-btn');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (totalItems > 0) {
    badge.innerText = totalItems;
    badge.classList.remove('opacity-0');
    clearBtn.classList.remove('hidden');
    if (checkoutBtn) {
      checkoutBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(buildCartOrderMessage())}`;
    }
  } else {
    badge.classList.add('opacity-0');
    clearBtn.classList.add('hidden');
    if (checkoutBtn) {
      checkoutBtn.href = `https://wa.me/${CONFIG.whatsappNumber}`;
    }
  }

  titleCount.innerText = `(${totalItems})`;
  totalDisplay.innerText = formatCLP(totalPrice);

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="text-center py-12 text-gray-500">
        <svg class="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        <p class="text-xs">Tu lista está vacía</p>
        <p class="text-[10px] mt-1">Selecciona decants y presiona "+ Agregar a mi lista"</p>
      </div>
    `;
    return;
  }

  cartContainer.innerHTML = cart.map((item, index) => `
    <div class="flex items-center justify-between bg-brand-black p-3 rounded-xl border border-white/5">
      <div class="pr-2">
        <span class="text-[10px] text-brand-gold uppercase tracking-wider block font-medium">${item.brand}</span>
        <h4 class="text-xs font-bold text-white">${item.name}</h4>
        <span class="text-[10px] text-gray-400">Formato: ${item.size} • ${formatCLP(item.price)} c/u</span>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <div class="flex items-center gap-1.5 bg-brand-card px-2 py-1 rounded-lg border border-white/10 text-xs">
          <button type="button" onclick="updateQuantity(${index}, -1)" class="text-gray-400 hover:text-white px-1 font-bold">-</button>
          <span class="text-white font-semibold">${item.quantity}</span>
          <button type="button" onclick="updateQuantity(${index}, 1)" class="text-gray-400 hover:text-white px-1 font-bold">+</button>
        </div>
        <button type="button" onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-300 p-1" title="Eliminar">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function updateQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  toastMsg.innerText = msg;
  
  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 3000);
}

function initApp() {
  const drawer = document.getElementById('cart-drawer');
  const toggleBtn = document.getElementById('cart-toggle-btn');
  const closeBtn = document.getElementById('cart-close-btn');
  const backdrop = document.getElementById('cart-backdrop');

  function openDrawer() {
    drawer.classList.remove('pointer-events-none', 'opacity-0');
    drawer.classList.add('pointer-events-auto', 'opacity-100');
  }

  function closeDrawer() {
    drawer.classList.remove('pointer-events-auto', 'opacity-100');
    drawer.classList.add('pointer-events-none', 'opacity-0');
  }

  toggleBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  document.getElementById('delivery-select').addEventListener('change', updateCartUI);

  document.getElementById('cart-checkout-btn').addEventListener('click', (e) => {
    if (cart.length === 0) {
      e.preventDefault();
      showToast('Agrega decants a tu lista primero');
    }
  });

  document.getElementById('cart-ig-checkout-btn').addEventListener('click', (e) => {
    if (cart.length === 0) {
      e.preventDefault();
      showToast('Agrega decants a tu lista primero');
      return;
    }
    copyToClipboard(buildCartOrderMessage());
    showToast('Lista copiada. Pégalo en nuestro DM de Instagram');
  });

  document.getElementById('cart-clear-btn').addEventListener('click', () => {
    cart = [];
    saveCart();
    updateCartUI();
    showToast('Lista vaciada');
  });

  document.getElementById('modal-backdrop').addEventListener('click', closeProductModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeDrawer();
    }
  });

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });

  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.classList.toggle('hidden', !searchQuery);
    renderPerfumes();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    renderPerfumes();
  });

  function setActiveCategoryButton(category) {
    document.querySelectorAll('.filter-btn').forEach(b => {
      if (b.getAttribute('data-category') === category) {
        b.classList.add('active', 'bg-brand-gold', 'text-black');
        b.classList.remove('border', 'border-white/10', 'text-gray-300');
      } else {
        b.classList.remove('active', 'bg-brand-gold', 'text-black');
        b.classList.add('border', 'border-white/10', 'text-gray-300');
      }
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentCategory = e.currentTarget.getAttribute('data-category');
      setActiveCategoryButton(currentCategory);
      renderPerfumes();
    });
  });

  document.getElementById('reset-filters-btn').addEventListener('click', () => {
    currentCategory = 'Todos';
    searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    setActiveCategoryButton('Todos');
    renderPerfumes();
  });

  renderPerfumes();
  updateCartUI();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
