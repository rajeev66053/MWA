const fib = function (num) {
   if (num <= 2) {
       return 1;
   } else {
       return fib(num - 1) + fib(num - 2);
   }
};

const fibPromise = function (number) {
   return new Promise((resolve, reject) => {
       if (number > 0) {
           resolve(fib(number));
       } else {
           reject("Number cannot be less than zero");
       }
   });
}

console.log("Start");

fibPromise(42).then(result => {
   console.log(result);
}).catch(error => {
   console.log(error);
});

console.log("End")

