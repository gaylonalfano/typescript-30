// ## Array Cardio Day 2
interface Person {
  name: string;
  year: number;
}

const people: Person[] = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

interface PersonComment {
  text: string;
  id: number;
}

const comments: PersonComment[] = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// ===== Array.prototype.some()
// Some is at least ONE person 19 or older?
const isAdult = people.some((person: Person): boolean => {
  const now = new Date();
  const age = now.getFullYear() - person.year;
  console.log(`${person.name} is ${age} years old`);
  return now.getFullYear() - age >= 19;
});
console.log(`some() => ${isAdult}`);

// ===== & Array.prototype.every()
// Every is EVERYONE 19 or older?
const allAdults = people.every((person: Person): boolean => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - person.year;
  return age >= 19;
});
console.log(`every() => ${allAdults}`);

// ====== Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
// == basic
const comment = comments.find(
  (comment: PersonComment) => comment.id === 823423
);
console.log({ comment });

// == custom function
function findCommentById(id: number, data: Array<PersonComment> = comments) {
  data.find((comment: PersonComment) => {
    // console.log(`comment: ${comment.id}`);
    // console.log(comment.id === id); // true, false
    // return comment.id === id; // true, false
    return comment.id === id ? console.log({ comment }) : false;
  });
}
// findCommentById(823423, comments);
findCommentById(823423); // has default for 'data' param

// ====== Array.prototype.findIndex()
// Find the index of comment with this ID
const commentIndex = comments.findIndex((comment: PersonComment):
  | boolean
  | -1 => {
  return comment.id === 823423; // index or -1
});
console.log({ commentIndex });

// delete the comment with the ID of 823423
// NOTE Two ways: splice(index, 1)
// comments.splice(commentIndex, 1);
// console.table(comments); // now just have 4 comments

// Or, don't modify original array but instead make copy
const newComments: PersonComment[] = [
  // Use ...spread + slice()
  ...comments.slice(0, commentIndex),
  ...comments.slice(commentIndex + 1),
];
