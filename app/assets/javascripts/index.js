document.addEventListener("turbolinks:load", function() {
  
  function appendResult(user) {
    var html = `<div class="chat-group-user clearfix">
                  <input id="group_user_ids" type="hidden" value="${user.id}">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="52" data-user-name="imt">追加</a>
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
});