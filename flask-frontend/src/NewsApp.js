import Navbar from './components/Navbar';
import React, {useState} from 'react'
import News from './components/News';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import styles from './NewsCSS.css'; 


const NewsApp = () => {

  // const apiKey = "dbe57b028aeb41e285a226a94865f7a7";
  // const apiKey = "nXyTBlNNnqPNMNEuPdIXOmnH98Bfmo1UZBPuZFus";
  const apiKey = "aeccadb12f874bb1bdce5291e4526175";
  // const apiKey: "02984690e6614c71a92602ebcd70abdf";
  // const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  const progressFunc = () => {
    setProgress(progress)
  }
  

    return (
      <div className={styles}>
        <Router>
          <Navbar/>
          <LoadingBar
            height={5}
            color='#f11946'
            progress={progress}
          />
          <Switch>
            <Route exact path="/">
              <News setProgress={progressFunc} key="general" apiKey={apiKey} pageSize={6} country="in" category="general"/>
            </Route>
            <Route exact path="/business">
              <News setProgress={progressFunc} key="business" apiKey={apiKey} pageSize={6} country="in" category="business"/>
            </Route>
            <Route exact path="/entertainment">
              <News setProgress={progressFunc} key="entertainment" apiKey={apiKey} pageSize={6} country="in" category="entertainment"/>
            </Route>
            <Route exact path="/health">
              <News setProgress={progressFunc} key="health" apiKey={apiKey} pageSize={6} country="in" category="health"/>
            </Route>
            <Route exact path="/science">
              <News setProgress={progressFunc} key="science" apiKey={apiKey} pageSize={6} country="in" category="science"/>
            </Route>
            <Route exact path="/sports">
              <News setProgress={progressFunc} key="sports" apiKey={apiKey} pageSize={6} country="in" category="sports"/>
            </Route>
            <Route exact path="/technology">
              <News setProgress={progressFunc} key="technology" apiKey={apiKey} pageSize={6} country="in" category="technology"/>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  
}

export default  NewsApp;