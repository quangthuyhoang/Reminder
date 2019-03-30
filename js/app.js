// DECLARE CONSTANCES OR DOM
const environment = 'production';
// const environment = 'development';

const input = document.querySelector("#messageInput");
const upcInput = document.querySelector("#mainInput");
const enterBtn = document.querySelector("#enterBtn");
const rList = document.querySelector("#reminderList");
const loading = document.querySelector('#spinner');
const datatable = document.querySelector('#maintable');
const headers = document.querySelector('#datatable');
const reminders = rList;
const activeSelection = document.querySelector('#activeSelection');
//********************   CONTROLLERS ***********************
const displayInput = () => {
  console.log(input.value)
  
  // console.log(reminders.inner)
}


const addRowToTable = (args) => {

  const fields = Object.values(args);
  const rowIndex = datatable.rows.length;
  
  let row = datatable.insertRow(rowIndex);
  row.id = "item-" + rowIndex;
  row.className = "items";
  
  for(let j = 0; j < datatable.rows[0].cells.length; j++) {

    let cell = row.insertCell(j);
    if (j === 0) {
      cell.className = "mdl-data-table__cell--non-numeric";
    }
    cell.innerText = fields[j];
  }
  row.addEventListener('click', function() {

    const rowNode = document.querySelector('#' + row.id);
    activeSelection.innerHTML = `<div>${fields}</div>`;
  })
}

const clearInput = (inputComponent) => {
  inputComponent.value = "";
}

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

const inventoryURL = () => {
  return 'https://grandiose-pine.glitch.me/';
}

const captureUPC = (event) => {
  if (isUPC(event)) {
    // TODO: generate obj to send to api
    createInventory(event)
    clearInput(upcInput);
  }
}

const isUPC = (arg) => {
  const args = arg;
  var isUPC = false;
  if (args) {
    if (typeof args === 'string' && args.length === 8 && /^\d+$/.test(args)) {
      isUPC = true;
    }
  }
  return isUPC;
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



const addEventListenerTo = (classSelector, action, fn) => {
  const selectors = document.querySelectorAll(classSelector);
  console.log('selector', selectors)
  const num = selectors.length;
  if (num > 1) {
    selectors.forEach(function(selector) {
      selector.addEventListener(action, fn(event, selector.id))
    })
  }
}

  // ================= ASYNC API Request ===============

  // MESSAGE
const getTodoList = (name) => {

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

// INVENTORY
const getInventory = (name) => {

  displayLoader();
  return fetch(inventoryURL() + 'username/' + name, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
      })
  .then(results => {
    return results.json()
  })
  .then(data => {
    console.log("finihs", data)
    for(let k = 0; k < data.length; k++) {
      addRowToTable({
        upc: data[k].upc,
        quantity: data[k].quantity,
        date: data[k].date
      })
    }
    // // console.log('d', document.querySelectorAll('.items'))
    // addEventListenerTo('.items', 'click', function(event, id) {
    //   console.log("click", id)
    // })
    // addRowToTable(data)
    // hideLoader();
    // createToDoList(data);
  })
  .catch(err => console.error(err))
}

getInventory('Quang')

const createInventory = (upc) => {
  const inventory = {
    upc: upc,
    quantity: 1,
    date: new Date().toLocaleDateString()
  }

  
  fetch(inventoryURL() + 'item/create', {
    method: 'POST',
    body: JSON.stringify(inventory),
		headers: {
      'Content-Type': 'application/json'
		}
  })
  .then(results => {
    console.log("results", results)
    return results.json()
  })
  .then(data => {
    console.log("add to table inventory row", data)
    addRowToTable(inventory)
  })
  .catch(err => {
    console.log("Error:", err);
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



// items.forEach(function(item) {
//   console.log("item", item)
//   item.addEventListener('click', function() {
//     console.log("click")
//   })
// })



getTodoList('Quang');

