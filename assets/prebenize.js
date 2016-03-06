var pipeline = [ commonReplacements ];

function toDanishChars(input) {
  return input
    .replace(/ä/g, 'æ')
    .replace(/Ä/g, 'Æ')
    .replace(/ö/g, 'ø')
    .replace(/Ö/g, 'Ø');
}

function commonReplacements(input) {
  return input
    .replace(/(^|\s)([vV])ad($|\s)/g, '$1$2äd$3')
    .replace(/(^|\s)att($|\s)/g, '$1ätt$2')
    .replace(/(^|\s)([jJ])ag($|\s)/g, '$1$2ej$3')
    .replace(/(^|\s)([sS])ka($|\s)/g, '$1$2kä$3')
    .replace(/(^|\s)([iI])nte($|\s)/g, '$1$2ge$3')
    .replace(/(^|\s)([aA])lla($|\s)/g, '$1$2lle$3')
    .replace(/(^|\s)([nN])u($|\s)/g, '$1$2ou$3')
    .replace(/(^|\s)([aÄ])r($|\s)/g, '$1$2er$3')
    .replace(/(^|\s)(kaka|fika)($|\s)/gi, '$1wienerbrö$3');
}

function prebenize(input) {
  var output = input;
  
  pipeline.forEach(function(transform) {
    output = transform(output);
  });
  
  return output;
}

(function attach(event) {
  var form = document.getElementById('say-form'),
      label = document.createElement('label'),
      toggle = document.createElement('input');
      
  label.for = 'prebenize-toggle';
  label.textContent = 'Auto Lille Prebenize: ';

  toggle.type = 'checkbox';
  toggle.checked = true;
  toggle.name = 'prebenize-toggle';

  form.appendChild(label);
  form.appendChild(toggle);

  function attachPrebenizer() {
    var message = document.getElementById('message');
    message.onkeyup = function () {
      message.value = prebenize(message.value);
    }
  }

  toggle.onchange = function activate() {
    if (toggle.checked) {
      attachPrebenizer();
    }
  }
  attachPrebenizer();
}());
