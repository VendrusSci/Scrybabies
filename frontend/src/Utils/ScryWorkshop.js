import '../CSS/ScryInfo.css';
import { ColourDropdown, GeneDropdown, BreedDropdown } from './DragonDropdowns';
import { colours, breeds, primaryGenes, secondaryGenes, tertiaryGenes } from "../Data/Data.js";

export function ScryWorkshop(props){

    let setDragonInfo = props.setDragonInfo;
    let dragonInfo = props.dragonInfo;

    function updateDragonInfo(updates) {
        let updatedDragonInfo = {
            ...dragonInfo,
            ...updates,
        };

        if((breeds[updatedDragonInfo.breed].isAncient || breeds[dragonInfo.breed].isAncient)
            && Number(updatedDragonInfo.breed) !== Number(dragonInfo.breed))
        {
            updatedDragonInfo.primGene = 0;
            updatedDragonInfo.secGene = 0;
            updatedDragonInfo.tertGene = 0;
        }

        setDragonInfo(updatedDragonInfo);
    }

    return (
        <div className="Workshop-body">
            <div className='Workshop-gene'>
                <label className='Scry-label'>Breed: </label>
                <BreedDropdown breed={dragonInfo.breed} setBreed={breed => updateDragonInfo({breed})} breeds={breeds}/>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.breedRarity}, {props.dragonCalc.breedPercent}%</label> : "" }
            <div className='Workshop-gene'>
                <label className='Scry-label'>Primary Colour: </label>
                <ColourDropdown colour={dragonInfo.primColour} setColour={primColour => updateDragonInfo({primColour})} colours={colours}/>
            </div>
            <div className='Workshop-gene'>
                <label className='Scry-label'>Primary Gene: </label>
                <GeneDropdown gene={dragonInfo.primGene} setGene={primGene => updateDragonInfo({primGene})} genes={primaryGenes} breed={dragonInfo.breed}/>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.primRarity}, {props.dragonCalc.primPercent}%</label> : "" }
            <div className='Workshop-gene'>
                <label className='Scry-label'>Secondary Colour: </label>
                <ColourDropdown colour={dragonInfo.secColour} setColour={secColour => updateDragonInfo({secColour})} colours={colours} />
            </div>
            <div className='Workshop-gene'>
                <label className='Scry-label'>Secondary Gene: </label>
                <GeneDropdown gene={dragonInfo.secGene} setGene={secGene => updateDragonInfo({secGene})} genes={secondaryGenes} breed={dragonInfo.breed}/>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.secRarity}, {props.dragonCalc.secPercent}%</label> : "" }
            <div className='Workshop-gene'>
                <label className='Scry-label'>Tertiary Colour: </label>
                <ColourDropdown colour={dragonInfo.tertColour} setColour={tertColour => updateDragonInfo({tertColour})} colours={colours}/>
            </div>
            <div className='Workshop-gene'>
                <label className='Scry-label'>Tertiary Gene: </label>
                <GeneDropdown gene={dragonInfo.tertGene} setGene={tertGene => updateDragonInfo({tertGene})} genes={tertiaryGenes} breed={dragonInfo.breed}/>
            </div>
            {props.showRarityInfo ? <label className='Scry-rarityInfo'>{props.dragonCalc.tertRarity}, {props.dragonCalc.tertPercent}%</label> : "" }
        </div>
    )
}