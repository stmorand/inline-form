let currentFormItem = "";
let currentFormType = "";
let mousePos;
window.addEventListener('mousemove', (event) => {
    mousePos = { x: event.clientX, y: event.clientY };
});

function initInlineForm() {

    // Init all the number inputs
    for (let i=0; i< document.getElementsByClassName("inl-number").length ; i++) {

        document.getElementsByClassName("inl-number")[i].addEventListener("click", (event) => {
            event.preventDefault();
            showFormItem("number", event.target.id);
        });
        document.getElementsByClassName("inl-number")[i].onclick = function (param) {
            showFormItem("number", param.target.id);
        }
    }


    // Init all the text inputs
    for (let i=0; i< document.getElementsByClassName("inl-text").length ; i++) {

        document.getElementsByClassName("inl-text")[i].addEventListener("click", (event) => {
            event.preventDefault();
            showFormItem("text", event.target.id);
        });
        document.getElementsByClassName("inl-text")[i].onclick = function (param) {
            showFormItem("text", param.target.id);
        }
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
function showSelectFormItem(id) {console.log("showSelectFormItem", id)}
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
function hideSelectFormItem(id) {console.log("hideSelectFormItem", id)}
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