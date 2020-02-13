/************************************* Decorators *************************************/

// Useful for MetaProgramming
// Writing a code which is useful for other developers

/**** A First Class Decorator *******/

        // 1. Add experimentalDecorators in tsconfing
        // 2. Target is es6
        // Decorator is A function which is Applied to a class in certain 
        // way

        // @ is a special identifier whiich ts recognises

        function Logger(constructor:Function) {
            console.log('logging....')
            console.log(constructor);
        }
        // Decorator is executed when you class is defined not when class is 
        // Instantiated

        @Logger
        class Person {
            name = 'Max';
            constructor() {
                console.log('Creating a new person.....');
            }

        }
        const pers = new Person();
        console.log(pers.name)


/******** Working with decorator Factory  *******/

        // Decorator factory is a function which return a function 
        // Advantages is that we can pass arguments
        function Logger2(LogString:string) {
            return function (constructor:Function) {
                console.log(LogString);
                console.log(constructor);
            }
        }
        @Logger2('Logging_Person2')
        class PersonDup {
            name = 'Max';
            constructor() {
                console.log('Creating a new person.....');
            }

        }
        const pers2 = new PersonDup();
        console.log(pers.name)

/******** Building More Useful Decorators  *******/

        function WithTemplate( template:string, hookId:string) {
            // we can use _ in place of constructor to tell TS that 
            // we don't care about argument
            return function(constructor:Function) {
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    // Print name of class
                    console.log(constructor.name +'******');
        }
            }
        }
        // Note that execution of Decorator factory happens in top-bottom order
        // But execution of Decorator happens in bottom-up manner
        @Logger2('Called with another decorator')
        @WithTemplate('<h1> THis is added by decorator</h1>', 'app')
        class Person3 {
            name = 'Max';
            constructor() {
                console.log('Creating a new person.....');
            }

        }
        const pers3 = new Person3();
        console.log(pers.name)


/******** Diving Into Property Decorator  *******/

        // This property decorator is executed when our class property is defined
        function Log(target:any, propertyName:string) {
            console.log('Property Decorator');
            console.log(target, propertyName);

        }

        /******** Accessor and parameter Decorator  *******/
        function Log2 (target:any, propertyName:string, descriptor:PropertyDescriptor){

            console.log('Accossor Decorator ...  '+ target,propertyName,descriptor);
            console.log(target);
            console.log(descriptor);
        }
        class Product {
            @Log
            title:string;
            private _price:number
            constructor(t:string, p:number){
                this.title = t;
                this._price = p;
            }
            @Log2
            set price(val:number){
                if(val > 0) {
                    this.price = val;
                } else {
                    throw new Error('Invalid price it should be greater than 0');
                }
            }
            // getPriceWithTax(Tax:number){
            //     ret
            // }
        }



