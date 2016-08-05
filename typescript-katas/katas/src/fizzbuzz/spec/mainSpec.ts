/// <reference path="../../../../typings/main/ambient/jasmine/index.d.ts" />
/// <reference path="../code/main.ts" />

describe("Fizzbuzz kata (Functional Programming style)", function(){
  
  describe('count function of fizzbuzz module', function(){
    
    it("counts one by one", function(){
      expect(count(0)).toBe(1)
    })
    
    it("says Fizz when the number is divisible by 3", function(){
      expect(count(2)).not.toBe(3)
      expect(count(2)).toBe('Fizz')
    })
    
    it("says Buzz when the number is divisible by 5", function(){
      expect(count(4)).not.toBe(5)
      expect(count(4)).toBe('Buzz')
    })
    
    it("says FizzBuzz when the number is divisible both by 3 and 5", function(){
      expect(count(14)).not.toBe(15)
      expect(count(14)).toBe('FizzBuzz')
    })
    
    it("says Fizz when the number contains 3", function(){
      expect(count(12)).not.toBe(13)
      expect(count(12)).toBe('Fizz')
    })
    
    it("says Buzz when the number contains 5", function(){
      expect(count(51)).not.toBe(52)
      expect(count(51)).toBe('Buzz')
    })
    
    it("says FizzBuzz when the number contains 53", function(){
      expect(count(52)).not.toBe(53)
      expect(count(52)).toBe('FizzBuzz')
    })
    
  })
  
})