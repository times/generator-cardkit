CardKit is a JavaScript library that lets you simply create configurable images on the web. You can build your own interface for it, but it also includes its own to get you started.

![CardKit 2's built-in UI](http://i.imgur.com/bKEKjly.png)

This tutorial will take you through the key steps required to get yourself up and running with CardKit, have a UI in your browser to build your images.

# 0. Install Node

You'll need [Node.js](https://nodejs.org/en/) and `npm` installed to complete this tutorial

# 1. Install Yeoman

To get you started quicker, we've built a generator that helps scaffold out a CardKit project for you. To use this you'll need [Yeoman](http://yeoman.io/) and the generator installed on your machine. To do so, open Terminal and run the following:

    $ npm install -g yo generator-cardkit

You should see these packages install.

# 2. Create a directory for your project to live in

In Terminal run the following command:

    $ cd ~/; mkdir cardkit-project; cd cardkit-project

This will create a folder in your user's root directory called `cardkit-project`. Feel free to place this wherever you wish, but ensure you move into it using `cd` before running step #3.

# 3. Run the generator

In Terminal run the following command:

    $ yo cardkit

A number of questions should appear, answer them in line. When it asks _Is this for use in the browser, or on a Node.js server?_, select **Server**. 

This should then copy the appropriate files into your current directory, and install the external dependencies required to get CardKit up-and-running.

# 4. Start it up!

We're now going to start a local development server so you can see your CardKit installation, and start to make changes to your configuration. Run the following command:

    $ npm start

Your default web browser should open at http://localhost:8000, you should see a view similar to the screenshot at the top of this tutorial.

If you aren't seeing anything in your browser at this point, take a look in the console (`alt` + `cmd` + `J`) and see if there any errors. Log them as issues at https://github.com/times/cardkit/issues.

# 5. Understand your app structure

Open up the current directory with your code editor of choice. You should see the following files and folders:

    + node_modules/ -- This is where all the external dependencies live, you shouldn't need to worry about this
    + src/ -- This is the core of your app, and contains all the logic around rendering and configuration specific to your needs
    + webpack/ -- This contains configuration files that help you run a local development server, and build a distributable version of your app once you're done
    + .gitignore -- If you choose to push your code to GitHub, this will make sure you only push the files you need
    + package.json -- A definition file, that tells services like `npm` everything about your project
    + README.md -- A cover file for your app, formatted using Markdown, and contains setup details for other to use
    + webpack.config.js -- Uses the configuration files in the webpack/ directory

You need to look inside the `src/` directory, where you'll find the following files:

    + `configuration/` -- Contains your configuration, take a look at `main.js`
    + `app.js` -- Loads in your configuration, initialises CardKit and the browser (DOM) renderer, and renders the UI to your page
    + `index.html` -- This file contains the DOM element that `app.js` uses to know where to render to

Open up `src/configuration/main.js`, in here you can edit the size of your card, and the default background fill. If you want to change the layers that appear on your card, edit the `src/configuration/layers.js` file.

# 6. Configure your image

Along with the existing editable text field you already have, we're going to add an image uploader, and a second text layer that is attached to the first.

Let's start with the text field. First we'll work out the key information we need to know, and build a JavaScript object that represents it:

    subtitle: { // This is an internal reference name of this, we can use it for attaching other layers to this one
      name: 'Subtitle', // This is the display name the user will see in the UI
      type: 'text', // We want it to be text
      x: 30, // This is the x position of this element on the image
      y: { // y is normally a number, like x, however here we're going to provide an object that connects it to our existing title layer
        attach: 'title', // 'title' is the name of the layer we already have in our configuration object
        offset: 10, // This is a numeric value of pixels we want to offset this by on the Y axis, a higher number moves it further away from the element it is attached to
      },
      fill: '#EAEAEA', // The colour of this text
      text: 'This is the default text of this field',
      fontSize: 18, // A number representing the font size in pixels
      get lineHeight() { // This is a JavaScript getter, and allows to compute a value based on another property of this layer
        return this.fontSize * 1.2; // This gets the font size (18), and multiplies it by 1.2, adding 20% in size
      },
      editable: { // This is an object of properties that should be editable
        text: true // Makes the text value editable, this builds a text field in the UI 
      }
    },

Read through the above code and get a feeling for what it is doing. Paste in the above code after line 22. Save `layers.js`. If you look in your browser at http://localhost:8000 you should see an additional line of text. If you click on _Content_ on the left hand side, you should see your new text field appear in the panel. Edit the value of any of the fields there, and you should see the image update in real-time.

We're now going to add an image uploader. Let's do the same as before, and build up an object that will represent our image:

    logo: {
      name: 'Logo',
      type: 'image', // We'll choose type 'image' here, that handles rendering an inline image
      x: 500,
      y: 30,
      width: 100, // A pixel width for the image to render at
      get height() { // Here we use a JavaScript getter that returns the value of height, without this our resize logic (that we'll add shortly won't work)
        return this.width;
      },
      src: '', // There is no default value, so we'll provide an empty string
      preserveAspectRatio: 'xMinYMin', // This an SVG specific property that ensures our image uniformly scales, search the property name to find other possible values
      draggable: true, // Setting draggable to true means the user can drag this layer around our image
      editable: {
        src: true, // We want the source to be editable, this will create a file uploader
        width: { // We want it to be resizable, so set width to be editable (remember height is dynamically the same value as width). We provide an object that specifies the minimum and maximum values, along with a step count
          min: 50,
          max: 500,
          step: 10
        }
      }
    },

Paste this code just after the previous code you copied into your `layers.js` file. Save it, and reload your browser. After clicking on _Content_ on the left hand side, you should see a file uploader. Select a file from your local computer, and you should see it appear on the image. Use the range slider to resize it, and try dragging it around on your image.

# 7. Save it

Fill in some of the text fields, and upload yourself a logo. Position everything how you'd like it, and then click _Save_ on the bottom left. An image should download in your browser. Open it up, and if all is well, your image should now be available for use on your Twitter, Facebook or Instagram account. Congratulations! 🎉

![My sample image](http://i.imgur.com/RpzN69G.jpg)

# 8. Build for distribution

The final step is to build your CardKit app so it can be deployed to a web server or static site hosting (like [GitHub Pages](https://pages.github.com/)). In your Terminal run the following command (you may need to press `Ctrl` + `C` to cancel your local development server first).

    $ npm run dist

After this process has completely, you should see a `dist/` folder in your project directory. This should contain an `app.js` file and an `index.html` file. If you run the `index.html` (or copy both files to a server and run them), you should see CardKit running with your configuration.

# 9. Stretch goals

- If you've been able to do all the above, try adding some of your own layers. You can read more about how to do that [here](https://github.com/times/cardkit/wiki/Creating-your-own-configuration)
- You might want to output images at different sizes, or with different colour palettes. To do so, you'll need to use CardKit's Theme, Layout and Template logic, which you can read more about [here](https://github.com/times/cardkit/wiki/Creating-your-own-configuration#templates-themes-and-layouts)
- Commit your code to GitHub