// Wrap entire code in IIFE function: https://github.com/tricinel/TypeScript30/blob/master/src/06%20-%20Type%20Ahead/main.ts
(function() {


// ===== Fetch our data and store in cities array
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

// {
//     "city": "New York",
//     "growth_from_2000_to_2013": "4.8%",
//     "latitude": 40.7127837,
//     "longitude": -74.0059413,
//     "population": "8405837",
//     "rank": "1",
//     "state": "New York"
// },

interface City {
  city: string;
  growth_from_2000_to_2013: string;
  latitude: number;
  longitude: number;
  population: string;
  rank: string;
  state: string;
}

const cities: City[] = [];

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => cities.push(...data));

// ===== Create a function to find matches from user input
function findMatches(wordToMatch: string, cities: City[]) {
  // Need to filter cities based on wordToMatch
  return cities.filter((city: City): RegExpMatchArray | null => {
    // city.city.includes(wordToMatch); // boolean!
    // TODO Use regex to match the input
    // NOTE I used .includes() and .indexOf() for a simple case
    const regex = new RegExp(wordToMatch, "gi");
    // Return the city or state match
    return city.city.match(regex) || city.state.match(regex);
  });
}

// ===== Add commas to population number using regex
function numberWithCommas(n: string): string {
  // FIXME For some reason my numberWithCommas() doesn't work
  // FIXED Forgot to compile my changes from TS > JS!
  // const regex = new RegExp()
  // return n.toString().replace(/B(?=(d{3})+(?!d))/g, ',');
  // return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ===== Display matches and highlight search term
function displayMatches(this: HTMLInputElement, e: Event) {
  // console.log(this.value);
  // console.log(e.type);
  // TODO We need to use our findMatches() combined with this.value to get user input
  const matches = findMatches(this.value, cities); // FIXME Returns TWO arrays...
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
  const html = matches
    .map((city: City) => {
      // TODO Add highlighting to matching text
      const regex = new RegExp(this.value, "gi");
      // TODO ? Okay, have a match need to find the indexOf
      // and then replace() with the highlighting span
      // FIXME Nope! Just create a separate variable (cityName, stateName)
      // and .replace() the match with regex!
      const cityName = city.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = city.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      // FIXME For some reason my numberWithCommas() doesn't work
      // FIXED Forgot to compile my changes from TS > JS!
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(city.population)}</span>
      </li>
    `;
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
  const searchInput = document.querySelector(".search") as HTMLInputElement;
  const suggestionsList = document.querySelector(
    ".suggestions"
  ) as HTMLUListElement;

  // ===== Add event listeners on input for 'change' and 'keyup'
  // Use 'change' to trigger AFTER clicking outside of input
  searchInput.addEventListener("change", displayMatches);
  // Use 'keyup' to trigger AFTER any keypress
  searchInput.addEventListener("keyup", displayMatches);

})();
