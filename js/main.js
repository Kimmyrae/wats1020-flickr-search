// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.
	function searchImages()
{

    // Inside the `searchImages()` function, the following things should happen:

        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags){`
	var searchPhotos = function("tags");
		
	
        //
        // 2.   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
//	var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        //
        // 3.   Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
{
  tags: "jquery,javascript",
  tagmode: "any",
  format: "json"
},
        //
        // 4.   Update the display to add the images to the list with the id
        //      `#images`.
function(data) {
  $.each(data.items, function(i,item){
    $("< img/>").attr("src", item.media.m).appendTo("#flickrapi-results");
    if ( i == 10 ) return false;
  });

    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.
	onClick(button.search);

        // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target


	// Display a loading icon in our display element
	$('#feed').html('<span><img src="images/lightbox-ico-loading.gif" /></span>');

	// Request the JSON and process it
	$.ajax({
		type:'GET',
		url:"http://api.flickr.com/services/feeds/photos_public.gne",
		data:"id="+flickrid+"&lang=en-us&format=json&jsoncallback=?",
		success:function(feed) {
			// Create an empty array to store images
			var thumbs = [];

			// Loop through the items
			for(var i=0, l=feed.items.length; i < l && i < 16; ++i) 
			{
				// Manipulate the image to get thumb and medium sizes
				var img = feed.items[i].media.m.replace(
					/^(.*?)_m\.jpg$/, 
					'<a href="$1.jpg"><img src="$1_s.jpg" alt="" /></a>'
				);

				// Add the new element to the array
				thumbs.push(img);
			}

			// Display the thumbnails on the page
			$('#feed').html(thumbs.join(''));

			// A function to add a lightbox effect
			addLB();
		},
		dataType:'jsonp'
	});
}

});
