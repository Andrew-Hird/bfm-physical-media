import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import AudioTrack from 'material-ui/svg-icons/image/audiotrack'
import { grey50 } from 'material-ui/styles/colors'

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
    fontSize: 18,
    marginBottom: 5
  },
  dialogIcon: {
    position: 'absolute',
    width: 40,
    top: 20
  }
}

class AlbumDialog extends Component {
  render() {
    const dialogIcon = this.props.selectedItem ? (
      <div>
        <Avatar
          style={ style.avatar }
          src={ getMediaIcon(this.props.selectedItem.media) }
          icon={ <AudioTrack /> }
          color={ grey50 } />
        <div style={ {marginLeft: 50} }>
          <span>#{this.props.selectedItem.catalog} - </span>
          <i>{correctChar(this.props.selectedItem.name)} {this.props.selectedItem.releaseYear ? `(${this.props.selectedItem.releaseYear})` : null}</i>
          <span> {this.props.selectedItem.genre ? `[${this.props.selectedItem.genre}]` : null}</span>
          <span className='missing-scratched'> {this.props.selectedItem.missing ? 'missing' : null}</span>
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
            {`${correctChar(this.props.selectedItem.artist)}`}
            <List>
              <ol>
                {this.props.selectedItem.tracks.map((track, i) => {
                  return (
                    <li key={ i } className='tracks'>
                      {correctChar(track.name)}
                      <span className='gold'> {track.gold ? 'gold' : null}</span>
                      <span className='missing-scratched'> {track.scratched ? 'scratched' : null}</span>
                    </li>
                  )
                })}
              </ol>
            </List>
          </Dialog>
        ) : null
        }
      </div>
    )
  }
}

AlbumDialog.propTypes = {
  selectedItem: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func
}

export default AlbumDialog