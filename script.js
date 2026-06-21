function calculateGas() {
    const P = parseFloat(document.getElementById('pInput').value);
    const V = parseFloat(document.getElementById('vInput').value);
    const n = parseFloat(document.getElementById('nInput').value);
    const T = parseFloat(document.getElementById('tInput').value);
    const R = 0.0821;
    let resText = "";

    // ตรวจสอบว่าช่องไหนว่าง (NaN) และคำนวณค่าจากสูตร PV = nRT
    if (!P && V && n && T) {
        resText = "ความดัน (P) = " + ((n * R * T) / V).toFixed(4) + " atm";
    } else if (P && !V && n && T) {
        resText = "ปริมาตร (V) = " + ((n * R * T) / P).toFixed(4) + " L";
    } else if (P && V && !n && T) {
        resText = "จำนวนโมล (n) = " + ((P * V) / (R * T)).toFixed(4) + " mol";
    } else if (P && V && n && !T) {
        resText = "อุณหภูมิ (T) = " + ((P * V) / (n * R)).toFixed(4) + " K";
    } else {
        resText = "กรุณากรอกข้อมูลให้ครบ 3 ค่าเพื่อหาค่าที่เหลือ";
    }

    document.getElementById('result').innerText = resText;
}

// Scroll Reveal
document.addEventListener('DOMContentLoaded', function() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

// Lightweight Particles
document.addEventListener('DOMContentLoaded', function() {
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
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1 + Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.fillStyle = 'rgba(168, 230, 207, 0.5)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
});
