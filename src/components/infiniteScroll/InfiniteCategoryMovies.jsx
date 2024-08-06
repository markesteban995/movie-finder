import InfiniteScroll from "react-infinite-scroll-component"
import {useEffect, useState} from "react"
import {Loading, MovieCategoryGrid} from "../../components"
import {Layout} from "../../layout/Layout"
import axios from "axios"
const apiBearer = import.meta.env.VITE_API_BEARER

export const InfiniteCategoryMovies = ({media_type, title, id}) => {
  const [hasMore, setHasMore] = useState(true)
  const [index, setIndex] = useState(2)
  const [items, setItems] = useState([])
  const [loadingMessage, setLoadingMessage] = useState(
    <div className="flex bg-slate-900 justify-center items-center h-screen">
      <span className="loader"></span>
    </div>
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${media_type}`, {
        headers: {
          Authorization: apiBearer,
        },
      })
      .then((res) => {
        setItems(res.data.results)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const fetchMoreData = () => {
    if (index <= 300) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${media_type}?page=${index}`, {
          headers: {
            Authorization: apiBearer,
          },
        })
        .then((res) => {
          setItems((prevItems) => [...prevItems, ...res.data.results])
          res.data.results.length > 0 ? setHasMore(true) : setHasMore(false)
        })
        .catch((err) => console.log(err))
      setIndex((prevIndex) => prevIndex + 1)
    } else {
      setHasMore(false)
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={loadingMessage}
        >
          <Layout>
            <h2 className="text-3xl md:text-4xl pt-8 md:pt-5 p-5 text-center md:text-left font-bold text-[#3b82f6]">
              {title[0].toUpperCase() + title.substring(1)} movies
            </h2>
            <MovieCategoryGrid movieData={items} idCat={id} />
          </Layout>
        </InfiniteScroll>
      )}
    </>
  )
}
