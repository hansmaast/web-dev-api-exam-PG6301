
Test Coverage
-----                                   
File      |  % Stmts | % Branch |  % Funcs |  % Lines |
----------|----------|----------|----------|----------|
All files |    68.85 |    65.15 |    65.63 |    69.67 | 
---   
How to run the application
-----

######From root folder, run the following commands:

+ install dependencies using `yarn install`

+ build project using `yarn build`

+ start dev-server using `yarn dev`

+ run test using `yarn test` 

---

What this project does
-----
This project is a basic Gacha game, that lets you consume items from Loot boxes. When a user signs up
s/he gets 3 loot boxes, which it is possible to collect from the GachaGame component found at /gacha-game. 
When you consume the items they will appear in your users items, which is availabe to view in the MyItems 
component found at /my-items. Here you get an overview over your consumed items (inculuding the amout of 
duplicate items), and the items you are missing. You also have the ability to sell the items, wich in return 
will give you cash. To keep it simple you get the price of the item in return. After earing some cash, you can 
buy a new Loot box at the /gacha-game section, and the items you consume will again appear among your items. 

---

How it is structured
-----
The project is structured with two mock DBs, one for all the items in the game, and one for the users. the user
DB is containing the specific user info, and the users items. For further development of this application, i would 
consider removing the user items to an seperate db/column. 

furthermore the application has a RESTful API that makes communicating (performing actions) between the DB and client 
via the server possible. The client sends a request to the api, which then performs an specific action, and returns
a response.

The client side is structured with its main content based in the index.js file, wich then passes its functions and 
data down to the child components props. Some of the components also contains functions and values
specific for the component.     

---
How you implemented it:
-----

The user data lives inside the user object, which gets deserialized when authenticated with Passport. Most of the 
business logic is implemented on the server side. The clientside is implemented with some functions for checking user 
input, before sending the data to the server. 

When the user adds new items to its collection, the server updates the user data in the user object. The user items is 
stored as an object containing the items 'id' as a property, and the selected items properties as values, along with an 
'amount' property to keep track of how many duplicates you have. A function then checks if the item already exists in 
the users items. If so, add one to 'amout', else add the object. 

For getting the users 'missing items', i implemented a post request sending the id's of the users collected items. 
When the post hits the endpoint, the api then sends the id's to a function in the DB for comparing the ids within 
a copied array of the game items. If there is a match, the function removes the items from the array, and sends the 
missing items in return to the client. 

The front-end of this application has not been much weighted, as it was not a requirement for the exam. For further 
development I would improve the front-end drastically. I have written most of the css inline in React. This is fast for
minor changes, but it makes the testing harder, since you dont need classes and ids on the elements.   
 
Different technologies used
-----
This project uses Node along with Express on the back-end, and React with React-Router on the front-end. The 
testing libraries used is Jest and Enzyme, and Passport is used to implement session-based authorization (via cookies).

The project also uses Webpack for bundling, along with Babel for transpiling.    

Requrements of exam completed
---
- [x] R1
- [x] R2
- [x] R3
- [x] R4
- [ ] R5

I did not manage to implement R5.

Known bugs
-----

+ Your cash doesn't decrease when buying a loot box..
+ Refresh from /gach-game and /my-items redirects to Home...
+ From console: `Cannot update during an existing state transition (such as within `render`).`
+ From console: `MyItems.jsx:18 Uncaught (in promise) TypeError: Cannot destructure property 'myItems' of 'this.props.user' as it is null.`

