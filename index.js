/*
Aim
Help that learner to access a list of free Udemy courses
*/
// const cheerio = require("cheerio");
// const axios = require("axios").default;
const fs = require("fs");
const pptr = require("puppeteer-core");

const runPptr = async (category) => {
  const launchOptions = {
    product: "chrome",
    executablePath: "/usr/bin/google-chrome-stable",
  };
  try {
    const browser = await pptr.launch(launchOptions);
    const page = await browser.newPage();
    await page.goto(
      `https://www.udemy.com/courses/${category}/?price=price-free`,
      { waitUntil: "networkidle0" }
    );
    const baseMarkup = await page.$eval(
      "html > body .main-content-wrapper > .main-content > .ud-component--category--category > .udlite-container.udlite-page-wrapper [class^='course-directory--container--'",
      (element) => element.innerHTML
    );
    debugger;
    await browser.close();
    return baseMarkup;
  } catch (err) {
    return err;
  }
};

runPptr("business")
  .then((markup) => {
    console.log(markup);
  })
  .catch((err) => console.error(err));

// pptr.connect([options])

// const fetchMarkup = async (category) => {
//   const url = `https://www.udemy.com/courses/${category}/?price=price-free`;
//   try {
//     const { data: markup } = await axios.get(url);
//     return markup;
//   } catch (err) {
//     return err;
//   }
// };

const getCourses = (markup) => {
  // Obtain the pagination data and the courses data
  // const selector = cheerio.load(markup);
  // const someMrkUp = selector("body")
  //   .find(
  //     ".main-content-wrapper > .main-content > .ud-component--category--category >.udlite-container udlite-page-wrapper > .component-margin:last-child"
  //   )
  //   .html();
  // console.log(someMrkUp);
  //  Courses container: html>body>.main-content-wrapper>.main-content
  //  >.ud-component--category--category>.udlite-container udlite-page-wrapper
  //  >.component-margin(last-child)>.course-directory--container--5ZPhr
  //  >.filter-container--container--3A8k6>.course-list--container--3zXPS
  //  Course >.popover--popover--t3rNO popover--popover-hover--14ngr
  //  Pagination container: html>body>.main-content-wrapper>.main-content
  //  >.ud-component--category--category>.udlite-container udlite-page-wrapper
  //  >.component-margin(last-child)>.course-directory--container--5ZPhr>.pagination--container--2wc6Z
  //  Page: >[data-page](for first page) and last in the list with same attr is last page
  //  value is value of data-page attr
};

// fetchMarkup("business").then(
//   (markup) => {
//     getCourses(markup);
//   },
//   (err) => {
//     console.error(err);
//   }
// );

/*
Observation
Udemy has a filter for free courses for each course category
The list of free courses can gotten by accessing the filter url
- free course parent class: course-list--container(--3zXPS)
- each course class: popover--popover(--t3rNO) popover--popover-hover(--14ngr)
- pagination: pagination--container--(2wc6Z)
  look for first selector for `data-page` and last selector in container
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
