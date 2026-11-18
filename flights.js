const films = document.querySelectorAll('.film-row video');
for (const film of films) {
  film.addEventListener('play', () => {
    for (const other of films) {
      if (other !== film && !other.paused) other.pause();
    }
  });
}

const copyButton = document.querySelector('#copy-citation');
if (navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.setAttribute('aria-live', 'polite');
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.querySelector('#bibtex').textContent);
      copyButton.textContent = 'Copied';
    } catch {
      copyButton.textContent = 'Select text to copy';
      const range = document.createRange();
      range.selectNodeContents(document.querySelector('#bibtex'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
}
