import bookcase from 'assets/bookcase-edit-compressed.mp4'
import quizTutorialBg from 'assets/quiz-tutorial-bg.png'
import React from 'react'
import styles from './LandingPage.module.scss'

const quizTutorialBgLqip =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAklEQVR4AewaftIAAACzSURBVG3BsU7DQBBF0Tuz49hEEQVILiL+/6OoqCOKSIjEa3vnJQ2IWJxjuuNOEnMTKfHUFbZibUlKXKaZz6vxsi/04bgZf8WaSaboIjg+G2aQAjceuJtjZkRxduH0XcGA6zSTKX5EV5yuOGb8mltS16QuF4o7UZww44EEdV75+q5IydDvGHrH2WiZtNMJN5CgzisSBBtRnMN+x/DxzlQXluMbw+uB4B8xjsQ40ku08xkvzg14QFJblVHlFAAAAABJRU5ErkJggg=='

function LandingPage() {
  return (
    <div className="">
      <div className="w-100 inline-block">
        <div className={`${styles['landing-page__video-wrapper']}`}>
          <video
            className={`inline-block absolute ${styles['landing-page__video']}`}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={bookcase} type="video/mp4" />
          </video>
        </div>
        <svg className="w-0 h-0 absolute">
          <defs>
            <clipPath
              id="clipPath"
              clipPathUnits="objectBoundingBox"
              transform="scale(0.0015, 0.008)"
            >
              <path d="m 298.28604,93.87112 c -17.46961,-5.67095 -27.24387,-20.45191 -27.27417,-41.24488 -0.0225,-15.4371 5.93636,-27.8164 16.92022,-35.15115 7.01557,-4.68482 12.96686,-6.20418 24.30153,-6.20418 11.42117,0 18.73467,2.26688 24.7437,7.66951 C 341.33441,22.85783 346,30.11421 346,32.9734 c 0,0.58908 -3.0164,1.6402 -6.70311,2.33583 -6.27386,1.1838 -6.77015,1.14302 -7.75,-0.63677 -2.33877,-4.2481 -9.54326,-10.31024 -13.03063,-10.96448 -12.16079,-2.28138 -23.40665,1.98038 -28.96971,10.97841 -2.72767,4.4119 -3.04143,5.81095 -3.38506,15.094 -0.5156,13.92861 1.26708,20.01433 7.7667,26.51394 5.39347,5.39348 9.52288,6.96248 18.34679,6.971 6.18653,0.006 15.8201,-2.86551 18.86829,-5.62408 C 332.54,76.37723 333,74.54382 333,70.24092 c 0,-5.60641 -0.0621,-5.73242 -3.125,-6.34501 -1.71875,-0.34375 -6.21875,-0.625 -10,-0.625 H 313 v -5.5 -5.5 h 17.5 17.5 v 15.44911 15.44911 l -3.46872,2.64572 c -1.90779,1.45514 -6.97029,4.03959 -11.25,5.74321 -6.84879,2.72629 -9.15942,3.13245 -19.28128,3.38924 -7.74373,0.19646 -12.87642,-0.15506 -15.71396,-1.07618 z M 0,53.27091 v -41 H 30.5 61 v 5.5 5.5 H 41.125 c -10.93125,0 -21.28125,0.28125 -23,0.625 L 15,24.52091 v 10.25 10.25 l 3.125,0.625 c 1.71875,0.34375 11.39375,0.625 21.5,0.625 H 58 v 5.5 5.5 H 39.625 c -10.10625,0 -19.78125,0.28125 -21.5,0.625 L 15,58.52091 v 11.75 11.75 l 3.125,0.625 c 1.71875,0.34375 12.51875,0.625 24,0.625 H 63 v 5.5 5.5 H 31.5 0 Z m 80,-0.0421 V 12.18674 l 7.72727,0.29207 7.72727,0.29206 16.53092,27 c 9.72265,15.88002 17.14533,27 18.02273,27 1.27941,0 1.52969,-3.87985 1.75788,-27.25 l 0.26607,-27.25 H 139.01607 146 v 41.04044 41.04044 l -8.20023,-0.29044 -8.20023,-0.29044 -15.34536,-25 C 105.81423,55.02087 98.29751,43.15512 97.55037,42.40255 94.39968,39.22895 94,42.14776 94,68.32989 v 25.94102 h -7 -7 z m 87,0.0421 v -41 h 7.5 7.5 v 34.875 34.875 l 3.125,0.625 c 1.71875,0.34375 11.39375,0.625 21.5,0.625 H 225 v 5.5 5.5 h -29 -29 z m 72,0 v -41 h 7.5 7.5 v 41 41 h -7.5 -7.5 z m 128,0 v -41 h 7 7 v 16.02475 16.02475 l 2.5651,0.97525 c 3.33279,1.26712 28.53701,1.26712 31.8698,0 L 418,44.32041 V 28.29566 12.27091 h 7.5 7.5 v 41 41 H 425.5 418 V 76.74616 59.22141 l -2.5651,-0.97525 c -3.33279,-1.26713 -28.53701,-1.26713 -31.8698,0 L 381,59.22141 v 17.52475 17.52475 h -7 -7 z m 107,6.47525 V 25.22141 l -2.5651,-0.97525 c -1.4108,-0.53639 -7.2608,-0.97525 -13,-0.97525 H 448 v -5.5 -5.5 h 33 33 v 5.5 5.5 l -10.25,0.0137 c -5.6375,0.007 -11.2625,0.28499 -12.5,0.61663 L 489,24.50422 v 34.88332 34.88337 h -7.5 -7.5 z m 52,-6.47525 v -41 h 31 31 v 5.5 5.5 h -20.9349 c -11.5142,0 -22.0892,0.43886 -23.5,0.97525 -2.50631,0.9529 -2.5651,1.19412 -2.5651,10.52475 0,9.33063 0.0588,9.57185 2.5651,10.52475 1.4108,0.53639 11.0858,0.97525 21.5,0.97525 H 584 v 5.5 5.5 h -18.9349 c -10.4142,0 -20.0892,0.43886 -21.5,0.97525 C 541.02524,59.21181 541,59.33013 541,70.27091 c 0,10.94078 0.0252,11.0591 2.5651,12.02475 1.4108,0.53639 12.2108,0.97525 24,0.97525 H 589 v 5.5 5.5 H 557.5 526 Z m 81,0.16667 c 0,-22.45834 0.18646,-41.02084 0.41437,-41.25 0.2279,-0.22917 3.62769,-0.19167 7.55508,0.0833 l 7.14073,0.5 16.24616,26.5 c 12.28774,20.0432 16.72098,26.5 18.19491,26.5 1.87646,0 1.95863,-0.99229 2.21508,-26.75 l 0.26634,-26.75 H 665.51633 672 v 41 41 l -7.75,-0.0413 -7.75,-0.0413 -16.12509,-26.20868 c -11.82865,-19.22552 -16.62465,-26.20868 -18,-26.20868 -1.77883,0 -1.88857,1.34524 -2.14151,26.25 l -0.26661,26.25 H 613.4834 607 Z" />
            </clipPath>
          </defs>
        </svg>
        <div className={`relative`}>
          <div className="absolute overflow-hidden top-0 right-0 left-0 bottom-0">
            <img
              src={quizTutorialBgLqip}
              data-srcset={quizTutorialBg}
              alt=""
              className="lazyload absolute w-100"
              style={{
                top: '50%',
                left: '50%',
                width: 'auto',
                height: 'auto',
                maxHeight: 'none',
                maxWidth: 'none',
                minHeight: '100%',
                minWidth: '100%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
          <article className="relative bg-cover bg-center flex flex-col items-center font-mono rounded">
            <h2 className="text-brand-dark text-4xl m-16 text-center">
              Omg such quiz app!
            </h2>
            <div
              className={`${styles['tutorial-text-wrapper']} bg-gray-light relative mb-16`}
            >
              <p className={`text-brand-dark text-2xl m-16 bg-warning-light`}>
                1. Challenge other players
              </p>
              <p className={`text-brand-dark text-2xl m-16 bg-warning-light`}>
                2. Compete and see who knows the most
              </p>
              <p className={`text-brand-dark text-2xl m-16 bg-warning-light`}>
                3. Climb the ranks and become the top nerd
              </p>
              <span
                className={`${styles['arm']} absolute text-6xl`}
                role="img"
                aria-label="arm"
              >
                💪{/* This is not displaying on iOS Safari */}
              </span>
              <span
                className={`${styles['thinking-face']} absolute text-6xl top-1/2`}
                role="img"
                aria-label="thinking"
              >
                🤔
              </span>
              <span
                className={`${styles['nerd-face']} absolute text-6xl left-1/2 left-1/2`}
                role="img"
                aria-label="nerd"
              >
                🤓
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
