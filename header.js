// Shared header with translate widget
function loadSharedHeader() {
    // Add Google Translate script to head if not already there
    if (!document.querySelector('script[src*="translate.google.com"]')) {
        const script1 = document.createElement('script');
        script1.innerHTML = `
            function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'de,fr,tr,hi,pt,bg,sk',
                    layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                    gaTrack: true
                }, 'google_translate_element');
            }
        `;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.head.appendChild(script2);
    }

    // Add CSS styles
    const style = document.createElement('style');
    style.innerHTML = `
        .translate-widget {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: rgba(0, 0, 0, 0.9);
            padding: 10px;
            border-radius: 10px;
            border: 2px solid #d4af37;
        }

        .goog-te-combo {
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #d4af37;
            color: #d4af37;
            padding: 8px;
            border-radius: 5px;
            font-weight: 600;
        }

        .goog-te-banner-frame {
            display: none !important;
        }

        body {
            top: 0 !important;
        }
    `;
    document.head.appendChild(style);

    // Create translate widget
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    translateDiv.className = 'translate-widget';
    document.body.appendChild(translateDiv);
}

// Load header when page loads
document.addEventListener('DOMContentLoaded', loadSharedHeader);