
import {useState, useEffect} from 'react';

import './charList.scss';
import useMarvelServices from '../../services/MarverServices'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'


const CharList = (props) => {


    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    // const [charEnded, setCharEnded] = useState(210)

    const {spinner, error, getAllCharacters} = useMarvelServices();

    // получение списка героев

    useEffect(() => {
        onRequest(offset, true);
    },[])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharLoaded)
    }

    //установка нового списка героев

    const onCharLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList])
        setOffset(offset => offset + 9)
        setNewItemLoading(false)
    }



    function renderItem(arr)  {
        const items = arr.map((item) => {

            let imgStyle = {'objectFit': 'cover'}

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'contain'}
            }

            return (
                <li className="char__item" key={item.id} onClick={() => props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItem(charList);

    const showError = error ? <ErrorMessage/> : null
    const showSpinner = spinner && ! !newItemLoading ? <Spinner/> : null

    return (
        <div className="char__list">
            {showError}
            {showSpinner}
            {items}    
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default CharList;