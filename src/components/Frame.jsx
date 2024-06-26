import React from 'react'
import Compass from './Compass'
import CompassFrame from './CompassFrame'
import HeadingTxt from './HeadingTxt'
import BugTxt from './BugTxt'
import CourseTxt from './CourseTxt'
import BearingTxt from './BearingTxt'

export default function Frame(props) {
  const { aircraftState, instrumentState, bugState, obsState } = props;
  return (
    <main className="framework">
      <div className="frameworkElement">
        <CompassFrame />
        <Compass />
        <HeadingTxt aircraftState = {aircraftState}/>
        <BugTxt bugState = {bugState}/>
        <CourseTxt obsState = {obsState}/>
        <BearingTxt 
          aircraftState = {aircraftState}
          instrumentState = {instrumentState}
        />
      </div>
    </main>
  )
}
