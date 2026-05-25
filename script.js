const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const CELL_SIZE = 40;
const CELL_PADDING = 2;
const ROWS = 10;
const COLUMNS = 12;

const grid = [];

const rowContainer = document.createElement("div");
rowContainer.classList.add("flex", "flex-col");
for (let i = 0; i < ROWS; i++) {
  const cells = [];
  const colContainer = document.createElement("div");
  colContainer.classList.add("flex");
  for (let j = 0; j < COLUMNS; j++) {
    const cell = document.createElement("div");
    cell.classList.add(
      `w-[${CELL_SIZE}px]`,
      `h-[${CELL_SIZE}px]`,
      "cursor-pointer",
      "transition-all",
      "duration-300",
    );
    cell.style.backgroundColor = "yellow";
    cell.style.border = "1px solid black";
    // cell.style.borderRadius = "10px";

    // ripple effect through items within same col and row
    cell.addEventListener("click", () => {
      for (let k = 0; k < ROWS; k++) {
        if (k === i) {
          continue;
        }
        setTimeout(
          () => {
            grid[k][j].style.backgroundColor = "red";
            setTimeout(() => {
              grid[k][j].style.backgroundColor = "yellow";
            }, 150);
          },
          50 * Math.abs(k - i),
        );
      }
      for (let k = 0; k < COLUMNS; k++) {
        if (k === j) {
          continue;
        }
        setTimeout(
          () => {
            grid[i][k].style.backgroundColor = "red";
            setTimeout(() => {
              grid[i][k].style.backgroundColor = "yellow";
            }, 150);
          },
          50 * Math.abs(k - j),
        );
      }
      cell.style.backgroundColor = "red";
      setTimeout(() => {
        cell.style.backgroundColor = "yellow";
      }, 100);
    });

    colContainer.appendChild(cell);
    cells.push(cell);
  }
  rowContainer.appendChild(colContainer);
  grid.push(cells);
}
document.getElementById("container").appendChild(rowContainer);
