import { useEffect, useState } from "react";

export function SearchUrls(props){

    const [searchUrl, setSearchUrl] = useState("");
    const [ahUrl, setAhUrl] = useState("");
    const ahBuyUrl = 'https://www1.flightrising.com/auction-house/buy/realm/dragons?';
    const searchBuyUrlStart = 'https://www1.flightrising.com/search/dragons?page=1&sort=id_asc&exalted=0&progen=0&breed=&bodygene=&winggene=&tertgene=&gender=&';
    const searchBuyUrlEnd = '&rtb=&sort=id_desc';

    useEffect(()=>{

        setAhUrl(   ahBuyUrl
                    + `d_body_range=${props.primFirstColour}-${props.primSecondColour}`
                    + `&d_wings_range=${props.secFirstColour}-${props.secSecondColour}`
                    + `&d_tert_range=${props.tertFirstColour}-${props.tertSecondColour}&collapse=1`);

        setSearchUrl(   searchBuyUrlStart
                        + `body_range=${props.primFirstColour}-${props.primSecondColour}`
                        + `&wings_range=${props.secFirstColour}-${props.secSecondColour}`
                        + `&tert_range=${props.tertFirstColour}-${props.tertSecondColour}`
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
                <label className="SearchUrl-label">AH:      </label>
                <button onClick={openAhUrl}>Open in new tab</button>
                <button>View URL</button>
            </div>
            <div className="SearchUrl-rangeConfigArea">
                <label className="SearchUrl-label">Search:</label>
                <button onClick={openSearchUrl}>Open in new tab</button>
                <button>View URL</button>
            </div>
        </div>
    );
}