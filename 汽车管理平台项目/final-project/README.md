# Car Inventory
---
### Project description
---
- In this project, I make an inventory System to manage our car dealer's Inventory. In real world, we can use this system to manage cars. this system easy to operate and search information.

- This project has authentication function, you should sign up an admin account, so that you can manage inventory.

- This project use SPA to achieve 5 different display pages.like log in page, sign up page, show inventory page, add new car page, and About Us page.
---
- In the Log in page, we can input our username and password to enter main page. username has some limit, for example, username can't have space and can't use 'dog' as your username. And length of username must between 2-20.

- In the sign up page, you can create your admin account, so that you can enter our inventory system.

- In the main page, you will see an navigation bar to help you choose you want.

- you can click show inventory of navigation barm and will show all inventory of this dealer, you can see car's brand, model, and their quantity. You can add, decrease and delete car.

- you can also click add new car to add a new car into our inventory. if this car's brand and model already in our inventory, we just change quantity. if not, will show in inventory.

- clicking about us, you can see some personal information about inventory owner.

### Run this project
---
1. use `git clone` this repo in your local computer
2. use `npm install` to download libraries in this project.
3. use `npm start` to run this project
4. open browse, type url `http://localhost:5000` to get this project.

### Teach Stack
---
- Font End:
  - HTML, CSS, JavaScript
  - React, use hooks, like useState, useEffect, useReducer, useContext.
-Back End:
  - Node.js as backend enviornment to run JavaScript
  - express.js as our web frame to construct our http methods.
  - use cookie-parser, uuid, nodemon libraries
