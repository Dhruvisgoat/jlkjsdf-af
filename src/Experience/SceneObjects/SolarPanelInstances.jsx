import React, { useMemo } from 'react';
import { InstancedRigidBodies } from "@react-three/rapier";
import { Solar_panel } from './Solar_panel';

const SolarPanelInstances = () => {
    const COUNT = 4; // Number of instances

    const instances = useMemo(() => {
        // Define properties for each instance
        // Adjust positions and rotations as needed
        const instances = [
            { key: "instance_1", position: [10, 0, -10], rotation: [-Math.PI / 4, 0, 0] },
            { key: "instance_2", position: [-10, 0, 10], rotation: [-Math.PI / 4, 0, 0] },
            { key: "instance_3", position: [-10, 0, -10], rotation: [-Math.PI / 4, 0, 0] },
            { key: "instance_4", position: [10, 0, 10], rotation: [-Math.PI / 4, 0, 0] }
        ];
        return instances;
    }, []);

    return (
        <InstancedRigidBodies
          instances={instances}
          colliders="trimesh" // Specify collider type (e.g., "trimesh")
          type='fixed'
        >
          {instances.map((instance) => (
              <Solar_panel key={instance.key} position={instance.position} />
          ))}
        </InstancedRigidBodies>
    );
};

export default SolarPanelInstances;
