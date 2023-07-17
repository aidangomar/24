import { isConstructorDeclaration, isTemplateSpan } from "typescript";

import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'


declare global {
  interface Array<T> {
    permute(): Array<Array<T>>;
  }
}

Array.prototype.permute = function(): Array<Array<any>> {
  function permutations(nums: Array<any>): Array<any> {
    let result = [];
    if (nums.length === 1) return [nums.slice()];
    for (let _ in nums) {
        let n = nums.shift();
        let perms = permutations(nums);
        for (let i = 0; i < perms.length; i++) {
            let perm: Array<number> = perms[i];
            perm.push(n);
        }
        result.push(...perms);
        nums.push(n)
    }
    return result;
  }
  const set = new Set(permutations(this).map(n => JSON.stringify(n)))
  const res = Array.from(set);
  return res.map(n => JSON.parse(n));
}

function interleave(arr1: Array<any>, arr2: Array<any>) {
  let result = []
  for(let i = 0; i < arr1.length-1; i++) {
    result.push(arr1[i])
    result.push(arr2[i])
  }
  result.push(arr1[arr1.length-1])
  return result;
}

function getNextOp(n: string): string {
  switch (n) {
    case "+":
      return "-";
    case "-":
      return "*";
    default:
      return "/";
  }
}


function getOperationCombinations(operators: Array<string>): Array<Array<string>> {
  let operationPermutations = []
  for (let i = 0; i < operators.length; i++) {
    for (let j = 0; j < operators.length; j++) {
      for (let k = 0; k < operators.length; k++) {
        operationPermutations.push([operators[i], operators[j], operators[k]]);
      }
    }
  }
  return operationPermutations;
}

function interleaveParens(input: Array<any>) {
  let res = []

  let tmp = input.slice(); 
  res.push(tmp)

  // (1 + 2) + (3 + 4)
  tmp = input.slice();
  tmp.splice(0, 0, "(");
  tmp.splice(4, 0, ")")
  tmp.splice(6, 0, "(")
  tmp.splice(10, 0, ")")
  res.push(tmp)

  // 1 + (2 + 3) + 4
  tmp = input.slice();
  tmp.splice(2, 0, "(");
  tmp.splice(6, 0, ")")
  res.push(tmp)

  // 1 + 2 + (3 + 4)
  tmp = input.slice();
  tmp.splice(4, 0, "(");
  tmp.splice(10, 0, ")")
  res.push(tmp)

  // (1 + 2) + 3 + 4
  tmp = input.slice();
  tmp.splice(0, 0, "(");
  tmp.splice(4, 0, ")")
  res.push(tmp)

  // (1 + 2 + 3) + 4
  tmp = input.slice();
  tmp.splice(0, 0, "(");
  tmp.splice(6, 0, ")")
  res.push(tmp)


  // 1 + (2 + 3 + 4)
  tmp = input.slice();
  tmp.splice(2, 0, "(");
  tmp.splice(8, 0, ")")
  res.push(tmp)

  return res;
}

type solver = (cards: Array<number>) => Array<number>;
const solver = (cards: Array<number>) => {
  const numberPermutations = cards.permute();
  const operationPermutations = getOperationCombinations(["+", "-", "*", "/"]);
  let tmp: Array<Array<string>> = []
  numberPermutations.forEach(perm => operationPermutations.forEach(op => tmp.push(interleave(perm, op))))
  let res: Array<Array<number>> = []
  tmp.forEach(r => res.concat(interleaveParens(r)))
  console.log(res);
  res.forEach(x => {
    let evals: any = []
    for(let i = 0; i < x.length; i++) evals.push(x[i])
    evals.reduce((acc:any, y:any) => acc += y, 0)
    console.log("evals: ")
    console.log(evals)
    console.log("dpne")
    const bruh = eval(evals)
    return bruh
  })
  res.forEach(x => console.log(x))
  interleaveParens(interleave(numberPermutations[0], operationPermutations[0]));
  
  
  // const tmp = interleave(numberPermutations[0], operationPermutations[0]);
}

export default solver;