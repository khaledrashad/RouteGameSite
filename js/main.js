const gameShow = document.getElementById("gameShow") 

class Game {
    constructor(img, title, desc, genre, platform) {
      this.img = img;
      this.title = title;
      this.desc = desc;
      this.genre = genre;
      this.platform = platform;
    }
  }
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '74c0f2983amshafc965e973513adp16add4jsnc64b84f338df',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
async function gameData(){
    const response = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter',options);
    const result = await response.json();
    return result
}

gameData().then((data)=>{
    console.log(data)
    let gameList = ""
    data.forEach(game => {
        let temp = new Game (game.thumbnail,game.title,game.short_description,game.genre,game.platform)
        let showCard = ` 
        <div class="col-lg-3 col-md-6 col-sm-12" >
            <div class="card text-center">
                <div class="card-body overflow-hidden">
                    <img src="${temp.img}" alt="" class="w-100 rounded-top-2">
                    <div class="gameTitle d-flex justify-content-between my-3">
                        <div id="gameInfo" class="align-self-center">${temp.title}</div>
                        <div class="btn text-white titleBtn">Free</div>
                    </div>
                    <div id="gameDesc">${temp.desc}</div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <div id="gameCat">${temp.genre}</div>
                    <div id="gameConsole">${temp.platform}</div>
                </div>
            </div>                   
        </div>`
        gameList += showCard
    });
    gameShow.innerHTML = gameList
})
