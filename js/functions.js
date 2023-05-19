let currentFormItem = "";
let currentFormType = "";
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
    document.getElementById("inl-popup-content").innerHTML = "";
    document.getElementById("inl-popup-content").appendChild(tempInput); //innerHTML = document.getElementById(id).innerHTML;

    console.log("focus", tempInput.id);
    delayedFocus(tempInput.id).then();
    console.log("showNumberFormItem", id)}
function showSelectFormItem(id) {console.log("showSelectFormItem", id)}
function showTextFormItem(id) {console.log("showTextFormItem", id)}

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
    document.getElementById(currentFormItem).innerText = document.getElementById(currentFormItem + "-update").value;
   console.log("hideNumberFormItem",currentFormItem.substring(4))
    document.getElementById(currentFormItem.substring(4)).value = document.getElementById(currentFormItem + "-update").value;
    console.log("hideNumberFormItem", id)}
function hideSelectFormItem(id) {console.log("hideSelectFormItem", id)}
function hideTextFormItem(id) {console.log("hideTextFormItem", id)}

const delay = ms => new Promise(res => setTimeout(res, ms));
const delayedFocus = async (itemId, timer = 250) => {
    await delay(timer);
    document.getElementById(itemId).focus();

};