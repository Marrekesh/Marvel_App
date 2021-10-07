import {Component} from 'react'

import './charInfo.scss';

import MarvelServices from '../../services/MarverServices'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
import Skeleton from '../skeleton/Skeleton'

class CharInfo extends Component {

    state = {
        char: null,
        error: false,
        spinner: false
    }

    marvelService = new MarvelServices();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            spinner: false
        })
    }

    error = () => {
        this.setState({
            spinner: false,
            error: true
        })
    }

    onCharLoading = () => {
        this.setState({
            spinner: true,
        })
    }

    updateChar = () => {
        const {charId} = this.props

        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.error)
    }

    render() {

        const {char, error, spinner} = this.state

        const skeleton = char || spinner || error ? null : <Skeleton/>;
        const showError = error ? <ErrorMessage/> : null
        const showSpinner = spinner ? <Spinner/> : null
        const content = !(spinner || error || !char) ? <View char={char}/> : null

        return (
            <div className="char__info">
                {skeleton}
                {showError}
                {showSpinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    
    let imgStyle = {'objectFit': 'cover'}

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'}
    }
    return (

        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        if (i > 8) return;
                        return (
                            <li key={i} className="char__comics-item" >
                                {item.name}
                            </li>  
                        )
                    })
                }
            </ul>
        </>
    )
  
}

export default CharInfo;