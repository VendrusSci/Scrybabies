import React, { useState, useEffect } from 'react';
import { ScryInfo } from '../Utils/ScryInfo';
import { ScryWorkshop } from '../Utils/ScryWorkshop';
import { RangeViewer } from './RangeViewer';
import { RangeConfig } from './RangeConfig';
import ToggleSwitch from '../Utils/ToggleSwitch.js';

import '../CSS/ScryInfo.css';
import '../CSS/SearchUrl.css';
import { SearchUrls } from './SearchUrls';
import { SearchExtras } from './SearchExtras';
import { SearchSpecial } from './SearchSpecial';

export function SearchUrlGenerator(){

    const [rangeAllColours, setRangeAllColours] = useState(true);
    const [primRangeMode, setPrimRangeMode] = useState('0');
    const [secRangeMode, setSecRangeMode] = useState('0');
    const [tertRangeMode, setTertRangeMode] = useState('0');
    const [primRangeSize, setPrimRangeSize] = useState(0);
    const [secRangeSize, setSecRangeSize] = useState(0);
    const [tertRangeSize, setTertRangeSize] = useState(0);

    const [primFirstColour, setPrimFirstColour] = useState(1);
    const [primSecondColour, setPrimSecondColour] = useState(1);
    const [secFirstColour, setSecFirstColour] = useState(1);
    const [secSecondColour, setSecSecondColour] = useState(1);
    const [tertFirstColour, setTertFirstColour] = useState(1);
    const [tertSecondColour, setTertSecondColour] = useState(1);

    const [primaryOptions, setPrimaryOptions] = useState(new Array(5).fill(false));
    const [secondaryOptions, setSecondaryOptions] = useState(new Array(5).fill(false));
    const [tertiaryOptions, setTertiaryOptions] = useState(new Array(5).fill(false));
    const [breedOptions, setBreedOptions] = useState(new Array(6).fill(false));

    const[showGeneOptions, setShowGeneOptions] = useState(false);
    const[showBreedOptions, setShowBreedOptions] = useState(false);

    const [gender, setGender] = useState(-1);
    const [rtbStatus, setRtbStatus] = useState(-1);
    const [isSameBreed, setIsSameBreed] = useState(false);

    const [isG1, setIsG1] = useState(false);
    const [eyeTypes, setEyeTypes] = useState(new Array(20).fill(false));
    const [digits, setDigits] = useState(new Array(7).fill(false));
    const [elements, setElements] = useState(new Array(11).fill(false));
    const [patterns, setPatterns] = useState(new Array(5).fill(false));

    const [workshopMode, setWorkshopMode] = useState(false);
    const [showSpecial, setShowSpecial] = useState(false);

    let dragonCalc = {};

    const[dragonInfo, setDragonInfo] = useState({ 
        breed: 1,
        primGene: 0,
        primColour: 1,
        secGene: 0,
        secColour: 1,
        tertGene: 0,
        tertColour: 1,
    });

    useEffect(() =>{
        let [newFirst, newSecond] = getColourRange(dragonInfo.primColour, primRangeMode, primRangeSize);
        setPrimFirstColour(newFirst);
        setPrimSecondColour(newSecond);

        if(rangeAllColours){
            [newFirst, newSecond] = getColourRange(dragonInfo.secColour, primRangeMode, primRangeSize);
            setSecFirstColour(newFirst);
            setSecSecondColour(newSecond);

            [newFirst, newSecond] = getColourRange(dragonInfo.tertColour, primRangeMode, primRangeSize);
            setTertFirstColour(newFirst);
            setTertSecondColour(newSecond);
        }
    },[primRangeMode, primRangeSize, rangeAllColours, dragonInfo]);

    useEffect(() =>{
        if(!rangeAllColours){
            let [newFirst, newSecond] = getColourRange(dragonInfo.secColour, secRangeMode, secRangeSize);
            setSecFirstColour(newFirst);
            setSecSecondColour(newSecond);
        }
    }, [secRangeMode, secRangeSize, rangeAllColours, dragonInfo])

    useEffect(() =>{
        if(!rangeAllColours){
            let [newFirst, newSecond] = getColourRange(dragonInfo.tertColour, tertRangeMode, tertRangeSize);
            setTertFirstColour(newFirst);
            setTertSecondColour(newSecond);
        }
    }, [tertRangeMode, tertRangeSize, rangeAllColours, dragonInfo])

    return (
        <div>
            <div className='App-title'>
                <h2>PROJECT: SEARCH</h2>
                Hunt down that (nearly) perfect dragon.
            </div>

            <div className="Scry-body">
                <label className='SearchUrl-heading'><b>Enter desired dragon</b></label>

                { workshopMode ? <ScryWorkshop dragonInfo={dragonInfo} setDragonInfo={setDragonInfo} dragonCalc={dragonCalc} showRarityInfo={false}/> 
                                    : <ScryInfo dragonInfo={dragonInfo} setDragonInfo={setDragonInfo} dragonCalc={dragonCalc} showRarityInfo={false}/>}
                
                <div className="Scry-layout Scry-togglearea">
                    <label className='Scry-label'>Scry URL mode  </label>
                    <ToggleSwitch isToggled={workshopMode} setIsToggled={setWorkshopMode}/>
                    <label className='Scry-label'>  Workshop mode </label>
                </div>

                <label className='SearchUrl-heading'><b>Generate ranges</b></label>
                <div className='SearchUrl-labelInput'>
                    <label className='Scry-label'>Apply to all colours</label>
                    <input type='checkbox' checked={rangeAllColours} onChange={(e) => setRangeAllColours(e.target.checked)}/>
                </div>
                <div className='SearchUrl-rangeConfigArea'>
                    <RangeConfig rangeSize={primRangeSize} setRangeSize={setPrimRangeSize} rangeOffset={primRangeMode} setRangeOffset={setPrimRangeMode} />
                    {!rangeAllColours ?
                        <>
                            <RangeConfig rangeSize={secRangeSize} setRangeSize={setSecRangeSize} rangeOffset={secRangeMode} setRangeOffset={setSecRangeMode}/>
                            <RangeConfig rangeSize={tertRangeSize} setRangeSize={setTertRangeSize} rangeOffset={tertRangeMode} setRangeOffset={setTertRangeMode}/>
                        </> : null
                    }
                </div>
                <div className='SearchUrl-rangeConfigArea'>
                    <RangeViewer firstColour={primFirstColour} secondColour={primSecondColour} setFirst={setPrimFirstColour} setSecond={setPrimSecondColour}/>
                    <RangeViewer firstColour={secFirstColour} secondColour={secSecondColour} setFirst={setSecFirstColour} setSecond={setSecSecondColour}/>
                    <RangeViewer firstColour={tertFirstColour} secondColour={tertSecondColour} setFirst={setTertFirstColour} setSecond={setTertSecondColour}/>
                </div>
                <br/>
                <SearchExtras gender={gender} setGender={setGender} rtbStatus={rtbStatus} setRtbStatus={setRtbStatus}
                                isSameBreed={isSameBreed} setIsSameBreed={setIsSameBreed} breed={dragonInfo.breed}
                                breedOptions={breedOptions} setBreedOptions={setBreedOptions} primaryOptions={primaryOptions} setPrimaryOptions={setPrimaryOptions}
                                secondaryOptions={secondaryOptions} setSecondaryOptions={setSecondaryOptions} tertiaryOptions={tertiaryOptions} setTertiaryOptions={setTertiaryOptions}
                                showBreedOptions={showBreedOptions} setShowBreedOptions={setShowBreedOptions} showGeneOptions={showGeneOptions} setShowGeneOptions={setShowGeneOptions}/>
                
                <div className="Scry-layout Scry-togglearea">
                    <label className='Scry-label'>Show extra filters  </label>
                    <ToggleSwitch isToggled={showSpecial} setIsToggled={setShowSpecial}/>
                </div>
                {showSpecial ? 
                    <SearchSpecial isG1={isG1} setIsG1={setIsG1} eyeTypes={eyeTypes} setEyeTypes={setEyeTypes} patterns={patterns} setPatterns={setPatterns}
                                    elements={elements} setElements={setElements} digits={digits} setDigits={setDigits}/> 
                    : ""
                }
                
                <label className='SearchUrl-heading'><b>Open FR Searches</b></label>

                <SearchUrls primFirstColour={primFirstColour} primSecondColour={primSecondColour} secFirstColour={secFirstColour} secSecondColour={secSecondColour} 
                            tertFirstColour={tertFirstColour} tertSecondColour={tertSecondColour} breedOptions={breedOptions} showBreedOptions={showBreedOptions}
                            primaryOptions={primaryOptions} secondaryOptions={secondaryOptions} tertiaryOptions={tertiaryOptions} showGeneOptions={showGeneOptions}
                            gender={gender} rtbStatus={rtbStatus} breed={dragonInfo.breed} isSameBreed={isSameBreed}
                            isG1={isG1} eyeTypes={eyeTypes} digits={digits} elements={elements} patterns={patterns}/>
            </div>
        </div>
    );
}

function getColourRange(startcolour, rangeMode, rangeSize){
    startcolour = parseInt(startcolour);
    switch(rangeMode){
        case '-1':
            return [shiftColours(startcolour, rangeSize * -1), startcolour]
        case '1':
            return [startcolour, shiftColours(startcolour, rangeSize)]
        default:
            return [shiftColours(startcolour, rangeSize * -1), shiftColours(startcolour, rangeSize)];
    }
}

function shiftColours(colour, value){
    const maxColour = 177;
    var result = colour + value;
    if(result > maxColour){
        result = result - maxColour;
    }
    if(result < 1){
        result = result + maxColour;
    }
    return result;
}
