// DECLARE CONSTANCES OR DOM
const environment = 'production';
// const environment = 'development';

const input = document.querySelector("#mainInput");
const enterBtn = document.querySelector("#enterBtn");
const rList = document.querySelector("#reminderList");
const loading = document.querySelector('#spinner');
const datatable = document.querySelector('#maintable');
const headers = document.querySelector('#datatable');
const reminders = rList;
console.log("loading", loading)
//********************   CONTROLLERS ***********************
const displayInput = () => {
  console.log(input.value)
  
  // console.log(reminders.inner)
}

const addRowToTable = (args) => {

  console.log(`adding to ${datatable.rows.length + 1} row for datatable`)

  const fields = Object.values(args);
  const rowIndex = datatable.rows.length;
  let row = datatable.insertRow(rowIndex);

  for(let j = 0; j < datatable.rows[0].cells.length; j++) {
    let cell = row.insertCell(j);
    if (j === 0) {
      cell.className = "mdl-data-table__cell--non-numeric";
    }
    cell.innerText = fields[j];
  }
}

addRowToTable({
  Name: 'Food',
  Quantity: 3,
  Date: 'YYYY-MM-DD'
})

const addReminder = (args) => {

  const li = document.createElement('LI'),
  text = document.createTextNode(args);
  li.appendChild(text);
  reminders.appendChild(li);
}

const url = () => {
  if(environment == 'production') {
    return 'https://dramatic-tartan.glitch.me/';
  }
  return 'http://localhost:3000/'
}

const createToDoList = (todos) => {

  const items = todos.map(item => {
    return item.username + " :: " + item.message;
  });
  for (i in items) {
    addReminder(items[i]);
  }
}

const formatMessage = (response) => {
  return response.username + " :: " + response.message;
}

const displayLoader = () => {
  loading.className = "main";
  loading.innerHTML = `<div class="mdl-spinner mdl-js-spinner is-active"></div>`;
}

const hideLoader = () => {
  loading.className = "";
  loading.innerHTML = ``;
}

const getTodoList = (name) => {
  console.log(`waiting on data`)
  displayLoader();
  return fetch(url() + 'username/' + name, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, cors, *same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        // headers: {
            // "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        // }
      })
  .then(results => {
  console.log(results)
    return results.json()
  })
  .then(data => {
    console.log("data", data)
    hideLoader();
    createToDoList(data);
  })
  .catch(err => console.error(err))
}

const createMessage = (args) => {
 
  const message = {
    username: args.username,
    messageorder: args.messageorder,
    message: args.message
  }

  fetch(url() + 'message/create', {
    method: 'POST',
    body: JSON.stringify(message),
		headers: {
      'Content-Type': 'application/json'
		}
    
  })
  .then(results => {
    console.log("results", results)
    return results.json()
  })
  .then(data => {
    console.log("data", data)
    addReminder(formatMessage(data))
  })
}
//******************** EVENT LISTENERS ***********************

enterBtn.addEventListener('click',function() {
  // addReminder(input.value)
  const payload = {
    username: 'Quang',
    messageorder: 2,
    message: input.value
  }
  createMessage(payload);
});

getTodoList('Quang');









