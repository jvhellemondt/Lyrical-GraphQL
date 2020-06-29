import React, { Component } from 'react'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import fetchSongs from '../queries/fetchSongs'

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({ variables: { id } })
      .then(() => this.props.data.refetch())
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          <Link to={`/songs/${id}`}>{title}</Link>
          <i
            className='material-icons red-text'
            onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      )
    })
  }

  render() {
    if (this.props.data.loading) return <div>Loading...</div>
    return (
      <div>
        <ul className='collection'>{this.renderSongs()}</ul>
        <Link to='/songs/new' className='btn-floating btn-large green right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    )
  }
}

const deleteSong = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default graphql(deleteSong)(graphql(fetchSongs)(SongList))
