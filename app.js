const getAllWainWrights = async () => {
    addDynamicHeading("Awating API..", "#wainwrights-list");
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
    const data = await response.json();

    try{
        const dynamicHeading = document.querySelector("#wainwrightsContainer p");
        dynamicHeading.parentNode.removeChild(dynamicHeading);
    } catch (error) {
        console.log("Error removing the api dynamic heading: ", error);
    }
    
    populateWainWrightsList(data);
    return data;
};



// populating the Wainwrights list
const populateWainWrightsList = (data) => {
    const wainWrightsList = document.querySelector("#wainwrights-list");
    const wainwrightsResponse = data;


    wainwrightsResponse.forEach((element) => {
        const wainwrightsElement = document.createElement("li");
        const wainwrightsElementName = document.createElement("p");
        const wainwrightsElementHeight = document.createElement("p");
        const wainwrightsElementArea = document.createElement("p");
        const divider = document.createElement("hr");
        
        wainwrightsElementName.innerText = `name: ${element["name"]}`;
        wainwrightsElement.appendChild(wainwrightsElementName);

        wainwrightsElementHeight.innerText = `height: ${element["heightFeet"]}feet`;
        wainwrightsElement.appendChild(wainwrightsElementHeight);

        wainwrightsElementArea.innerText = `area: ${element["area"]["areaName"]}`;
        wainwrightsElement.appendChild(wainwrightsElementArea);

        wainWrightsList.appendChild(wainwrightsElement);
        wainWrightsList.appendChild(divider);
    });
};



// adding a form
const addForm = () => {
    const simpleForm = document.createElement("form");
    simpleForm.action = "";
    simpleForm.id = "simple-form";

    const formInput = document.createElement("input");
    formInput.type = "text";
    formInput.placeholder = "Search for Wainwrights";
    formInput.id = "form-input";
    simpleForm.appendChild(formInput);

    const formButton = document.createElement("button");
    formButton.type = "submit";
    formButton.id = "form-button";
    formButton.innerText = "Search!";
    simpleForm.appendChild(formButton);

    const formContainer = document.querySelector("body");
    const reference = document.querySelector("#wainwrightsContainer")
    formContainer.insertBefore(simpleForm, reference);

    const divider = document.createElement("hr");
    formContainer.insertBefore(divider, reference);

    
    simpleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        submitForm(event);
    });
}



const submitForm = async (event) => {
    inputValue = event.target["form-input"].value;
    if (inputValue == "" ){
        return;
    } else{
        const filteredData = await filterWainWrights(inputValue);
        const list = document.querySelector("#wainwrights-list");
        list.innerText = "";
        if (!filteredData.length == 0) {
            populateWainWrightsList(filteredData);
        } 
    }

};



// Filtering
const filterWainWrights = async (input) => {
    apiData = await getAllWainWrights();

    addDynamicHeading("Filtering..", "#wainwrights-list");
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = apiData.filter((element) => element["name"].toLowerCase().includes(input.toLowerCase()));

    try{
        const dynamicHeading = document.querySelector("#wainwrightsContainer p");
        dynamicHeading.parentNode.removeChild(dynamicHeading);
    } catch (error) {
        console.log("Error removing the filtering dynamic heading: ", error);
    }

    return result;
}



const addDynamicHeading = (headingText, containerId) =>{
    const heading = document.createElement("p");
    heading.innerText = headingText;

    const container = document.querySelector(containerId);
    const parent = container.parentNode;

    container.innerText = "";
    parent.insertBefore(heading, container);
}



getAllWainWrights();
addForm();
