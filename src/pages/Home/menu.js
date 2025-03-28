document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const verticalHeader = document.querySelector('.vertical-header');
  
    menuToggle.addEventListener('click', function() {
      verticalHeader.classList.toggle('active');
      
      // Animação do botão (opcional: vira um "X")
      this.classList.toggle('open');
    });
  });