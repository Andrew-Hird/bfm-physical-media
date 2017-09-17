import { gql } from 'react-apollo'

export const findAlbumByArtist = (client, searchTerm) => {
  return client.query({
    query: gql`query {
                  allAlbums(filter: {
                      artist_contains: "${searchTerm.toLowerCase()}"
                    }) {
                        id
                        catalog
                        name
                        artist
                        media
                        releaseYear
                        genre
                        missing
                        tracks {
                            id
                            name
                            trackNumber
                            scratched
                            gold
                        }
                    }
                }`
  })
}

export const findAlbumByName = (client, searchTerm) => {
  return client.query({
    query: gql`query {
                  allAlbums(filter: {
                      name_contains: "${searchTerm.toLowerCase()}"
                    }) {
                        id
                        catalog
                        name
                        artist
                        media
                        releaseYear
                        genre
                        missing
                        tracks {
                            id
                            name
                            trackNumber
                            scratched
                            gold
                        }
                    }
                }`
  })
}
export const findTrack = (client, searchTerm) => {
  return client.query({
    query: gql`query {
        allTracks(filter: {name_contains: "${searchTerm.toLowerCase()}"}) {
          id
          name
          trackNumber
          gold
          scratched
          album {
            id
            catalog
            name
            artist
            media
            genre
            missing
            tracks {
              id
              name
              trackNumber
              scratched
              gold
            }
          }
        }
      }`
  })
}
