import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const targetRef = useRef(null)
  const [country, setCountry] = useState('')

  useEffect(() => {
    async function fetchData() {
      const url = `https://content.guardianapis.com/world/${country}?api-key=35930e1c-07e6-49e2-a899-304bfe7015f4&show-fields=thumbnail`

      const response = await fetch(url)
      const data = await response.json()
      setArticles(data.response.results)
    }
    fetchData()
  }, [country])

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

  function handleCountryClick(country) {
    const encodedCountry = country.replace(' ', '%20')
    setCountry(encodedCountry)
    setPage(1)
  }

  return (
    <div>
      <h1 className="text-center my-5">The Guardian</h1>
      <nav className={`${styles.navBar}`}>
        <button type="button" onClick={() => handleCountryClick('Argentina')}>Argentina</button>
        <button type="button" onClick={() => handleCountryClick('Chile')}>Chile</button>
        <button type="button" onClick={() => handleCountryClick('China')}>China</button>
        <button type="button" onClick={() => handleCountryClick('United Kingdom')}>United Kingdom</button>
      </nav>
      {articles && articles.length > 0 ? (
        <ul className={`${styles.articlesList}`}>
          {articles.map((article, index) => (
            <li
              key={article.id}
              className={`${styles.articleItem} ${index % 3 === 2 ? styles.lastInRow : ''}`}
            >
              <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
                {article.fields?.thumbnail && (
                  <img src={article.fields.thumbnail} alt={article.webTitle} className={`${styles.articleImage}`} />
                )}
                <h5>{article.webTitle}</h5>
              </a>
            </li>
          ))}
          <li ref={targetRef} />
        </ul>
      ) : (
        <p>Loading articles...</p>
      )}
    </div>
  )
}
