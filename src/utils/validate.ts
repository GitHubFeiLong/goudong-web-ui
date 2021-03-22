/**
 * 邮箱验证
 * @param value 待验证的值
 * @param callback 回调函数
 */
function validateEmail(value:string,callback:any):boolean{
    const reg =/^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+$/;
    
    
    if(value==''||value==undefined||value==null){
      callback();
      return true;
    }else{
      if (!reg.test(value)){
        callback(new Error('请输入正确的邮箱'));
        return false;
      } else {
        callback();
        return true;
      }
    }
  }

  export { validateEmail }