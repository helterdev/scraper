window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scraper-form');
  const responseContainer = document.getElementById('response');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const objectClass = document.getElementById('objectClass').value;
    const keyWord = document.getElementById('keyWord').value;

    fetch('/api/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        objectClass,
        keyWord,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const {
          state,
          'objects found': objectsFound,
          'key-word': keyWord,
          'scanned webpage': scannedWebpage,
          'found articles': foundArticles,
        } = data;

        if (state === 'succes') {
          const articlesList = foundArticles
            .map(
              (article) =>
                `<li>Title: ${article.title}, Link: ${article.link}</li>`,
            )
            .join('');
          responseContainer.innerHTML = `
    <p>Objects Found: ${objectsFound}</p>
    <p>Key Word: ${keyWord}</p>
    <p>Scanned Webpage: ${scannedWebpage}</p>
    <p>Found Articles:</p>
    <ul>${articlesList}</ul>
  `;
        } else {
          responseContainer.innerHTML = `<p>Error: ${data.message}</p>`;
        }
      })
      .catch((error) => {
        responseContainer.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
});