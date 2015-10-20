(function ($, $$) {
  "use strict";

  var $help = $('.help-dialog');

  $('.help__close').addEventListener('click', function () {
    // $help.fadeOut(200);
  });

  $('.help__open').addEventListener('click', function () {
    // $help.fadeIn(200);
  });

  $help.addEventListener('click', function () {
    // $help.fadeOut(200);
  });

  $('.help').addEventListener('click', function (e) {
    e.stopPropagation();
  });

}($, $$));
