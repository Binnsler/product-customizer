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
      description: "Lucas ipsum dolor sit amet organa darth mon mace dagobah alderaan coruscant hutt ben amidala. Solo kashyyyk dooku skywalker mandalore boba jabba. Kamino moff calrissian kenobi luuke dooku ackbar.",
      optionType: "radio",
      options: [
        {title: "Without"},
        {title: "With", cost: 5},
        {title: "With + Reflective", cost 10}
      ]
    },
    ...
  ],
  ...
};
```

#### Creating Features Tooler, Feature Callouts, and Feature Configs
```javascript
var productCustomizer.prototype = {
  ...
  initializeCustomizer: function(productData){

    for(var i=0; i < productData.features.length; i++){

      // Get Toolbar and append Toolbar Features
      var featuresToolbar = document.getElementById('features-toolbar');
      var toolbarFeature = document.createElement('div');
      toolbarFeature.classList.add(productData.features[i].title, 'toolbar-feature');
      toolbarFeature.setAttribute('value', i);
      featuresToolbar.appendChild(toolbarFeature);

      // Create Feature Callout
      var featureCallout = document.createElement('div');
      featureCallout.classList.add('feature-callout');
      featureCallout.setAttribute('value', i);

      // Create Feature Title and append to Callout
      var featureTitle = document.createElement('h3');
      featureTitle.classList.add('feature-title');
      featureTitle.innerHTML = productData.features[i].title;
      featureCallout.appendChild(featureTitle);

      // Create Feature Description and append to Callout
      var featureDescription = document.createElement('p');
      featureDescription.classList.add('feature-description');
      featureDescription.innerHTML = productData.features[i].description;
      featureCallout.appendChild(featureDescription);

      // Create Feature Callout Container
      var featureCalloutContainer = document.getElementById('feature-callout-container');
      // Append the Callout into the Container
      featureCalloutContainer.appendChild(featureCallout);

      // Create Option Container
      var featureOptionContainer = document.createElement('div');
      featureOptionContainer.classList.add(productData.features[i].title, 'feature-option-container');
      featureOptionContainer.setAttribute('value', i);

      // Iterate over Features 'Options' array and create form elements for each

        for(var y = 0; y < productData.features[i].options.length; y++){
          var featureOption = document.createElement('input');
          featureOption.classList.add('feature-option');
          featureOption.setAttribute('value', productData.features[i].options[y].title);
          featureOption.setAttribute('type', 'radio');
          if(productData.features[i].options[y].cost){
            featureOption.innerHTML = productData.features[i].options[y].title + ' + (' + productData.features[i].options[y].cost + ')';
          };
          // If first option, set as selected
          if(y == 0){
            featureOption.checked = true;
          }
          // Append Feature to it's Container
          featureOptionContainer.appendChild(featureOption);
        }
      }
    }
  },
  ...
};
```

#### GET and SET Product Configuration Data to Server
```javascript
var productCustomizer.prototype = {
  ...
  getData: function(){},
  setData: function(){},
  ...
};
```
