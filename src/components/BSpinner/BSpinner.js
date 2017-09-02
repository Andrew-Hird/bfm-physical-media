import React, { Component } from 'react'
import logo from '../../assets/images/bfm-load.svg'
import './BSpinner.css'

class BSpinner extends Component {
  render() {
    return (
      <div className='spinner'>
          <img src={logo} alt="" />
      </div>
    )
  }
}

export default BSpinner
