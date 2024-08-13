import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import React from 'react'

type Props = {}

const RedCircle = () => {
  return (
    <FontAwesomeIcon icon={faTimesCircle} className="mr-4 text-xl text-red-700"/>
  )
}

export default RedCircle