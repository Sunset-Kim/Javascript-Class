// fetch
function loadInfo() {
    fetch('./js/data.json')
    .then(response => response.json())
    .then(json => {
        displayInfo(json)
    });
}

function displayInfo(json) {

    // dom selector
    const body = document.querySelector('body');
    const table = document.createElement('table');

    // render table
    body.prepend(table);
    let list = ``;

    // Create Category
    list += `<tr><th>이름</th><th>나이</th><th>키</th><th>점수</th></tr>`

    // render info data from json
    for(let i = 0; i < json.이름.length; i++) {
            list += `<tr>
            <td>${json.이름[i]}</td>
            <td>${(json.나이[i] === undefined) ? '' : json.나이[i]}</td>
            <td>${(json.키[i] === undefined) ? '' : json.키[i]}</td>
            <td>${(json.점수[i] === undefined) ? '' : json.점수[i]}</td>
            </tr>`    
    }

    // Create total data
    list += `<tr>
        <td>총합</td>
        <td>${ArrTotal(json.나이)}</td>
        <td>${ArrTotal(json.키)}</td>
        <td>${ArrTotal(json.점수)}</td>
        </tr>`

    // Create Avg data
    list += `<tr>
        <td>평균</td>
        <td>${ArrTotal(json.나이)/json.나이.length}</td>
        <td>${ArrTotal(json.키)/json.나이.length}</td>
        <td>${ArrTotal(json.점수)/json.나이.length}</td>
        </tr>`

        table.innerHTML = list;
}

function ArrTotal(array) {
    let total = 0;
    array.forEach(element => {
        total += element;
    })
    return total 
}