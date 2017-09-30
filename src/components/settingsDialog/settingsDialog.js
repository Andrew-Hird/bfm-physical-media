import React from 'react';
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog';
import { List } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { getMediaIcon, correctChar } from '../../helpers'

const styles = {
  checkBox: {
    display: 'inline-block',
    width: 'initial',
    top: 7
  }
}

class SettingsDialog extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        disabled={true}
        onClick={this.props.handleClose}
      />,
    ];

    return (
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={true}
          open={this.props.open}>
          Only actions can close this dialog.

          <List>
          <ol>
                {this.props.album.tracks.map((track, i) => {
                    this.setState({[track.id]: {...track}})
                  return (
                    <li key={ i } className='tracks'>
                      <Checkbox
                        checked={track.gold}
                        onCheck={() => console.log('clicked')}
                        style={styles.checkBox} />
                      {correctChar(track.name)}
                      <span className='missing-scratched'> {track.scratched ? 'scratched' : null}</span>
                    </li>
                  )
                })}
              </ol>
          </List>

        </Dialog>
    );
  }
}

SettingsDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  album: PropTypes.object
}

export default SettingsDialog