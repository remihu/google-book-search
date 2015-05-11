$(function(){


	// form submission listener
	$('#book_search').submit(function(event) {

		event.preventDefault();

		// collect the user search term
		var search_term = $('#search_term').val();

		// construct the API url including search term
		var search_url = 'https://www.googleapis.com/books/v1/volumes?q='+search_term;

		// make an AJAX GET request to Google Books API
		$.ajax({
			url: search_url,
			type: "GET",
			success: function(data) {
				$('#results').empty();

				$.each(data.items, function(i, book) {
					
					// get the book thumbnail
					if (book.volumeInfo.imageLinks.thumbnail) {
						var thumb = book.volumeInfo.imageLinks.thumbnail;
					} else {
						var thumb = "images/book-placeholder.png";
					}

					// get the title
					if (book.volumeInfo.title) {
						var title = book.volumeInfo.title;
					} else {
						var title = "Unknown";
					}

					// get the author
					if (book.volumeInfo.authors) {
						var auth = book.volumeInfo.authors[0];
					} else {
						var auth = "Unknown";
					}

					// link to the books
					if (book.volumeInfo.previewLink) {
						var book_url = book.volumeInfo.previewLink;
					} else {
						var book_url = "http://google.com/404";
					}

					var ele = '<div class="book">'+
											'<a target="_blank" href="'+book_url+'">'+
												'<img src="'+thumb+'" alt="'+title+'">'+
												'<p>'+title+'<br>'+auth+'</p>'+
											'</a>'+
										'</div>';

					// append div#results with books
					$('#results').append(ele);

				});
			},
			error: function(jqHXR, status, error) {
				console.log(jqHXR, status, error);
			}
			
		}); // ajax
		


	}); // form submit


		// API NOTES:
		// https://www.googleapis.com/books/v1/volumes?q=cat

}); // doc ready