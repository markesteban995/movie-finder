import {useGetMovieSerie} from "../../hooks"
import {useState} from "react"
import {Dialog} from "primereact/dialog"
import {useTranslation} from "react-i18next"
import {LazyLoadImage} from "react-lazy-load-image-component"

export const ModalTrailer = ({dataId, type, language}) => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
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
    <div className="flex justify-center items-center gap-2">
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
        {t("Server 1")}
      </button>
      {type==="movie" &&
      <button
        role="button"
        className={`${
          data.results?.length > 0
            ? "opacity-1 hover:opacity-80 hover:scale-105 transition-all"
            : "opacity-50"
        } flex items-center  border-2 border-blue-500 rounded-2xl p-5`}
        onClick={() => setVisible2(true)}
        disabled={data.results?.length > 0 ? false : true}
      >
        <LazyLoadImage
          src="/play-svg.svg"
          height={25}
          width={25}
          alt="play icon image"
          className="mr-2"
        />
        {t("Server 2")}
      </button>
      } 
      <Dialog
        visible={visible}
        modal={false}
        className="transition-all p-4 w-full  h-[450px] md:w-[1800px] md:h-[780px] mx-auto my-auto"
        onHide={() => {
          if (!visible) return
          setVisible(false)
        }}
      >
           <iframe src={`https://stream8.xyz/showvid.php?cat=${type}&xid=${dataId}`} width="100%" height="100%" allow="fullscreen" frameBorder="0" scrolling="no"></iframe> 

      </Dialog>
      <Dialog
        visible={visible2}
        modal={false}
        className="transition-all p-4 w-full  h-[450px] md:w-[1800px] md:h-[780px] mx-auto my-auto"
        onHide={() => {
          if (!visible2) return
          setVisible2(false)
        }}
      >
           <iframe src={`https://stream8.xyz/showvid2.php?xid=${dataId}`} width="100%" height="100%" allow="fullscreen" frameBorder="0" scrolling="no"></iframe> 

      </Dialog>
    </div>
  )
}
