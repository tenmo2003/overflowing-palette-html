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

const rowContainer = document.createElement("div");
rowContainer.classList.add("flex", "flex-col", "gap-0.5");
for (let i = 0; i < ROWS; i++) {
  const colContainer = document.createElement("div");
  colContainer.classList.add("flex", "gap-0.5");
  for (let j = 0; j < COLUMNS; j++) {
    const cell = document.createElement("div");
    cell.classList.add(
      `w-[${CELL_SIZE}px]`,
      `h-[${CELL_SIZE}px]`,
      "cursor-pointer",
      "transition-all",
      "duration-200",
    );
    cell.style.backgroundColor = "yellow";
    cell.style.border = "1px solid black";
    cell.style.borderRadius = "10px";

    // ripple effect through items within same col and row
    cell.addEventListener("click", () => {
      cell.style.backgroundColor = "red";
      setTimeout(() => {
        cell.style.backgroundColor = "yellow";
      }, 100);
    });

    colContainer.appendChild(cell);
  }
  rowContainer.appendChild(colContainer);
}
document.getElementById("container").appendChild(rowContainer);
