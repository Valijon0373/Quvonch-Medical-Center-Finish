import { LifeLine } from "react-loading-indicators"

export default function Loader({ fullScreen = false }) {
  const loader = (
    <div className="flex justify-center items-center">
      <LifeLine color="#008cff" size="medium" text="" textColor="" />
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
