import CellComputer from "./cellcomputer/CellComputer";
import { Chess } from 'chess.js'
import { useEffect, useState } from "react";
import { RootState } from "../../../chess/redux/store";
import { useSelector } from "react-redux";

interface RowProps{
    row: Array<object>,
    rowIndex: number,
}

export default function RowComputer(props: RowProps) {
    const [isPieceSelectedState, isPieceSelectedStateSet] = useState(false)
    const chess = new Chess();
    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }

    const stateMoveFrom = useSelector((state: RootState) =>state.moveFrom.value);

    const [legalMove, setLegalMove] = useState<string[]>([]);
    const [moveTo, setMoveTo] = useState('');//not used??

    //set legal moves, moveFrom and isPieceSelected
    const getImagePositionFROM = (cell: any)=>{
        let legalMoves = chess.moves({square: cell.square})
        console.log('legalMoves: ', legalMoves);
        
        if(cell){
        const value = cell.square;
            if (data.legalmoves.length === 0){
                isPieceSelectedStateSet(false)
                console.log('its not your turn :(');
            } else {
                setLegalMove(data.legalmoves);
            }
        } else {
            return;
        }
    } 

    const getTheCellTOMove = (event: any, cell: any)=>{
        let dataa = event.currentTarget.getAttribute("data-col");
        isPieceSelectedStateSet(false)
            // console.log('data: ', data.checkMate);//true
            dispatch(checkMateState(data.checkMate))
            console.log('data.moved: ', data.moved);
            
            dispatch(updateTheBoardState(data.moved))

            setMoveTo('')
    }


    const handleClick = (cell: any, event: any) => { 
        if(isPieceSelectedState){
            getTheCellTOMove(event, cell);
            // console.log('getTheCellTOMove');
        } else {
            getImagePositionFROM(cell);
            // console.log('getImagePositionFROM');
        }
    }

    useEffect(()=>{
        for (let l of legalMove){
            let matches = l.match(/\w[0-9]/);
            if (matches){
                let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
                (dataAt[0] as HTMLElement).setAttribute('id', 'possible-move');
            } 
        }
    }, [legalMove]);
    for (let l of legalMove){
        let matches = l.match(/\w[0-9]/);
        if (matches && !isPieceSelectedState){
            let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
            (dataAt[0] as HTMLElement).removeAttribute('id');
        } 
    }

  return <div id='rows' >
        {props.row.map((cell, columnIndex) => (
                <div key={columnIndex} 
                    className={columnIndex % 2 === props.rowIndex % 2 ? 'cell-white' : 'cell-black'}
                    data-col={`${getLetterFromIndex(columnIndex)}${props.rowIndex + 1}`}
                    onClick={(event) => handleClick(cell, event)}
                    >
                    <CellComputer cell={cell} 
                        columnLetter={getLetterFromIndex(columnIndex)} 
                        rowIndex={props.rowIndex} 
                    />
                </div>
            )
        )}
    </div>
}
