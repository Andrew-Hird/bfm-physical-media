import Fuse from 'fuse.js/dist/fuse.common'
const catalog = require('../../db/catalog.json');

const threshold = 0.3

export function searchArtist(searchTerm) {
    const options = {
        keys: ['artist'],
        threshold
    }

    const fuse = new Fuse(catalog, options)

    const result = fuse.search(searchTerm)

    // manually restrict results
    return result.slice(0, 50);
}

export function searchAlbum(searchTerm) {
    const options = {
        keys: ['albumName'],
        threshold
    }

    const fuse = new Fuse(catalog, options)

    const result = fuse.search(searchTerm)

    // manually restrict results
    return result.slice(0, 50);
}

export function searchTrack(searchTerm) {
    const options = {
        keys: ['tracks.trackName'],
        includeMatches: true,
        threshold
    }

    const fuse = new Fuse(catalog, options)

    const result = fuse.search(searchTerm)

    // manually restrict results
    return result.slice(0, 50);
}
