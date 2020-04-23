<h1 id='summary'>Summary</h1>

* [Reference](#reference)
* [Installation](#installation)
* [Call Stack](#callstack)
* [Callback](#callback)
  * [When are Callback Used?](#usecallback)
* [This Keyword](#this)
  * [Determining How the Value of This is set (bound)](#boundthis)
    * [Non-method Functions](#nonmethod)
    * [Methods](#methods)
    * [Classes and Constructor Functions](#classes)
    * [Event Handlers](#eventhandlers)
  * [Arrow Functions (ES2015)](#arrow)
    * [Explicitly This](#explicitlythis)

<h1 id='reference'>Reference</h1>

[Go Back to Summary](#summary)

* [This Keyword](https://repl.it/@rogertakeshita/JavaScript-This-Keyword)
* [Strict Mode - W3School](https://www.w3schools.com/js/js_strict.asp)
* [Strict Mode - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

<h1 id='installation'>Installation</h1>

[Go Back to Summary](#summary)

```Bash
    npm init -y
    npm i
    npm i request
```

<h1 id='callstack'>Call Stack</h1>

[Go Back to Summary](#summary)

* the first time the code runs, it adds the setTimeout to the call stack
  * the setTimeout is an event callback pair, the first argument is the function that we want to run
  * the second argumento is the time that we want to wait
* when we call setTimeout, a new event is registered in Node APIs, there we wait for 2 seconds
* when the setTimeout executes, the reference of 'this' is not the same when we first call the setTimeout

  ```JavaScript
    console.log('Starting');

    setTimeout(() => {
      console.log('2 Second Timer');
    }, 2000);

    setTimeout(() => {
      console.log('0 Second Timer');
    }, 0);

    console.log('Stopping');
  ```

* Why is this code not working? How can you fix it?

  ```JavaScript
    class X {
      hello() {
        console.log("hello")
      }

      delay() {
        setTimeout(function() {
          this.hello()
        }, 1)
      }
    }

    (new X()).delay()
  ```

  * 1) approach, bind the `this` to a variable (old way to do to this)

  ```JavaScript
      class X {
        hello() {
          console.log("hello")
        }

        delay() {
          let that = this;
          setTimeout(function() {
            that.hello()
          }, 1)
        }
      }

      (new X()).delay()
  ```

  * 2) aproach, use an arrow function
    * In short, with arrow functions there are no binding of this.
    * In regular functions the this keyword represented the object that called the function, which could be the window, the document, a button or whatever.
    * With arrow functions the this keyword always represents the object that defined the arrow function.

  ```JavaScript
      class X2 {
        hello() {
          console.log("hello2")
        }

        delay() {
          setTimeout(() => {
            this.hello()
          }, 1)
        }
      }

      (new X2()).delay()
  ```

<h1 id='callback'>Callback</h1>

[Go Back to Summary](#summary)

* **Callback functions** are not a new type of functions, they are **just functions**
* A callback is a function being passed to another function as an argument.

  ```JavaScript
    const colors = ['red', 'green', 'blue'];

    colors.forEach((color, idx) => {
      console.log(`${idx + 1} - ${color}`);
    })
  ```

* In the above, the anonymous inline function being passed to `forEach` as its one and only argument - is a callback function.
* Of course any function that takes a callback as input, is likely doing so with the intention of invoking the callback at some point when it runs.
* In computer science, the function that accepts another function as input is known as a **higher order function**.

  ```JavaScript
    let add = (a, b) => {
      return a + b;
    }

    let subtract = (a, b) => {
      return a - b;
    }

    let compute = (a, b, op) => {
      return op(a, b);
    }

    let result1 = compute(10, 5, add);
    let result2 = compute(10, 5, subtract);
  ```

<h2 id='usecallback'>When are Callback Used?</h2>

[Go Back to Summary](#summary)

* Here are three use cases for callback functions:

1. To provide a function to be called by a higher-order function such as `forEach` or the compute function we wrote above.
2. To provide a function to be executed each time an event happens - just like with  addEventListener.
3. To provide a function to be executed when an asynchronous process has completed.

<h1 id='this'>This Keyword</h1>

[Go Back to Summary](#summary)

* The mechanism provided by this is necessary in all object oriented programming languages to:

1. Provide access to an object's properties & methods from other methods within that object.
2. Implement code reuse

* Example 1 - Provide access to an object's properties & methods
  * The example below demonstrates how `this` provides a way for methods to access the other properties & methods within that objct

  ```JavaScript
    const person = {
      firstName: 'Katie',
      intro: function() {
        console.log(`Hello, I'm ${this.firstName}!`);
      }
    };
  ```

<h2 id='boundthis'>Determining How the Value of This is set (bound)</h2>

[Go Back to Summary](#summary)

* **ATTENTION** in **non-arrow functions**, the value of `this` is set by the JavaScript runtime depending on **how a function/method is called**, not on how it is written. This means that the same function could have `this` set differently.

* Implicit Binding of `this`
  * Since the value of `this` is **determined by how we call a function**, we'll take a look at the following scenarios of how funcions are called
  1. As "freestanding", simple, non-method functions
  2. As Methods
  3. As Classes & Constructor Functions
  4. As DOM Event Handlers
  5. As Generic Callback functions
  
<h3 id='nonmethod'>Non-method Functions</h3>

[Go Back to Summary](#summary)

* When called as a simple, non-method function (not attached to an object)

  ```JavaScript
    function thisCheck () {
      console.log(this);
    }

    thisCheck();

    // window {...} 
  ```

* or in the case when [strict mode](https://www.w3schools.com/js/js_strict.asp) is set:
  
  ```JavaScript
    function thisCheck () {
      'use strict';
      console.log(this);
    }

    thisCheck();

    // undefined
  ```

<h3 id='methods'>Methods</h3>

[Go Back to Summary](#summary)

* Let's call this **same function** as a method (assigned to a property of an object);

```JavaScript
  const ninja = {
    name: 'JS Ninja',
    f: thisCheck
  };
  function thisCheck() { console.log(this); }

  // call thisCheck() as a method
  ninja.f();  // Object {name: "JS Ninja"}
```

* AS observed, the rule is, the object **left of the dot** is what `this` is bound to.

<h3 id='classes'>Classes and Constructor Functions</h3>

[Go Back to Summary](#summary)

* `this` in a class' constructor method or a constructor function is set to the new shiny object that is implicitly returned.
* See the Sprite constructor function above for an example.

<h3 id='eventhandlers'>Event Handlers</h3>

[Go Back to Summary](#summary)

* Within an event handler callback function, JS will bind `this` to the element listening to the event.

  ```JavaScript
    const myDiv = document.getElementById('my-div');

    myDiv.addEventListener('click', function() {
      console.log(this);
    });
    
    // <div id="my-div">...
  ```

* You just learned that when a function is called as a non-method, `this` is bound to window or is `undefined` in **strict mode**.
* Callback functions are called as simple "freestanding" functions (non-methods), so guess what this will be set to:

  ```JavaScript
    class Ninja {
      constructor(name) {
        this.ninjaName = name;
      }
      chop(numChops) {
        setTimeout(function() {
          if (numChops > 0) {
            console.log(`${this.ninjaName} chop!`);
            this.chop(--numChops);
          }
        }, 500);
      }
    }

    const ninja = new Ninja('JS Ninja');
    ninja.chop(2);  //  undefined chop! / then an error
  ```
  * The code didn't work as expected because `this` is not set to the ninja object therefore code like this.ninjaName returns undefined.
  * Instead, when the callback executes, it's being called as a free-standing, simple function, thus `this` is bound to the window (or `undefined` if strict mode is true).

<h2 id='arrow'>Arrow Functions (ES2015)</h2>

[Go Back to Summary](#summary)

* When executed in the global context (outside of a function), an arrow function is **always** the global object (window in browser; global in node, but never undefined):

  ```JavaScript
    const checkThis = () => {
      'use strict';
      console.log(this);
    };

    checkThis();  // window {...}
  ```

* Unlike how this is set to the object left of the dot when invoking a method, in an arrow function it is set to the context of its enclosing function (or the global object if the method is not being invoked within another function.

* One option to fix this problem, is to set a variable inside the function of chop() to hold the value of `this` (bind)

  ```JavaScript
    class Ninja {
        constructor(name) {
            this.ninjaName = name;
        }
        chop(numChops) {
            let that = this;
            setTimeout(function () {
                if (numChops > 0) {
                    console.log(`${that.ninjaName} chop!`);
                    that.chop(--numChops);
                }
            }, 500);
        }
    }

    const ninja = new Ninja('JS Ninja');
    ninja.chop(2);
  ```

* Another option is to user an arrow function

```JavaScript
  class Ninja {
      constructor(name) {
          this.ninjaName = name;
      }
      chop(numChops) {
          setTimeout(() => {
              if (numChops > 0) {
                  console.log(`${this.ninjaName} chop!`);
                  this.chop(--numChops);
              }
          }, 500);
      }
  }

  const ninja = new Ninja('JS Ninja');
  ninja.chop(2);
```

  * In short, with arrow functions there are no binding of `this`.
  * In regular functions the `this` keyword represented the object that called the function, which could be the window, the document, a button or whatever.
  * With arrow functions the `this` keyword always represents the object that defined the arrow function.


<h3 id='explicitlythis'>Explicitly This</h3>

[Go Back to Summary](#summary)

* Every function has three methods on it that allow the programmer to explicitly set the binding of this:
  * `call` & `apply`
  * `bind`

  ```JavaScript
    'use strict';
    function alertF() {
      alert( this );
    }

    let user = {
      popup: alertF.bind(null)
    };

    user.popup();
  ```