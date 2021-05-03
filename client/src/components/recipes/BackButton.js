import React from 'react'
import { useHistory } from "react-router-dom"
import { Breadcrumb } from "antd"

const BackButton = (props) => {

  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return <div className="back-button">
    <Breadcrumb>
      <Breadcrumb.Item className="back-button-text" onClick={goBack}>
        Go Back
    </Breadcrumb.Item>
    </Breadcrumb>
  </div>
}

export default BackButton