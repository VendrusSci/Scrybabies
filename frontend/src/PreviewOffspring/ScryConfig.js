import {elements} from "../Data/Data.js"; 

export function ScryConfig(props){

    function onAgeChange(e){
        props.setAge(e.target.value);
    }

    /* age, element, link count */
    return(
        <div className="Scry-layout">
            <div className="Scry-configpart">
                <label className="Scry-configlabel">Age</label>
                <div onChange={onAgeChange}>
                    <input type="radio" name="age" value="1"/> Adult
                    <input type="radio" name="age" value="0" defaultChecked /> Hatchling 
                </div>
            </div>
            <div className="Scry-configpart">
                <label className="Scry-configlabel">Element</label>
                <select className='' value={props.element} onChange={(e)=>{props.setElement(e.target.value)}}>
                    {elements.map((name, index) => <option value={index} key={index}>{name}</option>)}
                </select>
            </div>
            <div className="Scry-configpart">
                <label className="Scry-configlabel">Number of links</label>
                <select className="" value={props.linkCount} onChange={(e) => {props.setLinkCount(e.target.value)}}>
                    {Array.from(new Array(10), (x, i) => i + 1).map((index) => <option value={index} key={index}>{index.toString()}</option>)}
                </select>
            </div>
        </div>
    );
}