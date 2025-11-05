// Mock AI dataset
const mockData = [
  { skill: "Python", demand: 95, salary: 125000, growth: 15 },
  { skill: "JavaScript", demand: 90, salary: 118000, growth: 12 },
  { skill: "Java", demand: 80, salary: 110000, growth: 9 },
  { skill: "React", demand: 85, salary: 120000, growth: 14 },
  { skill: "Next.js", demand: 70, salary: 130000, growth: 16 },
  { skill: "SQL", demand: 75, salary: 102000, growth: 8 },
  { skill: "Node.js", demand: 65, salary: 112000, growth: 10 },
  { skill: "C++", demand: 60, salary: 108000, growth: 7 },
  { skill: "Pandas", demand: 55, salary: 98000, growth: 6 },
  { skill: "Scikit-learn", demand: 50, salary: 105000, growth: 9 }
];

// Update dashboard cards
document.getElementById("total-skills").textContent = mockData.length;
const topSkill = mockData.reduce((a, b) => (a.demand > b.demand ? a : b));
document.getElementById("top-skill").textContent = topSkill.skill;
const avgSalary = mockData.reduce((acc, d) => acc + d.salary, 0) / mockData.length;
document.getElementById("avg-salary").textContent = `$${avgSalary.toLocaleString()}`;

// Generate charts
const skillNames = mockData.map(d => d.skill);
const demandValues = mockData.map(d => d.demand);
const salaryValues = mockData.map(d => d.salary);
const growthValues = mockData.map(d => d.growth);

const ctx1 = document.getElementById("skillChart");
new Chart(ctx1, {
  type: "bar",
  data: {
    labels: skillNames,
    datasets: [{
      label: "Demand (%)",
      data: demandValues,
      backgroundColor: "#2563ebaa"
    }]
  },
  options: { responsive: true, plugins: { legend: { display: false } } }
});

const ctx2 = document.getElementById("salaryChart");
new Chart(ctx2, {
  type: "line",
  data: {
    labels: skillNames,
    datasets: [{
      label: "Average Salary",
      data: salaryValues,
      borderColor: "#60a5fa",
      fill: true,
      tension: 0.3
    }]
  },
  options: { responsive: true }
});

const ctx3 = document.getElementById("growthChart");
new Chart(ctx3, {
  type: "radar",
  data: {
    labels: skillNames,
    datasets: [{
      label: "Growth Rate (%)",
      data: growthValues,
      backgroundColor: "#93c5fd55",
      borderColor: "#1d4ed8"
    }]
  },
  options: { responsive: true }
});
