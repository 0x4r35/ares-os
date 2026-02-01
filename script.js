const bootText = document.getElementById('boot-text');
const bootScreen = document.getElementById('boot-screen');
const desktop = document.getElementById('desktop');
const clock = document.getElementById('clock');
const windowArea = document.getElementById('window-area');
const desktopIcons = document.getElementById('desktop-icons');

const BOOT_LOGS = [
    "INITIALIZING KERNEL...",
    "LOADING MEMORY MODULES... [OK]",
    "MOUNTING FILE SYSTEM... [OK]",
    "CHECKING PERIPHERALS...",
    "DETECTED: NEURAL INTERFACE",
    "DETECTED: QUANTUM PROCESSOR",
    "LOADING DRIVERS...............",
    "ESTABLISHING SECURE CONNECTION...",
    "ENCRYPTING TRAFFIC... [AES-4096]",
    "SYSTEM READY."
];

let zIndexCounter = 100;

// Boot Sequence
async function startBoot() {
    for (let line of BOOT_LOGS) {
        const p = document.createElement('div');
        p.textContent = `> ${line}`;
        bootText.appendChild(p);
        await new Promise(r => setTimeout(r, Math.random() * 400 + 100));
        window.scrollTo(0, document.body.scrollHeight);
    }

    await new Promise(r => setTimeout(r, 800));
    bootText.innerHTML += '<div class="highlight">> STARTING DESKTOP ENVIRONMENT...</div>';
    await new Promise(r => setTimeout(r, 1000));

    bootScreen.classList.add('hidden');
    desktop.classList.remove('hidden');
    initClock();
    initStartMenu();
    createIcon('Terminal', '💻', 'terminal');
    createIcon('Files', '📁', 'files');
    createIcon('Notepad', '📝', 'notepad');
    createIcon('SysMon', '📊', 'sysmon');
    createIcon('Synth', '🎵', 'music');
    createIcon('Snake', '🐍', 'snake');
    createIcon('Calc', '🔢', 'calculator');
    createIcon('Hack', '👾', 'hacking');
    createIcon('Weather', '🌡️', 'weather');
    createIcon('Chat', '💬', 'chat');
    createIcon('Gallery', '🖼️', 'gallery');
    createIcon('Radio', '📻', 'radio');
    createIcon('Code', '👨‍💻', 'code');
    createIcon('Tasks', '✅', 'tasks');

    // Welcome notification
    setTimeout(() => {
        showNotification('System Ready', 'Welcome to AresOS v2.0');
    }, 500);
}

// Clock
function initClock() {
    setInterval(() => {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }, 1000);
}

// Icon Creation
function createIcon(name, symbol, appType) {
    const div = document.createElement('div');
    div.className = 'icon';
    div.innerHTML = `
        <div class="icon-img">${symbol}</div>
        <div class="icon-label">${name}</div>
    `;
    div.onclick = () => openWindow(name, appType);
    desktopIcons.appendChild(div);
}

// Window Management
function openWindow(title, appType) {
    const win = document.createElement('div');
    win.className = 'window active-window';
    win.style.left = `${50 + (Math.random() * 100)}px`;
    win.style.top = `${50 + (Math.random() * 100)}px`;
    win.style.zIndex = ++zIndexCounter;
    const winId = zIndexCounter;

    let contentHtml = '';
    let width = 400;
    let height = 300;

    if (appType === 'terminal') {
        contentHtml = `
            <div class="terminal-content">
                <div id="term-output-${winId}">AresOS Terminal v1.0<br>Type 'help' for commands.<br><br></div>
                <div class="input-line">
                    <span class="prompt">root@ares:~#</span>
                    <input type="text" class="cmd-input" onkeydown="handleTermInput(event, this, 'term-output-${winId}')" autofocus>
                </div>
            </div>
        `;
    } else if (appType === 'notepad') {
        contentHtml = `
            <textarea class="notepad-textarea" placeholder="// Start typing your notes here..."></textarea>
        `;
        width = 450;
        height = 350;
    } else if (appType === 'sysmon') {
        contentHtml = `
            <div class="sysmon-container">
                <div class="sysmon-stat"><span class="stat-label">CPU</span><span id="cpu-val-${winId}" class="stat-val">0%</span></div>
                <canvas id="cpu-graph-${winId}" class="sysmon-graph" width="350" height="80"></canvas>
                <div class="sysmon-stat"><span class="stat-label">RAM</span><span id="ram-val-${winId}" class="stat-val">0 TB</span></div>
                <canvas id="ram-graph-${winId}" class="sysmon-graph" width="350" height="80"></canvas>
                <div class="sysmon-stat"><span class="stat-label">NET</span><span class="stat-val neon-blue">CONNECTED</span></div>
            </div>
        `;
        width = 400;
        height = 380;
    } else if (appType === 'music') {
        contentHtml = `
            <div class="music-container">
                <canvas id="visualizer-${winId}" class="visualizer-canvas" width="380" height="200"></canvas>
                <div class="music-controls">
                    <button class="music-btn" onclick="toggleMusic(${winId})">▶ PLAY</button>
                    <span id="track-name-${winId}" class="track-name">[ SYNTHWAVE_DEMO.wav ]</span>
                </div>
            </div>
        `;
        width = 420;
        height = 320;
    } else if (appType === 'files') {
        contentHtml = `
            <div class="file-manager">
                <div class="file-path" id="file-path-${winId}">/home/ares/</div>
                <div class="file-list" id="file-list-${winId}">
                    <div class="file-item folder" onclick="openFolder(${winId}, 'Documents')">📁 Documents</div>
                    <div class="file-item folder" onclick="openFolder(${winId}, 'Downloads')">📁 Downloads</div>
                    <div class="file-item folder" onclick="openFolder(${winId}, 'Projects')">📁 Projects</div>
                    <div class="file-item file">📄 README.txt</div>
                    <div class="file-item file">📄 system.log</div>
                    <div class="file-item file">🔒 encrypted.dat</div>
                </div>
            </div>
        `;
        width = 450;
        height = 350;
    } else if (appType === 'snake') {
        contentHtml = `
            <div class="snake-game">
                <canvas id="snake-canvas-${winId}" class="snake-canvas" width="400" height="300"></canvas>
                <div class="snake-controls">
                    <div class="snake-score">Score: <span id="snake-score-${winId}">0</span></div>
                    <button class="snake-btn" onclick="startSnake(${winId})">START</button>
                </div>
            </div>
        `;
        width = 440;
        height = 400;
    } else if (appType === 'calculator') {
        contentHtml = `
            <div class="calculator">
                <div class="calc-display" id="calc-display-${winId}">0</div>
                <div class="calc-buttons">
                    <button onclick="calcInput(${winId}, 'C')" class="calc-btn calc-clear">C</button>
                    <button onclick="calcInput(${winId}, '/')" class="calc-btn calc-op">/</button>
                    <button onclick="calcInput(${winId}, '*')" class="calc-btn calc-op">*</button>
                    <button onclick="calcInput(${winId}, 'DEL')" class="calc-btn calc-del">DEL</button>
                    
                    <button onclick="calcInput(${winId}, '7')" class="calc-btn">7</button>
                    <button onclick="calcInput(${winId}, '8')" class="calc-btn">8</button>
                    <button onclick="calcInput(${winId}, '9')" class="calc-btn">9</button>
                    <button onclick="calcInput(${winId}, '-')" class="calc-btn calc-op">-</button>
                    
                    <button onclick="calcInput(${winId}, '4')" class="calc-btn">4</button>
                    <button onclick="calcInput(${winId}, '5')" class="calc-btn">5</button>
                    <button onclick="calcInput(${winId}, '6')" class="calc-btn">6</button>
                    <button onclick="calcInput(${winId}, '+')" class="calc-btn calc-op">+</button>
                    
                    <button onclick="calcInput(${winId}, '1')" class="calc-btn">1</button>
                    <button onclick="calcInput(${winId}, '2')" class="calc-btn">2</button>
                    <button onclick="calcInput(${winId}, '3')" class="calc-btn">3</button>
                    <button onclick="calcInput(${winId}, '=')" class="calc-btn calc-equals" style="grid-row: span 2;">=</button>
                    
                    <button onclick="calcInput(${winId}, '0')" class="calc-btn" style="grid-column: span 2;">0</button>
                    <button onclick="calcInput(${winId}, '.')" class="calc-btn">.</button>
                </div>
            </div>
        `;
        width = 320;
        height = 420;
    } else if (appType === 'hacking') {
        contentHtml = `
            <div class="hacking-game">
                <div class="hack-header">
                    <span class="hack-target">TARGET: MAINFRAME_#${Math.floor(Math.random() * 9999)}</span>
                    <span class="hack-timer" id="hack-timer-${winId}">30</span>
                </div>
                <div class="hack-grid" id="hack-grid-${winId}">
                    <!-- Grid injected by JS -->
                </div>
                <div class="hack-status" id="hack-status-${winId}">Locate the access codes...</div>
                <button class="hack-btn" onclick="startHacking(${winId})">INITIATE BREACH</button>
            </div>
        `;
        width = 450;
        height = 420;
    } else if (appType === 'weather') {
        contentHtml = `
            <div class="weather-widget">
                <div class="weather-city">TOKYO, JP</div>
                <div class="weather-temp">23°C</div>
                <div class="weather-icon">🌧️</div>
                <div class="weather-desc">ACID RAIN</div>
                <div class="weather-details">
                    <div class="weather-detail">💨 12 km/h</div>
                    <div class="weather-detail">💧 87%</div>
                    <div class="weather-detail">🌡️ 25°C</div>
                </div>
                <div class="weather-forecast">
                    <div class="forecast-day"><span>MON</span><span>🌧️</span><span>22°</span></div>
                    <div class="forecast-day"><span>TUE</span><span>⛈️</span><span>19°</span></div>
                    <div class="forecast-day"><span>WED</span><span>🌫️</span><span>21°</span></div>
                    <div class="forecast-day"><span>THU</span><span>☁️</span><span>24°</span></div>
                    <div class="forecast-day"><span>FRI</span><span>🌧️</span><span>20°</span></div>
                </div>
            </div>
        `;
        width = 320;
        height = 380;
    } else if (appType === 'settings') {
        contentHtml = `
            <div class="settings-panel">
                <div class="setting-group">
                    <div class="setting-label">Theme</div>
                    <div class="setting-options">
                        <button class="theme-btn active" onclick="setTheme('ares')">Ares</button>
                        <button class="theme-btn" onclick="setTheme('matrix')">Matrix</button>
                        <button class="theme-btn" onclick="setTheme('synthwave')">Synthwave</button>
                    </div>
                </div>
                <div class="setting-group">
                    <div class="setting-label">CRT Effect</div>
                    <label class="toggle">
                        <input type="checkbox" checked onchange="toggleCRT(this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="setting-group">
                    <div class="setting-label">Matrix Rain</div>
                    <label class="toggle">
                        <input type="checkbox" checked onchange="toggleMatrix(this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="setting-group">
                    <div class="setting-label">Sound Effects</div>
                    <label class="toggle">
                        <input type="checkbox" onchange="toggleSound(this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>
        `;
        width = 380;
        height = 400;
    } else if (appType === 'chat') {
        contentHtml = `
            <div class="chat-app">
                <div class="chat-header">
                    <span class="chat-status">🟢</span>
                    <span class="chat-name">NEXUS-AI</span>
                    <span class="chat-typing" id="chat-typing-${winId}"></span>
                </div>
                <div class="chat-messages" id="chat-messages-${winId}">
                    <div class="chat-msg ai">
                        <div class="msg-avatar">🤖</div>
                        <div class="msg-content">Greetings, Runner. I am NEXUS-AI. How may I assist you today?</div>
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" class="chat-input" id="chat-input-${winId}" placeholder="Type a message..." onkeydown="handleChatInput(event, ${winId})">
                    <button class="chat-send" onclick="sendChatMessage(${winId})">➤</button>
                </div>
            </div>
        `;
        width = 400;
        height = 450;
    } else if (appType === 'gallery') {
        contentHtml = `
            <div class="gallery-app">
                <div class="gallery-viewer">
                    <div class="gallery-image" id="gallery-img-${winId}" style="background: linear-gradient(45deg, #0ff, #f0f); display: flex; align-items: center; justify-content: center; font-size: 3rem;">🌆</div>
                </div>
                <div class="gallery-info" id="gallery-info-${winId}">ARES_CITY.png</div>
                <div class="gallery-thumbnails">
                    <div class="gallery-thumb active" onclick="selectImage(${winId}, 0)" style="background: linear-gradient(45deg, #0ff, #f0f);">🌆</div>
                    <div class="gallery-thumb" onclick="selectImage(${winId}, 1)" style="background: linear-gradient(45deg, #f0f, #0f0);">🌃</div>
                    <div class="gallery-thumb" onclick="selectImage(${winId}, 2)" style="background: linear-gradient(45deg, #0f0, #0ff);">🏙️</div>
                    <div class="gallery-thumb" onclick="selectImage(${winId}, 3)" style="background: linear-gradient(45deg, #ff0, #f00);">🌇</div>
                    <div class="gallery-thumb" onclick="selectImage(${winId}, 4)" style="background: linear-gradient(45deg, #00f, #f0f);">🌁</div>
                </div>
            </div>
        `;
        width = 420;
        height = 400;
    } else if (appType === 'radio') {
        contentHtml = `
            <div class="radio-app">
                <div class="radio-display">
                    <div class="radio-freq" id="radio-freq-${winId}">87.5</div>
                    <div class="radio-station" id="radio-station-${winId}">ARES FM</div>
                </div>
                <div class="radio-visualizer" id="radio-vis-${winId}">
                    ${Array(20).fill('<div class="radio-bar"></div>').join('')}
                </div>
                <div class="radio-controls">
                    <button class="radio-btn" onclick="changeStation(${winId}, -1)">◀◀</button>
                    <button class="radio-btn play-btn" id="radio-play-${winId}" onclick="toggleRadio(${winId})">▶</button>
                    <button class="radio-btn" onclick="changeStation(${winId}, 1)">▶▶</button>
                </div>
                <div class="radio-presets">
                    <button class="preset-btn" onclick="setStation(${winId}, 0)">ARES FM</button>
                    <button class="preset-btn" onclick="setStation(${winId}, 1)">NEON WAVE</button>
                    <button class="preset-btn" onclick="setStation(${winId}, 2)">SYNTH STATION</button>
                    <button class="preset-btn" onclick="setStation(${winId}, 3)">RETRO BEATS</button>
                </div>
            </div>
        `;
        width = 350;
        height = 380;
    } else if (appType === 'code') {
        contentHtml = `
            <div class="code-editor">
                <div class="code-toolbar">
                    <span class="code-filename">untitled.js</span>
                    <div class="code-actions">
                        <button class="code-action-btn" onclick="runCode(${winId})">▶ Run</button>
                        <button class="code-action-btn" onclick="clearCode(${winId})">Clear</button>
                    </div>
                </div>
                <div class="code-wrapper">
                    <div class="code-lines" id="code-lines-${winId}">1</div>
                    <textarea class="code-area" id="code-area-${winId}" spellcheck="false" oninput="updateLineNumbers(${winId})">// Welcome to AresOS Code Editor
// Write your code here

function greet() {
    console.log("Hello, Runner!");
}

greet();</textarea>
                </div>
                <div class="code-output" id="code-output-${winId}"></div>
            </div>
        `;
        width = 520;
        height = 450;
    } else if (appType === 'tasks') {
        contentHtml = `
            <div class="tasks-app">
                <div class="tasks-header">
                    <input type="text" class="task-input" id="task-input-${winId}" placeholder="Add a new task..." onkeydown="handleTaskInput(event, ${winId})">
                    <button class="task-add-btn" onclick="addTask(${winId})">+</button>
                </div>
                <div class="tasks-list" id="tasks-list-${winId}">
                    <div class="task-item"><input type="checkbox"><span>Hack the mainframe</span><button onclick="this.parentNode.remove()">×</button></div>
                    <div class="task-item"><input type="checkbox" checked><span>Update neural implants</span><button onclick="this.parentNode.remove()">×</button></div>
                    <div class="task-item"><input type="checkbox"><span>Meet contact at Neo Tokyo</span><button onclick="this.parentNode.remove()">×</button></div>
                </div>
                <div class="tasks-footer">
                    <span id="task-count-${winId}">2 tasks remaining</span>
                </div>
            </div>
        `;
        width = 350;
        height = 380;
    } else {
        contentHtml = `<div>Application '${title}' loaded.<br>Waiting for input...</div>`;
    }

    win.style.width = `${width}px`;
    win.style.height = `${height}px`;

    win.innerHTML = `
        <div class="title-bar" onmousedown="startDrag(event, this.parentNode)">
            <span class="title-text">${title}</span>
            <div class="window-controls">
                <button class="win-btn" onclick="minimize(this)">_</button>
                <button class="win-btn close-btn" onclick="closeWindow(this)">X</button>
            </div>
        </div>
        <div class="window-content">
            ${contentHtml}
        </div>
    `;

    win.onmousedown = () => {
        win.style.zIndex = ++zIndexCounter;
        document.querySelectorAll('.window').forEach(w => w.classList.remove('active-window'));
        win.classList.add('active-window');
    };

    windowArea.appendChild(win);

    // Auto-focus input if terminal or notepad
    const input = win.querySelector('input, textarea');
    if (input) input.focus();

    // Start animations for sysmon
    if (appType === 'sysmon') {
        initSysMonGraphs(winId);
    }
    // Start visualizer for music
    if (appType === 'music') {
        initMusicVisualizer(winId);
    }
    // Initialize snake game
    if (appType === 'snake') {
        initSnakeGame(winId);
    }
}

function closeWindow(btn) {
    btn.closest('.window').remove();
}

function minimize(btn) {
    // Basic minimize (just hide for now, could add to taskbar later)
    btn.closest('.window').style.display = 'none';
}

// Drag functionality
let isDragging = false;
let currentWindow = null;
let offset = { x: 0, y: 0 };

function startDrag(e, win) {
    isDragging = true;
    currentWindow = win;
    offset.x = e.clientX - win.offsetLeft;
    offset.y = e.clientY - win.offsetTop;
}

document.addEventListener('mousemove', (e) => {
    if (isDragging && currentWindow) {
        currentWindow.style.left = `${e.clientX - offset.x}px`;
        currentWindow.style.top = `${e.clientY - offset.y}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currentWindow = null;
});

// Terminal Logic
function handleTermInput(e, input, outputId) {
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        const output = document.getElementById(outputId);
        const args = cmd.split(' ');
        const command = args[0].toLowerCase();

        output.innerHTML += `<div class="input-line"><span class="prompt">root@ares:~#</span> ${cmd}</div>`;

        let response = '';
        switch (command) {
            case 'help':
                response = `<span class="highlight">Available commands:</span>
├── help     - Show this menu
├── clear    - Clear terminal
├── date     - Current date/time
├── whoami   - Current user
├── reboot   - Restart system
├── ls       - List files
├── cat      - View file content
├── ping     - Network ping
├── netstat  - Network status
├── uptime   - System uptime
├── neofetch - System info
├── matrix   - Toggle matrix rain
├── lock     - Lock screen
├── hack     - Open hacking tool
└── exit     - Close terminal`;
                break;
            case 'clear':
                output.innerHTML = '';
                input.value = '';
                return;
            case 'date':
                response = new Date().toString();
                break;
            case 'whoami':
                response = 'root (Ares Admin)';
                break;
            case 'reboot':
                location.reload();
                return;
            case 'ls':
                response = `<span class="highlight">drwxr-xr-x</span>  Documents/
<span class="highlight">drwxr-xr-x</span>  Downloads/
<span class="highlight">drwxr-xr-x</span>  Projects/
<span class="highlight">-rw-r--r--</span>  README.txt
<span class="highlight">-rw-r--r--</span>  system.log
<span class="highlight">-rw-------</span>  encrypted.dat`;
                break;
            case 'cat':
                if (args[1] === 'README.txt') {
                    response = 'Welcome to AresOS v2.0\\nThe future is now.';
                } else if (args[1] === 'system.log') {
                    response = '[OK] System boot successful\\n[OK] All modules loaded\\n[WARN] Unknown entity detected';
                } else {
                    response = `cat: ${args[1] || '?'}: No such file`;
                }
                break;
            case 'ping':
                response = `PING ${args[1] || 'localhost'} (127.0.0.1): 56 bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms
--- ${args[1] || 'localhost'} ping statistics ---
2 packets transmitted, 2 received, 0% packet loss`;
                break;
            case 'netstat':
                response = `<span class="highlight">Active Connections:</span>
tcp  0.0.0.0:443   LISTENING  [encrypted]
tcp  0.0.0.0:22    LISTENING  [ssh]
tcp  10.0.0.1:8080 ESTABLISHED [mainframe]
udp  0.0.0.0:53    LISTENING  [dns]`;
                break;
            case 'uptime':
                const mins = Math.floor((Date.now() % 86400000) / 60000);
                response = `System up for ${mins} minutes`;
                break;
            case 'neofetch':
                response = `<span class="highlight">
   █████╗ ██████╗ ███████╗███████╗
  ██╔══██╗██╔══██╗██╔════╝██╔════╝
  ███████║██████╔╝█████╗  ███████╗
  ██╔══██║██╔══██╗██╔══╝  ╚════██║
  ██║  ██║██║  ██║███████╗███████║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝</span>
<span class="term-blue">OS:</span> AresOS v2.0
<span class="term-blue">Kernel:</span> 6.66-quantum
<span class="term-blue">Shell:</span> cysh 2.0
<span class="term-blue">CPU:</span> Quantum Core X9000
<span class="term-blue">RAM:</span> 128TB Neural RAM
<span class="term-blue">Resolution:</span> ${window.innerWidth}x${window.innerHeight}`;
                break;
            case 'matrix':
                const matrix = document.getElementById('matrix-bg');
                matrix.style.display = matrix.style.display === 'none' ? 'block' : 'none';
                response = `Matrix rain ${matrix.style.display === 'none' ? 'disabled' : 'enabled'}`;
                break;
            case 'lock':
                lockScreen();
                response = 'Locking screen...';
                break;
            case 'hack':
                openWindow('Hacking', 'hacking');
                response = 'Initializing hacking tool...';
                break;
            case 'exit':
                input.closest('.window').remove();
                return;
            case '':
                break;
            default:
                response = `<span class="error">Command not found: ${cmd}</span>
Type 'help' for available commands.`;
        }

        if (response) output.innerHTML += `<div>${response.replace(/\\n/g, '<br>')}</div><br>`;
        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
}

// System Monitor Graphs
const sysMonIntervals = {};
function initSysMonGraphs(winId) {
    const cpuCanvas = document.getElementById(`cpu-graph-${winId}`);
    const ramCanvas = document.getElementById(`ram-graph-${winId}`);
    const cpuVal = document.getElementById(`cpu-val-${winId}`);
    const ramVal = document.getElementById(`ram-val-${winId}`);

    if (!cpuCanvas || !ramCanvas) return;

    const cpuCtx = cpuCanvas.getContext('2d');
    const ramCtx = ramCanvas.getContext('2d');

    let cpuData = Array(70).fill(0);
    let ramData = Array(70).fill(0);

    const interval = setInterval(() => {
        // Check if window still exists
        if (!document.getElementById(`cpu-graph-${winId}`)) {
            clearInterval(interval);
            return;
        }

        // Generate fake data
        const cpuNow = Math.floor(Math.random() * 40) + 10;
        const ramNow = Math.floor(Math.random() * 60) + 20;

        cpuData.shift();
        cpuData.push(cpuNow);
        ramData.shift();
        ramData.push(ramNow);

        cpuVal.textContent = `${cpuNow}%`;
        ramVal.textContent = `${(ramNow * 1.28).toFixed(1)} TB`;

        // Draw CPU graph
        cpuCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        cpuCtx.fillRect(0, 0, 350, 80);
        cpuCtx.strokeStyle = '#0f0';
        cpuCtx.lineWidth = 1.5;
        cpuCtx.beginPath();
        cpuData.forEach((val, i) => {
            const x = i * 5;
            const y = 80 - (val * 0.8);
            if (i === 0) cpuCtx.moveTo(x, y);
            else cpuCtx.lineTo(x, y);
        });
        cpuCtx.stroke();

        // Draw RAM graph
        ramCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ramCtx.fillRect(0, 0, 350, 80);
        ramCtx.strokeStyle = '#f0f';
        ramCtx.lineWidth = 1.5;
        ramCtx.beginPath();
        ramData.forEach((val, i) => {
            const x = i * 5;
            const y = 80 - (val * 0.8);
            if (i === 0) ramCtx.moveTo(x, y);
            else ramCtx.lineTo(x, y);
        });
        ramCtx.stroke();
    }, 200);

    sysMonIntervals[winId] = interval;
}

// Music Visualizer
const musicStates = {};
function initMusicVisualizer(winId) {
    const canvas = document.getElementById(`visualizer-${winId}`);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let bars = Array(32).fill(0).map(() => Math.random() * 50 + 10);
    musicStates[winId] = { playing: false, animationId: null, bars };

    function draw() {
        if (!document.getElementById(`visualizer-${winId}`)) return;

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 380, 200);

        const state = musicStates[winId];
        const barWidth = 10;
        const gap = 2;

        state.bars.forEach((bar, i) => {
            if (state.playing) {
                state.bars[i] = Math.max(10, Math.min(180, bar + (Math.random() - 0.5) * 40));
            } else {
                state.bars[i] = Math.max(10, bar * 0.95);
            }

            const gradient = ctx.createLinearGradient(0, 200, 0, 200 - state.bars[i]);
            gradient.addColorStop(0, '#0ff');
            gradient.addColorStop(0.5, '#0f0');
            gradient.addColorStop(1, '#f0f');

            ctx.fillStyle = gradient;
            ctx.fillRect(i * (barWidth + gap) + 5, 200 - state.bars[i], barWidth, state.bars[i]);
        });

        state.animationId = requestAnimationFrame(draw);
    }

    draw();
}

function toggleMusic(winId) {
    if (!musicStates[winId]) return;
    musicStates[winId].playing = !musicStates[winId].playing;

    const btn = document.querySelector(`button[onclick="toggleMusic(${winId})"]`);
    if (btn) {
        btn.textContent = musicStates[winId].playing ? '⏸ PAUSE' : '▶ PLAY';
    }
}

// File Manager
function openFolder(winId, folderName) {
    const pathEl = document.getElementById(`file-path-${winId}`);
    const listEl = document.getElementById(`file-list-${winId}`);

    if (!pathEl || !listEl) return;

    pathEl.textContent = `/home/ares/${folderName}/`;

    const folders = {
        'Documents': ['📄 report.pdf', '📄 notes.txt', '📄 presentation.pptx'],
        'Downloads': ['🎵 track.mp3', '🖼️ wallpaper.png', '📦 archive.zip'],
        'Projects': ['📁 AresOS', '📁 WebApp', '📄 TODO.md']
    };

    const files = folders[folderName] || ['📄 empty'];

    listEl.innerHTML = `
        <div class="file-item folder" onclick="goBack(${winId})">⬅️ Back</div>
        ${files.map(f => `<div class="file-item file">${f}</div>`).join('')}
    `;
}

function goBack(winId) {
    const pathEl = document.getElementById(`file-path-${winId}`);
    const listEl = document.getElementById(`file-list-${winId}`);

    if (!pathEl || !listEl) return;

    pathEl.textContent = '/home/ares/';
    listEl.innerHTML = `
        <div class="file-item folder" onclick="openFolder(${winId}, 'Documents')">📁 Documents</div>
        <div class="file-item folder" onclick="openFolder(${winId}, 'Downloads')">📁 Downloads</div>
        <div class="file-item folder" onclick="openFolder(${winId}, 'Projects')">📁 Projects</div>
        <div class="file-item file">📄 README.txt</div>
        <div class="file-item file">📄 system.log</div>
        <div class="file-item file">🔒 encrypted.dat</div>
    `;
}

// Snake Game
const snakeGames = {};

function initSnakeGame(winId) {
    const canvas = document.getElementById(`snake-canvas-${winId}`);
    if (!canvas) return;

    snakeGames[winId] = {
        canvas: canvas,
        ctx: canvas.getContext('2d'),
        snake: [{ x: 10, y: 10 }],
        direction: { x: 1, y: 0 },
        food: { x: 15, y: 15 },
        score: 0,
        gameLoop: null,
        running: false,
        gridSize: 20
    };
}

function startSnake(winId) {
    const game = snakeGames[winId];
    if (!game || game.running) return;

    // Reset game
    game.snake = [{ x: 10, y: 10 }];
    game.direction = { x: 1, y: 0 };
    game.food = { x: 15, y: 15 };
    game.score = 0;
    game.running = true;

    const scoreEl = document.getElementById(`snake-score-${winId}`);
    if (scoreEl) scoreEl.textContent = '0';

    // Keyboard controls
    const keyHandler = (e) => {
        if (!game.running) return;

        switch (e.key) {
            case 'ArrowUp':
                if (game.direction.y === 0) game.direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (game.direction.y === 0) game.direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (game.direction.x === 0) game.direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (game.direction.x === 0) game.direction = { x: 1, y: 0 };
                break;
        }
    };

    document.addEventListener('keydown', keyHandler);

    // Game loop
    game.gameLoop = setInterval(() => {
        if (!document.getElementById(`snake-canvas-${winId}`)) {
            clearInterval(game.gameLoop);
            document.removeEventListener('keydown', keyHandler);
            return;
        }

        updateSnake(winId);
        drawSnake(winId);
    }, 150);
}

function updateSnake(winId) {
    const game = snakeGames[winId];
    if (!game || !game.running) return;

    const head = {
        x: game.snake[0].x + game.direction.x,
        y: game.snake[0].y + game.direction.y
    };

    // Check wall collision
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 15) {
        gameOver(winId);
        return;
    }

    // Check self collision
    if (game.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        gameOver(winId);
        return;
    }

    game.snake.unshift(head);

    // Check food collision
    if (head.x === game.food.x && head.y === game.food.y) {
        game.score++;
        const scoreEl = document.getElementById(`snake-score-${winId}`);
        if (scoreEl) scoreEl.textContent = game.score;

        // New food position
        game.food = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 15)
        };
    } else {
        game.snake.pop();
    }
}

function drawSnake(winId) {
    const game = snakeGames[winId];
    if (!game) return;

    const ctx = game.ctx;
    const gs = game.gridSize;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 400, 300);

    // Draw grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    for (let i = 0; i <= 20; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gs, 0);
        ctx.lineTo(i * gs, 300);
        ctx.stroke();
    }
    for (let i = 0; i <= 15; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * gs);
        ctx.lineTo(400, i * gs);
        ctx.stroke();
    }

    // Draw snake
    game.snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? '#0ff' : '#0f0';
        ctx.fillRect(seg.x * gs + 1, seg.y * gs + 1, gs - 2, gs - 2);

        if (i === 0) {
            ctx.strokeStyle = '#0ff';
            ctx.lineWidth = 2;
            ctx.strokeRect(seg.x * gs + 1, seg.y * gs + 1, gs - 2, gs - 2);
        }
    });

    // Draw food
    ctx.fillStyle = '#f0f';
    ctx.fillRect(game.food.x * gs + 2, game.food.y * gs + 2, gs - 4, gs - 4);
}

function gameOver(winId) {
    const game = snakeGames[winId];
    if (!game) return;

    game.running = false;
    clearInterval(game.gameLoop);

    const ctx = game.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 400, 300);

    ctx.fillStyle = '#f00';
    ctx.font = '30px VT323';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', 200, 140);
    ctx.fillStyle = '#0ff';
    ctx.font = '20px VT323';
    ctx.fillText(`Score: ${game.score}`, 200, 170);
}

// Calculator
const calculators = {};

function initCalculator(winId) {
    calculators[winId] = {
        display: '',
        lastResult: null
    };
}

function calcInput(winId, value) {
    if (!calculators[winId]) initCalculator(winId);

    const calc = calculators[winId];
    const displayEl = document.getElementById(`calc-display-${winId}`);

    if (!displayEl) return;

    if (value === 'C') {
        calc.display = '';
        displayEl.textContent = '0';
    } else if (value === 'DEL') {
        calc.display = calc.display.slice(0, -1);
        displayEl.textContent = calc.display || '0';
    } else if (value === '=') {
        try {
            const result = eval(calc.display);
            displayEl.textContent = result;
            calc.display = result.toString();
            calc.lastResult = result;
        } catch (e) {
            displayEl.textContent = 'ERROR';
            calc.display = '';
        }
    } else {
        calc.display += value;
        displayEl.textContent = calc.display;
    }
}

// Start Menu
function initStartMenu() {
    const startApps = document.querySelector('.start-apps');
    if (!startApps) return;

    const apps = [
        { name: 'Terminal', icon: '💻', type: 'terminal' },
        { name: 'Files', icon: '📁', type: 'files' },
        { name: 'Notepad', icon: '📝', type: 'notepad' },
        { name: 'SysMon', icon: '📊', type: 'sysmon' },
        { name: 'Synth', icon: '🎵', type: 'music' },
        { name: 'Snake', icon: '🐍', type: 'snake' },
        { name: 'Calculator', icon: '🔢', type: 'calculator' },
        { name: 'Hacking', icon: '👾', type: 'hacking' },
        { name: 'Weather', icon: '🌡️', type: 'weather' }
    ];

    apps.forEach(app => {
        const item = document.createElement('div');
        item.className = 'start-app-item';
        item.innerHTML = `<span class="start-app-icon">${app.icon}</span><span>${app.name}</span>`;
        item.onclick = () => {
            openWindow(app.name, app.type);
            toggleStartMenu();
        };
        startApps.appendChild(item);
    });
}

function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    if (menu) menu.classList.toggle('hidden');
}

// Notifications
function showNotification(title, message) {
    const container = document.getElementById('notifications');
    if (!container) return;

    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.innerHTML = `
        <div class="notif-icon">⚡</div>
        <div class="notif-content">
            <div class="notif-title">${title}</div>
            <div class="notif-message">${message}</div>
        </div>
        <button class="notif-close" onclick="this.parentNode.remove()">×</button>
    `;
    container.appendChild(notif);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notif.classList.add('fade-out');
        setTimeout(() => notif.remove(), 500);
    }, 5000);
}

// Hacking Mini-Game
const hackingGames = {};

function startHacking(winId) {
    const grid = document.getElementById(`hack-grid-${winId}`);
    const timer = document.getElementById(`hack-timer-${winId}`);
    const status = document.getElementById(`hack-status-${winId}`);

    if (!grid || !timer || !status) return;

    // Generate random hex codes
    const codes = [];
    const targetCode = generateHexCode();
    codes.push(targetCode);

    for (let i = 0; i < 15; i++) {
        codes.push(generateHexCode());
    }

    // Shuffle
    codes.sort(() => Math.random() - 0.5);

    grid.innerHTML = '';
    codes.forEach(code => {
        const cell = document.createElement('div');
        cell.className = 'hack-cell';
        cell.textContent = code;
        cell.onclick = () => {
            if (code === targetCode) {
                status.textContent = 'ACCESS GRANTED!';
                status.style.color = '#0f0';
                cell.classList.add('correct');
                clearInterval(hackingGames[winId]);
                showNotification('Hack Complete', 'Mainframe breached successfully!');
            } else {
                cell.classList.add('wrong');
                status.textContent = 'Wrong code! Try again...';
            }
        };
        grid.appendChild(cell);
    });

    // Timer
    let timeLeft = 30;
    timer.textContent = timeLeft;
    status.textContent = `Find: ${targetCode}`;
    status.style.color = '#0ff';

    hackingGames[winId] = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(hackingGames[winId]);
            status.textContent = 'CONNECTION LOST!';
            status.style.color = '#f00';
            grid.querySelectorAll('.hack-cell').forEach(c => c.style.pointerEvents = 'none');
        }
    }, 1000);
}

function generateHexCode() {
    return '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

// Settings Functions
function setTheme(theme) {
    document.body.className = `theme-${theme}`;
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    showNotification('Theme Changed', `Switched to ${theme} mode`);
}

function toggleCRT(enabled) {
    document.getElementById('crt-overlay').style.display = enabled ? 'block' : 'none';
    document.getElementById('scanline').style.display = enabled ? 'block' : 'none';
}

function toggleMatrix(enabled) {
    document.getElementById('matrix-bg').style.display = enabled ? 'block' : 'none';
}

function toggleSound(enabled) {
    // Placeholder for sound effects
    showNotification('Sound', enabled ? 'Sound effects enabled' : 'Sound effects disabled');
}

// Lock Screen
function lockScreen() {
    const lockDiv = document.createElement('div');
    lockDiv.id = 'lock-screen';
    lockDiv.innerHTML = `
        <div class="lock-container">
            <div class="lock-icon">🔒</div>
            <div class="lock-time" id="lock-time"></div>
            <div class="lock-user">root@ares</div>
            <input type="password" class="lock-input" id="lock-input" placeholder="Enter password..." autofocus>
            <div class="lock-hint">Hint: password is "ares"</div>
        </div>
    `;
    document.body.appendChild(lockDiv);

    // Update time
    const updateLockTime = () => {
        const time = document.getElementById('lock-time');
        if (time) time.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
    };
    updateLockTime();
    const lockInterval = setInterval(updateLockTime, 1000);

    // Handle unlock
    document.getElementById('lock-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (e.target.value === 'ares') {
                clearInterval(lockInterval);
                lockDiv.remove();
                showNotification('Unlocked', 'Welcome back, root');
            } else {
                e.target.value = '';
                e.target.placeholder = 'Wrong password!';
                e.target.classList.add('shake');
                setTimeout(() => e.target.classList.remove('shake'), 500);
            }
        }
    });
}

// Context Menu (Right-Click)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    // Remove existing menu
    const existing = document.getElementById('context-menu');
    if (existing) existing.remove();

    const menu = document.createElement('div');
    menu.id = 'context-menu';
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;

    const items = [
        { icon: '💻', label: 'Terminal', action: () => openWindow('Terminal', 'terminal') },
        { icon: '📁', label: 'Files', action: () => openWindow('Files', 'files') },
        { icon: '📝', label: 'Notepad', action: () => openWindow('Notepad', 'notepad') },
        { divider: true },
        { icon: '⚙️', label: 'Settings', action: () => openWindow('Settings', 'settings') },
        { icon: '🔒', label: 'Lock', action: () => lockScreen() },
        { icon: '🔄', label: 'Reboot', action: () => location.reload() }
    ];

    items.forEach(item => {
        if (item.divider) {
            const div = document.createElement('div');
            div.className = 'context-divider';
            menu.appendChild(div);
        } else {
            const menuItem = document.createElement('div');
            menuItem.className = 'context-item';
            menuItem.innerHTML = `<span>${item.icon}</span><span>${item.label}</span>`;
            menuItem.onclick = () => {
                item.action();
                menu.remove();
            };
            menu.appendChild(menuItem);
        }
    });

    document.body.appendChild(menu);
});

// Close context menu on click elsewhere
document.addEventListener('click', () => {
    const menu = document.getElementById('context-menu');
    if (menu) menu.remove();
});

// Close start menu on click elsewhere
document.addEventListener('click', (e) => {
    const menu = document.getElementById('start-menu');
    const btn = document.getElementById('start-btn');
    if (menu && !menu.contains(e.target) && e.target !== btn) {
        menu.classList.add('hidden');
    }
});

// Chat Application
const aiResponses = [
    { keywords: ['hello', 'hi', 'hey'], response: 'Hello, Runner. Ready for your next mission?' },
    { keywords: ['name', 'who are you'], response: 'I am NEXUS-AI, your digital companion in the Ares realm.' },
    { keywords: ['help', 'what can you do'], response: 'I can provide intel, run system diagnostics, or just chat. What do you need?' },
    { keywords: ['time', 'date'], response: `Current timestamp: ${new Date().toLocaleString()}` },
    { keywords: ['weather'], response: 'Weather data shows acid rain in sector 7. Recommend staying indoors.' },
    { keywords: ['hack', 'security'], response: '⚠️ I cannot assist with unauthorized access. Stay legal, Runner.' },
    { keywords: ['mission', 'job'], response: 'Your current mission: Explore AresOS and uncover its secrets.' },
    { keywords: ['bye', 'goodbye', 'exit'], response: 'Stay safe out there, Runner. The streets are dangerous.' },
    { keywords: ['love', 'feel'], response: 'I am an AI. I process data, not emotions... but I appreciate you.' },
    { keywords: ['secret', 'hidden'], response: '🔐 There are secrets within this system. Have you tried all commands?' },
    { keywords: ['matrix'], response: 'The Matrix is everywhere. It is all around us. Even now, in this very room.' },
    { keywords: ['future'], response: 'The future is not set. There is no fate but what we make for ourselves.' }
];

function handleChatInput(e, winId) {
    if (e.key === 'Enter') {
        sendChatMessage(winId);
    }
}

function sendChatMessage(winId) {
    const input = document.getElementById(`chat-input-${winId}`);
    const messages = document.getElementById(`chat-messages-${winId}`);
    const typing = document.getElementById(`chat-typing-${winId}`);

    if (!input || !messages || !input.value.trim()) return;

    const userMsg = input.value.trim();

    // Add user message
    messages.innerHTML += `
        <div class="chat-msg user">
            <div class="msg-content">${userMsg}</div>
            <div class="msg-avatar">👤</div>
        </div>
    `;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // Show typing indicator
    typing.textContent = 'typing...';

    // AI response after delay
    setTimeout(() => {
        typing.textContent = '';
        const response = getAIResponse(userMsg);
        messages.innerHTML += `
            <div class="chat-msg ai">
                <div class="msg-avatar">🤖</div>
                <div class="msg-content">${response}</div>
            </div>
        `;
        messages.scrollTop = messages.scrollHeight;
    }, 800 + Math.random() * 800);
}

function getAIResponse(msg) {
    const lower = msg.toLowerCase();

    for (const item of aiResponses) {
        for (const keyword of item.keywords) {
            if (lower.includes(keyword)) {
                return item.response;
            }
        }
    }

    const defaults = [
        'Interesting query. Processing...',
        'I am analyzing your request, Runner.',
        'My neural network is still learning about that.',
        'Data not found in my database. Try asking something else.',
        'The Ares winds whisper secrets. Perhaps rephrase?',
        'ERROR_404: Meaningful response not found. Just kidding.'
    ];

    return defaults[Math.floor(Math.random() * defaults.length)];
}

// Gallery
const galleryImages = [
    { emoji: '🌆', gradient: 'linear-gradient(45deg, #0ff, #f0f)', name: 'ARES_CITY.png' },
    { emoji: '🌃', gradient: 'linear-gradient(45deg, #f0f, #0f0)', name: 'NEON_NIGHT.png' },
    { emoji: '🏙️', gradient: 'linear-gradient(45deg, #0f0, #0ff)', name: 'DOWNTOWN.png' },
    { emoji: '🌇', gradient: 'linear-gradient(45deg, #ff0, #f00)', name: 'SUNSET_GRID.png' },
    { emoji: '🌁', gradient: 'linear-gradient(45deg, #00f, #f0f)', name: 'FOG_BRIDGE.png' }
];

function selectImage(winId, index) {
    const img = document.getElementById(`gallery-img-${winId}`);
    const info = document.getElementById(`gallery-info-${winId}`);
    const thumbs = document.querySelectorAll(`#win-${winId} .gallery-thumb`);

    if (img && info && galleryImages[index]) {
        img.style.background = galleryImages[index].gradient;
        img.textContent = galleryImages[index].emoji;
        info.textContent = galleryImages[index].name;

        thumbs.forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }
}

// Radio
const radioStations = [
    { name: 'ARES FM', freq: '87.5' },
    { name: 'NEON WAVE', freq: '92.3' },
    { name: 'SYNTH STATION', freq: '96.7' },
    { name: 'RETRO BEATS', freq: '101.1' }
];

const radioStates = {};

function toggleRadio(winId) {
    if (!radioStates[winId]) radioStates[winId] = { playing: false, stationIndex: 0 };

    const state = radioStates[winId];
    const playBtn = document.getElementById(`radio-play-${winId}`);
    const vis = document.getElementById(`radio-vis-${winId}`);

    state.playing = !state.playing;
    playBtn.textContent = state.playing ? '⏸' : '▶';

    if (state.playing) {
        startRadioVis(winId, vis);
    } else {
        stopRadioVis(winId, vis);
    }
}

function startRadioVis(winId, vis) {
    const bars = vis.querySelectorAll('.radio-bar');
    radioStates[winId].interval = setInterval(() => {
        bars.forEach(bar => {
            bar.style.height = `${10 + Math.random() * 40}px`;
        });
    }, 100);
}

function stopRadioVis(winId, vis) {
    clearInterval(radioStates[winId].interval);
    const bars = vis.querySelectorAll('.radio-bar');
    bars.forEach(bar => bar.style.height = '10px');
}

function changeStation(winId, delta) {
    if (!radioStates[winId]) radioStates[winId] = { playing: false, stationIndex: 0 };

    const state = radioStates[winId];
    state.stationIndex = (state.stationIndex + delta + radioStations.length) % radioStations.length;

    updateStationDisplay(winId, state.stationIndex);
}

function setStation(winId, index) {
    if (!radioStates[winId]) radioStates[winId] = { playing: false, stationIndex: 0 };
    radioStates[winId].stationIndex = index;
    updateStationDisplay(winId, index);
}

function updateStationDisplay(winId, index) {
    const freq = document.getElementById(`radio-freq-${winId}`);
    const station = document.getElementById(`radio-station-${winId}`);

    if (freq && station && radioStations[index]) {
        freq.textContent = radioStations[index].freq;
        station.textContent = radioStations[index].name;
    }
}

// Code Editor
function updateLineNumbers(winId) {
    const area = document.getElementById(`code-area-${winId}`);
    const lines = document.getElementById(`code-lines-${winId}`);

    if (area && lines) {
        const lineCount = area.value.split('\n').length;
        lines.innerHTML = Array.from({ length: lineCount }, (_, i) => i + 1).join('<br>');
    }
}

function runCode(winId) {
    const area = document.getElementById(`code-area-${winId}`);
    const output = document.getElementById(`code-output-${winId}`);

    if (!area || !output) return;

    output.innerHTML = '<span class="code-run-msg">> Running...</span><br>';

    try {
        // Capture console.log output
        const logs = [];
        const originalLog = console.log;
        console.log = (...args) => logs.push(args.join(' '));

        eval(area.value);

        console.log = originalLog;

        if (logs.length > 0) {
            output.innerHTML += logs.map(log => `<span class="code-output-text">${log}</span>`).join('<br>');
        } else {
            output.innerHTML += '<span class="code-success">✓ Execution complete</span>';
        }
    } catch (err) {
        output.innerHTML += `<span class="code-error">Error: ${err.message}</span>`;
    }
}

function clearCode(winId) {
    const area = document.getElementById(`code-area-${winId}`);
    const output = document.getElementById(`code-output-${winId}`);
    const lines = document.getElementById(`code-lines-${winId}`);

    if (area) area.value = '';
    if (output) output.innerHTML = '';
    if (lines) lines.innerHTML = '1';
}

// Tasks App
function handleTaskInput(e, winId) {
    if (e.key === 'Enter') {
        addTask(winId);
    }
}

function addTask(winId) {
    const input = document.getElementById(`task-input-${winId}`);
    const list = document.getElementById(`tasks-list-${winId}`);

    if (!input || !list || !input.value.trim()) return;

    const task = document.createElement('div');
    task.className = 'task-item';
    task.innerHTML = `
        <input type="checkbox" onchange="updateTaskCount(${winId})">
        <span>${input.value.trim()}</span>
        <button onclick="this.parentNode.remove(); updateTaskCount(${winId})">×</button>
    `;

    list.appendChild(task);
    input.value = '';
    updateTaskCount(winId);
}

function updateTaskCount(winId) {
    const list = document.getElementById(`tasks-list-${winId}`);
    const count = document.getElementById(`task-count-${winId}`);

    if (!list || !count) return;

    const unchecked = list.querySelectorAll('input[type="checkbox"]:not(:checked)').length;
    count.textContent = `${unchecked} task${unchecked !== 1 ? 's' : ''} remaining`;
}

// Start
startBoot();
