(function ($, $$) {
  "use strict";

  var $help = $('.help-dialog');

  $('.help__close').addEventListener('click', function () {
    $help.setAttribute('data-state', 'hidden');
  });

  $('.help__open').addEventListener('click', function () {
    $help.setAttribute('data-state', 'visible');
  });

  $help.addEventListener('click', function () {
    $help.setAttribute('data-state', 'hidden');
  });

  $('.help').addEventListener('click', function (e) {
    e.stopPropagation();
  });

}($, $$));
