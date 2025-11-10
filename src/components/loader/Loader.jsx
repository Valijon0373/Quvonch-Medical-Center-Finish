import { RingLoader } from "react-spinners"

// Loader.jsx - RingLoader bilan
export default function Loader({ fullScreen = false, size = 60 }) {
  const loader = (
    <div className="flex justify-center items-center">
      <RingLoader color="#0905ff" size={size} />
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-90 z-50">
        {loader}
      </div>
    )
  }

  return loader
}
