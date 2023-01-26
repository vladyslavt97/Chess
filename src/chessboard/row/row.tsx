import React, { useEffect } from 'react'
import Cell from './cell/cell'
import './row.css'


interface RowProps{
    row: [],
    rowIndex: number,
}

export default function Row(props: RowProps) {
    //gets arrays and maps through them to pass to cell
    const handleDragOver = (e: any)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log('on drag over');
    }
    // const handleDrop = (event: any)=>{
    //     console.log('handleDrop');
    //     //the fen should get updated here?
    //     //post to update DB? and dispatch
    //     event.dataTransfer.getData("drag-item") 
    // }
    // console.log('prop: ', props);

    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index);
    }

    return <div id='rows'>
            {props.row.map((cell, columnIndex) => (
                //ondragover and ondrop 
                        <div key={columnIndex} 
                            className={columnIndex % 2 === props.rowIndex % 2 ? 'cell-white' : 'cell-black'}
                            // onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            >
                            <Cell cell={cell} columnLetter={getLetterFromIndex(columnIndex)} rowIndex={props.rowIndex}/>

                            

                        </div>
                    )
                )}
    </div>
}
