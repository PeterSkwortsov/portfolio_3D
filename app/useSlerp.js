import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

function SlerpGroup({ children, sensitivity = 1, smoothness = 0.1 }) {
    const groupRef = useRef()

    const rotationStateRef = useRef({
        euler: new THREE.Euler(0, 0, 0),
        quaternion: new THREE.Quaternion(0, 0, 0, 0)
    })

    useFrame(({ mouse, viewport }) => {
        if (!groupRef.current) return

        const { euler, quaternion } = rotationStateRef.current
        const x = (mouse.x * viewport.width) / 100 * sensitivity
        const y = (mouse.y * viewport.height) / 100 * sensitivity

        euler.set(y, x, 0)
        quaternion.setFromEuler(euler)
        groupRef.current.quaternion.slerp(quaternion, smoothness)
    })

    return <group ref={groupRef}>{children}</group>
}

export default SlerpGroup