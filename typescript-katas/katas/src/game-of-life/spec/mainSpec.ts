/// <reference path="../../../../typings/main/ambient/jasmine/index.d.ts" />
/// <reference path="../code/cell.ts" />
/// <reference path="../code/environment.ts" />
/// <reference path="../code/main.ts" />

describe("Game of Life kata", () => {
  describe("Empty cell behaviour", () => {
    let fertile = new Cell(false),
        infertile = new Cell(false),
        
        environment: Array<Array<Cell>> = [
          [new Cell(true), new Cell(false), new Cell(true), infertile],
          [fertile,        new Cell(true),  new Cell(false),  new Cell(true)],
          [new Cell(true), new Cell(false), new Cell(true), new Cell(false)],
        ];
    
    it("Must become alive if has 3 neighbours", () => {
      let result: boolean = GameOfLife.evaluate(environment, [1, 0]),
          expected: boolean = true;
      
      expect(result).toBe(expected);
    });
    
    it("Must remain empty if has less than 3 neighbours", () => {
      let result: boolean = GameOfLife.evaluate(environment, [0, 3]),
          expected: boolean = false;
      
      expect(result).toBe(expected);
    });
    
    it("Must remain empty if has more that 3 neighbours", () => {
      let result: boolean = GameOfLife.evaluate(environment, [1, 2]),
          expected: boolean = false;
      
      expect(result).toBe(expected);
    });
  });
  
  describe("Inhabited cell behaviour", () => {
    let maxRegular = new Cell(true),
        minRegular = new Cell(true),
        overPopulated = new Cell(true),
        
        environment: Array<Array<Cell>> = [
          [new Cell(true), new Cell(false), new Cell(true),   minRegular],
          [maxRegular,     new Cell(true),  overPopulated,  new Cell(true)],
          [new Cell(true), new Cell(false), new Cell(true),   new Cell(false)],
        ];
    
    it("Must remain alive if has 2 neighbours", () => {
      let expected: boolean = true,
          result: boolean = GameOfLife.evaluate(environment, [0, 3]);
          
      expect(result).toBe(expected);
    });
    
    it("Must remain alive if has 3 neighbours", () => {
      let expected: boolean = true,
          result: boolean = GameOfLife.evaluate(environment, [1, 0]);
          
      expect(result).toBe(expected);
    });
    
    it("Must become empty if has more than 3 neighbours", () => {
      let expected: boolean = false,
          result: boolean = GameOfLife.evaluate(environment, [1, 2]);
          
      expect(result).toBe(expected);
    });
    
    it("Must become empty if has less than 2 neighbours", () => {
      let environment: Array<Array<Cell>> = [
            [new Cell(false), new Cell(false), new Cell(false)],
            [new Cell(false), new Cell(true), new Cell(true)],
            [new Cell(false), new Cell(false), new Cell(false)],
          ],
          expected: boolean = false,
          result: boolean = GameOfLife.evaluate(environment, [1, 1]);
          
      expect(result).toBe(expected);
    });
  });
  
  describe("The environment after a day in the game of life", () => {
    it("should have been updated according to the rules of the game", () => {
      let toAlive = new Cell(false),
          stayOverpopulated = new Cell(false),
          stayEmpty = new Cell(false),
          becomeOverpopulated = new Cell(true),
          becomeEmpty = new Cell(true),
          survive = new Cell(true),
          
          start: Array<Array<Cell>> = [
            [toAlive,           new Cell(true),      new Cell(false), becomeEmpty],
            [new Cell(true),    becomeOverpopulated, new Cell(true),  new Cell(false)],
            [stayOverpopulated, new Cell(true),      new Cell(false), new Cell(false)],
            [new Cell(true),    new Cell(true),      stayEmpty,       new Cell(false)],
            [survive,           new Cell(false),      new Cell(false), new Cell(false)],
          ],
          expected = [
            [new Cell(true),  new Cell(true),  new Cell(false), new Cell(false)],
            [new Cell(true),  new Cell(false), new Cell(false), new Cell(false)],
            [new Cell(false), new Cell(false), new Cell(false), new Cell(false)],
            [new Cell(true),  new Cell(true),  new Cell(false), new Cell(false)],
            [new Cell(true),  new Cell(true), new Cell(false), new Cell(false)],
          ],
          
          game = new Environment(start);
          
          expect(game.nextDay()).toEqual(expected);
    })
  })
    
  describe("Some functions", () => {
    describe("Count neighbours in row function", () => {
      it("counts the number of alive cells in a row", () => {
        let expected: number = 2, 
            result: number = GameOfLife.countNeighboursInRow([new Cell(true), new Cell(false), new Cell(true)]);
            
        expect(result).toBe(expected);  
      });
    });
  });
  
  describe("Cell class", () => {
    it("Has an alive public field that can be setted through the constructor", () => {
      expect(typeof new Cell(false).alive).not.toBe("undefined");
      expect(new Cell(false).alive).toBe(false);
    })
  })
});
