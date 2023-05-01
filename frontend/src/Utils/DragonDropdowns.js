import React, { useState, useEffect } from 'react';
import { breeds } from '../Data/Data';

export function GeneDropdown(props){
    const onChange = (e) => {
        props.setGene(e.target.value);
    };

    const [geneOptions, setGeneOptions] = useState()

    let breed = props.breed;
    let genes = props.genes;

    useEffect(() => {
        let breedId = 0;
        if(breeds[breed].isAncient) breedId = Number(breed);

        let dropdownData = Object.entries(genes).filter(([_, value]) => value.breed === breedId);
        dropdownData = dropdownData.map(([key, value]) => ({id: key, name: value.name}));
        
        if(breeds[breed].isAncient) dropdownData.push({id: 0, name: 'Basic'});

        dropdownData.sort((a, b) => a.name.localeCompare(b.name));
        setGeneOptions(dropdownData)
            
    }, [breed, genes]);

    
    if (geneOptions) 
    return(
        <select className='colour-dropdown' value={props.gene} onChange={onChange}>
        {   
            geneOptions.map((gene) => <option key={gene.id} value={gene.id}>{gene.name}</option>)
        }
        </select>
    );
    
}

export function ColourDropdown(props){
    const onChange = (e) => {
        props.setColour(e.target.value);
    };

    return(
        <select
            className='colour-dropdown'
            style={{backgroundColor: props.colours[props.colour].hexcode, color: props.colours[props.colour].text }}
            value={props.colour}
            onChange={onChange}>
        {   
            Object.entries(props.colours)
                .map(([id, colour]) => <option style={{backgroundColor: colour.hexcode, color: colour.text }} 
                                                key={id} value={id}>{colour.name}</option>)
        }
        </select>
    );
}

export function BreedDropdown(props){

    const onChange = (e) => {
        props.setBreed(e.target.value);
    };

    let breedlist = Object.entries(props.breeds).map(([id, breed]) => ({id, name: breed.name}));
    breedlist.sort((a, b) => a.name.localeCompare(b.name));

    return(
        <select value={props.breed} onChange={onChange} >
            {
                breedlist.map((breed) => <option key={breed.id} value={breed.id}>{breed.name}</option>)
            }
        </select>
    )
}