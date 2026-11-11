
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const modal = document.getElementById("resultModal");

const TAU = Math.PI * 2;

const challengeGroups = {
  graduates: [
    {title:"أغرب ذكريات المدرسة",category:"ذكريات",symbol:"😂",description:"احكي أغرب موقف حصل لك في المدرسة."},
    {title:"أول يوم في NTG",category:"تمثيل",symbol:"🎒",description:"مثّل نفسك أول يوم دخلت فيه NTG."},
    {title:" اكتر واحد كن بينام ",category:"تصويت",symbol:"😴",description:"اختار أكتر حد كان بينام في الحصص."},
    {title:"غنّي معانا",category:"موسيقى",symbol:"🎤",description:"التيم يختار أغنية، واللي عليه الدور يغني جزء منها."},
    {title:"صورة الدفعة",category:"تحدي جماعي",symbol:"📸",description:"اجمع كل الدفعة واتصوروا مع بعض خلال 10 ثواني."},
    {title:"فريق العمل",category:"عمل جماعي",symbol:"🎭",description:"خلي فريقك يمثل إنه فريق WORK، وكل واحد يمثل دوره حسب تخصصه."},
    {title:"قلّد مهندس",category:"تمثيل",symbol:"👨‍🏫",description:"قلّد شرح أحد المهندسين، وباقي فريقك يخمن هو مين."},
    {title:"آخر حرف",category:"لعبة كلمات",symbol:"🔤",description:"قول كلمة، واللي بعدك يقول كلمة تبدأ بآخر حرف منها.   واللي يتأخر أكثر من 5 ثواني يخرج."},
    {title:"اضحكني",category:"تحدي مضحك",symbol:"🤣",description:"اختار حد من الفرق التانية وحاول تضحكه من غير ما تلمسه."},
    {title:"صورة عشوائية",category:"تحدي التصوير",symbol:"🤳",description:"اختار حد عشوائي من الحاضرين وحاول تتصور معاه خلال 10 ثواني، بعد موافقته."}
  ],

  attendees: [
    {title:"يا بختك يا أمنية",category:"تحدي مضحك",symbol:"😂",description:"روح لأي حد من سنة تانية وقوله: يا بختك يا أمنية، هتعيشي أحسن عيشة وهتاكلي لوليف ولانشون وجبنة تركي."},
    {title:"صورة عشوائية",category:"تحدي التصوير",symbol:"📸",description:"اختار حد عشوائي من الحاضرين وحاول تتصور معاه، بعد ما توافقوا على الصورة."},
    {title:"٥ حيوانات في ٥ ثواني",category:"تحدي السرعة",symbol:"🐯",description:"قول خمس حيوانات في خمس ثواني."},
    {title:"خمن المهندس",category:"تخمين",symbol:"👨‍🏫",description:"اختار حد من فريقك وخليه يقلّد مهندس، وإنت حاول تخمن هو مين."},
    {title:"آخر حرف",category:"لعبة كلمات",symbol:"🔤",description:"قول كلمة، واللي بعدك يقول كلمة تبدأ بآخر حرف منها. ممنوع التكرار، واللي يتأخر أكثر من 5 ثواني يخرج."},
    {title:"اضحكني في ٣٠ ثانية",category:"تحدي مضحك",symbol:"🤣",description:"اختار حد من الفرق التانية وحاول تضحكه من غير ما تلمسه خلال 30 ثانية."},
    {title:"غنّي زي النجوم",category:"موسيقى",symbol:"🎤",description:"غنّي أغنية مشهورة بصوت شخصية كرتونية."},
    {title:"تحدي بلادي",category:"تمثيل",symbol:"🇪🇬",description:"قف في نص المكان اللي إنت فيه وقول بصوت عالي: بلادي بلادي بلادي."},
    {title:"عرض الأزياء",category:"تحدي مضحك",symbol:"🧦",description:"امشي بشرابك كأنك عارض أزياء لمدة 10 ثواني، في مكان آمن ومش زلق."},
    {title:"المهندس الصامت",category:"تحدي الصمت",symbol:"🤐",description:"اقعد جنب أي مهندس من غير ما تتكلم لمدة 30 ثانية."}
  ]
};

const colors = [
  "#c92826","#202020","#a91f1d","#383434",
  "#d94a43","#171717","#8f1c1a","#4a4140"
];

let currentMode = "graduates";
let challenges = challengeGroups[currentMode];

let rotation = 0;
let spinning = false;
let currentTeam = 0;
let round = 1;
let scores = [0, 0];

let lastIndex = {
  graduates: -1,
  attendees: -1
};

const center = canvas.width / 2;
const radius = 330;
let slice = TAU / challenges.length;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(rotation);

  challenges.forEach((item, i) => {
    const start = -Math.PI / 2 + i * slice;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, start, start + slice);
    ctx.closePath();

    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    ctx.strokeStyle = "#f1e9e2";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.save();
    ctx.rotate(start + slice / 2);
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.font = "800 20px Cairo, sans-serif";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 4;
    ctx.fillText(item.title, radius - 34, 0, 205);
    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, TAU);
  ctx.strokeStyle = "#eee7df";
  ctx.lineWidth = 8;
  ctx.stroke();

  ctx.restore();
}

function updateTeams() {
  const names = [
    document.getElementById("teamAName").value.trim() || "الفريق الأحمر",
    document.getElementById("teamBName").value.trim() || "الفريق الأسود"
  ];

  document.getElementById("scoreA").textContent = scores[0];
  document.getElementById("scoreB").textContent = scores[1];
  document.getElementById("currentTeamLabel").textContent = names[currentTeam];

  document.getElementById("teamCardA").classList.toggle("active", currentTeam === 0);
  document.getElementById("teamCardB").classList.toggle("active", currentTeam === 1);

  document.getElementById("spinCount").textContent =
    `الجولة ${String(round).padStart(2, "0")}`;
}

function setMode(mode) {
  if (spinning) return;

  currentMode = mode;
  challenges = challengeGroups[mode];
  slice = TAU / challenges.length;
  rotation = 0;

  document.querySelectorAll(".mode-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });

  closeResult();
  drawWheel();
}

function chooseChallenge() {
  let index = Math.floor(Math.random() * challenges.length);

  while (challenges.length > 1 && index === lastIndex[currentMode]) {
    index = Math.floor(Math.random() * challenges.length);
  }

  lastIndex[currentMode] = index;
  return index;
}

function spin() {
  if (spinning) return;

  spinning = true;
  spinButton.disabled = true;

  const chosen = chooseChallenge();
  const targetAngle = (TAU - (chosen * slice + slice / 2)) % TAU;
  const current = ((rotation % TAU) + TAU) % TAU;

  const extraTurns = 6 + Math.floor(Math.random() * 3);
  const delta = extraTurns * TAU + ((targetAngle - current + TAU) % TAU);

  const start = rotation;
  const end = rotation + delta;
  const duration = 4800;
  const startTime = performance.now();

  function animate(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);

    rotation = start + (end - start) * eased;
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      rotation = ((rotation % TAU) + TAU) % TAU;
      drawWheel();

      spinning = false;
      spinButton.disabled = false;

      showResult(chosen);
    }
  }

  requestAnimationFrame(animate);
}

function showResult(index) {
  const item = challenges[index];

  document.getElementById("resultTitle").textContent = item.title;
  document.getElementById("resultCategory").textContent = item.category;
  document.getElementById("resultSymbol").textContent = item.symbol;
  document.getElementById("resultDescription").textContent = item.description;

  modal.classList.add("show");
}

function closeResult() {
  modal.classList.remove("show");
}

document.getElementById("successButton").addEventListener("click", () => {
  scores[currentTeam]++;
  round++;
  updateTeams();
  closeResult();
});

document.getElementById("skipButton").addEventListener("click", () => {
  round++;
  updateTeams();
  closeResult();
});

document.getElementById("switchTeam").addEventListener("click", () => {
  currentTeam = 1 - currentTeam;
  updateTeams();
});

document.getElementById("resetGame").addEventListener("click", () => {
  if (confirm("متأكد إنك عايز تصفّر النقاط؟")) {
    scores = [0, 0];
    round = 1;
    currentTeam = 0;
    lastIndex = { graduates: -1, attendees: -1 };
    updateTeams();
  }
});

document.getElementById("teamAName").addEventListener("input", updateTeams);
document.getElementById("teamBName").addEventListener("input", updateTeams);

document.querySelectorAll(".mode-btn").forEach(button => {
  button.addEventListener("click", () => {
    setMode(button.dataset.mode);
  });
});

spinButton.addEventListener("click", spin);

modal.addEventListener("click", event => {
  if (event.target.classList.contains("modal-backdrop")) {
    closeResult();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeResult();
});

drawWheel();
updateTeams();
