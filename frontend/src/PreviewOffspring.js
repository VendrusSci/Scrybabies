import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ScryConfig } from "./ScryConfig";
import { ScryInfo } from "./ScryInfo";
import {rarityTable, breeds, colours, primaryGenes, secondaryGenes, tertiaryGenes} from "./Data/Data.js";

export function PreviewOffsping(){

    const[dragon1Info, setDragon1Info] = useState({ 
        breed: 1,
        primGene: 0,
        primColour: 1,
        secGene: 0,
        secColour: 1,
        tertGene: 0,
        tertColour: 1,
    });
    const[dragon2Info, setDragon2Info] = useState({ 
        breed: 1,
        primGene: 0,
        primColour: 1,
        secGene: 0,
        secColour: 1,
        tertGene: 0,
        tertColour: 1,
    });
    const[age, setAge] = useState("0");
    const[element, setElement] = useState(0);
    const[linkCount, setLinkCount] = useState(4);
    const[links, setLinks] = useState();

    const maxRange = 88;

    function generateLinks(){
        if(breeds[dragon1Info.breed].isAncient || breeds[dragon1Info.breed].isAncient){
            if(dragon1Info.breed !== dragon2Info.breed){
                toast.error("Incompatible ancient breeds selected");
                setLinks([]);
                return;
            }
        }

        let linkArray = [];
        for(let i = 0; i < linkCount; i++){
            linkArray.push(generateLink());
        }
        setLinks(linkArray);
        toast.success("Offspring links generated!");      
    }

    function generateLink(){
        let elementcorrected = (Number(element) + 1).toString();
        let breed = selectBinaryOutcome(dragon1Info.breed, dragon2Info.breed, rarityTable[breeds[dragon1Info.breed].rarity][breeds[dragon2Info.breed].rarity]);
        let gender = selectBinaryOutcome(0, 1, 0.5);
        let primgene = selectBinaryOutcome(dragon1Info.primGene, dragon2Info.primGene, rarityTable[primaryGenes[dragon1Info.primGene].rarity][primaryGenes[dragon2Info.primGene].rarity]);
        let primcolour = selectColourOutcome(dragon1Info.primColour, dragon2Info.primColour);
        let secgene = selectBinaryOutcome(dragon1Info.secGene, dragon2Info.secGene, rarityTable[secondaryGenes[dragon1Info.secGene].rarity][secondaryGenes[dragon2Info.secGene].rarity]);
        let seccolour = selectColourOutcome(dragon1Info.secColour, dragon2Info.secColour);
        let tertgene = selectBinaryOutcome(dragon1Info.tertGene, dragon2Info.tertGene, rarityTable[tertiaryGenes[dragon1Info.tertGene].rarity][tertiaryGenes[dragon2Info.tertGene].rarity]);
        let tertcolour = selectColourOutcome(dragon1Info.tertColour, dragon2Info.tertColour);
        return `https://www1.flightrising.com/scrying/predict?breed=${breed}&gender=${gender}&age=${age}&bodygene=${primgene}&body=${primcolour}&winggene=${secgene}&wings=${seccolour}&tertgene=${tertgene}&tert=${tertcolour}&element=${elementcorrected}`;
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

    function openOffspringLink(url){
        window.open(url, '_blank').focus();
    }

    return(
        <div>
            <div className='App-title'>
                <h2>SCRYBABIES</h2>
                See the kids your dreams could have.
            </div>
            <br/>
            <div className='App-body'>
                <ScryConfig age={age} setAge={setAge} element={element} setElement={setElement} linkCount={linkCount} setLinkCount={setLinkCount}/>
                <button className='Scry-generatebutton' onClick={generateLinks}>Generate!</button>
                <div className="Scry-layout">
                    <ScryInfo dragonInfo={dragon1Info} setDragonInfo={setDragon1Info}/>
                    <div className="Scry-body">
                        {links ? links.map((link, index) => <button className="Scry-offspringbutton" onClick={() => openOffspringLink(link)} >Offspring {index + 1}</button>) : ""}
                    </div>
                    <ScryInfo dragonInfo={dragon2Info} setDragonInfo={setDragon2Info}/>
                </div>
            </div>
        </div>
    );
}