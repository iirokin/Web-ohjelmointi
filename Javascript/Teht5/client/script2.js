(loadPage = () => {
  fetch("http://localhost:3000/items")
    .then((res) => res.json())
    .then((data) => {
      displayUser(data);
    });
})();

const userDisplay = document.querySelector(".table"); //haetaan taulukko elementti

displayUser = (data) => {
  userDisplay.innerHTML += `
      <thead>
      <tr>
          <th>Id</th>
          <th>Nimi</th>
          <th>Puhelin</th>
          <th>Poista</th>
      </tr>
  
      </thead>
  
      `;
  displayRow(data);
};

displayRow = (data) => {
  data.forEach((user) => {
    userDisplay.innerHTML += `
          <tbody>
          <tr>
              <td>${user.id}</td>
              <td>${user.nimi}</td>
              <td>${user.puhelin}</td>
              <td><input type="button" onClick="removeRow(${user.id})" value="X"/></td>
              <td><input type="button" onClick="modifyRow(${user.id})" value="Muokkaa" /></td>
          </tr>
          </tbody>
          `;
  });
};

removeRow = async (id) => {
  console.log(id);
  let polku = "http://localhost:3000/items/" + id;

  await fetch(polku, { method: "DELETE" }).then(() =>
    console.log("poisto onnistui")
  );

  //ladataan sivu uudelleen - huono tapa: pitäisi päivittää vain joku alue sivusta
  window.location.reload();
};

modifyRow = async (id) => {
  let polku = "http://localhost:3000/items/" + id;

  try {
    let response = await fetch(polku);
    if (!response.ok) {
      throw new Error("Tietojen haku epäonnistui");
    }

    let user = await response.json();

    // Oletus tila
    document.getElementById("editId").value = user.id;
    document.getElementById("editNimi").value = user.nimi;
    document.getElementById("editPuhelin").value = user.puhelin;

    document.getElementById("editForm").style.display = "block"; // lomake näkyviin
  } catch (error) {
    console.error(error);
  }
};

// PUT tieto
async function handleFormEdit(event) {
  event.preventDefault();

  let id = document.getElementById("editId").value;
  let nimi = document.getElementById("editNimi").value;
  let puhelin = document.getElementById("editPuhelin").value;
  let polku = "http://localhost:3000/items/" + id;

  try {
    let response = await fetch(polku, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ nimi, puhelin }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    document.getElementById("editForm").style.display = "none"; // piilottaa lomakkeen
    loadPage();
  } catch (error) {
    console.error(error);
  }
}

// peruuta moukkaus
function cancelFormEdit() {
  document.getElementById("editForm").style.display = "none";
}

// POST tieto
async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());

  let response = await fetch(url);
  let existingItems = await response.json();
  let nextId = existingItems.length > 0 ? Math.max(...existingItems.map(item => item.id)) + 1 : 1;
  plainFormData.id = nextId; // Antaa uuden Id joka on kaikki Id + 1

  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };

  response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
}

async function handleFormSubmit(event) {
  event.preventDefault(); //estää lomakkeen lähettämisen eli estää lomakkeen oletustapahtuman

  const form = event.currentTarget; //tapahtuman kohde eli lomake
  const url = form.action; //lomakkeen action eli minne lomake lähetetään

  try {
    const formData = new FormData(form); //luodaan uusi FormData olio ja annetaan sille lomake
    const responseData = await postFormDataAsJson({ url, formData }); //lähetetään lomake fetchillä
    await loadPage(); //ladataan sivu uudelle
    console.log({ responseData });
  } catch (error) {
    console.error(error);
  }
}

const exampleForm = document.getElementById("puhelintieto_lomake"); //haetaan lomake
exampleForm.addEventListener("submit", handleFormSubmit); //kuunnellaan lomakkeen lähettämistä
