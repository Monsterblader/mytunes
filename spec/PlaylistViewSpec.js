describe("PlaylistView", function() {
  var view, collection;

  beforeEach(function() {
    collection = new Songs();
    collection.reset([
      {fake: "data", url: "is apparently necessary"}
    ]);

    spyOn(PlaylistView.prototype, 'render').andCallThrough();
    view = new PlaylistView({collection: collection});
    view.render();
  });

  it("should tell the user to click on some songs in the library", function(){
    expect(view.$el.html()).toMatch(/click on something/i);
  });

  describe("when a song's 'queuedAt' property is changed", function(){

    it("should be rerendered", function(){
      var song = collection.models[0];
      song.set("queuedAt", new Date());
      expect(view.render).toHaveBeenCalled();
    });

    it("should have the updated item in its collection", function(){
      // queuedSongs should be an empty array to start
      expect(view.queuedSongs.length).toEqual(0);

      // we're going to update a model.  we're not going to call the view anywhere,
      // but in the below test, we're expecting it to have changed.  this should
      // happen through event binding -- the view has the collection that the song
      // is in, and can find out about changes through that.
      var song = collection.models[0];
      song.set("queuedAt", new Date());
      // 
      expect(view.queuedSongs[0]).toEqual(song);
    });

    it("should have the updated item in its html", function(){
      var song = collection.models[0];
      song.set("queuedAt", new Date());
      expect(view.$el.html()).not.toMatch(/click on something/);
    });
    
  });
});