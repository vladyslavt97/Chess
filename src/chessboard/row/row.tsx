import React, { DragEvent, useEffect, useRef, useState } from 'react'
import Cell from './cell/cell'
import './row.css'


interface RowProps{
    row: [],
    rowIndex: number,
}

export default function Row(props: RowProps) {
    const [moveFrom, setMoveFrom] = useState('');
    const [moveTo, setMoveTo] = useState('');
    //const value2 = useRef(moveFrom);
    //gets arrays and maps through them to pass to cell
    const handleDragOver = (e: any)=>{
        console.log("handleDropOver");
        
        e.preventDefault();
        e.stopPropagation();
        //settimeout to check every 500ms is the move is legal??
    }

    const theMoveIsFrom = (data: string) => {
        console.log('theMoveIsFrom: ', data);
        
        setMoveFrom(data);
        
    }
    const handleDrop = (event: DragEvent<HTMLDivElement>)=>{
        console.log("handleDrop");
        
        let to = event.currentTarget.getAttribute("data-col") || "";
        setMoveTo(to)
    }

    useEffect(()=>{
        console.log('right after useEffect moveFrom: ', moveFrom);
        console.log('right after useEffect moveTo: ', moveTo);
        
        console.log('handleDrop to: ', moveTo);
        console.log('handleDrop from: ', JSON.stringify(moveFrom));
        //console.log('handleDrop from: value2 ', value2);
        //the fen should get updated here?
        //post to update DB? and dispatch
        fetch('/api/movepiece', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({to: moveTo, from: moveFrom}),
        })
        .then(response => {
            console.log('log the response: ', moveFrom);
            
            response.json()
        })
        .then(data => {
            console.log('data handledrop movepiece row.tsx: ', data);
        })
        .catch(err => {
                console.log('er: ', err);
            });
    }, [moveTo, moveFrom])

    useEffect(() => {
console.log("component did mount");

    }, [])
    
    // const handleDrop = (event: any, value: string)=>{
    //     let to = event.currentTarget.getAttribute("data-col");
        
    //     console.log('handleDrop to: ', to);
    //     console.log('handleDrop from: ', JSON.stringify(value));
    //     //console.log('handleDrop from: value2 ', value2);
    //     //the fen should get updated here?
    //     //post to update DB? and dispatch
    //     fetch('/api/movepiece', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({to: to, from: moveFrom}),
    //     })
    //     .then(response => {
    //         console.log('log the response: ', moveFrom);
            
    //         response.json()
    //     })
    //     .then(data => {
    //         console.log('data handledrop movepiece row.tsx: ', data);
    //     })
    //     .catch(err => {
    //             console.log('er: ', err);
    //         });
    // }

    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }

    return <div id='rows'>
            {props.row.map((cell, columnIndex) => (
                //ondragover and ondrop 
                        <div key={columnIndex} 
                            className={columnIndex % 2 === props.rowIndex % 2 ? 'cell-white' : 'cell-black'}
                            /*onDrop={handleDrop}*/
                            data-col={`${getLetterFromIndex(columnIndex)}${props.rowIndex + 1}`}

                            /*onDragOver={handleDragOver}*/
                            >
                            <Cell cell={cell} columnLetter={getLetterFromIndex(columnIndex)} handleDrop={handleDrop} rowIndex={props.rowIndex} theMoveIsFrom={theMoveIsFrom}/>

                            

                        </div>
                    )
                )}
    </div>
}
