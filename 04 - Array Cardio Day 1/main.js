// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1
var inventors = [
    { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
    { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
    { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
    { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
    { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
    { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
    { first: "Max", last: "Planck", year: 1858, passed: 1947 },
    { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
    { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
    { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
    { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
    { first: "Hanna", last: "Hammarström", year: 1829, passed: 1909 },
];
var people = [
    "Bernhard, Sandra",
    "Bethea, Erin",
    "Becker, Carl",
    "Bentsen, Lloyd",
    "Beckett, Samuel",
    "Blake, William",
    "Berger, Ric",
    "Beddoes, Mick",
    "Beethoven, Ludwig",
    "Belloc, Hilaire",
    "Begin, Menachem",
    "Bellow, Saul",
    "Benchley, Robert",
    "Blair, Robert",
    "Benenson, Peter",
    "Benjamin, Walter",
    "Berlin, Irving",
    "Benn, Tony",
    "Benson, Leana",
    "Bent, Silas",
    "Berle, Milton",
    "Berry, Halle",
    "Biko, Steve",
    "Beck, Glenn",
    "Bergman, Ingmar",
    "Black, Elk",
    "Berio, Luciano",
    "Berne, Eric",
    "Berra, Yogi",
    "Berry, Wendell",
    "Bevan, Aneurin",
    "Ben-Gurion, David",
    "Bevel, Ken",
    "Biden, Joseph",
    "Bennington, Chester",
    "Bierce, Ambrose",
    "Billings, Josh",
    "Birrell, Augustine",
    "Blair, Tony",
    "Beecher, Henry",
    "Biondo, Frank",
];
// Array.prototype.filter()
// ===== 1. Filter the list of inventors for those who were born in the 1500's
// 1.1 - TS split up filter predicate function
var bornIn1500s = function (inventor) {
    if (inventor.year >= 1500 && inventor.year < 1600) {
        return true;
    }
};
var fifteenTS = inventors.filter(bornIn1500s);
// console.table(fifteenTS);
// 1.2 All-in-one
// const fifteen = inventors.filter((inventor) => {
//   if (inventor.year >= 1500 && inventor.year < 1600) {
//     return true;
//   }
// });
// console.log(fifteen);
// 1.3 All-in-one simplified
var fifteen = inventors.filter(function (inventor) { return inventor.year >= 1500 && inventor.year < 1600; });
// console.table(fifteen);
// Array.prototype.map() - ALWAYS returns the same number of items you give for I/O
// ===== 2. Give us an array of the inventors first and last names
// 2.1
var fullNames = inventors.map(function (inventor) { return inventor.first + " " + inventor.last; });
// console.log(fullNames);
// 2.2
var composeName = function (inventor) {
    return inventor.first + " " + inventor.last;
};
var fullNamesTS = inventors.map(composeName);
// console.log(fullNamesTS);
// Array.prototype.sort()
// ===== 3. Sort the inventors by birthdate, oldest to youngest (1=ASC, -1=DESC)
// 3.1
// const ordered = inventors.sort((a: Inventor, b: Inventor): number => {
//   if (a.year > b.year) {
//     return 1;
//   } else {
//     return -1;
//   }
// });
// console.table(ordered);
// 3.2 Ternary simplified
var ordered = inventors.sort(function (a, b) {
    return a.year > b.year ? 1 : -1;
});
// console.table(ordered);
// 3.3 TS split
var orderByYear = function (a, b) {
    return a.year > b.year ? 1 : -1;
};
var orderedTS = inventors.sort(orderByYear);
// console.table(orderedTS);
// Array.prototype.reduce()
// ===== 4. How many years did all the inventors live all together?
// 4.1
var totalYearsLived = inventors.reduce(function (total, inventor) {
    // FIXME Must pass reduce() an initialValue argument of 0 or it errors
    return total + (inventor.passed - inventor.year);
}, 0);
// console.log(totalYearsLived);
// 4.2 TS split
var sumAllYears = function (total, inventor) {
    return total + (inventor.passed - inventor.year);
};
var totalYearsLivedTS = inventors.reduce(sumAllYears, 0);
// console.log(totalYearsLivedTS);
// ===== 5. Sort the inventors by years lived
// 5.1
var oldest = inventors.sort(function (a, b) {
    var lastInventor = a.passed - a.year;
    var nextInventor = b.passed - b.year;
    return lastInventor > nextInventor ? -1 : 1;
});
// console.table(oldest);
// 5.2 TS split
var orderByYearsLived = function (a, b) {
    var yearsLived = function (inventor) {
        return inventor.passed - inventor.year;
    };
    console.log("a: " + yearsLived(a) + " - b: " + yearsLived(b));
    // NOTE Use -1 or 1 to determine asc/desc
    return yearsLived(a) > yearsLived(b) ? -1 : 1;
};
var sortByYearsTS = inventors.sort(orderByYearsLived);
console.table(sortByYearsTS);
// // ===== 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
// // TODO Need to retrieve the <div class="mw-category"> parent element.
// // 6.1
// const categoryElement = document.querySelector(
//   ".mw-category"
// ) as HTMLDivElement;
// // const categoryElement = document.querySelectorAll(".mw-category a"); // Shorter
// // Find the links within
// // TODO Convert NodeList of links to Array of actual text/titles using .map()
// const links = Array.from(
//   categoryElement.querySelectorAll("a")
// ) as HTMLAnchorElement[];
// // Or use spread operation
// // const links = [...categoryElement.querySelectorAll("a")];
// const linkTitles = links.map((link) => link.title) as string[]; // Or .textContent
// // console.log(linkTitles);
// // Filter (shorten) the array with only 'de' in the string
// const deBlvds = linkTitles.filter((streetName: string) =>
//   streetName.includes("de")
// ) as string[]; // TODO Could consider chaining .map().filter();
// ===== 7. sort Exercise
// Sort the people alphabetically by last name
// 7.1
var alpha = people.sort(function (a, b) {
    var _a = a.split(", "), aLast = _a[0], aFirst = _a[1];
    var _b = b.split(", "), bLast = _b[0], bFirst = _b[1];
    return aLast > bLast ? 1 : -1;
});
var peopleObjs = people.map(function (personName) {
    // const lName: string = personName.split(", ")[0];
    // const fName: string = personName.split(", ")[1];
    // FIXME Destructuring is cleaner. How to add types?
    var _a = personName.split(", "), lName = _a[0], fName = _a[1]; // .split returns <Array>
    // console.log(lName, fName);
    // TODO Need to turn into an Object
    var personObj = { lName: lName, fName: fName };
    return personObj;
});
var orderByLastName = function (a, b) {
    return a.lName > b.lName ? 1 : -1;
};
var sortByLastName = peopleObjs.sort(orderByLastName);
var data = [
    "car",
    "car",
    "truck",
    "truck",
    "bike",
    "walk",
    "car",
    "van",
    "bike",
    "walk",
    "car",
    "van",
    "car",
    "truck",
];
// 8.1
// NOTE Whatever you put for initialValue is what gets returned from .reduce()
var transportation = data.reduce(function (obj, item) {
    // console.log(item); // car truck bike ...
    // Check if item exists in the obj: Object
    if (!obj[item]) {
        obj[item] = 0;
    }
    obj[item]++;
    return obj;
}, {}); // Give it a starting empty {} object
console.log(transportation);
// 8.2 TS
// TODO ? Do I data.map() to return Transportation Object? NOPE!
// const transportationTS: Transportation = data.reduce((a, b) => {
//   if (!a[b]) {
//     a[b] = 0;
//   }
//   a[b]++;
//   return a;
// }, {});
// console.log(transportationTS);
// 8.3 TS Split
var howManyOfEach = function (obj, item) {
    // Check whether item is a key in obj (e.g., obj["car"])
    if (!obj[item]) {
        obj[item] = 0;
    }
    obj[item]++;
    return obj;
};
var transportationTS = data.reduce(howManyOfEach, {});
console.log(transportationTS);
