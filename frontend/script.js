document.getElementById('urlForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const urlInput = document.getElementById('urlInput').value;

  try {
    const response = await fetch('http://localhost:3000/detectUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls: [urlInput] }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    displayResult(data.result);
  } catch (error) { }
});

function displayResult(result) {
  const resultElement = document.createElement('p');
  document.getElementById('result-container').style.display = 'block';
  document.getElementById('result-container').classList.remove(result[0] === 'bad' ? 'bg-green' : 'bg-red');
  document.getElementById('result-container').classList.add(result[0] === 'bad' ? 'bg-red' : 'bg-green');
  resultElement.textContent = `Website is ${result}.`;
  resultElement.style.marginTop = '20px';
  resultElement.style.fontWeight = 'bold';

  const resultContainer = document.querySelector('.result-container');
  resultContainer.innerHTML = '';
  resultContainer.appendChild(resultElement);
}