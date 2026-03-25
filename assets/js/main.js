// 淘宝桌面版CLAW - 官网交互脚本

document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 打字机效果 - 根据语言选择文本
  const typewriterElement = document.getElementById('typewriter');
  const isEnglish = document.documentElement.lang === 'en';
  const texts = isEnglish ? [
    'Let AI control your Taobao desktop client',
    'Install Skill + Taobao Desktop, enable AI shopping assistant instantly',
    'Search, compare, order, track... all in one sentence'
  ] : [
    '让 AI 直接操控你的淘宝客户端',
    '安装 Skill + 淘宝客户端，即刻启用 AI 购物助手',
    '搜索、比价、下单、催发货...一句话搞定'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 2000; // 停顿时间
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(typeWriter, typingSpeed);
  }

  typeWriter();

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
      faqItems.forEach(function(otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      item.classList.toggle('active');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Copy code functionality
  document.querySelectorAll('.step-code').forEach(function(code) {
    code.style.cursor = 'pointer';
    code.title = '点击复制';
    code.addEventListener('click', function() {
      const text = this.textContent;
      navigator.clipboard.writeText(text).then(function() {
        const originalText = code.textContent;
        code.textContent = '已复制!';
        code.style.color = '#28C840';
        setTimeout(function() {
          code.textContent = originalText;
          code.style.color = '';
        }, 1500);
      });
    });
  });

  // Animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .step-card, .demo-card, .faq-item').forEach(function(el) {
    observer.observe(el);
  });
});

// Story tabs switch function
function switchStory(index) {
  // Update tabs
  document.querySelectorAll('.story-tab').forEach(function(tab, i) {
    if (i === index) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  // Update content
  document.querySelectorAll('.story-content').forEach(function(content, i) {
    if (i === index) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}