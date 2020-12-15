function getKeySteno(e) {
    var location = e.location;
    var selector;
    if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
        selector = ['[data-key="' + e.keyCode + '-R"]']
    } else {
        var code = e.keyCode || e.which;
        selector = [
            '[data-key="' + code + '"]',
            '[data-char-steno*="' + encodeURIComponent(String.fromCharCode(code)) + '"]'
        ].join(',');
    }
    return document.querySelector(selector);
}

function pressKeySteno(char) {
    var key = document.querySelector('[data-char-steno*="' + char.toUpperCase() + '"]');
    if (!key) {
        return console.warn('No key for', char);
    }
    key.setAttribute('data-pressed-steno', 'on');
    setTimeout(function() {
        key.removeAttribute('data-pressed-steno');
    }, 200);
}

function nextSteno() {
    var c = queue[0];
    queue = queue.slice(1);
    h1.innerHTML = originalQueue.slice(0, originalQueue.length - queue.length);
    pressKeySteno(c);
    if (queue.length) {
        setTimeout(nextSteno, Math.random() * 200 + 50);
    }
}
setTimeout(nextSteno, 500);

document.body.addEventListener('keydown', function(e) {
    var key = getKeySteno(e);
    if (!key) {
        return console.warn('No key for', e.keyCode);
    }

    key.setAttribute('data-pressed-steno', 'on');
});

document.body.addEventListener('keyup', function(e) {
    var key = getKeySteno(e);
    key && key.removeAttribute('data-pressed-steno');
});

function sizeSteno() {
    var size = keyboard.parentNode.clientWidth / 90;
    keyboard.style.fontSize = size + 'px';
    console.log(size);
}

var keyboard = document.querySelector('.keyboard-steno');
window.addEventListener('resize', function(e) {
    sizeSteno();
});
sizeSteno();

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}