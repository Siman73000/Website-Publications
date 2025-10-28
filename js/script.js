// Modal logic
const modal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.paper-card').forEach(card => {
  card.addEventListener('click', () => {
    const pdfSrc = card.getAttribute('data-pdf');
    // Hide toolbar (view-only)
    pdfViewer.src = `${pdfSrc}#toolbar=0&navpanes=0&scrollbar=0`;
    modal.style.display = 'block';
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  pdfViewer.src = '';
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
    pdfViewer.src = '';
  }
});
