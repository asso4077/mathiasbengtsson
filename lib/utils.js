import { useEffect, useState, useLayoutEffect } from 'react'

export function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function objectToInlineList(items) {
  if (items.length === 1) return items[0]

  const list = items.map((item, i) => {
    if (i === items.length - 1) {
      return `and ${item}`
    } else if (i === items.length - 2) {
      return `${item} `
    } else {
      return `${item}, `
    }
  })

  return list.join("")
}

export const useRefDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 })
  useEffect(() => {
    if (ref.current) {
      const { current } = ref
      const boundingRect = current.getBoundingClientRect()
      const { width, height } = boundingRect
      setDimensions({ width: Math.round(width), height: Math.round(height) })
    }
  }, [ref, useWindowSize()])
  return dimensions
}

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
