// const names:Array <string|number|boolean>= [] ;

// const promise:Promise<string> = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve('This is done')
//     }, 3000)
// })

// promise.then((data)=>{
//     data.replace('T', 'Y');
// })


// Here T&U is not required it is by defautl understood by TS
/**
 * 
 * @param objA 
 * @param objB 
 * Here objA is of type T, objB is of type U thus these types will be set Dynamically 
 * at runtime
 */

function merge<T, U extends object>(objA: T, objB: U): T & U {
    return Object.assign(objA, objB);
}
console.log(merge({ name: 'Saurabh' }, { age: 30 }));

// const mergeObj = merge({name:'Max', hobbies:['sports']}, 45);
const mergeObj = merge({ name: 'Max', hobbies: ['sports'] }, { age: 45 });

console.log(mergeObj.name)

interface Lengthy {
    length: number
}

function countAndDescribe<T extends Lengthy>(element: T) {
    let descriptionText = 'Got no value'
    if (element.length === 1) {
        descriptionText = 'Got 1 element';
    } else if (element.length > 1) {
        descriptionText = 'Got' + element.length + ' elements'
    }
    return [element, descriptionText];
}
console.log(countAndDescribe('Hi there'));
console.log(countAndDescribe(['Hello']));
console.log(countAndDescribe([]));

// function extractAndConvert (obj:object, key:string) {
//     return 'value' + obj[key];
// }

// extractAndConvert({}, 'name');

function extractAndConvert<T extends Object, U extends keyof T>(obj: T, key: U) {
    return 'value' + obj[key];
}

extractAndConvert({ name: 'saurabh' }, 'name');

class StorageX<T extends string | number | boolean> {
    private data: T[] = [];
    addItem(item: T) {
        this.data.push(item);
    }
    removeItem(item: T) {
        if (this.data.indexOf(item))
            this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data]
    }
}

const textStorage = new StorageX<string>();
textStorage.addItem('Max');
textStorage.addItem('Manuel');
textStorage.removeItem('Manuel');
console.log(textStorage.getItems());

const numberStorage = new StorageX<number>();
numberStorage.addItem(3);
numberStorage.addItem(45);
console.log(textStorage.getItems());

// const objStorage = new StorageX<object>();

// objStorage.addItem({name:'Max'});
// objStorage.addItem({name:'Manuel'})

/**
 * Utility Types 
 * 
 * 1. Partial : it takes an object and make all the properties of that object as optional, thus we can
 * do things like coursegoal.title....
 * 2. Readonly : to make any object and array as read only
 */

interface CourseGoal {
    title: string;
    description: string;
    completeUnit: Date;
}
function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    // return {title:title, description:description, date:date};

    let coursegoal: Partial<CourseGoal> = {};
    coursegoal.title = title;
    coursegoal.description = description;
    coursegoal.completeUnit = date;
    return coursegoal as CourseGoal
}

const names: Readonly<string[]> = ['Max', 'Anna'];

// we can also use Readonly with object to not allow modification of object 

/**
 * Genric Types vs Union Types
 *
 * Generic types locks type of Say some variable in class
 * but uninon say this may be either this type of that type
 *
 * Say in our prervious example we have
 *
 *   class StorageX <T extends string | number | boolean> {
        private data:T[] = [];
        addItem(item:T) {
            this.data.push
            .
            .
            .

    we can also write like :
        class StorageX <string | number | boolean> {
        private data:string | number | boolean[] = [];
        addItem(item:string | number | boolean) {
            this.data.push
            .
            .
            .


    Here the difference is that in the former case it says T can either be number string or boolean
    once an object is created. It will remain same for all the method inside calss.

    The later (variable data) says that this can  array of anything which may be number boolean or string.
    thus it is not locked.
 */

 