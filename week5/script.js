const COLOR_DEFAULT = "#0000AA";
const COLOR_SELECTED = "yellow";
const BORDER_CELL_DEFAULT = "thin solid " + COLOR_DEFAULT;
const BORDER_CELL_SELECTED = "medium solid " + COLOR_DEFAULT;


createTable();

// Create a 4x4 table
// Top row is header row with "Header x" text
// Remaining rows have position in x,y format
function createTable() {
  var table = document.createElement("table");
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
  document.body.appendChild(table);
}

// Create four directional buttons: up, down, left, right
// Create button labeled "Mark Cell"

// Directional buttons allow selecting cells, default cell selected is 1,1.
// Selected cell is identified with thicker boarder.
// When clicking mark cell the currently selected cell will receive a yellow background that remains.