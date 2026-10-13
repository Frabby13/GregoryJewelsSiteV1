/* Contact form: inline validation in Italian, a focusable error summary, and an honest submit.
   There is no backend: a valid form opens the visitor's mail client with the message prepared.
   Without JS the form falls back to a plain mailto: submit. */
(function () {
  var form = document.querySelector('form[data-contact]');
  if (!form) return;
  form.noValidate = true;

  var summary = form.querySelector('[data-summary]');
  var list = form.querySelector('[data-summary-list]');
  var status = form.querySelector('[data-status]');
  var TO = (form.getAttribute('action') || '').replace('mailto:', '');

  function message(el) {
    var v = el.validity;
    if (v.valueMissing) {
      if (el.type === 'checkbox') return 'Conferma di aver letto l’informativa sulla privacy.';
      if (el.type === 'email') return 'Scrivi il tuo indirizzo email.';
      if (el.tagName === 'SELECT') return 'Scegli un argomento dall’elenco.';
      return 'Compila questo campo.';
    }
    if (v.typeMismatch) return 'L’indirizzo email non sembra completo: controlla che contenga una @ e un dominio.';
    if (v.tooShort) return 'Scrivi almeno ' + el.minLength + ' caratteri.';
    return 'Controlla questo campo.';
  }
  function label(el) {
    var l = form.querySelector('label[for="' + el.id + '"]');
    return l ? l.textContent.trim() : (el.name || '');
  }
  function show(el) {
    var err = document.getElementById(el.id + '-err');
    var bad = !el.checkValidity();
    el.setAttribute('aria-invalid', bad ? 'true' : 'false');
    if (!err) return bad;
    err.hidden = !bad;
    err.textContent = bad ? message(el) : '';
    return bad;
  }

  var fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));
  fields.forEach(function (el) {
    el.addEventListener('blur', function () { if (el.value || el.getAttribute('aria-invalid')) show(el); });
    el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') show(el); });
    el.addEventListener('change', function () { if (el.getAttribute('aria-invalid') === 'true') show(el); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    var bad = fields.filter(show);
    if (bad.length) {
      list.textContent = '';
      bad.forEach(function (el) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + el.id;
        a.textContent = label(el) + ': ' + message(el);
        a.addEventListener('click', function (ev) { ev.preventDefault(); el.focus(); });
        li.appendChild(a);
        list.appendChild(li);
      });
      summary.hidden = false;
      summary.focus();
      return;
    }
    summary.hidden = true;
    var data = new FormData(form);
    var body = 'Nome: ' + data.get('nome') + '\nEmail: ' + data.get('email') + '\nArgomento: ' + data.get('tema') + '\n\n' + data.get('messaggio');
    var subject = 'Messaggio dal sito — ' + data.get('tema');
    window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    status.textContent = 'Abbiamo aperto il tuo programma di posta con il messaggio pronto. Il messaggio parte solo quando premi Invia da lì. Se non si è aperto nulla, scrivici a ' + TO + '.';
  });
})();
