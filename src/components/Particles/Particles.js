import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { particlesColor } from "../../constants/constants";

export default function Particles({ count, mouse }) {
  const mesh = useRef();
  const light = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  useFrame((state) => {
    light.current.position.set(
      mouse.current[0] / aspect,
      -mouse.current[1] / aspect,
      0
    );
    particles.forEach((particle, i) => {
      let { t } = particle;
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += (mouse.current[0] - particle.mx) * 0.01;
      particle.my += (mouse.current[1] * -1 - particle.my) * 0.01;
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight ref={light} distance={1000} intensity={100} color={particlesColor}/>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <instancedMesh ref={mesh} args={[null, null, count]}>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <dodecahedronGeometry args={[0.18, 10]} />
        <meshPhongMaterial color={particlesColor} />
      </instancedMesh>
    </>
  );
}
