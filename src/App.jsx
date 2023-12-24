import { Canvas } from "@react-three/fiber";
import {
  Bloom,
 
  EffectComposer,
  
 
} from "@react-three/postprocessing";

import {OrbitSpace } from 'orbit-space'
import "./App.css";

import {  Scene } from "./components/Scene";
import { Credits } from "./components/Credits";

function App() {
 
  return (
    <>
      <OrbitSpace/>
      <Credits />
      <Canvas dpr={[1,2]}
        camera={{ position: [0, 9, 35], fov: 38 }}
        gl={{ alpha: true }}
      >
        <fog attach="fog" args={["#edf1f5", 55, 70]} />
        <Scene />
        <EffectComposer smaa multisampling={3}>
          <Bloom mipmapBlur luminanceThreshold={2} />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default App;
