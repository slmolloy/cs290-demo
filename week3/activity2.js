hoister('look mom, i can hoist');

try {
  no_hoist('look mom, uh oh');
} catch(err) {
  console.log('error: you can\'t hoist this');
}

function hoister(msg) {
  console.log(msg);
}

var no_hoist = function(msg) {
  hoister(msg);
};
