const gameShow = document.getElementById("gameShow")
const navBtns = document.getElementById("navBtns")
const modalBtn = document.getElementById("modalBtn")
const gamesDiv = document.getElementById("gamesDiv")
const gameModal = document.getElementById("gameModal")
let genre = "mmorpg"

class Game {
    constructor(img, title, desc, genre, platform,id) {
        this.img = img;
        this.title = title;
        this.desc = desc;
        this.genre = genre;
        this.platform = platform;
        this.id = id
    }
}
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '74c0f2983amshafc965e973513adp16add4jsnc64b84f338df',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};
async function gameData() {
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${genre}`, options);
    const result = await response.json();
    return result
}

function showModal(){
    gamesDiv.classList.add("d-none")
    gameModal.classList.add("d-block")
}

function closeModal(){
    gamesDiv.classList.remove("d-none")
    gameModal.classList.remove("d-block")
}

function renderGames() {
    gameData().then((data) => {
        console.log(data)
        let gameList = ""
        data.forEach(game => {
            let cardInfo = new Game(game.thumbnail, game.title, game.short_description, game.genre, game.platform, game.id)
            let showCard = ` 
            <div class="col-lg-3 col-md-6 col-sm-12" >
                <div class="card text-center">
                    <div class="card-body overflow-hidden" id=${cardInfo.id} onclick="showModal()">
                        <img src="${cardInfo.img}" alt="" class="w-100 rounded-top-2">
                        <div class="gameTitle d-flex justify-content-between my-3">
                            <div id="gameInfo" class="align-self-center">${cardInfo.title}</div>
                            <div class="btn text-white titleBtn">Free</div>
                        </div>
                        <div id="gameDesc">${cardInfo.desc}</div>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <div id="gameCat">${cardInfo.genre}</div>
                        <div id="gameConsole">${cardInfo.platform}</div>
                    </div>
                </div>                   
            </div>`
            gameList += showCard
        });
        gameShow.innerHTML = gameList
    })
}

renderGames()



navBtns.addEventListener("click", function (e) {
    e.preventDefault()
    genre = e.target.getAttribute("id")
    renderGames()
})