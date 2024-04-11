import React, { createContext, useContext, useState, useRef } from "react";

// Step 1: Create a context for useRef
export const RefContext = createContext();

// Step 2: Create a provider component
export function RefProvider({ children }) {
  // Initialize a useRef object

  let showButtonRef = useRef(true);
  const [isMuted, setIsMuted] = useState(false);

  const joystickState = useRef();

  const setJoystickState = (state) => {
    joystickState.current = state;
  };

  const getJoystickState = () => joystickState.current;

  const isJumping = useRef(false);
  const setIsJumping = (state) => {
    isJumping.current = state;
  };

  const isSprinting = useRef(false);
  const setIsSprinting = (state) => {
    isSprinting.current = state;
  }

  const isRunning = useRef(false);
  const setIsRunning = (state) => {
    isRunning.current = state;
  }

  const isAnimating = useRef(false);
  const setIsAnimating = (state) => {
    isAnimating.current = state;
  };

  let [isPersonView, setIsPersonView] = useState(false)


  let [isDeviceView, setIsDeviceView] = useState(false)


  //store player position with x,y,z coordinates in an array as useRef
  const playerPosition = useRef([110, 10, 0]);

  const isWalking = useRef(false);
  const setIsWalking = (state) => {
    isWalking.current = state;
  };

  const actionsRef=useRef(null);

  const audioRef = useRef(null);

  const [currentSource, setCurrentSource] = useState("audio/runningAudio.mp3");
  const changeSource = (newSource) => {
    setCurrentSource(newSource);
    // Pause and reset the audio
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    // Load the new source
    audioRef.current.load();
    audioRef.current.play();
  };

  const [isStandardPointer,setIsStandardPointer] = useState(true);

  const [switchCharacter, setSwitchCharacter] = useState("Girl");

  const[dpr,setDpr]=useState(50);

  const [isFullscreen, setIsFullscreen] = useState(false);

  // create a toggle for isplaying
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setIsShowButton] = useState(true);

  const distanceRefs = useRef({});

  const setDistanceRef = (key, ref) => {
    distanceRefs.current[key] = ref;
  };

  const getDistanceRef = (key) => {
    return distanceRefs.current[key];
  };

  const playerRef = useRef();

  const [isJoystickView, setIsJoystickView] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // const [distanceRefs, setDistanceRefs] = useState({});

  // const setDistanceRef = (key, ref) => {
  //   setDistanceRefs(prevState => ({
  //     ...prevState,
  //     [key]: ref
  //   }));
  // };

  // const getDistanceRef = (key) => {
  //   return distanceRefs[key];
  // };

  const [isPressingAnimating, setIsPressingAnimating] = useState(false);

  return (
    <RefContext.Provider value={{ showSettings, setShowSettings,isJoystickView, setIsJoystickView, playerRef, setIsPressingAnimating, isPressingAnimating,isRunning,setIsRunning,showButton, setIsShowButton, isMuted, setIsMuted, setJoystickState, getJoystickState, isJumping, setIsJumping, isSprinting, setIsSprinting,isAnimating,setIsAnimating, isPersonView, setIsPersonView, playerPosition, isDeviceView, setIsDeviceView, isWalking, setIsWalking, actionsRef, audioRef, currentSource, setCurrentSource,changeSource,isStandardPointer,setIsStandardPointer,switchCharacter,setSwitchCharacter,dpr,setDpr,isFullscreen, setIsFullscreen,setDistanceRef,getDistanceRef }}>
      {children}
    </RefContext.Provider>
  );
}
