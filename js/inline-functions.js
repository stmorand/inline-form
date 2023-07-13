let currentFormItem = "";
let currentFormType = "";
let mousePos;
let selects;
let language = "fr";
let followType = "input"; //the popup can be display at mouse or input position
let backgroundBlur = true;
window.addEventListener('mousemove', (event) => {
    mousePos = { x: event.clientX, y: event.clientY };
});

/* load the tools included in selects.json */
function loadSelectsJSON(callback) {
    let xobj = new XMLHttpRequest();
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
    loadSelectsJSON(function(response) {
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

    // Init all the number inputs that must remain positive
    for (let i=0; i< document.getElementsByClassName("inl-number-abs").length ; i++) {
        document.getElementsByClassName("inl-number-abs")[i].addEventListener("click", (event) => {
            event.preventDefault();
            showFormItem("number-abs", event.target.id);
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

    // Init all the multiselect inputs
    for (let i=0; i< document.getElementsByClassName("inl-multiselect").length ; i++) {
        document.getElementsByClassName("inl-multiselect")[i].addEventListener("click", (event) => {
            event.preventDefault();
            showFormItem("multiselect", event.target.id);
        });
    }
}

function showFormItem(itemType,id) {
    currentFormItem = id;
    currentFormType = itemType;


    document.getElementById("inl-popup").classList.add("show");

    switch (itemType) {
        case "number":showNumberFormItem(id, false);break;
        case "number-abs":showNumberFormItem(id);break;
        case "select":showSelectFormItem(id);break;
        case "multiselect":showMultiselectFormItem(id);break;
        case "text":
        default:showTextFormItem(id);break;
    }
}

function showNumberFormItem(id, absolute = true) {
    let tempInput = document.createElement("input");
    tempInput.type = "number";
    tempInput.id = id + "-update";
    if (absolute) tempInput.min = '0';
    tempInput.autofocus = true;
    tempInput.value = document.getElementById(id).innerHTML;
    let tempLabel = document.createElement("label");
    tempLabel.innerText = document.getElementById(id).title;

    if (backgroundBlur) {
        document.getElementById("inl-popup").classList.add("bg-blur");
    }
    else {
        document.getElementById("inl-popup").classList.remove("bg-blur");
    }

    // breakpoint
    if (window.innerWidth > 768) {
        if (followType === "mouse") {
            document.getElementById("inl-popup").classList.remove("follow-input-overlay");
            document.getElementById("inl-popup-content").style.top = mousePos.y + "px";
            document.getElementById("inl-popup-content").style.left = mousePos.x + "px";
        }
        //followtype = input
        else {
            document.getElementById("inl-popup").classList.add("follow-input-overlay");
            let inputPos = document.getElementById(id).getBoundingClientRect();
            document.getElementById("inl-popup-content").style.top = inputPos.bottom + "px";
            document.getElementById("inl-popup-content").style.left = inputPos.x + "px";
        }
    }

    document.getElementById("inl-popup-content").innerHTML = "";
    document.getElementById("inl-popup-content").appendChild(tempInput); //innerHTML = document.getElementById(id).innerHTML;
    document.getElementById("inl-popup-content").appendChild(tempLabel);

    delayedFocus(tempInput.id).then();}
function showSelectFormItem(id) {
    console.log('showSelectFormItem',
        document.getElementById(id).getBoundingClientRect().x,
        document.getElementById(id).getBoundingClientRect().y,
        id);
    let tempList = document.createElement("ul");

    for (let i=0; i< selects[id.substring(4)].length;i++) {
        let tempLi = document.createElement("li");
        tempLi.innerHTML = "<li><a onclick=\"hideSelectFormItem(\'" + id + "\', \'" + selects[id.substring(4)][i]["text-" + language] + "\',\'" + selects[id.substring(4)][i]["name"] + "\')\">" + selects[id.substring(4)][i]["text-" + language] + "</a></li>";
        tempList.appendChild(tempLi);
    }
    let tempLabel = document.createElement("label");
    tempLabel.innerText = document.getElementById(id).title;


    if (backgroundBlur) {
        document.getElementById("inl-popup").classList.add("bg-blur");
    }
    else {
        document.getElementById("inl-popup").classList.remove("bg-blur");
    }

    // breakpoint
    if (window.innerWidth > 768) {
        if (followType === "mouse") {
            document.getElementById("inl-popup").classList.remove("follow-input-overlay");
            document.getElementById("inl-popup-content").style.top = mousePos.y + "px";
            document.getElementById("inl-popup-content").style.left = mousePos.x + "px";
        }
        //followtype = input
        else {
            document.getElementById("inl-popup").classList.add("follow-input-overlay");
            let inputPos = document.getElementById(id).getBoundingClientRect();
            document.getElementById("inl-popup-content").style.top = inputPos.bottom + "px";
            document.getElementById("inl-popup-content").style.left = inputPos.x + "px";
        }
    }

    document.getElementById("inl-popup-content").innerHTML = "";
    document.getElementById("inl-popup-content").appendChild(tempList); //innerHTML = document.getElementById(id).innerHTML;
    document.getElementById("inl-popup-content").appendChild(tempLabel);
}

function showMultiselectFormItem(id) {
    console.log('showMultiselectFormItem',
        document.getElementById(id).getBoundingClientRect().x,
        document.getElementById(id).getBoundingClientRect().y,
        id);
    let tempList = document.createElement("ul");

    console.log(selects);
    for (let i=0; i< selects[id.substring(4)].length;i++) {
        let tempLi = document.createElement("li");
        tempLi.innerHTML = "<li><a "+ (isInMultiselect(id, selects[id.substring(4)][i]["text-" + language],selects[id.substring(4)][i]["name"])? "class='multiselected'" :"") +" id=\"" + id.substring(4) + "-" + selects[id.substring(4)][i]["name"].replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '-') +"\" onclick=\"toggleMultiselectFormItem(\'" + id + "\', \'" + selects[id.substring(4)][i]["text-" + language] + "\',\'" + selects[id.substring(4)][i]["name"] + "\')\">" + selects[id.substring(4)][i]["text-" + language] + "</a></li>";
        tempList.appendChild(tempLi);
    }
    let tempLabel = document.createElement("label");
    tempLabel.innerText = document.getElementById(id).title;


    if (backgroundBlur) {
        document.getElementById("inl-popup").classList.add("bg-blur");
    }
    else {
        document.getElementById("inl-popup").classList.remove("bg-blur");
    }

    // breakpoint
    if (window.innerWidth > 768) {
        if (followType === "mouse") {
            document.getElementById("inl-popup").classList.remove("follow-input-overlay");
            document.getElementById("inl-popup-content").style.top = mousePos.y + "px";
            document.getElementById("inl-popup-content").style.left = mousePos.x + "px";
        }
        //followtype = input
        else {
            document.getElementById("inl-popup").classList.add("follow-input-overlay");
            let inputPos = document.getElementById(id).getBoundingClientRect();
            document.getElementById("inl-popup-content").style.top = inputPos.bottom + "px";
            document.getElementById("inl-popup-content").style.left = inputPos.x + "px";
        }
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

    if (backgroundBlur) {
        document.getElementById("inl-popup").classList.add("bg-blur");
    }
    else {
        document.getElementById("inl-popup").classList.remove("bg-blur");
    }

    // breakpoint
    if (window.innerWidth > 768) {
        if (followType === "mouse") {
            document.getElementById("inl-popup").classList.remove("follow-input-overlay");
            document.getElementById("inl-popup-content").style.top = mousePos.y + "px";
            document.getElementById("inl-popup-content").style.left = mousePos.x + "px";
        }
        //followtype = input
        else {
            document.getElementById("inl-popup").classList.add("follow-input-overlay");
            let inputPos = document.getElementById(id).getBoundingClientRect();
            document.getElementById("inl-popup-content").style.top = inputPos.bottom + "px";
            document.getElementById("inl-popup-content").style.left = inputPos.x + "px";
        }
    }

    document.getElementById("inl-popup-content").innerHTML = "";
    document.getElementById("inl-popup-content").appendChild(tempInput); //innerHTML = document.getElementById(id).innerHTML;
    document.getElementById("inl-popup-content").appendChild(tempLabel);

    delayedFocus(tempInput.id).then();
}



/* hide the popup */
function hideFormItem() {
    switch (currentFormType) {
        case "number":hideNumberFormItem(currentFormItem);break;
        case "select":hideSelectFormItem(currentFormItem);break;
        case "multiselect":hideMultiselectFormItem(currentFormItem);break;
        case "text":
        default:hideTextFormItem(currentFormItem);break;
    }
    document.getElementById("inl-popup").classList.remove("show");
}
function hideNumberFormItem(id) {
    // Visible text takes the input value
    document.getElementById(id).innerText = document.getElementById(id + "-update").value;
    document.getElementById(id.substring(4)).value = document.getElementById(id + "-update").value;
}
function hideSelectFormItem(id, longvalue, value) {
    document.getElementById(id).innerText = longvalue !== undefined ? longvalue : "";
    document.getElementById(id.substring(4)).value = value !== undefined ? value : "";
    document.getElementById(id.substring(4) + "-text").value = longvalue !== undefined ? value : "";
    document.getElementById("inl-popup").classList.remove("show");}

function hideMultiselectFormItem(id, longvalue, value) {
    console.log("hideMultiselectFormItem", id);
    let displayText = document.getElementById(id.substring(4) + "-text").value;
    document.getElementById(id).innerText = displayText !== undefined ? displayText.replaceAll("::", ", ") : "";
    /*document.getElementById(id.substring(4)).value = value !== undefined ? value : "";
    document.getElementById(id.substring(4) + "-text").value = longvalue.replace("::", ", ") !== undefined ? longvalue.replace("::", ", ") : "";
   */ document.getElementById("inl-popup").classList.remove("show");}

// select or unselect an element from a multiselect
function toggleMultiselectFormItem(id,longvalue,value) {

    console.log("toggleMultiselect", id, longvalue, value);
    console.log(document.getElementById(id.substring(4)).value);

    if (isInMultiselect(id,longvalue,value)) {
        console.log("toggleMultiselect", ">> remove");
        removeFromMultiselect(id, longvalue, value);
    }
    else {
        console.log("toggleMultiselect", ">> add");
        addToMultiselect(id, longvalue, value);
    }
}

function isInMultiselect(id, longvalue, value) {
    if ((document.getElementById(id.substring(4)).value !== undefined)
        && (document.getElementById(id.substring(4)).value !== "")) {

        let tempString = document.getElementById(id.substring(4)).value;
        let tempArray = tempString.split("::");

        for (let i=0; i < tempArray.length; i++) {
            if (tempArray[i] === value) {
                return true;
            }
        }
        return false;

    }
    else {
        return false;
    }
}
function addToMultiselect(id, longvalue, value) {
    if ((document.getElementById(id.substring(4)).value !== undefined)
        && (document.getElementById(id.substring(4)).value !== "")
        ){
        document.getElementById(id.substring(4)).value += value !== undefined ? "::" + value : "";
        document.getElementById(id.substring(4) + "-text").value += longvalue !== undefined ? "::" + longvalue : "";
    }
    else {
        document.getElementById(id.substring(4)).value = value !== undefined ? value : "";
        document.getElementById(id.substring(4) + "-text").value = longvalue !== undefined ? longvalue : "";
    }

    console.log( "addToMultiselect",
        id.substring(4) + "-" + value.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '-'));
    document.getElementById(id.substring(4) + "-" +  value.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '-')).classList.add('multiselected');
}

function removeFromMultiselect(id, longvalue, value) {
    if ((document.getElementById(id.substring(4)).value !== undefined)
        && (document.getElementById(id.substring(4)).value !== "")
    ){
        let tempString = document.getElementById(id.substring(4)).value;
        let tempArray = tempString.split("::");

        let tempStringText = document.getElementById(id.substring(4)+"-text").value;

        let tempArrayText = tempStringText.split("::");

        for (let i=0; i < tempArray.length; i++) {
            if (tempArray[i] === value) {
                tempArray.splice(i,1);
                tempArrayText.splice(i,1);
            }
        }
        document.getElementById(id.substring(4)).value = tempArray.length > 1 ? tempArray.join('::') : tempArray[0] !== undefined ? tempArray[0]:"";
        document.getElementById(id.substring(4)+"-text").value = tempArrayText.length > 1 ? tempArrayText.join('::') : tempArrayText[0] !== undefined ? tempArrayText[0]:"";
    }

    document.getElementById(id.substring(4) + "-" + value.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '-')).classList.remove('multiselected');
    console.log("removedFromMultiselect", document.getElementById(id.substring(4)).value);
}

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