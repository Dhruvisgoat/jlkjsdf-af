import React from 'react'
import { useState } from 'react';
import * as THREE from 'three';

function Tv({position,url}) {    
    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = url;
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.play();
        return vid;
    });

    return (
        <mesh rotation={[0, 0, 0]} position={position}>
            <planeGeometry args={[5,3]} />
            <meshStandardMaterial side={THREE.DoubleSide}>
                <videoTexture attach="map" args={[video]} />
                {/* <videoTexture attach="emissiveMap" args={[video]} /> */}
            </meshStandardMaterial>
        </mesh>
    );
};

export default Tv









// import React, { useMemo } from 'react';
// import { useTexture } from '@react-three/drei';
// import * as THREE from 'three';
// import { RigidBody } from '@react-three/rapier';
// import { useState } from 'react';
// import url from '../../assets/videoplayback.mp4';


// export default function Tv(position) {
//     const [video] = useState(() => {
//         const vid = document.createElement('video');
//         vid.src = url;
//         vid.crossOrigin = 'Anonymous';
//         vid.loop = true;
//         vid.muted = true;
//         vid.play();
//         return vid;
//     });

//     const { geometry, heightMin, heightMax } = useMemo(() => curvedPlaneGeometry(20, 10, 0.1), []); // Adjust dimensions and curvature

//     // create a planar geometery
//     const newGeometry = new THREE.PlaneGeometry(20, 10, 32, 32);

//     return (

//         <mesh geometry={newGeometry} position={position} >
//             <meshStandardMaterial side={THREE.DoubleSide}>
//                 <videoTexture attach="map" args={[video]} />
//                 <videoTexture attach="emissiveMap" args={[video]} />
//             </meshStandardMaterial>
//         </mesh>

//     );
// }

// function curvedPlaneGeometry(width = 1, height = 1, radius = 2) {
//     const segments = 32;
//     const segmentsH = segments;
//     const segmentsV = segments / (width / height); // square
//     const geometry = new THREE.PlaneGeometry(width, height, segmentsH, segmentsV);

//     let heightMin = Infinity;
//     let heightMax = -Infinity;

//     const distanceMax = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
//     radius = Math.max(distanceMax, radius);

//     const position = geometry.attributes.position;
//     for (let i = 0; i < position.count; i++) {
//         const x = position.getX(i);
//         const y = position.getY(i);

//         const distance = Math.sqrt(x * x + y * y);
//         const height = Math.sqrt(Math.max(radius ** 2 - distance ** 2, 0));
//         heightMin = Math.min(height, heightMin);
//         heightMax = Math.max(height, heightMax);
//         position.setZ(i, height);
//     }

//     return { geometry, heightMin, heightMax };
// }
