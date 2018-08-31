const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', (e) => {
    debugger
    e.preventDefault();
    const username = document.getElementById('username-input').value;
    const age = document.getElementById('age-input').value;
    if(username||age){
        debugger
        axios.get(`http://localhost:3000/employees${getQuery(username,age)}`)
        .then(json=>{
            console.log(json)
            createDomElement(json['data'][0]);
        })
        .catch(err=>{
            errorFunction();
            console.log(err);
        })
    }
});

function createDomElement(data){
    createTableHead(data);
    createTableBodyElems(data);
}

function  createTableBodyElems(data){
    
    const table=document.querySelector('table'),
          tbody=document.createElement('tbody'),
          tr=document.createElement('tr');
    
    for(let key in data){
        let td=document.createElement('td');
        td.textContent=data[key];
        td.setAttribute("scope",'col');
        tr.appendChild(td); 
    }
    tbody.appendChild(tr); 
    table.appendChild(tbody);
}

function createTableHead(data){
    debugger
    if (document.querySelector("table")){
        return;
    }
    const main=document.querySelector('main'),
        table=document.createElement('table'),
        thead=document.createElement('thead'),
        tr=document.createElement('tr');

        for (let key in data) {
            let td=document.createElement('td');
            td.textContent=key;
            td.setAttribute("scope",'col');
            tr.appendChild(td);
        }

    thead.classList.add('thead-dark');
    table.classList.add('table');
    table.style="margin: 0 auto";
    thead.appendChild(tr);
    table.appendChild(thead);          
    
    main.appendChild(table);
}

function errorFunction(){
    const h1=document.createElement('h1');
    h1.textContent="We haven't got any data from api(((";
    h1.style.textAlign='center';
    document.body.appendChild(h1);
}

function getQuery(name,age){
    let query;
        if(age&&name)
            query=`?first_name=${name}&age=${age}`;

        if(age)
            query=`?age=${age}` 
    
        if(name)
            query=`?first_name=${name}`
        
        return query;
}

