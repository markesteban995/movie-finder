import {useCustomFunctions} from "../../hooks/useCustomFunctions"
import {ModalTrailer} from "../modal/ModalTrailer"

export const StatsMovie = ({data}) => {
  const {numberFormater, time_convert, colorScore} = useCustomFunctions()
  return (
    <div className="mx-auto max-w-2xl lg:max-w-none">
      <div className="flex justify-center md:justify-start items-center ">
        <div
          className={`border rounded-md p-3 m-2 w-[100px] ${colorScore(
            data.vote_average?.toFixed(1)
          )}`}
        >
          <div className=" text-3xl text-center font-bold text-black">
            {data.vote_average?.toFixed(1)}
          </div>
          <div className=" text-center text-black">T M D B</div>
        </div>
        <div className="m-2">
          <ModalTrailer dataId={data.id} type={"movie"} />
        </div>
      </div>
      <div className=" mt-5">
        {data.genres.map((genres) => {
          return (
            <span
              key={genres.id}
              className="bg-blue-900 text-white inline-block text-center px-2 py-1 rounded text-md font-semibold m-2"
            >
              {genres.name}
            </span>
          )
        })}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl text-center md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">
            {data.status}
          </dt>
          <dd className="order-first text-1xl lg:text-2xl  md:text-2xl  font-semibold tracking-tight text-blue-500">
            Status
          </dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">
            {data.release_date}
          </dt>
          <dd className="order-first text-1xl lg:text-2xl  md:text-2xl  font-semibold tracking-tight text-blue-500">
            Release Date
          </dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">
            {numberFormater(data.budget)}
          </dt>
          <dd className="order-first text-2xl font-semibold tracking-tight text-blue-500">
            Budget
          </dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">
            {numberFormater(data.revenue)}
          </dt>
          <dd className="order-first text-2xl font-semibold tracking-tight text-blue-500">
            Revenue
          </dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">
            {data.popularity}
          </dt>
          <dd className="order-first text-2xl font-semibold tracking-tight text-blue-500">
            Popularity
          </dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">
            {time_convert(data.runtime)}
          </dt>
          <dd className="order-first text-2xl font-semibold tracking-tight text-blue-500">
            Runtime
          </dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">
            {data.tagline}
          </dt>
          <dd className="order-first text-2xl font-semibold tracking-tight text-blue-500">
            Tagline
          </dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">
            {data.vote_count}
          </dt>
          <dd className="order-first text-2xl font-semibold tracking-tight text-blue-500">
            Vote Count
          </dd>
        </div>
      </dl>
    </div>
  )
}