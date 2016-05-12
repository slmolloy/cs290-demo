function doItAll(array, start, end, workIt) {
  start();
  for (var i = 0; i < array.length; i++) {
    workIt(array[i]);
  }
  end();
}

function start() {
  console.log('get it started!');
}

function end() {
  console.log('and its a wrap!');
}

function workingIt(time) {
  console.log('working it good at ' + time + ' o\'clock');
}

theTimesYouWorkIt = [ 9, 10, 11, 12, 1, 2, 3 ];

doItAll(theTimesYouWorkIt, start, end, workingIt);

function saidWhat(who) {
  return function(describe, what) {
    return who + ' ' + describe + ' says "' + what + '"';
  }
}

var Superman = { name: "Superman" };
Superman.speak = saidWhat(Superman.name);
console.log(Superman.speak("calmly", "I bend steel"));
