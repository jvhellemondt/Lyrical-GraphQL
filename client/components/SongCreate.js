import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, hashHistory } from 'react-router'

import fetchSongs from '../queries/fetchSongs'

class SongCreate extends Component {
  constructor(props) {
    super(props)

    this.state = { title: '' }
  }

  onSubmit(event) {
    event.preventDefault()

    this.props
      .mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query: fetchSongs }],
      })
      .then(() => hashHistory.push('/'))
      // .catch(() => {})
  }

  render() {
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>Create a new song!</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song title:</label>
          <input
            onChange={({ target }) => this.setState({ title: target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const addSong = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`

export default graphql(addSong)(SongCreate)
