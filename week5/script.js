const COLOR_DEFAULT = "#0000AA";
const COLOR_SELECTED = "yellow";
const BORDER_CELL_DEFAULT = "thin solid " + COLOR_DEFAULT;
const BORDER_CELL_SELECTED = "medium solid " + COLOR_DEFAULT;

const TABLE_ID = "thetable";

// Directions used to generate buttons and movement
const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
}

// Global var used to track the currently selected cell
// Default 1,1 using non 0 based counting and ignoring header row
var selected = { x: 1, y: 1, cell: undefined };

document.body.appendChild(createTable());
document.body.appendChild(createNavigation());
document.body.appendChild(createMarkButton());

setSelected(selected.x, selected.y);

// Create a 4x4 table
// Top row is header row with "Header x" text
// Remaining rows have position in x,y format
function createTable() {
  var table = document.createElement("table");
  table.id = TABLE_ID;
  table.style.margin = "0";
  table.style.padding = "0";
  table.style.borderCollapse = "collapse";
  for (var i = 0; i < 4; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 4; j++) {
      var cell = undefined;
      if (i === 0) {
        cell = document.createElement("th");
        cell.textContent = "Header " + (j + 1);
      } else {
        cell = document.createElement("td");
        var text = (j + 1)  + "," + i;
        cell.textContent = text;
      }
      cell.style.border = BORDER_CELL_DEFAULT;
      cell.style.padding = "8px";
      cell.style.margin = "0";
      cell.style.textAlign = "center";
      cell.style.color = COLOR_DEFAULT;
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  return table;
}

// Create four directional buttons: up, down, left, right
function createNavigation() {
  var navigation = document.createElement("div");
  navigation.style.padding = "12px";

  for(var dir in DIRECTIONS) {
    var button = document.createElement("button");
    button.textContent = dir.toUpperCase();

    // Using custom attributes to indicate what direction to move
    button.setAttribute("x", DIRECTIONS[dir].x);
    button.setAttribute("y", DIRECTIONS[dir].y);

    button.style.padding = "4px";
    button.style.margin = "4px";
    button.onclick = clickDirectionHandler;
    navigation.appendChild(button);
  }

  return navigation;
}

// Create button labeled "Mark Cell"
function createMarkButton() {
  var mark = document.createElement("div");
  mark.style.padding = "12px";
  var button = document.createElement("button");
  button.textContent = "Mark Cell";
  button.style.padding = "4px";
  button.style.margin = "4px";
  button.onclick = markSelected;
  mark.appendChild(button);
  return mark;
}

// Click handler for direction button click
// Custom x and y attributes are used to indicate movement
function clickDirectionHandler(event) {
  var xMove = parseInt(event.target.getAttribute("x"));
  var yMove = parseInt(event.target.getAttribute("y"));
  setSelected(selected.x + xMove, selected.y + yMove);
}

// Navigate dom to find cell and return it.
function getCell(x, y) {
  // Check bounds to ensure cell being searched for is in valid range
  if (x < 1 || x > 4 || y < 1 || y > 3) {
    return undefined;
  }

  var table = document.getElementById(TABLE_ID);
  // Skip the header row
  var row = table.firstElementChild.nextElementSibling;
  var cell = undefined;
  var xCur = 1;
  var yCur = 1;

  // Navigate rows first
  while (yCur < y) {
    row = row.nextElementSibling;
    yCur++;
  }

  // Navigate cells next
  cell = row.firstElementChild;
  while (xCur < x) {
    cell = cell.nextElementSibling;
    xCur++;
  }

  return cell;
}

// Set new selected row
function setSelected(x, y) {
  var newSelected = getCell(x, y);

  // If setSelected is called with invalid location then getCell will return undefined
  if (newSelected !== undefined) {
    // If a cell is currently selected then unselect it
    if (selected.cell !== undefined) {
      selected.cell.style.border = BORDER_CELL_DEFAULT;
    }

    // Setup the newly selected cell in the selected variable
    selected.x = x;
    selected.y = y;
    selected.cell = newSelected;
    selected.cell.style.border = BORDER_CELL_SELECTED;
  }
}

// Mark the selected cell, no need to un mark a cell, not a requirement
function markSelected() {
  if (selected.cell !== undefined) {
    selected.cell.style.background = COLOR_SELECTED;
  }
}