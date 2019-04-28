import React, {Fragment} from 'react';

export default props =>{

    const rowData = props.values.map((row, index)=>{
       return(
            <td key={index}>{row}</td>

       )
    });

    if (props.watchlist) {
        rowData.push(
            <td key={props.values.length}>
                <button onClick={(event) => {
                    props.delete(props.values[0]);
                    event.stopPropagation();
                }} className="btn waves-effect waves-light">Delete</button>
            </td>
        );
    }

    return (
        <tr onClick={() => props.details(props.values[0])}>{rowData}</tr>
    )
}


