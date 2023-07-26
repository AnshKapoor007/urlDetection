// document.getElementById('urlForm').addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const urlInput = document.getElementById('urlInput').value;
   
//   // Send a POST request to the API
//   const response = await fetch('http://localhost:3000/detectUrl', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ url: urlInput }),
//   });

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   const data = await response.json();
//   console.log(data);
//   displayResult(data.result);
// });
document.getElementById('urlForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const urlInput = document.getElementById('urlInput').value;

  try {
    const response = await fetch('http://localhost:3000/detectUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls: [urlInput] }), // Note: Wrap the URL in an array if your backend expects an array of URLs
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    displayResult(data.result);
    console.log(data.result);
  } catch (error) {
    console.error('Error:', error.message);
    // You can display an error message to the user or take appropriate action here
  }
});

function displayResult(result) {
  const resultElement = document.createElement('p');
  resultElement.textContent = `Website is ${result}.`;
  resultElement.style.marginTop = '20px';
  resultElement.style.fontWeight = 'bold';

  const resultContainer = document.querySelector('.result-container');
  resultContainer.innerHTML = ''; // Clear any previous result
  resultContainer.appendChild(resultElement);
}