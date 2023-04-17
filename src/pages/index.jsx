import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const targetRef = useRef(null)
  const [source, setSource] = useState('')

  useEffect(() => {
    async function fetchData() {
      const url = `/api/news?source=${source}&page=${page}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.articles) {
        const articlesWithImages = data.articles.filter((article) => article.urlToImage)
        setArticles((prevArticles) => [...prevArticles, ...articlesWithImages])
      }
    }

    setArticles([])
    setPage(1)
    if (source) {
      fetchData()
    }
  }, [source, page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      { root: targetRef.current }
    )

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }
  }, [targetRef])

  function handleSourceClick(sourceId) {
    setSource(sourceId)
  }

  const newsselect = () => {
    if (!source) {
      return <h2 className={`${styles.loadingMessage} text-center`}>Select a news outlet provider to view their articles.</h2>
    }

    if (articles && articles.length === 0) {
      return <h2 className={`${styles.loadingMessage} text-center`}>Loading articles...</h2>
    }

    return (
      <ul className={`${styles.articlesList}`}>
        {articles.map((article, index) => (
          <li
            key={article.url}
            className={`${styles.articleItem} ${
              index % 3 === 2 ? styles.lastInRow : ''
            }`}
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              {article.urlToImage && (
                <img // eslint-disable-line
                  src={article.urlToImage}
                  alt={article.title}
                  className={`${styles.articleImage}`}
                  style={{ marginTop: '20px' }}
                />
              )}
              <h5 style={{ textAlign: 'center' }}>{article.title}</h5>
            </a>
          </li>
        ))}

        <li ref={targetRef} />
      </ul>
    )
  }

  return (
    <div>
      <h1 className="text-center my-5 custom-font" style={{ color: 'white' }}>
        World Trending News
      </h1>

      <nav className={`d-flex justify-content-center ${styles.navBar}`}>
        <button type="button" onClick={() => handleSourceClick('abc-news')} className={`${styles.navButton} custom-font button-hover`}>
          ABC News
        </button>
        <button type="button" onClick={() => handleSourceClick('bbc-news')} className={`${styles.navButton} custom-font button-hover`}>
          BBC News
        </button>
        <button type="button" onClick={() => handleSourceClick('associated-press')} className={`${styles.navButton} custom-font button-hover`}>
          Associated Press
        </button>
        <button type="button" onClick={() => handleSourceClick('business-insider')} className={`${styles.navButton} custom-font button-hover`}>
          Business Insider
        </button>
        <button type="button" onClick={() => handleSourceClick('the-wall-street-journal')} className={`${styles.navButton} custom-font button-hover`}>
          The Wall Street Journal
        </button>
        <button type="button" onClick={() => handleSourceClick('cbs-news')} className={`${styles.navButton} custom-font button-hover`}>
          CBS
        </button>
        <button type="button" onClick={() => handleSourceClick('cnn')} className={`${styles.navButton} custom-font button-hover`}>
          CNN
        </button>
        <button type="button" onClick={() => handleSourceClick('ign')} className={`${styles.navButton} custom-font button-hover`}>
          IGN
        </button>
      </nav>

      <div className="container border" style={{ backgroundColor: 'white' }}>
        {newsselect()}
      </div>

    </div>
  )
}
