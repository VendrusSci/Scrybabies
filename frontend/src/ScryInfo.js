import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {Tooltip} from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import './CSS/ScryInfo.css';
import { colours, breeds, primaryGenes, secondaryGenes, tertiaryGenes } from "./Data/Data.js";

export function ScryInfo(props){
    
    const [url, setUrl] = useState("");
    let setDragonInfo = props.setDragonInfo;

    useEffect(() => {
        if(url){
            try{
                let scryUrl = new URL(url);
                let params = new URLSearchParams(scryUrl.search);

                let primColour = Object.entries(colours).find(([_, value]) => value.id === Number(params.get("body")));
                let secColour = Object.entries(colours).find(([_, value]) => value.id === Number(params.get("wings")));
                let tertColour = Object.entries(colours).find(([_, value]) => value.id === Number(params.get("tert")));

                setDragonInfo({ 
                    breed: params.get("breed"),
                    primGene: params.get("bodygene"),
                    primColour: primColour[0],
                    secGene: params.get("winggene"),
                    secColour: secColour[0],
                    tertGene: params.get("tertgene"),
                    tertColour: tertColour[0],
                });
            }
            catch{
                toast.error("Bad scry url, resetting to defaults");
                setUrl("");
                setDragonInfo({ 
                    breed: 1,
                    primGene: 0,
                    primColour: 1,
                    secGene: 0,
                    secColour: 1,
                    tertGene: 0,
                    tertColour: 1,
                });
            }
        }
    }, [url, setDragonInfo]);

    function onScryUrlChange(e){
        if(e.target.value)
            setUrl(e.target.value);
        else
            props.setDragonInfo({ 
                breed: 1,
                primGene: 0,
                primColour: 1,
                secGene: 0,
                secColour: 1,
                tertGene: 0,
                tertColour: 1,
            });
    }
    return (
        <div className="Scry-body">
            <div className='Scry-gene Scry-padbottom10'>
                <label className='Scry-label'>Scry URL: </label>
                <input className='' value={url} onChange={onScryUrlChange} type="text"/>
                <FontAwesomeIcon data-tooltip-id="scry" data-tooltip-html="<p>The url from the link widget in the scrying workshop</p><image src='https://i.imgur.com/YbNBezj.png'/>" 
                    icon={faCircleQuestion}/>
            </div>
            <div className='Scry-gene'>
                <label className='Scry-label'>Breed: </label>
                <label>{breeds[props.dragonInfo.breed].name}</label>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.breedRarity}, {props.dragonCalc.breedPercent}%</label> : "" }
            <div className='Scry-gene'>
                <label className='Scry-label'>Primary: </label>
                <label>{colours[props.dragonInfo.primColour].name} {primaryGenes[props.dragonInfo.primGene].name}</label>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.primRarity}, {props.dragonCalc.primPercent}%</label> : "" }
            <div className='Scry-gene'>
                <label className='Scry-label'>Secondary: </label>
                <label>{colours[props.dragonInfo.secColour].name} {secondaryGenes[props.dragonInfo.secGene].name}</label>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.secRarity}, {props.dragonCalc.secPercent}%</label> : "" }
            <div className='Scry-gene'>
                <label className='Scry-label'>Tertiary: </label>
                <label>{colours[props.dragonInfo.tertColour].name} {tertiaryGenes[props.dragonInfo.tertGene].name}</label>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.tertRarity}, {props.dragonCalc.tertPercent}%</label> : "" }
            <Tooltip id="scry" />
        </div>
    );
}