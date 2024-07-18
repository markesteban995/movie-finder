import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {useGetMovieSerie} from "../hooks/"
import {useCustomFunctions} from "../hooks"

export const ItemGridSearch = ({movieSerie}) => {
  let movieOrSerie = movieSerie.media_type === "movie" ? "movie" : "serie"
  let titleOrName = movieSerie.media_type === "movie" ? "title" : "name"
  let releasedOrAired =
    movieSerie.media_type === "movie" ? "release_date" : "first_air_date"

  const {colorScore} = useCustomFunctions()

  return (
    <div className="flex max-w-sm w-full bg-slate-900 shadow-md rounded-lg overflow-hidden mx-auto">
      <Link
        to={`/${movieOrSerie}/${movieSerie[titleOrName]
          .toLowerCase()
          .split(" ")
          .join("-")}/${movieSerie.id}`}
      >
        <div
          className="overflow-hidden rounded-xl relative text-white h-full"
          data-movie-id={movieSerie.id}
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-[#1d273d2b] to-transparent" />

          <div className="relative cursor-pointer group z-10 p-5 pb-0">
            <div className="poster__info align-self-end w-full">
              <div className="h-64 md:h-64" />
              <div className="space-y-3">
                <div className="flex flex-col space-y-2 inner">
                  <h3 className="text-xl font-bold text-white min-h-[56px]">
                    {movieSerie[titleOrName]}
                  </h3>
                </div>
                <div className="flex justify-around mb-0 pb-0">
                  <div className="relative text-sm">
                    <div className="popularity">{movieSerie.popularity}</div>
                    <div className="text-sm text-gray-400">Popularity:</div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="text-sm">{movieSerie[releasedOrAired]}</div>
                    <div className="text-xs text-gray-400">Release date:</div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="text-sm">
                      {movieSerie.media_type.substr(0, 1).toUpperCase() +
                        movieSerie.media_type.substr(1)}
                    </div>
                    <div className="text-xs text-gray-400">Media Type:</div>
                  </div>
                </div>
                <div className="flex flex-col overview">
                  {/* <div className="flex flex-col" />
                  <div className="text-xs text-gray-400 mb-2">Overview:</div> */}
                  <p className="text-xs text-gray-100 mb-6">
                    {movieSerie?.overview?.substr(0, 120) + "..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <img
            alt={`${movieSerie[titleOrName]}`}
            className="absolute inset-0 transform w-full -translate-y-4"
            src={`https://image.tmdb.org/t/p/w342/${movieSerie.poster_path}`}
            style={{maskImage: "linear-gradient(black 30%, transparent)"}}
          />

          {/* <div className="flex justify-center flex-row relative pb-10 space-x-4 z-10 ">
            <div className=" w-20">
              <div
                className={`flex flex-col border rounded-md p-1 ${colorScore(
                  movieSerie.vote_average?.toFixed(1)
                )} w-full`}
              >
                <div className=" text-3xl text-center font-bold text-black">
                  {movieSerie.vote_average?.toFixed(1)}
                </div>
                <div className=" text-center text-black">moviedb</div>
                <div className="text-xs text-black">
                  {movieSerie.vote_count} votes
                </div>
              </div>
            </div>
            <button className="btn ">More Info</button>
          </div> */}
        </div>
      </Link>
    </div>
  )
}
