const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";


const movieCointainer = document.getElementById("movie-container");
const totalTickets = document.getElementById("total-tickets");
const totalPrice = document.getElementById("total-price");
const buyButton = document.getElementById("buy-now");
const seatMap = document.getElementById("seat-map");



const url = window.location.href;
const urlParam = new URLSearchParams(window.location.search);
const movieId = urlParam.get("id");

getSingleMovie(API_URL);

async function getSingleMovie(url) {
    const result = await fetch(url);
    const data = await result.json();
    const singleMovieId = data.results.find((movie) => movie.id === parseInt(movieId));
    showSingleMovie(singleMovieId);
}


function showSingleMovie(movie) {
    const { id, overview, title, release_date, poster_path, vote_average } = movie;

    const singleMovie = document.createElement("div");
    singleMovie.innerHTML = `
        <div class="py-3 sm:max-w-xl sm:mx-auto">
            <div class="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8">
            <div class="h-48 overflow-visible w-1/2">
                <img class="rounded-3xl shadow-lg" src="${IMG_PATH + poster_path}" alt="">
            </div>
            <div class="flex flex-col w-1/2 space-y-4">
                <div class="flex justify-between items-start">
                <h2 class="text-3xl font-bold">${title}</h2>
                <div class="${rateFun(vote_average)} font-bold rounded-xl p-2">${Math.round(vote_average)}</div>
                </div>
                <div>
                <div class="text-lg text-gray-800">${release_date}</div>
                </div>
                <p class=" text-gray-400 max-h-40 overflow-y-hidden">${overview.slice(0, 95)}...</p>
                <div class="flex text-2xl font-bold text-a">$10</div>
            </div>
            </div>
        </div>`

    movieCointainer.appendChild(singleMovie);
}


rateFun = (rating) => {
    if (rating >= 8) {
        return "bg-green-400"
    } else if (rating >= 6) {
        return "bg-yellow-400"
    } else {
        return "bg-red-400"
    }
}

const SingleTicketPrice = 10;
const occupiedSeats = [1, 8, 15, 16, 17, 20, 22, 25, 34, 35, 36, 41, 42];
const selectedSeats = [];

const rows = 5;
const seatsPerRow = 10;

function seatSetting() {
    for(let i = 0; i < rows; i++){
        const rowEl = document.createElement("div");
        rowEl.className = "flex justify-center"

        for(let j = 0; j < seatsPerRow; j++){
            const seatEl = document.createElement("div");
            const seatIndex = i * seatsPerRow + j + 1;
            seatEl.className = ("w-[40px] h-[40px] flex justify-center bg-gray-300 rounded m-[5px]");

            if(occupiedSeats.includes(seatIndex)){
                seatEl.classList.add("occupied"); //not working
            }
            
            seatEl.addEventListener("click", ()=>{seatSelect (seatEl, seatIndex)}); //not working

            rowEl.appendChild(seatEl);
            
        }
        seatMap.appendChild(rowEl);

    }
}

seatSetting();


function seatSelect (seatEl, seatIndex){
    if(!seatEl.classList.includes("occupied")){
        seatEl.classList.add("seat.selected")
    
    if(seatEl.classList.includes("selected")){
        selectedSeats.push(seatIndex);
    }
    } 

}

buyButton.addEventListener("click", () =>{
    if(selectedSeats.length > 0) {
        alert(`you have purchased ${selectedSeats.length} tickets`);
    } else {
        alert("Please select a seat")
    }
})
