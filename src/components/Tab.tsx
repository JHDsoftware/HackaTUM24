import { FC } from 'react';
import Link from 'next/link';

export const Chip: FC<{ nav: string }> = ({ nav }) => {
    return (
        <>
            <div style={{width: '100%', height: '100%', background: 'white', borderRadius: 22}} />
                <Link href={nav}>
                    <div>Trending</div>
                </Link>
        </>
    );
};