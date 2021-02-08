function component() {
    const element = document.createElement('pre');
    element.innerHTML = '&lt;start typing&gt;';
    return element;
}

let firstCharacter = true;
const el = component();
document.body.appendChild(el);
document.body.addEventListener('keypress', (e) => {
    console.log("Keypressed", e.key, e.code);
    if (firstCharacter) {
        el.innerText = '';
        firstCharacter = false;
    }
    if (e.key === 'Enter') {
        el.innerText += '\n';
        return;
    }
    el.innerText += e.key;
});
document.body.addEventListener('keydown', (e) => {
    console.log("Key down", e.key, e.code);
    if (e.key === 'Backspace') {
        el.innerText = el.innerText.slice(0, -1);
    }
});