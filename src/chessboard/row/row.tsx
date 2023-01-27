import React, { DragEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateTheBoardState } from '../../redux/boardSlice';
import { isPieceSelected, moveFromState } from '../../redux/moveFromSlice';
import { RootState } from '../../redux/store';
import Cell from './cell/cell'
import './row.css'


interface RowProps{
    row: Array<object>,
    rowIndex: number,
}

export default function Row(props: RowProps) {
    const [moveFrom, setMoveFrom] = useState('');
    const [moveTo, setMoveTo] = useState('');
    // const [legalmoves, setLegalMoves] = useState([]);

    // const movefromState = useSelector((state: RootState) =>state.moveFrom.value);
    const isPieceSelectedState = useSelector((state: RootState) =>state.moveFrom.valueSelected);

    const state = useSelector((state: RootState) =>state.moveFrom.value);
    const dispatch = useDispatch();

    // let to = event.currentTarget.getAttribute("data-col")+'';
    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }
    
    const theMoveIsFrom = (data: string) => {
        console.log('theMoveIsFrom: ', data);
        setMoveFrom(data);
    }


    const getImagePositionFROM = (cell: any)=>{
        if(cell){
            // if the black is selelcted
            const value = cell.square;
            console.log('image clicked log', value);
            // props.theMoveIsFrom(value)
            dispatch(moveFromState(value!))
            // setMoveFrom(value);
            // console.log('moveTo props: ', props.moveTo);
            dispatch(isPieceSelected(true))

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
                // setLegalMoves(data.legalmoves);//redux store
            })
            .catch(err => {
                    console.log('er: ', err);
                });

        } else {
            return;
        }
        // let data = event.currentTarget.getAttribute("data-col");
        // console.log('the image is at', data);
    } 


    const getTheCellTOMove = (event: any)=>{
        let data = event.currentTarget.getAttribute("data-col");
        console.log('the cell TO was clicked and its value is', data);
        // console.log('moveFrom: : : ', moveFrom);
        setMoveTo(data)
        console.log('mf: ', moveFrom);
         console.log('state of moveFrom: ', state);
        
         console.log('eventually: ', state, 'd: ', data);
         
        fetch('/api/movepiece', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({from: state, to: data}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('data getTheCellTOMove: ', data);
            dispatch(updateTheBoardState(data.moved))
        })
        .catch(err => {
                console.log('er24-52-45928-: ', err);
            });
        
    }
    const handleClick = (cell: any, event: any) => { 
        if(isPieceSelectedState){
            getTheCellTOMove(event);
        } else {
            getImagePositionFROM(cell)
        }
    }

    // const ref = useRef<any>(null);
    // // console.log('legalmoves::: ', legalmoves);
    // if(legalmoves.length !== 0){
    //         for (const l of legalmoves) {
    //         console.log('l: ', l);
    //         console.log('l23: ', ref.current.getAttribute("data-col"));
    //             if(ref.current.getAttribute("data-col") === l){
    //                 console.log('match');
                    
    //             }else{
    //                 console.log('no match');
                    
    //             }
    //         }
    // }


    // const highlightLegalMoves = (event: any) => {
    //     let data = event.currentTarget.getAttribute("data-col");
    //     for (const l of legalmoves) {
    //         console.log('l: ', l);
    //         if(l === data){

    //         }
            
    //     }
    // }
    // highlightLegalMoves();
    // console.log('moveFrom: ', moveFrom);
    // console.log('moveTo: ', moveTo);
    // if(moveFrom !== ''){
    
    // }
    const handleNothing = () => {
        console.log('there is a figure there! Do not execute this log');
    }
    return <div id='rows' >
            {props.row.map((cell, columnIndex) => (
                        <div key={columnIndex} 
                            className={columnIndex % 2 === props.rowIndex % 2 ? 'cell-white' : 'cell-black'}
                            data-col={`${getLetterFromIndex(columnIndex)}${props.rowIndex + 1}`}
                            onClick={(event) => handleClick(cell, event)}

                            >
                            <Cell cell={cell} 
                                columnLetter={getLetterFromIndex(columnIndex)} 
                                rowIndex={props.rowIndex} 
                                moveTo={moveTo} 
                                theMoveIsFrom={theMoveIsFrom}
                            />
                        </div>
                    )
                )}
    </div>

}

