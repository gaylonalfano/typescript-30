// Wrap entire code in IIFE function: https://github.com/tricinel/TypeScript30/blob/master/src/06%20-%20Type%20Ahead/main.ts
(function () {
    // ===== Fetch our data and store in cities array
    var endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
    var cities = [];
    fetch(endpoint)
        .then(function (response) { return response.json(); })
        .then(function (data) { return cities.push.apply(cities, data); });
    // ===== Create a function to find matches from user input
    function findMatches(wordToMatch, cities) {
        // Need to filter cities based on wordToMatch
        return cities.filter(function (city) {
            // city.city.includes(wordToMatch); // boolean!
            // TODO Use regex to match the input
            // NOTE I used .includes() and .indexOf() for a simple case
            var regex = new RegExp(wordToMatch, "gi");
            // Return the city or state match
            return city.city.match(regex) || city.state.match(regex);
        });
    }
    // ===== Add commas to population number using regex
    function numberWithCommas(n) {
        // FIXME For some reason my numberWithCommas() doesn't work
        // FIXED Forgot to compile my changes from TS > JS!
        // const regex = new RegExp()
        // return n.toString().replace(/B(?=(d{3})+(?!d))/g, ',');
        // return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // ===== Display matches and highlight search term
    function displayMatches(e) {
        var _this = this;
        // console.log(this.value);
        // console.log(e.type);
        // TODO We need to use our findMatches() combined with this.value to get user input
        var matches = findMatches(this.value, cities); // FIXME Returns TWO arrays...
        // console.log(matches);
        // TODO Now need to display <li> for each with 'City, State, Population' format
        // === MY ATTEMPTS
        // Now loop over matches array and add <li> for each match.
        // for (let city in matches) {
        //   console.log(city); // 0, 1 ...indexes
        // }
        // matches.map((match: City) => {
        //   const itemContent = `${match.city}, ${match.state}`;
        //   const li = document.createElement("li"); //<li>
        //   li.appendChild(document.createTextNode(itemContent));
        //   suggestionsList.appendChild(li);
        // });
        // FIXME ? How best to add these li elements?
        // === SOLUTION
        var html = matches
            .map(function (city) {
            // TODO Add highlighting to matching text
            var regex = new RegExp(_this.value, "gi");
            // TODO ? Okay, have a match need to find the indexOf
            // and then replace() with the highlighting span
            // FIXME Nope! Just create a separate variable (cityName, stateName)
            // and .replace() the match with regex!
            var cityName = city.city.replace(regex, "<span class=\"hl\">" + _this.value + "</span>");
            var stateName = city.state.replace(regex, "<span class=\"hl\">" + _this.value + "</span>");
            // FIXME For some reason my numberWithCommas() doesn't work
            // FIXED Forgot to compile my changes from TS > JS!
            return "\n      <li>\n        <span class=\"name\">" + cityName + ", " + stateName + "</span>\n        <span class=\"population\">" + numberWithCommas(city.population) + "</span>\n      </li>\n    ";
        })
            .join("");
        // console.log(html); // Array<string>
        // FIXME Above returns Array<string>. Need to chain .map().join('') to get string
        suggestionsList.innerHTML = html;
        // Time to attach this <li> html using appendChild()
        // FIXME Not needed! Just chain .map().join() to get string instead of Array
        // Then it's a simple set innerHTML
        // html.forEach((item) => {
        //   const li = document.createElement("li");
        //   li.innerHTML = item;
        //   suggestionsList.appendChild(li);
        // });
    }
    // ===== Grab our UI elements
    var searchInput = document.querySelector(".search");
    var suggestionsList = document.querySelector(".suggestions");
    // ===== Add event listeners on input for 'change' and 'keyup'
    // Use 'change' to trigger AFTER clicking outside of input
    searchInput.addEventListener("change", displayMatches);
    // Use 'keyup' to trigger AFTER any keypress
    searchInput.addEventListener("keyup", displayMatches);
})();
