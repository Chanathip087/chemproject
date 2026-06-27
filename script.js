// ==========================================
// 1. Background Particles System
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function initParticles() {
        particles = [];
        const count = Math.min(40, Math.floor(window.innerWidth / 30));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 1 + Math.random() * 2.5,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(126, 200, 239, 0.25)';
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;

            // Bounce off screen boundaries
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});

// ==========================================
// 2. Navigation Scroll & Spotlight Effects
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Nav scroll blur effect
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Cursor spotlight effect
    const spotlight = document.getElementById('cursor-spotlight');
    if (spotlight) {
        window.addEventListener('pointermove', event => {
            spotlight.style.setProperty('--x', `${event.clientX}px`);
            spotlight.style.setProperty('--y', `${event.clientY}px`);
        });
    }

    // Scroll Reveal Intersection Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Active Nav Link Highlight
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active',
                        link.getAttribute('href') === `#${entry.target.id}`
                    );
                });
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(section => navObserver.observe(section));

    // Card spotlight tracking effect
    document.querySelectorAll('.card, .section-heading').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
            card.style.setProperty('--glow-opacity', '1');
        });
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--glow-opacity', '0');
        });
    });
});

// ==========================================
// 3. Interactive Chemistry Quiz
// ==========================================
const quizData = [
    {
        question: "เมื่ออุณหภูมิคงที่ ถ้าปริมาตรของแก๊สลดลง ความดันของแก๊สจะเป็นอย่างไรตามกฎของบอยล์ (Boyle's Law)?",
        options: [
            "ความดันเพิ่มขึ้น",
            "ความดันลดลง",
            "ความดันคงที่",
            "ความดันกลายเป็นศูนย์"
        ],
        correct: 0,
        explanation: "ตามกฎของบอยล์ ความดันและปริมาตรแปรผกผันซึ่งกันและกัน (เมื่ออุณหภูมิและโมลคงที่) ดังนั้นเมื่อปริมาตรลดลง ความดันจึงเพิ่มขึ้น"
    },
    {
        question: "กฎของชาร์ล (Charles's Law) กล่าวถึงความสัมพันธ์ระหว่างตัวแปรใด?",
        options: [
            "ความดันและปริมาตร",
            "ปริมาตรและอุณหภูมิสัมบูรณ์",
            "ความดันและจำนวนโมล",
            "อุณหภูมิและความดัน"
        ],
        correct: 1,
        explanation: "กฎของชาร์ลกล่าวถึงความสัมพันธ์ของปริมาตรและอุณหภูมิสัมบูรณ์ (เคลวิน) โดยปริมาตรจะแปรผันตรงกับอุณหภูมิสัมบูรณ์เมื่อความดันคงที่"
    },
    {
        question: "ถ้าอุณหภูมิของแก๊สในภาชนะปิดเพิ่มขึ้น ความดันจะเป็นอย่างไรตามกฎของเกย์-ลูสแซก (Gay-Lussac's Law)?",
        options: [
            "ความดันจะลดลง",
            "ความดันจะเพิ่มขึ้น",
            "ความดันจะคงที่",
            "ไม่มีข้อใดถูก"
        ],
        correct: 1,
        explanation: "ตามกฎของเกย์-ลูสแซก ความดันจะแปรผันตรงกับอุณหภูมิสัมบูรณ์ (เมื่อปริมาตรและโมลคงที่) ดังนั้นเมื่ออุณหภูมิสูงขึ้น ความดันจึงเพิ่มขึ้นเนื่องจากอนุภาคชนผนังบ่อยขึ้น"
    },
    {
        question: "สมการแก๊สอุดมคติ (Ideal Gas Law) คือข้อใด?",
        options: [
            "PV = nRT",
            "P₁V₁ = P₂V₂",
            "V₁/T₁ = V₂/T₂",
            "PV = k"
        ],
        correct: 0,
        explanation: "สมการแก๊สอุดมคติ (Ideal Gas Law) คือ PV = nRT ซึ่งรวมกฎของบอยล์ ชาร์ล และอาโวกาโดรเข้าด้วยกันโดยมี R เป็นค่าคงที่"
    },
    {
        question: "อุณหภูมิในหน่วยองศาเซลเซียส (Celsius) ต้องแปลงเป็นหน่วยใดก่อนนำไปคำนวณในกฎของแก๊ส?",
        options: [
            "ฟาเรนไฮต์ (Fahrenheit)",
            "เคลวิน (Kelvin)",
            "โรเมอร์ (Réaumur)",
            "ไม่จำเป็นต้องแปลง"
        ],
        correct: 1,
        explanation: "ในการคำนวณกฎของแก๊ส ต้องใช้อุณหภูมิสัมบูรณ์ (Absolute Temperature) ในหน่วยเคลวิน (K) เสมอ โดยการคำนวณคือ K = °C + 273.15"
    }
];

let currentQuestionIndex = 0;
let quizScore = 0;
let answerSelected = false;

window.startQuiz = function() {
    document.getElementById('quiz-start-screen').style.display = 'none';
    document.getElementById('quiz-question-screen').style.display = 'block';
    document.getElementById('quiz-result-screen').style.display = 'none';
    currentQuestionIndex = 0;
    quizScore = 0;
    answerSelected = false;
    showQuestion();
};

function showQuestion() {
    answerSelected = false;
    document.getElementById('quiz-explanation-box').style.display = 'none';
    
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('quiz-question-number').innerText = `ข้อที่ ${currentQuestionIndex + 1}/${quizData.length}`;
    document.getElementById('quiz-score-badge').innerText = `คะแนน: ${quizScore}`;
    document.getElementById('quiz-question-text').innerText = currentQuestion.question;
    
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    document.getElementById('quiz-progress').style.width = `${progressPercent}%`;
    
    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = '';
    
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option-btn';
        button.innerHTML = `<span class="option-prefix">${String.fromCharCode(65 + index)}.</span> <span class="option-text">${option}</span>`;
        button.onclick = () => selectOption(index, button);
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedIndex, selectedButton) {
    if (answerSelected) return; // Prevent double selection
    answerSelected = true;
    
    const currentQuestion = quizData[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.quiz-option-btn');
    
    optionButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === currentQuestion.correct) {
            button.classList.add('correct');
        }
        if (index === selectedIndex && selectedIndex !== currentQuestion.correct) {
            button.classList.add('incorrect');
        }
    });
    
    if (selectedIndex === currentQuestion.correct) {
        quizScore++;
        document.getElementById('quiz-score-badge').innerText = `คะแนน: ${quizScore}`;
    }
    
    // Show explanation
    document.getElementById('quiz-explanation-text').innerHTML = `
        <strong>${selectedIndex === currentQuestion.correct ? '✅ ถูกต้อง!' : '❌ ยังไม่ถูกต้อง'}</strong> 
        ${currentQuestion.explanation}
    `;
    document.getElementById('quiz-explanation-box').style.display = 'block';
}

window.nextQuestion = function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    document.getElementById('quiz-question-screen').style.display = 'none';
    document.getElementById('quiz-result-screen').style.display = 'block';
    
    document.getElementById('quiz-final-score').innerText = quizScore;
    
    let evaluationMsg = "";
    if (quizScore === 5) {
        evaluationMsg = "🏆 สุดยอดไปเลย! คุณเข้าใจเรื่องแก๊สและสมบัติของแก๊สอย่างสมบูรณ์แบบ!";
    } else if (quizScore >= 3) {
        evaluationMsg = "👏 เก่งมาก! คุณมีความเข้าใจพื้นฐานที่ดีแล้ว ลองทบทวนจุดที่ผิดเล็กน้อยนะครับ";
    } else {
        evaluationMsg = "📚 ไม่เป็นไรนะ! ลองกลับไปอ่านเนื้อหาด้านบนและทดสอบความเข้าใจอีกครั้งครับ";
    }
    document.getElementById('quiz-result-message').innerText = evaluationMsg;
}

window.restartQuiz = function() {
    startQuiz();
};

// ==========================================
// 4. Gas Molecular Simulator (Piston Canvas)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gas-sim-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Controls and Readouts
    const tempRange = document.getElementById('sim-temp-range');
    const volRange = document.getElementById('sim-vol-range');
    const nRange = document.getElementById('sim-n-range');

    const tempVal = document.getElementById('sim-temp-val');
    const volVal = document.getElementById('sim-vol-val');
    const nVal = document.getElementById('sim-n-val');
    const pressureVal = document.getElementById('sim-pressure-val');

    // Constants
    const R = 0.0821;
    const V_MAX = 5.0; // Max volume unit
    const SPEED_SCALE = 0.07; // Scaling factor for particle speed

    let particles = [];
    let width = canvas.width;
    let height = canvas.height;

    function resizeCanvas() {
        // Maintain clean aspect ratio on fluid layouts
        const rect = canvas.parentNode.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = 250;
        width = canvas.width;
        height = canvas.height;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Helper to get parameters
    function getParams() {
        return {
            T: parseFloat(tempRange.value),
            V: parseFloat(volRange.value),
            n: parseFloat(nRange.value)
        };
    }

    // Update gauges & labels
    function updateDashboard() {
        const { T, V, n } = getParams();
        tempVal.innerText = T;
        volVal.innerText = V.toFixed(1);
        nVal.innerText = n.toFixed(2);

        // Ideal gas law: P = nRT / V
        const P = (n * R * T) / V;
        pressureVal.innerText = P.toFixed(2);
    }

    // Generate random particle inside current volume (piston)
    function createParticle(pistonX) {
        const { T } = getParams();
        const r = 4 + Math.random() * 3; // Particle radius
        const speed = SPEED_SCALE * Math.sqrt(T);
        const angle = Math.random() * Math.PI * 2;

        return {
            x: r + Math.random() * (pistonX - 2 * r - 10),
            y: r + Math.random() * (height - 2 * r - 10),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            r: r,
            color: getRandomParticleColor()
        };
    }

    function getRandomParticleColor() {
        // Glow palette: Cyan, Green, Purple
        const colors = [
            'rgba(126, 200, 239, 0.8)', // Cyan
            'rgba(79, 214, 166, 0.8)',  // Emerald Green
            'rgba(200, 160, 255, 0.8)'  // Soft Violet
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Sync particles list with Mole count (n)
    function syncParticlesCount(pistonX) {
        const { n } = getParams();
        const targetCount = Math.round(n * 200); // Scale moles to visible dots

        while (particles.length < targetCount) {
            particles.push(createParticle(pistonX));
        }
        while (particles.length > targetCount) {
            particles.pop();
        }
    }

    // Update particle speeds based on temperature
    function updateVelocities() {
        const { T } = getParams();
        const targetSpeed = SPEED_SCALE * Math.sqrt(T);

        particles.forEach(p => {
            const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (currentSpeed === 0) {
                const angle = Math.random() * Math.PI * 2;
                p.vx = Math.cos(angle) * targetSpeed;
                p.vy = Math.sin(angle) * targetSpeed;
            } else {
                const scale = targetSpeed / currentSpeed;
                p.vx *= scale;
                p.vy *= scale;
            }
        });
    }

    // Main Simulation Loop
    function simulate() {
        const { V } = getParams();
        
        // Piston Position (X coordinate of the slider barrier)
        // Leave at least some minimum container width
        const minX = 60;
        const pistonX = minX + (width - minX) * (V / V_MAX);

        // Sync particle counts and speeds
        syncParticlesCount(pistonX);

        // Clear simulation canvas
        ctx.clearRect(0, 0, width, height);

        // 1. Draw Piston Background/Grid Container
        ctx.fillStyle = 'rgba(6, 10, 18, 0.5)';
        ctx.fillRect(0, 0, pistonX, height);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        // Horizontal gridlines
        for (let y = 30; y < height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(pistonX, y);
            ctx.stroke();
        }

        // 2. Physics & Draw Particles
        particles.forEach(p => {
            // Update Position
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off walls (Elastic Collisions)
            // Left Wall
            if (p.x < p.r) {
                p.x = p.r;
                p.vx = -p.vx;
            }
            // Top Wall
            if (p.y < p.r) {
                p.y = p.r;
                p.vy = -p.vy;
            }
            // Bottom Wall
            if (p.y > height - p.r) {
                p.y = height - p.r;
                p.vy = -p.vy;
            }
            // Piston Wall (Right limit)
            if (p.x > pistonX - p.r - 4) {
                p.x = pistonX - p.r - 4;
                p.vx = -p.vx;
            }

            // Fallback: If pushed outside during sudden piston squeeze, push inside
            if (p.x > pistonX) {
                p.x = pistonX - p.r - 10;
            }

            // Draw Particle with Glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for other objects
        });

        // 3. Draw Outer Borders (Container boundaries)
        ctx.strokeStyle = 'rgba(126, 200, 239, 0.2)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(2, 2);
        ctx.lineTo(pistonX, 2);
        ctx.moveTo(2, height - 2);
        ctx.lineTo(pistonX, height - 2);
        ctx.moveTo(2, 2);
        ctx.lineTo(2, height - 2);
        ctx.stroke();

        // 4. Draw the Piston Shaft & Handle
        // Glowing piston cylinder representation
        const grad = ctx.createLinearGradient(pistonX - 4, 0, pistonX + 16, 0);
        grad.addColorStop(0, 'rgba(79, 214, 166, 0.8)'); // Front edge neon teal
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)');
        grad.addColorStop(0.7, 'rgba(20, 30, 45, 0.9)');
        grad.addColorStop(1, 'rgba(10, 15, 25, 0.95)');

        ctx.fillStyle = grad;
        ctx.fillRect(pistonX - 4, 0, 18, height);

        // Draw physical connecting rod extending to the right
        ctx.fillStyle = 'rgba(79, 214, 166, 0.2)';
        ctx.fillRect(pistonX + 14, height / 2 - 8, width - pistonX, 16);

        ctx.fillStyle = 'rgba(79, 214, 166, 0.4)';
        ctx.fillRect(pistonX + 14, height / 2 - 2, width - pistonX, 4);

        // Draw physical Piston handle grip lines
        ctx.strokeStyle = 'rgba(79, 214, 166, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pistonX + 5, height / 2 - 15);
        ctx.lineTo(pistonX + 5, height / 2 + 15);
        ctx.moveTo(pistonX + 9, height / 2 - 10);
        ctx.lineTo(pistonX + 9, height / 2 + 10);
        ctx.stroke();

        requestAnimationFrame(simulate);
    }

    // Attach listeners for interactive updates
    tempRange.addEventListener('input', () => {
        updateDashboard();
        updateVelocities();
    });
    volRange.addEventListener('input', updateDashboard);
    nRange.addEventListener('input', updateDashboard);

    // Init UI & start animation
    updateDashboard();
    simulate();
});
