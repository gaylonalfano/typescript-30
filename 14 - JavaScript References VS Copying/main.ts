// ========== start with strings, numbers and booleans
// NOTE You can change the ORIGINAL value and it won't affect the others
let age = 100;
let age2 = age;
console.log(age, age2); // 100 100
age = 200;
console.log(age, age2); // 200 100

let fname = "wes";
let fname2 = fname;
console.log(fname, fname2); // wes wes
fname = "wesley";
console.log(fname, fname2); // wesley wes

// ========== Let's say we have an array
const players = ["Wes", "Sarah", "Ryan", "Poppy"];

// and we want to make a copy of it.
const team = players;

// console.log(players, team);
// You might think we can just do something like this:
// team[3] = "Lux";

// however what happens when we update that array?
// console.log(players); // players is also updated!
// NOTE This is because team is a pointer to a reference in memory of the original players!

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!
// Returns a copy (has its own unique reference in memory), so won't update players as well
const team2 = players.slice(); // Returns a copy, so won't update players as well

// one way

// or create a new array and concat the old one in
// Returns a copy (has its own unique reference in memory), so won't update players as well
const team3 = [].concat(players); // Returns a copy (has its own unique reference in memory), so won't update players as well

// or use the new ES6 Spread
// Returns a copy (has its own unique reference in memory), so won't update players as well
const team4 = [...players]; // Returns a copy, so won't update players as well
// team4[-1] = "heee hawww"; // Can't use -1 in JS
team4[3] = "woop";
// console.log(team4);

const team5 = Array.from(players);
// now when we update it, the original one isn't changed
// console.log(players); // Original, no change!

// ======= The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
  name: "Wes Bos",
  age: 80,
};

// and think we make a copy:
// NOTE This just points to the SAME reference in memory so it updates original!
const captain = person;
captain.age = 99;
console.log(person); // person.age is updated to 99!

// how do we take a copy instead? We use Object.assign()!
// NOTE Object.assign() is only 1 level deep! So nested objects will be overwritten
// since they point to the same reference in memory!
const captain2 = Object.assign({}, person, { age: 99 });
console.log(captain2);

// We will hopefully soon see the object ...spread

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const gaylon = {
  name: "Gaylon",
  age: 100,
  social: {
    twitter: "@gaylon",
    facebook: "gaylon",
    linkedin: "gaylonLinkd",
  },
};

console.clear();
// console.log(gaylon);

// Now let's make a copy of gaylon
// NOTE If I were to update a value in adrian, it would overwrite the original in gaylon!
const adrian = Object.assign({}, gaylon);

// Let's try to make a copy using the Object ...spread ECMA2018!
// NOTE If I were to update a value in adrian, it would overwrite the original in gaylon!
// const archie = { ...gaylon };
// archie.social.twitter = "littleguy";
// console.log(archie);
// console.log(gaylon); // Overwritten to littleguy!

// For a truly DEEP COPY you can check out lodash cloneDeep, or try the JSON hack:
const aaron = JSON.parse(JSON.stringify(gaylon));
aaron.social.twitter = "tomandjerry";
console.log(aaron); // tomandjerry
console.log(gaylon); // @gaylon
