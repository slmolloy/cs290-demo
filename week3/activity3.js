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

testArray.forEach(function (valueA, i) {
  testArray.forEach(function (valueB, j) {
    console.log("deepEqual(" + i + ", " + j + ") = " + deepEqual(testArray[i], testArray[j]));
  });
});

function deepEqual(objA, objB) {
  if (objA === null && objB === null) return true;

  if (objA === null || objB === null) return false;

  if (typeof(objA) === 'object' && typeof(objB) === 'object') {
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
  } else if (typeof(objA) === typeof(objB)) {
    var result = (objA === objB);
    return result;
  } else {
    return false;
  }
  return true;
}
