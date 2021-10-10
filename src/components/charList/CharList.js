
import {Component} from 'react';

import './charList.scss';
import MarvelServices from '../../services/MarverServices'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'


class CharList extends Component {

    state = {
        charList: [],
        spinner: true,
        newItemLoading: false,
        error: false,
        offset: 210,
        charEnded: false
    }

    // получение списка героев

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.onRequest();
    }

    onNewItemLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onRequest = (offset) => {
        this.onNewItemLoading();
        this.marvelServices.getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    //установка нового списка героев

    onCharLoaded = (newCharList) => {
        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            spinner: false,
            offset: offset + 9,
            newItemLoading: false,
        }))
    }

    // установка картинки ошибки
    onError = () => {
        this.setState({
            spinner: false,
            error: true,
        })
    }



    renderItem = (arr) => {
        const items = arr.map((item) => {

            let imgStyle = {'objectFit': 'cover'}

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'contain'}
            }

            return (
                <li className="char__item" key={item.id} onClick={() => this.props.onCharSelected(item.id)}>
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


    render() {

        const {charList, spinner, error, offset, newItemLoading} = this.state;

        const items = this.renderItem(charList);

        const showError = error ? <ErrorMessage/> : null
        const showSpinner = spinner ? <Spinner/> : null
        const content = !(spinner || error) ? items : null

        return (
            <div className="char__list">
                {showError}
                {showSpinner}
                {content}    
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;