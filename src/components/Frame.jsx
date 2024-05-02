import React from 'react'
import Compass from './Compass'
import CompassFrame from './CompassFrame'
import HeadingTxt from './HeadingTxt'
import BugTxt from './BugTxt'
import CourseTxt from './CourseTxt'

export default function Frame(props) {
  const { aircraftState, bugState, obsState } = props;
  return (
    <main className="framework">
      <CompassFrame />
      <Compass />
      <HeadingTxt aircraftState = {aircraftState}/>
      <BugTxt bugState = {bugState}/>
      <CourseTxt obsState = {obsState}/>
    </main>
  )
}
