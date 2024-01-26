// await ka istemal hamesha kisi async function ke andar hi hota hai. await keyword sirf async function ke andar use hone par kaam karta hai, kyunki yeh async operation ko rok kar intezaar karta hai aur phir uske baad ke code ko execute karta hai.
// Agar aap await ko kisi non-async function ke andar use karte hain, toh JavaScript error dega. Isme woh context missing hota hai jo async function provide karta hai jisse asynchronous operations ko handle kiya ja sake.

// "Promise {<pending>}" ye error tab show krta h jab kisi api se run hone se pahle hi uske baad ki line run ho jati islye to ham await ka use krte h api wala line run hone ke baad hi uske baad wala line wala run ho.

// let API_key="2abcb2733cc43b3e1c977e92ce3a5930";
// let lat;
// let lon;
// let url=`http://api.openweathermap.org/geo/1.0/direct?q=shimla&limit=1&appid=${API_key}`;
let btn = document.querySelector("form");
let API_key = "2abcb2733cc43b3e1c977e92ce3a5930";
btn.addEventListener("submit", (event) => {
    event.preventDefault();
    let lat;
    let lon;
    let city = document.querySelector("input").value;
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_key}`;
    document.querySelector(".show").innerHTML = "loading...";

    let lat_lon = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            lat = await data[0].lat;
            lon = await data[0].lon;
            return { lat, lon };
        }
        catch (error) {
           let txt= document.querySelector(".show").innerHTML = "Enter correct city name";
        }
    }

    lat_lon().then(
        (result) => {
            if (result.error) {
                console.log(error);
            }
            else {
                let wheather_data = async () => {
                    let url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${result.lat}&lon=${result.lon}&appid=${API_key}&units=metric`;
                    try {
                        const response1 = await fetch(url1);
                        const data1 = await response1.json();
                        let show = document.querySelector(".show");
                        show.innerHTML = `<h3>${data1.main.temp}°C</h3>
                    <h3>${city}</h3>
                    <h3>${data1.wind.speed}km/h</h3>
                    <div> <img src="" alt="">
                    <h5>${data1.weather[0].main}</h5></div>`;
                        document.querySelector("input").value = " ";
                        document.querySelector("img").src = `https://openweathermap.org/img/wn/${data1.weather[0].icon}@2x.png`;
                    }
                    catch (error) {

                    }
                }
                wheather_data();
            }
        });
})