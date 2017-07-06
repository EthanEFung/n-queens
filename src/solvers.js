/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
const genRowPermutations = function(n) {//generates n unique rows
  let rowsArray = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      if (i === j) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    rowsArray.push(row);
  }
  return rowsArray;
};

const looseIndexOf = function(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (value == array[i]) {
      return i;
    }
  }
  return -1;
};


const factorial = function(n) {
  if (n === 0) {
    return 1;
  } else if (n === 1) {
    return n;
  } else {
    return n * factorial(n - 1);
  } 
};

window.findNRooksSolution = function(n) {
  let solution = []; //fixme
  let rowsArray = genRowPermutations(n);
  
  const recursiveTree = function (rowPoss, rowsSoFar) {
    if (rowPoss.length === 0) {
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(rowsSoFar));
      return rowsSoFar; //solution.push(rowsSoFar);//for counting, we push to solutions
    } else {
      for (let i = 0; i < rowPoss.length; i++) {
        let possCopy = rowPoss.slice();
        let usedCopy = rowsSoFar.slice();
        usedCopy.push(possCopy.splice(i, 1)[0]);
        return recursiveTree(possCopy, usedCopy);      
      }
    }
  };

  
  return recursiveTree(rowsArray, []);



};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solution = []; //fixme
  let rowsArray = genRowPermutations(n);

  const recursiveTree = function (rowPoss, rowsSoFar) {
    if (rowPoss.length === 0) {
      solution.push(rowsSoFar);//for counting, we push to solutions
    } else {
      for (let i = 0; i < rowPoss.length; i++) {
        let possCopy = rowPoss.slice();
        let usedCopy = rowsSoFar.slice();
        usedCopy.push(possCopy.splice(i, 1)[0]);
        recursiveTree(possCopy, usedCopy);      
      }
    }
  };
  
  recursiveTree(rowsArray, []);
  let solutionCount = solution.length;
  // let solutionCount = factorial(n);//lawl math
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let solution = [];
  let rowsArray = genRowPermutations(n);

  let validBoard = undefined;
  const recursiveTree = function (rowPoss, rowsSoFar) {
    if (rowsSoFar.length > 1) {
      let currentBoard = new Board(rowsSoFar);
      if (currentBoard.hasAnyMajorDiagonalConflicts() || currentBoard.hasAnyMinorDiagonalConflicts()) {
        return;
      }
    }    
    if (rowPoss.length === 0) {
      return rowsSoFar; //solution.push(rowsSoFar);//for counting, we push to solutions
    } else {
      for (let i = 0; i < rowPoss.length; i++) {
        let possCopy = rowPoss.slice();
        let usedCopy = rowsSoFar.slice(); 
        usedCopy.push(possCopy.splice(i, 1)[0]);
        validBoard = recursiveTree(possCopy, usedCopy);
        if (validBoard) {
          return validBoard;
        }      
      }
    }
  };
  
  solution = recursiveTree(rowsArray, []);
  if (solution) {
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
  } else {
    let obj = {'n':n};
    return obj;
  }
};


/*
  recursiveTree([[1,0], [0,1]], []) // [[1,0], [0,1]]
    passes in a nested array, and returns a nested array.
    
*/
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other


window.countNQueensSolutions = function(n) {
  // if(n===0 || n===1){
  //   return 1;
  // }
  // let solution = []; 
  // let rowsArray = genRowPermutations(n);
  
  // const recursiveTree = function (rowPoss, rowsSoFar) {
  //   if (rowsSoFar.length > 1) {
  //     let currentBoard = new Board(rowsSoFar);
  //     if (currentBoard.hasAnyMajorDiagonalConflicts() || currentBoard.hasAnyMinorDiagonalConflicts()) {
  //       return;
  //     }  
  //   }

  //   if (rowPoss.length === 0) {
  //     return solution.push(rowsSoFar);//for counting, we push to solutions
  //   } else {      
  //     for (let i = 0; i < rowPoss.length; i++) {
  //       let possCopy = rowPoss.slice();
  //       let usedCopy = rowsSoFar.slice();
  //       usedCopy.push(possCopy.splice(i, 1)[0]);
  //       recursiveTree(possCopy, usedCopy);      
  //     }
  //   }
  // };
  
  // const p = new Parallel(rowsArray);
  // p.map(function(data){
  //   let possCopy = rowsArray.slice();
  //   let dataIndex = looseIndexOf(possCopy,data); 
  //   console.log(dataIndex);
  //   possCopy.splice(dataIndex,1);
  //   console.log(data);
  //   return recursiveTree(possCopy, data);     
  // });
  // console.log(p.data, 'this is p');
  // // recursiveTree(rowsArray, []);
  // let solutionCount = solution.length;

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;



  let solution = []; //fixme
  let rowsArray = genRowPermutations(n);
  
  const recursiveTree = function (rowPoss, rowsSoFar) {
    if (rowsSoFar.length > 1) {
      let currentBoard = new Board(rowsSoFar);
      if (currentBoard.hasAnyMajorDiagonalConflicts() || currentBoard.hasAnyMinorDiagonalConflicts()) {
        return;
      }  
    }

    if (rowPoss.length === 0) {
      return solution.push(rowsSoFar);//for counting, we push to solutions
    } else {
      for (let i = 0; i < rowPoss.length; i++) {
        let possCopy = rowPoss.slice();
        let usedCopy = rowsSoFar.slice();
        usedCopy.push(possCopy.splice(i, 1)[0]);
        recursiveTree(possCopy, usedCopy);      
      }
    }
  };
  
  recursiveTree(rowsArray, []);
  let solutionCount = solution.length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
