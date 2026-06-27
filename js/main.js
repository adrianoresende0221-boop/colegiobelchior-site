document.addEventListener('DOMContentLoaded', function () {
  var anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  var botaoMenu = document.getElementById('botao-menu');
  var nav = document.getElementById('nav-principal');
  if (botaoMenu && nav) {
    botaoMenu.addEventListener('click', function () {
      var aberto = nav.classList.toggle('nav-aberta');
      botaoMenu.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-aberta');
        botaoMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var NUMERO_WHATSAPP = '5534991840692';

  var form = document.getElementById('form-interesse');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var dados = new FormData(form);
      var responsavel = (dados.get('responsavel') || '').trim();
      var crianca = (dados.get('crianca') || '').trim();
      var etapa = dados.get('etapa') || '';
      var telefone = (dados.get('telefone') || '').trim();

      var texto = 'Olá! Meu nome é ' + responsavel + '.';
      texto += crianca
        ? ' Quero saber sobre a matrícula de ' + crianca + '.'
        : ' Quero saber mais sobre a matrícula.';
      texto += ' Etapa de interesse: ' + etapa + '.';
      if (telefone) texto += ' Meu contato: ' + telefone + '.';

      var url = 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent(texto);
      window.open(url, '_blank');

      var confirmacao = form.parentElement.querySelector('.form-confirmacao');
      if (confirmacao) confirmacao.style.display = 'block';
    });
  }

  // ===== Modais de atividades (clicar no cartão da etapa abre a lista) =====
  function fecharModais() {
    document.querySelectorAll('.modal-overlay.aberto').forEach(function (m) {
      m.classList.remove('aberto');
      m.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-abrir-modal]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var modal = document.getElementById(btn.getAttribute('data-abrir-modal'));
      if (!modal) return;
      modal.classList.add('aberto');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
  document.querySelectorAll('[data-fechar-modal]').forEach(function (btn) {
    btn.addEventListener('click', fecharModais);
  });
  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) fecharModais();
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fecharModais();
  });

  // ===== Carrossel da home =====
  document.querySelectorAll('.carrossel').forEach(function (rootEl) {
    var trilho = rootEl.querySelector('.carrossel-trilho');
    var slides = Array.prototype.slice.call(rootEl.querySelectorAll('.carrossel-slide'));
    var pontosEl = rootEl.querySelector('.carrossel-pontos');
    if (!trilho || !slides.length) return;
    var indice = 0;

    slides.forEach(function (_, i) {
      var ponto = document.createElement('button');
      ponto.type = 'button';
      ponto.className = 'carrossel-ponto' + (i === 0 ? ' ativo' : '');
      ponto.setAttribute('aria-label', 'Ir pro slide ' + (i + 1));
      ponto.addEventListener('click', function () { irPara(i); });
      pontosEl.appendChild(ponto);
    });
    var pontos = Array.prototype.slice.call(pontosEl.children);

    function irPara(i) {
      indice = (i + slides.length) % slides.length;
      trilho.style.transform = 'translateX(-' + (indice * 100) + '%)';
      pontos.forEach(function (p, pi) { p.classList.toggle('ativo', pi === indice); });
    }

    var anterior = rootEl.querySelector('.carrossel-anterior');
    var proxima = rootEl.querySelector('.carrossel-proxima');
    if (anterior) anterior.addEventListener('click', function () { irPara(indice - 1); });
    if (proxima) proxima.addEventListener('click', function () { irPara(indice + 1); });

    var auto = setInterval(function () { irPara(indice + 1); }, 6000);
    rootEl.addEventListener('mouseenter', function () { clearInterval(auto); });
  });

  // ===== Cursor interativo (só em dispositivos com mouse de precisão) =====
  if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('cursor-ativo');
    var ponto = document.createElement('div');
    ponto.className = 'cursor-ponto';
    var anel = document.createElement('div');
    anel.className = 'cursor-anel';
    document.body.appendChild(ponto);
    document.body.appendChild(anel);

    var mouseX = 0, mouseY = 0, anelX = 0, anelY = 0;
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ponto.style.left = mouseX + 'px';
      ponto.style.top = mouseY + 'px';
    });

    function loopCursor() {
      anelX += (mouseX - anelX) * 0.18;
      anelY += (mouseY - anelY) * 0.18;
      anel.style.left = anelX + 'px';
      anel.style.top = anelY + 'px';
      requestAnimationFrame(loopCursor);
    }
    loopCursor();

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button, .cartao-etapa, .carrossel-slide')) anel.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('a, button, .cartao-etapa, .carrossel-slide')) anel.classList.remove('cursor-hover');
    });
  }
});
