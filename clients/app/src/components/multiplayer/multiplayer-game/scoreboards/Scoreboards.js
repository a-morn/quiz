import React from 'react'
import { Scoreboard } from './scoreboard'

export function Scoreboards({ players }) {
  return (
    <div
      className={`flex justify-between text-lg bg-gray-lighter p-4 rounded flex-col sm:flex-row mx-4`}
    >
      {players.map(({ name, score, id, profilePictureUrl }) => (
        <Scoreboard
          name={name}
          score={score}
          key={id}
          profilePictureUrl={profilePictureUrl}
        />
      ))}
    </div>
  )
}
