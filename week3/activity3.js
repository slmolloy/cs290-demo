var testArray = [
  {here: {is: "an"}, object: 2},
  {here: 1, object: 2},
  {here: {is: "an"}, object: 3},
  {here: {is: "an"}, object: '2'},
  {here: {is: "an", awesome: "yes"}, object: 2},
  {},
  1,
  null,
  {here: {}},
];

var pass = 0, fail = 0;
testArray.forEach(function (valueA, i) {
  testArray.forEach(function (valueB, j) {
    var result = deepEqual(testArray[i], testArray[j]);
    if (i === j) {
      if (result) {
        pass++;
        console.log("(" + i + "," + j + ") = true");
      } else {
        fail++;
        console.log("(" + i + "," + j + ") = false --- FAIL");
      }
    } else {
      if (result) {
        fail++;
        console.log("(" + i + "," + j + ") = true  --- FAIL");
      } else {
        pass++;
        console.log("(" + i + "," + j + ") = false");
      }
    }
  });
});
console.log("PASS: " + pass + " -- FAIL: " + fail);

function realtype(obj) {
  if (obj === null) return 'null';
  if (obj === 'undefined') return 'undefined';

}

function deepEqual(objA, objB) {
  if (objA === objB) return true;

  if (objA === null && objB === null) return true;

  if (objA === null || objB === null) return false;

  if (objA === undefined && objB === undefined) return true;

  if (objA === undefined || objB === undefined) return false;

  if (typeof(objA) === 'object' && typeof(objB) === 'object') return objEqual(objA, objB);

  if (typeof(objA) === 'object' || typeof(objB) === 'object') return false;

  return (objA === objB);
}

function objEqual(objA, objB) {
  for (var keyA in objA + objB) {
    if (keyA in objB) {
      var result1 = deepEqual(objA[keyA], objB[keyA]);
      if (!result1) {
        return false;
      }
    }
  }
  for (var keyB in objB) {
    if (keyB in objA) {
      var result2 = deepEqual(objB[keyB], objA[keyB]);
      if (!result2) {
        return false;
      }
    }
  }
}
