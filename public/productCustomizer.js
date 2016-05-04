var ProductCustomizer = function(){
  this.canvas = document.getElementById('customizer-canvas'),
  this.context = this.canvas.getContext('2d'),
  this.spritesheet = new Image(),
  this.spritesheet.src = 'images/spritesheet.png';

  // Metadata
  this.features = [

    { title: "Zipper",
      id: "zipper",
      description: "Han Solo ipsum dolor sit amet organa darth mon mace dagobah alderaan coruscant hutt ben amidala. Solo kashyyyk dooku skywalker mandalore boba jabba. Kamino moff calrissian kenobi luuke dooku ackbar.",
      optionType: "radio",
      cells: {left: 0, top: 0, width: 800, height: 400},
      optionPlacement: {left: 100, top: 200},
      options: [
        {title: "Short", left: 0, top: 400, width: 100, height: 100},
        {title: "3/4", cost: 10, left: 100, top: 400, width: 100, height: 100},
        {title: "Full", cost: 10, left: 200, top: 400, width: 100, height: 100}
      ]
    },

    { title: "Zipper Pocket",
      id: "zipper-pocket",
      description: "Lucas ipsum dolor sit amet organa darth mon mace dagobah alderaan coruscant hutt ben amidala. Solo kashyyyk dooku skywalker mandalore boba jabba. Kamino moff calrissian kenobi luuke dooku ackbar.",
      optionType: "radio",
      cells: {left: 800, top: 0, width: 800, height: 400},
      optionPlacement: {left: 300, top: 100},
      options: [
        {title: "Without", left: 300, top: 400, width: 100, height: 100},
        {title: "With", cost: 5, left: 400, top: 400, width: 100, height: 100},
        {title: "With + Reflective", cost: 10, left: 500, top: 400, width: 100, height: 100}
      ]
    },

    { title: "Stitching Type",
      id: "stitching-type",
      description: "Yoda ipsum dolor sit amet organa darth mon mace dagobah alderaan coruscant hutt ben amidala. Solo kashyyyk dooku skywalker mandalore boba jabba. Kamino moff calrissian kenobi luuke dooku ackbar.",
      optionType: "radio",
      cells: {left: 1600, top: 0, width: 800, height: 400},
      optionPlacement: {left: 00, top: 300},
      options: [
        {title: "Power Seam", left: 600, top: 400, width: 100, height: 100},
        {title: "Power Seam Flat", cost: 10, left: 700, top: 400, width: 100, height: 100},
        {title: "Power Seam Piping / Side Panels", cost: 10, left: 800, top: 400, width: 100, height: 100},
        {title: "Power Seam Piping Arms / Side Panels", cost: 10, left: 900, top: 400, width: 100, height: 100},
      ]
    },

  ]
};


ProductCustomizer.prototype = {

  initializeCustomizer: function(){

    for(var i=0; i < productCustomizer.features.length; i++){

      // Get Toolbar and append Toolbar Features
      this.initializeFeatures(i);

      // Create Feature Callout and Append Data
      this.initializeFeatureCallouts(i);

      // Create Option Container, Options List, and Options
      this.initializeFeatureOptions(i);
      }

      this.drawBackground(0);
      this.drawOption(0, 0);

    },

    initializeFeatures: function(i){
      var featuresToolbar = document.getElementById('features-toolbar');
      var toolbarFeature = document.createElement('div');
      toolbarFeature.classList.add(productCustomizer.features[i].id, 'toolbar-feature', 'center-kids');
      toolbarFeature.setAttribute('value', i);
      // Inject feature button picture below
      toolbarFeature.innerHTML = i;

      if(i == 0){
        toolbarFeature.setAttribute('selected', true);
      }
      featuresToolbar.appendChild(toolbarFeature);
      toolbarFeature.addEventListener('click', function(event){

        var optionLists = document.querySelectorAll('.feature-option-list');
        var selectedOption;
        for(var z = 0; z < optionLists.length; z++){
          if(optionLists[z].getAttribute('value') == event.target.getAttribute('value')){
            subOptions = optionLists[z].querySelectorAll('.feature-option');
            for(var q = 0; q < subOptions.length; q++){
              if(subOptions[q].checked){
                selectedOption = subOptions[q].id;
              }
            }

          }
        }
        productCustomizer.toggleFeature(event);
        productCustomizer.clearCanvas();
        productCustomizer.drawBackground(i);
        productCustomizer.drawOption(selectedOption, i);
      });

    },

    initializeFeatureCallouts: function(i){

      // Create Feature Callout
      var featureCallout = document.createElement('div');
      featureCallout.classList.add('feature-callout');
      featureCallout.setAttribute('value', i);
      if(i == 0){
        featureCallout.setAttribute('visible', true);
      }

      // Create Feature Title and append to Callout
      var featureTitle = document.createElement('h3');
      featureTitle.classList.add('feature-title');
      featureTitle.innerHTML = productCustomizer.features[i].title;
      featureCallout.appendChild(featureTitle);

      // Create Feature Description and append to Callout
      var featureDescription = document.createElement('p');
      featureDescription.classList.add('feature-description');
      featureDescription.innerHTML = productCustomizer.features[i].description;
      featureCallout.appendChild(featureDescription);

      // Append Feature Callouts to Container
      document.getElementById('feature-callout-container').appendChild(featureCallout);
    },

    initializeFeatureOptions: function(i){
      var featureOptionList = document.createElement('div');
      featureOptionList.classList.add(this.features[i].id, 'feature-option-list');
      featureOptionList.setAttribute('value', i);
      if(i == 0){
        featureOptionList.setAttribute('visible', true);
      }

        // Iterate over Features 'Options' array and create form elements for each
        for(var y = 0; y < productCustomizer.features[i].options.length; y++){

          var featureOptionBlock = document.createElement('div');
          featureOptionBlock.setAttribute('value', y);

          var featureOptionLabel = document.createElement('p');
          featureOptionLabel.classList.add('option-label');;
          featureOptionLabel.innerHTML = productCustomizer.features[i].options[y].title
          if(productCustomizer.features[i].options[y].cost){
            featureOptionLabel.innerHTML += ' (+' + productCustomizer.features[i].options[y].cost + ')';
          };

          var featureOption = document.createElement('input');
          featureOption.setAttribute('type', 'radio');
          featureOption.setAttribute('name', i);
          featureOption.setAttribute('value', productCustomizer.features[i].options[y].title);
          featureOption.setAttribute('id', y);
          if(y == 0){
            featureOption.setAttribute('selected', true);
          }

          featureOption.classList.add('feature-option');
          featureOption.addEventListener('click', function(event){
            productCustomizer.clearCanvas();
            productCustomizer.drawBackground(i);
            productCustomizer.drawOption(event.target.id, i);
          });


          // If first option, set as selected
          if(y == 0){
            featureOption.checked = true;
          }
          // Append Feature to its Block, and then Blocks to the List
          featureOptionBlock.appendChild(featureOption);
          featureOptionBlock.appendChild(featureOptionLabel);
          featureOptionList.appendChild(featureOptionBlock);
        }

      // Append Feature List to Container
      document.getElementById('feature-option-container').appendChild(featureOptionList);

    },

    // Toggle a Feature and related Options
    toggleFeature: function(event){

      // 1. Store clicked element
      var clickedFeature = event.target;

      // 2. Remove selected from clicked sibling and add it to clicked
      var clickedSiblings = document.querySelectorAll('.toolbar-feature');
      for(var i = 0; i < clickedSiblings.length; i++){
        if(clickedSiblings[i].getAttribute('selected')){
          clickedSiblings[i].removeAttribute('selected');
          clickedFeature.setAttribute('selected', true);
        }
      }

      var featOpLists = document.querySelectorAll('.feature-option-list');
      for(var i = 0; i < featOpLists.length; i++){
        // 3. Find Option List with attr visible and remove visible,
        if(featOpLists[i].getAttribute('visible')){
          featOpLists[i].removeAttribute('visible');
        }
        // 4. Add visible to option with the same value from #1
        if(featOpLists[i].getAttribute('value') == clickedFeature.getAttribute('value')){
          featOpLists[i].setAttribute('visible', true);
        }
      }

      var callout = document.querySelectorAll('.feature-callout');
      for(var i = 0; i < featOpLists.length; i++){
        // 3. Find Option List with attr visible and remove visible,
        if(callout[i].getAttribute('visible')){
          callout[i].removeAttribute('visible');
        }
        // 4. Add visible to option with the same value from #1
        if(callout[i].getAttribute('value') == clickedFeature.getAttribute('value')){
          callout[i].setAttribute('visible', true);
        }
      }

    },

    // Clear the canvas for redraw
    clearCanvas: function(){
      productCustomizer.context.clearRect(0, 0, productCustomizer.canvas.width, productCustomizer.canvas.height);
    },

    // Draw a feature's background
    drawBackground: function(featureNumber){
      var feature = productCustomizer.features[featureNumber];
      productCustomizer.context.drawImage(productCustomizer.spritesheet,
                        feature.cells.left, feature.cells.top, feature.cells.width, feature.cells.height,           // Where to crop the image on spritesheet
                        0, 0, feature.cells.width, feature.cells.height);  // Where to paste the image on canvas
      // Below functions work
      // productCustomizer.context.rect(20,20,150,100);
      // productCustomizer.context.fillStyle = "red";
      // productCustomizer.context.fill();
    },

    drawOption: function(optionNumber, featureNumber){

      var feature = productCustomizer.features[featureNumber];
      var option = feature.options[optionNumber];
      productCustomizer.context.drawImage(productCustomizer.spritesheet,
                        option.left, option.top, option.width, option.height,           // Where to crop the image on spritesheet
                        feature.optionPlacement.left, feature.optionPlacement.top, option.width, option.height);  // Where to paste the image on canvas


    },

    // GET and SET Product Configuration Data to Server
    getData: function(){},

    setData: function(){},
};


// Launch Customizer
var productCustomizer = new ProductCustomizer();

productCustomizer.spritesheet.onload = function(event){
  productCustomizer.initializeCustomizer();
}
