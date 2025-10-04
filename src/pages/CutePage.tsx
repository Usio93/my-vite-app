import React, { useState, useEffect, useRef } from "react";
import "../styles/CutePage.scss";
import { useNavigate } from "react-router-dom";
import pandaImg from "../assets/Screenshot 2025-10-04 161200.png";
import bearImg from "../assets/Screenshot 2025-10-04 161307.png";
import bgMusic from "../assets/Em Không Được Phép Buồn Rầu.mp3";

const message =
    "Hé lôooo 🐻💕 Bạn Dương biết hông, có ai đó đang rất thích bạn đó 😳👉👈 ...";

const CutePage: React.FC = () => {
    const [displayText, setDisplayText] = useState("");
    const [showButtons, setShowButtons] = useState(false);
    const [noPosition, setNoPosition] = useState({ top: "70%", left: "60%" });
    const [musicOn, setMusicOn] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const navigate = useNavigate();

    // Gõ từng ký tự
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayText((prev) => prev + message.charAt(i));
            i++;
            if (i >= message.length) {
                clearInterval(interval);
                setTimeout(() => setShowButtons(true), 1000);
            }
        }, 60);
        return () => clearInterval(interval);
    }, []);

    // Phát nhạc tự động
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0.4;

        const playMusic = async () => {
            try {
                await audio.play();
                setMusicOn(true);
            } catch {
                setMusicOn(false); // bị chặn autoplay
            }
        };
        playMusic();
    }, []);

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (musicOn) {
            audio.pause();
            setMusicOn(false);
        } else {
            audio.play();
            setMusicOn(true);
        }
    };

    // Khi hover vào nút No => chạy sang chỗ khác
    const moveNoButton = () => {
        const randomTop = Math.floor(Math.random() * 80) + 10;
        const randomLeft = Math.floor(Math.random() * 80) + 10;
        setNoPosition({
            top: `${randomTop}%`,
            left: `${randomLeft}%`,
        });
    };

    // Khi bấm Yes => sang trang khác
    const handleYes = () => {
        navigate("/love");
    };

    return (
        <div className="cute-container">
            <audio ref={audioRef} src={bgMusic} loop preload="auto" />

            {/* Tim bay nền */}
            <div className="heart-bg">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="heart" />
                ))}
            </div>

            {/* Hai bé gấu */}
            <img src={pandaImg} alt="panda" className="panda" />
            <img src={bearImg} alt="bear" className="bear" />

            {/* Nút bật/tắt nhạc */}
            <button
                className={`music-toggle ${musicOn ? "on" : ""}`}
                onClick={toggleMusic}
                title={musicOn ? "Tắt nhạc" : "Bật nhạc"}
            >
                {musicOn ? "🔊" : "🔈"}
            </button>

            {/* Chữ chạy */}
            <div className="text-box">{displayText}</div>

            {/* Câu hỏi + nút */}
            {showButtons && (
                <div className="button-container">
                    <h2 className="final-text">Vậy... bạn có thích mình hong? 🥺💞</h2>

                    <button className="yes-btn" onClick={handleYes}>
                        Yes 💘
                    </button>

                    <button
                        className="no-btn"
                        style={{ top: noPosition.top, left: noPosition.left }}
                        onMouseEnter={moveNoButton}
                    >
                        No 🙈
                    </button>
                </div>
            )}
        </div>
    );
};

export default CutePage;
