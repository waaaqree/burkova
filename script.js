document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация галереи
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Модальное окно
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const viewBtns = document.querySelectorAll('.view-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const images = [];
    const captions = [];
    
    // Собираем все изображения и подписи
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.gallery-image');
        const overlay = item.querySelector('.overlay-content');
        
        images.push(img.src);
        captions.push({
            title: overlay.querySelector('h3').textContent,
            desc: overlay.querySelector('p').textContent
        });
        
        // Обработчик для кнопки "Посмотреть"
        item.querySelector('.view-btn').addEventListener('click', function() {
            currentIndex = index;
            openModal(currentIndex);
        });
    });
    
    function openModal(index) {
        modal.style.display = 'block';
        modalImg.src = images[index];
        captionText.innerHTML = `<strong>${captions[index].title}</strong><br>${captions[index].desc}`;
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function navigate(direction) {
        currentIndex += direction;
        
        if (currentIndex >= images.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        
        openModal(currentIndex);
    }
    
    closeModal.addEventListener('click', closeModalFunc);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));
    
    // Закрытие модального окна при клике вне изображения
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Кнопка "Показать еще" (заглушка)
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Здесь можно добавить загрузку дополнительных изображений
            this.textContent = 'Все изображения загружены';
            this.style.opacity = '0.7';
            this.style.cursor = 'default';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить отправку формы
            alert('Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.');
            feedbackForm.reset();
            
            // В реальном проекте здесь будет AJAX-запрос
            // fetch('sendmail.php', { method: 'POST', body: new FormData(feedbackForm) })
            // .then(response => response.json())
            // .then(data => { alert(data.message); })
            // .catch(error => { alert('Ошибка отправки: ' + error); });
        })
    }
  });