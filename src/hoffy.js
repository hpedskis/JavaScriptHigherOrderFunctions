// hoffy.js

/*/
 This function demonstrates the use of the rest operator (ES6) or using the built-in arguments object.
 Multiplies all of the arguments together and returns the resulting product.
 If there are no arguments, the resulting product is undefined. Does not check for types of incoming arguments.

 */
function prod(...args){
    if(args.length === 0){
        return undefined;
    }
    let total =  Array.prototype.slice.call(args).reduce(function(a, b) {

        return a * b;
    }, 1);
    return total;

}
/*
 This function demonstrates using functions as an argument or arguments to another function.
 It calls function, fn, on every element in arr checking if they pass the test.
 If at least one element passes the test, fn, then return true.
 */
function any(array, fn){

   let filtered = array.filter(fn);
   if(filtered.length === 0){
       return false;
   }
   return true;

}
//console.log(any([1, 3, 5, 9], x => x % 2 === 0));

/*
 This is similar to the previous function, but it also demonstrates returning a function and using
 the spread operator. maybe will take a function, fn and return an entirely new function.
 The new function will take the same arguments as the original function (fn).
 */
function maybe(fn){
    return function(...arg){
        const name = [...arg];
        if((name[0] === undefined ||name[1] === undefined) || (name[0] === null ||name[1] === null)){
            return undefined;
        }
        const Newname = fn(...arg);
        return Newname;
    }

}
/*
 This function wraps the function fn in another function so that operations can be performed
 before and after the original function fn is called. This can be used to modify incoming arguments,
 modify the return value, or do any other task before or after the function call.
 */

function constrainDecorator(fn, min, max){
    return function(...arg){
        const value = [...arg];
        if(value[0] < min){
            return min;
        } else if(value[0]> max){
            return max;
        }
        const parsedValue = fn(...arg);
        return parsedValue;
    }

}

/*
 This is the culmination of all of the concepts from the previous functions.
 However, instead of just reading from a variable that's available through the closure, you'll
 use it to keep track of the number of times that a function is called… and prevent the function
 from being called again if it goes over the max number of allowed function calls.
 */
function limitCallsDecorator(fn, n){
    let numTimesCalled = 1;
    return function(...arg){
        if(numTimesCalled >= n){
            return undefined;
        }else{
            numTimesCalled++;
            const val = fn(...arg);
            return val;
        }

    }

}

/*
 This is different from regular map. The regular version of map immediately calls the callback function on
 every element in an Array to return a new Array. mapWith, on the other hand, gives back a function rather
 than executing the callback immediately (think of the difference between bind and call/apply).
 */
function mapWith(fn){

    return function(...arg){
        let arr = [...arg];
        console.log(arr[0]);
        let newArr = arr[0];
        console.log(newArr);
        let newArray = newArr.map(fn);
        return newArray;
    }

}
function square(n) {return n * n;};
const mapWithSquare = mapWith(square);
//console.log(mapWithSquare([1,3,3, 4, 5]));
const mapWithParseInt = mapWith(parseInt);
console.log(mapWithParseInt(['123', '1', '98']));

/*
 For this function, we'll assume that the string being passed in is in a simplified INI format:

 Name and value pairs are separated by new lines. Each line has a name on the left
 side and a value on the right side. An equals sign with no spaces separates the name and the value.
 For example, the following string literal is in INI format - "foo=bar\nbaz=qux\nquxx=corge".
 */
function simpleINIParse(s){

}

/*
 This function will take a parsing function and turn it into a function that opens a file and
 immediately parses it. This resulting function will be an async function (!) so it will take a
 callback as one of its arguments (this callback function is defined by the caller).


 */
function readFileWith(fn){

}