/*
 * I had fun with this one. The assignment function runs the three basic tests
 * for the assignment.
 * If you comment that out and uncomment the testit function, all the tests I
 * wrote will be executed.
 */

// Run the assignment tests
assignment();

// Run my way better tests!
//testit();

function assignment() {
  var obj = {here: {is: "an"}, object: 2};
  console.log(deepEqual(obj, obj));
  console.log(deepEqual(obj, {here: 1, object: 2}));
  console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
}


/*
 * Array of test values. Each test value will be tested against every other
 * test value. All test values are different except items 0 and 1. These two
 * entries are identical but their map order is flipped. A special case is
 * written for them in the test.
 */
var testArray1 = [
  {here: {is: "an"}, object: 2},
  {object: 2, here: {is: "an"}},
  {here: 1, object: 2},
  {here: {is: "an"}, object: 3},
  {here: {is: "an"}, object: '2'},
  {here: {is: "an", awesome: "yes"}, object: 2},
  {},
  1,
  null,
  {here: {}},
  {here: []},
  {here: [1, 2, 3]},
  {here: {is: "an"}, object: {}}
];

/*
 * Copy testArray1 to a new testArray2 otherwise tests will be working with the
 * same object in memory and we won't do a real deep comparison of objects that
 * are the same: (0, 0), (1, 1), (2, 2), etc.
 */
var testArray2 = JSON.parse(JSON.stringify(testArray1));

function testit() {
  var pass = 0, fail = 0;
  testArray1.forEach(function (valueA, i) {
    testArray2.forEach(function (valueB, j) {
      var result = deepEqual(testArray1[i], testArray2[j]);
      /*
       * Only cases where deepEqual should return true is when i and j index
       * are the same. One special case when the 0th and 1st items are
       * compared.
       */
      if (i === j || (i === 0 && j === 1) || (i === 1 && j === 0)) {
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
  // Log final pass/fail results
  console.log("PASS: " + pass + " -- FAIL: " + fail);
}

/*
 * Function for getting class name. Used to check for Array type of object.
 */
function getClass(obj) {
  return Object.prototype.toString.call(obj)
      .match(/^\[object (.*)\]$/)[1];
}

/*
 * Main deep equals function
 * There are several known conditions not handled but this passes all of the
 * written test cases above.
 */
function deepEqual(objA, objB) {
  // Matches for basic type comparison: "an" === "an", 2 === 2
  if (objA === objB) return true;

  // If both objs are null they they are equal
  if (objA === null && objB === null) return true;

  // Both objs are not null per previous check, if one is then not equal
  if (objA === null || objB === null) return false;

  // If both objs are undefined then they are equal
  if (objA === undefined && objB === undefined) return true;

  // Both objs are not undefined per previous check, if one is then not equal
  if (objA === undefined || objB === undefined) return false;

  // If both objs are arrays then do an array comparison
  if (getClass(objA) === 'Array' && getClass(objB) === 'Array') return arrEqual(objA, objB);

  // Both objs are not array per previous check, if one is then not equal
  if (getClass(objA) === 'Array' || getClass(objB) === 'Array') return false;

  // If both objs are objects then do an object comparison
  if (typeof(objA) === 'object' && typeof(objB) === 'object') return objEqual(objA, objB);

  // Both objs are not objects per previous check, if one is then not equal
  if (typeof(objA) === 'object' || typeof(objB) === 'object') return false;

  // Determines if types match, catches mismatches: 2 !== "2", 2 !== 3
  return objA === objB;
}

/*
 * Array matching, verify lengths are the same then iterate over array doing
 * deepEqual of each item in both arrays.
 */
function arrEqual(arrA, arrB) {
  if (arrA.length !== arrB.length) return false;

  arrA.forEach(function (valueA, i) {
    deepEqual(valueA, arrB[i]);
  });
  return true;
}

/*
 * Object matching, verify each key in objA appears in objB and do a deepEqual
 * for each value.
 * Then iterate over all keys in objB and make sure they all exist in objA. Do
 * not need to do a deepEqual here as deep equals will already have been run
 * if keys are in both. If objB has key not found in objA then objects are not
 * equal.
 */
function objEqual(objA, objB) {
  for (var keyA in objA) {
    if (keyA in objB) {
      if (!deepEqual(objA[keyA], objB[keyA])) return false;
    } else {
      return false;
    }
  }
  for (var keyB in objB) {
    if (!(keyB in objA)) {
      return false;
    }
  }
  return true;
}
