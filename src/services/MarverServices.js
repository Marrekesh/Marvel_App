import {useHttp} from '../hooks/http.hooks'

const useMarvelServices = () => {

    const {spinner, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';

    const _apiKey = 'apikey=16eba524d48c0b3041251c9bf62ca035';
    const _charStart = 210;


     const getAllCharacters = async (charList = _charStart) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${charList}&${_apiKey}`)
        return res.data.results.map(_transformChar)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformChar(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformChar = (char) => {
        return {
            id: char.id,
            name: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    return {spinner, request, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic}
}

export default useMarvelServices;