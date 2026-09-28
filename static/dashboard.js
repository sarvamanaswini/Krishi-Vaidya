const KNOWN = {guntur:[16.3067,80.4365],hyderabad:[17.385,78.4867],vijayawada:[16.5062,80.648],warangal:[17.9689,79.5941],delhi:[28.6139,77.209]};
function coordFor(loc){const k=(loc||'').toLowerCase().trim();if(KNOWN[k])return KNOWN[k];const s=[...k].reduce((a,c)=>a+c.charCodeAt(0),0);return[17.385+((s%10)-5)*.05,78.4867+((s%7)-3)*.05];}
let DATA=null,map=null,layer=null;
function render(){
  if(!DATA)return;
  document.getElementById('stat-total').textContent=DATA.total;
  document.getElementById('stat-pending').textContent=DATA.pending_review;
  const ids={};DATA.entries.forEach(e=>ids[e.disease_id]=(ids[e.disease_id]||0)+1);
  document.getElementById('stat-diseases').textContent=Object.keys(ids).length;
  document.getElementById('disease-breakdown').innerHTML=Object.keys(ids).length
    ?Object.entries(ids).map(([id,n])=>`<div class="disease-row"><span>${diseaseName(id)}</span><b>${n}</b></div>`).join(''):`<p class="rec-line">${t('none_yet')}</p>`;
  document.getElementById('report-body').innerHTML=DATA.entries.map(e=>`<tr><td>${e.timestamp.replace('T',' ')}</td><td>${e.location}</td><td>${diseaseName(e.disease_id)}</td><td>${Math.round(e.confidence*100)}%</td><td>${e.expert_status}</td></tr>`).join('');
  if(!map){map=L.map('map').setView([17.385,78.4867],6);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors'}).addTo(map);}
  if(layer)layer.remove();layer=L.layerGroup().addTo(map);
  DATA.entries.forEach(e=>{const[la,lo]=e.lat&&e.lon?[e.lat,e.lon]:coordFor(e.location);const c=e.severity==='severe'?'#B3452C':e.severity==='none'?'#2F5233':'#C98A2B';
    L.circleMarker([la,lo],{radius:8,color:c,fillColor:c,fillOpacity:.7}).bindPopup(`<b>${diseaseName(e.disease_id)}</b><br>${e.location}`).addTo(layer);});
}
window.onLangChange=render;applyI18n();
fetch('/api/dashboard-data').then(r=>r.json()).then(d=>{DATA=d;render();});
