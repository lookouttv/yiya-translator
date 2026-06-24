const signals = {
  hungry: {
    hint: "规律又有点急的小哭声，常常是在提醒饭点到了。",
    confidence: "可信度 92%",
    tone: "声音：短促、有节奏",
    translation: "“我有点饿，想喝奶啦。”",
    explanation: "这种哭声通常节奏比较规律，停顿后会继续寻找安抚，常见于进食时间前后。",
    care: [
      ["🍼", "确认上次喂奶时间，先用少量喂食观察反应。"],
      ["👄", "看宝宝是否有寻找、吸吮手指或转头找奶的动作。"],
      ["🧻", "喂完后轻拍嗝，减少胀气带来的二次哭闹。"]
    ]
  },
  sleepy: {
    hint: "拖长的哼唧声配合揉眼睛，多半是困意上线。",
    confidence: "可信度 88%",
    tone: "声音：拖长、变轻",
    translation: "“我困了，想安静睡一会儿。”",
    explanation: "困倦时宝宝常会发出拉长的哼声，身体活动减少，但会因为过度疲劳变得烦躁。",
    care: [
      ["🌙", "调暗光线，减少说话声和突然移动。"],
      ["🫶", "用稳定节奏轻拍或轻摇，帮助进入睡眠。"],
      ["🛏️", "确认睡眠环境平整、透气、没有松散遮盖物。"]
    ]
  },
  diaper: {
    hint: "边扭边哭、表情皱皱的，可能是在说不舒服。",
    confidence: "可信度 84%",
    tone: "声音：间断、伴随扭动",
    translation: "“尿布让我不太舒服。”",
    explanation: "尿布潮湿、过紧或摩擦会让宝宝边扭动边哭，哭声不一定持续尖锐，但会反复出现。",
    care: [
      ["🧷", "检查尿布湿度、松紧和腰腿边缘。"],
      ["🧴", "清洁后让皮肤短暂透气，再涂护臀产品。"],
      ["👕", "顺手摸摸衣物标签或褶皱，排除摩擦感。"]
    ]
  },
  poop: {
    hint: "突然用力、脸变红、身体蜷缩，可能是在努力拉臭臭。",
    confidence: "可信度 87%",
    tone: "声音：憋劲、断续",
    translation: "“我在拉臭臭，肚肚有点用力。”",
    explanation: "宝宝排便前后可能会哼唧、憋红脸、蹬腿或短暂哭闹，多数是在表达肚子胀或尿布需要处理。",
    care: [
      ["💩", "先观察是否正在排便，给宝宝一点安静和时间。"],
      ["🧻", "排便后及时更换尿布，温水清洁褶皱处。"],
      ["🫶", "轻轻顺时针揉肚子，帮助缓解胀气和不适。"]
    ]
  },
  hug: {
    hint: "声音忽高忽低，看见大人靠近会缓和，像是在撒娇。",
    confidence: "可信度 90%",
    tone: "声音：起伏、求回应",
    translation: "“抱抱我，我想确认你在。”",
    explanation: "宝宝需要安全感时，哭声会随着照护者靠近而明显变化，拥抱和声音回应通常很有效。",
    care: [
      ["🤗", "抱起后让宝宝贴近胸口，听到心跳会更安心。"],
      ["🎵", "轻声哼唱或重复简单安抚语。"],
      ["👀", "保持眼神交流，让宝宝知道你正在回应。"]
    ]
  },
  burp: {
    hint: "吃奶后突然急哭、身体蜷缩，可能有小气泡卡住。",
    confidence: "可信度 86%",
    tone: "声音：突然、偏急",
    translation: "“肚肚有气，我需要拍拍嗝。”",
    explanation: "吃奶后吞入空气会造成胀气，宝宝可能蹬腿、拱背或短促急哭。",
    care: [
      ["🫧", "竖抱靠肩，手掌空心从下往上轻拍。"],
      ["⏱️", "每次拍 3 到 5 分钟，观察是否打嗝或放松。"],
      ["🧘", "动作放慢，避免刚喂完就大幅度晃动。"]
    ]
  },
  play: {
    hint: "咿呀声变多、眼睛追着人走，可能是在邀请互动。",
    confidence: "可信度 81%",
    tone: "声音：明亮、重复",
    translation: "“陪我玩一会儿嘛。”",
    explanation: "当宝宝状态不错但发出重复咿呀声，常是在练习表达，也是在寻找互动回应。",
    care: [
      ["🧸", "拿一个颜色鲜明的安全玩具，慢慢移入视线。"],
      ["👏", "模仿宝宝的咿呀声，轮流回应。"],
      ["☀️", "玩几分钟后观察疲劳信号，及时切回安抚。"]
    ]
  }
};

const chips = document.querySelectorAll(".sound-chip");
const careList = document.querySelector("#careList");
const recordButton = document.querySelector("#recordButton");
const meter = document.querySelector(".meter");
const recordStatus = document.querySelector("#recordStatus");
let activeType = "hungry";

function renderSignal(type) {
  const signal = signals[type];
  activeType = type;
  document.querySelector("#signalHint").textContent = signal.hint;
  document.querySelector("#confidence").textContent = signal.confidence;
  document.querySelector("#tone").textContent = signal.tone;
  document.querySelector("#translation").textContent = signal.translation;
  document.querySelector("#explanation").textContent = signal.explanation;
  careList.innerHTML = signal.care
    .map(([icon, text]) => `
      <div class="care-item">
        <span class="care-icon">${icon}</span>
        <p>${text}</p>
      </div>
    `)
    .join("");
  chips.forEach((chip) => chip.classList.toggle("active", chip.dataset.type === type));
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => renderSignal(chip.dataset.type));
});

recordButton.addEventListener("click", () => {
  recordButton.classList.add("listening");
  meter.classList.add("active");
  recordStatus.textContent = "正在听宝宝的声音...";

  window.setTimeout(() => {
    const keys = Object.keys(signals);
    const nextType = keys[(keys.indexOf(activeType) + 1) % keys.length];
    renderSignal(nextType);
    recordStatus.textContent = "识别完成，已生成照护提示";
    recordButton.classList.remove("listening");
    meter.classList.remove("active");
  }, 1300);
});

renderSignal(activeType);
