import React, { useState, useEffect } from 'react';
import { ScryInfo } from '../Utils/ScryInfo';
import { RangeViewer } from './RangeViewer';
import { RangeConfig } from './RangeConfig';

import '../CSS/ScryInfo.css';
import '../CSS/SearchUrl.css';

export function SearchUrlGenerator(){

    const [selectedPrimGeneRarities, setSelectedPrimGeneRarities] = useState([]);
    const [selectedSecGeneRarities, setSelectedSecGeneRarities] = useState([]);
    const [selectedTertGeneRarities, setSelectedTertGeneRarities] = useState([]);
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

    const maxColour = 177;

    const[dragonInfo, setDragonInfo] = useState({ 
        breed: 1,
        primGene: 0,
        primColour: 1,
        secGene: 0,
        secColour: 1,
        tertGene: 0,
        tertColour: 1,
    });

    function getColourRange(startcolour, rangeMode, rangeSize){
        switch(rangeMode){
            case '-1':
                return [shiftColours(startcolour, rangeSize * -1), startcolour]
            case '1':
                return [startcolour, shiftColours(startcolour, rangeSize)]
            default:
                return [shiftColours(startcolour, rangeSize* -1), shiftColours(startcolour, rangeSize)];
        }
    }

    function shiftColours(colour, value){
        var result = colour + value;
        if(result > maxColour){
            result = result - maxColour;
        }
        if(result < 1){
            result = result + maxColour;
        }
        return result;
    }

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
    },[primRangeMode, primRangeSize]);

    useEffect(() =>{
        if(!rangeAllColours){
            let [newFirst, newSecond] = getColourRange(dragonInfo.secColour, secRangeMode, secRangeSize);
            setSecFirstColour(newFirst);
            setSecSecondColour(newSecond);
        }
    }, [secRangeMode, secRangeSize])

    useEffect(() =>{
        if(!rangeAllColours){
            let [newFirst, newSecond] = getColourRange(dragonInfo.tertColour, tertRangeMode, tertRangeSize);
            setTertFirstColour(newFirst);
            setTertSecondColour(newSecond);
        }
    }, [tertRangeMode, tertRangeSize])

    return (
        <div>
            <div className='App-title'>
                <h2>PROJECT: SEARCH</h2>
                Hunt down that (nearly) perfect dragon.
            </div>

            <br/>
            <ScryInfo dragonInfo={dragonInfo} setDragonInfo={setDragonInfo} dragonCalc={null} showRarityInfo={false}/>
            <br/>
            <br/>

            <div className="Scry-body">
                <label className='SearchUrl-heading'><b>Auto-generate ranges</b></label>

                <div className='Scry-gene'>
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
            </div>
        </div>
    );
}

//Url generator