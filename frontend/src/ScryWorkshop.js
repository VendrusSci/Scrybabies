import React, { useState, useEffect } from 'react';
import './CSS/ScryInfo.css';
import { ColourDropdown, GeneDropdown, BreedDropdown } from './Utils/DragonDropdowns';
import { colours, breeds, primaryGenes, secondaryGenes, tertiaryGenes } from "./Data/Data.js";

export function ScryWorkshop(props){

    const [breed, setBreed] = useState(props.dragonInfo.breed);
    const [primColour, setPrimColour] = useState(props.dragonInfo.primColour);
    const [secColour, setSecColour] = useState(props.dragonInfo.secColour);
    const [tertColour, setTertColour] = useState(props.dragonInfo.tertColour);
    const [primGene, setPrimGene] = useState(props.dragonInfo.primGene);
    const [secGene, setSecGene] = useState(props.dragonInfo.secGene);
    const [tertGene, setTertGene] = useState(props.dragonInfo.tertGene);

    let setDragonInfo = props.setDragonInfo;
    let dragonInfo = props.dragonInfo;

    useEffect(() =>{
        if((breeds[dragonInfo.breed].isAncient || breeds[breed].isAncient) && Number(breed) !== Number(dragonInfo.breed))
        {
            setPrimGene(0);
            setSecGene(0);
            setTertGene(0);
        }

        setDragonInfo({
            breed: breed,
            primGene: primGene,
            primColour: primColour,
            secGene: secGene,
            secColour: secColour,
            tertGene: tertGene,
            tertColour: tertColour
        });
    }, [breed, primColour, secColour, tertColour, primGene, secGene, tertGene, setDragonInfo, dragonInfo]);

    return (
        <div className="Workshop-body">
            <div className='Workshop-gene'>
                <label className='Scry-label'>Breed: </label>
                <BreedDropdown breed={breed} setBreed={setBreed} breeds={breeds}/>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.breedRarity}, {props.dragonCalc.breedPercent}%</label> : "" }
            <div className='Workshop-gene'>
                <label className='Scry-label'>Primary Colour: </label>
                <ColourDropdown colour={primColour} setColour={setPrimColour} colours={colours}/>
            </div>
            <div className='Workshop-gene'>
                <label className='Scry-label'>Primary Gene: </label>
                <GeneDropdown gene={primGene} setGene={setPrimGene} genes={primaryGenes} breed={breed}/>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.primRarity}, {props.dragonCalc.primPercent}%</label> : "" }
            <div className='Workshop-gene'>
                <label className='Scry-label'>Secondary Colour: </label>
                <ColourDropdown colour={secColour} setColour={setSecColour} colours={colours}/>
            </div>
            <div className='Workshop-gene'>
                <label className='Scry-label'>Secondary Gene: </label>
                <GeneDropdown gene={secGene} setGene={setSecGene} genes={secondaryGenes} breed={breed}/>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.secRarity}, {props.dragonCalc.secPercent}%</label> : "" }
            <div className='Workshop-gene'>
                <label className='Scry-label'>Tertiary Colour: </label>
                <ColourDropdown colour={tertColour} setColour={setTertColour} colours={colours}/>
            </div>
            <div className='Workshop-gene'>
                <label className='Scry-label'>Tertiary Gene: </label>
                <GeneDropdown gene={tertGene} setGene={setTertGene} genes={tertiaryGenes} breed={breed}/>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.tertRarity}, {props.dragonCalc.tertPercent}%</label> : "" }
        </div>
    )
}