import { elements, eyeTypes, searchPatterns } from '../Data/Data';

export function SearchSpecial(props){

    function setEyeOptions(option, value){
        let options = props.eyeTypes.map((o, idx) => idx === option ? value : o);
        props.setEyeTypes(options);
    }
    function setDigitOptions(option, value){
        let options = props.digits.map((o, idx) => idx === option ? value : o);
        props.setDigits(options);
    }
    function setElementOptions(option, value){
        let options = props.elements.map((o, idx) => idx === option ? value : o);
        props.setElements(options);
    }

    function setPatternOptions(option, value){
        let options = props.patterns.map((o, idx) => idx === option ? value : o);
        props.setPatterns(options);
    }

    return(
        <div>
            <br/>
            <div>
                <div className='SearchUrl-rangeConfigArea'>
                    <div className='SearchUrl-rarityArea'>
                        <div className='SearchUrl-rarityCollection'>
                            <label className='SearchUrl-groupLabel'>Generation</label>
                            <div className="SearchUrl-labelcheckbox">
                                <input type="checkbox" checked={props.isG1} onChange={(e) => props.setIsG1(e.target.checked)}/>
                                <label className="SearchUrl-label">G1 only</label>
                            </div>
                        </div>
                    </div>
                    <div className='SearchUrl-rarityArea'>
                        <div className='SearchUrl-rarityCollection'>
                            <label className='SearchUrl-groupLabel'>Eye Types</label>
                            {
                                eyeTypes.map((value, idx) => {return(
                                    <div key={"eyeTypeDiv"+idx.toString()} className="SearchUrl-labelcheckbox">
                                        <input type="checkbox" key={"eyetype"+idx.toString()} checked={props.eyeTypes[idx]} onChange={(e) => setEyeOptions(idx, e.target.checked)}/>
                                        <label key={"eyeTypeLabel"+idx.toString()} className="SearchUrl-label">{value}</label>
                                    </div>
                                )})
                            }
                        </div>
                    </div>
                    <div className='SearchUrl-rarityArea'>
                        <div className='SearchUrl-rarityCollection'>
                            <label className='SearchUrl-groupLabel'>ID Digits</label>
                            {
                                [2,3,4,5,6,7,8].map((value, idx) => {return(
                                    <div key={"digitsDiv"+idx.toString()} className="SearchUrl-labelcheckbox">
                                        <input type="checkbox" key={"digits"+idx.toString()} checked={props.digits[idx]} onChange={(e) => setDigitOptions(idx, e.target.checked)}/>
                                        <label key={"digitLabel"+idx.toString()} className="SearchUrl-label">{value}</label>
                                    </div>
                                )})
                            }
                        </div>
                    </div>
                    <div className='SearchUrl-rarityArea'>
                        <div className='SearchUrl-rarityCollection'>
                            <label className='SearchUrl-groupLabel'>Elements</label>
                            {
                                elements.map((value, idx) => {return(
                                    <div key={"elementsDiv"+idx.toString()} className="SearchUrl-labelcheckbox">
                                        <input type="checkbox" key={"element"+idx.toString()} checked={props.elements[idx]} onChange={(e) => setElementOptions(idx, e.target.checked)}/>
                                        <label key={"elementLabel"+idx.toString()} className="SearchUrl-label">{value}</label>
                                    </div>
                                )})
                            }
                        </div>
                    </div>
                    <div className='SearchUrl-rarityArea'>
                        <div className='SearchUrl-rarityCollection'>
                            <label className='SearchUrl-groupLabel'>Pattern</label>
                            {
                                searchPatterns.map((value, idx) => {return(
                                    <div key={"patternsDiv"+idx.toString()} className="SearchUrl-labelcheckbox">
                                        <input type="checkbox" key={"pattern"+idx.toString()} checked={props.patterns[idx]} onChange={(e) => setPatternOptions(idx, e.target.checked)}/>
                                        <label key={"patternLabel"+idx.toString()} className="SearchUrl-label">{value}</label>
                                    </div>
                                )})
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}