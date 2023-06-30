import {rarityTable, breeds, colours, primaryGenes, secondaryGenes, tertiaryGenes} from "../Data/Data.js";

const maxRange = 88;

export function generateLink(dragon1Info, dragon2Info, element, age){
    let elementcorrected = (Number(element) + 1).toString();
    let breed = selectBinaryOutcome(dragon1Info.breed, dragon2Info.breed, rarityTable[breeds[dragon1Info.breed].rarity][breeds[dragon2Info.breed].rarity]);
    let gender = selectBinaryOutcome(0, 1, 0.5);
    let primgene = selectBinaryOutcome(dragon1Info.primGene, dragon2Info.primGene, rarityTable[primaryGenes[dragon1Info.primGene].rarity][primaryGenes[dragon2Info.primGene].rarity]);
    let primcolour = selectColourOutcome(dragon1Info.primColour, dragon2Info.primColour);
    let secgene = selectBinaryOutcome(dragon1Info.secGene, dragon2Info.secGene, rarityTable[secondaryGenes[dragon1Info.secGene].rarity][secondaryGenes[dragon2Info.secGene].rarity]);
    let seccolour = selectColourOutcome(dragon1Info.secColour, dragon2Info.secColour);
    let tertgene = selectBinaryOutcome(dragon1Info.tertGene, dragon2Info.tertGene, rarityTable[tertiaryGenes[dragon1Info.tertGene].rarity][tertiaryGenes[dragon2Info.tertGene].rarity]);
    let tertcolour = selectColourOutcome(dragon1Info.tertColour, dragon2Info.tertColour);
    let eyetype = selectEyeType();
    return `https://www1.flightrising.com/scrying/predict?breed=${breed}&gender=${gender}&age=${age}&bodygene=${primgene}&body=${primcolour}&winggene=${secgene}&wings=${seccolour}&tertgene=${tertgene}&tert=${tertcolour}&element=${elementcorrected}&eyetype=${eyetype}`;
}

function selectBinaryOutcome(option1, option2, option1Chance){
    let result = Math.random();
    if(result > option1Chance)
        return option1;
    else
        return option2;
}

function selectColourOutcome(colour1, colour2){
    var rangeSize = Math.abs(colour1 - colour2);
    var colourSet = []
    if(rangeSize > maxRange){
        //need to go up from the highest one and down from the lowest one
        colourSet = Object.entries(colours).filter( ([key, _]) => key >= Math.max(colour1, colour2) || key <= Math.min(colour1, colour2) );
    }
    else{
        colourSet = Object.entries(colours).filter( ([key, _]) => key <= Math.max(colour1, colour2)
                                                        && key >= Math.min(colour1, colour2) );
    }
    colourSet = colourSet.map(obj => obj[1]);
    return colourSet[Math.floor(Math.random() * colourSet.length)].id;
}

function selectEyeType(){
    let result = Math.random();
    if(result <= 0.458) return 0; //Common
    if(result <= 0.7) return 1; //Uncommon
    if(result <= 0.839) return 2; //Unusual
    if(result <= 0.93) return 3; //Rare
    if(result <= 0.952) return 13; //Bright
    if(result <= 0.973) return 12; //Pastel
    if(result <= 0.984) return 9; //Goat
    if(result <= 0.991) return 4; //Faceted
    if(result <= 0.996) return 6; //Primal
    return 5; //Multigaze
}
