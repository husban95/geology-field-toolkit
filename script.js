document.addEventListener('DOMContentLoaded', () => {
    const strikeInput = document.getElementById('strikeInput');
    const dipInput = document.getElementById('dipInput');
    const calcBtn = document.getElementById('calcBtn');
    const resetBtn = document.getElementById('resetBtn');
    const errorMsg = document.getElementById('errorMsg');
    const resultContainer = document.getElementById('resultContainer');
    
    const resStrike = document.getElementById('resStrike');
    const resDip = document.getElementById('resDip');
    const resDipDir = document.getElementById('resDipDir');
    const specialNote = document.getElementById('specialNote');

    // زر الحساب
    calcBtn.addEventListener('click', () => {
        hideError();
        hideResult();

        const strikeVal = strikeInput.value.trim();
        const dipVal = dipInput.value.trim();

        // 1. التحقق من الفراغات
        if (strikeVal === '' || dipVal === '') {
            showError('يرجى إدخال قيم كل من Strike و Dip.');
            return;
        }

        const strike = parseFloat(strikeVal);
        const dip = parseFloat(dipVal);

        // 2. التحقق من أنواع القيم وصحتها
        if (isNaN(strike) || isNaN(dip)) {
            showError('الرجاء إدخال أرقام صحيحة فقط في الحقول.');
            return;
        }

        if (strike < 0 || strike >= 360) {
            showError('قيمة Strike يجب أن تكون بين 0° وأقل من 360°.');
            return;
        }

        if (dip < 0 || dip > 90) {
            showError('قيمة Dip يجب أن تكون بين 0° و 90°.');
            return;
        }

        // 3. الحسابات الأساسية وفق القاعدة المعتمدة Right-Hand Rule
        let dipDirection = (strike + 90) % 360;
        
        // تنسيق القيم بثلاث خانات
        const formattedStrike = formatDegree(strike);
        const formattedDip = `${dip}°`;
        const formattedDipDir = formatDegree(dipDirection);
        const cardinal = getCardinalDirection(dipDirection);

        // عرض النتائج الأساسية
        resStrike.textContent = formattedStrike;
        resDip.textContent = formattedDip;
        resDipDir.textContent = `${formattedDipDir} (${cardinal})`;

        // 4. التعامل مع الحالات الخاصة
        specialNote.classList.add('hidden');
        specialNote.textContent = '';

        if (dip === 0) {
            specialNote.textContent = 'ملاحظة: المستوى أفقي (Horizontal Bed)، ولا يوجد اتجاه ميل فعلي.';
            specialNote.classList.remove('hidden');
        } else if (dip === 90) {
            specialNote.textContent = 'ملاحظة: المستوى رأسي (Vertical Bed).';
            specialNote.classList.remove('hidden');
        }

        resultContainer.classList.remove('hidden');
    });

    // زر إعادة الضبط
    resetBtn.addEventListener('click', () => {
        strikeInput.value = '';
        dipInput.value = '';
        hideError();
        hideResult();
        strikeInput.focus();
    });

    // دالة تحويل الزاوية لتنسيق 3 خانات
    function formatDegree(deg) {
        return String(Math.round(deg)).padStart(3, '0') + '°';
    }

    // دالة تحديد الاتجاه الجغرافي للجهات الثماني
    function getCardinalDirection(deg) {
        if (deg >= 337.5 || deg < 22.5) return 'N';
        if (deg >= 22.5 && deg < 67.5) return 'NE';
        if (deg >= 67.5 && deg < 112.5) return 'E';
        if (deg >= 112.5 && deg < 157.5) return 'SE';
        if (deg >= 157.5 && deg < 202.5) return 'S';
        if (deg >= 202.5 && deg < 247.5) return 'SW';
        if (deg >= 247.5 && deg < 292.5) return 'W';
        if (deg >= 292.5 && deg < 337.5) return 'NW';
        return 'N';
    }

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.remove('hidden');
    }

    function hideError() {
        errorMsg.textContent = '';
        errorMsg.classList.add('hidden');
    }

    function hideResult() {
        resultContainer.classList.add('hidden');
    }
});