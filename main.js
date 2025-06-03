// main.js
// TODO: 如需修改通知内容、检测逻辑等，请在此文件调整

// 设备检测函数
function detectDevice() {
    const deviceInfo = document.getElementById('device-info');
    const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        deviceInfo.innerHTML = `<i class="fas fa-mobile-alt"></i> 检测到您正在使用移动设备，已自动选择Android版本`;
        // 移动设备默认显示Android卡片
        document.querySelector('.tab[data-target="android-card"]').classList.add('active');
        document.getElementById('android-card').style.display = 'block';
        document.getElementById('windows-card').style.display = 'none';
    } else {
        deviceInfo.innerHTML = `<i class="fas fa-desktop"></i> 检测到您正在使用桌面设备，Windows版本开发中，推荐使用Android版本`;
        // 桌面设备显示所有卡片
        document.querySelectorAll('.card').forEach(card => {
            card.style.display = 'block';
        });
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化设备检测
    detectDevice();

    // Android下载按钮功能
    document.querySelector('.download-btn:not(.disabled)').addEventListener('click', function(e) {
        e.preventDefault();
        const notification = document.getElementById('notification');
        notification.textContent = "您选择了Android版本，即将开始下载...";
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    });
    
    // Windows下载按钮禁用提示
    document.querySelector('.download-btn.disabled').addEventListener('click', function(e) {
        e.preventDefault();
        const notification = document.getElementById('notification');
        notification.textContent = "Windows版本正在开发中，敬请期待！";
        notification.style.display = 'block';
        notification.style.background = 'rgba(255, 69, 0, 0.7)';
        
        setTimeout(() => {
            notification.style.display = 'none';
            notification.style.background = 'rgba(0, 0, 0, 0.7)';
        }, 3000);
    });
    
    // 标签切换功能（仅移动设备）
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const targetCardId = this.getAttribute('data-target');
            
            document.querySelectorAll('.card').forEach(card => {
                card.style.display = 'none';
            });
            
            document.getElementById(targetCardId).style.display = 'block';
            
            const notification = document.getElementById('notification');
            if(targetCardId === 'windows-card') {
                notification.textContent = "已切换到Windows版本（开发中）";
                notification.style.background = 'rgba(255, 69, 0, 0.7)';
            } else {
                notification.textContent = "已切换到Android版本";
                notification.style.background = 'rgba(0, 0, 0, 0.7)';
            }
            
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 2000);
        });
    });
    
    // 添加窗口大小改变监听
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.card').forEach(card => {
                card.style.display = 'block';
            });
        } else {
            const activeTab = document.querySelector('.tab.active');
            if (activeTab) {
                const targetCardId = activeTab.getAttribute('data-target');
                document.querySelectorAll('.card').forEach(card => {
                    card.style.display = 'none';
                });
                document.getElementById(targetCardId).style.display = 'block';
            }
        }
    });
});

// 自动设置年份
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('year').textContent = new Date().getFullYear();
});