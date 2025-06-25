const output = document.getElementById("output");
const btnAll = document.getElementById("btn-all");
const form = document.getElementById("filter-form");

const API_URL = "https://rickandmortyapi.com/api/character";

btnAll.addEventListener("click", () => {
	fetchCharacters(API_URL);
});

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const name = document.getElementById("name").value;
	const status = document.getElementById("status").value;
	const species = document.getElementById("species").value;
	const type = document.getElementById("type").value;
	const gender = document.getElementById("gender").value;

	const query = new URLSearchParams({ name, status, species, type, gender }).toString();
	const url = `${API_URL}/?${query}`;

	fetchCharacters(url);
});

function fetchCharacters(url) {
	output.innerHTML = "Cargando...";

	fetch(url)
		.then((res) => {
			if (!res.ok) throw new Error("No se encontraron personajes.");
			return res.json();
		})
		.then((data) => {
			showCharacters(data.results);
		})
		.catch((err) => {
			output.innerHTML = `<p style="color: red;">${err.message}</p>`;
		});
}

function showCharacters(characters) {
	output.innerHTML = "";

	characters.forEach((char) => {
		const card = document.createElement("div");
		card.className = "card";
		card.innerHTML = `
			<img src="${char.image}" alt="${char.name}" />
			<h3>${char.name}</h3>
			<p>${char.status} - ${char.species}</p>
		`;
		output.appendChild(card);
	});
}
