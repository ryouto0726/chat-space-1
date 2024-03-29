$(function() {

  function appendMessage(msg) {
    var html = `<div class='message' data-message-id="${msg.id}">
                  <div class='message__upper-info'>
                    <p class="message__upper-info__talker">${msg.name}</p>
                    <p class="message__upper-info__date">${msg.time}</p>
                  </div>
                  <div class="lower-message">
                    <p class="message__text">
                      ${msg.content}
                    </p>
                    ${ msg.image !== null ? `<img class='lower-message__image' src='${msg.image}'>` : `` }
                  </div>
                </div>`
    $('.messages').append(html)
  }

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var api_url = window.location.pathname;
    var formdata = new FormData($(this).get(0)); 

    $.ajax({
      type: 'POST',
      url: api_url,
      data: formdata,
      contentType: false,
      processData: false,
      dataType: 'json'
    })

    .done(function(message) {
      appendMessage(message);
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({scrollTop: 999999}, 500, 'swing');
    })
    .fail(function() {
      alert('メッセージを投稿できませんでした。');
      $('.submit-btn').prop('disabled', false);
    })
  });

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('message-id')
    var urlRegex = new RegExp("groups/\[0-9]{1,}/messages")
    var currentUrl = location.pathname
    
    if( urlRegex.test(currentUrl) ) {
      $.ajax({
        type: 'get',
        url: './api/messages',
        dataType: 'json',
        data: { id: last_message_id }
      })

      .done(function(messages) {
        if(messages.length !== 0) {
          messages.forEach(function (message) {
            appendMessage(message);
          });
          $('.messages').animate({scrollTop: 999999}, 500, 'swing');
        }
        $('.submit-btn').prop('disabled', false);
      })
      .fail(function() {
        console.log('error');
        $('.submit-btn').prop('disabled', false);
      });
    }
  };

  setInterval(reloadMessages, 5000);
});