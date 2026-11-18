const player = document.querySelector('#video');
const caption = document.querySelector('#video-caption');
const links = document.querySelectorAll('.videos a');
const cover = document.querySelector('#play-highlight');

cover.hidden = false;
function playVideo() {
  cover.hidden = true;
  player.play().catch(() => player.focus());
}
cover.addEventListener('click', playVideo);
player.addEventListener('play', () => { cover.hidden = true; });
for (const link of links) {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    if (!link.hasAttribute('aria-current')) {
      for (const other of links) other.removeAttribute('aria-current');
      link.setAttribute('aria-current', 'true');
      player.poster = link.dataset.poster;
      player.src = link.href;
      player.setAttribute('aria-label', link.textContent);
      caption.textContent = link.dataset.caption;
    }
    playVideo();
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
