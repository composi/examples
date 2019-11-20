Tour of Heroes
==============

Author: Robert Biggs

(c) 2019 All Rights Reserved

This project is created using composi/core. You can learn more about composi/core and how to use it at its [website](https://composi.github.io).

This is a conversion of the Angular Tour of Heroes:

[Angular Tutorial](https://angular.io/tutorial)

We rebuild it using [@composi/core](http://github.com/composi/core). For routing we used [composi-router](https://www.npmjs.com/package/composi-router), an NPM module that provides client side routing. Routes are set up as a subscription that launches at start. When a path loads, it sends a message to the runtime program. The program's update method passes the message to the corresponding action to handle, resulting in a state update. This then triggers the rerender of the view.

Getting Up and Running
----------------------

In order to build this project you need to install its dependencies. Use the terminal to `cd` to this folder. Then run:

```sh
npm i
```

After NPM finishes installing, you can build and run it:

```sh
npm start
```

This will open your built project in your default browser.
