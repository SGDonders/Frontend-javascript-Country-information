// Importing axios
import axios from "axios";

// Fetch data
async function fetchData() {
    try {
        const axiosResponse = await axios.get('https://restcountries.com/v2/all');
        console.log(axiosResponse);

        // Sort data
        const countries = axiosResponse.data;
        countries.sort((a, b) => {
            return a.population - b.population;
        });

        // Create document fragment
        const axiosResponseList = document.createDocumentFragment();

        // Iterate through data
        axiosResponse.data.map((response)=> {
            //  Implement flag into fragment
            const elementFlag = document.createElement('img');
            elementFlag.setAttribute("class", "flag");
            elementFlag.setAttribute("src", response.flag);
            axiosResponseList.appendChild(elementFlag);

            // Implement name into fragment
            const elementName = document.createElement('li');
            elementName.setAttribute("class", "name");
            elementName.textContent = response.name;
            axiosResponseList.appendChild(elementName);

            // Implement amount of population into fragment
            const elementPopulation = document.createElement('li');
            elementPopulation.textContent = `Has a population of ${response.population} people.`;
            axiosResponseList.appendChild(elementPopulation);

            // Implement region into fragment
            const elementRegion = document.createElement('li');
            elementRegion.textContent = response.region;
            axiosResponseList.appendChild(elementRegion);

            // Switch statement to style color region
            switch (response.region) {
                case "Africa":
                    elementName.style.color = "blue";
                    break;
                case "Americas":
                    elementName.style.color = "green";
                    break;
                case "Asia":
                    elementName.style.color = "red";
                    break;
                case "Europe":
                    elementName.style.color = "#FDB813";
                    break;
                case "Oceania":
                    elementName.style.color = "purple";
                    break;
            }

            // Insert document fragment into the DOM
            const container = document.getElementById('data');
            container.appendChild(axiosResponseList);

       });    } catch( error ) { // Catching errors
        console.error( error );
        const errorMessage = document.getElementById("error-msg");
        if( error.response.status === 404 ){
            errorMessage.textContent = "Page not found | 404";
        }
        if ( error.response.status === 500) {
            errorMessage.textContent = "Internal server error | 500";
        }else {
            errorMessage.textContent = "Page not found";
        }
    }
}
fetchData();










