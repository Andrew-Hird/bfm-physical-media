import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    margin: '0 auto',
    textAlign: 'left'
  },
  avatar: {
    backgroundColor: 'none',
    position: 'absolute',
    width: 40,
    top: 20
  },
  catalog: {
    fontSize: 18,
    marginBottom: 5
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
          <i>{correctChar(item.name)} {item.releaseYear ? `(${item.releaseYear})` : null} </i>
          <span> {item.genre ? `[${item.genre}]` : null}</span>
          <span className='missing-scratched'> {item.missing ? 'missing' : null}</span>
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
            return (
              <ListItem
                key={ i }
                leftAvatar={
                  <Avatar
                    style={ style.avatar }
                    src={ getMediaIcon(item.media) }
                    icon={ <AudioTrack /> }
                    color={ grey50 } /> }
                primaryText={ mediaTitle(item) }
                secondaryText={ correctChar(item.artist) }
                style={ style.list }
                onClick={ () => handleOpen(item) }>
                <div style={ style.catalog }>#{item.catalog}</div>
              </ListItem>
            )
          })}
        </List>
        {this.state.selectedItem ? (
          <AlbumDialog
            selectedItem={ this.state.selectedItem }
            open={ this.state.open }
            handleClose={ handleClose } />
        ) : null
        }
      </div>
    )
  }
}

AlbumAristResults.propTypes = {
  results: PropTypes.array
}

export default AlbumAristResults
