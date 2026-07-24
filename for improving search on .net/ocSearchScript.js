/**
 * ELLIE'S NOTES
 * - The indentation in this code is weird. Is everything supposed to be indented by one by default??
 * - "subfilter": the smaller filters that appear below the main dropdown (like the fragment thing, sex option)
 * - "radio": The single-select options (all are subfilters)
 */

/* Event listener for enter key trigger */
document.addEventListener("keyup", function(event){
    event.preventDefault();
    if (event.keyCode === 13){
        document.getElementById('searchButton').click();
    }
});

/* An array and dictionary of all sub-filter ids, to fetch their value if needed and append them to the link*/

var subFilter = document.getElementsByClassName("subSelect");
var subFilterList = Array.from(subFilter).map(element => element.id);

var radioInput = document.querySelectorAll('input[type="radio"]');
var radioList1 = Array.from(radioInput).map(element => element.id);
var radioList2 = Array.from(radioInput).map(element => element.value);
var radioDict = new Object();
for (let i = 0; i < radioList1.length; i++){
    radioDict[`${radioList1[i]}`] = `${radioList2[i]}`;
}

// We will add each search item's id (value) here to use during link generation
// Would love for it to be a list but since arrays are fixed length a map would be better
var currentPath = new Map();

// The corresponding textbox to show the current selected path
var pathTextBox = document.getElementsByClassName("pathText");

var objectTypeSubsBlock = [...document.getElementsByClassName("objectTypeChildren")];
var objectTypeSubs = objectTypeSubsBlock[0].querySelectorAll("*");
var objectTypeSubsIDs = new Array(objectTypeSubs.length);

for (let i = 0; i < objectTypeSubsIDs.length; i++){
    objectTypeSubs[i] = objectTypeSubs[i].id;
}

addListenerToSelect("object-type", objectTypeSubsIDs);


/** TODO: REFACTOR SO THAT IT CAN GO PAST ONE DEEP */
/* Event listener for selecting what to search by */
// Triggers when searchSelect's value changes             vvv
document.getElementById("searchSelect").addEventListener("change", function(){
/*Gets searchSelect value, pulling up the corresponding dropdown and hides searchSelect*/ 
    e = document.getElementById("searchSelect");
    x = e.value;

    if (x != "inital") {
        document.getElementById("searchSelect").style.visibility = "hidden";
        document.getElementById(`${x}`).style.visibility = "visible";

        currentPath.set("", x);
        console.log(currentPath);

    /*General sub-filters that apply to every category, makes them visible*/

        document.getElementById("conservation-material").style.visibility = "visible";
        document.getElementById("conservation-action").style.visibility = "visible";

        document.getElementById("resetButton").style.visibility = "visible";
        document.getElementById('searchButton').style.visibility = "visible";


        if (x != "pcnum") {
            currentPath.set("PC Number Entry", "");
            document.getElementById("fragmentSelect").style.visibility = "visible";

        } else {
            currentPath = new Map();
            currentPath.set("PC Number Entry", "");
            document.getElementById("conservation-material").style.visibility = "hidden";
            document.getElementById("conservation-action").style.visibility = "hidden";
        }

        /*Sub-filters that apply only to biologicalFilters*/
        var biologicalFilters = ['taxon', 'element', 'common-name'];
        if (biologicalFilters.includes(x)) {
            document.getElementById("preserved").style.visibility = "visible";
            document.getElementById("proximal-fused").style.visibility = "visible";
            document.getElementById("distal-fused").style.visibility = "visible";
            document.getElementById("side").style.visibility = "visible";
            document.getElementById("age-category").style.visibility = "visible";
            document.getElementById("skeletal-area").style.visibility = "visible";
            document.getElementById("sexSelect").style.visibility = "visible";
        }
    }
    displayPath();
});

 
//document.getElementById("object-type").addEventListener("change", function(){
/*Gets object-type value, pulling up the corresponding subFilter 
    TODO IN THE FUTURE: MAKE THIS NOT HARD-CODED IN!
*/ 
/*    e = document.getElementById("object-type");
    x = e.value;

    if (x == "architectural"){
        document.getElementById("object-type").style.visibility = "hidden";
        document.getElementById("architectural").style.visibility = "visible";
    }
});
*/

/* Function to call for every select (EXCEPT selectPrime) that has sub-menus that it can open */
//                           string    array of strings                                           
function addListenerToSelect(parentID, childrenIDList) {
    document.getElementById(parentID).addEventListener("change", function(){

        e = document.getElementById(parentID);
        x = e.value;

        for (let child of childrenIDList) {
            if (x == child){
                e.style.visibility = "hidden";
                childrenIDList.style.visibility = "visible";
            }
            currentPath.set(parentID, element)
            break;
        };

        console.log("something bad.........")

    });
}


/* Functions that fetch link based on user input */

function fetchByPC() {
    pcNumber = document.getElementById("pcnum").value;
    if (pcNumber.includes("PC") && pcNumber.includes(" ")) {
        var URL = (`https://opencontext.org/query/?q=${pcNumber}&type=subjects#tab=3`);
        return URL;
    } else {
        if (pcNumber.includes("PC") == false && pcNumber.includes(" ")){
            var URL = (`https://opencontext.org/query/?q=PC${pcNumber}&type=subjects#tab=3`);
            return URL;
        } else {
            if (pcNumber.includes("PC") && pcNumber.includes(" ") == false) {
                justNum = pcNumber.slice(2, 10)
                var URL = (`https://opencontext.org/query/?q=PC-${justNum}&type=subjects#tab=3`);
                return URL;
            } else {
                if (pcNumber.includes("PC") == false && pcNumber.includes(" ") == false){
                    var URL = (`https://opencontext.org/query/?q=PC-${pcNumber}&type=subjects#tab=3`); 
                    return URL;
                }
            }
        }
    }
}


/*Fills in the link dependng on the dropdown and option selected*/
function typeSearch(){
    searchType = document.getElementById("searchSelect").value;
    selectedType = document.getElementById(`${searchType}`).value;

    let link = `https://opencontext.org/query/?proj=24-murlo&project-map=True&prop=24-${searchType}---24-${selectedType}`;

    // TODO: MAKE THIS NOT HARD CODED!
    if (selectedType == "architectural"){
        architecturalType = document.getElementById(`${selectedType}`).value;
        link = link.concat(`---24-${architecturalType}`);
    }

    /* Calls the subSearch function to look for any sub-filters that was inputted*/
    var appendList = subSearch();
    console.log(appendList);
    for (let i = 0; i < appendList.length; i++){
        link = link.concat(`${appendList[i]}`);
    }
    let finalLink = link.concat('&type=subjects#tab=3');
    return finalLink;
}

// The subSearch function appends any extra sub-filter categories to the URL

function subSearch(){
    var addTo = [];
    for (let i = 0; i < subFilterList.length; i++) {
        x = document.getElementById(`${subFilterList[i]}`).value;
        if (x) {
            console.log("a");
            addTo.push(`&prop=24-${subFilterList[i]}---24-${x}`);
        }
    }
    radioOptions = Object.keys(radioDict)
    for (let ind = 0; ind < radioOptions.length; ind++) {
        if (document.getElementById(`${radioOptions[ind]}`).checked) {
            addTo.push(`&prop=24-${radioDict[radioOptions[ind]]}---24-${radioOptions[ind]}`);
        }
    }
    return addTo;
}

function displayPath(){
    console.log("Displaying...")
    console.log(currentPath)
    toDisplay = "";
    for (let parent of currentPath.keys()) {
        if (parent == ""){  // First Path
            toDisplay.concat(`${currentPath[parent]}`);
        } else if (currentPath[parent] == ""){  // Last Path
            break;
        } else {
            toDisplay.concat(` : ${currentPath[parent]}`);
        }
    }

    currentPath.textContent = toDisplay;
}

/* Button functions */
function openTab(){
    if (document.getElementById("pcnum").value.trim().length != 0) {
        window.open(fetchByPC(), "_blank");
        document.getElementById("1").reset();
    } else { 
        window.open(typeSearch(), "_blank");
    } 
}

function reset(){
    currentPath = new Map();

    document.getElementById("searchSelect").style.visibility = "visible";
    for (let pathElement in currentPath.keys()){
        
    }
    document.getElementById(`${document.getElementById("searchSelect").value}`).style.visibility = "hidden";
    for (let i = 0; i < subFilterList.length; i++) {
        document.getElementById(`${subFilterList[i]}`).style.visibility = "hidden";
    }

    // for (let i = 0; i < radioList1.length; i++) {
    //     document.getElementById(`${radioList1[i]}`).style.visibility = "hidden"
    // }
    // for (let i = 0; i < radioList1.length; i++) {
    //     document.getElementById(`${radioList1[i]}`).style.visibility = "hidden"
    // }

    // To make modular in the future
    document.getElementById("sexSelect").style.visibility = "hidden";
    document.getElementById("fragmentSelect").style.visibility = "hidden";

    // document.getElementById("conservation-material").style.visibility = "hidden"
    // document.getElementById("conservation-action").style.visibility = "hidden"
    // document.getElementById('searchButton').style.visibility = "hidden"
    // document.getElementById("preserved").style.visibility = "hidden"
    // document.getElementById("proximal-fused").style.visibility = "hidden"
    // document.getElementById("distal-fused").style.visibility = "hidden"
    // document.getElementById("side").style.visibility = "hidden"
    // document.getElementById("age-category").style.visibility = "hidden"
    // document.getElementById("skeletal-area").style.visibility = "hidden"
    // document.getElementById("resetButton").style.visibility = "hidden"
}

function returnHome(){
    window.open("https://poggiocivitate.net", "_self");
}

