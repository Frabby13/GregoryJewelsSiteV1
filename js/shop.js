/* Cart for the three concepts. No backend: the cart is a list of piece ids kept in localStorage
   (every piece is unique, so each id appears at most once). "Richiedi l'ordine" opens a prepared email. */
(function () {
  var KEY = 'gj-cart';
  function read() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; }
  }
  function write(ids) { try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch (e) {} }
  function eur(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var catalogEl = document.getElementById('catalog');
  var catalog = {};
  try { catalog = catalogEl ? JSON.parse(catalogEl.textContent) : {}; } catch (e) {}

  // On the cart page, ignore ids that are not in the catalog.
  function ids() {
    return read().filter(function (id, i, a) { return a.indexOf(id) === i && (!catalogEl || catalog[id]); });
  }

  function badge() {
    var n = ids().length;
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = n; el.hidden = !n;
      if (el.parentElement) el.parentElement.setAttribute('aria-label', 'Carrello, ' + n + (n === 1 ? ' pezzo' : ' pezzi'));
    });
  }

  // ---- product page: add button
  document.querySelectorAll('[data-add]').forEach(function (btn) {
    var id = btn.getAttribute('data-add');
    var status = btn.parentElement.querySelector('[data-add-status]');
    function paint(justAdded) {
      var inCart = read().indexOf(id) !== -1;
      btn.disabled = inCart;
      btn.firstChild.nodeValue = inCart ? 'Nel carrello ' : 'Aggiungi al carrello ';
      if (status) status.innerHTML = inCart ? (justAdded ? 'Aggiunto. ' : '') + '<a class="link-u link-u--on" href="' + esc(btn.getAttribute('data-cart')) + '">Vai al carrello</a>' : '';
    }
    btn.addEventListener('click', function () {
      var cur = read(); if (cur.indexOf(id) === -1) cur.push(id);
      write(cur); badge(); paint(true);
    });
    paint(false);
  });

  // ---- list page: filter by collection
  var filters = document.querySelectorAll('[data-filter]');
  if (filters.length) {
    var items = document.querySelectorAll('[data-cat]');
    var live = document.querySelector('[data-filter-status]');
    filters.forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-filter'), shown = 0;
        filters.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        items.forEach(function (it) { var on = key === 'tutti' || it.getAttribute('data-cat') === key; it.hidden = !on; if (on) shown++; });
        if (live) live.textContent = shown + (shown === 1 ? ' pezzo' : ' pezzi');
      });
    });
  }

  // ---- cart page
  var page = document.querySelector('[data-cart-page]');
  if (page) {
    var list = page.querySelector('[data-cart-list]');
    var render = function () {
      var cur = ids(), total = 0;
      page.querySelector('[data-cart-empty]').hidden = cur.length > 0;
      page.querySelector('[data-cart-full]').hidden = cur.length === 0;
      list.innerHTML = cur.map(function (id) {
        var p = catalog[id]; total += p.price;
        return '<li class="cart-row" data-id="' + id + '">' +
          '<a class="frame cart-row__img" href="' + esc(p.href) + '" tabindex="-1" aria-hidden="true"><img src="' + esc(p.img) + '" width="' + p.w + '" height="' + p.h + '" alt=""></a>' +
          '<div><p class="piece__name"><a class="link-u" href="' + esc(p.href) + '">' + esc(p.name) + '</a></p>' +
          '<p class="piece__spec">' + esc(p.spec) + '</p><p class="label mt-2 opacity-70">Esemplare unico</p>' +
          '<button type="button" class="link-u label mt-3" data-remove="' + id + '" aria-label="Rimuovi ' + esc(p.name) + ' dal carrello">Rimuovi</button></div>' +
          '<p class="price cart-row__price">' + eur(p.price) + '</p></li>';
      }).join('');
      page.querySelector('[data-cart-n]').textContent = cur.length;
      page.querySelector('[data-cart-total]').textContent = eur(total);
      var lines = cur.map(function (id) { return '- ' + catalog[id].name + ' (' + eur(catalog[id].price) + ')'; });
      var body = 'Buongiorno,\n\nvorrei richiedere i seguenti pezzi:\n\n' + lines.join('\n') + '\n\nTotale indicativo: ' + eur(total) + '\n\nNome e recapito:\n';
      page.querySelector('[data-checkout]').href = 'mailto:' + page.getAttribute('data-mail') + '?subject=' + encodeURIComponent('Richiesta d’ordine') + '&body=' + encodeURIComponent(body);
      badge();
    };
    page.addEventListener('click', function (e) {
      var b = e.target.closest('[data-remove]'); if (!b) return;
      var id = b.getAttribute('data-remove'), row = b.closest('li');
      var nb = row.nextElementSibling || row.previousElementSibling;
      var nextId = nb && nb.getAttribute('data-id');
      write(read().filter(function (x) { return x !== id; })); render();
      var t = nextId ? list.querySelector('[data-remove="' + nextId + '"]') : page.querySelector('[data-cart-empty] a');
      if (t) t.focus();
    });
    render();
  }
  badge();
})();
