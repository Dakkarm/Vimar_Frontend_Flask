// Dati Esempio
const requests = [
  { type: "Conversazione Libera", keywords: ["ciao", "tempo"], feedback: "positivo", date: "2024-11-26" },
  { type: "Conversazione Guidata", keywords: ["notizie"], feedback: "negativo", date: "2024-11-27" },
  { type: "Conversazione Libera", keywords: ["notizie", "tempo"], feedback: "positivo", date: "2024-11-28" },
  { type: "Conversazione Libera", keywords: ["ciao", "chat"], feedback: "positivo", date: "2024-11-29" },
  { type: "Conversazione Guidata", keywords: ["musica", "raccomandazioni"], feedback: "positivo", date: "2024-11-30" },
  { type: "Conversazione Libera", keywords: ["tempo", "temperatura"], feedback: "negativo", date: "2024-11-30" },
  { type: "Conversazione Guidata", keywords: ["film", "raccomandazioni"], feedback: "positivo", date: "2024-12-01" },
  { type: "Conversazione Libera", keywords: ["aiuto", "compito"], feedback: "positivo", date: "2024-12-03" },
];

// Caricamento del Pannello di Controllo
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
});

function loadDashboard() {
  // Statistiche delle Richieste
  const freeRequests = requests.filter(req => req.type === "Conversazione Libera").length;
  const guidedRequests = requests.filter(req => req.type === "Conversazione Guidata").length;
  const totalRequests = requests.length;

  document.getElementById("free-requests").textContent = freeRequests;
  document.getElementById("guided-requests").textContent = guidedRequests;
  document.getElementById("total-requests").textContent = totalRequests;

  // Statistiche sulle Parole Chiave
  const allKeywords = requests.flatMap(req => req.keywords);
  const keywordCounts = allKeywords.reduce((acc, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {});
  renderKeywordChart(keywordCounts);

  // Andamento Giornaliero
  const dailyTrend = requests.reduce((acc, req) => {
    acc[req.date] = (acc[req.date] || 0) + 1;
    return acc;
  }, {});
  renderDailyTrendChart(dailyTrend);

  // Statistiche sul Feedback
  const feedbackStats = requests.reduce((acc, req) => {
    acc[req.feedback]++;
    return acc;
  }, { positivo: 0, negativo: 0 });
  document.getElementById("positive-feedback").textContent = feedbackStats.positivo;
  document.getElementById("negative-feedback").textContent = feedbackStats.negativo;
  renderFeedbackPieChart(feedbackStats);
}

// Grafico delle Parole Chiave
function renderKeywordChart(keywordCounts) {
  const ctx = document.getElementById("keyword-chart").getContext("2d");
  const sortedKeywords = Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]);
  const labels = sortedKeywords.map(([keyword]) => keyword);
  const values = sortedKeywords.map(([, count]) => count);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Numero di utilizzi",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      }],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      scales: {
        x: { beginAtZero: true, title: { display: true, text: "Numero di utilizzi" } },
        y: { title: { display: true, text: "Parole Chiave" } },
      },
    },
  });
}

// Grafico dell'Andamento Giornaliero
function renderDailyTrendChart(dailyTrend) {
  const ctx = document.getElementById("daily-trend-chart").getContext("2d");
  const labels = Object.keys(dailyTrend);
  const values = Object.values(dailyTrend);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Utenti al giorno",
        data: values,
        borderColor: "#42a5f5",
        backgroundColor: "rgba(66, 165, 245, 0.2)",
        fill: true,
        tension: 0.3,
      }],
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Data" } },
        y: { beginAtZero: true, title: { display: true, text: "Numero di utenti" } },
      },
    },
  });
}

// Grafico a Torta del Feedback
function renderFeedbackPieChart(feedbackStats) {
  const ctx = document.getElementById("feedback-pie-chart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Feedback Positivo", "Feedback Negativo"],
      datasets: [{
        data: [feedbackStats.positivo, feedbackStats.negativo],
        backgroundColor: ["#4caf50", "#f44336"],
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      layout: {
        padding: 10,
      },
    },
  });
}
