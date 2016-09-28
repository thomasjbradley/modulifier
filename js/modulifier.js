(function ($, $$) {
  'use strict';

  var hash = window.location.hash.replace(/#/, '');
  var hashBits;

  var $controls = $('#controls');
  var $allChecks = $controls.querySelectorAll('input[type="checkbox"]');
  var $output = $('#output');

  var view = function view (name, vals) {
    return prepareTemplate(name, vals);
  };

  var getCheckedModules = function () {
    return $controls.querySelectorAll('input[type="checkbox"]:checked');
  };

  var findModuleCode = function (moduleChecks) {
    var output = [], hash = [];

    Array.prototype.forEach.call(moduleChecks, function (elem) {
      output.push(view(elem.value).trim());
      hash.push(elem.value.replace('css-', ''));
    });

    return {
      css: output,
      hash: hash
    };
  };

  var buildOutput = function (output) {
    var build = window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + output.hash.join(';');

    output.css.unshift(view('css-base', { build: build }).trim());
    $output.innerHTML = output.css.join('\n\n');

    window.location.hash = output.hash.join(';');
  };

  'keyup change submit'.split(' ').forEach(function (singleEvent) {
    $controls.addEventListener(singleEvent, function (e) {
      e.preventDefault();
      buildOutput(findModuleCode(getCheckedModules()));
    });
  });

  if (hash) {
    Array.prototype.forEach.call($allChecks, function (elem) {
      elem.checked = false;
    });

    hashBits = hash.split(';');

    hashBits.forEach(function (item) {
      if (item) $('#' + item).checked = true;
    });
  }

  buildOutput(findModuleCode(getCheckedModules()));

}($, $$));
