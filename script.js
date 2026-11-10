(function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  var form = document.getElementById('contact');
  var status = document.getElementById('status');
  var button = form.querySelector('button');

  function show(msg, kind) {
    status.textContent = msg;
    status.className = kind || '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      show('Please fill in your name, a valid email, and a message.', 'err');
      form.reportValidity();
      return;
    }
    if (form.botcheck.checked) return; // silently drop bots

    button.disabled = true;
    show('Sending…');

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          form.reset();
          show('Thanks! Your inquiry was sent. We’ll be in touch soon.', 'ok');
        } else {
          show('Sorry, something went wrong. Please try again.', 'err');
        }
      })
      .catch(function () {
        show('Network error. Please try again in a moment.', 'err');
      })
      .finally(function () { button.disabled = false; });
  });
})();
