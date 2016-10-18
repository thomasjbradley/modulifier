(function ($, $$) {
  'use strict';

  var hash = window.location.hash.replace(/#/, '');
  var hashBits;

  var $controls = $('#controls');
  var $allChecks = $controls.querySelectorAll('input[type="checkbox"]');
  var $output = $('#output');
  var $defaults = [];

  var findDefaults = function () {
    [].forEach.call($allChecks, function (check) {
      if (check.checked) $defaults.push(check);
    });
  };

  var view = function view (name, vals) {
    return prepareTemplate(name, vals);
  };

  var getCheckedModules = function () {
    return $controls.querySelectorAll('input[type="checkbox"]:checked');
  };

  var findModuleCode = function (moduleChecks) {
    var output = [], hash = [];

    [].forEach.call(moduleChecks, function (elem) {
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

  findDefaults();

  'keyup change submit'.split(' ').forEach(function (singleEvent) {
    $controls.addEventListener(singleEvent, function (e) {
      e.preventDefault();
      buildOutput(findModuleCode(getCheckedModules()));
    });
  });

  if (hash) {
    [].forEach.call($allChecks, function (elem) {
      elem.checked = false;
    });

    hashBits = hash.split(';');

    hashBits.forEach(function (item) {
      if (item) $('#' + item).checked = true;
    });
  }

  $('#select-all').addEventListener('click', function (e) {
    [].forEach.call($allChecks, function (check) {
      check.checked = true;
    });

    buildOutput(findModuleCode(getCheckedModules()));
  });

  $('#select-defaults').addEventListener('click', function (e) {
    [].forEach.call($allChecks, function (check) {
      check.checked = false;
    });

    [].forEach.call($defaults, function (check) {
      check.checked = true;
    });

    buildOutput(findModuleCode(getCheckedModules()));
  });

  buildOutput(findModuleCode(getCheckedModules()));

}($, $$));
