document.addEventListener("turbolinks:load", function() {
  
  function appendResult(user) {
    var html = `<div class="chat-group-user clearfix">
                  <input id="group_user_ids" type="hidden" value="${user.id}">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    $('#user-search-result').append(html);
  }
  
  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { search: input },
      dataType: 'json'
    })

    .done(function(users) {

      $('#user-search-result .chat-group-user').remove();
      
      if(input.length !== 0) {
        $.each(users,function(i, user){
          appendResult(user);
        })
      }

      if (input.length !== 0 && users.length == 0) {
        var html = `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">一致するユーザーは見つかりません</p>
                    </div>`
        $('#user-search-result').append(html);
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  });


  $('body').on('click', '.user-search-add', function() {
    
    if($(this).text() === '追加') {
      $(this).parent().remove();
      $(this).text('削除');
      $(this).removeClass('chat-group-user__btn--add');
      $(this).addClass('chat-group-user__btn--remove');
      $(this).parent().children('input').attr('name','group[user_ids][]');
      $('.js-add-user').append($(this).parent());

    } else {
      $(this).parent().remove();
      $(this).text('追加');
      $(this).removeClass('chat-group-user__btn--remove');
      $(this).addClass('chat-group-user__btn--add');
      $(this).parent().children('input').removeAttr('name');
      $('#user-search-result').append($(this).parent());
    }
  })
});