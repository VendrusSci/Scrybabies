import ToggleSwitch from '../Utils/ToggleSwitch';
import { breeds } from '../Data/Data';

export function SearchExtras(props){

    function setPrimaryOptions(option, value){
        let options = props.primaryOptions.map((o, idx) => idx === option ? value : o);
        props.setPrimaryOptions(options);
    }
    function setSecondaryOptions(option, value){
        let options = props.secondaryOptions.map((o, idx) => idx === option ? value : o);
        props.setSecondaryOptions(options);
    }
    function setTertiaryOptions(option, value){
        let options = props.tertiaryOptions.map((o, idx) => idx === option ? value : o);
        props.setTertiaryOptions(options);
    }
    function setBreedOptions(option, value){
        let options = props.breedOptions.map((o, idx) => idx === option ? value : o);
        props.setBreedOptions(options);
    }

    return(
        <div>
            <div className='SearchUrl-rangeConfigArea'>
                <div className="SearchUrl-labelinput">
                    <label className="SearchUrl-label">RTB status: </label>
                    <select value={props.rtbStatus} onChange={(e) => props.setRtbStatus(e.target.value)}>
                        <option value={-1}>Any</option>
                        <option value={0}>Ready to Breed</option>
                    </select>
                </div>
                <div className="SearchUrl-labelinput">
                    <label className="SearchUrl-label">Gender: </label>
                    <select value={props.gender} onChange={(e) => props.setGender(e.target.value)}>
                        <option value={-1}>Any</option>
                        <option value={0}>Male</option>
                        <option value={1}>Female</option>
                    </select>
                </div>
            </div>
            
            <div className="SearchUrl-labelinput">
                <label className="SearchUrl-label">Show breed rarity options:</label>
                <ToggleSwitch isToggled={props.showBreedOptions} setIsToggled={props.setShowBreedOptions}/>
            </div>
            {props.showBreedOptions ?
                <div>
                    <div>
                        <div className="SearchUrl-labelcheckbox">
                            <input type="checkbox" checked={props.isSameBreed} onChange={(e) => props.setIsSameBreed(e.target.checked)}/>
                            <label className="SearchUrl-label">Same breed only</label>
                        </div>
                    </div>
                    <br/>
                    <div className='SearchUrl-rarityCollection'>
                        <div className="SearchUrl-labelcheckbox">
                            <input type="checkbox" disabled={props.isSameBreed ? "disabled" : ""} checked={props.breedOptions[0]} onChange={(e) => setBreedOptions(0, e.target.checked)}/>
                            <label className="SearchUrl-label">Plentiful</label>
                        </div>
                        <div className="SearchUrl-labelcheckbox">
                            <input type="checkbox" disabled={props.isSameBreed ? "disabled" : ""} checked={props.breedOptions[1]} onChange={(e) => setBreedOptions(1, e.target.checked)}/>
                            <label className="SearchUrl-label">Common</label>
                        </div>
                        <div className="SearchUrl-labelcheckbox">
                            <input type="checkbox" disabled={props.isSameBreed ? "disabled" : ""} checked={props.breedOptions[2]} onChange={(e) => setBreedOptions(2, e.target.checked)}/>
                            <label className="SearchUrl-label">Uncommon</label>
                        </div>
                        <div className="SearchUrl-labelcheckbox">
                            <input type="checkbox" disabled={props.isSameBreed ? "disabled" : ""} checked={props.breedOptions[3]} onChange={(e) => setBreedOptions(3, e.target.checked)}/>
                            <label className="SearchUrl-label">Limited</label>
                        </div>
                        <div className="SearchUrl-labelcheckbox">
                            <input type="checkbox" disabled={props.isSameBreed ? "disabled" : ""} checked={props.breedOptions[4]} onChange={(e) => setBreedOptions(4, e.target.checked)}/>
                            <label className="SearchUrl-label">Rare</label>
                        </div>
                    </div>
                </div>
            : null
            }

            <div className="SearchUrl-labelinput">
                <label className="SearchUrl-label">Show gene rarity options:</label>
                <ToggleSwitch isToggled={props.showGeneOptions} setIsToggled={props.setShowGeneOptions}/>
            </div>
            
            {props.showGeneOptions ?
                <div>
                    {breeds[props.breed].isAncient ?
                    <div className="SearchUrl-labelcheckbox">
                        <input type="checkbox" checked={props.isSameBreed} onChange={(e) => props.setIsSameBreed(e.target.checked)}/>
                        <label className="SearchUrl-label">Same breed only</label>
                    </div>
                    : null}
                    
                    <div className='SearchUrl-rangeConfigArea'>
                        <div className='SearchUrl-rarityArea'>
                            <div className='SearchUrl-rarityCollection'>
                                <label className='SearchUrl-groupLabel'>Primary Gene</label>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.primaryOptions[0]} onChange={(e) => setPrimaryOptions(0, e.target.checked)}/>
                                    <label className="SearchUrl-label">Plentiful</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.primaryOptions[1]} onChange={(e) => setPrimaryOptions(1, e.target.checked)}/>
                                    <label className="SearchUrl-label">Common</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.primaryOptions[2]} onChange={(e) => setPrimaryOptions(2, e.target.checked)}/>
                                    <label className="SearchUrl-label">Uncommon</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.primaryOptions[3]} onChange={(e) => setPrimaryOptions(3, e.target.checked)}/>
                                    <label className="SearchUrl-label">Limited</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.primaryOptions[4]} onChange={(e) => setPrimaryOptions(4, e.target.checked)}/>
                                    <label className="SearchUrl-label">Rare</label>
                                </div>
                            </div>
                        </div>
                        <div className='SearchUrl-rarityArea'>
                            <div className='SearchUrl-rarityCollection'>
                                <label className='SearchUrl-groupLabel'>Secondary gene</label>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.secondaryOptions[0]} onChange={(e) => setSecondaryOptions(0, e.target.checked)}/>
                                    <label className="SearchUrl-label">Plentiful</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.secondaryOptions[1]} onChange={(e) => setSecondaryOptions(1, e.target.checked)}/>
                                    <label className="SearchUrl-label">Common</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.secondaryOptions[2]} onChange={(e) => setSecondaryOptions(2, e.target.checked)}/>
                                    <label className="SearchUrl-label">Uncommon</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.secondaryOptions[3]} onChange={(e) => setSecondaryOptions(3, e.target.checked)}/>
                                    <label className="SearchUrl-label">Limited</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.secondaryOptions[4]} onChange={(e) => setSecondaryOptions(4, e.target.checked)}/>
                                    <label className="SearchUrl-label">Rare</label>
                                </div>
                            </div>
                        </div>
                        <div className='SearchUrl-rarityArea'>
                            <div className='SearchUrl-rarityCollection'>
                                <label className='SearchUrl-groupLabel'>Tertiary gene</label>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.tertiaryOptions[0]} onChange={(e) => setTertiaryOptions(0, e.target.checked)}/>
                                    <label className="SearchUrl-label">Plentiful</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.tertiaryOptions[1]} onChange={(e) => setTertiaryOptions(1, e.target.checked)}/>
                                    <label className="SearchUrl-label">Common</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.tertiaryOptions[2]} onChange={(e) => setTertiaryOptions(2, e.target.checked)}/>
                                    <label className="SearchUrl-label">Uncommon</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.tertiaryOptions[3]} onChange={(e) => setTertiaryOptions(3, e.target.checked)}/>
                                    <label className="SearchUrl-label">Limited</label>
                                </div>
                                <div className="SearchUrl-labelcheckbox">
                                    <input type="checkbox" checked={props.tertiaryOptions[4]} onChange={(e) => setTertiaryOptions(4, e.target.checked)}/>
                                    <label className="SearchUrl-label">Rare</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    );
}