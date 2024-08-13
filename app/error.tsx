"use client"
import React from 'react'

export default function ErrorBoundary({
  error,
}:{
  error: Error,
}) {
  return (
    <div>
      <h1>Bienvenue dans la page d'erreur :D</h1>
      <div>
      {error.message}
    </div>
    </div>
    
  )
}