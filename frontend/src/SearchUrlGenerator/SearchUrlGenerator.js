import React, { useState, useEffect } from 'react';
import { ScryInfo } from '../Utils/ScryInfo';
import { ColourDropdown } from '../Utils/DragonDropdowns';
import { colours } from '../Data/Data';
import NumericInput from 'react-numeric-input';
import '../CSS/ScryInfo.css';

export function SearchUrlGenerator(){

    const [rangeSize, setRangeSize] = useState(0);
    const [rangeOffset, setRangeOffset] = useState(0);
    const [selectedPrimGeneRarities, setSelectedPrimGeneRarities] = useState([]);
    const [selectedSecGeneRarities, setSelectedSecGeneRarities] = useState([]);
    const [selectedTertGeneRarities, setSelectedTertGeneRarities] = useState([]);
    const [rangeAllColours, setRangeAllColours] = useState(true);
    const [primaryRange, setPrimaryRange] = useState(0);
    const [secondaryRange, setSecondaryRange] = useState(0);
    const [tertiaryRange, setTertiaryRange] = useState(0);

    const[dragonInfo, setDragonInfo] = useState({ 
        breed: 1,
        primGene: 0,
        primColour: 1,
        secGene: 0,
        secColour: 1,
        tertGene: 0,
        tertColour: 1,
    });

    const[searchOptions, setSearchOptions] = useState({ 
        primFirstColour: 1,
        primSecondColour: 1,
        secFirstColour: 1,
        secSecondColour: 1,
        tertFirstColour: 1,
        tertSecondColour: 1
    });

    function updateRangeConfig(e){
        setRangeAllColours(e.target.checked);
    }

    function updateRangeSize(value){
        const re = /^[0-9\b]+$/;
        if (re.test(value)) {
            setRangeSize(value)
        }
        if(value === ""){
            setRangeSize('');
        } 
    }

    function updateOptions(option, value){
        let options = searchOptions;
        switch(option){
            case "primFirstColour":
                options.primFirstColour = value;
                setSearchOptions(options);
                break;
            default:
                return;
        }
    }

    useEffect(() =>{

    });

    return (
        <div>
            <div className='App-title'>
                <h2>PROJECT: SEARCH</h2>
                Hunt down that (nearly) perfect dragon.
            </div>
            <br/>
            <ScryInfo dragonInfo={dragonInfo} setDragonInfo={setDragonInfo} dragonCalc={null} showRarityInfo={false}/>
            
            <br/>

            <div className="Scry-body">
                <label className='Scry-label'><b>Auto-generate ranges</b></label>
                <div className='Scry-gene'>
                    <label className='Scry-label'>Range size</label>
                    <NumericInput max={10} min={0} step={1} value={rangeSize} onChange={setRangeSize}/>
                </div>
                <div className='Scry-gene'>
                    <label className='Scry-label'>Apply to all colours</label>
                    <input type='checkbox' checked={rangeAllColours} onChange={updateRangeConfig}/>
                </div>
                <div className={rangeAllColours ? 'Scry-configpart' : 'Scry-gene'}>
                    <select value={primaryRange} onChange={(e)=>{setPrimaryRange(e.target.value)}}>
                        <option value={-1}>Before colour</option>
                        <option value={0}>Both sides</option>
                        <option value={1}>After colour</option>
                    </select>
                    {!rangeAllColours ?
                        <>
                            <select  value={secondaryRange} onChange={(e)=>{setSecondaryRange(e.target.value)}}>
                                <option value={-1}>Before colour</option>
                                <option value={0}>Both sides</option>
                                <option value={1}>After colour</option>
                            </select>
                            <select value={tertiaryRange} onChange={(e)=>{setTertiaryRange(e.target.value)}}>
                                <option value={-1}>Before colour</option>
                                <option value={0}>Split around colour</option>
                                <option value={1}>After colour</option>
                            </select>
                        </> : null
                    }
                </div>
                <div className='Scry-gene'>
                    <label className='Scry-label'>First colour</label>
                    <ColourDropdown colour={searchOptions.primFirstColour} setColour={(e => {updateOptions("primFirstColour", e.target.value)})} colours={colours}/>
                </div>
            </div>
        </div>
    );
}

//Range options
//Tweaking options
//Url generator