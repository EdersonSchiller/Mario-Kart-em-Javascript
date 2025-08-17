const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
}

//rolar o dado
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

//função para gerar um bloco aleatório
async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";        
    }
    return result;    
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`🏃 ${characterName} 🎲 rolou um dado ${block} e tirou ${diceResult} pontos + ${attribute} = ${diceResult + attribute}`);
}

// Função para sortear penalidade no confronto
function getPenalty() {
    let random = Math.random();
    if(random < 0.5) {
        return { tipo: "CASCO", valor: -1 }; // -1 ponto
    } else {
        return { tipo: "BOMBA", valor: -2 }; // -2 pontos
    }
}

// Função assíncrona que recebe dois personagens como parâmetros
async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 RODADA ${round}`);

        let block = await getRandomBlock();
        console.log(`🚗 ${block}`);

        //rolar dado
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let TotalTestSkill1 = 0;
        let TotalTestSkill2 = 0;

        if(block === "RETA"){
            TotalTestSkill1 =  diceResult1 + character1.VELOCIDADE;
            TotalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "VELOCIDADE", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "VELOCIDADE", diceResult2, character2.VELOCIDADE);
        }

        if(block === "CURVA"){  
            TotalTestSkill1 =  diceResult1 + character1.MANOBRABILIDADE;
            TotalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "MANOBRABILIDADE", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "MANOBRABILIDADE", diceResult2, character2.MANOBRABILIDADE);
        }

        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            
            console.log(`⚔️ ${character1.NOME} confrontou com ${character2.NOME} ⚔️`);

            await logRollResult(character1.NOME, "PODER", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "PODER", diceResult2, character2.PODER);

            if (powerResult1 > powerResult2) {
                let penalty = getPenalty();
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} levou um ${penalty.tipo} (${penalty.valor} ponto) 💥`);
                character2.PONTOS += penalty.valor;

                // Chance de turbo para o vencedor
                if (Math.random() < 0.5) {
                    character1.PONTOS += 1;
                    console.log(`${character1.NOME} ganhou um TURBO! (+1 ponto) 🚀`);
                }

            } else if (powerResult2 > powerResult1) {
                let penalty = getPenalty();
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} levou um ${penalty.tipo} (${penalty.valor} ponto) 💥`);
                character1.PONTOS += penalty.valor;

                // Chance de turbo para o vencedor
                if (Math.random() < 0.5) {
                    character2.PONTOS += 1;
                    console.log(`${character2.NOME} ganhou um TURBO! (+1 ponto) 🚀`);
                }

            } else {
                console.log(`Empate! Nenhum ponto foi marcado ou perdido.`);
            }
        }

        if (TotalTestSkill1 > TotalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto' ${round}`);
            character1.PONTOS++;
        } else if (TotalTestSkill2 > TotalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto' ${round}`);
            character2.PONTOS++;
        } 

        console.log(`___________________________________________________________________________`);
    }
}  

async function declareWinner(character1, character2) {
    console.log('Resuldo final do jogo!!! 🥁🥁🥁')
    console.log(`${character1.NOME} tem ${character1.PONTOS} ponto (s)`)
    console.log(`${character2.NOME} tem ${character2.PONTOS} ponto (s)`)

    if (character1.PONTOS > character2.PONTOS) 
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`)
    else if (character2.PONTOS > character1.PONTOS) 
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`)
    else 
        console.log(`Empate! Nenhum jogador venceu o jogo! 😒😒😒😒`)    
}

//função auto invocavel
(async function main() {
    console.log (`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
