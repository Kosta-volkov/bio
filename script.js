// Ждем загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    const textElement = document.getElementById('typing-text');
    const fullText = "приват банк";
    let index = 0;
    let isDeleting = false;
    let timeoutId;
    
    // Функция бесконечной печати
    function infiniteType() {
        if (!isDeleting) {
            if (index < fullText.length) {
                textElement.textContent = fullText.substring(0, index + 1);
                index++;
                timeoutId = setTimeout(infiniteType, 150);
            } else {
                isDeleting = true;
                timeoutId = setTimeout(infiniteType, 1500);
            }
        } else {
            if (index > 0) {
                textElement.textContent = fullText.substring(0, index - 1);
                index--;
                timeoutId = setTimeout(infiniteType, 100);
            } else {
                isDeleting = false;
                timeoutId = setTimeout(infiniteType, 500);
            }
        }
    }
    
    setTimeout(infiniteType, 500);
    
    // Функция показа уведомления
    function showNotification(message, isSuccess = true) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${isSuccess ? '#43b581' : '#f04747'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 8px 16px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: notificationFade 2s ease forwards;
        `;
        
        if (!document.querySelector('#notification-style')) {
            const style = document.createElement('style');
            style.id = 'notification-style';
            style.textContent = `
                @keyframes notificationFade {
                    0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }
    
    // Функция копирования текста
    async function copyText(button) {
        const textToCopy = "privatbunhcik";
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Показываем уведомление
            showNotification('✓ скопировано!');
            
            // Анимация кнопки
            button.classList.add('success');
            
            // Меняем текст кнопки
            const originalText = button.querySelector('.btn-text').textContent;
            button.querySelector('.btn-text').textContent = '✓ готово';
            
            setTimeout(() => {
                button.classList.remove('success');
                button.querySelector('.btn-text').textContent = originalText;
            }, 1000);
            
        } catch (err) {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            showNotification('✓ скопировано!');
            
            button.classList.add('success');
            const originalText = button.querySelector('.btn-text').textContent;
            button.querySelector('.btn-text').textContent = '✓ готово';
            
            setTimeout(() => {
                button.classList.remove('success');
                button.querySelector('.btn-text').textContent = originalText;
            }, 1000);
        }
    }
    
    // Обработчики для кнопок
    document.getElementById('btn1').addEventListener('click', function(e) {
        // Обычная ссылка - ничего не меняем
        console.log('Переход на fakecrime');
    });
    
    document.getElementById('btn2').addEventListener('click', function(e) {
        // Обычная ссылка - ничего не меняем
        console.log('Переход на guns.lol');
    });
    
    document.getElementById('btn3').addEventListener('click', function(e) {
        e.preventDefault(); // Отменяем переход по ссылке
        copyText(this); // Копируем текст
    });
    
    document.getElementById('btn4').addEventListener('click', function(e) {
        // Обычная ссылка - ничего не меняем
        console.log('Переход на github');
    });
    
    // Эффект при клике на аватарку
    const avatar = document.querySelector('.avatar');
    let clickCount = 0;
    
    avatar.addEventListener('click', () => {
        clickCount++;
        
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(114, 137, 218, 0.2);
            pointer-events: none;
            z-index: 999;
            animation: flashAnim 0.3s ease;
        `;
        
        if (!document.querySelector('#flash-style')) {
            const style = document.createElement('style');
            style.id = 'flash-style';
            style.textContent = `
                @keyframes flashAnim {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 300);
        
        if (clickCount === 5) {
            avatar.style.borderColor = '#ff73fa';
            avatar.style.transition = 'border-color 0.5s';
            
            setTimeout(() => {
                avatar.style.borderColor = '#7289da';
            }, 2000);
            
            // Копируем текст с 3-й кнопки
            const btn3 = document.getElementById('btn3');
            copyText(btn3);
            
            clickCount = 0;
        }
    });
    
    // Анимация появления кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn, i) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(10px)';
        btn.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 1000 + (i * 100));
    });
    
    console.log('приват банк • 3-я кнопка копирует');
});