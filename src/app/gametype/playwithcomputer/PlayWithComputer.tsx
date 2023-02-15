import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserInfo } from '../../../interface';
import { RootState } from '../../chess/redux/store';
import './Playwithcomputer.css'

export default function PlayWithComputer() {
  const myInf: UserInfo = useSelector((state: RootState) =>state.board.myUserInfor);
  console.log('myInf in PlayWithComputer: ', myInf);

  return (
    <div>
        <button id='back-to-gametype'><Link to="/gametype">Back</Link></button>
        
    </div>
  )
}
