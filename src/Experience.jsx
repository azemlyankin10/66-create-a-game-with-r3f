import { OrbitControls } from '@react-three/drei';
import Lights from './Lights.jsx';
import { Level } from './Level.jsx';
import { Physics } from '@react-three/rapier';
import { Player } from './components/Player.jsx';
import useGame from './stores/useGame.jsx';

export default function Experience() {
    const blocksCount = useGame(state => state.blocksCount);
    const blockSeed = useGame(state => state.blockSeed);

    return (
        <>
            <color attach='background' args={['#bdedfc']} />
            <OrbitControls makeDefault />

            <Physics debug={false}>
                <Lights />
                <Level count={blocksCount} seed={blockSeed} />
                <Player />
            </Physics>
        </>
    );
}
