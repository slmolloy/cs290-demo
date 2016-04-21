function displayList(item, index) {
  console.log(item + ' ' + index);
}

function buildList(list) {
  var result = [];
  for (var i = 0; i < list.length; i++) {
    var item = 'item' + list[i];
    result.push(displayList.bind(this, item, list[i]));
  }
  return result;
}

function testList() {
  fnlist = buildList([1,2,3]);
  for (var j = 0; j < fnlist.length; j++) {
    fnlist[j]();
  }
}

testList();
