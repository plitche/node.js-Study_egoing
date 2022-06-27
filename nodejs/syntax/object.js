var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]); // k8805

var i = 0;
while(i < members.length) {
  console.log('array loop', members[i]);
  i = i +1;
}

var roles = {
  'programmer':'egoing',
  'desinger':'k8805',
  'manager':'hoya'
};

for (var name in roles) {
  console.log('object => ', name); //key
  console.log('value => ', roles[name]); //value
}

console.log(roles.desinger); // k8805
console.log(roles.['desinger']); // k8805
