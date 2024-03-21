import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Hamburger } from './Hamburger';
import { boxGeometry, floor1Material, floor2Material, obstacleMaterial } from '../assets';


export const BlockStart = ({ position = [0, 0, 0] }) => {
    return (
        <group position={position}>
            <mesh
                receiveShadow
                geometry={boxGeometry}
                material={floor1Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
            />
        </group>
    );
};

export const BlockEnd = ({ position = [0, 0, 0] }) => {
    return (
        <group position={position}>
            <mesh
                receiveShadow
                geometry={boxGeometry}
                material={floor1Material}
                position={[0, 0, 0]}
                scale={[4, 0.2, 4]}
            />
            <RigidBody type='fixed' colliders='hull' position={[0, 0.25, 0]} restitution={0.2} friction={0}>
                <Hamburger />
            </RigidBody>
        </group>
    );
};

export const BlockSpinner = ({ position = [0, 0, 0] }) => {
    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() > 0.5 ? 1 : -1));
    const obstacle = useRef();

    useFrame(state => {
        const time = state.clock.getElapsedTime();
        const rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), time * speed);
        // obstacle.current.setTranslation(new THREE.Vector3(position[0], 0.3, position[2]));
        obstacle.current.setRotation(rotation);
    });

    return (
        <group position={position}>
            <mesh
                receiveShadow
                geometry={boxGeometry}
                material={floor2Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
            />
            <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0}>
                <mesh
                    castShadow
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    position={[0, 0.1, 0]}
                    scale={[3.5, 0.3, 0.3]}
                />
            </RigidBody>
        </group>
    );
};

export const BlockLimbo = ({ position = [0, 0, 0] }) => {
    const [speed] = useState(() => Math.random() + 0.2);
    const obstacle = useRef();

    useFrame(state => {
        const time = state.clock.getElapsedTime();
        const amplitude = Math.abs(Math.sin(time * speed)) * 2 + 0.3;
        obstacle.current.setNextKinematicTranslation({ x: position[0], y: amplitude, z: position[2] });
    });

    return (
        <group position={position}>
            <mesh
                receiveShadow
                geometry={boxGeometry}
                material={floor2Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
            />
            <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0}>
                <mesh
                    castShadow
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    position={[0, 0.1, 0]}
                    scale={[3.5, 0.3, 0.3]}
                />
            </RigidBody>
        </group>
    );
};

export const BlockAxe = ({ position = [0, 0, 0] }) => {
    const [speed] = useState(() => Math.random() * Math.PI * 2);
    const obstacle = useRef();

    useFrame(state => {
        const time = state.clock.getElapsedTime();
        const amplitude = Math.sin(time * speed) * 1.25;
        obstacle.current.setNextKinematicTranslation({
            x: position[0] + amplitude,
            y: position[1] + 0.75,
            z: position[2],
        });
    });

    return (
        <group position={position}>
            <mesh
                receiveShadow
                geometry={boxGeometry}
                material={floor2Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
            />
            <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0}>
                <mesh
                    castShadow
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    position={[0, 0.1, 0]}
                    scale={[1.5, 1.3, 0.3]}
                />
            </RigidBody>
        </group>
    );
};

// export const Floor = () => {
//     return (
//         <>
//             <BlockStart position={[0, 0, 16]} />
//             <BlockSpinner position={[0, 0, 12]} />
//             <BlockLimbo position={[0, 0, 8]} />
//             <BlockAxe position={[0, 0, 4]} />
//             <BlockEnd position={[0, 0, 0]} />
//         </>
//     );
// };
