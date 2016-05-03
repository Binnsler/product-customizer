var ProductCustomizer = function(){
  this.canvas = document.getElementById('customizer-canvas'),
  this.context = this.canvas.getContext('2d'),

  // Metadata
  this.features = [

    { title: "Zipper",
      id: "zipper",
      description: "Han Solo ipsum dolor sit amet organa darth mon mace dagobah alderaan coruscant hutt ben amidala. Solo kashyyyk dooku skywalker mandalore boba jabba. Kamino moff calrissian kenobi luuke dooku ackbar.",
      optionType: "radio",
      options: [
        {title: "Short"},
        {title: "3/4", cost: 10},
        {title: "Full", cost: 10}
      ]
    },

    { title: "Zipper Pocket",
      id: "zipper-pocket",
      description: "Lucas ipsum dolor sit amet organa darth mon mace dagobah alderaan coruscant hutt ben amidala. Solo kashyyyk dooku skywalker mandalore boba jabba. Kamino moff calrissian kenobi luuke dooku ackbar.",
      optionType: "radio",
      options: [
        {title: "Without"},
        {title: "With", cost: 5},
        {title: "With + Reflective", cost: 10}
      ]
    },

    { title: "Stitching Type",
      id: "stitching-type",
      description: "Yoda ipsum dolor sit amet organa darth mon mace dagobah alderaan coruscant hutt ben amidala. Solo kashyyyk dooku skywalker mandalore boba jabba. Kamino moff calrissian kenobi luuke dooku ackbar.",
      optionType: "radio",
      options: [
        {title: "Power Seam"},
        {title: "Power Seam Flat", cost: 10},
        {title: "Power Seam Piping / Side Panels", cost: 10},
        {title: "Power Seam Piping Arms / Side Panels", cost: 10},
      ]
    },

  ]
};


ProductCustomizer.prototype = {

  initializeCustomizer: function(){

    for(var i=0; i < productCustomizer.features.length; i++){

      // Get Toolbar and append Toolbar Features
      this.initializeToolbar(i);

      // Create Feature Callout and Append Data
      this.initializeFeatureCallouts(i);

      // Create Option Container, Options List, and Options
      this.initializeFeatureOptions(i);
      }
    },

    initializeToolbar: function(i){
      var featuresToolbar = document.getElementById('features-toolbar');
      var toolbarFeature = document.createElement('div');
      toolbarFeature.classList.add(productCustomizer.features[i].id, 'toolbar-feature', 'center-kids');
      toolbarFeature.setAttribute('value', i);
      toolbarFeature.innerHTML = i;
      if(i == 0){
        toolbarFeature.setAttribute('selected', true);
      }
      featuresToolbar.appendChild(toolbarFeature);
      toolbarFeature.addEventListener('click', function(event){
        productCustomizer.toggleFeature(event);
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

          var featureOptionLabel = document.createElement('label');
          featureOptionLabel.setAttribute('for', y);
          featureOptionLabel.innerHTML = productCustomizer.features[i].options[y].title
          if(productCustomizer.features[i].options[y].cost){
            featureOptionLabel.innerHTML += ' (+' + productCustomizer.features[i].options[y].cost + ')';
          };

          var featureOption = document.createElement('input');
          featureOption.setAttribute('type', 'radio');
          featureOption.classList.add('feature-option');
          featureOption.setAttribute('value', productCustomizer.features[i].options[y].title);
          featureOption.setAttribute('id', y);

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
      context.clearRect(0, 0, canvas.width, canvas.height);
    },

    // Draw a feature's background
    drawBackground: function(featureNumber){
      var feature = productCustomizer.features[featureNumber];
      context.drawImage(spritesheet,
                        x_crop, y_crop, w_crop, h_crop,           // Where to crop the image on spritesheet
                        0, 0, canvas_w, canvas_h);  // Where to paste the image on canvas
    },

    drawOption: function(featureNumber, optionNumber){
      var feature = productCustomizer.features[featureNumber];
      var option = feature.options[optionNumber];
      context.drawImage(spritesheet,
                        x_crop, y_crop, w_crop, h_crop,           // Where to crop the image on spritesheet
                        canvas_x, canvas_y, canvas_w, canvas_h);  // Where to paste the image on canvas
    },

    // GET and SET Product Configuration Data to Server
    getData: function(){},

    setData: function(){},
};


// Launch Customizer
var productCustomizer = new ProductCustomizer();

productCustomizer.initializeCustomizer();
