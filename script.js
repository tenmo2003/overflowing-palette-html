const colors = ["#D64545", "#F7E881", "#5BA16C", "#6897E9"];

const CELL_SIZE = 50;
const CELL_PADDING = 2;
const ROWS = 10;
const COLUMNS = 12;

const COLOR_TRANSITION_DELAY = 150;
const PROPAGATE_DELAY = 50;

const grid = [];

let animating = false;

const rowContainer = document.createElement("div");
rowContainer.classList.add("flex", "flex-col");
for (let i = 0; i < ROWS; i++) {
  const cells = [];
  const colContainer = document.createElement("div");
  colContainer.classList.add("flex");
  for (let j = 0; j < COLUMNS; j++) {
    const cellColor = colors[Math.floor(Math.random() * colors.length)];
    const cell = document.createElement("div");
    cell.classList.add(
      `w-[${CELL_SIZE}px]`,
      `h-[${CELL_SIZE}px]`,
      "cursor-pointer",
      "transition-all",
      "duration-300",
      `hover:bg-[radial-gradient(circle,transparent_40%,white_100%)]`,
    );
    cell.style.backgroundColor = cellColor;
    cell.style.border = "1px solid black";
    cell.style.borderRadius = "10px";

    cell.addEventListener("click", () => {
      if (animating) {
        return;
      }
      animating = true;
      const maxRowDist = Math.max(i, ROWS - 1 - i);
      const maxColDist = Math.max(j, COLUMNS - 1 - j);
      const longestDelay = Math.max(maxRowDist, maxColDist) * PROPAGATE_DELAY;

      for (let k = 0; k < ROWS; k++) {
        if (k === i) {
          continue;
        }
        setTimeout(
          () => {
            const currentColor = grid[k][j].style.backgroundColor;
            grid[k][j].style.backgroundColor = "white";
            setTimeout(() => {
              grid[k][j].style.backgroundColor = currentColor;
            }, COLOR_TRANSITION_DELAY);
          },
          PROPAGATE_DELAY * Math.abs(k - i),
        );
      }
      for (let k = 0; k < COLUMNS; k++) {
        if (k === j) {
          continue;
        }
        setTimeout(
          () => {
            const currentColor = grid[i][k].style.backgroundColor;
            grid[i][k].style.backgroundColor = "white";
            setTimeout(() => {
              grid[i][k].style.backgroundColor = currentColor;
            }, COLOR_TRANSITION_DELAY);
          },
          PROPAGATE_DELAY * Math.abs(k - j),
        );
      }
      cell.style.backgroundColor = "white";
      setTimeout(() => {
        cell.style.backgroundColor = cellColor;
      }, COLOR_TRANSITION_DELAY);

      setTimeout(() => {
        animating = false;
      }, longestDelay + COLOR_TRANSITION_DELAY);
    });

    colContainer.appendChild(cell);
    cells.push(cell);
  }
  rowContainer.appendChild(colContainer);
  grid.push(cells);
}
document.getElementById("container").appendChild(rowContainer);
