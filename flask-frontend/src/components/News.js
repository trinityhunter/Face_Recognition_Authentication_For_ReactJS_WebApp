import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    

    const updateNews = async() => {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json()
        props.setProgress(70);
        console.log(parsedData);
        
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }    

    useEffect(() => {

        document.title = `NewsPanda - ${props.category.charAt(0).toUpperCase()+props.category.slice(1, props.category.length)}`
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {

        // setPage(page+1);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData); 
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    }
 
        return (
            <>
                <h1 className="text-center" style={{marginTop: "80px"}}>{`ScoopPanda - Top ${props.category.charAt(0).toUpperCase()+props.category.slice(1, props.category.length)} Headlines`}</h1>

                {loading && <Spinner/>}
                <InfiniteScroll 
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                >

                <div className="container" style={{marginTop: "15px"}}>
                    <div className="row"> 
                    {articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div> 
                    })} 
                    </div> 
                </div>


                </InfiniteScroll>
            </>
        )
    
}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
    apiKey: "02984690e6614c71a92602ebcd70abdf" //My apiKey
    // apiKey: "dbe57b028aeb41e285a226a94865f7a7" //Spare apiKey
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string
}

export default News

//Original Link-

// let url = `https://newsapi.org/v2/top-headlines?country=${props.country}us&apiKey=${props.apiKey}02984690e6614c71a92602ebcd70abdf&page=1&pageSize=&{props.pageSize}`;



//Spare Link-

//         let url = `https://api.thenewsapi.com/v1/news/top?api_token=nXyTBlNNnqPNMNEuPdIXOmnH98Bfmo1UZBPuZFus&page=1&pageSize=&{props.pageSize}`;

//Extra's apiKey-

// dbe57b028aeb41e285a226a94865f7a7