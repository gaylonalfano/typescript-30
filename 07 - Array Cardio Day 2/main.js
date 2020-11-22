var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var people = [
    { name: "Wes", year: 1988 },
    { name: "Kait", year: 1986 },
    { name: "Irv", year: 1970 },
    { name: "Lux", year: 2015 },
];
var comments = [
    { text: "Love this!", id: 523423 },
    { text: "Super good", id: 823423 },
    { text: "You are the best", id: 2039842 },
    { text: "Ramen is my fav food ever", id: 123523 },
    { text: "Nice Nice Nice!", id: 542328 },
];
// ===== Array.prototype.some()
// Some is at least ONE person 19 or older?
var isAdult = people.some(function (person) {
    var now = new Date();
    var age = now.getFullYear() - person.year;
    console.log(person.name + " is " + age + " years old");
    return now.getFullYear() - age >= 19;
});
console.log("some() => " + isAdult);
// ===== & Array.prototype.every()
// Every is EVERYONE 19 or older?
var allAdults = people.every(function (person) {
    var currentYear = new Date().getFullYear();
    var age = currentYear - person.year;
    return age >= 19;
});
console.log("every() => " + allAdults);
// ====== Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
// == basic
var comment = comments.find(function (comment) { return comment.id === 823423; });
console.log({ comment: comment });
// == custom function
function findCommentById(id, data) {
    if (data === void 0) { data = comments; }
    data.find(function (comment) {
        // console.log(`comment: ${comment.id}`);
        // console.log(comment.id === id); // true, false
        // return comment.id === id; // true, false
        return comment.id === id ? console.log({ comment: comment }) : false;
    });
}
// findCommentById(823423, comments);
findCommentById(823423); // has default for 'data' param
// ====== Array.prototype.findIndex()
// Find the index of comment with this ID
var commentIndex = comments.findIndex(function (comment) {
    return comment.id === 823423; // index or -1
});
console.log({ commentIndex: commentIndex });
// delete the comment with the ID of 823423
// NOTE Two ways: splice(index, 1)
// comments.splice(commentIndex, 1);
// console.table(comments); // now just have 4 comments
// Or, don't modify original array but instead make copy
var newComments = __spreadArrays(comments.slice(0, commentIndex), comments.slice(commentIndex + 1));
