import {useGetMovieSerie} from "../../hooks"
import {useState} from "react"
import {Dialog} from "primereact/dialog"
import {useTranslation} from "react-i18next"
import {LazyLoadImage} from "react-lazy-load-image-component"

export const ModalTrailer = ({dataId, type, language}) => {
  const [visible, setVisible] = useState(false)
  const {t} = useTranslation()

  const {
    movieSerie: data,
    loading,
    error,
  } = useGetMovieSerie(
    `/${type}/${dataId}/videos?${
      language === "en" ? "language=en-US" : "language=es-ES"
    }`
  )

  const video = loading
    ? ""
    : data?.results[
        data?.results.findIndex(
          (item) =>
            item.type === "trailer" ||
            item.type === "Trailer" ||
            item.type === "Tráiler" ||
            item.type === "tráiler"
        ) || 0
      ]

  return (
    <div className="flex justify-center items-center">
      <button
        role="button"
        className={`${
          data.results?.length > 0
            ? "opacity-1 hover:opacity-80 hover:scale-105 transition-all"
            : "opacity-50"
        } flex items-center  border-2 border-blue-500 rounded-2xl p-5`}
        onClick={() => setVisible(true)}
        disabled={data.results?.length > 0 ? false : true}
      >
        <LazyLoadImage
          src="/play-svg.svg"
          height={25}
          width={25}
          alt="play icon image"
          className="mr-2"
        />
        {t("Watch Now")}
      </button>

      <Dialog
        visible={visible}
        modal={false}
        className="transition-all p-4 w-full  h-[450px] md:w-[1800px] md:h-[780px] mx-auto my-auto"
        onHide={() => {
          if (!visible) return
          setVisible(false)
        }}
      >
       {/*  <lite-youtube
          videoplay={t("Watch Trailer")}
          posterquality="maxresdefault"
          params="controls=0mute=0&enablejsapi=1&origin=https://movie-finder-3000.netlify.app"
          videoid={video?.key}
          videotitle={video?.name}
        ></lite-youtube> */}

         <iframe src={`https://stream8.xyz/showvid.php?cat=${type}&xid=${dataId}`} width="100%" height="100%" allow="fullscreen" frameBorder="0" scrolling="no"></iframe> 

      </Dialog>
    </div>
  )
}
