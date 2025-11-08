let data;
let volcano;

function preload() {
  data = loadTable("assets/volcanoes.csv", "csv", "header");
}

function setup() {
  noCanvas();

  //legge l'id dall'url
  const params = new URLSearchParams(window.location.search);
  const volcanoId = params.get("id");

  //cerca il vulcano con quel volcano number
  for (let i = 0; i < data.getRowCount(); i++) {
    if (data.getString(i, "Volcano Number") === volcanoId) {
      volcano = {
        name: data.getString(i, "Volcano Name"),
        country: data.getString(i, "Country"),
        elevation: data.getString(i, "Elevation (m)"),
        category: data.getString(i, "TypeCategory"),
        status: data.getString(i, "Status"),
        eruption: data.getString(i, "Last Known Eruption")
      };
      break;
    }
  }

  //mostra i dettagli
  if (volcano) {
    const div = select("#volcano-info");
    div.html(`
      <h2>${volcano.name}</h2>
      <p><strong>Paese:</strong> ${volcano.country}</p>
      <p><strong>Categoria:</strong> ${volcano.category}</p>
      <p><strong>Stato:</strong> ${volcano.status}</p>
      <p><strong>Elevazione:</strong> ${volcano.elevation} m</p>
      <p><strong>Ultima eruzione:</strong> ${volcano.eruption}</p>
    `);
  } else {
    select("#volcano-info").html("<p>Vulcano non trovato.</p>");
  }
}
