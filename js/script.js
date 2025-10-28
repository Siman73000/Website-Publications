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

    async function renderPDF(url) {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdfDoc = await loadingTask.promise;
        const container = document.getElementById('pdfContainer');
        container.innerHTML = ''; // clear previous

        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');
            await page.render({ canvasContext: ctx, viewport: viewport }).promise;
            container.appendChild(canvas);
        }
    }
});
