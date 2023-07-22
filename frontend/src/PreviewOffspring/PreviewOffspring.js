import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { ScryConfig } from "./ScryConfig";
import { ScryInfo } from "../Utils/ScryInfo";
import { ScryWorkshop } from "../Utils/ScryWorkshop";
import ToggleSwitch from '../Utils/ToggleSwitch';
import {breeds, rarities, primaryGenes, secondaryGenes, tertiaryGenes, rarityTable} from "../Data/Data.js";
import { generateLink } from './LinkGenerator';

export function PreviewOffspring(){

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
    const[dragon1Calc, setDragon1Calc] = useState();
    const[dragon2Calc, setDragon2Calc] = useState();

    const[age, setAge] = useState("0");
    const[element, setElement] = useState(0);
    const[linkCount, setLinkCount] = useState(4);
    const[links, setLinks] = useState();
    const[showRarityInfo, setShowRarityInfo] = useState(false);
    const[workshopMode, setWorkshopMode] = useState(false);

    useEffect(() => {
        setDragon1Calc(
            {
                breedRarity: rarities[breeds[dragon1Info.breed].rarity],
                breedPercent: rarityTable[breeds[dragon2Info.breed].rarity][breeds[dragon1Info.breed].rarity] * 100,
                primRarity: rarities[primaryGenes[dragon1Info.primGene].rarity],
                primPercent: rarityTable[primaryGenes[dragon2Info.primGene].rarity][primaryGenes[dragon1Info.primGene].rarity] * 100,
                secRarity: rarities[secondaryGenes[dragon1Info.secGene].rarity],
                secPercent: rarityTable[secondaryGenes[dragon2Info.secGene].rarity][secondaryGenes[dragon1Info.secGene].rarity] * 100,
                tertRarity: rarities[tertiaryGenes[dragon1Info.tertGene].rarity],
                tertPercent: rarityTable[tertiaryGenes[dragon2Info.tertGene].rarity][tertiaryGenes[dragon1Info.tertGene].rarity] * 100,
            }
        );

        setDragon2Calc(
            {
                breedRarity: rarities[breeds[dragon2Info.breed].rarity],
                breedPercent: rarityTable[breeds[dragon1Info.breed].rarity][breeds[dragon2Info.breed].rarity] * 100,
                primRarity: rarities[primaryGenes[dragon2Info.primGene].rarity],
                primPercent: rarityTable[primaryGenes[dragon1Info.primGene].rarity][primaryGenes[dragon2Info.primGene].rarity] * 100,
                secRarity: rarities[secondaryGenes[dragon2Info.secGene].rarity],
                secPercent: rarityTable[secondaryGenes[dragon1Info.secGene].rarity][secondaryGenes[dragon2Info.secGene].rarity] * 100,
                tertRarity: rarities[tertiaryGenes[dragon2Info.tertGene].rarity],
                tertPercent: rarityTable[tertiaryGenes[dragon1Info.tertGene].rarity][tertiaryGenes[dragon2Info.tertGene].rarity] * 100,
            }
        );
    }, [dragon1Info, dragon2Info]);

    function generateLinks(){
        if(breeds[dragon1Info.breed].isAncient || breeds[dragon1Info.breed].isAncient){
            if(dragon1Info.breed !== dragon2Info.breed){
                toast.error("Incompatible breeds selected");
                setLinks([]);
                return;
            }
        }

        let linkArray = [];
        for(let i = 0; i < linkCount; i++){
            linkArray.push(generateLink(dragon1Info, dragon2Info, element, age));
        }
        setLinks(linkArray);
        toast.success("Offspring links generated!");      
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
                    { workshopMode ? <ScryWorkshop dragonInfo={dragon1Info} setDragonInfo={setDragon1Info} dragonCalc={dragon1Calc} showRarityInfo={showRarityInfo}/> 
                                    : <ScryInfo dragonInfo={dragon1Info} setDragonInfo={setDragon1Info} dragonCalc={dragon1Calc} showRarityInfo={showRarityInfo}/>}
                    
                    <div className="Scry-body">
                        {links ? links.map((link, index) => <button className="Scry-offspringbutton" onClick={() => openOffspringLink(link)} >Offspring {index + 1}</button>) : ""}
                    </div>

                    { workshopMode ? <ScryWorkshop dragonInfo={dragon2Info} setDragonInfo={setDragon2Info} dragonCalc={dragon2Calc} showRarityInfo={showRarityInfo}/> 
                                   : <ScryInfo dragonInfo={dragon2Info} setDragonInfo={setDragon2Info} dragonCalc={dragon2Calc} showRarityInfo={showRarityInfo}/>}
                </div>
                <div className="Scry-layout Scry-togglearea">
                    <label className='Scry-label'>Show rarity info:  </label>
                    <ToggleSwitch isToggled={showRarityInfo} setIsToggled={setShowRarityInfo}/>
                </div>
                <div className="Scry-layout Scry-togglearea">
                    <label className='Scry-label'>Scry URL mode  </label>
                    <ToggleSwitch isToggled={workshopMode} setIsToggled={setWorkshopMode}/>
                    <label className='Scry-label'>  Workshop mode </label>
                </div>
            </div>
        </div>
    );
}