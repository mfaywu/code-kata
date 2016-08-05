/// <reference path="./main.ts" />
/// <reference path="./cell.ts" />

class Environment{
  
  private environment: Array<Array<Cell>>;
  private futureEnvironment: Array<Array<Cell>>;
  
  constructor(environment: Array<Array<Cell>>){
    this.environment = environment;
    this.futureEnvironment = [];
  }
  
  nextDay = (): Array<Array<Cell>> => {
    this.environment.forEach((row: Array<Cell>, rowIndex: number) => {
      let futureRow = row.reduce(
          (futureRow:Array<Cell>, cell: Cell, cellIndex: number) => {
            futureRow.push(this.getFutureCell([rowIndex, cellIndex]));
            return futureRow;
        }, []);
      this.futureEnvironment.push(futureRow);
    });
    
    this.environment = this.futureEnvironment;
    this.futureEnvironment = [];
    return this.environment;
  }
  
  getFutureCell = (position: Array<number>): Cell => {
    let [y, x] = position,
        willBeAlive: boolean = GameOfLife.evaluate(this.environment, position);
    
    return new Cell(willBeAlive);
  }
}