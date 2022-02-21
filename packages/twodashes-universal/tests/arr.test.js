const funcs = require('../umd/arr.js');
const {arr_clone, arr_includes, arr_truthy_values} = funcs

test('arr_clone', () => {
  let a = [1,2,3,4]
  let cloned = arr_clone(a)
  cloned[0]=9;
  expect(a[0]===1).toBeTruthy()
});

test('arr_includes', () => {
  let a = [1,2,3,4]
  let b = [3,4,5,6]
  let common = arr_includes(a,b)
  expect(common.join()==='3,4').toBeTruthy()
});

test('arr_truthy_values', () => {
  let arr = [1,null,3,false,5,undefined,7]
  let truthy = arr_truthy_values(arr)
  expect(truthy.join()==='1,3,5,7').toBeTruthy()
});
