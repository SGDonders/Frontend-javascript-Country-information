// Importing axios
import axios from "axios";

// OPDRACHT 1:

async function fetchData() {
    try {
        // Fetch data from endpoint
        const axiosResponse = await axios.get('https://restcountries.com/v2/all');
        //console.log(axiosResponse) // For testing endpoint

        // Sort data
        const countries = axiosResponse.data;
        countries.sort((a, b) => {
            return a.population - b.population;
        });


        // Create document fragment
        const axiosResponseList = document.createDocumentFragment();

        // Iterate through data
        axiosResponse.data.map(({flag, name, population, region}) => {

            //  Implement flag into fragment
            const elementFlag = document.createElement('img');
            elementFlag.setAttribute("class", "flag");
            elementFlag.setAttribute("src", flag);
            axiosResponseList.appendChild(elementFlag);

            // Implement name into fragment
            const elementName = document.createElement('li');
            elementName.setAttribute("class", "name");
            elementName.textContent = name;
            axiosResponseList.appendChild(elementName);

            // Implement amount of population into fragment
            const elementPopulation = document.createElement('li');
            elementPopulation.textContent = `Has a population of ${population} people.`;
            axiosResponseList.appendChild(elementPopulation);

            // Implement region into fragment
            const elementRegion = document.createElement('li');
            elementRegion.textContent = region;
            axiosResponseList.appendChild(elementRegion);

            // Switch statement to style color region
            switch (region) {
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
        });

    } catch (error) { // Catching errors
        const errorMessage = document.getElementById("error-msg");
        if (error.status === 404) {
            errorMessage.textContent = "Page not found | 404";
        }
        if (error.status === 500) {
            errorMessage.textContent = "Internal server error | 500";
        }
    }
}
fetchData();

//----------------------------------------------------------------------------------------------------------------------

// OPDRACHT 2

const emptyList = document.getElementById('search-ul');
const errorMessage = document.getElementById("error-search-msg");

async function fetchSearchData(country) {

    try {
        const axiosSearchResponse = await axios.get(`https://restcountries.com/v2/name/${country}`);
        //console.log(axiosSearchResponse) //test output endpoint

        // Empty list search result and error message
        emptyList.replaceChildren();
        errorMessage.replaceChildren();

        // Fetch data from endpoint
        axiosSearchResponse.data.map(({capital, currencies, flag, name, population, subregion, languages}) => {

            // Iterate through currencies
            let coinString;
            const currenciesArray = currencies.map((coin) => {
                return coin.name;
            })

            // String builder for currencies
            if (currencies.length === 1) {
                coinString = `${currenciesArray[0]}`;
            } else {
                coinString = `${currenciesArray[0]} and ${currenciesArray[1]}`;
            }

            // Iterate trough languages
            let languagesString;
            const languagesArray = languages.map((language) => {
                return language.name;
            })

            // String builder for language
            if (languagesArray.length === 1) {
                languagesString = `${languagesArray[0]}`;
            } else if (languages.length === 2) {
                languagesString = `${languagesArray[0]} and ${languagesArray[1]}`;
            } else {
                languagesString = `${languagesArray[0]}, ${languagesArray[1]} and ${languagesArray[2]}'s`;
            }

            // Create document fragment
            const axiosSearchResponseList = document.createDocumentFragment();

            // Implement flag into fragment
            const elementFlag = document.createElement('img');
            elementFlag.setAttribute("class", "flag");
            elementFlag.setAttribute("src", flag);
            axiosSearchResponseList.appendChild(elementFlag);

            // Implement name into fragment
            const elementName = document.createElement('li');
            elementName.textContent = name;
            axiosSearchResponseList.appendChild(elementName);

            // Implement String about subregion and population into fragment
            const elementRegion = document.createElement('li');
            elementRegion.textContent = `${name} is situated in ${subregion}. 
                                     It has a population of ${population} people.`;
            axiosSearchResponseList.appendChild(elementRegion);

            // Implement capital into fragment
            const elementCurrencies = document.createElement('li');
            elementCurrencies.textContent = `The capital is ${capital} and you can pay 
                                         with ${coinString}`;
            axiosSearchResponseList.appendChild(elementCurrencies);

            // Implement language into fragment
            const elementLanguage = document.createElement('li');
            elementLanguage.textContent = `They speak ${languagesString}`
            axiosSearchResponseList.appendChild(elementLanguage);

            // Inject fragment into the DOM
            const container = document.getElementById('search-ul');
            container.appendChild(axiosSearchResponseList);
        })
    }
    catch (error) { // Catching errors
        const errorMessage = document.getElementById("error-search-msg");
        if (error.status === 404) {
            errorMessage.textContent = "Page not found | 404";
        }
        if (error.status === 500) {
            errorMessage.textContent = "Internal server error | 500";
        }
    }
}
fetchSearchData()

// Button function click handler
let userInput = document.getElementById("searchField");

const button = document.getElementById('searchButton');
button.addEventListener('click', () => {
    // noinspection JSIgnoredPromiseFromCall
    fetchSearchData(userInput.value)
})
