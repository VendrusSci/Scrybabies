import { useEffect, useState } from "react";
import { breeds, colours, primaryGenes, secondaryGenes, tertiaryGenes } from "../Data/Data";

export function SearchUrls(props){

    const [searchUrl, setSearchUrl] = useState("");
    const [ahUrl, setAhUrl] = useState("");
    const ahBuyUrl = 'https://www1.flightrising.com/auction-house/buy/realm/dragons?collapse=1';
    const searchBuyUrlStart = 'https://www1.flightrising.com/search/dragons?page=1&sort=id_asc&exalted=0&progen=0';
    const searchBuyUrlEnd = '&sort=id_desc';

    useEffect(()=>{

        let breeds = [];
        let primaryGenes = [];
        let secondaryGenes = [];
        let tertiaryGenes = [];

        if(props.showBreedOptions && !props.breedOptions.every(v => v === false)){
            for(let i = 0; i < 5; i++){
                if(props.breedOptions[i]){
                    breeds = breeds.concat(getBreedArray(i));
                }
            }
        }

        if(props.showGeneOptions && !props.primaryOptions.every(v => v === false)){
            for(let i = 0; i < 5; i++){
                if(props.primaryOptions[i]){
                    primaryGenes = primaryGenes.concat(getGeneArray(i, 1));
                }
            }
        }

        if(props.showGeneOptions && !props.secondaryOptions.every(v => v === false)){
            for(let i = 0; i < 5; i++){
                if(props.secondaryOptions[i]){
                    secondaryGenes = secondaryGenes.concat(getGeneArray(i, 2));
                }
            }
        }

        if(props.showGeneOptions && !props.tertiaryOptions.every(v => v === false)){
            for(let i = 0; i < 5; i++){
                if(props.tertiaryOptions[i]){
                    tertiaryGenes = tertiaryGenes.concat(getGeneArray(i, 3));
                }
            }
        }

        setAhUrl(ahBuyUrl
                    + `&d_body_range=${colours[props.primFirstColour].id}-${colours[props.primSecondColour].id}`
                    + `&d_wings_range=${colours[props.secFirstColour].id}-${colours[props.secSecondColour].id}`
                    + `&d_tert_range=${colours[props.tertFirstColour].id}-${colours[props.tertSecondColour].id}`
                    + `&d_gender=${props.gender === -1 ? '' : props.gender}`
                    + `&d_rtb=${props.rtbStatus === -1 ? '' : 1}`
                    + `&d_breed=${props.showBreedOptions ? breeds.join('%2C') : ''}`
                    + `&d_bodygene=${props.showGeneOptions ? primaryGenes.join('%2C') : ''}`
                    + `&d_winggene=${props.showGeneOptions ? secondaryGenes.join('%2C') : ''}`
                    + `&d_tertgene=${props.showGeneOptions ? tertiaryGenes.join('%2C') : ''}`);

        setSearchUrl(searchBuyUrlStart
                        + `&body_range=${colours[props.primFirstColour].id}-${colours[props.primSecondColour].id}`
                        + `&wings_range=${colours[props.secFirstColour].id}-${colours[props.secSecondColour].id}`
                        + `&tert_range=${colours[props.tertFirstColour].id}-${colours[props.tertSecondColour].id}`
                        + `&gender=${props.gender === -1 ? '' : props.gender}`
                        + `&rtb=${props.rtbStatus === -1 ? '' : 1}`
                        + `&breed=${props.showBreedOptions ? breeds.join('%2C') : ''}`
                        + `&bodygene=${props.showGeneOptions ? primaryGenes.join('%2C') : ''}`
                        + `&winggene=${props.showGeneOptions ? secondaryGenes.join('%2C') : ''}`
                        + `&tertgene=${props.showGeneOptions ? tertiaryGenes.join('%2C') : ''}`
                        + searchBuyUrlEnd);
    },[props]);

    function openAhUrl(){
        window.open(ahUrl, "_blank");
    }

    function openSearchUrl(){
        window.open(searchUrl, "_blank");
    }

    return (
        <div className="SearchUrl-searchArea">
            <div className="SearchUrl-rangeConfigArea">
                <label className="SearchUrl-label">AH Search:      </label>
                <button onClick={openAhUrl}>Open in new tab</button>
            </div>
            <div className="SearchUrl-rangeConfigArea">
                <label className="SearchUrl-label">Dragon Search:</label>
                <button onClick={openSearchUrl}>Open in new tab</button>
            </div>
        </div>
    );
}

function getBreedArray(rarity){
    let selectedBreeds = Object.entries(breeds).filter(([_, value]) => value.rarity === rarity && value.isAncient === false);
    return selectedBreeds.map(([key, _]) => key);
}

function getGeneArray(rarity, geneSlot){
    let genes ={};
    if(geneSlot === 1)
        genes = primaryGenes;
    else if(geneSlot === 2)
        genes = secondaryGenes;
    else
        genes = tertiaryGenes;

    let selectedGenes = Object.entries(genes).filter(([_, value]) => value.rarity === rarity && value.breed === 0);
    return selectedGenes.map(([key, _]) => key);
}