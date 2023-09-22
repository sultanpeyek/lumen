'use client'

import {cn} from '@/lib/utils'
import React, {useEffect, useState} from 'react'

const colors: number[][] = [
  [250, 128, 30], // Adjusted from orange
  [234, 88, 12], // Target color
  [255, 110, 25], // Adjusted from tomato
  [210, 65, 5], // Adjusted from orangered
  [242, 140, 50], // Adjusted from sandybrown
  [220, 95, 35], // Adjusted from lightcoral
]

const gradientSpeed = 0.002

interface AnimatedBackgroundGradientProps {
  className: string
}

export default function AnimatedBackgroundGradient({
  className,
}: AnimatedBackgroundGradientProps) {
  const [step, setStep] = useState(0)
  const [colorIndices, setColorIndices] = useState([0, 1, 2, 3])
  const [gradient, setGradient] = useState<string>('')

  useEffect(() => {
    const updateGradient = () => {
      const c0_0 = colors[colorIndices[0]]
      const c0_1 = colors[colorIndices[1]]
      const c1_0 = colors[colorIndices[2]]
      const c1_1 = colors[colorIndices[3]]

      const istep = 1 - step
      const getColor = (cStart: number[], cEnd: number[]): string => {
        const r = Math.round(istep * cStart[0] + step * cEnd[0])
        const g = Math.round(istep * cStart[1] + step * cEnd[1])
        const b = Math.round(istep * cStart[2] + step * cEnd[2])
        return `rgb(${r},${g},${b})`
      }

      const color1 = getColor(c0_0, c0_1)
      const color2 = getColor(c1_0, c1_1)

      setGradient(`linear-gradient(to right, ${color1} 0%, ${color2} 100%)`)

      setStep(step => {
        let newStep = step + gradientSpeed
        if (newStep >= 1) {
          newStep %= 1
          const newIndices = [...colorIndices]
          newIndices[0] = colorIndices[1]
          newIndices[2] = colorIndices[3]

          newIndices[1] =
            (colorIndices[1] +
              Math.floor(1 + Math.random() * (colors.length - 1))) %
            colors.length
          newIndices[3] =
            (colorIndices[3] +
              Math.floor(1 + Math.random() * (colors.length - 1))) %
            colors.length

          setColorIndices(newIndices)
        }
        return newStep
      })
    }

    const intervalId = setInterval(updateGradient, 10)
    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorIndices])

  return (
    <div
      className={cn('bg-primary block w-full p-0 m-0', className)}
      style={{
        background: gradient,
      }}
    />
  )
}
