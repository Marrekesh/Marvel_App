
import {Component} from 'react';

import './charList.scss';
import MarvelServices from '../../services/MarverServices'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'



class CharList extends Component {

    state = {
        charList: [],
        spinner: true,
        error: false
    }

    //установка нового списка героев
    onCharLoaded = (charList) => {
        this.setState({
            charList,
            spinner: false
        })
    }

    // установка картинки ошибки
    onError = () => {
        this.setState({
            spinner: false,
            error: true,
        })
    }

    // получение списка героев

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.marvelServices.getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
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

        const {charList, spinner, error} = this.state;

        const items = this.renderItem(charList);

        const showError = error ? <ErrorMessage/> : null
        const showSpinner = spinner ? <Spinner/> : null
        const content = !(spinner || error) ? items : null

        return (
            <div className="char__list">
                {showError}
                {showSpinner}
                {content}    
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;