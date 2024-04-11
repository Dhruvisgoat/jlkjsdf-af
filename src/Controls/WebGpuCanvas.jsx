import { useEffect, useRef, useState } from 'react'
import { CanvasProps, Canvas as R3FCanvas } from '@react-three/fiber'
import { createContext, useContext } from 'react'
import { RefContext } from '../context/context'

let WebGPURenderer

export const WebGPUCanvas = ({
  children,
  forceWebGL = false,
  ...props
}) => {
  const [isWebGPU, setIsWebGPU] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const previousForceWebGLRef = useRef(forceWebGL)
  const { showButton, dpr, isFullscreen } = useContext(RefContext);


  useEffect(() => {
    const loadWebGPU = async () => {
      if (!forceWebGL) {
        const capabilities = (await import('three/addons/capabilities/WebGPU.js')).default
        WebGPURenderer = (await import('three/addons/renderers/webgpu/WebGPURenderer.js')).default
        setIsWebGPU(capabilities.isAvailable())
        setIsReady(true)
      }
    }

    if (previousForceWebGLRef.current !== forceWebGL) {
      setIsReady(false)
      if (forceWebGL) {
        setTimeout(() => setIsReady(true), 0)
      }
      previousForceWebGLRef.current = forceWebGL
    }

    if (!forceWebGL) {
      loadWebGPU()
    }
  }, [forceWebGL])

  if (!isReady) return null

  return (
    <R3FCanvas
    dpr={window.devicePixelRatio * dpr / 100}
      {...(isWebGPU &&
        !forceWebGL && {
          gl: canvas => {
            const r = new WebGPURenderer({ canvas })
            r.setClearColor(0x000000, 0)
            r.xr = { addEventListener: () => {} }
            return r
          },
        })}
      {...props}
    >
      {children}
    </R3FCanvas>
  )
}
