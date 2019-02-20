$(function() {
  let flickrApiURL =
    "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  $.getJSON(flickrApiURL, {
    //options
    tags: "xboxone",
    tagmode: "any",
    format: "json"
  })
    .done(function(data) {
      //success
      $.each(data.items, function(index, item) {
        //console.log(item);
        $("<img>")
          .attr("src", item.media.m)
          .appendTo("#flickr");
        if (index == 14) {
          return false;
        }
      });
    })
    .fail(function() {
      alert("Ajax call failed");
    });
});
