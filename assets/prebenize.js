var pipeline = [ toDanishChars ];

function toDanishChars(input) {
  return input
    .replace(/ä/g, 'æ')
    .replace(/Ä/g, 'Æ')
    .replace(/ö/g, 'ø')
    .replace(/Ö/g, 'Ø');
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
