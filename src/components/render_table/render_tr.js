import React, {Fragment} from 'react';
import { formatDateTime, moneyCommas, formatNegativeMoney } from '../helpers';

export default props =>{

    const rowData = props.values.map((row, index)=>{
        if (row===null){
            row = "N/A";
        }
        else if ((props.allStocks||props.watchlist||props.openTrades) && index===1){
            row = formatDateTime(row);
        }
        else if ((props.allStocks||props.watchlist) && index===2){
            row = "$"+moneyCommas(row);
        }
        else if ((props.allStocks||props.watchlist) && index===3){
            row = row+"%";
        }
        else if (props.openTrades && (index===3||index===6||index===7)){
            row = "$"+moneyCommas(row);
        }
        else if (props.openTrades && index===5){
            row = formatDateTime(row);
        } 
        else if (props.offsetTrades && index===1){
            row = formatDateTime(row);
        } 
        else if (props.offsetTrades && index===3){
            row = "$"+moneyCommas(row);
        } 
        else if (index===3 || index===7){
            if (row<0){
                row = moneyCommas(row);
                row = formatNegativeMoney(row);
            } else {
                row = "$"+moneyCommas(row);
            }
        }
    
       return(
            <td key={index}>{row}</td>

       )
    });

    if (props.watchlist) {
        rowData[props.values.length - 1] = <td key={props.values.length}>
            <button onClick={(event) => {
                props.delete(props.values[0]);
                event.stopPropagation();
            }} className="btn green darken-2">Remove</button>
        </td>
    }
    if (props.addWatch){
        rowData[props.values.length - 1] = <td key={props.values.length}>
            <button onClick={(event)=>{props.addWatch(props.values[0]); event.stopPropagation();}}
             className="btn green darken-2">Add To Watchlist</button>
            </td>
    }

    return (
        <tr onClick={() => props.details(props.values[0])}>{rowData}</tr>
    )
}


