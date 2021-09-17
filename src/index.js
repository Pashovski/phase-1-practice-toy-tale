let addToy = false;

const BASE_URL = "http://localhost:3000/toys"

// make a GET request ramen data
fetch(BASE_URL)
.then(function(res){
    return res.json()
})
.then((toyArray) => toyArray.forEach((toyObj) => renderToy(toyObj)))
    //for every piece of data we get we'll render it
    
    

//     //for each takes each element in the array and PASSES it to our callback function
// })
 function renderToy(toyObj){

  const toyDiv = document.createElement('div')
  toyDiv.className = "card"

  const toyName = document.createElement('h2')
  toyName.innertext = toyObj.name
  
  const toyImg = document.createElement('img')
  toyImg.src = toyObj.image
  toyImg.className = "toy-avatar"

  const toyLikes = document.createElement('p')
  toyLikes.innerText = "Like: " + toyObj.likes
  // toyLikes.id = `toy-${toyObj.id}`
  

  const likeBtn = document.createElement('button')
  likeBtn.innerText = '❤'
  likeBtn.addEventListener('click', () => {
    //this increments the toyObjects like data
    ++toyObj.likes
    // this goes to the <P> tag and updates with the incremented data
    toyLikes.innerText = "Like: " + toyObj.likes
    //make the part of the DOM that you want to grab, easily grabable
  })

  //put the card together
toyDiv.append(toyName, toyImg, toyLikes, likeBtn)
  //add it to the toy-collection div
  //finding the toy collection div
  const toyCollection = document.getElementById('toy-collection')
  // appending the card to the div
  toyCollection.appendChild(toyDiv)


}


//grab the form from the DOM
const form = document.querySelector(".add-toy-form")

// add an event listener to the form of type submit
form.addEventListener('submit', submitHandler)

function submitHandler(event){
  event.preventDefault()
  console.log("submitHandler")
  //grab the values from the form
 // make an object with those values

 const newToy = {
   name: event.target.name.value,
   likes: 0,
   image: event.target.image.value
 }
 
window.scrollTo(0,document.body.scrollHeight)
renderToy(newToy)
event.target.reset

fetch(BASE_URL, {
  method: 'POST',
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(newToy)
})
}


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


