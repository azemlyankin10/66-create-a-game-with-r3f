import { useMemo } from 'react';
import { BlockAxe, BlockLimbo, BlockSpinner, BlockStart, BlockEnd } from './components/Floor';
import { Bounds } from './components/Bounds';

export const Level = ({ count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo] }) => {
    const blocks = useMemo(() => {
        const blocks = [];
        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            blocks.push(type);
        }
        return blocks;
    }, [count, types]);

    return (
        <>
            <BlockStart position={[0, 0, 0]} />
            {blocks.map((Block, index) => (
                <Block key={index} position={[0, 0, -(index + 1) * 4]} />
            ))}
            <BlockEnd position={[0, 0, -(count + 1) * 4]} />

            <Bounds length={count + 2} />
        </>
    );
};
