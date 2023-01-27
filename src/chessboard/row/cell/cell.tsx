import React, { DragEventHandler, DragEvent, useEffect, useRef, useState } from 'react'
import { moveFromState } from '../../../redux/moveFromSlice';
import './cell.css'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../../redux/store';

interface CellType{
    square?: string,
    type?: string,
    color?: string
}

interface CellProps{
    cell?: CellType,
    rowIndex: number,
    columnLetter: string,
    // legalmoves: string[],
    moveTo: string,
    theMoveIsFrom: Function
}

export default function Cell(props: CellProps) {
    const movefromState = useSelector((state: RootState) =>state.moveFrom.value);
    
    // const [moveFrom, setMoveFrom] = useState('');
    const [legalmoves, setLegalMoves] = useState([]);
    const dispatch = useDispatch();

    // whenever there is a change in state, makes a post request and dispatches
    //post request will do the chess.move({from: to:}) with the parameter which is the square where it was moved to
    //and therefore make changes to FEN 

    // const value = props.cell?.square;
        // fetch('/api/movepiece', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({to: props.moveTo, from: moveFrom}),
        // })
        // .then(response => {
        //     console.log('log the response: ', moveFrom);
            
        //     response.json()
        // })
        // .then(data => {
        //     console.log('data handledrop movepiece row.tsx: ', data);
        // })
        // .catch(err => {
        //         console.log('er: ', err);
        //     });


    //make on click of the image, not the cell    
    const getImagePositionFROM = ()=>{
        // if(props.cell !== undefined){
            const value = props.cell?.square;
            console.log('image clicked log', value);
            // props.theMoveIsFrom(value)
            dispatch(moveFromState(value!))
            // setMoveFrom(value);
            // console.log('moveTo props: ', props.moveTo);

            fetch('/api/legalmoves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({possibleMoves: value}),
            })
            .then(response => {
                console.log('log the response: ', value);
                return response.json()
            })
            .then(data => {
                console.log('data: ', data);
                setLegalMoves(data.legalmoves);
            })
            .catch(err => {
                    console.log('er: ', err);
                });

        // }
        // let data = event.currentTarget.getAttribute("data-col");
        // console.log('the image is at', data);
    }        
    
    // const ref = useRef<any>(null);
    // console.log('legalmoves::: ', legalmoves);
    // if(props.legalmoves.length !== 0){
    //         for (const l of props.legalmoves) {
    //         console.log('l: ', l);
    //         console.log('l23: ', ref.current.getAttribute("data-col"));
    //             if(ref.current.getAttribute("data-col") === l){
    //                 console.log('match');
                    
    //             }else{
    //                 console.log('no match');
                    
    //             }
    //         }
    // }

    const capturePiece = () => {
        console.log('capture!!!');
    }
    console.log('movefromState123123123: ', movefromState);
    console.log("legalmoves ex: ", legalmoves);
    
    return <div >
            {/* {props.legalmoves.length !== 0 && <div>
                {props.legalmoves.map(l => ( */}
                    <div 
                    // id={l === `${props.columnLetter}${props.rowIndex + 1}` ? 'cell' : undefined}
                    // ref={ref}
                    // onClick={getImagePosition}
                    data-col={`${props.columnLetter}${props.rowIndex + 1}`}
                    >{props.cell &&
                            <img 
                                src={`${props.cell?.type}${props.cell?.color}.png`} 
                                alt={props.cell.square}
                                id="piece"
                                onClick={legalmoves.length === 0 ? capturePiece : getImagePositionFROM}//moveFrom === sqaure (means that the state was set, therefore the move was madeFrom was clicked and it euqal to the square )
                                // onClick={movefromState && props.cell.square === movefromState && legalmoves.length === 0 ? handleNothing : getImagePositionFROM}//moveFrom === sqaure (means that the state was set, therefore the move was madeFrom was clicked and it euqal to the square )
                            />}
                    </div>
                {/* ))} */}
                {/* </div>} */}
        </div>
}
