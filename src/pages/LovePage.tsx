
import "../styles/LovePage.scss";
import React, { useEffect, useRef, useState } from "react";
import bgImg from "../assets/Screenshot 2025-10-04 165452.png"; // ảnh nền mới
import centerImg from "../assets/z7080965655930_4f0969e023356fddfcd3e0e566292c11.jpg";
import deco1 from "../assets/Screenshot 2025-10-04 163419.png";
import deco2 from "../assets/Screenshot 2025-10-04 161200.png";
import deco3 from "../assets/Screenshot 2025-10-04 161307.png";
import deco4 from "../assets/Screenshot 2025-10-04 163404.png";
import deco5 from "../assets/z7080965655170_12dd58c8921bca7cf045fd0255cbf08a.jpg";
import deco6 from "../assets/z7080966507624_5a7266006c26fdcc6799678846b9401f.jpg";
import bgMusic from "../assets/Happy Birthday To You.mp3";
import confetti from "canvas-confetti"; // 🎉 hiệu ứng pháo giấy
import { useNavigate } from "react-router-dom";

const LovePage: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [musicOn, setMusicOn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0.5;

        const playMusic = async () => {
            try {
                await audio.play();
                setMusicOn(true);
            } catch {
                setMusicOn(false);
            }
        };
        playMusic();

        // 🎉 Pháo giấy liên tục
        const interval = setInterval(() => {
            confetti({
                particleCount: 15,
                startVelocity: 25,
                spread: 120,
                origin: { x: Math.random(), y: 0.9 },
                ticks: 200,
                gravity: 0.4,
                colors: ["#ff8fcf", "#ffbadb", "#fff0f5", "#ffe6f0"],
            });
        }, 600);

        return () => clearInterval(interval);
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

    const handleCenterClick = () => {
        navigate("/star"); // đổi thành trang bạn muốn
    };

    return (
        <div className="love-container">
            {/* Nhạc nền */}
            <audio ref={audioRef} src={bgMusic} loop preload="auto" />

            {/* Ảnh nền */}
            <img src={bgImg} alt="background" className="background-img" />

            {/* Tim bay */}
            <div className="heart-bg">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="heart" />
                ))}
            </div>

            {/* Nút bật nhạc */}
            <button
                className={`music-toggle ${musicOn ? "on" : ""}`}
                onClick={toggleMusic}
                title={musicOn ? "Tắt nhạc" : "Bật nhạc"}
            >
                {musicOn ? "🔊" : "🔈"}
            </button>

            {/* Ảnh trang trí */}
            <img src={deco1} alt="deco1" className="deco deco1" />
            <img src={deco2} alt="deco2" className="deco deco2" />
            <img src={deco3} alt="deco3" className="deco deco3" />
            <img src={deco4} alt="deco4" className="deco deco4" />
            <img src={deco5} alt="deco5" className="deco deco5" />
            <img src={deco6} alt="deco6" className="deco deco6" />

            {/* Ảnh chính */}
            <div className="photo-frame" onClick={handleCenterClick}>
                <img src={centerImg} alt="center" className="center-photo" />
            </div>

            {/* Lời chúc */}
            <div className="love-text">
                <p>Cảm ơn em đã xuất hiện trong cuộc đời anh 💖</p>
                <p>
                    Nhân dịp sinh nhật, anh chúc mọi điều tốt đẹp luôn bên em 🎂✨
                </p>
            </div>
        </div>
    );
};

export default LovePage;
