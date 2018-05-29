Kogan Challenge
===============

This is my solution to the [Specific Kogan Programming Challenge](https://kogan-challenge-2018-05-29.herokuapp.com/kogan-challenge.pdf) assigned to me.

# Solution
The solution that I came up with is a simple API server which contacts the given api end-point. Here's how the solution is implemented.

###  API
The api is as follows

| url | function           | return type  | example link |
| ------------- |:-------------:| -----:| ----:|
| /all/{CATEGORY}/average_cw | Returns the average cubic weight for the given CATEGORY | Number  | [/all/Air Conditioners/average_cw](https://kogan-challenge-2018-05-29.herokuapp.com/all/Air%20Conditioners/average_cw) |
| /all/{CATEGORY}      | Returns all product objects matching the given CATEGORY | Array | [/all/Air Conditioners](https://kogan-challenge-2018-05-29.herokuapp.com/all/Air%20Conditioners) |
| /all/      | Returns all product objects | Array |  [/all](https://kogan-challenge-2018-05-29.herokuapp.com/all) |

###  Tech
- Node Application
- Express js Server
- Promises, async await

###  Get started
1. Clone the [GitHub Repository](https://github.com/benwinding/Kogan-Challenge-2018-05-29)
1. `npm install` or `yarn`
1. `npm start` or `yarn start`
