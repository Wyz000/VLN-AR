const player = document.querySelector('#video');
const description = document.querySelector('#clip-description');
const choices = document.querySelectorAll('.clip');
const captions = {
  outdoor: 'The aircraft approaches outdoor landmarks and tracks moving targets.',
  indoor: 'Indoor flights test object recognition and navigation relative to furniture and other landmarks.',
  'long-horizon': 'The aircraft follows multi-step instructions and is tested under challenging visual conditions.',
  overview: 'An overview of the flight tasks, training data, and onboard navigation framework.'
};
for (const choice of choices) {
  choice.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (!choice.hasAttribute('aria-current')) {
      choices.forEach(link => link.removeAttribute('aria-current'));
      choice.setAttribute('aria-current', 'true');
      player.poster = choice.querySelector('img').src;
      player.src = choice.href;
      player.setAttribute('aria-label', choice.querySelector('strong').textContent);
      description.textContent = captions[choice.dataset.clip];
    }
    player.play().catch(() => { /* Native controls remain available. */ });
  });
}
