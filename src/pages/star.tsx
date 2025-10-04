import StarField from '../components/StarField.tsx';
import '../styles/App.scss';

import React, { useEffect, useRef } from "react";

import heart1 from "../assets/z7080965651319_9978f26d68025de71b00c6ed44b58eaf.jpg";
import heart2 from "../assets/Screenshot 2025-10-04 161200.png";
import planet from "../assets/Screenshot 2025-10-04 161307.png";
import spark from "../assets/z7080965655930_4f0969e023356fddfcd3e0e566292c11.jpg";

const Star1: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.2;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.warn("Autoplay bị chặn:", error);
                });
            }
        }
    }, []);

    return (
        <div className="star-page">
            {/* Nền sao */}
            <StarField />

            {/* Âm nhạc */}
            <audio ref={audioRef} src="../assets/Em Không Được Phép Buồn Rầu.mp3" autoPlay loop />

            {/* Các vật thể bay quanh */}
            <img src={heart1} alt="heart1" className="floating floating1" />
            <img src={heart2} alt="heart2" className="floating floating2" />
            <img src={planet} alt="planet" className="floating floating3" />
            <img src={spark} alt="spark" className="floating floating4" />

            {/* Dòng chữ */}
            <div className="center-text">
                <h1>You are my world 💖</h1>
            </div>
        </div>
    );
};

export default Star1;
