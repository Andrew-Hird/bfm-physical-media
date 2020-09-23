import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Highlight from 'react-highlighter'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import AudioTrack from 'material-ui/svg-icons/image/audiotrack'
import { grey50 } from 'material-ui/styles/colors'

import AlbumDialog from '../albumDialog/albumDialog'
import { getMediaIcon, correctChar } from '../../helpers'

import './results.css'

const style = {
  list: {
    width: 400,
    textAlign: 'left'
  },
  avatar: {
    backgroundColor: 'none',
    position: 'absolute',
    width: 40,
    top: 15,
    filter: 'opacity(30%)'
  },
  catalog: {
    fontSize: 11,
    zIndex: 1,
    height: 40,
    width: 40,
    lineHeight: '40px',
    textAlign: 'center',
    position: 'absolute',
    left: 15,
    top: 16
  },
  dialogIcon: {
    position: 'absolute',
    width: 40,
    top: 20
  }
}

class AlbumAristResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedItem: null
    }
  }

  render() {
    const handleOpen = (item) => {
      this.setState({
        open: true,
        selectedItem: item
      })
    }

    const handleClose = () => {
      this.setState({open: false})
    }

    const mediaTitle = item => {
      return (
        <div>
          <Highlight search={this.props.searchTerm} matchElement="span">
            {correctChar(item.albumName)}
          </Highlight>
          {item.releaseYear ? `(${item.releaseYear})` : null}
          <span> {item.genre ? `[${item.genre}]` : null}</span>
          <span className='missing-scratched'> {item.missing ? 'missing' : null}</span>
        </div>
      )
    }

    const mediaSecondary = item => {
      return (
        <div style={{height: '100%', whiteSpace: 'initial'}}>
          <Highlight search={this.props.searchTerm} matchElement="span">
            {correctChar(item.artist)}
          </Highlight>
        </div>
      )
    }

    return (
      <div>
        {this.props.results.length ?
          <p className="found">{`Found: ${this.props.results.length}`}</p>
          : null}
        <List style={ {display: 'flex', flexWrap: 'wrap'} }>
          {this.props.results.map((item, i) => {
            item = item.item
            return (
              <div key={ i } style={{margin: '0 auto'}}>
                <ListItem
                  leftAvatar={
                    <Avatar
                      style={ style.avatar }
                      src={ getMediaIcon(item.media) }
                      icon={ <AudioTrack /> }
                      color={ grey50 } /> }
                  primaryText={ mediaTitle(item) }
                  secondaryText={ mediaSecondary(item) }
                  style={ style.list }
                  onClick={ () => handleOpen(item) }>
                  <div style={ style.catalog }>#{item.catalogNumber}</div>
                </ListItem>
              </div>
            )
          })}
        </List>
        {this.state.selectedItem ? (
          <AlbumDialog
            selectedItem={ this.state.selectedItem }
            searchTerm={ this.props.searchTerm }
            open={ this.state.open }
            handleClose={ handleClose } />
        ) : null
        }
      </div>
    )
  }
}

AlbumAristResults.propTypes = {
  results: PropTypes.array,
  searchTerm: PropTypes.string
}

export default AlbumAristResults
