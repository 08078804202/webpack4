// import "@babel/polyfill"  //已弃用
const green = () => {
  console.log("index")
}
green()

class Test {
  constructor(name) {
    this.name = name;
  }

  logger() {
    console.log("Hello", this.name);
  }
}

@annotation
class MyClass { }

function annotation(target) {
  target.annotated = true;
}

import { person } from "./lib";

console.log(person)

async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
}

getPosts().then(posts => console.log(posts))

Object.assign({})

Array.from([1,2,3])

new Promise(resolve => console.log('promise'))