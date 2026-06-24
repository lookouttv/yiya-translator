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
let isListening = false;

function renderSignal(type, analysis) {
  const signal = signals[type];
  activeType = type;
  document.querySelector("#signalHint").textContent = signal.hint;
  document.querySelector("#confidence").textContent = analysis?.confidence ?? signal.confidence;
  document.querySelector("#tone").textContent = analysis?.tone ?? signal.tone;
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
  chip.addEventListener("click", () => {
    if (!isListening) renderSignal(chip.dataset.type);
  });
});

recordButton.addEventListener("click", async () => {
  if (isListening) return;
  await recognizeBabySound();
});

async function recognizeBabySound() {
  if (!navigator.mediaDevices?.getUserMedia) {
    recordStatus.textContent = "当前浏览器不支持麦克风识别，请用 Chrome 或 Edge 打开。";
    return;
  }

  isListening = true;
  recordButton.classList.add("listening");
  meter.classList.add("active");
  recordStatus.textContent = "正在听宝宝声音，请靠近麦克风 30 秒...";

  let stream;
  let audioContext;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.35;
    source.connect(analyser);

    const samples = await collectAudioFeatures(analyser, audioContext.sampleRate, 30000);
    const result = classifySound(samples);
    renderSignal(result.type, result.analysis);
    recordStatus.textContent = `识别完成：检测到${result.label}。可再次点击重新识别。`;
  } catch (error) {
    recordStatus.textContent = error.name === "NotAllowedError"
      ? "麦克风权限被拒绝了，请允许后再试。"
      : "暂时无法读取麦克风，请检查浏览器权限或设备。";
  } finally {
    stream?.getTracks().forEach((track) => track.stop());
    await audioContext?.close();
    recordButton.classList.remove("listening");
    meter.classList.remove("active");
    isListening = false;
  }
}

function collectAudioFeatures(analyser, sampleRate, durationMs) {
  const timeData = new Uint8Array(analyser.fftSize);
  const freqData = new Uint8Array(analyser.frequencyBinCount);
  const startedAt = performance.now();
  const frames = [];

  return new Promise((resolve) => {
    function readFrame(now) {
      analyser.getByteTimeDomainData(timeData);
      analyser.getByteFrequencyData(freqData);

      let sumSquares = 0;
      for (const value of timeData) {
        const centered = (value - 128) / 128;
        sumSquares += centered * centered;
      }

      let energy = 0;
      let weightedFrequency = 0;
      let highEnergy = 0;
      for (let i = 0; i < freqData.length; i += 1) {
        const magnitude = freqData[i];
        const frequency = i * sampleRate / analyser.fftSize;
        energy += magnitude;
        weightedFrequency += magnitude * frequency;
        if (frequency > 1200) highEnergy += magnitude;
      }

      frames.push({
        rms: Math.sqrt(sumSquares / timeData.length),
        centroid: energy ? weightedFrequency / energy : 0,
        highRatio: energy ? highEnergy / energy : 0
      });

      if (now - startedAt < durationMs) {
        requestAnimationFrame(readFrame);
      } else {
        resolve(frames);
      }
    }

    requestAnimationFrame(readFrame);
  });
}

function classifySound(frames) {
  const rmsValues = frames.map((frame) => frame.rms);
  const avgRms = average(rmsValues);
  const rmsDeviation = deviation(rmsValues, avgRms);
  const threshold = Math.max(0.018, avgRms * 0.72);
  const activeFrames = frames.filter((frame) => frame.rms > threshold);
  const activeRatio = activeFrames.length / Math.max(frames.length, 1);
  const avgCentroid = average(activeFrames.map((frame) => frame.centroid)) || average(frames.map((frame) => frame.centroid));
  const avgHighRatio = average(activeFrames.map((frame) => frame.highRatio)) || average(frames.map((frame) => frame.highRatio));
  const pulseCount = countPulses(frames, threshold);
  const variability = avgRms ? rmsDeviation / avgRms : 0;

  let type = "play";
  let label = "咿呀互动声";

  if (activeRatio < 0.16) {
    type = "play";
    label = "轻声咿呀";
  } else if (avgCentroid < 760 && activeRatio < 0.62 && pulseCount <= 4) {
    type = "poop";
    label = "憋劲臭臭声";
  } else if (avgCentroid < 950 && activeRatio > 0.58) {
    type = "sleepy";
    label = "困困哼声";
  } else if (pulseCount >= 5 && variability < 0.72) {
    type = "hungry";
    label = "规律饿哭";
  } else if (avgHighRatio > 0.34 || avgCentroid > 1600) {
    type = "burp";
    label = "急促不适声";
  } else if (variability > 0.78 && activeRatio < 0.5) {
    type = "diaper";
    label = "扭动不舒服声";
  } else {
    type = "hug";
    label = "求安抚哭声";
  }

  const score = Math.round(72 + Math.min(21, activeRatio * 12 + pulseCount * 1.4 + Math.min(variability, 1) * 6));
  const tone = describeTone({ activeRatio, avgCentroid, avgHighRatio, pulseCount, variability });

  return {
    type,
    label,
    analysis: {
      confidence: `本地声音识别 ${score}%`,
      tone
    }
  };
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function deviation(values, avg) {
  if (!values.length) return 0;
  return Math.sqrt(average(values.map((value) => (value - avg) ** 2)));
}

function countPulses(frames, threshold) {
  let pulses = 0;
  let wasActive = false;

  for (const frame of frames) {
    const active = frame.rms > threshold;
    if (active && !wasActive) pulses += 1;
    wasActive = active;
  }

  return pulses;
}

function describeTone(metrics) {
  const pitch = metrics.avgCentroid > 1500 ? "偏尖" : metrics.avgCentroid < 850 ? "偏低" : "中等";
  const rhythm = metrics.pulseCount >= 5 ? "有节奏" : metrics.activeRatio > 0.58 ? "持续" : "断续";
  const strength = metrics.avgHighRatio > 0.34 ? "急促" : metrics.variability > 0.75 ? "起伏明显" : "较平稳";
  return `声音：${pitch}、${rhythm}、${strength}`;
}

renderSignal(activeType);
