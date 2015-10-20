(function ($, $$) {
  "use strict";

  var
    hash = window.location.hash.replace(/#/, ''),
    hashBits,
    defaults = [],

    $controls = $('#controls'),

    view = function view (name, vals) {
      return prepareTemplate(name, vals);
    },

    buildOutput = function () {
      window.location.hash = buildHash.join(';');
    }
  ;

  'keyup change submit'.split(' ').forEach(function (singleEvent) {
    $controls.addEventListener(singleEvent, function (e) {
      e.preventDefault();
      buildOutput();
    });
  });

  if (hash) {
    hashBits = hash.split(';');
    defaults = [];

    hashBits.forEach(function (item) {
      defaults.push(item.split(','));
    });
  }

  defaults.forEach(function() {
    buildOutput();
  });

}($, $$));
