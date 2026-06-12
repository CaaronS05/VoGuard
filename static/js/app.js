const state = {
  lang: localStorage.getItem("voGuardDashboardLanguage") || "id",
  sessions: [],
  latest: null,
  charts: {},
  recorder: null,
  stream: null,
  chunks: [],
  recordingStartedAt: 0,
  timerInterval: null,
  recordingRunId: 0,
  analysisRunId: 0,
  isAnalyzing: false,
  hasLiveResult: false,
  scoreAnimationFrame: null,
};

const els = {
  healthStatus: document.querySelector("#healthStatus"),
  navButtons: document.querySelectorAll("[data-view-link]"),
  views: document.querySelectorAll("[data-view]"),
  languageToggle: document.querySelector(".language-toggle"),
  totalSessions: document.querySelector("#totalSessions"),
  averageRisk: document.querySelector("#averageRisk"),
  highRiskCount: document.querySelector("#highRiskCount"),
  lastStatus: document.querySelector("#lastStatus"),
  overviewRisk: document.querySelector("#overviewRisk"),
  previewMeter: document.querySelector("#previewMeter"),
  previewRecommendation: document.querySelector("#previewRecommendation"),
  startRecording: document.querySelector("#startRecording"),
  stopRecording: document.querySelector("#stopRecording"),
  recordTimer: document.querySelector("#recordTimer"),
  recordState: document.querySelector("#recordState"),
  recordOrb: document.querySelector("#recordOrb"),
  liveWave: document.querySelector("#liveWave"),
  audioUpload: document.querySelector("#audioUpload"),
  uploadZone: document.querySelector("#uploadZone"),
  uploadState: document.querySelector("#uploadState"),
  uploadFileName: document.querySelector("#uploadFileName"),
  resultScore: document.querySelector("#resultScore"),
  resultLevel: document.querySelector("#resultLevel"),
  resultRecommendation: document.querySelector("#resultRecommendation"),
  resultCard: document.querySelector("#resultCard"),
  resultContent: document.querySelector("#resultContent"),
  analysisLoader: document.querySelector("#analysisLoader"),
  analysisLoaderTitle: document.querySelector("#analysisLoaderTitle"),
  analysisLoaderText: document.querySelector("#analysisLoaderText"),
  anomalyList: document.querySelector("#anomalyList"),
  callMeter: document.querySelector("#callMeter"),
  callMeterLabel: document.querySelector("#callMeterLabel"),
  callIntegrityScore: document.querySelector("#callIntegrityScore"),
  callRiskLevel: document.querySelector("#callRiskLevel"),
  callSessionId: document.querySelector("#callSessionId"),
  callTimestamp: document.querySelector("#callTimestamp"),
  callSessionStatus: document.querySelector("#callSessionStatus"),
  callRecommendation: document.querySelector("#callRecommendation"),
  reportSummary: document.querySelector("#reportSummary"),
  downloadReport: document.querySelector("#downloadReport"),
  sessionTable: document.querySelector("#sessionTable"),
  toast: document.querySelector("#toast"),
};

const copy = {
  id: {
    apiReady: "API lokal siap",
    apiFailed: "API lokal belum tersedia",
    idle: "Idle. Izinkan akses mikrofon saat diminta.",
    recording: "Merekam suara. Disarankan 5-10 detik.",
    processing: "Menganalisis sinyal integritas suara...",
    converting: "Menyiapkan rekaman untuk dianalisis...",
    analysisTitle: "Analisis sedang berjalan",
    analysisDetail: "VoGuard memeriksa pitch, energi spektral, kestabilan temporal, dan kualitas audio.",
    newSample: "Menunggu analisis baru",
    waitingForStop: "Hasil sebelumnya disembunyikan. Stop rekaman untuk memulai analisis baru.",
    analysisBusy: "Analisis lain masih berjalan. Tunggu hingga selesai.",
    monitoring: "Monitoring",
    awaitingSample: "Menunggu sampel",
    resultsPending: "Hasil akan muncul setelah rekaman atau upload audio selesai dianalisis.",
    completed: "Analisis selesai.",
    uploadReady: "Pilih file audio untuk dianalisis.",
    uploadProcessing: "Mengunggah dan menganalisis audio...",
    noAnomaly: "Tidak ada anomali kuat yang melewati ambang prototype.",
  },
  en: {
    apiReady: "Local API ready",
    apiFailed: "Local API unavailable",
    idle: "Idle. Allow microphone access when prompted.",
    recording: "Recording voice. 5-10 seconds is recommended.",
    processing: "Analyzing voice integrity signals...",
    converting: "Preparing the recording for analysis...",
    analysisTitle: "Analysis in progress",
    analysisDetail: "VoGuard is checking pitch, spectral energy, temporal stability, and audio quality.",
    newSample: "Awaiting new analysis",
    waitingForStop: "The previous result is hidden. Stop recording to begin a new analysis.",
    analysisBusy: "Another analysis is still running. Please wait until it finishes.",
    monitoring: "Monitoring",
    awaitingSample: "Awaiting sample",
    resultsPending: "Results will appear after the recording or uploaded audio has been analyzed.",
    completed: "Analysis completed.",
    uploadReady: "Choose an audio file for analysis.",
    uploadProcessing: "Uploading and analyzing audio...",
    noAnomaly: "No strong anomaly crossed the prototype threshold.",
  },
};

const staticTranslations = {
  id: {
    ".side-nav [data-view-link='overview']": "Overview",
    ".side-nav [data-view-link='live']": "Deteksi Live",
    ".side-nav [data-view-link='upload']": "Upload Audio",
    ".side-nav [data-view-link='call']": "Simulasi Panggilan",
    ".side-nav [data-view-link='reports']": "Laporan",
    ".side-nav [data-view-link='log']": "Log Forensik",
    ".side-nav [data-view-link='dataset']": "Dataset",
    ".prototype-badge": "MVP lokal siap paten",
    ".sidebar-note span": "Prototipe lokal",
    ".sidebar-note p": "Analisis sinyal audio rule-based. Tidak ada klaim akurasi produksi.",
    ".hero-copy .eyebrow": "Prototype integritas suara enterprise",
    ".hero-copy h1": "Analisis sinyal integritas suara sebelum panggilan sensitif menjadi risiko.",
    ".hero-copy p:not(.eyebrow)": "Rekam audio mikrofon atau upload file WAV, lalu VoGuard menjalankan analisis sinyal dasar untuk indikasi risiko manipulasi, pitch instability, artefak spektral, dan isu kualitas audio.",
    ".hero-actions .button-primary": "Mulai Deteksi Live",
    ".hero-actions .button-secondary": "Upload Audio",
    ".radar-card p": "Skor prototype terbaru",
    "#overview .metric-card:nth-child(1) span": "Total sesi",
    "#overview .metric-card:nth-child(2) span": "Rata-rata risiko",
    "#overview .metric-card:nth-child(3) span": "Sesi high-risk",
    "#overview .metric-card:nth-child(4) span": "Status terakhir",
    ".command-card h2": "Pusat kendali integritas suara",
    ".command-card p": "Gunakan audio rekaman atau upload untuk menghasilkan skor prototype, chart, daftar anomali, dan laporan JSON.",
    ".quick-actions button:nth-child(1)": "Mulai Deteksi Live",
    ".quick-actions button:nth-child(2)": "Upload Audio",
    ".quick-actions button:nth-child(3)": "Lihat Laporan",
    ".quick-actions button:nth-child(4)": "Lihat Log Forensik",
    ".call-preview-card > span": "Simulasi panggilan live",
    ".call-preview-card h3": "Unknown Caller / New Caller",
    "#live .section-heading h2": "Rekam 5-10 detik audio dari mikrofon.",
    "#live .section-heading p": "VoGuard mengekspor audio browser sebagai WAV dan mengirimkannya ke Flask untuk analisis sinyal dasar.",
    "#startRecording": "Mulai Rekam",
    "#stopRecording": "Stop Rekam",
    ".score-block span": "Risiko manipulasi",
    "#upload .section-heading h2": "Upload audio. Dapatkan sinyal integritas yang jelas.",
    "#upload .section-heading p": "Pilih satu sampel suara. VoGuard akan memeriksa pitch, energi spektral, kestabilan temporal, dan kualitas rekaman.",
    ".upload-kicker": "Penerimaan audio integritas",
    "#uploadZone > strong": "Tarik sampel suara ke sini.",
    ".upload-copy": "Atau pilih file audio lokal. Tidak ada data yang dikirim keluar perangkat ini.",
    ".upload-button": "Pilih file audio",
    ".upload-file-card small": "Sampel terpilih",
    ".upload-specs div:nth-child(1) span": "Format utama",
    ".upload-specs div:nth-child(2) span": "Durasi minimum",
    ".upload-specs div:nth-child(3) span": "Pemrosesan",
    ".upload-specs div:nth-child(3) strong": "Lokal",
    ".upload-live-link": "Rekam langsung dengan mikrofon",
    "#call .section-heading h2": "Satu sinyal. Keputusan panggilan lebih cepat.",
    "#call .section-heading p": "Simulasi ini menerjemahkan analisis terbaru menjadi rekomendasi operasional yang jelas untuk agent panggilan.",
    ".call-identity-topline > span:nth-child(2)": "Sesi analisis terbaru",
    ".caller-copy > span": "Identitas penelepon",
    ".call-analyze-button": "Jalankan analisis live baru",
    ".call-score-copy > span": "Integritas audio",
    ".call-risk-line span": "Penilaian saat ini",
    ".call-status-card > span": "Status sesi",
    ".call-meter-card > div:first-child > span": "Sinyal terpercaya",
    ".call-recommendation-card > span": "Tindakan agent yang disarankan",
    "#reports .section-heading h2": "Laporan skor risiko terbaru.",
    "#reports .section-heading p": "Download laporan JSON untuk review lokal atau dokumentasi demo investor.",
    "#downloadReport": "Download Laporan JSON",
    "#log .section-heading h2": "Log forensik dan riwayat sesi.",
    "#log .section-heading p": "Setiap analisis tersimpan lokal di data/sessions.json.",
    "#dataset h2": "Folder dataset disiapkan untuk training model berikutnya.",
    "#dataset p": "MVP ini memakai analisis sinyal rule-based. Letakkan dataset real dan manipulated voice open-source secara manual ke folder lokal.",
  },
  en: {
    ".side-nav [data-view-link='overview']": "Overview",
    ".side-nav [data-view-link='live']": "Live Detection",
    ".side-nav [data-view-link='upload']": "Upload Audio",
    ".side-nav [data-view-link='call']": "Simulated Call",
    ".side-nav [data-view-link='reports']": "Reports",
    ".side-nav [data-view-link='log']": "Forensic Log",
    ".side-nav [data-view-link='dataset']": "Dataset",
    ".prototype-badge": "Patent-ready MVP",
    ".sidebar-note span": "Local prototype",
    ".sidebar-note p": "Rule-based audio integrity signal analysis. No production accuracy claim.",
    ".hero-copy .eyebrow": "Enterprise voice integrity prototype",
    ".hero-copy h1": "Analyze voice integrity signals before sensitive calls become risk.",
    ".hero-copy p:not(.eyebrow)": "Record microphone audio or upload a WAV file, then VoGuard runs basic signal analysis for manipulation risk indications, pitch instability, spectral artifacts, and audio quality issues.",
    ".hero-actions .button-primary": "Start Live Detection",
    ".hero-actions .button-secondary": "Upload Audio",
    ".radar-card p": "Latest prototype score",
    "#overview .metric-card:nth-child(1) span": "Total sessions",
    "#overview .metric-card:nth-child(2) span": "Average risk",
    "#overview .metric-card:nth-child(3) span": "High-risk sessions",
    "#overview .metric-card:nth-child(4) span": "Last status",
    ".command-card h2": "Voice integrity command center",
    ".command-card p": "Use recorded or uploaded audio to produce a prototype score, charts, anomaly list, and JSON report.",
    ".quick-actions button:nth-child(1)": "Start Live Detection",
    ".quick-actions button:nth-child(2)": "Upload Audio",
    ".quick-actions button:nth-child(3)": "View Reports",
    ".quick-actions button:nth-child(4)": "View Forensic Log",
    ".call-preview-card > span": "Simulated live call",
    ".call-preview-card h3": "Unknown Caller / New Caller",
    "#live .section-heading h2": "Record 5-10 seconds from the microphone.",
    "#live .section-heading p": "VoGuard exports browser audio as WAV and sends it to Flask for basic signal analysis.",
    "#startRecording": "Start Recording",
    "#stopRecording": "Stop Recording",
    ".score-block span": "Manipulation risk",
    "#upload .section-heading h2": "Upload audio. Get a clear integrity signal.",
    "#upload .section-heading p": "Choose one voice sample and VoGuard will inspect pitch, spectral energy, temporal stability, and recording quality.",
    ".upload-kicker": "Audio integrity intake",
    "#uploadZone > strong": "Drop a voice sample here.",
    ".upload-copy": "Or browse a local audio file. Nothing is uploaded outside this device.",
    ".upload-button": "Choose audio file",
    ".upload-file-card small": "Selected sample",
    ".upload-specs div:nth-child(1) span": "Preferred",
    ".upload-specs div:nth-child(2) span": "Minimum",
    ".upload-specs div:nth-child(3) span": "Processing",
    ".upload-specs div:nth-child(3) strong": "Local",
    ".upload-live-link": "Record with microphone instead",
    "#call .section-heading h2": "One signal. A faster call decision.",
    "#call .section-heading p": "This simulation translates the latest analysis into a clear operational recommendation for a call agent.",
    ".call-identity-topline > span:nth-child(2)": "Latest analyzed session",
    ".caller-copy > span": "Caller identity",
    ".call-analyze-button": "Run a new live analysis",
    ".call-score-copy > span": "Audio integrity",
    ".call-risk-line span": "Current assessment",
    ".call-status-card > span": "Session status",
    ".call-meter-card > div:first-child > span": "Trusted signal",
    ".call-recommendation-card > span": "Recommended agent action",
    "#reports .section-heading h2": "Latest risk score report.",
    "#reports .section-heading p": "Download the JSON report for local review or investor demo documentation.",
    "#downloadReport": "Download JSON Report",
    "#log .section-heading h2": "Forensic log and session history.",
    "#log .section-heading p": "Each analysis is stored locally in data/sessions.json.",
    "#dataset h2": "Dataset folders are prepared for future model training.",
    "#dataset p": "This MVP uses rule-based signal analysis. Place future open-source real and manipulated voice datasets into the local folders manually.",
  },
};

function t(key) {
  return copy[state.lang][key] || copy.en[key] || key;
}

function applyStaticTranslations() {
  const translations = staticTranslations[state.lang] || staticTranslations.en;
  Object.entries(translations).forEach(([selector, text]) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = text;
    });
  });
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  setTimeout(() => els.toast.classList.remove("is-visible"), 3600);
}

function switchView(viewName) {
  els.views.forEach((view) => view.classList.toggle("active", view.dataset.view === viewName));
  els.navButtons.forEach((button) => button.classList.toggle("active", button.dataset.viewLink === viewName));
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (window.gsap) {
    gsap.fromTo(
      `[data-view="${viewName}"] > *`,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" }
    );

    if (viewName === "upload") {
      gsap.fromTo(".upload-orbit", { scale: 0.72, opacity: 0, rotate: -18 }, { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: "power4.out" });
      gsap.fromTo(".upload-side-panel > *", { scale: 0.88, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" });
    }

    if (viewName === "call") {
      gsap.fromTo(".call-identity-panel", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: "power4.out" });
      gsap.fromTo(".call-score-panel, .call-decision-stack > *", { scale: 0.88, opacity: 0, y: 34 }, { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power3.out" });
    }
  }
}

function riskClass(level) {
  if (!level) return "";
  if (level.includes("High")) return "high";
  if (level.includes("Medium")) return "medium";
  return "low";
}

function animateNumber(element, target) {
  if (state.scoreAnimationFrame) cancelAnimationFrame(state.scoreAnimationFrame);
  const start = Number(element.textContent) || 0;
  const started = performance.now();
  function tick(now) {
    const progress = Math.min((now - started) / 900, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(start + (target - start) * eased);
    if (progress < 1) {
      state.scoreAnimationFrame = requestAnimationFrame(tick);
    } else {
      state.scoreAnimationFrame = null;
    }
  }
  state.scoreAnimationFrame = requestAnimationFrame(tick);
}

async function api(path, options) {
  const response = await fetch(path, options);
  const data = await response.json();
  if (!response.ok || data.ok === false) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
}

async function checkHealth() {
  try {
    await api("/api/health");
    els.healthStatus.textContent = t("apiReady");
  } catch {
    els.healthStatus.textContent = t("apiFailed");
  }
}

async function loadSessions({ hydrateLatest = false } = {}) {
  const data = await api("/api/sessions");
  state.sessions = data.sessions || [];
  if (hydrateLatest || !state.latest) state.latest = state.sessions[0] || state.latest;
  renderOverview();
  renderSessionTable();
  if (hydrateLatest && state.latest) renderResult(state.latest, { updateLiveCard: false });
}

function renderOverview() {
  const sessions = state.sessions;
  const total = sessions.length;
  const avg = total ? Math.round(sessions.reduce((sum, session) => sum + session.risk_score, 0) / total) : 0;
  const high = sessions.filter((session) => session.risk_level === "High Risk").length;
  const latest = state.latest || sessions[0];

  els.totalSessions.textContent = total;
  els.averageRisk.textContent = avg;
  els.highRiskCount.textContent = high;
  els.lastStatus.textContent = latest ? latest.risk_level : "No analysis";
  els.overviewRisk.textContent = latest ? latest.risk_score : 0;
  document.documentElement.style.setProperty("--score", latest ? latest.risk_score : 0);
  els.previewMeter.style.width = `${latest ? 100 - latest.risk_score : 0}%`;
  els.previewRecommendation.textContent = latest ? latest.recommendation : "Awaiting latest analysis.";
}

function setAnalysisLoading(isLoading, statusText = t("processing")) {
  state.isAnalyzing = isLoading;
  els.resultCard.classList.toggle("is-analyzing", isLoading);
  els.resultCard.setAttribute("aria-busy", String(isLoading));
  els.resultContent.setAttribute("aria-hidden", String(isLoading));
  els.analysisLoader.hidden = !isLoading;
  els.analysisLoaderTitle.textContent = t("analysisTitle");
  els.analysisLoaderText.textContent = statusText || t("analysisDetail");
  els.audioUpload.disabled = isLoading;
  els.uploadZone.classList.toggle("is-analyzing", isLoading);
}

function resetLiveResult() {
  if (state.scoreAnimationFrame) cancelAnimationFrame(state.scoreAnimationFrame);
  state.scoreAnimationFrame = null;
  state.hasLiveResult = false;
  els.resultScore.textContent = "--";
  els.resultLevel.textContent = t("newSample");
  els.resultLevel.className = "risk-badge waiting";
  els.resultRecommendation.textContent = t("waitingForStop");
  els.anomalyList.innerHTML = "";
  els.resultCard.classList.add("is-pending");
}

function renderResult(result, { updateLiveCard = true } = {}) {
  state.latest = result;
  if (updateLiveCard) {
    state.hasLiveResult = true;
    setAnalysisLoading(false);
    els.resultCard.classList.remove("is-pending");
    animateNumber(els.resultScore, result.risk_score);
    els.resultLevel.textContent = result.risk_level;
    els.resultLevel.className = `risk-badge ${riskClass(result.risk_level)}`;
    els.resultRecommendation.textContent = result.recommendation;
    els.anomalyList.innerHTML = "";

    const anomalies = result.anomalies?.length ? result.anomalies : [t("noAnomaly")];
    anomalies.forEach((anomaly) => {
      const item = document.createElement("li");
      item.textContent = anomaly;
      els.anomalyList.appendChild(item);
    });
  }

  const integrityScore = Math.max(0, 100 - result.risk_score);
  els.callMeter.style.width = `${integrityScore}%`;
  els.callMeterLabel.textContent = `${integrityScore}%`;
  els.callIntegrityScore.textContent = integrityScore;
  els.callRiskLevel.textContent = result.risk_level;
  els.callRiskLevel.className = riskClass(result.risk_level);
  els.callSessionId.textContent = result.session_id || "Analyzed session";
  els.callTimestamp.textContent = result.timestamp ? new Date(result.timestamp).toLocaleString() : "Latest result";
  els.callSessionStatus.textContent = t("monitoring");
  els.callRecommendation.textContent = result.recommendation;
  els.downloadReport.disabled = false;
  renderReport(result);
  renderCharts(result.chart_data || {});
  renderOverview();
}

function renderReport(result) {
  const metrics = result.metrics || {};
  const fields = [
    ["Session ID", result.session_id],
    ["Timestamp", new Date(result.timestamp).toLocaleString()],
    ["Audio duration", `${result.duration}s`],
    ["Risk score", result.risk_score],
    ["Risk category", result.risk_level],
    ["Pitch mean", metrics.pitch_mean],
    ["Pitch std", metrics.pitch_std],
    ["Pitch jumps", metrics.pitch_jump_count],
    ["Spectral centroid", metrics.spectral_centroid_mean],
    ["Spectral bandwidth", metrics.spectral_bandwidth_mean],
    ["High frequency ratio", metrics.high_frequency_energy_ratio],
    ["RMS stability", metrics.rms_energy_stability],
    ["Zero crossing rate", metrics.zero_crossing_rate],
    ["Temporal instability proxy", metrics.temporal_instability_proxy],
  ];

  els.reportSummary.innerHTML = fields
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value ?? "-"}</dd></div>`)
    .join("");
}

function chartLine(id, labels, data, color, fill = false) {
  if (!window.Chart) return;
  if (state.charts[id]) state.charts[id].destroy();
  const canvas = document.querySelector(`#${id}`);
  state.charts[id] = new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [{ data, borderColor: color, backgroundColor: `${color}22`, borderWidth: 2, pointRadius: 0, tension: 0.32, fill }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { grid: { color: "rgba(11,15,25,.08)" } } },
    },
  });
}

function renderCharts(chartData) {
  const waveform = chartData.waveform || [];
  const pitch = chartData.pitch_curve || [];
  const spectral = chartData.spectral_energy || [];
  chartLine("waveformChart", waveform.map((_, i) => i), waveform, "#2563eb", true);
  chartLine("pitchChart", pitch.map((_, i) => i), pitch, "#06b6d4");

  if (window.Chart) {
    if (state.charts.spectralChart) state.charts.spectralChart.destroy();
    state.charts.spectralChart = new Chart(document.querySelector("#spectralChart"), {
      type: "bar",
      data: {
        labels: spectral.map((_, i) => i),
        datasets: [{ data: spectral, backgroundColor: "#2563eb", borderRadius: 8 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  }
}

function renderSessionTable() {
  els.sessionTable.innerHTML = "";
  if (!state.sessions.length) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="6">No local analysis sessions yet.</td>`;
    els.sessionTable.appendChild(row);
    return;
  }

  state.sessions.forEach((session) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${new Date(session.timestamp).toLocaleString()}</td>
      <td>${session.source_type}</td>
      <td>${session.risk_score}</td>
      <td><span class="risk-badge ${riskClass(session.risk_level)}">${session.risk_level}</span></td>
      <td>${session.duration}s</td>
      <td><button type="button" data-session-id="${session.session_id}">View detail</button></td>
    `;
    els.sessionTable.appendChild(row);
  });
}

function audioBufferToWav(buffer) {
  const length = buffer.length;
  const arrayBuffer = new ArrayBuffer(44 + length * 2);
  const view = new DataView(arrayBuffer);
  const channels = [buffer.getChannelData(0)];

  function writeString(offset, string) {
    for (let i = 0; i < string.length; i += 1) view.setUint8(offset + i, string.charCodeAt(i));
  }

  writeString(0, "RIFF");
  view.setUint32(4, 36 + length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, length * 2, true);

  let offset = 44;
  for (let i = 0; i < length; i += 1) {
    const sample = Math.max(-1, Math.min(1, channels[0][i]));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    offset += 2;
  }

  return new Blob([view], { type: "audio/wav" });
}

async function encodeRecordingToWav(webmBlob) {
  const arrayBuffer = await webmBlob.arrayBuffer();
  const audioContext = new AudioContext();
  const decoded = await audioContext.decodeAudioData(arrayBuffer);
  const wavBlob = audioBufferToWav(decoded);
  await audioContext.close();
  return wavBlob;
}

async function analyzeBlob(blob, sourceType, filename) {
  const analysisRunId = ++state.analysisRunId;
  const formData = new FormData();
  formData.append("audio", blob, filename);
  formData.append("source_type", sourceType);

  const data = await api("/api/analyze", { method: "POST", body: formData });
  if (analysisRunId !== state.analysisRunId) return null;
  renderResult(data.result);
  await loadSessions();
  switchView("reports");
  return data.result;
}

async function startRecording() {
  if (state.isAnalyzing || (state.recorder && state.recorder.state !== "inactive")) {
    showToast(t("analysisBusy"));
    return;
  }

  try {
    const recordingRunId = ++state.recordingRunId;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = [];
    const recorder = new MediaRecorder(stream);
    state.stream = stream;
    state.chunks = chunks;
    state.recorder = recorder;
    state.recordingStartedAt = Date.now();
    resetLiveResult();
    els.startRecording.disabled = true;
    els.stopRecording.disabled = false;
    els.recordState.textContent = t("recording");
    els.recordOrb.classList.add("is-recording");
    els.liveWave.classList.add("is-active");
    state.timerInterval = setInterval(updateRecordingTimer, 250);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    recorder.onstop = async () => {
      if (recordingRunId !== state.recordingRunId) return;
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      els.recordOrb.classList.remove("is-recording");
      els.recordOrb.classList.add("is-processing");
      els.liveWave.classList.remove("is-active");
      els.recordState.textContent = t("converting");
      els.stopRecording.disabled = true;
      setAnalysisLoading(true, t("converting"));

      try {
        const webmBlob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        if (!webmBlob.size) throw new Error("Rekaman audio kosong. Silakan rekam ulang.");
        const wavBlob = await encodeRecordingToWav(webmBlob);
        els.recordState.textContent = t("processing");
        setAnalysisLoading(true, t("analysisDetail"));
        await analyzeBlob(wavBlob, "microphone", "microphone-recording.wav");
        els.recordState.textContent = t("completed");
      } catch (error) {
        setAnalysisLoading(false);
        showToast(error.message);
        els.recordState.textContent = error.message;
        resetLiveResult();
        els.resultRecommendation.textContent = error.message;
      } finally {
        els.startRecording.disabled = false;
        els.recordOrb.classList.remove("is-processing");
        stream.getTracks().forEach((track) => track.stop());
        if (state.recorder === recorder) state.recorder = null;
        if (state.stream === stream) state.stream = null;
      }
    };

    recorder.start();
  } catch (error) {
    showToast(`Microphone unavailable: ${error.message}`);
  }
}

function stopRecording() {
  if (state.recorder && state.recorder.state !== "inactive") {
    els.stopRecording.disabled = true;
    state.recorder.stop();
  }
}

function updateRecordingTimer() {
  const elapsed = Math.floor((Date.now() - state.recordingStartedAt) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  els.recordTimer.textContent = `${minutes}:${seconds}`;
}

async function handleUpload(file) {
  if (!file) return;
  if (state.isAnalyzing) {
    showToast(t("analysisBusy"));
    return;
  }
  resetLiveResult();
  els.uploadFileName.textContent = file.name;
  setAnalysisLoading(true, t("uploadProcessing"));
  els.uploadState.textContent = t("uploadProcessing");
  try {
    await analyzeBlob(file, "upload", file.name);
    els.uploadState.textContent = `${file.name} analyzed.`;
  } catch (error) {
    setAnalysisLoading(false);
    els.uploadState.textContent = error.message;
    showToast(error.message);
  } finally {
    els.audioUpload.value = "";
  }
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("voGuardDashboardLanguage", lang);
  document.documentElement.lang = lang;
  applyStaticTranslations();
  document.querySelectorAll(".language-toggle [data-lang]").forEach((item) => {
    item.classList.toggle("active", item.dataset.lang === lang);
  });
  els.healthStatus.textContent = els.healthStatus.textContent.includes("API") ? t("apiReady") : els.healthStatus.textContent;
  const isRecording = state.recorder && state.recorder.state === "recording";
  if (state.isAnalyzing) {
    els.recordState.textContent = t("processing");
    els.analysisLoaderTitle.textContent = t("analysisTitle");
    els.analysisLoaderText.textContent = t("analysisDetail");
  } else if (isRecording) {
    els.recordState.textContent = t("recording");
    els.resultLevel.textContent = t("newSample");
    els.resultRecommendation.textContent = t("waitingForStop");
  } else {
    els.recordState.textContent = t("idle");
    if (!state.hasLiveResult) {
      els.resultLevel.textContent = t("awaitingSample");
      els.resultRecommendation.textContent = t("resultsPending");
    }
  }
  if (!state.latest) {
    els.uploadState.textContent = t("uploadReady");
  }
}

function initMotion() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(".sidebar", { opacity: 0, x: -26 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
  gsap.fromTo(".topbar", { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
  gsap.fromTo(".hero-copy > *, .hero-media", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1, stagger: 0.09, ease: "power3.out" });

  gsap.utils.toArray(".metric-card, .command-card, .call-preview-card, .record-card, .result-card, .chart-card, .call-card, .upload-file-card, .upload-signal-card, .call-score-panel").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { rotateY: x * 3, rotateX: -y * 3, scale: 1.01, duration: 0.35, ease: "power2.out" });
    });
    card.addEventListener("pointerleave", () => gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: "power2.out" }));
  });

  gsap.utils.toArray(".section-heading p, .dataset-panel p").forEach((paragraph) => {
    const words = paragraph.textContent.trim().split(/\s+/);
    paragraph.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(" ");
    gsap.fromTo(
      paragraph.querySelectorAll(".word"),
      { opacity: 0.18 },
      { opacity: 1, stagger: 0.035, ease: "none", scrollTrigger: { trigger: paragraph, start: "top 78%", end: "bottom 50%", scrub: true } }
    );
  });
}

els.navButtons.forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.viewLink));
});

els.languageToggle.addEventListener("click", (event) => {
  const lang = event.target.closest("[data-lang]")?.dataset.lang || (state.lang === "id" ? "en" : "id");
  setLanguage(lang);
});

els.startRecording.addEventListener("click", startRecording);
els.stopRecording.addEventListener("click", stopRecording);
els.audioUpload.addEventListener("change", (event) => handleUpload(event.target.files[0]));

["dragenter", "dragover"].forEach((name) => {
  els.uploadZone.addEventListener(name, (event) => {
    event.preventDefault();
    els.uploadZone.classList.add("is-dragging");
  });
});

["dragleave", "drop"].forEach((name) => {
  els.uploadZone.addEventListener(name, (event) => {
    event.preventDefault();
    els.uploadZone.classList.remove("is-dragging");
  });
});

els.uploadZone.addEventListener("drop", (event) => handleUpload(event.dataTransfer.files[0]));

els.sessionTable.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-session-id]");
  if (!button) return;
  const data = await api(`/api/sessions/${button.dataset.sessionId}`);
  renderResult(data.session);
  switchView("reports");
});

els.downloadReport.addEventListener("click", () => {
  if (!state.latest) return;
  window.location.href = `/api/report/${state.latest.session_id}`;
});

setLanguage(state.lang);
checkHealth();
loadSessions({ hydrateLatest: true }).catch((error) => showToast(error.message));
initMotion();
