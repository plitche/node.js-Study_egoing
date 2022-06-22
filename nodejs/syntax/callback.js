function a() {
  console.log('A');
}
a();

// 익명 함수는 호출이 불가하기 때문에 변수에 저장 => JavaScript에서는 함수가 값이다.
var b = function () {
  console.log('A');
}
b();

// 이 함수를 실행한 쪽에게 함수가 끝나고 다음일을 실행 하세요 -> callback을 넘겨준다.
function slowfunc(callback) {
  callback();
}
slowfunc(b);
