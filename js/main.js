//get array of images
let backgrounds = [
    'url(images/1.png)',
    'url(images/2.png)',
    'url(images/3.png)',
    'url(images/4.png)',
    'url(images/5.png)',
]

let landingPage = document.querySelector(".landing-page")

let currentIndex = 1

function changeBg(){
    landingPage.style.backgroundImage = backgrounds[currentIndex]
    landingPage.style.backgroundSize = 'cover'
    landingPage.style.transition = '5s'
    currentIndex = (currentIndex + 1) % backgrounds.length
}

changeBg()

//random background option
let option = true

//var to control the interval
let interval;

function change(){
    if(option === true){
        interval = setInterval(changeBg, 10000)
    } 
}

change()

//!click function to open settings

//select the settings div and settings gear

let settingsDiv = document.querySelector(".settings-box")
let settingsIcon = document.querySelector(".toggle-settings")

settingsIcon.addEventListener("click", () => {
    settingsDiv.classList.toggle("open")
    settingsIcon.style.transform = "rotate(360deg)"
})



//switch colors

const colorsLi = document.querySelectorAll(".colors-list li")
let mainColor = localStorage.getItem("mainColor")

//check if there is a main color in the local storage
if(mainColor){
    document.documentElement.style.setProperty("--main-color", mainColor)

    //add active class to local storage if it is equal to the current color
    colorsLi.forEach(li => {
        if(li.dataset.color === mainColor){
            li.classList.add("active")
        }
    })
}



colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        let color = e.target.dataset.color
        //add the active class
        li.classList.add("active")

        //set color on root
        document.documentElement.style.setProperty("--main-color", color)

        //add color to local storage
        localStorage.setItem("mainColor", color)

        handleActive(e)
    })

})


//remove background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span")
const activeSpan = localStorage.getItem("activeSpanIndex")
const optionOfLocalstorage = localStorage.getItem("option")

if(optionOfLocalstorage){
    if(optionOfLocalstorage === "yes"){
        option = true
         change()
    } else {
        option = false
        clearInterval(interval)
    }
}

//loop on all spans (get index so we can compare it)
randomBackEl.forEach((span, index) => {
    //click on every span
    span.addEventListener("click", (e) => {
        handleActive(e)

        //for active class
        localStorage.setItem("activeSpanIndex", index)

        //for option to work
        localStorage.setItem("option", e.target.dataset.background)

        if(e.target.dataset.background === "yes"){
            option = true
            change()
        } else {
            option = false
            clearInterval(interval)
        }
    })

   

    if(index === parseInt(activeSpan)){
        span.classList.add("active")
        console.log(activeSpan)
    }
    
})








//select skills selector

let ourSkills = document.querySelector(".skills")

window.onscroll = function(){
    //skills offset top
    let skillsOffsetTop = ourSkills.offsetTop - 1

    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight
    

    //window height
    let windowHeight = this.innerHeight
    
    //window scroll top
    let windowScrollTop = this.pageYOffset
   

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }
}





//create pop up with the image

let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img => {
    img.addEventListener("click", e => {
        //create overlay div
        let overlay = document.createElement("div")

        //add class to overlay
        overlay.className = "popup-overlay"

        //append overlay to body
        document.body.appendChild(overlay)

        //create popup div
        let popupBox = document.createElement("div")

        //add class to pop up box
        popupBox.className = "popup-box"


        if(img.alt !== null){

            //create heading
            let imgHeading = document.createElement("h3")

            //create text for heading
            let imgText = document.createTextNode(img.alt)

            //append the text to the heading
            imgHeading.appendChild(imgText)

            //append the heading th the popup box
            popupBox.appendChild(imgHeading)
        }


        //create the image
        let popupImage = document.createElement("img")

        // set image source
        popupImage.src = e.target.src
        
        //add image to pop up box
        popupBox.appendChild(popupImage)

        //append the pop up box to body
        document.body.appendChild(popupBox)

        //create the close span
        let closeButton = document.createElement("span")

        //create the text
        let closeButtonText = document.createTextNode('X')

        //appen text to close buttone
        closeButton.appendChild(closeButtonText)

        //add class to close button
        closeButton.className = "close-button"

        //add close button to the pop up pox
        popupBox.appendChild(closeButton)

        //click function to close popup
        closeButton.addEventListener('click', () => {
            //remove pop up box
            popupBox.remove()

            //remove the overlay
            overlay.remove()
        })
    })
})




//select all bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet")
let allLinks = document.querySelectorAll(".links a")

//select all links
function scrollToSections(elements){

    elements.forEach((ele) => {
        ele.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelector(e.target.dataset.section).scrollIntoView()
    })
})
}



scrollToSections(allBullets)
scrollToSections(allLinks)


//handle active state

function handleActive(ev){
     ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
     })
     ev.target.classList.add("active")
}




let bulletsSpan = document.querySelectorAll(".bullets-option span")

let bulletsContainer = document.querySelector(".nav-bullets")

let bulletStorage = localStorage.getItem("bullet_option")

if(bulletStorage !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove()
    })

    if(bulletStorage === "block"){
        bulletsContainer.style.display = 'block'
        document.querySelector(".bullets-option .yes").classList.add("active")
    } else {
        bulletsContainer.style.display = 'none'
        document.querySelector(".bullets-option .no").classList.add("active")

    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        //add to local storage
        if(span.dataset.display === "yes"){
            bulletsContainer.style.display = "block"
            localStorage.setItem("bullet_option", "block")
        } else {
            bulletsContainer.style.display = "none"
            localStorage.setItem("bullet_option", "none")
        }
        handleActive(e)
    })

})


//select all paragraphs in the page
let allP = document.querySelectorAll("p")

let fontSpan = document.querySelectorAll(".font-option span")

let fontStorage = localStorage.getItem("font")

if(fontStorage){
    //remove active class for each element
    fontSpan.forEach(span => {
        span.classList.remove()
    })

    if(fontStorage === "14"){
        document.querySelector(".font-option .fourteen").classList.add("active")
        fontSize = "14px"
    } else if(fontStorage === "17"){
        document.querySelector(".font-option .seventeen").classList.add("active")
        fontSize = "17px"
    } else if(fontStorage === "25"){
        document.querySelector(".font-option .twenty-five").classList.add("active")
        fontSize = "25px"
    }

    allP.forEach(p => {
        p.style.fontSize = fontSize
    })
}

fontSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        let fontSize = ""

        if(span.dataset.font === "14"){
            localStorage.setItem("font", "14")
            fontSize = "14px"
        } else if (span.dataset.font === "17"){
            localStorage.setItem("font", "17")
            fontSize = "17px"
        } else if (span.dataset.font === "25"){
            localStorage.setItem("font", "25")
            fontSize = "25px"
        }

        allP.forEach(p => {
            p.style.fontSize = fontSize
        })
        handleActive(e)
    })
})




//select the reset button

let reset = document.querySelector(".reset")

reset.onclick = function(){
    //clear local storage
    localStorage.clear()

    //reload the page
    location.reload()
}




//toggle menu
let toggleBtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")

toggleBtn.onclick = function(event){
    //stop propagation
    event.stopPropagation();
    this.classList.toggle("menu-active")
    tLinks.classList.toggle("open")
}


document.onclick = function(e){
    if(!e.target.classList.contains("links")){
        toggleBtn.classList.remove("menu-active")
        tLinks.classList.remove("open")
    }
}

//stop propagation on menu
tLinks.onclick = function(e){
    e.stopPropagation()
}
