import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/PixelPortrait.module.scss";

const PixelPortrait: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [finished, setFinished] = useState(false);
    const [musicOn, setMusicOn] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const img = new Image();
        img.src =
            "/images/z7044059132215_030da75e4a5a4fdaed1d0e55fa7e2d82.jpg";

        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d")!; // ✅ ép kiểu, fix TS18047
            const size = 80;

            const offCanvas = document.createElement("canvas");
            offCanvas.width = size;
            offCanvas.height = size;
            const offCtx = offCanvas.getContext("2d")!;
            offCtx.drawImage(img, 0, 0, size, size);

            const imageData = offCtx.getImageData(0, 0, size, size);

            const scaleX = canvas.width / size;
            const scaleY = canvas.height / size;

            let currentPixel = 0;
            const total = size * size;
            const delay = 1;
            let lastTime = 0;

            function drawNext(timestamp?: number) {
                if (!timestamp) timestamp = performance.now();

                if (timestamp - lastTime >= delay) {
                    if (currentPixel >= total) {
                        setFinished(true);
                        return;
                    }

                    const x = currentPixel % size;
                    const y = Math.floor(currentPixel / size);
                    const idx = (y * size + x) * 4;
                    const r = imageData.data[idx];
                    const g = imageData.data[idx + 1];
                    const b = imageData.data[idx + 2];

                    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                    ctx.fillRect(x * scaleX, y * scaleY, scaleX, scaleY);

                    currentPixel++;
                    lastTime = timestamp;
                }

                if (currentPixel < total) {
                    requestAnimationFrame(drawNext);
                }
            }

            drawNext();
        };
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;
        if (musicOn) {
            audioRef.current.play().catch(() => {});
        } else {
            audioRef.current.pause();
        }
    }, [musicOn]);

    return (
        <div className={styles.container}>
            {/* SVG trái tim bao quanh */}
            <svg
                viewBox="0 0 300 300"
                className={`${styles.heartFrame} ${finished ? styles.finished : ""}`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M150 270
           C 20 180, 20 70, 150 100
           C 280 70, 280 180, 150 270 Z"
                />
            </svg>

            <div className={`${styles.wrapper} ${finished ? styles.finished : ""}`}>
                <canvas
                    ref={canvasRef}
                    width={300}
                    height={300}
                    className={styles.canvas}
                />
                <img
                    src="/images/z7044059132215_030da75e4a5a4fdaed1d0e55fa7e2d82.jpg"
                    alt="Original"
                    className={`${styles.originalImage} ${
                        finished ? styles.finished : ""
                    }`}
                />
            </div>

            <audio ref={audioRef} src="/music/love-song.mp3" loop preload="auto" />

            <button
                onClick={() => setMusicOn(!musicOn)}
                className={`${styles.audioToggle} ${musicOn ? styles.on : ""}`}
                aria-label={musicOn ? "Tắt nhạc" : "Bật nhạc"}
            >
                {musicOn ? "🔊 Nhạc đang bật" : "🔈 Nhạc tắt"}
            </button>
        </div>
    );
};

export default PixelPortrait;
