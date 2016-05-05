### What is this?
A NikeID-esque tool built in the JavaScript Canvas API that gives users the ability to customize an article of clothing through a set of menus. The tool is generated on page load by passing the engine a metadata file and a `spritesheet.png`. Note that for the purposes of a demo we will be loading a metadata file and spritesheet manually, but in reality these files will be loaded by the server.

### Technical Overview
The metadata(productData) and spritesheet are requested from the server in JSON format and made available to the productCustomizer (productCustomizer.js) engine. The engine iterates over the features list and creates menu nav buttons for each feature (making the first 'selected'), along with generating HTML blocks for each respective button (hiding all but the first). Feature options are generated in a similar manner.

The engine uses event listeners to watch for button click or form click events in order to trigger Canvas methods to update the product view and switch selected states. Product configuration changes are saved into localStorage variables, which are then sent to the server when users click the "Submit" button.

#### Metadata Example
```javascript
var productData = {
  ...
  features: [
    ...
    { title: "Zipper",
      id: "zipper",
      description: "Han Solo ipsum dolor sit amet organa darth mon mace dagobah alderaan coruscant hutt ben amidala. Solo kashyyyk dooku skywalker mandalore boba jabba. Kamino moff calrissian kenobi luuke dooku ackbar.",
      optionType: "radio",
      cells: {left: 0, top: 0, width: 800, height: 400},
      optionPlacement: {left: 100, top: 200},
      options: [
        {title: "Short", left: 0, top: 400, width: 100, height: 100},
        {title: "3/4", cost: 10, left: 100, top: 400, width: 100, height: 100},
        {title: "Full", cost: 10, left: 200, top: 400, width: 100, height: 100, selected: true}
      ]
    },
    ...
  ],
  ...
};
```

#### Creating Features Toolbar, Feature Callouts, and Feature Options
```javascript
var productCustomizer.prototype = {
  ...
  initializeCustomizer: function(){

    for(var i=0; i < productCustomizer.features.length; i++){

      // Get Toolbar and append Toolbar Features
      this.initializeFeatures(i);
      // Create Feature Callout and Append Data
      this.initializeFeatureCallouts(i);
      // Create Option Container, Options List, and Options
      this.initializeFeatureOptions(i);
      }

      // On initial load, draw the first background and the selected option (or the first if none are selected)
      this.drawBackground(0);
      this.drawOption(productCustomizer.firstSelected(), 0);

    },
  ...
};
```
