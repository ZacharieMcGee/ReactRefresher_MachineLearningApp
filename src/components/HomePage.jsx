import { useState, useEffect, useRef } from 'react'

export default function HomePage({ setFile, setAudioStream }) {
  
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [audioChunks, setAudioChunks] = useState([])
  const [duration, setDuration] = useState(0)

  const mediaRecorder = useRef(null)

  const mimeType = 'audio/webm'

  async function startRecording() {
    let tempStream
    console.log('Start recording')

    // get access to users microphone
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      })
      tempStream = streamData

    } catch (error) {
      console.log(error.message)
      return
    }

    setRecordingStatus('recording') 

    // create new Media recorder instance using the stream
    const media = new MediaRecorder(tempStream, {type: mimeType})
    mediaRecorder.current = media

    mediaRecorder.current.start()
    let localAudioChucks = []
    mediaRecorder.current.ondataavailable = (e) => {
      if (typeof e.data === 'undefined') {return}
      if (e.data.size === 0) {return}
      localAudioChucks.push(e.data)
    }

    setAudioChunks(localAudioChucks)
  }

  async function stopRecording() {
    setRecordingStatus('inactive') 
    console.log('Recording stopped')

    mediaRecorder.current.stop()
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, {type: mimeType})
      setAudioStream(audioBlob)
      setAudioChunks([])
      setDuration(0)
    }
  }

  useEffect(() => {
    if (recordingStatus === 'inactive') {return}

    const interval = setInterval(() => {
      setDuration(curr => curr + 1)
    }, 1000)
  
    return () => clearInterval(interval)
  })
  

  return (
    <main className="text-center flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">Free<span className="text-blue-400 bold">Scribe</span></h1>
      <h3 className="font-medium md:text-lg">Record <span className="text-blue-400">&rarr;</span> Transcribe <span className="text-blue-400">&rarr;</span> Translate</h3>

      <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 px-4 py-2 rounded-xl specialBtn">
        <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'Record' : `Stop recording`}</p>
        <div className='flex items-center gap-2'>
          {duration !== 0 && (
            <p className='text-sm'>{duration}s</p>
          )}
          <i className={"fa-solid fa-microphone duration-200 " + (recordingStatus === 'recording' ? 'text-rose-400' : "")}></i>
        </div>
      </button>

      <p className="text-base">Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>Upload <input className='hidden' type='file' accept='.mp3,.wav' onChange={(e) => {
        const tempFile = e.target.files[0]
        setFile(tempFile)
      }}/></label> an mp3 file</p>

      <p className="italic text-slate-400">Free now free forever</p>
    </main>
  )
}
