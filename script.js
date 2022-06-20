function iconTitle(text) {
    const textDict = {
        Sunny: "Cerah", Clear: "Cerah", "Partly cloudy": "Sebagian Berawan",
        Cloudy: "Berawan", Mist: "Kabut", Overcast: "Mendung",
        "Patchy rain possible": "Kemungkinan Hujan Rintik-Rintik",
        "Patchy light drizzle": "Gerimis tipis merata",
        "Light drizzle": "Gerimis ringan",
        "Patchy light rain": "Hujan rintik-rintik",
        "Light rain": "Hujan ringan",
        "Moderate rain at times": "Hujan dengan intensitas sedang",
        "Moderate rain": "Hujan sedang",
        "Heavy rain at times": "Hujan deras kadang-kadang",
        "Heavy rain": "Hujan deras",
        "Torrential rain shower": "Hujan deras",
        "Patchy light rain with thunder": "Hujan rintik-rintik disertai guntur",
        "Moderate or heavy rain with thunder": "Hujan sedang atau lebat disertai petir",
    }; 
    let icon_title = document.querySelector('#icon-title');

    for (let condition of Object.keys(textDict)) {
        if (text == condition) {
            icon_title.innerHTML = textDict[condition];        
        }
    }
}

// let inputKeyword = document.querySelector('.input-keyword');
// function Default(def) {
//     let input_def = "Jakarta";

// }


async function fetchData() {
    let inputKeyword = document.querySelector('.input-keyword');
    let inputKey = inputKeyword.value;

    if (inputKey == "") {
        inputKey = "Jakarta"
    }
    
    console.log(inputKeyword.value);
    const respon = await
        fetch("http://api.weatherapi.com/v1/forecast.json?key=5e3bbd9fbe134591aa695336221706&q="
            + `${inputKey}` + "&days=1&aqi=no&alerts=no")
            .then(respon => respon.json())
            .then(respon => {
                let location = document.querySelector('#location');
                let current_temp = document.querySelector('#current_temp');
                let feelslike = document.querySelector('#feels_temp');
                let icon = document.querySelector('#icon-weather');
                let last_update = document.querySelector('#last_update');
                let icon_title = document.querySelector('#icon-title');
                location.innerHTML = `${respon.location.name}, ${respon.location.region}, ${respon.location.country}`
                current_temp.innerHTML = `${respon.current.temp_c}&deg;C `
                feelslike.innerHTML = `${respon.current.feelslike_c}&deg;C`
                icon.src = `${respon.current.condition.icon}`
                icon_Title = `${respon.current.condition.text}`
                iconTitle(icon_Title);

                let last_update_epoc = `${respon.current.last_updated_epoch}`

                let utcSeconds = last_update_epoc;
                let d = new Date(0);
                let utc = d.setUTCSeconds(utcSeconds);
                let date_string = d.toLocaleString(['ban', 'id']);

                console.log(date_string);
                last_update.innerHTML = `${date_string} WIB`

                let sunrise = document.querySelector(".SunriseTime");
                sunrise.innerHTML = `${respon.forecast.forecastday[0].astro.sunrise}`
                let sunset = document.querySelector(".SunsetTime");
                // console.log(`${loaded.forecast.forecastday[0].astro.sunrise}`);
                sunset.innerHTML = `${respon.forecast.forecastday[0].astro.sunset}`
                let moonrise = document.querySelector(".MoonriseTime");
                moonrise.innerHTML = `${respon.forecast.forecastday[0].astro.moonrise}`
                let moonset = document.querySelector(".MoonsetTime");
                moonset.innerHTML = `${respon.forecast.forecastday[0].astro.moonset}`
            })
            // .catch(error => alert(error.message));
            .catch(error => alert(`Nama kota yang Anda masukkan (${inputKey}) tidak terdaftar/salah, Coba lagi!`));
    inputKeyword.value = null;
};

const a = "Jakarta";
async function loadData() {
    const loaded = await
        fetch("http://api.weatherapi.com/v1/forecast.json?key=5e3bbd9fbe134591aa695336221706&q="
            + `${a}` + "&days=1&aqi=no&alerts=no")
    .then(loaded => loaded.json())
            .then(loaded => {
                let location = document.querySelector('#location');
                let current_temp = document.querySelector('#current_temp');
                let feelslike = document.querySelector('#feels_temp');
                let icon = document.querySelector('#icon-weather');
                let last_update = document.querySelector('#last_update');
                let icon_title = document.querySelector('#icon-title');
                location.innerHTML = `${loaded.location.name}, ${loaded.location.region}, ${loaded.location.country}`
                current_temp.innerHTML = `${loaded.current.temp_c}&deg;C `
                feelslike.innerHTML = `${loaded.current.feelslike_c}&deg;C`
                icon.src = `${loaded.current.condition.icon}`
                icon_Title = `${loaded.current.condition.text}`
                iconTitle(icon_Title);
                console.log(icon_Title);

                let last_update_epoc = `${loaded.current.last_updated_epoch}`

                let utcSeconds = last_update_epoc;
                let d = new Date (0);
                let utc = d.setUTCSeconds(utcSeconds);
                let date_string = d.toLocaleString(['ban','id']);

                last_update.innerHTML = `${date_string} WIB`

                let sunrise = document.querySelector(".SunriseTime");
                sunrise.innerHTML = `${loaded.forecast.forecastday[0].astro.sunrise}` 
                let sunset = document.querySelector(".SunsetTime");
                // console.log(`${loaded.forecast.forecastday[0].astro.sunrise}`);
                sunset.innerHTML = `${loaded.forecast.forecastday[0].astro.sunset}`
                let moonrise = document.querySelector(".MoonriseTime");
                moonrise.innerHTML = `${loaded.forecast.forecastday[0].astro.moonrise}` 
                let moonset = document.querySelector(".MoonsetTime");
                moonset.innerHTML = `${loaded.forecast.forecastday[0].astro.moonset}`
            })
    }

window.addEventListener('load', (event) => {
    // loadData()
    // let inputKeyword = "Jakarta";
    fetchData()
    console.log('page is fully loaded');
});
let input = document.getElementById("input-keyword");


input.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("button").click();
    }
});