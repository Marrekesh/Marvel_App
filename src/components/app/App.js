import {useState} from 'react'
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList"
import AppBaner from "../appBanner/AppBanner"
import { BrowserRouter as Router, Route } from 'react-router-dom';

import decoration from '../../resources/img/vision.png';
const App = () => {


    const [charSelected, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Route path="/">
                        <RandomChar/>
                        <div className="char__content">
                            <CharList onCharSelected={onCharSelected}/>
                            <CharInfo charId={charSelected}/>
                        </div>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </Route>
                    <Route path="/comics">
                        <AppBaner/>
                        <ComicsList/>
                    </Route>
                </main>
            </div>
        </Router>
    )
}

export default App;