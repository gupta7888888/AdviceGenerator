import {React,useEffect,useState} from "react";
import './components.css'
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { FaDiceFive } from "react-icons/fa";

function Advice_Generator(){
    const[advices, setAdvice] = useState('')
    const[adviceId, setId] = useState('')
    const[isPlaying, setIsplaying] = useState(false)
    const handleIsplaying =()=>{
        setIsplaying(!isPlaying)
        speak()
    }
    function speak() {
        const text = advices;
        const speech = new SpeechSynthesisUtterance();
      
        speech.text = text;
        speech.volume = 1; // From 0 to 1
        speech.rate = 1; // From 0.1 to 10
        speech.pitch = 1; // From 0 to 2
      

        window.speechSynthesis.speak(speech);
      }
      
    
    const fetchAPi= ()=>{ fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(data =>{
        setAdvice(data.slip.advice)
        setId(data.slip.id)
    })}

    useEffect ( ()=> {
        
        fetchAPi()
        speak()
    },[]);
return(
    <div className="mt-[60%] container rounded-[10px] h-fit w-[300px] p-6 border-white border-l-4">
        <div>
        <p className="text-yellow-500">Advice #{adviceId}</p>
        <p className="text-white font-bold">{advices}</p>
        <div className="flex items-center justify-center mt-5 text-[20px] text-white">
            <pre className="strikethrough">         </pre>
        <button onClick={handleIsplaying}>{isPlaying?<CiPause1 />:<CiPlay1 />}</button>
          
        
        <pre className="strikethrough">         </pre>
        </div>
        <button onClick={()=>{
            fetchAPi()
            
        }} className='rounded-full p-[10px] w-full max-w-[40px] h-fit bg-yellow-200 flex items-center justify-center mx-auto mt-5 mb-[-43px] text-[20px] glow-button'><FaDiceFive /></button>
        </div>
    </div>
)

}

export default Advice_Generator;