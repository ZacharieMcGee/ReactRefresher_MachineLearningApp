import { useState } from "react"

import Header from "./components/Header"
import HomePage from "./components/HomePage"
import FileDisplay from "./components/FileDisplay"

function App() {
  const [file, setFile] = useState(null) // audio file
  const [audioStream, setAudioStream] = useState(null) // live recording 

  const isAudioAvailable = file || audioStream

  function handleAudioReset() {
    setFile(null)
    setAudioStream(null)
  }  

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {isAudioAvailable ? (
          <FileDisplay 
            file={file}
            audioStream={audioStream}
            handleAudioReset={handleAudioReset}
          />
        ) : (
          <HomePage 
            setFile={setFile} 
            setAudioStream={setAudioStream} 
          />
        )}
      </section>

      <h1></h1>
      <footer></footer>
    </div>
  )
}

export default App
