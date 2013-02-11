describe("PlayerView", function() {
  var view, queue, collection;

  beforeEach(function() {
    collection = new Songs();
    collection.reset([
      {fake: "data", url: "is apparently necessary"}
    ]);
    view = new PlayerView({collection: collection});
    queue = new PlaylistView({collection: collection});
  });

  it("should change when the first song is queued", function(){
    expect(view.model).toBeUndefined();
    var song = collection.models[0];
    song.set("queuedAt", new Date());
    expect(view.model).toEqual(song);
  });

  describe("what happens when the song ends", function(){
    it("should remove the old song from the playlist", function() {
      var song = collection.models[0];
      song.set("queuedAt", new Date());
      var oldArray = queue.queuedSongs.slice(0);
      queue.removeFromQueue();
      expect(oldArray).not.toEqual(queue.queuedSongs);
    });
    it("should get the next song in the playlist", function() {

    });
  });

});