const dogs = [
  { name: "Snickers", age: 2 },
  { name: "hugo", age: 8 },
];

function makeGreen(): void {
  const p = document.querySelector("p") as HTMLParagraphElement;
  p.style.color = "#BADA55";
  p.style.fontSize = "50px";
}

// Break on > attribute modifications

// Regular with console.log()
// console.log('hello')
// console.table()

// Interpolated
console.log("Hello I am %s string", "HTMLLinkElement");

// Styled with '%c'
// console.log(
//   "%c I am some great text",
//   "font-size:50px; background:red; text-shadow: 10px 10px 0 blue"
// );

// warning! with console.warn()
console.warn("OH NOOO!"); // yellow warning with traceback

// Error with console.error()
console.error("Crap!"); // red error with traceback

// Info with console.info()
console.info("Crocodiles eat 3-4 people per year"); // blue info icon

// Testing/Assertions with console.assert()
const p = document.querySelector("p") as HTMLParagraphElement;

console.assert(p.classList.contains("ouch"), "This is wrong!"); // Assertion failed

// clearing with console.clear()
// NOTE If you want to mess with a JS dev put this at bottom of JS file. Hah!
// console.clear();

// Viewing DOM Elements with console.dir()
console.log(p); // just shows the element <p...>
console.dir(p); // Has p with dropdown of all properties and methods listed

// Grouping together with console.group(), console.groupCollapsed() and console.groupEnd();
dogs.forEach((dog) => {
  console.group(`${dog.name}`);
  // console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd();
});

// counting with console.count()
console.count("Wes");
console.count("Wes");
console.count("Wes");
console.count("Steve");
console.count("Steve");
console.count("Wes");
console.count("Steve");
console.count("Steve");
console.count("Wes");
console.count("Wes");
console.count("Steve");
console.count("Steve");
console.count("Steve");

// timing with console.time() and console.timeEnd()
console.time("Fetching data");
fetch("https://api.github.com/users/gaylonalfano")
  .then((data) => data.json())
  .then((data) => {
    console.timeEnd("Fetching data");
    console.log(data);
  });

// table display with console.table(Array<Object>)
console.table(dogs);
