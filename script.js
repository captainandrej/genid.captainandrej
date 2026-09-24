document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const printBtn = document.getElementById("printBtn");
    const loaderContainer = document.getElementById("loaderContainer");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const editableElements = document.querySelectorAll(".editable");

    // Efekt načítania po kliknutí na "Generować a uložiť"
    generateBtn.addEventListener("click", () => {
        generateBtn.style.display = "none";
        loaderContainer.style.display = "flex";
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            progressFill.style.width = progress + "%";
            progressText.textContent = `Spracovávam kartičku... ${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                progressText.textContent = "Kartička úspešne spracovaná!";
                
                // Zobrazíme tlačidlo na tlač/uloženie do PDF
                printBtn.style.display = "block";
            }
        }, 30); // Celkové trvanie animácie je cca 1.5 sekundy
    });

    // Spustenie systémovej tlače (umožňuje uložiť ako PDF v správnej veľkosti)
    printBtn.addEventListener("click", () => {
        window.print();
    });

    // Voliteľne: Uloženie zmien do pamäte prehliadača (localStorage)
    editableElements.forEach(el => {
        const key = el.getAttribute("data-key");
        
        // Načítanie uloženého textu ak existuje
        if (localStorage.getItem(key)) {
            el.textContent = localStorage.getItem(key);
        }

        // Ukladanie pri každej zmene
        el.addEventListener("input", () => {
            localStorage.setItem(key, el.textContent);
        });
    });
});