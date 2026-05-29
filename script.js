const colors = ["#D64545", "#F7E881", "#5BA16C", "#6897E9"];

let selectedColor = colors[0];
const colorSelector = document.getElementById("color-selector");

const selectedMarker = document.createElement("span");
selectedMarker.classList.add(
  "text-green-500",
  "font-bold",
  "absolute",
  "t-[50%]",
  "l-[50%]",
  "translate-x-[-50%]",
  "translate-y-[-50%]",
  "[-[webkit-text-stroke:_1px_black]]",
);
selectedMarker.innerText = "✓";

let selectedButton = null;

for (let i = 0; i < colors.length; i++) {
  const color = colors[i];
  const button = document.createElement("button");
  button.classList.add(
    "w-10",
    "h-10",
    "rounded-full",
    "border-2",
    "border-black",
  );
  button.style.backgroundColor = color;
  button.addEventListener("click", () => {
    selectedColor = color;
    selectedButton = button;
    button.appendChild(selectedMarker);
  });
  colorSelector.appendChild(button);
  if (i === 0) {
    selectedButton = button;
    button.appendChild(selectedMarker);
  }
}

const CELL_SIZE = 50;
const CELL_PADDING = 2;
const ROWS = 10;
const COLUMNS = 12;

const COLOR_TRANSITION_DELAY = 100;
const PROPAGATE_DELAY = 100;

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
      const visited = [];
      for (let k = 0; k < ROWS; k++) {
        visited.push([]);
        for (let l = 0; l < COLUMNS; l++) {
          visited[k].push(false);
        }
      }
      // dfs(i, j, visited, i, j, cell.style.backgroundColor);
      bfs(i, j, cell.style.backgroundColor, visited);
    });

    colContainer.appendChild(cell);
    cells.push(cell);
  }
  rowContainer.appendChild(colContainer);
  grid.push(cells);
}
document.getElementById("container").appendChild(rowContainer);

function rippleCellsInSameRowAndColumn(i, j) {
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
}

function dfs(i, j, visited, src_i, src_j, src_color, distance = 0) {
  if (
    outOfBounds(i, j) ||
    visited[i][j] ||
    grid[i][j].style.backgroundColor !== src_color
  ) {
    return;
  }

  visited[i][j] = true;
  const currentColor = grid[i][j].style.backgroundColor;
  setTimeout(() => {
    grid[i][j].style.backgroundColor = "white";
    setTimeout(() => {
      grid[i][j].style.backgroundColor = currentColor;
    }, COLOR_TRANSITION_DELAY);
  }, PROPAGATE_DELAY * distance);
  dfs(i - 1, j, visited, src_i, src_j, src_color, distance + 1);
  dfs(i + 1, j, visited, src_i, src_j, src_color, distance + 1);
  dfs(i, j - 1, visited, src_i, src_j, src_color, distance + 1);
  dfs(i, j + 1, visited, src_i, src_j, src_color, distance + 1);
}

const NEIGHBORS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function bfs(src_i, src_j, src_color, visited) {
  const finalSelectedColor = selectedColor;
  let queue = [];
  queue.push([src_i, src_j]);
  let distance = 0;
  while (queue.length > 0) {
    const currentLevel = queue.length;
    for (let m = 0; m < currentLevel; m++) {
      const [i, j] = queue.shift();
      visited[i][j] = true;
      // const currentColor = grid[i][j].style.backgroundColor;
      setTimeout(() => {
        grid[i][j].style.backgroundColor = "white";
        setTimeout(() => {
          grid[i][j].style.backgroundColor = finalSelectedColor;
        }, COLOR_TRANSITION_DELAY);
      }, PROPAGATE_DELAY * distance);
      for (let k = 0; k < 4; k++) {
        if (
          outOfBounds(i + NEIGHBORS[k][0], j + NEIGHBORS[k][1]) ||
          visited[i + NEIGHBORS[k][0]][j + NEIGHBORS[k][1]] ||
          grid[i + NEIGHBORS[k][0]][j + NEIGHBORS[k][1]].style
            .backgroundColor !== src_color
        ) {
          continue;
        }
        queue.push([i + NEIGHBORS[k][0], j + NEIGHBORS[k][1]]);
      }
    }
    distance++;
  }
  setTimeout(() => {
    animating = false;
  }, distance * PROPAGATE_DELAY);
}

function outOfBounds(i, j) {
  return i < 0 || i >= ROWS || j < 0 || j >= COLUMNS;
}
