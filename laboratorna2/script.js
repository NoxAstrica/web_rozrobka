const modes = {
    night: { background: '#1a1a1a', text: '#f0f0f0' },
    eyeFriendly: { background: '#fef2d0', text: '#5b4d33' },
    simplified: { background: '#ffffff', text: '#000000' },
};

function applyColorScheme(backgroundColor, textColor) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (bgColor, txtColor) => {
                document.body.style.backgroundColor = bgColor;
                document.body.style.color = txtColor;
                document.querySelectorAll('div, span, p').forEach(el => {
                    el.style.backgroundColor = bgColor;
                    el.style.color = txtColor;
                });
            },
            args: [backgroundColor, textColor]
        });
    });
}

function clearEffects() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                document.body.style.backgroundColor = '';
                document.body.style.color = '';
                document.querySelectorAll('div, span, p').forEach(el => {
                    el.style.backgroundColor = '';
                    el.style.color = '';
                });
            }
        });
    });
}


const nightModeClickListener = () => applyColorScheme(modes.night.background, modes.night.text);
const eyeFriendlyModeClickListener = () => applyColorScheme(modes.eyeFriendly.background, modes.eyeFriendly.text);
const simplifiedModeClickListener = () => applyColorScheme(modes.simplified.background, modes.simplified.text);
const clearEffectsClickListener = () => clearEffects();

function addEventListeners() {
    document.getElementById("nightMode").addEventListener("click", nightModeClickListener);
    document.getElementById("eyeFriendlyMode").addEventListener("click", eyeFriendlyModeClickListener);
    document.getElementById("simplifiedMode").addEventListener("click", simplifiedModeClickListener);
    document.getElementById("clearEffects").addEventListener("click", clearEffectsClickListener);
}

function removeEventListeners() {
    document.getElementById("nightMode").removeEventListener("click", nightModeClickListener);
    document.getElementById("eyeFriendlyMode").removeEventListener("click", eyeFriendlyModeClickListener);
    document.getElementById("simplifiedMode").removeEventListener("click", simplifiedModeClickListener);
    document.getElementById("clearEffects").removeEventListener("click", clearEffectsClickListener);
}

addEventListeners();
