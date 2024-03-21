import { useGLTF } from '@react-three/drei';

export const Hamburger = ({ position = [0, 0, 0] }) => {
    const hamburger = useGLTF('./hamburger.glb');

    hamburger.scene.children.forEach(child => {
        child.castShadow = true;
    });

    return <primitive object={hamburger.scene} scale={0.2} />;
};
