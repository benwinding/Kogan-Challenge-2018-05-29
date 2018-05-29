Kogan Challenge
===============

This is my solution to the [Specific Kogan Programming Challenge](/kogan-challenge.pdf) assigned to me.

# Solution
The solution that I came up with is a simple API server which contacts the given api end-point. Here's how the solution is implemented.

###  API
The api is as follows
| url | function           | return type  | example link |
| ------------- |:-------------:| -----:| ----:|
| /all/{CATEGORY}/average_cw | Returns the average cubic weight for the given CATEGORY | Number  | [/all/Air Conditioners/average_cw](/all/Air%20Conditioners/average_cw) |
| /all/{CATEGORY}      | Returns all product objects matching the given CATEGORY | Array | [/all/Air Conditioners](/all/Air%20Conditioners) |
| /all/      | Returns all product objects | Array |  [/all](/all) |

###  Tech
- Node Application
- Express js Server
- Promises, async await

###  Get started
1. Clone the [GitHub Repository]()
1. `npm install` or `yarn`
1. `npm start` or `yarn start`
