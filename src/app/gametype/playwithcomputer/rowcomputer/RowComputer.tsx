import CellComputer from "./cellcomputer/CellComputer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../chess/redux/store";
import { clearTheMoveFrom, isPieceSelected, moveFromState } from "../../chess/redux/moveFromSlice";
import { updateTheBoardState } from "../../chess/redux/boardSlice";
import { checkMateState } from "../../chess/redux/checkmateSlice";
interface RowProps{
    row: Array<object>,
    rowIndex: number,
}

export default function RowComputer(props: RowProps) {
    const isPieceSelectedState = useSelector((state: RootState) => state.moveFrom.valueSelected);
    const stateMoveFrom = useSelector((state: RootState) =>state.moveFrom.value);

    const [legalMove, setLegalMove] = useState<string[]>([]);
    const dispatch = useDispatch();



    const getImagePositionFROM = (cell: any)=>{
        if(cell){
            const value = cell.square;
            dispatch(moveFromState(value!))
            dispatch(isPieceSelected(true))

            fetch('/api/normalchess-legalmoves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({possibleMoves: value}),
            })
            .then(response => {
                // console.log('log the response: ', value);
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

    const getTheCellTOMove = (event: any, cell: any)=>{
        let dataa = event.currentTarget.getAttribute("data-col");
        dispatch(isPieceSelected(false))
        fetch('/api/normalchess-move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({from: stateMoveFrom, to: dataa}),
        })
        .then(response => {
            if(response.status === 200){
                // console.log("SUCCESSS")
                return response.json();     
            }else {
                console.log("SOMETHING WENT WRONG")
            }
        })
        .then(data => {
            console.log('data gameover: ', data.gameover);//true
            dispatch(checkMateState(data.gameover))
            console.log('data.moved: ', data.moved);
            
            dispatch(updateTheBoardState(data.moved))
        })
        .then(()=>{
            dispatch(clearTheMoveFrom(''))
        })
        .catch(err => {
                console.log('error unfortunately: ', err);
            });
        
    }

    const handleClick = (cell: any, event: any) => { 
        if(isPieceSelectedState){
            console.log('to');

            getTheCellTOMove(event, cell);
            
        } else {
            console.log('from');
            
            getImagePositionFROM(cell);
        }
    }



    //legal moves set att 
    useEffect(()=>{
        for (let l of legalMove){
            let matches = l.match(/\w[0-9]/);
            if (matches){
                let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
                (dataAt[0] as HTMLElement).setAttribute('id', 'possible-move');
            } 
        }
    }, [legalMove]);

    //legal moves remove att
    for (let l of legalMove){
        let matches = l.match(/\w[0-9]/);
        if (matches && !isPieceSelectedState){
            let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
            (dataAt[0] as HTMLElement).removeAttribute('id');
        } 
    }

    //letters
    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
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
