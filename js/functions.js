let currentFormItem = "";
let currentFormType = "";
let mousePos;
let selects;
let language = "fr"
window.addEventListener('mousemove', (event) => {
    mousePos = { x: event.clientX, y: event.clientY };
});

/* load the tools included in selects.json */
function loadToolsJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'selects.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function initInlineForm() {
    loadToolsJSON(function(response) {
        // Parse JSON string into object
        selects = JSON.parse(response);
    });



    // Init all the number inputs
    for (let i=0; i< document.getElementsByClassName("inl-number").length ; i++) {
        document.getElementsByClassName("inl-number")[i].addEventListener("click", (event) => {
            event.preventDefault();
            showFormItem("number", event.target.id);
        });
    }


    // Init all the text inputs
    for (let i=0; i< document.getElementsByClassName("inl-text").length ; i++) {

        document.getElementsByClassName("inl-text")[i].addEventListener("click", (event) => {
            event.preventDefault();
            showFormItem("text", event.target.id);
        });
    }

    // Init all the select inputs
    for (let i=0; i< document.getElementsByClassName("inl-select").length ; i++) {
        document.getElementsByClassName("inl-select")[i].addEventListener("click", (event) => {
            event.preventDefault();
            showFormItem("select", event.target.id);
        });
    }
}

function showFormItem(itemType,id) {
    currentFormItem = id;
    currentFormType = itemType;


    document.getElementById("inl-popup").classList.add("show");

    switch (itemType) {
        case "number":showNumberFormItem(id);break;
        case "select":showSelectFormItem(id);break;
        case "text":
        default:showTextFormItem(id);break;
    }
}

function showNumberFormItem(id) {
    let tempInput = document.createElement("input");
    tempInput.type = "number";
    tempInput.id = id + "-update";
    tempInput.autofocus = true;
    tempInput.value = document.getElementById(id).innerHTML;
    let tempLabel = document.createElement("label");
    tempLabel.innerText = document.getElementById(id).title;

    // breakpoint
    if (window.innerWidth > 768) {
        document.getElementById("inl-popup-content").style.top = mousePos.y +"px";
        document.getElementById("inl-popup-content").style.left = mousePos.x +"px";
    }

    document.getElementById("inl-popup-content").innerHTML = "";
    document.getElementById("inl-popup-content").appendChild(tempInput); //innerHTML = document.getElementById(id).innerHTML;
    document.getElementById("inl-popup-content").appendChild(tempLabel);

    console.log("focus", tempInput.id);
    delayedFocus(tempInput.id).then();
    console.log("showNumberFormItem", id)}
function showSelectFormItem(id) {
    console.log("showSelectFormItem", id)

    let tempList = document.createElement("ul");

    for (let i=0; i< selects[id.substring(4)].length;i++) {
        let tempLi = document.createElement("li");
        let tempHTML = "<li><a onclick=\"hideSelectFormItem(\'" + id + "\', \'" + selects[id.substring(4)][i]["text-"+ language] + "\',\'" + selects[id.substring(4)][i]["name"] + "\')\">"+ selects[id.substring(4)][i]["text-"+ language] +"</a></li>";
        tempLi.innerHTML = tempHTML;
        tempList.appendChild(tempLi);
    }
    let tempLabel = document.createElement("label");
    tempLabel.innerText = document.getElementById(id).title;


    // breakpoint
    if (window.innerWidth > 768) {
        document.getElementById("inl-popup-content").style.top = mousePos.y +"px";
        document.getElementById("inl-popup-content").style.left = mousePos.x +"px";
    }

    document.getElementById("inl-popup-content").innerHTML = "";
    document.getElementById("inl-popup-content").appendChild(tempList); //innerHTML = document.getElementById(id).innerHTML;
    document.getElementById("inl-popup-content").appendChild(tempLabel);
}
function showTextFormItem(id) {
    let tempInput = document.createElement("input");
    tempInput.type = "text";
    tempInput.id = id + "-update";
    tempInput.autofocus = true;
    tempInput.value = document.getElementById(id).innerHTML;
    let tempLabel = document.createElement("label");
    tempLabel.innerText = document.getElementById(id).title;

    // breakpoint
    if (window.innerWidth > 768) {
        document.getElementById("inl-popup-content").style.top = mousePos.y +"px";
        document.getElementById("inl-popup-content").style.left = mousePos.x +"px";
    }

    document.getElementById("inl-popup-content").innerHTML = "";
    document.getElementById("inl-popup-content").appendChild(tempInput); //innerHTML = document.getElementById(id).innerHTML;
    document.getElementById("inl-popup-content").appendChild(tempLabel);

    console.log("focus", tempInput.id);
    delayedFocus(tempInput.id).then();
    console.log("showTextFormItem", id)
}



/* hide the popup */
function hideFormItem() {
    switch (currentFormType) {
        case "number":hideNumberFormItem(currentFormItem);break;
        case "select":hideSelectFormItem(currentFormItem);break;
        case "text":
        default:hideTextFormItem(currentFormItem);break;
    }
    document.getElementById("inl-popup").classList.remove("show");
}
function hideNumberFormItem(id) {
    // Visible text takes the input value
    document.getElementById(id).innerText = document.getElementById(id + "-update").value;
    document.getElementById(id.substring(4)).value = document.getElementById(id + "-update").value;
    console.log("hideNumberFormItem", id)}
function hideSelectFormItem(id, longvalue, value) {
    console.log("hideSelectFormItem", id, longvalue, value);
    document.getElementById(id).innerText = longvalue;
    document.getElementById(id.substring(4)).value = value;
    document.getElementById(id.substring(4) + "-text").value = longvalue;
    document.getElementById("inl-popup").classList.remove("show");}
function hideTextFormItem(id) {
    // Visible text takes the input value
    document.getElementById(id).innerText = document.getElementById(id + "-update").value;
    document.getElementById(id.substring(4)).value = document.getElementById(id + "-update").value;
}

const delay = ms => new Promise(res => setTimeout(res, ms));
const delayedFocus = async (itemId, timer = 250) => {
    await delay(timer);
    document.getElementById(itemId).focus();

};