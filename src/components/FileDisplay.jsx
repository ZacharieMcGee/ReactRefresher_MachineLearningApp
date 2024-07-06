export default function FileDisplay({
  file, 
  audioStream,
  handleAudioReset,
  handleFormSubmission
}) {
  return (
    <main className="text-center flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center pb-20 w-72 sm:w-96 max-w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">Your <span className="text-blue-400 bold">File</span></h1>

      <div className="flex flex-col text-left my-4">
        <h3 className="font-semibold">Name</h3>
        <p>{file ? file.name : 'Custom audio'}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button onClick={handleAudioReset} className="text-slate-400 hover:text-blue-600 duration-200">Reset</button>
        <button onClick={handleFormSubmission} className="flex items-center gap-2 text-slate-400 specialBtn p-3 font-medium py-2 rounded-lg">
          <p>Transcribe</p>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  )
}
