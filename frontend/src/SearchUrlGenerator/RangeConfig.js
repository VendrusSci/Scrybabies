import NumericInput from 'react-numeric-input';

export function RangeConfig(props){

    return (
        <div className='SearchUrl-rangeConfig'>
            <div className='SearchUrl-labelinput'>
                <label className='SearchUrl-label'>Range size</label>
                <NumericInput max={10} min={0} step={1} value={props.rangeSize} onChange={props.setRangeSize} style={{input:{maxWidth:'70px'}}}/>
            </div>
            <select value={props.rangeOffset} onChange={(e) => props.setRangeOffset(e.target.value)}>
                <option value={'-1'}>Before colour</option>
                <option value={'0'}>Both sides</option>
                <option value={'1'}>After colour</option>
            </select>
        </div>
    );
}