import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isPieceSelected, moveFromState, clearTheMoveFrom } from '../../redux/moveFromSlice';
import { RootState } from '../../redux/store';
import Cell from './cell/cell'
import './row.css'
import { socket } from '../../socket/socket';


interface RowProps{
    row: Array<object>,
    rowIndex: number,
}

interface CellObject{
    square: string
    type: string
    color: string
}

export default function Row(props: RowProps) {
    const isPieceSelectedState = useSelector((state: RootState) =>state.moveFrom.valueSelected);
    const stateMoveFrom = useSelector((state: RootState) =>state.moveFrom.value);
    const board = useSelector((state: RootState) =>state.board.boardValue);
    const clickedUserId = useSelector((state: RootState) => state.board.id);


    const thePlayersToColour = useSelector((state: RootState) =>state.board.gameInserted[0]);

    const myId = useSelector((state: RootState) => state.board.myId);
    const [colour, setColour] = useState<string>('');
    
    useEffect(()=>{
        if(thePlayersToColour){
            if(thePlayersToColour.player1_id === myId){
                setColour('w');
            }else if (thePlayersToColour.player2_id === myId){
                setColour('b');
            }
        }
    }, [])

    const [legalMove, setLegalMove] = useState<string[]>([]);
    const dispatch = useDispatch();


    const getImagePositionFROM = (cell: CellObject)=>{
        if(cell.color === colour){
            const value = cell.square;
            dispatch(moveFromState(value!))
            dispatch(isPieceSelected(true))

            fetch('/api/legalmoves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({possibleMoves: value}),
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.legalmoves.length === 0){
                    dispatch(clearTheMoveFrom(''))
                    dispatch(isPieceSelected(false))
                    console.log('its not your turn :(');
                } else {
                    setLegalMove(data.legalmoves);
                }
            })
            .catch(err => {
                console.log('er: ', err);
            });

        } else {
            return;
        }
    } 

    const getTheCellTOMove = (event: React.MouseEvent, cell: object)=>{
        let dataa = event.currentTarget.getAttribute("data-col");
        dispatch(isPieceSelected(false));
        socket.emit('moveTo', {from: stateMoveFrom, to: dataa, clickedUser: clickedUserId});
        dispatch(clearTheMoveFrom(''));
    }

    const handleClick = (cell: CellObject, event: React.MouseEvent) => { 
        if(isPieceSelectedState){
            getTheCellTOMove(event, cell);
        } else {
            getImagePositionFROM(cell);
        }
        
    }

    //loop through legal moves to setAttribute
    useEffect(()=>{
        for (let l of legalMove){
            let matches = l.match(/\w[0-9]/);
            if (matches){
                let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
                (dataAt[0] as HTMLElement).setAttribute('id', 'possible-move');
            } 
        }
    }, [legalMove]);

    //loop through legal moves to removeAttribute
    for (let l of legalMove){
        let matches = l.match(/\w[0-9]/);
        if (matches && !isPieceSelectedState){
            let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
            (dataAt[0] as HTMLElement).removeAttribute('id');
        } 
    }

    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }
    
    return <div id='rows' >
            {props.row.map((cell: any, columnIndex) => (
                        <div key={columnIndex} 
                            className={columnIndex % 2 === props.rowIndex % 2 ? 'cell-white' : 'cell-black'}
                            data-col={`${getLetterFromIndex(columnIndex)}${props.rowIndex + 1}`}
                            onClick={(event) => handleClick(cell, event)}
                            >
                            <Cell cell={cell} 
                                columnLetter={getLetterFromIndex(columnIndex)} 
                                rowIndex={props.rowIndex} 
                            />
                        </div>
                    )
                )}
    </div>

}

