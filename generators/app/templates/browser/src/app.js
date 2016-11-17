// Load dependencies
const CardKit = require('cardkit');
const CardKitDOM = require('cardkit/dom');

// Import configuration
const { configuration, templates, themes, layouts } = require('./configuration/main');

// Initialise
const cardkit = new CardKit(configuration, {
  templates: templates,
  themes: themes, 
  layouts: layouts
});

// Start the renderer
const renderer = new CardKitDOM(cardkit);

// Render the UI
renderer.renderUI('ui');