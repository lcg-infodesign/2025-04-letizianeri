let data;
let volcano;
let statusColors;

function preload() {
  data = loadTable("assets/volcanoes.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("sans-serif");
  noStroke();

  // colori status
  statusColors = {
    "Holocene": color(255, 140, 0),
    "Holocene?": color(255, 180, 50),
    "Historical": color(255, 80, 0),
    "Fumarolic": color(200, 0, 255),
    "Radiocarbon": color(0, 200, 255),
    "Anthropology": color(150, 50, 150),
    "Ar/Ar": color(0, 100, 200),
    "Tephrochronology": color(0, 255, 150),
    "Hydrophonic": color(0, 150, 150),
    "Ice Core": color(100, 200, 255),
    "K-Ar": color(50, 50, 200),
    "Dendrochronology": color(150, 100, 50),
    "Magnetism": color(100, 100, 255),
    "Hot Springs": color(255, 200, 0),
    "Lichenometry": color(180, 180, 180),
    "Uncertain": color(120, 120, 120),
    "Uranium-series": color(50, 150, 50),
    "Seismicity": color(255, 0, 255),
    "Pleistocene": color(0, 255, 0),
    "Pleistocene-Fumarol": color(150, 0, 150),
    "Hydration Rind": color(200, 200, 0),
    "Varve Count": color(255, 100, 100)
  };

  // legge id dall'url
  const params = new URLSearchParams(window.location.search);
  const volcanoId = params.get("id")?.trim();

  for (let i = 0; i < data.getRowCount(); i++) {
    let csvId = data.getString(i, "Volcano Number").trim();
    if (csvId === volcanoId) {
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

  if (!volcano) console.warn("Vulcano non trovato! Controlla ID:", volcanoId);
}

function draw() {
  background(20);

  if (!volcano) {
    textAlign(CENTER, TOP);
    textSize(42);
    fill(255);
    textStyle(BOLD);
    text("Vulcano non trovato", width / 2, 50);
    return;
  }

  let statusColor = statusColors[volcano.status] || color(255);

  // titolo
  textAlign(CENTER, TOP);
  textSize(42);
  textStyle(BOLD);
  fill(statusColor);
  text(volcano.name, width / 2, 50);

  // box
  let boxWidth = 400;
  let boxHeight = 220;
  let boxX = width / 2 - boxWidth / 2;
  let boxY = height / 2 - boxHeight / 2;

  noFill();
  stroke(statusColor);
  strokeWeight(3);
  rect(boxX, boxY, boxWidth, boxHeight, 20);

  // testo
  let lines = [
    `Paese: ${volcano.country}`,
    `Categoria: ${volcano.category}`,
    `Stato: ${volcano.status}`,
    `Elevazione: ${volcano.elevation} m`,
    `Ultima eruzione: ${volcano.eruption}`
  ];

  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  fill(255);
  noStroke();
  textSize(22);

  let totalHeight = lines.length * 30;
  let startY = boxY + boxHeight / 2 - totalHeight / 2 + 15;

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width / 2, startY + i * 30);
  }

  // link alla pagina precedente
  let linkText = "← Torna all'Atlante";
  let linkX = width / 2;
  let linkY = height - 50;
  let linkWidth = textWidth(linkText);
  let linkHeight = 24;

  // proprietà hover
  if (
    mouseX > linkX - linkWidth / 2 &&
    mouseX < linkX + linkWidth / 2 &&
    mouseY > linkY - linkHeight / 2 &&
    mouseY < linkY + linkHeight / 2
  ) {
    textSize(24);
    fill(statusColor);
    text(linkText, linkX, linkY);

    stroke(statusColor);
    strokeWeight(2);
    line(linkX - linkWidth / 2, linkY + 12, linkX + linkWidth / 2, linkY + 12);
    noStroke();
  } else {
    textSize(20);
    fill(statusColor);
    noStroke();
    text(linkText, linkX, linkY);
  }
}

function mousePressed() {
  if (!volcano) return;

  let linkText = "← Torna all'Atlante";
  let linkX = width / 2;
  let linkY = height - 50;
  let linkWidth = textWidth(linkText);
  let linkHeight = 24;

  if (
    mouseX > linkX - linkWidth / 2 &&
    mouseX < linkX + linkWidth / 2 &&
    mouseY > linkY - linkHeight / 2 &&
    mouseY < linkY + linkHeight / 2
  ) {
    window.location.href = "index.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
