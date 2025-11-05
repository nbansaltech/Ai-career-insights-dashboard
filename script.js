// ======== SMART RESUME ANALYZER (MOCK AI) ========

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent =
    document.body.classList.contains("light-mode")
      ? "🌙 Dark Mode"
      : "☀️ Light Mode";
});

// Core elements
const analyzeBtn = document.getElementById("analyzeBtn");
const loadingEl = document.getElementById("loading");
const resultsSection = document.getElementById("resultsSection");
const scoreValue = document.getElementById("scoreValue");
const skillBars = document.getElementById("skillBars");
const strengthsList = document.getElementById("strengthsList");
const improvementsList = document.getElementById("improvementsList");

// Animate skill bars
function animateSkillBars(skills) {
  skillBars.innerHTML = "";
  Object.entries(skills).forEach(([skill, value]) => {
    const bar = document.createElement("div");
    bar.innerHTML = `
      <div class="skill-label">
        <span>${skill}</span>
        <span>${value}%</span>
      </div>
      <div class="skill-bar"><div class="skill-fill"></div></div>
    `;
    skillBars.appendChild(bar);
    setTimeout(() => {
      bar.querySelector(".skill-fill").style.width = value + "%";
    }, 100);
  });
}

// Mock AI analysis
function mockAIAnalyze(text) {
  const baseScore = 60 + Math.random() * 30;
  const keywords = ["Python","JavaScript","React","Node","Machine Learning","SQL"];
  const skills = {};

  keywords.forEach(k => {
    skills[k] = text.toLowerCase().includes(k.toLowerCase())
      ? 70 + Math.floor(Math.random() * 25)
      : 30 + Math.floor(Math.random() * 20);
  });

  const strengths = [];
  const improvements = [];

  for (const [skill, val] of Object.entries(skills)) {
    if (val > 70) strengths.push(`${skill} proficiency`);
    else improvements.push(`Improve your ${skill} fundamentals`);
  }

  if (text.length < 200) {
    improvements.push("Add more detail — the resume seems too short.");
  } else {
    strengths.push("Good overall detail and formatting length.");
  }

  return {
    score: Math.round(baseScore),
    skills,
    strengths,
    improvements
  };
}

// Download as text report
function downloadReport() {
  const text = `
AI Resume Analyzer Report
=========================
Score: ${scoreValue.textContent}

Strengths:
- ${Array.from(strengthsList.children)
    .map(li => li.textContent)
    .join("\n- ")}

Improvements:
- ${Array.from(improvementsList.children)
    .map(li => li.textContent)
    .join("\n- ")}
  `;
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Resume_Report.txt";
  a.click();
}

// Copy feedback to clipboard
function copyFeedback() {
  const text = `
Score: ${scoreValue.textContent}
Strengths: ${Array.from(strengthsList.children)
    .map(li => li.textContent)
    .join(", ")}
Improvements: ${Array.from(improvementsList.children)
    .map(li => li.textContent)
    .join(", ")}
  `;
  navigator.clipboard.writeText(text);
  alert("Feedback copied to clipboard!");
}

// Hook buttons (created dynamically)
document.addEventListener("click", e => {
  if (e.target.id === "downloadBtn") downloadReport();
  if (e.target.id === "copyBtn") copyFeedback();
});

// Analyze button
analyzeBtn.addEventListener("click", () => {
  const fileInput = document.getElementById("resumeFile");
  const textInput = document.getElementById("resumeText");
  let resumeText = textInput.value.trim();

  if (!resumeText && fileInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = e => runMockAnalysis(e.target.result);
    reader.readAsText(fileInput.files[0]);
  } else if (resumeText) {
    runMockAnalysis(resumeText);
  } else {
    alert("Please upload a file or paste your resume text!");
  }
});

// Execute mock analysis
function runMockAnalysis(text) {
  loadingEl.classList.remove("hidden");
  resultsSection.classList.add("hidden");

  setTimeout(() => {
    const result = mockAIAnalyze(text);

    scoreValue.textContent = result.score;
    animateSkillBars(result.skills);

    strengthsList.innerHTML = "";
    result.strengths.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      strengthsList.appendChild(li);
    });

    improvementsList.innerHTML = "";
    result.improvements.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      improvementsList.appendChild(li);
    });

    document.querySelector(".actions").innerHTML = `
      <button class="secondary-btn" id="copyBtn">📋 Copy Feedback</button>
      <button class="secondary-btn" id="downloadBtn">⬇️ Download Report</button>
    `;

    loadingEl.classList.add("hidden");
    resultsSection.classList.remove("hidden");
  }, 1200);
}
