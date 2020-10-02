const cheerio = require("cheerio");
const axios = require("axios");
/*
Aim
Help that learner to access a list of free Udemy courses
*/

/*
Observation
Udemy has a filter for free courses for each course category
The list of free courses can gotten by accessing the filter url
*/

/*
Algorithm & Plan
- Set base url: https://www.udemy.com/courses/{category}/?price=price-free
- Get a list of the categories
- Fetch markup of category url
- Find consistent selectors for the classes
- Scrap important details from the courses
- Prepare JSON
- Maybe use Redis
- Create API /& Website with a templating engine
*/
