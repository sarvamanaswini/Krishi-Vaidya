const S = { diag: null, risk: null, forecast: null, logId: null, flagged: false };
const $ = id => document.getElementById(id);
const post = (url, body) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json());
const VOICE = { en: 'en-IN', hi: 'hi-IN', te: 'te-IN' };

function stage(i) {
  document.querySelectorAll('#pipeline li').forEach((li, k) => { li.className = k < i ? 'done' : k === i ? 'active' : ''; });
}
function speak(text) {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text); u.lang = VOICE[LANG];
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}

// ---- Rendering (re-run whenever the language changes) ----
function renderAll() {
  if (!S.diag) return;
  const d = S.diag;
  $('diagnosis-card').hidden = false;
  $('diagnosis-name').textContent = diseaseName(d.disease_id);
  $('diagnosis-meta').textContent = (d.pathogen ? d.pathogen + ' · ' : '') + t('sev_' + d.severity);
  $('confidence-value').textContent = Math.round(d.confidence * 100) + '%';
  $('diagnosis-bar').className = 'diagnosis-bar sev-' + d.severity;

  if (S.risk) {
    const r = S.risk;
    $('risk-card').hidden = false;
    $('risk-fill').style.width = r.risk_score + '%';
    $('risk-fill').className = 'risk-fill ' + r.risk_label;
    $('risk-text').textContent = t('riskline', { l: t('risk_' + r.risk_label), s: r.risk_score, h: r.hits, n: r.total });
    $('forecast-row').innerHTML = S.forecast.map(f =>
      `<div class="forecast-day"><span class="fd-date">${f.date.slice(5)}</span>${f.temp_c}°C · ${f.humidity}%${f.rain_expected ? ' 🌧️' : ''}</div>`).join('');

    const a = advice(d.disease_id), healthy = d.disease_id === 'healthy';
    $('recommend-card').hidden = false;
    $('urgency-text').textContent = healthy ? t('urg_none') : t(r.risk_label === 'high' ? 'urg_high' : 'urg_mid');
    $('steps-list').innerHTML = a ? a.s.map(x => `<li>${x}</li>`).join('') : '';
    $('dosage-line').textContent = a ? `${t('dose')}: ${a.d}` : '';
    $('organic-line').textContent = a ? `${t('org')}: ${a.o}` : '';
    const ref = healthy ? null : d.confidence < 0.75 ? 'ref_low' : r.risk_label === 'high' ? 'ref_high' : null;
    $('referral-line').hidden = !ref; if (ref) $('referral-line').textContent = t(ref);
    $('expert-btn').hidden = healthy;
    $('expert-status').textContent = S.flagged ? t('flagged') : '';
    $('chat-card').hidden = false; $('again-btn').hidden = false;
  }
}
window.onLangChange = renderAll;

function clearResults() {
  S.diag = S.risk = S.forecast = null; S.logId = null; S.flagged = false;
  $('chat-thread').innerHTML = ''; $('chat-input').value = ''; $('expert-status').textContent = '';
  ['diagnosis-card', 'risk-card', 'recommend-card', 'chat-card', 'again-btn'].forEach(i => $(i).hidden = true);
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}
function newDiagnosis() {
  clearResults(); $('photo-input').value = '';
  $('dropzone').classList.remove('has-image'); $('dropzone-text').textContent = t('up');
  stage(0); $('diagnose').scrollIntoView({ behavior: 'smooth' });
}
$('again-btn').addEventListener('click', newDiagnosis);

// ---- Pipeline ----
$('photo-input').addEventListener('change', async () => {
  const file = $('photo-input').files[0]; if (!file) return;
  clearResults();
  $('dropzone').classList.add('has-image'); $('dropzone-text').textContent = t('busy'); stage(1);

  const fd = new FormData(); fd.append('photo', file); fd.append('crop', $('crop-input').value);
  S.diag = await fetch('/api/diagnose', { method: 'POST', body: fd }).then(r => r.json());
  $('dropzone-text').textContent = file.name; renderAll(); stage(2);

  const location = $('location-input').value || 'Unknown';
  const tv = $('sensor-temp').value, hv = $('sensor-humidity').value;
  const sensor = (tv || hv) ? { temp_c: tv ? +tv : null, humidity: hv ? +hv : null } : null;
  const w = await post('/api/weather', { location, sensor }); S.forecast = w.forecast; stage(3);
  S.risk = await post('/api/risk', { disease_id: S.diag.disease_id, forecast: w.forecast }); stage(4);
  renderAll(); stage(5);

  const e = await post('/api/log', { ...S.diag, location }); S.logId = e.id;
  addBot(S.diag.disease_id === 'healthy' ? t('healthy_msg') : t('greet'), false);
  $('photo-input').value = '';
});

$('expert-btn').addEventListener('click', async () => {
  if (!S.logId) return;
  await post(`/api/log/${S.logId}/confirm`, { status: 'pending_officer_review' });
  S.flagged = true; renderAll();
});

// ---- Chat (answers built locally from the translation tables so it always matches the chosen language) ----
function addMsg(text, who) {
  const d = document.createElement('div'); d.className = 'chat-msg ' + who; d.textContent = text;
  $('chat-thread').appendChild(d); $('chat-thread').scrollTop = 1e6;
}
function addBot(text, say = true) { addMsg(text, 'bot'); if (say) speak(text); }
function answer(q) {
  q = q.toLowerCase(); const a = advice(S.diag.disease_id);
  if (S.diag.disease_id === 'healthy') return t('healthy_msg');
  if (/dose|dosage|मात्रा|మోతాదు/.test(q)) return `${t('dose')}: ${a.d}`;
  if (/organic|जैविक|సేంద్రీయ/.test(q)) return `${t('org')}: ${a.o}`;
  if (/weather|risk|मौसम|जोखिम|వాతావరణ|ప్రమాద/.test(q)) return t('riskline', { l: t('risk_' + S.risk.risk_label), s: S.risk.risk_score, h: S.risk.hits, n: S.risk.total });
  if (/what|do|step|treat|करें|उपाय|उपचार|చేయ|చర్య|చికిత్స/.test(q)) return a.s.join('. ');
  return t('fb');
}
function ask(q) { if (!S.diag || !S.risk) return addMsg(t('need_diag'), 'bot'); addMsg(q, 'user'); addBot(answer(q)); }
$('chat-send').addEventListener('click', () => { const i = $('chat-input'); if (i.value.trim()) { ask(i.value.trim()); i.value = ''; } });
$('chat-input').addEventListener('keydown', e => { if (e.key === 'Enter') $('chat-send').click(); });
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null;
$('chat-mic').addEventListener('click', () => {
  const btn = $('chat-mic');
  if (!SR) return addMsg(t('mic_unsupported'), 'bot');
  if (rec) { rec.stop(); return; }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  rec = new SR(); rec.lang = VOICE[LANG]; rec.interimResults = false; rec.maxAlternatives = 1;
  rec.onstart = () => { btn.classList.add('listening'); btn.textContent = '⏺'; };
  rec.onresult = e => ask(e.results[0][0].transcript);
  rec.onerror = e => {
    const key = { 'not-allowed': 'mic_denied', 'service-not-allowed': 'mic_denied', 'no-speech': 'mic_nospeech',
                  'language-not-supported': 'mic_lang', 'audio-capture': 'mic_none', 'network': 'mic_net' }[e.error] || 'mic_net';
    addMsg(t(key) + ' [' + e.error + ']', 'bot');
  };
  rec.onend = () => { btn.classList.remove('listening'); btn.textContent = '🎤'; rec = null; };
  try { rec.start(); } catch (err) { rec = null; addMsg(err.message, 'bot'); }
});

applyI18n(); stage(0);
