import './components.css';
import React, { useEffect, useState, useRef } from 'react';
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { FaDiceFive } from "react-icons/fa";

function Advice_generato() {
  const [advice, setAdvice] = useState('');
  const [adviceID, setAdviceID] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const fetchAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        setAdvice(data.slip.advice);
        setAdviceID(data.slip.id);
        console.log(data.slip.advice);
        speakAdvice(data.slip.advice);  // Trigger text-to-speech
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const speakAdvice = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Text-to-Speech not supported in this browser.');
    }
  };

  return (
    <div className='mt-[60%] container rounded-[10px] h-fit w-[300px] p-6 border-white border-l-4'>
      <div>
        <h2 className='mb-3 text-green-500 font-bold'>Advice <span>#{adviceID}</span></h2>
        <p className='text-white font-bold'>{advice}</p>
        <audio ref={audioRef} src="path/to/advice/audio.mp3"></audio>
        <div className='flex justify-center items-center mt-5 text-[20px] text-white'>
          <button onClick={handlePlayPause} className='focus:outline-none'>
            {isPlaying ? <CiPause1 /> : <CiPlay1 />}
          </button>
        </div>
        <div className='rounded-full p-[10px] w-full max-w-[40px] h-fit bg-yellow-200 flex items-center justify-center mx-auto mt-5 mb-[-43px] text-[20px]'>
          <button onClick={fetchAdvice}><FaDiceFive /></button>
        </div>
      </div>
    </div>
  );
}

export default Advice_generator;
