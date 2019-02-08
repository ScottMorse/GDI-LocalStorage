const menuForm = document.getElementById('menu-form')
const menuChecks = document.querySelectorAll('.menu-check')
const ordersList = document.getElementById('orders-list')

let items = {}
let orders = []

const startingLocalItems = localStorage.getItem("items")
const startingLocalOrders = localStorage.getItem("orders")

if(startingLocalItems){
  items = JSON.parse(localStorage.getItem("items"))
}
else{
  localStorage.setItem("items",JSON.stringify(items))
}

if(startingLocalOrders){
  orders = JSON.parse(localStorage.getItem("orders"))
  displayOrders()
}
else{
  localStorage.setItem("orders",JSON.stringify(orders))
}

menuChecks.forEach(menuCheck => {
  menuCheck.addEventListener('change',checkItem)
  menuCheck.checked = items[menuCheck.dataset.itemname]
})

function checkItem(){
  const itemName = this.dataset.itemname
  items[itemName] = this.checked
  localStorage.setItem("items",JSON.stringify(items))
}

function displayOrders(){
  ordersList.innerHTML = ""
  for(order of orders){

    const orderEl = document.createElement('li')
    const timeEl = document.createElement('div')
    const itemsEl = document.createElement('div')

    const orderTime = new Date(order.time).toLocaleString()
    timeEl.innerHTML = orderTime

    const orderItems = order.items
    let itemsText = ""
    
    Object.entries(orderItems).forEach(([name,bool]) => {
      if(bool) itemsText += " " + name + " "
    })

    itemsEl.innerHTML = itemsText

    orderEl.appendChild(timeEl)
    orderEl.appendChild(itemsEl)

    ordersList.appendChild(orderEl)

  }
}

function submitOrder(e){
  e.preventDefault()

  order = {
    time: Date.now(),
    items: items
  }

  orders.push(order)

  localStorage.setItem("orders",JSON.stringify(orders))

  items = {}
  localStorage.setItem("items",JSON.stringify(items))
  menuChecks.forEach(menuCheck => menuCheck.checked = false)

  displayOrders()
}

menuForm.addEventListener('submit',submitOrder)