import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import './cell.css'

interface CellType{
    square?: string,
    type?: string,
    color?: string
}

interface CellProps{
    cell?: CellType,
    rowIndex: number,
    columnLetter: string,
}

export default function Cell(props: CellProps) {

    const thePlayersToColour = useSelector((state: RootState) =>state.board.gameInserted[0]);
    console.log('thePlayersToColour: ', thePlayersToColour);
    const myId = useSelector((state: RootState) => state.board.myId);

    
    return <div >
                    <div 
                    data-col={`${props.columnLetter}${props.rowIndex + 1}`}
                    >{props.cell &&
                            <img 
                                src={`${props.cell?.type}${props.cell?.color}.png`} 
                                alt={props.cell.square}
                                id={thePlayersToColour.player1_id === myId ? "piece" : "piece-blackside"}
                            />}
                    </div>
        </div>
}
