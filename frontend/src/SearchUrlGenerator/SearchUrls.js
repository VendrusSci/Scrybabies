import { useEffect, useState } from "react";
import { colours } from "../Data/Data";

export function SearchUrls(props){

    const [searchUrl, setSearchUrl] = useState("");
    const [ahUrl, setAhUrl] = useState("");
    const ahBuyUrl = 'https://www1.flightrising.com/auction-house/buy/realm/dragons?';
    const searchBuyUrlStart = 'https://www1.flightrising.com/search/dragons?page=1&sort=id_asc&exalted=0&progen=0';
    const searchBuyUrlEnd = '&sort=id_desc';

    useEffect(()=>{

        let breeds = [];
        let primaryGenes = [];
        let secondaryGenes = [];
        let tertiaryGenes = [];

        setAhUrl(   ahBuyUrl
                    + `d_body_range=${colours[props.primFirstColour].id}-${colours[props.primSecondColour].id}`
                    + `&d_wings_range=${colours[props.secFirstColour].id}-${colours[props.secSecondColour].id}`
                    + `&d_tert_range=${colours[props.tertFirstColour].id}-${colours[props.tertSecondColour].id}`
                    + '&collapse=1');

        setSearchUrl(   searchBuyUrlStart
                        + `body_range=${colours[props.primFirstColour].id}-${colours[props.primSecondColour].id}`
                        + `&wings_range=${colours[props.secFirstColour].id}-${colours[props.secSecondColour].id}`
                        + `&tert_range=${colours[props.tertFirstColour].id}-${colours[props.tertSecondColour].id}`
                        + `&gender=${props.gender = -1 ? '' : props.gender}`
                        + `&rtb=${props.rtbStatus = -1 ? '' : 1}`
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

}

function getGeneArray(rarity){
    
}