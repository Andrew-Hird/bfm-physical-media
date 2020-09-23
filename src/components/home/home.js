import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline'
import BSpinner from '../BSpinner/BSpinner'
import { grey700 } from 'material-ui/styles/colors'
import { Tabs, Tab } from 'material-ui/Tabs'
import './home.css'

import AlbumAristResults from '../results/albumAristResults'
import TrackResults from '../results/trackResults'

// import logo from '../../assets/images/95bfm-logo.svg'
import logo from '../../assets/images/95bfm-logo-white.png'
import {searchAlbum, searchArtist, searchTrack} from "./search";

const styles = {
  underlineStyle: {
    borderColor: '#f01616',
    slider: {
      trackColor: '#f01616',
      handleFillColor: '#f01616'
    }
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      errorText: '',
      error: false,
      selectedSearch: 'ALBUM',
      searching: false,
      result: false,
      noResult: false,
      searchTerm: '',
      albumAristResults: [],
      trackResults: []
    }
  }

  render() {
    const updateInputValue = evt => {
      this.setState({
        inputValue: evt.target.value,
        errorText: '',
        noResult: false
      })
    }

    const handleActive = tab => {
      this.setState({
        selectedSearch: tab.props.label,
        inputValue: '',
        albumAristResults: [],
        trackResults: [],
        noResult: false
      })
    }

    const handleSubmit = evt => {
      evt.preventDefault()
      this.setState({
        noResult: false,
        searchTerm: this.state.inputValue
      })

      if (!this.state.inputValue) {
        return this.setState({ errorText: 'Please enter something' })
      }

      this.setState({
        searching: true,
        error: false,
        noResult: false,
        albumAristResults: [],
        trackResults: []
      })

      if (this.state.selectedSearch === 'ARTIST') {
        const results = searchArtist(this.state.inputValue)

        this.setState({
          searching: false,
          albumAristResults: results
        })
        if (results.length === 0) {
          this.setState({noResult: true})
        }
      }

      if (this.state.selectedSearch === 'ALBUM') {
        const results = searchAlbum(this.state.inputValue)

        this.setState({
          searching: false,
          albumAristResults: results
        })
        if (results.length === 0) {
          this.setState({noResult: true})
        }
      }

      if (this.state.selectedSearch === 'TRACK') {
        const results = searchTrack(this.state.inputValue)

        this.setState({
          searching: false,
          trackResults: results
        })
        if (results.length === 0) {
          this.setState({noResult: true})
        }
      }
    }

    const getInputStyle = () => {
      return `${
        this.state.searching || this.state.albumAristResults.length || this.state.trackResults.length ?
        null : 'search'
      }`
    }

    return (
      <div className='Home'>
        <img className='logo-left' src={ logo } alt='' />
        <img className='logo-right' src={ logo } alt='' />
        <div>
          <form onSubmit={ handleSubmit }>
            <Tabs initialSelectedIndex={ 1 } style={ {width: 250, margin: '0 auto'} } tabItemContainerStyle={ {backgroundColor: grey700, borderRadius: 3} } inkBarStyle={ {background: '#f01616'} }>

              <Tab label='ARTIST' onActive={ handleActive } />
              <Tab label='ALBUM' onActive={ handleActive } />
              <Tab label='TRACK' onActive={ handleActive } />
            </Tabs>
            <TextField
              className={getInputStyle()}
              hintText='Search'
              errorText={ this.state.errorText }
              underlineFocusStyle={ styles.underlineStyle }
              inputStyle={ {textAlign: 'center'} }
              value={ this.state.inputValue }
              onChange={ evt => updateInputValue(evt) } />
          </form>
        </div>
        {this.state.searching ? <BSpinner /> : null}
        {this.state.noResult ? <p className='center' style={ {color: 'white'} }>Sorry, nothing found</p> : null}
        {this.state.error ? <p className='center' style={ {color: 'red'} }>Sorry, there was an error</p> : null}
        <div className="results">
          <AlbumAristResults results={ this.state.albumAristResults } searchTerm={ this.state.searchTerm } />
          <TrackResults results={ this.state.trackResults } searchTerm={ this.state.searchTerm } />
        </div>
        <div className="help hint--top-left hint--large hint--rounded" aria-label="For bugs and suggestions, please email andrew.james.hird@gmail.com">
          <ActionHelpOutline />
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  client: PropTypes.any
}

export default Home
