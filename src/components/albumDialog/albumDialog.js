import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Highlight from 'react-highlighter'
import { List } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import AudioTrack from 'material-ui/svg-icons/image/audiotrack'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import { grey50 } from 'material-ui/styles/colors'

import SettingsDialog from '../settingsDialog/settingsDialog'

import { getMediaIcon, correctChar } from '../../helpers'
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
    fontSize: 15,
    marginTop: -10,
    marginBottom: -10

  },
  dialogIcon: {
    position: 'absolute',
    width: 40,
    top: 20
  },
  settingsIcon: {
    position: 'absolute',
    top: 5,
    right: 5
  }
}

class AlbumDialog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {

    const handleOpen = (item) => {
      this.setState({
        open: true
      })
    }

    const handleClose = () => {
      this.setState({
        open: false
      })
    }

    const dialogIcon = this.props.selectedItem ? (
      <div>
        <Avatar
          style={ style.avatar }
          src={ getMediaIcon(this.props.selectedItem.media) }
          icon={ <AudioTrack /> }
          color={ grey50 } />
        <div style={ {marginLeft: 50} }>
          <Highlight search={this.props.searchTerm} matchElement="span">
            {correctChar(this.props.selectedItem.name)} 
          </Highlight>
          {this.props.selectedItem.releaseYear ? ` (${this.props.selectedItem.releaseYear})` : null}
          <span> {this.props.selectedItem.genre ? `[${this.props.selectedItem.genre}]` : null}</span>
          <span className='missing-scratched'> {this.props.selectedItem.missing ? 'missing' : null}</span>
          <div style={ style.catalog }>#{this.props.selectedItem.catalog}</div>
        </div>
      </div>
    ) : null

    return (
      <div className='Results'>
        {this.props.selectedItem ? (
          <Dialog
            title={ dialogIcon }
            autoScrollBodyContent
            modal={ false }
            open={ this.props.open }
            onRequestClose={ this.props.handleClose }>
            <Highlight search={this.props.searchTerm} matchElement="span">
              {`${correctChar(this.props.selectedItem.artist)}`}
            </Highlight>
            <List>
              <ol>
                {this.props.selectedItem.tracks.map((track, i) => {
                  return (
                    <li key={ i } className='tracks'>
                    <Highlight search={this.props.searchTerm} matchElement="span">
                      {correctChar(track.name)}
                    </Highlight>
                      <span className='gold'> {track.gold ? 'gold' : null}</span>
                      <span className='missing-scratched'> {track.scratched ? 'scratched' : null}</span>
                    </li>
                  )
                })}
              </ol>
            </List>
            <a href="" onClick={e => e.preventDefault()}>
              <SettingsIcon 
                style={style.settingsIcon}
                onClick={ handleOpen} />
            </a>
            <SettingsDialog
              open={ this.state.open }
              handleClose={ handleClose }
              album={ this.props.selectedItem } />
          </Dialog>
        ) : null
        }
      </div>
    )
  }
}

AlbumDialog.propTypes = {
  selectedItem: PropTypes.object,
  searchTerm: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func
}

export default AlbumDialog
