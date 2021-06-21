const apiKey = 'b6a710ce24f30603d46bbb895d784eb2';
const baseUrlApi = `https://api.openweathermap.org/data/2.5/weather?zip={{zipCode}}&APPID=${apiKey}`;

const retrieveData = async (url) => { 
    const request = await fetch(url);
    try {
        const data = await request.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
};

const postData = async (url, data = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

const getAll = async () => {
    return retrieveData('/all');
};

const getWeatherInfo = async (zipCode) => {
    return retrieveData(baseUrlApi.replace('{{zipCode}}', zipCode));
};

const saveWeatherInfo = async (data) => {
    data.userFeelings = document.getElementById('feelings').value;
    return postData('/add', data);
}

const updateUI = async (data) => {
    const dateField = document.getElementById('date');
    const tempField = document.getElementById('temp');
    const contentField = document.getElementById('content');

    const date = new Date(data.date);
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    dateField.innerHTML = dateString;
    tempField.innerHTML = data.temperature;
    contentField.innerHTML = data.userResponse;

    return;
};

const generateClick = function () {
    const zipCode = document.getElementById('zip').value;
    getWeatherInfo(zipCode)
        .then(saveWeatherInfo)
        .then(getAll)
        .then(updateUI);
};

document.getElementById('generate').addEventListener('click', generateClick);