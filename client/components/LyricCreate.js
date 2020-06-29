import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LyricCreate extends Component {
  constructor(props) {
    super(props)

    this.state = { content: '' }
  }

  onSubmit(event) {
    event.preventDefault()

    this.props
      .mutate({
        variables: {
          content: this.state.content,
          id: this.props.songId,
        },
      })
      .then(() => this.setState({ content: '' }))
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a lyric:</label>
        <input
          value={this.state.content}
          onChange={({ target }) => this.setState({ content: target.value })}
        />
      </form>
    )
  }
}

const addLyricToSong = gql`
  mutation AddLyricToSong($id: ID!, $content: String!) {
    addLyricToSong(songId: $id, content: $content) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`

export default graphql(addLyricToSong)(LyricCreate)
