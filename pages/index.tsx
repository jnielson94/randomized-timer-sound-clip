import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

const Home: NextPage = () => {
  const [minLength, setMinLength] = useState('10')
  const [maxLength, setMaxLength] = useState('60')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const [delay, setDelay] = useState<number | null>(null)
  useEffect(() => {
    if (delay && delay > 0) {
      const id = setTimeout(() => {
        setDelay(delay - 1)
      }, 950)
      return () => clearTimeout(id)
    } else if (delay === 0) {
      setDelay(null)
    }
  }, [delay])
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Randomized Timer Sound Clip App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold">Randomized Timer Sound Clip App</h1>
        <audio src="/catmeow.mp3" ref={audioRef}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <label className="mt-6 w-96 rounded-xl border p-6 text-center">
            Minimum timer length (seconds)
            <input
              type="text"
              value={minLength}
              onChange={(event) => {
                setMinLength(event.target.value)
              }}
            />
          </label>
          <label className="mt-6 w-96 rounded-xl border p-6 text-center">
            Maximum timer length (seconds)
            <input
              type="text"
              value={maxLength}
              onChange={(event) => {
                setMaxLength(event.target.value)
              }}
            />
          </label>
        </div>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <div className="mt-6 w-96 rounded-xl border p-6 text-center">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                const min = parseInt(minLength, 10)
                const max = parseInt(maxLength, 10)
                if (min > 0 && max > 0 && max > min) {
                  const delay =
                    Math.floor(Math.random() * (max - min) + min) * 1000

                  console.log(delay)
                  if (timeoutRef.current !== null) {
                    clearTimeout(timeoutRef.current)
                  }
                  setDelay(delay / 1000)
                  const id = setTimeout(() => {
                    console.log('Play!')
                    console.log(audioRef.current)
                    audioRef?.current?.play()
                  }, delay)
                  timeoutRef.current = id as unknown as number
                }
              }}
            >
              Start Turn
            </button>
          </div>

          <p className="mt-6 w-96 rounded-xl border p-6 text-center">
            Approx. Time Remaining: {delay ?? 0}
          </p>
        </div>
      </main>
    </div>
  )
}

export default Home
