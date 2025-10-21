// Google Maps
function initMap() {
  // Verificar que el elemento existe
  const mapElement = document.getElementById("map");
  if (!mapElement) {
    // El mapa no está en uso en esta página
    return;
  }

  // Coordenadas de Culiacán, Sinaloa
  const culiacan = { lat: 24.7994, lng: -107.3896 };

  // Crear el mapa
  const map = new google.maps.Map(mapElement, {
    zoom: 15,
    center: culiacan,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  // Agregar marcador
  const marker = new google.maps.Marker({
    position: culiacan,
    map: map,
    title: "Premier Automotriz - Culiacán",
  });

  // Agregar info window
  const infoWindow = new google.maps.InfoWindow({
    content:
      '<div style="padding: 10px;"><h4>Premier Automotriz</h4><p>Blvd. Pedro Infante 471<br>Culiacán, Sinaloa</p></div>',
  });

  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
}

// Fallback si Google Maps no se carga
window.addEventListener("load", function () {
  if (typeof google === "undefined") {
    console.log("Google Maps no se pudo cargar");
  }
});
