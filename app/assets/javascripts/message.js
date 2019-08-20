$(function() {

function appendMessage(msg) {
  var html = `<div class='message'>
                <div class='message__upper-info'>
                  <p class="message__upper-info__talker">${msg.name}</p>
                  <p class="message__upper-info__date">${formatDate(msg.time)}</p>
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
      $('#message_content').val('');
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({scrollTop: 999999}, 500, 'swing');
    })
    .fail(function() {
      alert('メッセージを投稿できませんでした。');
      $('.submit-btn').prop('disabled', false);
    })
  });
});