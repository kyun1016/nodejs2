var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]);

for(var i=0;i<members.length;i++){
  console.log('array loop', members[i]);
}

var roles = {
  'programmer' : 'egoing',
  'designer' : 'k8805',
  'manager' : 'hoya'
}

for(var name in roles){
  console.log('object => ', name, 'value => ', roles[name]);
}

console.log(roles.designer);
console.log(roles['designer'])
