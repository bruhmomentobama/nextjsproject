export default async function APINews(req, res) {
  const { query: { source, page } } = req
  let url = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${process.env.API_KEY}&pageSize=20&page=${page}`
  if (source) {
    url += `&sources=${source}`
  }
  const response = await fetch(url)
  const data = await response.json()
  res.json(data)
}
