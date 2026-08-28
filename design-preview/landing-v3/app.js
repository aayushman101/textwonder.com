/* ===========================================================================
   TextWonder — landing v3 (conservative restyle)
   Behaviour only: theme toggle, category dropdown, tabs, and a working
   search. Nothing here animates anything — the brief was no motion.
   Section data is inlined so the page runs from file:// without a server.
   =========================================================================== */
(function () {
  'use strict';

  var SECTIONS = [{"key":"TextWonder","prefix":"Text","suffix":"Wonder","path":"/tools/","color":"#7c3aed","icon":"✍️","count":110,"tagline":"Case converters, word counters, text cleaners, diff checker, encoders, and more.","tools":[{"name":"Remove Emojis","path":"/tools/remove-emojis/"},{"name":"Remove Duplicate Lines","path":"/tools/remove-duplicate-lines/"},{"name":"Remove Extra Spaces","path":"/tools/remove-extra-spaces/"},{"name":"Title Case Converter","path":"/tools/title-case-converter/"},{"name":"Uppercase Converter","path":"/tools/uppercase-converter/"},{"name":"Lowercase Converter","path":"/tools/lowercase-converter/"},{"name":"Word Counter","path":"/tools/word-counter/"},{"name":"Character Counter","path":"/tools/character-counter/"},{"name":"Sentence Counter","path":"/tools/sentence-counter/"},{"name":"Paragraph Counter","path":"/tools/paragraph-counter/"},{"name":"Line Counter","path":"/tools/line-counter/"},{"name":"Unique Word Counter","path":"/tools/unique-word-counter/"}]},{"key":"PDFWonder","prefix":"PDF","suffix":"Wonder","path":"/pdfwonder/","color":"#f97316","icon":"📄","count":28,"tagline":"Merge, split, compress, rotate, and watermark PDFs — no upload, no signup.","tools":[{"name":"PDF Merger","path":"/pdfwonder/pdf-merger/"},{"name":"Extract PDF Pages","path":"/pdfwonder/pdf-extract-pages/"},{"name":"PDF Splitter","path":"/pdfwonder/pdf-splitter/"},{"name":"PDF to Text","path":"/pdfwonder/pdf-to-text/"},{"name":"Text to PDF","path":"/pdfwonder/text-to-pdf/"},{"name":"PDF Page Rotator","path":"/pdfwonder/pdf-rotate-pages/"},{"name":"PDF Page Remover","path":"/pdfwonder/pdf-remove-pages/"},{"name":"PDF Watermark","path":"/pdfwonder/pdf-watermark/"},{"name":"PDF Metadata Viewer","path":"/pdfwonder/pdf-metadata-viewer/"},{"name":"PDF Page Reorder","path":"/pdfwonder/pdf-reorder-pages/"},{"name":"PDF Compressor","path":"/pdfwonder/pdf-compress/"},{"name":"PDF to JPG","path":"/pdfwonder/pdf-to-jpg/"}]},{"key":"DocWonder","prefix":"Doc","suffix":"Wonder","path":"/docwonder/","color":"#0d9488","icon":"📁","count":7,"tagline":"Rent receipts, salary slips, experience and relieving letters, NOCs, and proforma invoices.","tools":[{"name":"Rent Receipt Generator","path":"/tools/rent-receipt-generator/"},{"name":"Salary Slip Generator","path":"/tools/salary-slip-generator/"},{"name":"Leave Application Generator","path":"/tools/leave-application-generator/"},{"name":"NOC Generator","path":"/tools/noc-generator/"},{"name":"Experience Letter Generator","path":"/tools/experience-letter-generator/"},{"name":"Relieving Letter Generator","path":"/tools/relieving-letter-generator/"},{"name":"Proforma Invoice Generator","path":"/tools/proforma-invoice-generator/"}]},{"key":"ImageWonder","prefix":"Image","suffix":"Wonder","path":"/imagewonder/","color":"#f43f5e","icon":"🖼️","count":17,"tagline":"Resize, compress, convert, crop, watermark, and analyse images — all in your browser.","tools":[{"name":"Image Resizer","path":"/imagewonder/image-resizer/"},{"name":"Image Compressor","path":"/imagewonder/image-compressor/"},{"name":"Image Format Converter","path":"/imagewonder/image-converter/"},{"name":"Image Cropper","path":"/imagewonder/image-cropper/"},{"name":"Image to Base64","path":"/imagewonder/image-to-base64/"},{"name":"Base64 to Image","path":"/imagewonder/base64-to-image/"},{"name":"Image Color Picker","path":"/imagewonder/image-color-picker/"},{"name":"Image Rotate & Flip","path":"/imagewonder/image-rotate-flip/"},{"name":"Image Watermark","path":"/imagewonder/image-watermark/"},{"name":"Image Metadata Viewer","path":"/imagewonder/image-metadata/"},{"name":"Image to PDF","path":"/imagewonder/image-to-pdf/"},{"name":"Image Brightness & Contrast","path":"/imagewonder/image-brightness/"}]},{"key":"DevWonder","prefix":"Dev","suffix":"Wonder","path":"/devwonder/","color":"#06b6d4","icon":"🛠️","count":17,"tagline":"JSON formatter, regex tester, JWT decoder, hash generator, UUID, cron parser — all in browser.","tools":[{"name":"JSON Formatter","path":"/devwonder/json-formatter/"},{"name":"JWT Decoder","path":"/devwonder/jwt-decoder/"},{"name":"Regex Tester","path":"/devwonder/regex-tester/"},{"name":"Unix Timestamp Converter","path":"/devwonder/unix-timestamp/"},{"name":"Hash Generator","path":"/devwonder/hash-generator/"},{"name":"UUID Generator","path":"/devwonder/uuid-generator/"},{"name":"Color Converter","path":"/devwonder/color-converter/"},{"name":"Number Base Converter","path":"/devwonder/number-base-converter/"},{"name":"Cron Expression Parser","path":"/devwonder/cron-parser/"},{"name":"URL Parser","path":"/devwonder/url-parser/"},{"name":"HTML Formatter","path":"/devwonder/html-formatter/"},{"name":"Markdown Previewer","path":"/devwonder/markdown-previewer/"}]},{"key":"StudentWonder","prefix":"Student","suffix":"Wonder","path":"/student/","color":"#3b82f6","icon":"🎓","count":8,"tagline":"CGPA, GPA, attendance tracker, exam countdown, Pomodoro timer — built for students.","tools":[{"name":"CGPA Calculator","path":"/student/cgpa-calculator/"},{"name":"GPA Calculator","path":"/student/gpa-calculator/"},{"name":"Attendance Calculator","path":"/student/attendance-calculator/"},{"name":"Marks to Percentage Calculator","path":"/student/marks-percentage-calculator/"},{"name":"Exam Countdown","path":"/student/exam-countdown/"},{"name":"Study Planner","path":"/student/study-planner/"},{"name":"Pomodoro Timer","path":"/student/pomodoro-timer/"},{"name":"GPA Goal Calculator","path":"/student/gpa-goal-calculator/"}]},{"key":"CalcWonder","prefix":"Calc","suffix":"Wonder","path":"/calc/","color":"#10b981","icon":"🧮","count":15,"tagline":"EMI, SIP, GST, compound interest, discount, percentage — all financial calculators.","tools":[{"name":"Age Calculator","path":"/calc/age-calculator/"},{"name":"Percentage Calculator","path":"/calc/percentage-calculator/"},{"name":"EMI Calculator","path":"/calc/emi-calculator/"},{"name":"SIP Calculator","path":"/calc/sip-calculator/"},{"name":"Compound Interest Calculator","path":"/calc/compound-interest-calculator/"},{"name":"Simple Interest Calculator","path":"/calc/simple-interest-calculator/"},{"name":"GST Calculator","path":"/calc/gst-calculator/"},{"name":"FD Calculator","path":"/calc/fd-calculator/"},{"name":"PPF Calculator","path":"/calc/ppf-calculator/"},{"name":"Tip Calculator","path":"/calc/tip-calculator/"},{"name":"Discount Calculator","path":"/calc/discount-calculator/"},{"name":"Weighted Average Calculator","path":"/calc/weighted-average-calculator/"}]},{"key":"HealthWonder","prefix":"Health","suffix":"Wonder","path":"/health/","color":"#22c55e","icon":"🩺","count":8,"tagline":"BMI, BMR, calorie calculator, body fat, macro calculator, water intake — free health tools.","tools":[{"name":"BMI Calculator","path":"/health/bmi-calculator/"},{"name":"BMR Calculator","path":"/health/bmr-calculator/"},{"name":"Daily Calorie Calculator","path":"/health/calorie-calculator/"},{"name":"Ideal Weight Calculator","path":"/health/ideal-weight-calculator/"},{"name":"Body Fat Calculator","path":"/health/body-fat-calculator/"},{"name":"Water Intake Calculator","path":"/health/water-intake-calculator/"},{"name":"Protein Intake Calculator","path":"/health/protein-intake-calculator/"},{"name":"Macro Calculator","path":"/health/macro-calculator/"}]},{"key":"ColorWonder","prefix":"Color","suffix":"Wonder","path":"/color/","color":"#ec4899","icon":"🎨","count":8,"tagline":"HEX/RGB/HSL converter, contrast checker, gradient builder, palette generator — for designers.","tools":[{"name":"HEX ↔ RGB ↔ HSL Converter","path":"/color/hex-rgb-converter/"},{"name":"Contrast Ratio Checker","path":"/color/contrast-checker/"},{"name":"CSS Gradient Generator","path":"/color/gradient-generator/"},{"name":"Color Palette Generator","path":"/color/color-palette-generator/"},{"name":"Tint & Shade Generator","path":"/color/tint-shade-generator/"},{"name":"CSS Shadow Generator","path":"/color/shadow-generator/"},{"name":"Color Mixer","path":"/color/color-mixer/"},{"name":"Random Color Generator","path":"/color/random-color-generator/"}]},{"key":"DataWonder","prefix":"Data","suffix":"Wonder","path":"/data/","color":"#f59e0b","icon":"💾","count":8,"tagline":"CSV↔JSON, JSON↔YAML, XML→JSON, TSV↔CSV converters and data formatters.","tools":[{"name":"CSV to JSON Converter","path":"/data/csv-to-json/"},{"name":"JSON to CSV Converter","path":"/data/json-to-csv/"},{"name":"JSON to YAML Converter","path":"/data/json-to-yaml/"},{"name":"YAML to JSON Converter","path":"/data/yaml-to-json/"},{"name":"TSV ↔ CSV Converter","path":"/data/tsv-to-csv/"},{"name":"CSV to HTML Table","path":"/data/csv-to-table/"},{"name":"Number Formatter","path":"/data/number-formatter/"},{"name":"XML to JSON Converter","path":"/data/xml-to-json/"}]},{"key":"UnitWonder","prefix":"Unit","suffix":"Wonder","path":"/unit/","color":"#6366f1","icon":"📐","count":8,"tagline":"Length, weight, temperature, speed, volume, time, area, data — instant unit conversions.","tools":[{"name":"Length Converter","path":"/unit/length-converter/"},{"name":"Weight Converter","path":"/unit/weight-converter/"},{"name":"Temperature Converter","path":"/unit/temperature-converter/"},{"name":"Digital Storage Converter","path":"/unit/digital-storage-converter/"},{"name":"Area Converter","path":"/unit/area-converter/"},{"name":"Speed Converter","path":"/unit/speed-converter/"},{"name":"Time Converter","path":"/unit/time-converter/"},{"name":"Volume Converter","path":"/unit/volume-converter/"}]}];

  var $ = function (id) { return document.getElementById(id); };
  var el = function (tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };

  /* ── theme ───────────────────────────────────────────────────────────── */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('tw-preview-theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) { /* private mode — light stays */ }

  $('themeBtn').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('tw-preview-theme', next); } catch (e) {}
  });

  /* ── category grid ───────────────────────────────────────────────────── */
  var grid = $('catGrid');
  SECTIONS.forEach(function (s) {
    var a = el('a', 'cat');
    a.href = s.path;
    a.style.setProperty('--c', s.color);

    var top = el('div', 'cat-top');
    top.appendChild(el('span', 'cat-icon', s.icon));
    top.appendChild(el('span', 'cat-n', String(s.count)));
    a.appendChild(top);

    var h = el('h3');
    h.appendChild(document.createTextNode(s.prefix));
    h.appendChild(el('span', null, s.suffix));
    a.appendChild(h);

    a.appendChild(el('p', null, s.tagline));
    a.appendChild(el('span', 'cat-go', s.count + ' tools →'));
    grid.appendChild(a);
  });

  /* ── header dropdown ─────────────────────────────────────────────────── */
  var ddBtn = $('ddBtn');
  var ddMenu = $('ddMenu');
  SECTIONS.forEach(function (s) {
    var a = el('a');
    a.href = s.path;
    var sw = el('span', 'sw');
    sw.style.background = s.color;
    a.appendChild(sw);
    a.appendChild(document.createTextNode(s.key));
    a.appendChild(el('span', 'n', String(s.count)));
    ddMenu.appendChild(a);
  });

  var closeDd = function () { ddMenu.hidden = true; ddBtn.setAttribute('aria-expanded', 'false'); };
  ddBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = ddMenu.hidden;
    ddMenu.hidden = !open;
    ddBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', function (e) {
    if (!ddMenu.hidden && !ddMenu.contains(e.target)) closeDd();
  });

  /* ── tabs + panel ────────────────────────────────────────────────────── */
  var tabsEl = $('tabs');
  var panelEl = $('panel');
  var expanded = false;

  var renderPanel = function (s) {
    panelEl.innerHTML = '';
    panelEl.style.setProperty('--c', s.color);

    var head = el('div', 'panel-head');
    var h = el('h3');
    h.appendChild(document.createTextNode(s.prefix));
    h.appendChild(el('span', null, s.suffix));
    head.appendChild(h);
    head.appendChild(el('span', 'panel-pill', s.count + ' tools'));

    var go = el('a', 'btn', 'Open ' + s.key + ' →');
    go.href = s.path;
    head.appendChild(go);
    head.appendChild(el('p', 'panel-tag', s.tagline));
    panelEl.appendChild(head);

    var shown = expanded ? s.tools : s.tools.slice(0, 6);
    var tg = el('div', 'tool-grid');
    shown.forEach(function (t) {
      var a = el('a', 'tool');
      a.href = t.path;
      a.appendChild(el('b', null, t.name));
      a.appendChild(el('span', 'go', 'OPEN →'));
      tg.appendChild(a);
    });
    panelEl.appendChild(tg);

    if (s.tools.length > 6) {
      var wrap = el('div', 'panel-more');
      var btn = el('button', 'btn btn-ghost', expanded ? 'Show fewer' : 'Show ' + (s.tools.length - 6) + ' more');
      btn.type = 'button';
      btn.addEventListener('click', function () { expanded = !expanded; renderPanel(s); });
      wrap.appendChild(btn);
      panelEl.appendChild(wrap);
    }
  };

  var select = function (i) {
    expanded = false;
    Array.prototype.forEach.call(tabsEl.children, function (t, j) {
      t.setAttribute('aria-selected', String(i === j));
    });
    renderPanel(SECTIONS[i]);
  };

  SECTIONS.forEach(function (s, i) {
    var b = el('button', 'tab');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', 'false');
    b.style.setProperty('--c', s.color);
    var sw = el('span', 'sw');
    b.appendChild(sw);
    b.appendChild(document.createTextNode(s.key));
    b.addEventListener('click', function () { select(i); });
    tabsEl.appendChild(b);
  });
  select(0);

  /* ── footer suite lists ──────────────────────────────────────────────── */
  var fill = function (ul, list) {
    list.forEach(function (s) {
      var li = el('li');
      var a = el('a');
      a.href = s.path;
      var sw = el('span', 'sw');
      sw.style.background = s.color;
      a.appendChild(sw);
      a.appendChild(document.createTextNode(s.key));
      li.appendChild(a);
      ul.appendChild(li);
    });
  };
  fill($('footA'), SECTIONS.slice(0, 5));
  fill($('footB'), SECTIONS.slice(5));

  /* ── search ──────────────────────────────────────────────────────────── */
  var INDEX = [];
  SECTIONS.forEach(function (s) {
    s.tools.forEach(function (t) {
      INDEX.push({ name: t.name, path: t.path, sec: s.key, color: s.color, hay: t.name.toLowerCase() });
    });
    INDEX.push({ name: s.key, path: s.path, sec: 'Section', color: s.color, hay: s.key.toLowerCase() + ' ' + s.tagline.toLowerCase() });
  });

  var input = $('q');
  var results = $('results');

  var render = function (list, q) {
    results.innerHTML = '';
    if (!q) { results.hidden = true; return; }
    if (!list.length) {
      var li = el('li');
      li.appendChild(el('div', 'empty', 'No tool matches “' + q + '”.'));
      results.appendChild(li);
      results.hidden = false;
      return;
    }
    list.slice(0, 8).forEach(function (r) {
      var li = el('li');
      var a = el('a');
      a.href = r.path;
      var sw = el('span', 'sw');
      sw.style.background = r.color;
      a.appendChild(sw);
      a.appendChild(document.createTextNode(r.name));
      a.appendChild(el('span', 'sec', r.sec));
      li.appendChild(a);
      results.appendChild(li);
    });
    results.hidden = false;
  };

  var search = function (q) {
    var s = q.trim().toLowerCase();
    if (!s) return [];
    var starts = [], has = [];
    INDEX.forEach(function (r) {
      var i = r.hay.indexOf(s);
      if (i === 0) starts.push(r);
      else if (i > 0) has.push(r);
    });
    return starts.concat(has);
  };

  input.addEventListener('input', function () { render(search(input.value), input.value.trim()); });
  input.addEventListener('focus', function () { if (input.value.trim()) render(search(input.value), input.value.trim()); });

  document.addEventListener('click', function (e) {
    if (!$('searchBox').contains(e.target) && !results.contains(e.target)) results.hidden = true;
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== input) { e.preventDefault(); input.focus(); }
    if (e.key === 'Escape') { results.hidden = true; input.blur(); closeDd(); }
  });

  Array.prototype.forEach.call($('chips').querySelectorAll('button'), function (b) {
    b.addEventListener('click', function () {
      input.value = b.getAttribute('data-q');
      input.focus();
      render(search(input.value), input.value);
    });
  });
})();
