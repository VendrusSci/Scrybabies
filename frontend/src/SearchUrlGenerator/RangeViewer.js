import { colours } from "../Data/Data"
import { ColourDropdown } from "../Utils/DragonDropdowns"

export function RangeViewer(props){
    return (
        <div>
            <div className='SearchUrl-labelinput'>
                <label className='SearchUrl-label'>First colour</label>
                <ColourDropdown colour={props.firstColour} setColour={props.setFirst} colours={colours}/>
            </div>
            <div className='SearchUrl-labelinput'>
                <label className='SearchUrl-label'>Second colour</label>
                <ColourDropdown colour={props.secondColour} setColour={props.setSecond} colours={colours}/>
            </div>
        </div>
    )
}