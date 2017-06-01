$(function() {
  var buildSearchedUserHTML = function(user) {
    var html = '<div class="chat-group-user clearfix">' +
      '<p class="chat-group-user__name">' +
      user.name +
      '</p>' +
      '<a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id="' + user.id + '" data-user-name="' + user.name + '">追加' +
      '</a>' +
      '</div>';
    return html;
  };

  var buildAddUserHTML = function(id, name) {
    var html = '<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-' + id +  '">' +
      '<input type="hidden" name="group[user_ids][]" value="' + id + '">' +
      '<p class="chat-group-user__name">' +
      name +
      '</p>' +
      '<a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="' + id + '">削除' +
      '</a>' +
      '</div>';
      return html;
  };

  var searchUsers = function(name) {
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: {name: name}
    })
    .done(function(users) {
      var insertHTML = '';
      users.forEach(function(user){
        insertHTML += buildSearchedUserHTML(user);
      });
      $('.js-user-seaerch-result').empty();
      $('.js-user-seaerch-result').append(insertHTML);
    })
    .fail(function() {
      alert('ユーザーの検索に失敗しました');
    });
  };

  $('.js-user-search-field').on('keyup', function() {
    name =$(this).val();
    searchUsers(name);
  });

  $('.js-user-seaerch-result').on('click', '.js-add-btn', function() {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    var html = buildAddUserHTML(id, name);
    $('.js-add-user').append(html);
    $(this).parent().remove();
  });

  $('.js-add-user').on('click', '.js-remove-btn', function() {
    $(this).parent('.js-chat-member').remove()
  });
});
