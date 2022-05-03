import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGear, faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import TypeAnimation from 'react-type-animation';

const setDarkTheme = () => {
  document.documentElement.classList.remove('light')
  document.documentElement.classList.add('dark');
  localStorage.theme = 'dark';
}

const setLightTheme = () => {
  document.documentElement.classList.remove('dark')
  document.documentElement.classList.add('light');
  localStorage.theme = 'light';
}

const setOsTheme = () => {
  localStorage.removeItem('theme')
  if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggle = () => {
  if (typeof window !== 'undefined') {

    if (!('theme' in localStorage)) { // OS override
      setDarkTheme()
    } else if (localStorage.theme === 'dark') { // Dark mode
      setLightTheme()
    } else if (localStorage.theme === 'light') { // Light mode
      setOsTheme()
    }

  }
}

/**
 * Things that do things
 */
const getIcon = () => {
  if (typeof window !== 'undefined') {
    const theme = localStorage.theme
    if (!theme) {
      return <FontAwesomeIcon className="text-blue-600 h-10" icon={faGear}/>
    } else if (theme === 'dark') {
      return <FontAwesomeIcon className="text-blue-600 h-10" icon={faMoon}/>
    } else if (theme === 'light') {
      return <FontAwesomeIcon className="text-blue-600 h-10" icon={faSun}/>
    }
  }
  return <FontAwesomeIcon className="text-blue-600 h-10" icon={faGear}/>
}

const Home: NextPage = () => {

  if (typeof window !== 'undefined') {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const [icon, setIcon] = useState(getIcon());

  return (
        <div
            className="text-black dark:text-blue-900 flex min-h-screen flex-col items-center justify-center">
          <Head>
            <title>Euan Caskie</title>
            <link rel="icon" href="/favicon.ico"/>
          </Head>

          <main className="custom flex w-full h-full flex-1 flex-col items-center justify-center px-20 text-center">
            {/*<button className="border-2 border-blue-600 rounded p-3" onClick={() => {*/}
            {/*  toggle();*/}
            {/*  setIcon(getIcon());*/}
            {/*}}>*/}
            {/*  {icon}*/}
            {/*</button>*/}

          <h1 className="text-6xl font-bold">
            Some of my favourite quotes
            <span className="text-emerald-600">
              <TypeAnimation
                  cursor={true}
                  sequence={[
                    'We judge others by their actions and ourselves by our intentions', 10000,
                    'Differentiate the urgent from the important', 10000,
                    'What could go right?', 10000
                  ]}
                  wrapper="h2"
                  repeat={Infinity}
                  className="font-mono"
              />
            </span>
          </h1>
        </main>
    </div>
  )
}

export default Home