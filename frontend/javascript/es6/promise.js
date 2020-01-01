/*
* promise的几种状态
* pending:初始状态,既不成功,也不是失败状态.
* fulfilled:意味着操作成功完成.
* rejected:意味着操作失败.
*
*
*
* 使用promise的若干约定
* 1.在本轮事件循环完成之前，回调函数是不会被调用的。
* 2.通过then添加的回调函数总会被调用，即使是在异步操作之后才被添加。
* 3.通过多次调用then,可以添加多个回调函数，它会按照插入顺序一个接一个独立执行。
*
* 好处：
* 1.链式调用
* */

function print(origin, msg){
    console.log(origin, ':', msg);
}

{
    let origin = 'demo1';
    let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("foo");
        },300);
    })

    promise1.then(function(value){
        print(origin, value);
    })

    print(origin, promise1);
}

/*
* promise.all([Array|String])
* 返回一个promise,迭代器所有promise成功,才会触发resolve,反之触发reject，失败的原因是迭代器中第一个失败的promise
* 返回值
* 1.传入空可迭代对象,返回已完成状态promise
* 2.传入参数不包含任何promise对象,返回异步完成promise
* 3.除以上两种状况，其余返回一个pending状态的promise
*
* 使用场景:
* 集合多个promise的返回结果
* */

{
    let origin = 'demo2';

    let promise1 = Promise.resolve('1');
    let promise2 = new Promise(function(resolve, reject){
        setTimeout(resolve, 300, 'foo');
    })
    let promise3 = Promise.reject(new Error('fail'));

    Promise.all([promise1, promise2]).then(function(values){
        print(origin, values);
    })

    Promise.all([promise1, promise3]).then(null, function(result){
        print(origin, result);
    })

    Promise.all([promise1, promise3]).then(function(values){
        print(origin, values);
    }).catch(reason => ( print(origin, reason)));
}

/*
* Promise.race([Array|String])
* 返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
* 如果传的迭代是空的，则返回的 promise 将永远等待
*
* */

{
    let origin = 'demo3'

    let p1 = new Promise((resolve, reject) => {
        setTimeout(resolve, 300, 'one')
    })

    let p2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, 'two')
    })

    Promise.race([p1, p2]).then( values =>{
        print(origin, values);
    })

    let p3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 200, 'three')
    })

    let p4 = new Promise((resolve, reject) => {
        setTimeout(resolve, 500, 'four')
    })

    Promise.race([p3, p4]).then( values =>{
        print(origin, values);
    })

    let p5 = new Promise((resolve, reject) => {
        setTimeout(reject, 200, 'five')
    })

    let p6 = new Promise((resolve, reject) => {
        setTimeout(resolve, 500, 'six')
    })

    Promise.race([p5, p6]).then( values =>{
        print(origin, values);
    }).catch( reason => {
        print(origin, reason)
    })
}
