const getAllWainWrights = async () => {
    const response = await fetch("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
    const data = await response.json();
    
    populateWainWrightsList(data);
};

const populateWainWrightsList = async (data) => {
    const wainWrightsList = document.querySelector("#wainwrights-list");
    const wainwrightsResponse = data;


    wainwrightsResponse.forEach((element) => {
        const wainwrightsElement = document.createElement("li");
        const wainwrightsElementName = document.createElement("p");
        const wainwrightsElementHeight = document.createElement("p");
        const wainwrightsElementArea = document.createElement("p");
        
        wainwrightsElementName.innerText = `${element["name"]}`;
        wainwrightsElement.appendChild(wainwrightsElementName);

        wainwrightsElementHeight.innerText = `height: ${element["heightFeet"]}feet`;
        wainwrightsElement.appendChild(wainwrightsElementHeight);

        wainwrightsElementArea.innerText = `area: ${element["area"]["areaName"]}`;
        wainwrightsElement.appendChild(wainwrightsElementArea);

        wainWrightsList.appendChild(wainwrightsElement);
    });
};


console.log(getAllWainWrights());
