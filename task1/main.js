fetch('https://rickandmortyapi.com/api/character/?page=1')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        createCharackBlocks(json.results);
        document.querySelector('main').setAttribute('data-count', 1);
    }).catch((err) => {
        errorFunction();
        console.log(err);
    })


function createCharackBlocks(data) {
    const main = document.querySelector('main'),
        wrapper = document.createElement('div'),
        h1 = document.createElement('h1');

    wrapper.setAttribute('class', 'wrapper');
    wrapper.appendChild(h1);
    h1.textContent = "We've got data from rick and morty api!!";
    h1.style.textAlign = 'center';
    wrapper.appendChild(h1);
    data.forEach(element => {
        let div = document.createElement('div'),
            img = document.createElement('img'),
            h4 = document.createElement('h4'),
            p = document.createElement('p');
        img.setAttribute('src', element.image);
        h4.textContent = element.name;
        p.textContent = element.gender;
        div.appendChild(img);
        div.appendChild(h4);
        div.appendChild(p);
        wrapper.appendChild(div);
        div.style = "width:33%;display:inline-block";
    });
    main.appendChild(wrapper);
}

function errorFunction() {
    const main = document.querySelector('main'),
        h1 = document.createElement('h1');
    h1.textContent = "We haven't got any data from rick and morty api(((";
    h1.style.textAlign = 'center';
    main.appendChild(h1);
}

function nextPage() {
    let count = document.querySelector('main').getAttribute('data-count'),
        el = document.querySelector('.wrapper');
    removeChildren(el);
    ++count;
    count = dataValidation(count) || count;
    fetch(`https://rickandmortyapi.com/api/character/?page=${count}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            createCharackBlocks(json.results);
            document.querySelector('main').setAttribute('data-count', count);
            changePageHash(count)
        }).catch((err) => {
            errorFunction();
        })
}

function prevPage() {
    let count = document.querySelector('main').getAttribute('data-count'),
        el = document.querySelector('.wrapper');
    removeChildren(el);
    count = dataValidation(count) || count;
    fetch(`https://rickandmortyapi.com/api/character/?page=${--count}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            createCharackBlocks(json.results);
            document.querySelector('main').setAttribute('data-count', count);
            changePageHash(count)
        }).catch(() => {
            errorFunction();
        })
}

function removeChildren(parent) {
    parent.parentElement.removeChild(parent);
}


const nex = document.getElementById("next");
next.addEventListener('click', nextPage);

const prev = document.getElementById("prev");
prev.addEventListener('click', prevPage);

function changePageHash(data) {
    location.hash = data;
}

function dataValidation(data) {
    if (data < 1) {
        document.querySelector('main').setAttribute('data-count', 2);
        return 2;
    }
    if(data>=25){
        document.querySelector('main').setAttribute('data-count', 25);
        return 25;
    }

}
