$(function() {
  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      var html = '<div class="message">' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.content +
          '</p>' +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    } else if (message.content) {
      var html = '<div class="message">' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.content +
          '</p>' +
        '</div>' +
      '</div>'
    } else if (message.image.url) {
      var html = '<div class="message">' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    };
    return html;
  };

  var reloadMessages = function() {
    $.ajax({
      url: location.href,
      type: 'GET',
      dataType: 'json'
    })
    .done(function(messages) {
      console.log('hoge');
      var insertHTML = '';
      messages.forEach(function(message) {
        insertHTML += buildMessageHTML(message);
      });
      var $messages = $('.js-messages');
      $messages.empty();
      $messages.append(insertHTML);
      $messages.animate({scrollTop: $messages[0].scrollHeight}, 2000);
    })
    .fail(function() {
      console.log('error');
    });
  };

  $('.js-form').unbind('submit').bind('submit', function(e) {
    e.preventDefault();
    var $form = $(this);
    var formData = new FormData(this);
    $.ajax({
      url: './messages',
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var insertHTML = buildMessageHTML(data);
      $messages = $('.js-messages');
      $messages.append(insertHTML);
      $form[0].reset();
      $messages.animate({scrollTop: $messages[0].scrollHeight}, 2000);
    })
    .fail(function() {
      alert('エラーのためメッセージの送信ができませんでした。');
    })
    .always(function() {
      $('.form__submit').prop('disabled', false);
    });
  });

  setInterval(reloadMessages, 7000);
});
