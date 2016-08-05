/// <reference path="../code/cell.ts" />
/// <reference path="../code/environment.ts" />
/// <reference path="../code/main.ts" />

const interval = 1000, alive = true, empty = false;

let dom = document.getElementById("board"),
    random = (): number => Math.ceil(Math.random() * 3),
    getRandomBoard = () : Array<Array<Cell>> => {
      let board = [];
      
      for(let i = 0, rows = 10; i < rows; i += 1){
        let row = [];
        for(let j = 0, cellsByRow = 10; j < cellsByRow; j += 1){
          let status: boolean = random() === 3 ? alive : empty;
          
          row.push(new Cell(status));
        }
        board.push(row);
      }
      
      return board;
    },
    
    environment = new Environment(getRandomBoard());

let refresh = () => {
  document.clear();
  
  let view = environment.nextDay().reduce((view, row) => {
    let representation = row.reduce(
        (acc, cell) => acc + `<div class="${cell.alive ? 'alive' : 'empty'}"></div>`
      , "");
    return view + `${representation}`;
  }, "");
  
  dom.innerHTML = view;
}

setInterval(refresh, interval);