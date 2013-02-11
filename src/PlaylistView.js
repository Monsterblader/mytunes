var PlaylistView = Backbone.View.extend({
  initialize: function(){
  	this.queuedSongs = [];
  	// Method 1: Use self
  /*	var self = this;
  	var newFunc = function() {
 			self.render();
 		};
 		this.collection.on('change:queuedAt', newFunc);
	*/	

		// Method 2: Use Function.bind()
 		// this.collection.on('change:queuedAt', this.render.bind(this));

  	// Method 3: Use backbone's third argument!
  	this.collection.on('change:queuedAt', this.addtoQueue, this);
 		
 		// why doesn't this work?
 		//this.collection.on('change:queuedAt', this.render);
   },

  render: function(){
  	this.$el.html("<div>Click on something.</div>");
  	return this.$el;
  },

  addtoQueue: function() {
  	this.queuedSongs = _.filter(this.collection.models, function(val){
  		if(val.attributes.queuedAt !== undefined) {
  			return val.attributes.queuedAt;
  		}
  	});
		this.render;
	},

	removeFromQueue: function() {
		this.queuedSongs.shift();
	}
});
