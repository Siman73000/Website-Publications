document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('pdfModal');
  const canvas = document.getElementById('pdfCanvas');
  const closeBtn = document.querySelector('.close');
  let ctx = canvas.getContext('2d');
  let pdfDoc = null;
  let pageNum = 1;

  document.querySelectorAll('.paper-card').forEach(card => {
    card.addEventListener('click', async () => {
      const pdfSrc = card.getAttribute('data-pdf');
      modal.style.display = 'block';
      pageNum = 1;
      try {
        await renderPDF(pdfSrc, pageNum);
      } catch (err) {
        console.error("Failed to load PDF:", err);
        alert("Failed to load PDF. Check console for details.");
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });

  async function renderPDF(url, num) {
    const loadingTask = pdfjsLib.getDocument(url);
    pdfDoc = await loadingTask.promise;

    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale: 1.5 });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    await page.render(renderContext).promise;
  }
});
