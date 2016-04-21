function Automobile(year, make, model, type) {
  this.year = year;
  this.make = make;
  this.model = model;
  this.type = type;
}

Automobile.prototype.logMe = function(logType) {
  if (logType === true) {
    console.log(this.year + ' ' + this.make + ' ' + this.model + ' ' + this.type);
  } else {
    console.log(this.year + ' ' + this.make + ' ' + this.model);
  }
};

var automobiles = [
  new Automobile(1995, "Honda", "Accord", "Sedan"),
  new Automobile(1990, "Ford", "F-150", "Pickup"),
  new Automobile(2000, "GMC", "Tahoe", "SUV"),
  new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
  new Automobile(2005, "Lotus", "Elise", "Roadster"),
  new Automobile(2008, "Subaru", "Outback", "Wagon")
];

function sortArr(comparator, array) {
  var result = [];
  var added = false;
  array.forEach(function (value) {
    if (result.length === 0) {
      result.push(value);
      return;
    }
    added = false;
    for (var i = 0; i < result.length; i++) {
      if (comparator(value, result[i]) === true) {
        added = true;
        result.splice(i, 0, value);
        break;
      }
    }
    if (!added) {
      result.push(value);
    }
  });

  return result;
}

function yearComparator(auto1, auto2) {
  if (auto1.year > auto2.year) {
    return true;
  } else {
    return false;
  }
}

function makeComparator(auto1, auto2) {
 if (auto1.make.toLowerCase().localeCompare(auto2.make.toLowerCase()) <= 0) {
   return true;
 } else {
   return false;
 }
}

var typeSort = {roadster: 0, pickup: 1, suv: 2, wagon: 3, other: 100};
function getSortOrder(auto) {
  var result = typeSort[auto.type.toLowerCase()];
  if (result === undefined) {
    result = typeSort["other"];
  }
  return result;
}
function typeComparator(auto1, auto2) {
  var a1Order = getSortOrder(auto1);
  var a2Order = getSortOrder(auto2);

  if (a1Order === a2Order) {
    return yearComparator(auto1, auto2);
  } else if (a1Order < a2Order) {
    return true;
  }
  return false;
}

function logCarArray(array, logType) {
  array.forEach(function(value, index) {
    value.logMe(logType);
  });
}

console.log("*****");
console.log("The cars sorted by year are:");
logCarArray(sortArr(yearComparator, automobiles), false);
console.log("");
console.log("The cards sorted by make are:");
logCarArray(sortArr(makeComparator, automobiles), false);
console.log("");
console.log("The cards sorted by type are:");
logCarArray(sortArr(typeComparator, automobiles), true);
console.log("*****");
