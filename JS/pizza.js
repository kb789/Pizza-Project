// stores currently selected pizza size
let current_size=""

// array that lists currently selected toppings
let toppings=[]

// cost of currently selected size
let size_total=0;

// cost of currently selected toppings
let toppings_total=0;

// combined cost of currently selected pizza and toppings
let grand_total=0;


// updates toppings_total cost based on toppings_total array
function calculateToppingsPrice() {
    toppings_total=0
  if (toppings.length >1) {
    toppings_total = (toppings.length-1)*2;
  }
}


// triggered when place order button is clicked
function placeOrder() {
  
  //calculates sales tax and displays grand total 
  let sales_tax = .04*grand_total;
  let grand_total_tax=grand_total+sales_tax;
  grand_total_tax=grand_total_tax.toFixed(2);
  const tot = document.getElementById("total");
  tot.innerHTML="$"+grand_total+" plus $"+sales_tax+" sales tax = $"+grand_total_tax;
  
  //disables order button and enables reset button
  document.getElementById("btnOrder").disabled = true;
  document.getElementById("btnReset").disabled = false;
  
  //disables size and toppings radio and check mark buttons
  const size_radios = document.getElementsByClassName("size");
  for (let i=0; i< size_radios.length; i++) {
    size_radios[i].disabled=true;
  }
  const meat_checks = document.getElementsByClassName("toppings");
  for (let i=0; i< meat_checks.length; i++) {
    meat_checks[i].disabled=true;
  }
  const veg_checks = document.getElementsByClassName("toppings_v");
  for (let i=0; i< veg_checks.length; i++) {
    veg_checks[i].disabled=true;
  }
}


//triggered when reset button is clicked
function reset() {
  
//reset global variables
  current_size=""
  toppings=[]
  size_total=0;
  toppings_total=0;
  grand_total=0;

  // clear cart receipt list from webpage
document.getElementById("cart").style.visibility="hidden";
const ul = document.getElementById("list");
ul.innerHTML=""
const ul_t = document.getElementById("list_t");
ul_t.innerHTML=""

//make checkboxes and buttons active and unchecked
const size_radios = document.getElementsByClassName("size");
  for (let i=0; i< size_radios.length; i++) {
    size_radios[i].disabled=false;
    size_radios[i].checked=false;
  }
  const meat_checks = document.getElementsByClassName("toppings");
  for (let i=0; i< meat_checks.length; i++) {
    meat_checks[i].disabled=false;
    meat_checks[i].checked=false;
  }
  const veg_checks = document.getElementsByClassName("toppings_v");
  for (let i=0; i< veg_checks.length; i++) {
    veg_checks[i].disabled=false;
    veg_checks[i].checked=false;
  }
//enable place order button, disable reset button
document.getElementById("btnReset").disabled = true;
}


// get pizza size radio buttons from html document
const size_radios = document.getElementsByClassName("size");

// iterates through them and adds an event listener that fires when a radio button is clicked
for (let i=0; i< size_radios.length; i++) {
    size_radios[i].addEventListener('change', function() {
      if (size_radios[i].checked) {
        
        // sets current pizza size to checked radio button
        current_size=size_radios[i].value

        //enables order button and makes cart visible
        document.getElementById("btnOrder").disabled = false;
        document.getElementById("cart").style.visibility="visible";

        // resets price of pizza size
        grand_total-=size_total;
        size_total=0;
        
        // removes previous size listing from cart
        const ul = document.getElementById("list");
        ul.innerHTML=""

        // sets price of currently selected pizza size and adds it to the cart receipt
        if (current_size==="Personal Pizza") {
            size_total+=6;
            let li = document.createElement("li");
            li.appendChild(document.createTextNode("Personal Pizza: $6.00"));
            ul.appendChild(li);
        } else if (current_size==="Small Pizza") {
            size_total+=10;
            let li = document.createElement("li");
            li.appendChild(document.createTextNode("Small Pizza: $10.00"));
            ul.appendChild(li);
        }  else if (current_size==="Medium Pizza") {
            size_total+=12;
            let li = document.createElement("li");
            li.appendChild(document.createTextNode("Medium Pizza: $12.00"));
            ul.appendChild(li);
        }  else if (current_size==="Large Pizza") {
            size_total+=14;
            let li = document.createElement("li");
            li.appendChild(document.createTextNode("Large Pizza: $14.00"));
            ul.appendChild(li);
        }
        else if (current_size==="Extra Large Pizza") {
            size_total+=16;
            let li = document.createElement("li");
            li.appendChild(document.createTextNode("Extra Large Pizza: $16.00"));
            ul.appendChild(li);
        }
        // updates total price to include newly selected size
        const tot = document.getElementById("total");
        grand_total=size_total+toppings_total;
        tot.innerHTML="$"+grand_total;
      }
    });
}


// get meat toppings check boxes from html document
const meat_checks = document.getElementsByClassName("toppings");

// iterates through them and adds an event listener that fires when a check box is clicked
for (let i=0; i< meat_checks.length; i++) {

   // if the checkbox is checked, adds topping to array; if its unchecked, removes it. Updates total topping price
    meat_checks[i].addEventListener('change', function() {
      if (meat_checks[i].checked) {
          toppings.push(meat_checks[i].value)
          calculateToppingsPrice();
      } else {
        toppings = toppings.filter(topping=> {
            return topping !== meat_checks[i].value
        })
        calculateToppingsPrice();
      }

      // clears old topping list from cart
      const ul_t = document.getElementById("list_t");
      ul_t.innerHTML=""
      
      // adds new topping list to cart
      toppings.forEach(topping=>  {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(topping));
        ul_t.appendChild(li);
      })
      
      // updates grand total with new toppings price and displays it in cart
      const tot = document.getElementById("total");
        grand_total=size_total+toppings_total;
        tot.innerHTML="$"+grand_total;
    })
}

// get vegetable toppings check boxes from html document
const veg_checks = document.getElementsByClassName("toppings_v");

// iterates through them and adds an event listener that fires when a check box is clicked
for (let i=0; i< veg_checks.length; i++) {

  // if the checkbox is checked, adds topping to array; if its unchecked, removes it. Updates total topping price
    veg_checks[i].addEventListener('change', function() {
      if (veg_checks[i].checked) {
          toppings.push(veg_checks[i].value)
          calculateToppingsPrice();
     } else {
        toppings = toppings.filter(topping=> {
            return topping !== veg_checks[i].value
        })
        calculateToppingsPrice();
      }

      // clears old topping list from cart
      const ul_t = document.getElementById("list_t");
      ul_t.innerHTML=""

       // adds new topping list to cart
      toppings.forEach(topping=>  {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(topping));
        ul_t.appendChild(li);
      })

      // updates grand total with new toppings price and displays it in cart
      const tot = document.getElementById("total");
        grand_total=size_total+toppings_total;
        tot.innerHTML="$"+grand_total;
    })
}