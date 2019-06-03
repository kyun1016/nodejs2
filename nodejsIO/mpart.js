var M = {
  v:'vector',
  f:function(){
    console.log(this.v);
  }
}

//외부에서 이 js를 활용 할 수 있도록 설정한다.
module.exports=M;
