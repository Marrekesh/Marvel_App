import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useMarvelServices from '../../services/MarverServices';
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([])
    const [offset, setOffset] = useState(0)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [comicsEnded, setComicsEnded] = useState(false);

    const {spinner, error, getAllComics} = useMarvelServices();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicListLoaded)
    }

    const onComicListLoaded = (newList) => {
        let ended = false;
        if (newList.length < 8) {
            ended = true;
        }

        setComicsList(comicList => [...comicList, ...newList]);
        setNewItemLoading(false)
        setOffset(offset + 8)
        setComicsEnded(ended);

    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const content = renderItems(comicsList)

    const showError = error ? <ErrorMessage/> : null;
    const shwowLoading = spinner && !newItemLoading ? <Spinner/> : null

    return (
        <div className="comics__list">
            
            {showError}
            {shwowLoading}
            {content}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display' : comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;