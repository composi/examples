# @composi/core in the Browser

This is an example of how to use @composi/core in the browser without a build step. All the code is in the app.js file. A script tag in the index.html imports it. Notice how that script has a property: `type='module'`. Also note how the external scripts are loaded in app.js from Github. They all have `?module` at the end to let the browser know that these are ES6 modules.

You can run this in your browser easily by installing `http-server`.

```bash
npm i -g http-server
```

After installing it, you can `cd` to this project and run:

```bash
http-server
```

When the server starts, it will print out a url that you can copy and paste into the browser. And that's all there is to it. Edit app.js and reload the browser to see changes live, no build required.