import { NumericInput } from "../Utils/NumericInput";

export function RangeConfig(props){

    return (
        <div className='SearchUrl-rangeConfig'>
            <div className='SearchUrl-labelinput'>
                <label className='SearchUrl-label'>Range size:</label>
                <NumericInput min={0} max={10} onChange={props.setRangeSize} value={props.rangeSize}/>
            </div>
            <div className='SearchUrl-labelinput'>
                <label className='SearchUrl-label'>Apply to:</label>
                <select value={props.rangeOffset} onChange={(e) => props.setRangeOffset(e.target.value)}>
                    <option value={'-1'}>Before colour</option>
                    <option value={'0'}>Both sides</option>
                    <option value={'1'}>After colour</option>
                </select>
            </div>
        </div>
    );
}