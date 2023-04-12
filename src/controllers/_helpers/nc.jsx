import NC from 'next-connect'

export default function nc() {
  return NC({
    onError: (err, req, res) => {
    console.log(err) // eslint-disable-line
      res.status(500).end(err)
    },
    onNoMatch: (req, res) => {
      res.status(404).end('Page is not found')
    }
  })
}
