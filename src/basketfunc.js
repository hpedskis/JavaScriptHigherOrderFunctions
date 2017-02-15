// basketfunc.js
const file = require('fs');

class gameObj{

    constructor(data, gameID, gameDate){
        const gameCity = data.tc;
        //console.log(gameCity);
        const teamName = data.tn;
        const playerInfo = data.pstsg; //array of players

        this.gameID = gameID;
        this.gameDate = gameDate;
        this.gameCity = gameCity.toString();
        this.teamName = teamName.toString();
        const arr = [];
        for(let x in playerInfo){
            arr.push(playerInfo[x]);
        }
        this.playerInfo = arr;

    }
}

file.readFile('../tests/0021600681_gamedetail.json','utf8', function(err, data){
    if (err){
        throw err;
    }
    else{
        const obj = JSON.parse(data);
        //console.log(obj.g.hls);
        //console.log(obj.g);
        const gameID = obj.g.nextgid;
        const gameDate = obj.g.gdte;

        const gameOne = new gameObj(obj.g.hls, gameID, gameDate);
        const gameTwo = new gameObj(obj.g.vls, gameID, gameDate);

       formatOutput(gameOne, gameTwo);
    }
});

function formatOutput(game, game2){
    let result = "";
    result = result.concat("Game ID: " + game.gameID + " " + game.gameDate);
    result = result.concat("\n=====\n");
    const score1 = finalScore(game);
    const score2 = finalScore(game2);
    result = result.concat(game.gameCity + " " + game.teamName + " - " + score1 +"\n");
    result = result.concat(game2.gameCity + " " + game2.teamName + " - " + score2 +"\n");
    result = result.concat(rebounds(game, game2)+"\n");
    result = result.concat(threePointPercentage(game, game2)+"\n");
    result = result.concat(blocks(game, game2)+"\n");
    result = result.concat(turnovers(game, game2)+"\n");
    console.log(result.toString());
}
function finalScore(game){
    //team_city team_name - total_score
    const playerInfo = game.playerInfo;

    const fieldGoals = [];
    const freeThrows = [];
    const threePointers = [];

    playerInfo.forEach((ele) => {
            fieldGoals.push(ele.fgm);

    });
    playerInfo.forEach((ele) => {
        freeThrows.push(ele.ftm);

    });
    playerInfo.forEach((ele) => {
        threePointers.push(ele.tpm);

    });
    //console.log(fieldGoals);
    const totalField = fieldGoals.reduce(function(acc, val) {
        return acc + val;
    }, 0);

    const totalFreeThrows = freeThrows.reduce(function(acc, val) {
        return acc + val;
    }, 0);
    const totalThreePointers = threePointers.reduce(function(acc, val) {
        return acc + val;
    }, 0);
    const twoPointers = totalField - totalThreePointers; //36
    let total =((totalField-twoPointers) * 3);
    total+= twoPointers *2;
    total+= totalFreeThrows;
    return total;


}

function rebounds(game1, game2){
    //* Most rebounds:Jae Crowder with 10
    const playerInfo = game1.playerInfo;
    const playerInfo2 = game2.playerInfo;

    let res = "";
    let mostRebounds = 0;
    let playerWithMost = "";
    playerInfo.forEach((ele) =>{
        if(parseInt(ele.oreb + ele.dreb) > mostRebounds){
            mostRebounds = (ele.oreb + ele.dreb);
            playerWithMost = (ele.fn + " " + ele.ln);
        }
    });
    playerInfo2.forEach((ele) =>{
        if(parseInt(ele.oreb + ele.dreb) > mostRebounds){
            mostRebounds = (ele.oreb + ele.dreb);
            playerWithMost = (ele.fn + " " + ele.ln);
        }
    });
    res = res.concat("* Most rebounds: " + playerWithMost + " with " + mostRebounds);
    return res;

}

function threePointPercentage(game, game2){
    //* Player with highest 3 point percentage: first_name, last_name at percentage (made/attempted)
    const playerInfo = game.playerInfo;
    const playerInfo2 = game2.playerInfo;

    const qualifyingTeam1 = playerInfo.filter((ele) => {
        if(parseInt(ele.fga) > 5 ){
            return ele;
        }
    });
    const qualifyingTeam2 = playerInfo2.filter((ele) => {
        if(parseInt(ele.fga) > 5 ){
            return ele;
        }

    });
    let res = "";
    let highestPercent = 0.0;
    let playerWith = "";

    qualifyingTeam1.forEach((ele) =>{
        const curr = (Math.floor(parseInt(ele.tpm / ele.tpa) * 100));
        //console.log(curr);
        if(curr > highestPercent){
            highestPercent = curr;
            playerWith = (ele.fn + " " + ele.ln);
        }
    });
    qualifyingTeam2.forEach((ele) =>{
        const curr = (Math.floor(parseInt(ele.tpm / ele.tpa) * 100));
        if(curr > highestPercent){
            highestPercent = curr;
            playerWith = (ele.fn + " " + ele.ln);
        }
    });
    res = res.concat("* Player with highest 3 point percentage: " + playerWith + " at percentage %" + highestPercent);
    return res;



}

function blocks(game1, game2){
    //* There were total_number_of_players_with_min_blocks players that had at least one block
    //go through each player and find blocks
    //* team_name players with more turnovers than assists:
    const playerInfo = game1.playerInfo;
    const playerInfo2 = game2.playerInfo;
    let playersWhoHadBlocks = 0;
    playerInfo.forEach((ele) =>{
            if (parseInt(ele.blk) > 0){
                playersWhoHadBlocks++;
            }
        }
    );
    playerInfo2.forEach((ele) =>{
            if (parseInt(ele.blk) > 0){

                playersWhoHadBlocks++;
            }
        }
    );

   return ("* There were " + playersWhoHadBlocks + " that made at least one block");

}

function turnovers(game1, game2){
    const playerInfo = game1.playerInfo;
    const playerInfo2 = game2.playerInfo;

    let res = "*  Players with more turnovers than assists: \n";
    res = res.concat(game1.gameCity + " " + game1.teamName + "\n");
    playerInfo.forEach((ele) =>{
        if(ele.tov > ele.ast){
           res= res.concat("* " + ele.fn + " " + ele.ln + "has an assist to turnover ratio of " + ele.ast + ":" + ele.tov + "\n");
        }
    });
    res =res.concat(game2.gameCity + " " + game2.teamName + "\n");
    playerInfo2.forEach((ele) =>{
        if(ele.tov > ele.ast){
            res =res.concat("* " + ele.fn + " " + ele.ln + "has an assist to turnover ratio of " + ele.ast + ":" + ele.tov + "\n");
        }
    });
    return res;




}