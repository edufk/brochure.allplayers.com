$(function() {
  // HACK: Hide the third column on the public_wadl table
  $("#public_wadl td:nth-child(3)").hide();
  $("#public_wadl th:nth-child(3)").hide();
  $("#togglePublicAPIDescription").click(function(event){
    $("#public_wadl td:nth-child(3)").toggle();
    $("#public_wadl th:nth-child(3)").toggle();
    event.preventDefault();
  });

  // Hide the "summarySeparator" extraneous table info.
  $('.summarySeparator').hide();

  // Since the api list is auto-gened - auto link to mapped help pages
  var url_doc_map = new Object;
  $('.sidebar-module ul li').each(function(index, value){
    var url = $('a' , value).attr('href');
    if (url != undefined) {
      var title = url.replace('.html', '');
      url_doc_map[title] = url;
    }
  });
  $("#public_wadl td:nth-child(1) a").each(function(index){
    var possibleURLObject = $(this);
    var possibleURL = possibleURLObject.text().substring(possibleURLObject.text().indexOf("api/v1/rest") + "api/v1/rest".length);
    jQuery.each(url_doc_map, function(key, value) {
      if (possibleURL.indexOf(key) === 1) {
        // We have a match to potential doc page: rewrite the href
        possibleURLObject.attr('href', "/" + value + "#" + possibleURL);
      }
    });
  });
});

$(function() {
  $('.more-info-button').click(function(){
    $('.what-is-more-info').slideToggle();
    $(this).fadeOut('fast');
    $('html, body').animate({
      scrollTop: $('#homepage-intro').offset().top
    }, 1000);
    return false;
  });
});

// Popup images on the Knowledge Base
$(document).ready( function() {

  $('.kbImage').click( function(event) {

    // Check if the corresponding large popup image for the currently clicked image is already open.
    var visible = false;
    if ($(this).next().is(':visible')) {
      visible = true;
    }

    // Close any open large popup images.
    $('.kbImageLarge').slideUp();

    // Check if the large image was already opened and was just now closed. If so, we don't want to open it again.
    if (visible == false) {
      $(this).next().slideToggle();
    }

    // We don't want the click to be detected at the 'body' level. Stop it right here.
    event.stopImmediatePropagation();
  })

  $('body').click( function() {
    $('.kbImageLarge').slideUp();
  })
});

$(function() {
  if (!$('body').hasClass('no-header')) {
    if ($( window ).width() <= 760) {
      $('body').css('padding-top', '100px')
    }
    else {
      $('body').css('padding-top', '50px')
    }
  }
});

// Modals in HTML included using Jekyll don't work because they aren't a direct child of the body, this fixes that.
$(function() {
  $('.blockModalLink').click(
    function() {
      $('.blockModal').appendTo(document.body);
    }
  )
});
