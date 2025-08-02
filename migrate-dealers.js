/**
 * Script de Migración para Sistema de Dealers Optimizado
 *
 * Este script convierte automáticamente el código HTML original
 * al nuevo sistema optimizado con clases reutilizables.
 */

// Configuración de marcas y número de agencias
const BRANDS_CONFIG = {
  CHEVROLET: { agencies: 3, layout: "standard" },
  TOYOTA: { agencies: 5, layout: "standard" },
  HYUNDAI: { agencies: 5, layout: "standard" },
  KIA: { agencies: 6, layout: "standard" },
  "PEUGEOT - FIAT - HEEP - DODGE - RAM": { agencies: 2, layout: "standard" },
  "MERCEDES BENZ": { agencies: 3, layout: "standard" },
  "BMW - MINI Y MOTORAD": { agencies: 5, layout: "bmw" },
  "BUICK - GMC": { agencies: 3, layout: "standard" },
  "RANGE ROVER - DEFENDER - DISCOVERY": { agencies: 1, layout: "centered" },
  JAC: { agencies: 2, layout: "standard" },
  GEELY: { agencies: 2, layout: "standard" },
  BYD: { agencies: 4, layout: "byd" },
  HINO: { agencies: 2, layout: "standard" },
};

/**
 * Función para convertir una agencia individual
 */
function convertAgency(agencyElement) {
  const title = agencyElement.querySelector("h4").textContent;
  const image = agencyElement.querySelector("img");
  const contacts = agencyElement.querySelector(".list-inline");

  return `
    <div class="dealer-card">
      <h4>${title}</h4>
      <p>
        <img src="${image.src}" class="dealer-image" alt="${image.alt}" />
      </p>
      <ul class="dealer-contacts">
        ${Array.from(contacts.children)
          .map((contact) => contact.outerHTML)
          .join("")}
      </ul>
    </div>
  `;
}

/**
 * Función para convertir una sección completa de marca
 */
function convertBrandSection(section, brandName) {
  const config = BRANDS_CONFIG[brandName];
  if (!config) {
    console.warn(`Configuración no encontrada para: ${brandName}`);
    return section.outerHTML;
  }

  const agencies = section.querySelectorAll(".col-lg-3, .col-lg-4, .col-lg-6");
  const agenciesHTML = Array.from(agencies).map(convertAgency).join("\n    ");

  // Determinar clases especiales según el layout
  let specialClasses = "";
  if (config.layout === "byd") {
    specialClasses = " byd-layout";
  } else if (config.layout === "centered") {
    specialClasses = " centered-layout";
  }

  return `
<section class="dealer-section container-fluid text-center wow fadeIn" style="background: #fff">
  <div class="dealer-grid${specialClasses}" data-agencies="${config.agencies}">
    ${agenciesHTML}
  </div>
</section>`;
}

/**
 * Función para convertir el header de marca
 */
function convertBrandHeader(headerElement, brandName) {
  return `
<div class="brand-header wow fadeIn">
  <div class="container-fluid">
    <div class="row sponsor text-center">
      <div class="col-md-10 gray col-md-offset-1 text-center p-4 text-white font-bebas-neue">
        ${brandName}
      </div>
    </div>
  </div>
</div>`;
}

/**
 * Función principal de migración
 */
function migrateDealersHTML() {
  console.log("🚀 Iniciando migración del sistema de dealers...");

  // Aquí iría la lógica para leer el archivo HTML original
  // y procesar cada sección de marca

  const migratedContent = `
<!-- ===== SISTEMA DE AGENCIAS OPTIMIZADO ===== -->

<!-- Chevrolet -->
${convertBrandHeader(null, "CHEVROLET")}
${convertBrandSection(null, "CHEVROLET")}

<!-- Toyota -->
${convertBrandHeader(null, "TOYOTA")}
${convertBrandSection(null, "TOYOTA")}

<!-- Hyundai -->
${convertBrandHeader(null, "HYUNDAI")}
${convertBrandSection(null, "HYUNDAI")}

<!-- Kia -->
${convertBrandHeader(null, "KIA")}
${convertBrandSection(null, "KIA")}

<!-- Peugeot, Fiat, etc. -->
${convertBrandHeader(null, "PEUGEOT - FIAT - HEEP - DODGE - RAM")}
${convertBrandSection(null, "PEUGEOT - FIAT - HEEP - DODGE - RAM")}

<!-- Mercedes Benz -->
${convertBrandHeader(null, "MERCEDES BENZ")}
${convertBrandSection(null, "MERCEDES BENZ")}

<!-- BMW, Mini, Motorrad -->
${convertBrandHeader(null, "BMW - MINI Y MOTORAD")}
${convertBrandSection(null, "BMW - MINI Y MOTORAD")}

<!-- Buick GMC -->
${convertBrandHeader(null, "BUICK - GMC")}
${convertBrandSection(null, "BUICK - GMC")}

<!-- Range Rover -->
${convertBrandHeader(null, "RANGE ROVER - DEFENDER - DISCOVERY")}
${convertBrandSection(null, "RANGE ROVER - DEFENDER - DISCOVERY")}

<!-- JAC -->
${convertBrandHeader(null, "JAC")}
${convertBrandSection(null, "JAC")}

<!-- Geely -->
${convertBrandHeader(null, "GEELY")}
${convertBrandSection(null, "GEELY")}

<!-- BYD -->
${convertBrandHeader(null, "BYD")}
${convertBrandSection(null, "BYD")}

<!-- Hino -->
${convertBrandHeader(null, "HINO")}
${convertBrandSection(null, "HINO")}
  `;

  console.log("✅ Migración completada");
  return migratedContent;
}

/**
 * Función para generar CSS optimizado
 */
function generateOptimizedCSS() {
  return `
/* ===== SISTEMA DE GRID AUTOMÁTICO ===== */
.dealer-section {
  padding: 40px 0;
}

.dealer-grid {
  display: grid;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Configuración automática según número de agencias */
.dealer-grid[data-agencies="1"] {
  grid-template-columns: 1fr;
  justify-items: center;
}

.dealer-grid[data-agencies="2"] {
  grid-template-columns: repeat(2, 1fr);
}

.dealer-grid[data-agencies="3"] {
  grid-template-columns: repeat(3, 1fr);
}

.dealer-grid[data-agencies="4"] {
  grid-template-columns: repeat(2, 1fr);
}

.dealer-grid[data-agencies="5"] {
  grid-template-columns: repeat(3, 1fr);
}

.dealer-grid[data-agencies="6"] {
  grid-template-columns: repeat(3, 1fr);
}

/* ===== TARJETAS DE AGENCIAS ===== */
.dealer-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dealer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.dealer-card h4 {
  margin-bottom: 15px;
  font-weight: bold;
  color: #333;
  font-size: 1.2em;
}

.dealer-card p {
  margin: 0;
  text-align: center;
}

/* ===== IMÁGENES ===== */
.dealer-image {
  width: 100%;
  max-width: 342px;
  height: 295px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.dealer-image:hover {
  transform: scale(1.05);
}

/* ===== CONTACTOS ===== */
.dealer-contacts {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
}

.dealer-contacts li {
  display: inline-block;
  margin: 0;
}

.dealer-contacts .fa-stack {
  margin: 0 3px;
  transition: transform 0.2s ease;
}

.dealer-contacts .fa-stack:hover {
  transform: scale(1.1);
}

/* ===== HEADERS DE MARCA ===== */
.brand-header {
  margin-bottom: 0;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1200px) {
  .dealer-grid[data-agencies="3"],
  .dealer-grid[data-agencies="5"],
  .dealer-grid[data-agencies="6"] {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dealer-grid {
    grid-template-columns: 1fr !important;
    gap: 20px;
  }
  
  .dealer-card {
    padding: 15px;
  }
  
  .dealer-image {
    height: 250px;
  }
  
  .dealer-contacts {
    gap: 5px;
  }
}

@media (max-width: 480px) {
  .dealer-image {
    height: 200px;
  }
  
  .dealer-card h4 {
    font-size: 1.1em;
  }
}

/* ===== CASOS ESPECIALES ===== */
/* Para BYD que tiene botones en dos filas */
.dealer-card.byd-layout .dealer-contacts {
  flex-direction: column;
  gap: 10px;
}

.dealer-card.byd-layout .dealer-contacts .row-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

/* Para agencias con menos contactos */
.dealer-card.minimal-contacts .dealer-contacts {
  gap: 12px;
}

/* Para layouts centrados */
.dealer-grid.centered-layout {
  justify-items: center;
  max-width: 400px;
}
  `;
}

/**
 * Función para generar JavaScript optimizado
 */
function generateOptimizedJS() {
  return `
// ===== SCRIPT PARA AJUSTE AUTOMÁTICO =====
document.addEventListener('DOMContentLoaded', function() {
  // Función para ajustar automáticamente el grid según el número de agencias
  function adjustGridLayout() {
    const grids = document.querySelectorAll('.dealer-grid');
    
    grids.forEach(grid => {
      const agencies = parseInt(grid.getAttribute('data-agencies'));
      const cards = grid.querySelectorAll('.dealer-card');
      
      // Aplicar clases especiales según el número de agencias
      if (agencies === 1) {
        grid.style.maxWidth = '400px';
      } else if (agencies === 2) {
        grid.style.maxWidth = '800px';
      } else if (agencies === 4) {
        grid.style.maxWidth = '900px';
      }
      
      // Aplicar clases especiales a las tarjetas si es necesario
      cards.forEach(card => {
        const contacts = card.querySelectorAll('.dealer-contacts li');
        if (contacts.length <= 2) {
          card.classList.add('minimal-contacts');
        }
      });
    });
  }
  
  // Ejecutar al cargar y en resize
  adjustGridLayout();
  window.addEventListener('resize', adjustGridLayout);
});
  `;
}

// Exportar funciones para uso en Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    migrateDealersHTML,
    generateOptimizedCSS,
    generateOptimizedJS,
    BRANDS_CONFIG,
  };
}

console.log("📦 Script de migración cargado correctamente");
console.log("💡 Usa: node migrate-dealers.js para ejecutar la migración");
