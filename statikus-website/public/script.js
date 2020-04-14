document.getElementById('fetch-phones').onclick = fetchAndRenderPhones;

async function fetchAndRenderPhones() {
  const response = await fetch("/phones");
  const phones = await response.json();

  let phonesHTML = "<h1>Telefonok:</h1>";
  for (const phone of phones) {
    phonesHTML += `
    <div class="card mb-2 w-50">
        <div class="card-body">
            <h5 class="card-title">${phone.brand}</h5>
            <p class="card-text">${phone.name}</p>
        </div>
    </div>
    `;
  }

  document.getElementById("phone-list-component").innerHTML = phonesHTML;
}

document.getElementById("create-phone").onsubmit = async function (event) {
  event.preventDefault();
  const name = event.target.elements.name.value;
  const brand = event.target.elements.brand.value;
  const res = await fetch("/phones", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name, brand }),
  });

  if (res.ok) {
    fetchAndRenderPhones();
  } else {
    alert("Server error");
  }
};
