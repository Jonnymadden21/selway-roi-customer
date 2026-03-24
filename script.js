// ============================================================
// TRINITY ROI CALCULATOR — Customer-Facing Version
// Selway Machine Tool Co.
// ============================================================

// ===== MACHINE DATA =====
const MACHINES = [
  // HAAS
  { id:'mm', model:'Mini Mill', brand:'Haas', type:'VMC', axes:3, compat:['AI1','AX1'], rec:'AX1' },
  { id:'dm1', model:'DM-1', brand:'Haas', type:'VMC', axes:3, compat:['AI1','AX1'], rec:'AX1' },
  { id:'dm2', model:'DM-2', brand:'Haas', type:'VMC', axes:3, compat:['AI1','AX1'], rec:'AX1' },
  { id:'dt1', model:'DT-1', brand:'Haas', type:'Drill/Tap', axes:3, compat:['AI1','AX1'], rec:'AX1' },
  { id:'dt2', model:'DT-2', brand:'Haas', type:'Drill/Tap', axes:3, compat:['AI1','AX1'], rec:'AX1' },
  { id:'vf1', model:'VF-1', brand:'Haas', type:'VMC', axes:3, compat:['AI1','AX1','AX2'], rec:'AX2' },
  { id:'vf2', model:'VF-2', brand:'Haas', type:'VMC', axes:3, compat:['AI1','AX2','AX2D'], rec:'AX2' },
  { id:'vf2ss', model:'VF-2SS', brand:'Haas', type:'VMC', axes:3, compat:['AI1','AX2','AX2D'], rec:'AX2' },
  { id:'vf3', model:'VF-3', brand:'Haas', type:'VMC', axes:3, compat:['AI1','AX2','AX5'], rec:'AX2' },
  { id:'vf4', model:'VF-4', brand:'Haas', type:'VMC', axes:3, compat:['AI1','AX5','AX5H','AX2D'], rec:'AX5' },
  { id:'vf4ss', model:'VF-4SS', brand:'Haas', type:'VMC', axes:3, compat:['AI1','AX5','AX5H','AX2D'], rec:'AX5' },
  { id:'vf5', model:'VF-5/40', brand:'Haas', type:'VMC', axes:3, compat:['AI1','AX5H'], rec:'AX5H' },
  { id:'vf6', model:'VF-6/40', brand:'Haas', type:'VMC', axes:3, compat:['AI1','AX5H'], rec:'AX5H' },
  { id:'u350', model:'UMC-350', brand:'Haas', type:'5-Axis', axes:5, compat:['AI1','AX1','AX2'], rec:'AX1' },
  { id:'u500', model:'UMC-500', brand:'Haas', type:'5-Axis', axes:5, compat:['AI1','AX2','AX2D'], rec:'AX2' },
  { id:'u500s', model:'UMC-500SS', brand:'Haas', type:'5-Axis', axes:5, compat:['AI1','AX2','AX2D'], rec:'AX2' },
  { id:'u750', model:'UMC-750', brand:'Haas', type:'5-Axis', axes:5, compat:['AI1','AX4','AX4H','AX5','AX5H','AX2D'], rec:'AX5' },
  { id:'u750s', model:'UMC-750SS', brand:'Haas', type:'5-Axis', axes:5, compat:['AI1','AX4','AX4H','AX5','AX5H','AX2D'], rec:'AX5' },
  { id:'u1000', model:'UMC-1000', brand:'Haas', type:'5-Axis', axes:5, compat:['AI1','AX5H'], rec:'AX5H' },
  // MATSUURA
  { id:'mx330', model:'MX-330', brand:'Matsuura', type:'5-Axis', axes:5, compat:['AX2','AX4'], rec:'AX2' },
  { id:'mx420', model:'MX-420', brand:'Matsuura', type:'5-Axis', axes:5, compat:['AX2','AX4'], rec:'AX4' },
  { id:'mx520', model:'MX-520', brand:'Matsuura', type:'5-Axis', axes:5, compat:['AX4','AX5'], rec:'AX4' },
  { id:'mx850', model:'MX-850', brand:'Matsuura', type:'5-Axis', axes:5, compat:['AX4H','AX5H'], rec:'AX4H' },
  // JTEKT / TOYODA
  { id:'fv1165', model:'FV-1165', brand:'JTEKT/Toyoda', type:'VMC', axes:3, compat:['AI1','AX5','AX5H'], rec:'AX5' },
  { id:'fv1365', model:'FV-1365', brand:'JTEKT/Toyoda', type:'VMC', axes:3, compat:['AI1','AX5H'], rec:'AX5H' },
  // HWACHEON
  { id:'v660', model:'VESTA-660', brand:'Hwacheon', type:'VMC', axes:3, compat:['AI1','AX2','AX5'], rec:'AX2' },
  { id:'v1050', model:'VESTA-1050B', brand:'Hwacheon', type:'VMC', axes:3, compat:['AI1','AX5','AX5H'], rec:'AX5' },
  // SMEC
  { id:'pv83', model:'PV-8300', brand:'SMEC', type:'VMC', axes:3, compat:['AI1','AX2'], rec:'AX2' },
  // ENSHU
  { id:'je40', model:'JE40', brand:'Enshu', type:'HMC', axes:4, compat:['AX4'], rec:'AX4' },
  // COMPETITOR
  { id:'dn45', model:'DNM-4500', brand:'Doosan', type:'VMC', axes:3, compat:['AI1','AX2','AX5'], rec:'AX2' },
  { id:'dn57', model:'DNM-5700', brand:'Doosan', type:'VMC', axes:3, compat:['AI1','AX5','AX5H'], rec:'AX5' },
  { id:'nxv', model:'NXV1020A', brand:'YCM', type:'VMC', axes:3, compat:['AI1','AX2'], rec:'AX2' },
  { id:'robo', model:'Robodrill', brand:'Fanuc', type:'VMC', axes:3, compat:['AI1','AX1'], rec:'AX1' },
  { id:'s700', model:'Speedio S700', brand:'Brother', type:'VMC', axes:3, compat:['AI1','AX1'], rec:'AX1' },
];

// ===== TRINITY MODEL DATA =====
const TRINITY = {
  AI1: { id:'AI1', name:'Trinity AI-1', sub:'Automated Part Loader', price:120000, pallets:'Continuous', maxPart:'Various', weight:'Various', hours:0, machines:1, type:'Part Loader', isLoader:true },
  AX1: { id:'AX1', name:'Trinity AX1', sub:'Compact High-Speed', price:136000, pallets:'12-18', maxPart:'12in x 9in H', weight:'35 lbs', hours:7, machines:1, type:'Pallet System', isLoader:false },
  AX2: { id:'AX2', name:'Trinity AX2', sub:'Medium VMC', price:180000, pallets:'16-24', maxPart:'16in x 9in H', weight:'55 lbs', hours:9, machines:1, type:'Pallet System', isLoader:false },
  AX2D: { id:'AX2D', name:'Trinity AX2 Duo', sub:'Dual Machine', price:210000, pallets:'16-24', maxPart:'16in x 9in H (x2)', weight:'55 lbs/stn', hours:10, machines:2, type:'Pallet System', isLoader:false },
  AX4: { id:'AX4', name:'Trinity AX4', sub:'Med/Large Pallet', price:230000, pallets:'12', maxPart:'21.65in x 16.5in H', weight:'75 lbs', hours:9, machines:1, type:'Pallet System', isLoader:false },
  AX4H: { id:'AX4H', name:'Trinity AX4HD', sub:'Heavy-Duty Med/Lg', price:250000, pallets:'12', maxPart:'21.65in x 16.5in H', weight:'180 lbs', hours:9, machines:1, type:'Pallet System', isLoader:false },
  AX5: { id:'AX5', name:'Trinity AX5', sub:'Large Production', price:225000, pallets:'20', maxPart:'20in x 12in H', weight:'75 lbs', hours:10, machines:1, type:'Pallet System', isLoader:false },
  AX5H: { id:'AX5H', name:'Trinity AX5HD', sub:'Heavy-Duty Large', price:250000, pallets:'20', maxPart:'20in x 12in H', weight:'180 lbs', hours:10, machines:1, type:'Pallet System', isLoader:false },
};

// ===== STATE =====
let state = {
  step: 1,
  selectedMachine: null,
  selectedTrinity: null,
  brandFilter: 'All',
  finDown: 10,
  finRate: 6.5,
  finTerm: 60,
  results: null,
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderBrandFilters();
  renderMachineGrid();
  bindEvents();
  updateSliderDisplays();
});

// ===== BRAND FILTERS =====
function renderBrandFilters() {
  const brands = ['All', ...new Set(MACHINES.map(m => m.brand))];
  const el = document.getElementById('brandFilters');
  el.innerHTML = brands.map(b =>
    `<button class="brand-chip${b === state.brandFilter ? ' active' : ''}" data-brand="${b}">${b}</button>`
  ).join('');
  el.querySelectorAll('.brand-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.brandFilter = chip.dataset.brand;
      el.querySelectorAll('.brand-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderMachineGrid();
    });
  });
}

// ===== MACHINE GRID =====
function renderMachineGrid() {
  const search = (document.getElementById('machineSearch').value || '').toLowerCase();
  const grid = document.getElementById('machineGrid');
  const filtered = MACHINES.filter(m => {
    const matchBrand = state.brandFilter === 'All' || m.brand === state.brandFilter;
    const matchSearch = !search ||
      m.model.toLowerCase().includes(search) ||
      m.brand.toLowerCase().includes(search) ||
      m.type.toLowerCase().includes(search);
    return matchBrand && matchSearch;
  });
  grid.innerHTML = filtered.map(m => `
    <div class="machine-card${state.selectedMachine?.id === m.id ? ' selected' : ''}" data-id="${m.id}">
      <div class="machine-brand">${m.brand}</div>
      <div class="machine-model">${m.model}</div>
      <div class="machine-meta"><span>${m.type}</span><span>${m.axes}-Axis</span></div>
    </div>
  `).join('');
  grid.querySelectorAll('.machine-card').forEach(card => {
    card.addEventListener('click', () => {
      state.selectedMachine = MACHINES.find(m => m.id === card.dataset.id);
      // Auto-select recommended Trinity model
      state.selectedTrinity = TRINITY[state.selectedMachine.rec];
      renderMachineGrid();
      document.getElementById('btnToStep2').disabled = false;
    });
  });
}

// ===== TRINITY GRID =====
function renderTrinityGrid() {
  const machine = state.selectedMachine;
  if (!machine) return;
  document.getElementById('selectedMachineName').textContent = `${machine.brand} ${machine.model}`;
  const grid = document.getElementById('trinityGrid');
  const models = machine.compat.map(id => TRINITY[id]);

  // Auto-select recommended if nothing selected
  if (!state.selectedTrinity || !machine.compat.includes(state.selectedTrinity.id)) {
    state.selectedTrinity = TRINITY[machine.rec];
  }
  document.getElementById('btnToStep3').disabled = false;

  grid.innerHTML = models.map(t => {
    const isRec = t.id === machine.rec;
    const sel = state.selectedTrinity?.id === t.id;
    return `
    <div class="trinity-card${sel ? ' selected' : ''}" data-id="${t.id}">
      <div class="trinity-header">
        <div>
          <div class="trinity-name">${t.name}</div>
          <div class="trinity-sub">${t.sub}</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${isRec ? '<span class="badge badge-rec">RECOMMENDED</span>' : ''}
          ${t.isLoader ? '<span class="badge badge-loader">PART LOADER</span>' : ''}
        </div>
      </div>
      <div class="trinity-price">$${t.price.toLocaleString()}</div>
      <div class="trinity-specs">
        <div class="trinity-spec">Pallets<strong>${t.pallets}</strong></div>
        <div class="trinity-spec">Max Part Size<strong>${t.maxPart}</strong></div>
        <div class="trinity-spec">Weight Capacity<strong>${t.weight}</strong></div>
        <div class="trinity-spec">${t.isLoader ? 'Type' : 'Lights-Out Hrs'}<strong>${t.isLoader ? 'Part Loader' : t.hours + ' hrs/day'}</strong></div>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.trinity-card').forEach(card => {
    card.addEventListener('click', () => {
      state.selectedTrinity = TRINITY[card.dataset.id];
      renderTrinityGrid();
    });
  });
}

// ===== SLIDER DISPLAYS =====
function updateSliderDisplays() {
  ['mannedUtilBefore','mannedUtilAfter','unmannedUtilBefore','unmannedUtilAfter'].forEach(id => {
    const slider = document.getElementById(id);
    const display = document.getElementById(id + 'Val');
    if (slider && display) {
      display.textContent = slider.value + '%';
      slider.addEventListener('input', () => { display.textContent = slider.value + '%'; });
    }
  });
}

// ===== BUTTON GROUP =====
function setupBtnGroup(groupId) {
  const group = document.getElementById(groupId);
  group.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      group.dataset.value = btn.dataset.val;
    });
  });
}

// ===== NAVIGATION =====
function goToStep(n) {
  state.step = n;
  document.querySelectorAll('.step').forEach(s => s.classList.add('hidden'));
  document.getElementById('step' + n).classList.remove('hidden');
  document.getElementById('progressFill').style.width = (n * 25) + '%';
  document.querySelectorAll('.step-indicator').forEach(si => {
    const sn = parseInt(si.dataset.step);
    si.classList.remove('active', 'done');
    if (sn < n) si.classList.add('done');
    if (sn === n) si.classList.add('active');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== BIND EVENTS =====
function bindEvents() {
  document.getElementById('machineSearch').addEventListener('input', renderMachineGrid);

  document.getElementById('btnToStep2').addEventListener('click', () => {
    renderTrinityGrid();
    goToStep(2);
  });
  document.getElementById('btnToStep3').addEventListener('click', () => goToStep(3));
  document.getElementById('btnBackTo1').addEventListener('click', () => goToStep(1));
  document.getElementById('btnBackTo2').addEventListener('click', () => {
    renderTrinityGrid();
    goToStep(2);
  });
  document.getElementById('btnBackTo3').addEventListener('click', () => goToStep(3));
  document.getElementById('btnStartOver').addEventListener('click', () => {
    state.selectedMachine = null;
    state.selectedTrinity = null;
    document.getElementById('btnToStep2').disabled = true;
    document.getElementById('btnToStep3').disabled = true;
    renderMachineGrid();
    goToStep(1);
  });
  document.getElementById('btnCalculate').addEventListener('click', calculate);
  document.getElementById('btnRequestQuote').addEventListener('click', handleQuoteRequest);

  setupBtnGroup('mannedShifts');
  setupBtnGroup('unmannedShifts');
}

// ===== HELPERS =====
function fmt(n) { return '$' + Math.round(n).toLocaleString(); }

// ===== ROI CALCULATION =====
function calculate() {
  const trinity = state.selectedTrinity;
  const machine = state.selectedMachine;
  if (!trinity || !machine) return;

  const shopRate = parseFloat(document.getElementById('shopRate').value) || 125;
  const hrsPerShift = parseFloat(document.getElementById('hrsPerShift').value) || 8;
  const operatorWage = parseFloat(document.getElementById('operatorWage').value) || 30;
  const workingDays = parseFloat(document.getElementById('workingDays').value) || 250;
  const mannedShifts = parseInt(document.getElementById('mannedShifts').dataset.value) || 0;
  const unmannedShifts = parseInt(document.getElementById('unmannedShifts').dataset.value) || 0;
  const mannedUtilBefore = parseFloat(document.getElementById('mannedUtilBefore').value) / 100;
  const mannedUtilAfter = parseFloat(document.getElementById('mannedUtilAfter').value) / 100;
  const unmannedUtilBefore = parseFloat(document.getElementById('unmannedUtilBefore').value) / 100;
  const unmannedUtilAfter = parseFloat(document.getElementById('unmannedUtilAfter').value) / 100;

  const mannedHrs = mannedShifts * hrsPerShift;
  const mannedBefore = mannedHrs * mannedUtilBefore;
  const mannedAfter = mannedHrs * mannedUtilAfter;
  const mannedGainHrs = mannedAfter - mannedBefore;
  const mannedGainRev = mannedGainHrs * shopRate * workingDays;

  const unmannedHrs = unmannedShifts * hrsPerShift;
  const unmannedBefore = unmannedHrs * unmannedUtilBefore;
  const unmannedAfter = unmannedHrs * unmannedUtilAfter;
  const unmannedGainHrs = unmannedAfter - unmannedBefore;
  const unmannedGainRev = unmannedGainHrs * shopRate * workingDays;

  const totalGainHrs = mannedGainHrs + unmannedGainHrs;
  const totalGainRev = mannedGainRev + unmannedGainRev;

  const totalAutoHrs = mannedAfter + unmannedAfter;
  const opCost = totalAutoHrs * 5 * workingDays;

  const laborSaving = operatorWage * mannedGainHrs * workingDays * 0.5;

  const grossBenefit = totalGainRev + laborSaving;
  const netBenefit = grossBenefit - opCost;
  const investment = trinity.price;
  const paybackMonths = netBenefit > 0 ? (investment / netBenefit) * 12 : Infinity;
  const year1ROI = ((netBenefit - investment) / investment) * 100;
  const year3ROI = ((netBenefit * 3 - investment) / investment) * 100;
  const year5ROI = ((netBenefit * 5 - investment) / investment) * 100;

  const totalHrsBefore = mannedBefore > 0 ? mannedBefore : 0.01;
  const totalHrsAfter = mannedAfter + unmannedAfter;
  const capacityMult = totalHrsAfter / totalHrsBefore;

  state.results = {
    shopRate, hrsPerShift, operatorWage, workingDays, mannedShifts, unmannedShifts,
    mannedUtilBefore, mannedUtilAfter, unmannedUtilBefore, unmannedUtilAfter,
    mannedBefore, mannedAfter, mannedGainHrs, mannedGainRev,
    unmannedBefore, unmannedAfter, unmannedGainHrs, unmannedGainRev,
    totalGainHrs, totalGainRev, totalAutoHrs, opCost, laborSaving,
    grossBenefit, netBenefit, investment, paybackMonths,
    year1ROI, year3ROI, year5ROI, totalHrsBefore, totalHrsAfter, capacityMult
  };

  renderResults();
  goToStep(4);
}

// ===== RENDER RESULTS =====
function renderResults() {
  const r = state.results;
  const t = state.selectedTrinity;
  const m = state.selectedMachine;

  // Intro
  document.getElementById('resultsIntro').innerHTML = `
    <h2>Here's what automation does for your <span class="accent">${m.brand} ${m.model}</span></h2>
    <p>With a ${t.name} · Based on your shop's numbers</p>
  `;

  // Hero stats
  document.getElementById('heroStats').innerHTML = `
    <div class="hero-card highlight">
      <div class="label">Your Net Annual Benefit</div>
      <div class="value">${fmt(r.netBenefit)}</div>
      <div class="sub">additional profit per year</div>
    </div>
    <div class="hero-card">
      <div class="label">Pays for Itself In</div>
      <div class="value">${r.paybackMonths < 120 ? r.paybackMonths.toFixed(1) : '120+'}</div>
      <div class="sub">months</div>
    </div>
    <div class="hero-card">
      <div class="label">New Revenue Unlocked</div>
      <div class="value">${fmt(r.totalGainRev)}</div>
      <div class="sub">per year</div>
    </div>
    <div class="hero-card">
      <div class="label">Investment</div>
      <div class="value">${fmt(r.investment)}</div>
      <div class="sub">${t.name}</div>
    </div>
  `;

  // Insight box
  const idleHrs = 24 - (r.mannedShifts * r.hrsPerShift);
  document.getElementById('insightBox').innerHTML = `
    <div class="insight-label">Right now, your machine sits idle</div>
    <div class="insight-value">${idleHrs} hours/day</div>
    <div class="insight-hook">With automation, ${r.totalGainHrs.toFixed(1)} of those hours start making you money.</div>
  `;

  // ROI Timeline
  document.getElementById('roiTimeline').innerHTML = `
    <div class="roi-item"><div class="label">Year 1 ROI</div><div class="value">${r.year1ROI.toFixed(0)}%</div></div>
    <div class="roi-item"><div class="label">Year 3 ROI</div><div class="value">${r.year3ROI.toFixed(0)}%</div></div>
    <div class="roi-item"><div class="label">Year 5 ROI</div><div class="value">${r.year5ROI.toFixed(0)}%</div></div>
  `;

  // Shift Impact
  const mBPct = (r.mannedUtilBefore * 100).toFixed(0);
  const mAPct = (r.mannedUtilAfter * 100).toFixed(0);
  const uBPct = (r.unmannedUtilBefore * 100).toFixed(0);
  const uAPct = (r.unmannedUtilAfter * 100).toFixed(0);

  let shiftHTML = '';
  if (r.mannedShifts > 0) {
    shiftHTML += `
    <div class="impact-card blue">
      <h4>Your Manned Shifts</h4>
      <div class="util-bar-row">
        <div class="util-bar-label"><span>Today</span><span>${mBPct}% utilized</span></div>
        <div class="util-bar-track"><div class="util-bar-fill blue" style="width:0%" data-target="${mBPct}"></div></div>
      </div>
      <div class="util-bar-row">
        <div class="util-bar-label"><span>With Automation</span><span>${mAPct}% utilized</span></div>
        <div class="util-bar-track"><div class="util-bar-fill blue" style="width:0%" data-target="${mAPct}"></div></div>
      </div>
      <div class="impact-stats">
        <div class="impact-stat"><div class="label">Extra hrs/day</div><div class="value">+${r.mannedGainHrs.toFixed(1)}</div></div>
        <div class="impact-stat"><div class="label">Extra revenue/year</div><div class="value">${fmt(r.mannedGainRev)}</div></div>
      </div>
    </div>`;
  }
  if (r.unmannedShifts > 0) {
    shiftHTML += `
    <div class="impact-card teal">
      <h4>Your Lights-Out Shifts <span class="new-badge">NEW REVENUE</span></h4>
      <div class="util-bar-row">
        <div class="util-bar-label"><span>Today</span><span>${uBPct}% — machine is off</span></div>
        <div class="util-bar-track"><div class="util-bar-fill teal" style="width:0%" data-target="${Math.max(uBPct, 1)}"></div></div>
      </div>
      <div class="util-bar-row">
        <div class="util-bar-label"><span>With Automation</span><span>${uAPct}% — making you money</span></div>
        <div class="util-bar-track"><div class="util-bar-fill teal" style="width:0%" data-target="${uAPct}"></div></div>
      </div>
      <div class="impact-stats">
        <div class="impact-stat"><div class="label">NEW hrs/day</div><div class="value">+${r.unmannedGainHrs.toFixed(1)}</div></div>
        <div class="impact-stat"><div class="label">NEW revenue/year</div><div class="value">${fmt(r.unmannedGainRev)}</div></div>
      </div>
    </div>`;
  }
  if (r.mannedShifts === 0 && r.unmannedShifts === 0) {
    shiftHTML = '<div class="impact-card blue"><h4>No shifts configured</h4><p style="color:var(--text-dim)">Go back and select at least one shift to see the impact.</p></div>';
  }
  document.getElementById('shiftImpact').innerHTML = shiftHTML;

  // Animate bars
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll('.util-bar-fill[data-target]').forEach(bar => {
        bar.style.width = bar.dataset.target + '%';
      });
    }, 100);
  });

  // Shift summary
  document.getElementById('shiftSummary').innerHTML = `
    <div class="sum-item"><div class="label">Productive hours/day</div><div class="value">${r.totalHrsBefore.toFixed(1)} → ${r.totalHrsAfter.toFixed(1)}</div></div>
    <div class="sum-item"><div class="label">Hours gained per day</div><div class="value">+${r.totalGainHrs.toFixed(1)}</div></div>
    <div class="sum-item"><div class="label">Capacity multiplier</div><div class="value">${r.capacityMult.toFixed(1)}x</div></div>
  `;

  // Financing
  renderFinancing();

  // Section 179
  const taxSavings = r.investment * 0.21;
  const effectiveCost = r.investment - taxSavings;
  const adjustedPayback = r.paybackMonths * 0.79;
  state.results.taxSavings = taxSavings;
  state.results.effectiveCost = effectiveCost;
  state.results.adjustedPayback = adjustedPayback;

  document.getElementById('s179Callout').innerHTML = `
    <div class="s179-icon">&#167;</div>
    <div>
      <h4>Section 179 Tax Deduction — Save Even More</h4>
      <p>Equipment like this may qualify for full first-year expensing under Section 179. That means a lower effective cost and faster payback.</p>
      <div class="s179-vals">
        <div class="s179-val"><div class="label">Estimated Tax Savings</div><div class="value">${fmt(taxSavings)}</div></div>
        <div class="s179-val"><div class="label">Effective Cost</div><div class="value">${fmt(effectiveCost)}</div></div>
        <div class="s179-val"><div class="label">Adjusted Payback</div><div class="value">${adjustedPayback.toFixed(1)} mo</div></div>
      </div>
    </div>
  `;
}

// ===== FINANCING =====
function renderFinancing() {
  const r = state.results;
  const totalShifts = r.mannedShifts + r.unmannedShifts;

  document.getElementById('financingSection').innerHTML = `
    <div class="fin-inputs">
      <div class="input-group">
        <label>Down Payment</label>
        <input type="range" id="finDown" min="0" max="50" step="5" value="${state.finDown}" class="slider slider-teal" style="width:100%">
        <span class="mono" id="finDownVal">${state.finDown}%</span>
      </div>
      <div class="input-group">
        <label>Interest Rate</label>
        <input type="range" id="finRate" min="0" max="15" step="0.25" value="${state.finRate}" class="slider slider-teal" style="width:100%">
        <span class="mono" id="finRateVal">${state.finRate}%</span>
      </div>
      <div class="input-group">
        <label>Term</label>
        <div class="fin-term-btns">
          ${[36,48,60,72,84].map(t => `<button class="fin-term-btn${t===state.finTerm?' active':''}" data-term="${t}">${t}mo</button>`).join('')}
        </div>
      </div>
    </div>
    <div class="fin-stats" id="finStatsCards"></div>
  `;

  const updateFin = () => {
    const down = parseFloat(document.getElementById('finDown').value);
    const rate = parseFloat(document.getElementById('finRate').value);
    const term = state.finTerm;
    state.finDown = down;
    state.finRate = rate;
    document.getElementById('finDownVal').textContent = down + '%';
    document.getElementById('finRateVal').textContent = rate + '%';

    const principal = r.investment * (1 - down / 100);
    const mr = rate / 100 / 12;
    let monthly;
    if (mr === 0) {
      monthly = principal / term;
    } else {
      monthly = principal * mr * Math.pow(1 + mr, term) / (Math.pow(1 + mr, term) - 1);
    }
    const daily = monthly / 30;
    const hrsPerDay = totalShifts > 0 ? totalShifts * r.hrsPerShift : 8;
    const hourly = daily / hrsPerDay;

    state.results.finMonthly = monthly;
    state.results.finDaily = daily;
    state.results.finHourly = hourly;

    document.getElementById('finStatsCards').innerHTML = `
      <div class="fin-stat"><div class="label">Monthly Payment</div><div class="value">${fmt(monthly)}</div><div class="sub">per month</div></div>
      <div class="fin-stat"><div class="label">Daily Cost</div><div class="value">${fmt(daily)}</div><div class="sub">per working day</div></div>
      <div class="fin-stat">
        <div class="label">Hourly Cost</div>
        <div class="value">${fmt(hourly)}</div>
        <div class="sub">per hour of operation</div>
        <div class="hook">You charge $${r.shopRate}/hr. This costs ${fmt(hourly)}/hr.</div>
      </div>
    `;
  };

  document.getElementById('finDown').addEventListener('input', updateFin);
  document.getElementById('finRate').addEventListener('input', updateFin);
  document.querySelectorAll('.fin-term-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fin-term-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.finTerm = parseInt(btn.dataset.term);
      updateFin();
    });
  });

  updateFin();
}

// ===== QUOTE REQUEST =====
function handleQuoteRequest() {
  const name = document.getElementById('custName').value.trim();
  const company = document.getElementById('custCompany').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const phone = document.getElementById('custPhone').value.trim();

  if (!name || !email) {
    alert('Please enter your name and email so we can send you a proposal.');
    return;
  }

  const r = state.results;
  const t = state.selectedTrinity;
  const m = state.selectedMachine;

  const subject = encodeURIComponent(`ROI Proposal Request — ${company || name}`);
  const body = encodeURIComponent(
`New ROI Calculator Lead

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone || 'Not provided'}

Machine: ${m.brand} ${m.model} (${m.type}, ${m.axes}-Axis)
Trinity System: ${t.name} — ${t.sub}
Investment: ${fmt(r.investment)}

Shop Rate: $${r.shopRate}/hr
Manned Shifts: ${r.mannedShifts} x ${r.hrsPerShift}hr
Unmanned Shifts: ${r.unmannedShifts} x ${r.hrsPerShift}hr
Utilization (Manned): ${(r.mannedUtilBefore*100).toFixed(0)}% → ${(r.mannedUtilAfter*100).toFixed(0)}%
Utilization (Unmanned): ${(r.unmannedUtilBefore*100).toFixed(0)}% → ${(r.unmannedUtilAfter*100).toFixed(0)}%

RESULTS:
Net Annual Benefit: ${fmt(r.netBenefit)}
Payback Period: ${r.paybackMonths.toFixed(1)} months
Year 1 ROI: ${r.year1ROI.toFixed(0)}%
Year 5 ROI: ${r.year5ROI.toFixed(0)}%
Additional Revenue: ${fmt(r.totalGainRev)}/year
`);

  // Open mailto link
  window.location.href = `mailto:automation@selwaytool.com?subject=${subject}&body=${body}`;

  // Show success UI
  const ctaSection = document.querySelector('.cta-section');
  ctaSection.innerHTML = `
    <div class="cta-success">
      <div class="check">&#10003;</div>
      <h3>We're on it!</h3>
      <p>Your email app should open with your ROI details pre-filled.<br>
      Just hit send, and a Selway automation specialist will follow up with your custom proposal.</p>
      <p style="margin-top:16px">Don't want to wait? Call us now: <a href="tel:8887359290" class="accent" style="font-size:18px;font-weight:600">(888) 735-9290</a></p>
    </div>
  `;
}
