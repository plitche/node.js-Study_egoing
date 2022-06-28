// array, object

// 함수는 어떤 일에 대한 정보를 담고있는 구문(statement)이면서 동시에 값이다.
  // 변수에 넣을수 있다면 값. 아니라면 값이 아니다.
var f = function () {
  console.log(1+1);
  console.log(1+2);
}
console.log(f);
f();

// var i = if (true) {console.log(1)} : 값이 아니다.
// var w = while(true){console.log(1)} : 값이 아니다.


var a = [f]; // 배열의 원소로써 함수가 존재할 수 있다.
a[0]();

var o = {
  func:f //객체의 원소(property)
}
o.func();
