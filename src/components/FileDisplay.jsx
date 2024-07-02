export default function FileDisplay({
  file, 
  audio,
  handleAudioReset
}) {
  return (
    <main className="text-center flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center pb-20 w-fit max-w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">Your <span className="text-blue-400 bold">File</span></h1>

      <div className="mx-auto flex flex-col text-left my-4">
        <h3 className="font-semibold">Name</h3>
        <p>{file.name}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button onClick={handleAudioReset} className="text-slate-400 hover:text-blue-600 duration-200">Reset</button>
        <button className="flex items-center gap-2 text-slate-400 specialBtn p-3 font-medium py-2 rounded-lg">
          <p>Transcribe</p>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  )
}
