const count = (input: number): any => {
  let value: number = input + 1;
  let response: string = "";
  let valueStr: string = "" + value;
  let includes = (inputStr: string, substring: string) =>
    inputStr.indexOf(substring) != -1;

  if (value % 3 == 0 || includes(valueStr, "3")) {
    response += "Fizz";
  }
  if (value % 5 == 0 || includes(valueStr, "5")) {
    response += "Buzz";
  }

  return response === "" ? value : response;
};