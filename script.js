const phraseSets = [
  {
    id: "Ulangi: aman tujuh biru",
    en: "Repeat: safe seven blue"
  },
  {
    id: "Sebutkan: verifikasi suara pagi",
    en: "Say: morning voice verification"
  },
  {
    id: "Ulangi: kode integritas empat",
    en: "Repeat: integrity code four"
  },
  {
    id: "Sebutkan: transaksi aman sekarang",
    en: "Say: secure transaction now"
  }
];

const scenarioSets = [
  {
    statusKey: "riskLow",
    score: 18,
    stateKey: "demoLowState",
    checks: []
  },
  {
    statusKey: "riskMedium",
    score: 52,
    stateKey: "demoMediumState",
    checks: ["jitter", "pitch"]
  },
  {
    statusKey: "riskHigh",
    score: 81,
    stateKey: "demoHighState",
    checks: ["jitter", "pitch", "spectral"]
  }
];

const translations = {
  id: {
    pageTitle: "VoGuard | Integritas Suara Real-Time",
    metaDescription: "VoGuard adalah lapisan integritas suara siap paten untuk panggilan enterprise berisiko tinggi.",
    navProduct: "Produk",
    navTechnology: "Teknologi",
    navUseCases: "Use Case",
    navDemo: "Live Demo",
    navSecurity: "Keamanan",
    navContact: "Kontak",
    requestDemo: "Minta Demo",
    heroEyebrow: "Proteksi integritas suara real-time untuk panggilan bernilai tinggi.",
    heroTitle: "Deteksi Manipulasi Suara Real-Time untuk Panggilan Bernilai Tinggi",
    heroSupport: "Deteksi manipulasi suara untuk panggilan berisiko tinggi",
    heroBody: "VoGuard menganalisis anomali sinyal audio, respons terhadap tantangan acak, dan pola kealamian suara untuk membantu bank, contact center, dan platform VoIP mengurangi risiko penipuan berbasis suara.",
    tryDetection: "Coba Deteksi Langsung",
    enterpriseDemo: "Minta Demo Enterprise",
    panelLive: "Integritas Panggilan Live",
    panelRisk: "Potensi Manipulasi Suara",
    panelScore: "Skor risiko manipulasi",
    detectedSignal: "Sinyal terdeteksi",
    microJitter: "Micro-jitter",
    pitchDiscontinuity: "Diskontinuitas pitch",
    spectralArtifact: "Artefak spektral",
    randomChallenge: "Frasa tantangan acak",
    heroChallenge: "“Ulangi: verifikasi tujuh biru”",
    responseTimer: "Timer respons:",
    problemTitle: "Voice Fraud Makin <span class=\"inline-image image-bank\"></span> Sulit Didengar",
    problemBody: "Telinga manusia tidak lagi cukup untuk menilai apakah suara benar-benar alami.",
    aiVoiceCloning: "AI Voice Cloning",
    aiVoiceCloningBody: "Suara sintetis dapat terdengar natural, terutama pada panggilan singkat dan bernilai tinggi.",
    voiceChangerAbuse: "Penyalahgunaan Voice Changer",
    voiceChangerBody: "Manipulasi pitch, timbre, dan karakter suara dapat menyamarkan identitas serta niat penipu.",
    replayAttack: "Replay Attack",
    replayAttackBody: "Cuplikan audio lama dapat diputar ulang untuk melewati verifikasi manual yang bergantung pada pendengaran.",
    solutionKicker: "Lapisan baru untuk integritas suara",
    passiveAnalysis: "Analisis Sinyal Pasif",
    passiveAnalysisBody: "Analisis multi-parameter membaca micro-latency, jitter, pitch continuity, dan spectral consistency tanpa mengganggu percakapan.",
    dynamicChallenge: "Dynamic Challenge Response",
    dynamicChallengeBody: "Tantangan verbal acak dibuat per sesi, lalu responsnya dibandingkan dengan sinyal sebelum tantangan.",
    riskMitigation: "Mitigasi Berbasis Risiko",
    riskMitigationBody: "Risiko rendah untuk logging, risiko sedang untuk peringatan operator, risiko tinggi untuk verifikasi manual.",
    newCallers: "Bekerja untuk Penelepon Baru",
    newCallersBody: "Fokus pada integritas suara, bukan hanya identitas pembicara, sehingga dapat mendukung alur tanpa enrollment wajib.",
    forensicTrail: "Jejak Sinyal Siap Forensik",
    forensicTrailBody: "Indikasi risiko, skor manipulasi, checklist anomali, dan log audit dikemas untuk workflow keamanan enterprise.",
    flowTitle: "Cara VoGuard Membaca Panggilan Berisiko Tinggi",
    flowBody: "Audio masuk dianalisis secara pasif, diuji dengan tantangan dinamis saat dibutuhkan, lalu diterjemahkan menjadi keputusan risiko yang bisa ditindaklanjuti.",
    flowAudio: "Input Audio",
    flowSignal: "Analisis Sinyal",
    flowChallenge: "Tantangan Dinamis",
    flowResponse: "Evaluasi Respons",
    flowDecision: "Keputusan Risiko",
    flowMitigation: "Mitigasi",
    techTitle: "Dibangun di Atas Analisis Integritas Suara Multi-Sinyal",
    techBody: "Sistem membaca beberapa petunjuk akustik sekaligus, lalu menilai apakah panggilan menunjukkan indikasi manipulasi suara digital.",
    microLatency: "Anomali Micro-Latency",
    microLatencyBody: "Mendeteksi ketidakteraturan timing yang dapat muncul ketika audio dirutekan melalui software manipulasi.",
    pitchContinuity: "Kontinuitas Pitch",
    pitchContinuityBody: "Melacak transisi pitch mendadak yang jarang terjadi pada ucapan alami dalam panggilan berkelanjutan.",
    spectralConsistency: "Konsistensi Spektral",
    spectralConsistencyBody: "Mengevaluasi pola energi spektral untuk menemukan artefak dari pemrosesan sintetis dan sumber replay.",
    demoKicker: "Simulasi Prototipe Interaktif",
    demoTitle: "Rasakan Analisis Risiko Suara Real-Time",
    demoBody: "Simulasi frontend ini memperlihatkan bagaimana indikasi risiko, challenge response, dan anomaly checklist dapat muncul di workflow operator. Ini bukan klaim akurasi produksi.",
    startMic: "Mulai Mikrofon",
    analyzingCall: "Menganalisis Panggilan",
    runAgain: "Jalankan Lagi",
    demoReady: "Siap mensimulasikan pemeriksaan integritas panggilan berisiko tinggi.",
    demoListening: "Mendengarkan kontinuitas sinyal dan membuat challenge response...",
    demoLowState: "Tidak ada indikasi manipulasi kuat yang terdeteksi dalam simulasi ini.",
    demoMediumState: "Peringatan operator disarankan berdasarkan sinyal integritas suara campuran.",
    demoHighState: "Verifikasi manual disarankan karena ada beberapa indikator manipulasi.",
    challengePhraseLabel: "Frasa tantangan",
    challengeInitial: "Tekan suara pada kata “aman tujuh”",
    responseTimerLabel: "Timer respons",
    riskStatusLabel: "Status risiko",
    riskAwaiting: "Menunggu sampel",
    riskAnalyzing: "Menganalisis",
    riskLow: "Risiko Rendah",
    riskMedium: "Risiko Sedang",
    riskHigh: "Risiko Tinggi",
    manipulationScore: "Skor manipulasi",
    jitterCheck: "Indikasi micro-jitter",
    pitchCheck: "Diskontinuitas pitch",
    spectralCheck: "Artefak spektral",
    useCasesTitle: "Dirancang untuk Lingkungan Suara Berkepercayaan Tinggi",
    useCasesBody: "Untuk organisasi di mana satu panggilan suara dapat menyetujui perpindahan dana, akses akun, atau keputusan sensitif.",
    bankingUse: "Verifikasi Panggilan Perbankan",
    bankingUseBody: "Indikasi risiko saat pemulihan akun, konfirmasi pinjaman, dan persetujuan transaksi bernilai tinggi.",
    contactUse: "Pencegahan Fraud Contact Center",
    contactUseBody: "Peringatan operator saat sinyal integritas suara penelepon menjadi mencurigakan.",
    voipUse: "Lapisan Keamanan VoIP",
    voipUseBody: "Screening risiko suara siap API untuk platform yang membawa komunikasi teregulasi.",
    enterpriseUse: "Panggilan Persetujuan Enterprise",
    enterpriseUseBody: "Jaminan tambahan untuk approval jarak jauh dan instruksi suara eksekutif.",
    comparisonTitle: "Melampaui Voice Biometrics Tradisional",
    comparisonBody: "VoGuard melengkapi workflow identitas dengan memeriksa apakah stream suara tampak dimanipulasi, sintetis, direkam ulang, atau diproses digital.",
    traditionalBiometrics: "Voice Biometrics Tradisional",
    traditionalEnrollment: "Membutuhkan enrollment suara",
    traditionalIdentity: "Fokus pada identitas pembicara",
    traditionalPassive: "Verifikasi pasif",
    traditionalProfile: "Bergantung pada profil pengguna tersimpan",
    vocaEnrollment: "Tidak wajib voiceprint enrollment",
    vocaIntegrity: "Fokus pada integritas suara",
    vocaVerification: "Verifikasi pasif plus aktif",
    vocaNewCallers: "Bekerja untuk penelepon baru",
    vocaMitigation: "Menghasilkan mitigasi berbasis risiko",
    edgeReady: "Siap edge deployment",
    forensicLogs: "Log forensik",
    riskWorkflow: "Workflow skor risiko",
    securityTitle: "Keamanan Tanpa Ketergantungan Voiceprint Permanen",
    securityBody: "Dirancang untuk mengurangi ketergantungan pada profil biometrik suara permanen, dengan opsi edge atau on-premise deployment untuk kebutuhan enterprise.",
    securityAudit: "Skor risiko dan log forensik untuk audit trail.",
    securityWarning: "Level peringatan untuk operator agar mitigasi lebih praktis.",
    securityArchitecture: "Arsitektur yang sesuai untuk workflow keamanan enterprise.",
    architectureTitle: "Arsitektur Integritas Suara Siap Paten",
    architectureBody: "Jalur modular yang jelas dari live audio stream menuju decision engine dan mitigation layer.",
    archAudio: "Stream Audio",
    archSignal: "Analisis Sinyal",
    archChallenge: "Challenge Engine",
    archResponse: "Evaluasi Respons",
    archDecision: "Decision Engine",
    archMitigation: "Mitigation Layer",
    banks: "Bank",
    contactCenters: "Contact Center",
    voipPlatforms: "Platform VoIP",
    investorDiligence: "Diligence Investor",
    enterpriseSecurity: "Keamanan Enterprise",
    fraudTeams: "Tim Fraud",
    riskIndication: "Indikasi Risiko",
    challengeResponse: "Challenge Response",
    signalIntegrity: "Integritas Sinyal",
    manualVerification: "Verifikasi Manual",
    operatorWarning: "Peringatan Operator",
    finalTitle: "Amankan Generasi Berikutnya Transaksi Suara",
    finalBody: "Bermitra dengan VoGuard untuk mengeksplorasi deteksi fraud suara real-time bagi perbankan, contact center, dan komunikasi enterprise.",
    discussPartnership: "Diskusikan Kemitraan",
    footerBody: "Prototipe siap paten / Teknologi berbasis riset"
  },
  en: {
    pageTitle: "VoGuard | Real-Time Voice Integrity",
    metaDescription: "VoGuard is a patent-ready voice integrity layer for high-risk enterprise calls.",
    navProduct: "Product",
    navTechnology: "Technology",
    navUseCases: "Use Cases",
    navDemo: "Live Demo",
    navSecurity: "Security",
    navContact: "Contact",
    requestDemo: "Request Demo",
    heroEyebrow: "Real-time voice integrity protection for high-value calls.",
    heroTitle: "Real-Time Voice Manipulation Detection for High-Risk Calls",
    heroSupport: "Real-time voice manipulation detection for high-risk calls",
    heroBody: "VoGuard analyzes audio-signal anomalies, responses to randomized challenges, and natural speech patterns to help banks, contact centers, and VoIP platforms reduce voice-fraud risk.",
    tryDetection: "Try Live Detection",
    enterpriseDemo: "Request Enterprise Demo",
    panelLive: "Live Call Integrity",
    panelRisk: "Potential Voice Manipulation",
    panelScore: "Manipulation risk score",
    detectedSignal: "Detected signal",
    microJitter: "Micro-jitter",
    pitchDiscontinuity: "Pitch discontinuity",
    spectralArtifact: "Spectral artifact",
    randomChallenge: "Random challenge phrase",
    heroChallenge: "“Repeat: verification seven blue”",
    responseTimer: "Response timer:",
    problemTitle: "Voice Fraud Is Becoming <span class=\"inline-image image-bank\"></span> Harder to Hear",
    problemBody: "Human ears are no longer enough to judge whether a voice is truly natural.",
    aiVoiceCloning: "AI Voice Cloning",
    aiVoiceCloningBody: "Synthetic voices can sound natural, especially in short, high-value calls.",
    voiceChangerAbuse: "Voice Changer Abuse",
    voiceChangerBody: "Pitch, timbre, and vocal-character manipulation can disguise a fraudster's identity and intent.",
    replayAttack: "Replay Attack",
    replayAttackBody: "Old audio snippets can be replayed to bypass manual verification that relies on human hearing.",
    solutionKicker: "A new layer of voice integrity",
    passiveAnalysis: "Passive Signal Analysis",
    passiveAnalysisBody: "Multi-parameter analysis reads micro-latency, jitter, pitch continuity, and spectral consistency without interrupting the conversation.",
    dynamicChallenge: "Dynamic Challenge Response",
    dynamicChallengeBody: "Random verbal challenges are created per session, then the response is compared with the signal before the challenge.",
    riskMitigation: "Risk-Based Mitigation",
    riskMitigationBody: "Low risk for logging, medium risk for operator warnings, and high risk for manual verification.",
    newCallers: "Works for New Callers",
    newCallersBody: "It focuses on voice integrity, not only speaker identity, so it can support flows without mandatory enrollment.",
    forensicTrail: "Forensic-Ready Signal Trail",
    forensicTrailBody: "Risk indication, manipulation score, anomaly checklist, and audit logs are packaged for enterprise security workflows.",
    flowTitle: "How VoGuard Reads a High-Risk Call",
    flowBody: "Incoming audio is analyzed passively, tested with a dynamic challenge when needed, then translated into an actionable risk decision.",
    flowAudio: "Audio Input",
    flowSignal: "Signal Analysis",
    flowChallenge: "Dynamic Challenge",
    flowResponse: "Response Evaluation",
    flowDecision: "Risk Decision",
    flowMitigation: "Mitigation",
    techTitle: "Built on Multi-Signal Voice Integrity Analysis",
    techBody: "The system reads several acoustic signals at once, then evaluates whether the call shows signs of digital voice manipulation.",
    microLatency: "Micro-Latency Anomaly",
    microLatencyBody: "Detects timing irregularities that may appear when audio is routed through manipulation software.",
    pitchContinuity: "Pitch Continuity",
    pitchContinuityBody: "Tracks abrupt pitch transitions that are uncommon in natural speech during a continuous call.",
    spectralConsistency: "Spectral Consistency",
    spectralConsistencyBody: "Evaluates spectral energy patterns for artifacts created by synthetic processing and replay sources.",
    demoKicker: "Interactive Prototype Simulation",
    demoTitle: "Experience Real-Time Voice Risk Analysis",
    demoBody: "This frontend simulation shows how risk indication, challenge response, and anomaly checklists can appear in an operator workflow. It is not a production accuracy claim.",
    startMic: "Start Microphone",
    analyzingCall: "Analyzing Call",
    runAgain: "Run Again",
    demoReady: "Ready to simulate a high-risk call integrity check.",
    demoListening: "Listening to signal continuity and generating challenge response...",
    demoLowState: "No strong manipulation indication detected in this simulation.",
    demoMediumState: "Operator warning suggested based on mixed voice integrity signals.",
    demoHighState: "Manual verification suggested due to multiple manipulation indicators.",
    challengePhraseLabel: "Challenge phrase",
    challengeInitial: "Press voice on the phrase “safe seven”",
    responseTimerLabel: "Response timer",
    riskStatusLabel: "Risk status",
    riskAwaiting: "Awaiting sample",
    riskAnalyzing: "Analyzing",
    riskLow: "Low Risk",
    riskMedium: "Medium Risk",
    riskHigh: "High Risk",
    manipulationScore: "Manipulation score",
    jitterCheck: "Micro-jitter indication",
    pitchCheck: "Pitch discontinuity",
    spectralCheck: "Spectral artifact",
    useCasesTitle: "Designed for High-Trust Voice Environments",
    useCasesBody: "For organizations where a single voice call can approve money movement, account access, or sensitive decisions.",
    bankingUse: "Banking Call Verification",
    bankingUseBody: "Risk indication during account recovery, loan confirmation, and high-value transaction approval.",
    contactUse: "Contact Center Fraud Prevention",
    contactUseBody: "Operator warnings when a caller's voice integrity signal becomes suspicious.",
    voipUse: "VoIP Security Layer",
    voipUseBody: "API-ready voice risk screening for platforms that carry regulated communication.",
    enterpriseUse: "Enterprise Approval Calls",
    enterpriseUseBody: "Additional assurance for remote approvals and executive voice instructions.",
    comparisonTitle: "Beyond Traditional Voice Biometrics",
    comparisonBody: "VoGuard complements identity workflows by checking whether a voice stream appears manipulated, synthetic, replayed, or digitally processed.",
    traditionalBiometrics: "Traditional Voice Biometrics",
    traditionalEnrollment: "Requires voice enrollment",
    traditionalIdentity: "Focuses on speaker identity",
    traditionalPassive: "Passive verification",
    traditionalProfile: "Depends on stored user profile",
    vocaEnrollment: "No mandatory voiceprint enrollment",
    vocaIntegrity: "Focuses on voice integrity",
    vocaVerification: "Passive plus active verification",
    vocaNewCallers: "Works for new callers",
    vocaMitigation: "Produces risk-based mitigation",
    edgeReady: "Edge deployment ready",
    forensicLogs: "Forensic logs",
    riskWorkflow: "Risk score workflow",
    securityTitle: "Security Without Permanent Voiceprint Dependency",
    securityBody: "Designed to reduce dependency on permanent voice-biometric profiles, with edge or on-premise deployment options for enterprise needs.",
    securityAudit: "Risk score and forensic logs for audit trails.",
    securityWarning: "Operator-facing warning levels for practical mitigation.",
    securityArchitecture: "Architecture suitable for enterprise security workflows.",
    architectureTitle: "Patent-Ready Voice Integrity Architecture",
    architectureBody: "A clear modular path from live audio stream to decision engine and mitigation layer.",
    archAudio: "Audio Stream",
    archSignal: "Signal Analysis",
    archChallenge: "Challenge Engine",
    archResponse: "Response Evaluation",
    archDecision: "Decision Engine",
    archMitigation: "Mitigation Layer",
    banks: "Banks",
    contactCenters: "Contact Centers",
    voipPlatforms: "VoIP Platforms",
    investorDiligence: "Investor Diligence",
    enterpriseSecurity: "Enterprise Security",
    fraudTeams: "Fraud Teams",
    riskIndication: "Risk Indication",
    challengeResponse: "Challenge Response",
    signalIntegrity: "Signal Integrity",
    manualVerification: "Manual Verification",
    operatorWarning: "Operator Warning",
    finalTitle: "Secure the Next Generation of Voice Transactions",
    finalBody: "Partner with VoGuard to explore real-time voice fraud detection for banking, contact center, and enterprise communication.",
    discussPartnership: "Discuss Partnership",
    footerBody: "Patent-ready prototype / Research-based technology"
  }
};

const startDemo = document.querySelector("#startDemo");
const demoState = document.querySelector("#demoState");
const challengePhrase = document.querySelector("#challengePhrase");
const timer = document.querySelector("#timer");
const riskStatus = document.querySelector("#riskStatus");
const score = document.querySelector("#score");
const scoreFill = document.querySelector("#scoreFill");
const anomalyItems = document.querySelectorAll(".anomaly-list li");
const accordionItems = document.querySelectorAll(".accordion-item");
const languageToggle = document.querySelector(".language-toggle");
const languageOptions = document.querySelectorAll(".language-toggle [data-lang]");
const siteLoader = document.querySelector("#siteLoader");
const loaderCanvas = document.querySelector("#loaderCanvas");
const loaderProgress = document.querySelector("#loaderProgress");
const loaderPercent = document.querySelector("#loaderPercent");

let activeLanguage = localStorage.getItem("voGuardLanguage") || "id";
let demoButtonKey = "startMic";
let demoStateKey = "demoReady";
let riskStatusKey = "riskAwaiting";
let activePhrase = null;
let demoHasRun = false;
let demoRunning = false;
let pageAnimationsStarted = false;

const textBindings = [
  [".nav-links a:nth-child(1), .footer-links a:nth-child(1)", "navProduct"],
  [".nav-links a:nth-child(2), .footer-links a:nth-child(2)", "navTechnology"],
  [".nav-links a:nth-child(3), .footer-links a:nth-child(3)", "navUseCases"],
  [".nav-links a:nth-child(4)", "navDemo"],
  [".nav-links a:nth-child(5), .footer-links a:nth-child(4)", "navSecurity"],
  [".nav-links a:nth-child(6), .footer-links a:nth-child(5)", "navContact"],
  [".nav-cta", "requestDemo"],
  [".hero-copy .eyebrow", "heroEyebrow"],
  [".hero-copy h1", "heroTitle"],
  [".hero-support", "heroSupport"],
  [".hero-body", "heroBody"],
  [".hero-buttons .button-primary[href='/dashboard']", "tryDetection"],
  [".hero-buttons .button-secondary[href='#contact']", "enterpriseDemo"],
  [".panel-topline span", "panelLive"],
  [".panel-topline strong", "panelRisk"],
  [".risk-orbit small", "panelScore"],
  [".signal-grid div:nth-child(1) small, .signal-grid div:nth-child(2) small, .signal-grid div:nth-child(3) small", "detectedSignal"],
  [".signal-grid div:nth-child(1) strong", "microJitter"],
  [".signal-grid div:nth-child(2) strong", "pitchDiscontinuity"],
  [".signal-grid div:nth-child(3) strong", "spectralArtifact"],
  [".challenge-card span", "randomChallenge"],
  [".challenge-card strong", "heroChallenge"],
  [".problem .wide-heading h2", "problemTitle", true],
  [".problem .wide-heading p", "problemBody"],
  [".problem-grid article:nth-child(1) h3", "aiVoiceCloning"],
  [".problem-grid article:nth-child(1) p", "aiVoiceCloningBody"],
  [".problem-grid article:nth-child(2) h3", "voiceChangerAbuse"],
  [".problem-grid article:nth-child(2) p", "voiceChangerBody"],
  [".problem-grid article:nth-child(3) h3", "replayAttack"],
  [".problem-grid article:nth-child(3) p", "replayAttackBody"],
  [".solution .section-kicker", "solutionKicker"],
  [".bento-grid article:nth-child(1) h2", "passiveAnalysis"],
  [".bento-grid article:nth-child(1) p", "passiveAnalysisBody"],
  [".bento-grid article:nth-child(2) h3", "dynamicChallenge"],
  [".bento-grid article:nth-child(2) p", "dynamicChallengeBody"],
  [".bento-grid article:nth-child(3) h3", "riskMitigation"],
  [".bento-grid article:nth-child(3) p", "riskMitigationBody"],
  [".bento-grid article:nth-child(4) h3", "newCallers"],
  [".bento-grid article:nth-child(4) p", "newCallersBody"],
  [".bento-grid article:nth-child(5) h3", "forensicTrail"],
  [".bento-grid article:nth-child(5) p", "forensicTrailBody"],
  [".flow-copy h2", "flowTitle"],
  [".flow-copy p", "flowBody"],
  [".flow-strip div:nth-child(1)", "flowAudio"],
  [".flow-strip div:nth-child(2)", "flowSignal"],
  [".flow-strip div:nth-child(3)", "flowChallenge"],
  [".flow-strip div:nth-child(4)", "flowResponse"],
  [".flow-strip div:nth-child(5)", "flowDecision"],
  [".flow-strip div:nth-child(6)", "flowMitigation"],
  [".pin-copy h2", "techTitle"],
  [".pin-copy p", "techBody"],
  [".pin-cards article:nth-child(1) h3", "microLatency"],
  [".pin-cards article:nth-child(1) p", "microLatencyBody"],
  [".pin-cards article:nth-child(2) h3", "pitchContinuity"],
  [".pin-cards article:nth-child(2) p", "pitchContinuityBody"],
  [".pin-cards article:nth-child(3) h3", "spectralConsistency"],
  [".pin-cards article:nth-child(3) p", "spectralConsistencyBody"],
  [".demo-heading .section-kicker", "demoKicker"],
  [".demo-heading h2", "demoTitle"],
  [".demo-heading p", "demoBody"],
  [".demo-readout > div:nth-child(1) span", "challengePhraseLabel"],
  [".demo-readout > div:nth-child(2) span", "responseTimerLabel"],
  [".demo-readout > div:nth-child(3) span", "riskStatusLabel"],
  [".risk-panel > span", "manipulationScore"],
  [".anomaly-list li[data-check='jitter']", "jitterCheck"],
  [".anomaly-list li[data-check='pitch']", "pitchCheck"],
  [".anomaly-list li[data-check='spectral']", "spectralCheck"],
  [".use-cases .wide-heading h2", "useCasesTitle"],
  [".use-cases .wide-heading p", "useCasesBody"],
  [".accordion-row article:nth-child(1) span", "bankingUse"],
  [".accordion-row article:nth-child(1) p", "bankingUseBody"],
  [".accordion-row article:nth-child(2) span", "contactUse"],
  [".accordion-row article:nth-child(2) p", "contactUseBody"],
  [".accordion-row article:nth-child(3) span", "voipUse"],
  [".accordion-row article:nth-child(3) p", "voipUseBody"],
  [".accordion-row article:nth-child(4) span", "enterpriseUse"],
  [".accordion-row article:nth-child(4) p", "enterpriseUseBody"],
  [".comparison-copy h2", "comparisonTitle"],
  [".comparison-copy p", "comparisonBody"],
  [".comparison-grid article:nth-child(1) h3", "traditionalBiometrics"],
  [".comparison-grid article:nth-child(1) li:nth-child(1)", "traditionalEnrollment"],
  [".comparison-grid article:nth-child(1) li:nth-child(2)", "traditionalIdentity"],
  [".comparison-grid article:nth-child(1) li:nth-child(3)", "traditionalPassive"],
  [".comparison-grid article:nth-child(1) li:nth-child(4)", "traditionalProfile"],
  [".comparison-grid article:nth-child(2) li:nth-child(1)", "vocaEnrollment"],
  [".comparison-grid article:nth-child(2) li:nth-child(2)", "vocaIntegrity"],
  [".comparison-grid article:nth-child(2) li:nth-child(3)", "vocaVerification"],
  [".comparison-grid article:nth-child(2) li:nth-child(4)", "vocaNewCallers"],
  [".comparison-grid article:nth-child(2) li:nth-child(5)", "vocaMitigation"],
  [".privacy-visual .glass-chip:nth-child(1)", "edgeReady"],
  [".privacy-visual .glass-chip:nth-child(2)", "forensicLogs"],
  [".privacy-visual .glass-chip:nth-child(3)", "riskWorkflow"],
  [".privacy-copy h2", "securityTitle"],
  [".privacy-copy p", "securityBody"],
  [".privacy-copy li:nth-child(1)", "securityAudit"],
  [".privacy-copy li:nth-child(2)", "securityWarning"],
  [".privacy-copy li:nth-child(3)", "securityArchitecture"],
  [".architecture .wide-heading h2", "architectureTitle"],
  [".architecture .wide-heading p", "architectureBody"],
  [".architecture-diagram div:nth-child(1)", "archAudio"],
  [".architecture-diagram div:nth-child(2)", "archSignal"],
  [".architecture-diagram div:nth-child(3)", "archChallenge"],
  [".architecture-diagram div:nth-child(4)", "archResponse"],
  [".architecture-diagram div:nth-child(5)", "archDecision"],
  [".architecture-diagram div:nth-child(6)", "archMitigation"],
  [".marquee-track:nth-child(1) span:nth-child(1)", "banks"],
  [".marquee-track:nth-child(1) span:nth-child(2)", "contactCenters"],
  [".marquee-track:nth-child(1) span:nth-child(3)", "voipPlatforms"],
  [".marquee-track:nth-child(1) span:nth-child(4)", "investorDiligence"],
  [".marquee-track:nth-child(1) span:nth-child(5)", "enterpriseSecurity"],
  [".marquee-track:nth-child(1) span:nth-child(6)", "fraudTeams"],
  [".marquee-track:nth-child(2) span:nth-child(1)", "riskIndication"],
  [".marquee-track:nth-child(2) span:nth-child(2)", "challengeResponse"],
  [".marquee-track:nth-child(2) span:nth-child(3)", "signalIntegrity"],
  [".marquee-track:nth-child(2) span:nth-child(4)", "forensicLogs"],
  [".marquee-track:nth-child(2) span:nth-child(5)", "manualVerification"],
  [".marquee-track:nth-child(2) span:nth-child(6)", "operatorWarning"],
  [".final-cta h2", "finalTitle"],
  [".final-cta p", "finalBody"],
  [".final-cta .button-primary", "requestDemo"],
  [".final-cta .button-secondary", "discussPartnership"],
  [".site-footer p", "footerBody"]
];

function getText(key) {
  return translations[activeLanguage][key];
}

function updateBoundText() {
  textBindings.forEach(([selector, key, useHtml]) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (useHtml) {
        element.innerHTML = getText(key);
      } else {
        element.textContent = getText(key);
      }
    });
  });

  document.querySelectorAll(".challenge-card small").forEach((element) => {
    element.innerHTML = `${getText("responseTimer")} <b>02.8s</b>`;
  });
}

function updateDemoText() {
  startDemo.textContent = getText(demoButtonKey);
  demoState.textContent = getText(demoStateKey);
  riskStatus.textContent = getText(riskStatusKey);

  if (activePhrase) {
    challengePhrase.textContent = activePhrase[activeLanguage];
  } else if (!demoHasRun) {
    challengePhrase.textContent = getText("challengeInitial");
  }
}

function setLanguage(language) {
  activeLanguage = translations[language] ? language : "id";
  localStorage.setItem("voGuardLanguage", activeLanguage);
  document.documentElement.lang = activeLanguage;
  document.title = getText("pageTitle");

  const description = document.querySelector("meta[name='description']");
  if (description) description.setAttribute("content", getText("metaDescription"));

  languageOptions.forEach((option) => {
    const isActive = option.dataset.lang === activeLanguage;
    option.classList.toggle("active", isActive);
  });

  languageToggle.setAttribute(
    "aria-label",
    activeLanguage === "id" ? "Ganti bahasa ke Inggris" : "Switch language to Indonesian"
  );

  updateBoundText();
  updateDemoText();
}

function animateNumber(element, target, duration = 1200) {
  const start = Number(element.textContent) || 0;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(start + (target - start) * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function updateLoaderProgress(value) {
  const progress = Math.max(0, Math.min(100, Math.round(value)));
  if (loaderProgress) loaderProgress.style.width = `${progress}%`;
  if (loaderPercent) loaderPercent.textContent = `${progress}%`;
}

function createLoaderTextureData(label, color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <rect width="256" height="256" rx="38" fill="#f8fafc"/>
      <circle cx="128" cy="128" r="94" fill="none" stroke="${color}" stroke-width="9" opacity="0.86"/>
      <path d="M56 134 C82 86, 112 174, 136 120 S188 90, 204 128" fill="none" stroke="#0b0f19" stroke-width="8" stroke-linecap="round"/>
      <text x="128" y="220" text-anchor="middle" fill="#2563eb" font-family="Arial" font-size="22" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function initLoaderScene() {
  if (!window.THREE || !loaderCanvas) return null;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({
    canvas: loaderCanvas,
    alpha: true,
    antialias: true
  });

  const group = new THREE.Group();
  const ringGroup = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.38, 3),
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.12,
      roughness: 0.2,
      metalness: 0.18,
      transparent: true,
      opacity: 0.52,
      wireframe: true
    })
  );
  const innerCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.62, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x2563eb,
      emissiveIntensity: 0.22,
      roughness: 0.18,
      metalness: 0.06,
      transparent: true,
      opacity: 0.74
    })
  );
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.82, 0.016, 16, 160),
    new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.44
    })
  );
  const secondHalo = new THREE.Mesh(
    new THREE.TorusGeometry(2.1, 0.012, 16, 180),
    new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.38
    })
  );
  const thirdHalo = new THREE.Mesh(
    new THREE.TorusGeometry(1.5, 0.01, 16, 140),
    new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.34
    })
  );

  const waveformGroup = new THREE.Group();
  const waveformMaterial = new THREE.MeshBasicMaterial({
    color: 0x2563eb,
    transparent: true,
    opacity: 0.42
  });
  const waveformBars = Array.from({ length: 18 }, (_, index) => {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.38, 0.035), waveformMaterial);
    bar.position.set((index - 8.5) * 0.13, -1.68, 0);
    waveformGroup.add(bar);
    return bar;
  });

  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 120;
  const particlePositions = new Float32Array(particleCount * 3);

  for (let index = 0; index < particleCount; index += 1) {
    const radius = 2.2 + Math.random() * 2.5;
    const angle = Math.random() * Math.PI * 2;
    particlePositions[index * 3] = Math.cos(angle) * radius;
    particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 3.2;
    particlePositions[index * 3 + 2] = Math.sin(angle) * radius;
  }

  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x2563eb,
    size: 0.035,
    transparent: true,
    opacity: 0.32,
    depthWrite: false
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);

  camera.position.z = 5;
  secondHalo.rotation.x = Math.PI / 2;
  thirdHalo.rotation.y = Math.PI / 2.8;
  ringGroup.add(halo, secondHalo, thirdHalo);
  group.add(core, innerCore, ringGroup, waveformGroup);
  scene.add(group, particles);
  scene.add(new THREE.AmbientLight(0xffffff, 1.85));

  const pointLight = new THREE.PointLight(0x38bdf8, 2.8, 9);
  pointLight.position.set(2.6, 2.8, 3.4);
  scene.add(pointLight);

  function resizeLoader() {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  let frameId = 0;
  function renderLoader() {
    frameId = requestAnimationFrame(renderLoader);
    const time = performance.now() * 0.001;
    group.rotation.y += 0.011;
    core.rotation.x += 0.006;
    innerCore.scale.setScalar(1 + Math.sin(time * 2.4) * 0.055);
    ringGroup.rotation.x = Math.sin(time * 0.82) * 0.22;
    ringGroup.rotation.y += 0.004;
    halo.rotation.z += 0.018;
    secondHalo.rotation.z -= 0.014;
    thirdHalo.rotation.z += 0.02;
    particles.rotation.y -= 0.0016;
    particles.rotation.x = Math.sin(time * 0.34) * 0.08;
    waveformBars.forEach((bar, index) => {
      bar.scale.y = 0.62 + Math.sin(time * 4.2 + index * 0.66) * 0.46;
    });
    renderer.render(scene, camera);
  }

  resizeLoader();
  renderLoader();
  window.addEventListener("resize", resizeLoader);

  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener("resize", resizeLoader);
    core.geometry.dispose();
    core.material.dispose();
    innerCore.geometry.dispose();
    innerCore.material.dispose();
    halo.geometry.dispose();
    halo.material.dispose();
    secondHalo.geometry.dispose();
    secondHalo.material.dispose();
    thirdHalo.geometry.dispose();
    thirdHalo.material.dispose();
    waveformBars.forEach((bar) => bar.geometry.dispose());
    waveformMaterial.dispose();
    particleGeometry.dispose();
    particleMaterial.dispose();
    renderer.dispose();
  };
}

function revealInitialContent() {
  if (pageAnimationsStarted) return;
  pageAnimationsStarted = true;
  document.body.classList.remove("is-loading");
  document.body.classList.add("is-ready");

  const introTargets = ".hero-copy > *, .hero-visual, .site-footer";

  if (window.gsap) {
    gsap.set(".site-nav", { opacity: 0, y: 22, xPercent: -50 });
    gsap.to(".site-nav", {
      opacity: 1,
      y: 0,
      xPercent: -50,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "opacity,y",
      delay: 0.06
    });

    gsap.set(introTargets, { opacity: 0, y: 22 });
    gsap.to(introTargets, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      clearProps: "opacity,transform",
      delay: 0.08
    });
  } else {
    document.querySelectorAll(`.site-nav, ${introTargets}`).forEach((element, index) => {
      element.style.transition = "opacity 700ms ease, transform 700ms ease";
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, index * 80);
    });
  }

  initPageAnimations();
}

function completeLoader(disposeLoaderScene) {
  updateLoaderProgress(100);

  setTimeout(() => {
    if (siteLoader) siteLoader.classList.add("is-complete");
    revealInitialContent();

    setTimeout(() => {
      if (disposeLoaderScene) disposeLoaderScene();
      if (siteLoader) siteLoader.remove();
    }, 760);
  }, 360);
}

function startSiteLoader() {
  const startedAt = performance.now();
  const minimumDuration = 3200;
  const disposeLoaderScene = initLoaderScene();
  let completed = false;

  function finish() {
    if (completed) return;
    completed = true;

    const elapsed = performance.now() - startedAt;
    const remaining = Math.max(0, minimumDuration - elapsed);
    setTimeout(() => completeLoader(disposeLoaderScene), remaining);
  }

  if (window.THREE && siteLoader) {
    const manager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(manager);
    const textureUrls = [
      createLoaderTextureData("SIGNAL", "#06b6d4"),
      createLoaderTextureData("VOICE", "#2563eb"),
      createLoaderTextureData("RISK", "#10b981"),
      createLoaderTextureData("TRUST", "#2563eb"),
      createLoaderTextureData("CHECK", "#06b6d4")
    ];

    manager.onStart = () => updateLoaderProgress(8);
    manager.onProgress = (url, loaded, total) => {
      const progress = total > 0 ? (loaded / total) * 84 : loaded * 18;
      updateLoaderProgress(8 + progress);
    };
    manager.onLoad = finish;
    manager.onError = () => updateLoaderProgress(92);

    textureUrls.forEach((url) => {
      textureLoader.load(
        url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.dispose();
        },
        undefined,
        () => updateLoaderProgress(92)
      );
    });

    setTimeout(finish, 4600);
    return;
  }

  let simulatedProgress = 0;
  let interval;
  interval = setInterval(() => {
    simulatedProgress = Math.min(simulatedProgress + 4 + Math.random() * 8, 94);
    updateLoaderProgress(simulatedProgress);

    if (simulatedProgress >= 94) {
      clearInterval(interval);
      finish();
    }
  }, 190);
}

function runDemo() {
  const scenario = scenarioSets[Math.floor(Math.random() * scenarioSets.length)];
  activePhrase = phraseSets[Math.floor(Math.random() * phraseSets.length)];
  let tenths = 0;

  demoHasRun = true;
  demoRunning = true;
  demoButtonKey = "analyzingCall";
  demoStateKey = "demoListening";
  riskStatusKey = "riskAnalyzing";
  startDemo.disabled = true;
  scoreFill.style.width = "0%";
  animateNumber(score, 0, 300);
  anomalyItems.forEach((item) => item.classList.remove("active"));
  updateDemoText();

  const timerInterval = setInterval(() => {
    tenths += 1;
    timer.textContent = `0${Math.floor(tenths / 10)}.${tenths % 10}s`;
  }, 100);

  setTimeout(() => {
    clearInterval(timerInterval);
    timer.textContent = `${(1.8 + Math.random() * 1.7).toFixed(1)}s`;
    riskStatusKey = scenario.statusKey;
    demoStateKey = scenario.stateKey;
    demoButtonKey = "runAgain";
    scoreFill.style.width = `${scenario.score}%`;
    animateNumber(score, scenario.score, 1100);
    anomalyItems.forEach((item) => {
      if (scenario.checks.includes(item.dataset.check)) item.classList.add("active");
    });
    startDemo.disabled = false;
    demoRunning = false;
    updateDemoText();
  }, 2300);
}

languageToggle.addEventListener("click", (event) => {
  const requestedLanguage = event.target.closest("[data-lang]")?.dataset.lang;
  const nextLanguage = requestedLanguage || (activeLanguage === "id" ? "en" : "id");
  setLanguage(nextLanguage);
});

accordionItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    accordionItems.forEach((entry) => entry.classList.remove("active"));
    item.classList.add("active");
  });
});

startDemo.addEventListener("click", runDemo);
setLanguage(activeLanguage);

function initPageAnimations() {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".section-reveal", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".page-shell",
        start: "top 80%"
      }
    });

    gsap.utils.toArray(".section-reveal").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 34, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true
          }
        }
      );
    });

    gsap.to(".orbit-value", {
      strokeDashoffset: 130,
      duration: 1.8,
      ease: "power3.out",
      delay: 0.4
    });

    document.querySelectorAll(".risk-number[data-target]").forEach((item) => {
      animateNumber(item, Number(item.dataset.target), 1500);
    });

    gsap.to(".pin-copy", {
      scrollTrigger: {
        trigger: ".deep-dive",
        start: "top top",
        end: "bottom bottom",
        pin: ".pin-copy",
        pinSpacing: false
      }
    });

    gsap.utils.toArray(".tech-card, .image-card, .privacy-visual").forEach((element) => {
      gsap.fromTo(
        element,
        { scale: 0.92, opacity: 0.72 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            end: "bottom 20%",
            scrub: true
          }
        }
      );
    });

    const textTargets = document.querySelectorAll(".wide-heading p, .flow-copy p, .comparison-copy p");
    textTargets.forEach((paragraph) => {
      const words = paragraph.textContent.trim().split(/\s+/);
      paragraph.innerHTML = words.map((word) => `<span class="reveal-word">${word}</span>`).join(" ");
      gsap.fromTo(
        paragraph.querySelectorAll(".reveal-word"),
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.025,
          ease: "none",
          scrollTrigger: {
            trigger: paragraph,
            start: "top 82%",
            end: "bottom 52%",
            scrub: true
          }
        }
      );
    });
  } else {
    document.querySelectorAll(".section-reveal").forEach((section) => {
      section.style.opacity = "1";
      section.style.transform = "none";
    });
    document.querySelectorAll(".risk-number[data-target]").forEach((item) => {
      item.textContent = item.dataset.target;
    });
  }
}

startSiteLoader();
