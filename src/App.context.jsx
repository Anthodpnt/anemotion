import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showVideoSource, setShowVideoSource] = useState(null)
  const [showVideoCaption, setShowVideoCaption] = useState(null)

  return (
    <AppContext.Provider
      value={{
        showVideoModal,
        setShowVideoModal,
        showVideoSource,
        setShowVideoSource,
        showVideoCaption,
        setShowVideoCaption
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
