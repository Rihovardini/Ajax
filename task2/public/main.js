const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('username-input').value
    const age = document.getElementById('age-input').value
    axios.get(`http://localhost:3000/employees?first_name=${username}&age=${age}`)
        .then(json => {
            console.log(json)
            createDomElement(json['data'][0]);
        })
        .catch(err => {
            errorFunction();
            console.log(err);
        })
});

function createDomElement(data) {
    createTableHead(data);
    createTableBodyElems(data);
}

function createTableBodyElems(data) {

    const table = document.querySelector('table'),
        tbody = document.createElement('tbody'),
        tr = document.createElement('tr');

    for (let key in data) {
        let td = document.createElement('td');
        td.textContent = data[key];
        td.setAttribute("scope", 'col');
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
    table.appendChild(tbody);
}

function createTableHead(data) {

    if (document.querySelector("table")) {
        return;
    }
    const main = document.querySelector('main'),
        table = document.createElement('table'),
        thead = document.createElement('thead'),
        tr = document.createElement('tr');

    for (let key in data) {
        let td = document.createElement('td');
        td.textContent = key;
        td.setAttribute("scope", 'col');
        tr.appendChild(td);
    }

    thead.classList.add('thead-dark');
    table.classList.add('table');
    table.classList.add('m-0');
    table.style = "margin: 0 auto";
    thead.appendChild(tr);
    table.appendChild(thead);
    main.appendChild(table);
}

function errorFunction() {
    const h1 = document.createElement('h1');
    h1.textContent = "We haven't got any data from api(((";
    document.body.appendChild(h1);
}
