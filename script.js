//setting up variables
var links = [];
var inputtxt = document.getElementById("input-el");
var inputbtn = document.getElementById("input-btn");
var savebtn = document.getElementById("save-tab");
var deletebtn = document.getElementById("delete-links");
var linklist = document.getElementById("link-feild");
var savedlinks;

//getting stored links from local storage
savedlinks = JSON.parse(localStorage.getItem("links"));

// if links is empty but there are saved links show them
if (links == false && savedlinks) {

    //going through the saved links and pushing them 1 by 1 into the links array
    for (var x = 0; x < savedlinks.length; x++){
        links.push(savedlinks[x]);
    }
    update();
}

//inputted link eventlisteners
inputbtn.addEventListener("click", function() {
    if (inputtxt.value) {
        let input = inputtxt.value;
        links.push(input);

        //taking the new entered link and storing it in the local storage
        localStorage.setItem("links", JSON.stringify(links));
        update();
    }
    
})

//save current tab link eventlisteners
savebtn.addEventListener("click", function() {
    
    //using the chrome api to get the link of the current tab in order to store it
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        tab = tabs[0].url;
        links.push(tab);

        //taking the new entered link and storing it in the local storage
        localStorage.setItem("links", JSON.stringify(links));
        update();
    })
})

//delete links eventlisteners
deletebtn.addEventListener("dblclick", function() {
    links = [];

    //deleting all the links showen and links from the local storage
    localStorage.clear();
    update();
})

//showing the links
function update() {
    
    //clearing the input feild
    inputtxt.value = "";

    //clearing the links showen in order to get show repeated links
    linklist.textContent = "";

    //going through the links array to show every single link
    for (var i = 0; i < links.length; i++) {
        linklist.innerHTML += links[i] + "<br> <br>";
    }
}