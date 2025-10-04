import { useEffect, useRef } from 'react';
import earthImg from '../assets/Earth-PNG-File.png';
import '../styles/StarField.scss';
import moonImg from '../assets/z7080965655930_4f0969e023356fddfcd3e0e566292c11.jpg';
import satelliteImg from '../assets/z7044059132215_030da75e4a5a4fdaed1d0e55fa7e2d82.jpg';

interface Star {
    angle: number;
    radius: number;
    size: number;
    speed: number;
}

interface OrbitingObject {
    angle: number;
    radius: number;
    speed: number;
    baseSize: number;
    zoomSpeed: number;
    image: HTMLImageElement;
}

const StarField: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const orbitObjectsRef = useRef<OrbitingObject[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setSize();

        // Khởi tạo các vì sao
        const numStars = 300;
        starsRef.current = Array.from({ length: numStars }, () => ({
            angle: Math.random() * Math.PI * 2,
            radius: Math.random() * 300 + 100,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.0006 + 0.0006,
        }));

        // Khởi tạo Trái Đất
        const earth = new Image();
        earth.src = earthImg;

        // Khởi tạo ảnh quay quanh
        const moon = new Image();
        moon.src = moonImg;

        const satellite = new Image();
        satellite.src = satelliteImg;

        // Danh sách vật thể quay quanh
        orbitObjectsRef.current = [
            {
                angle: 0,
                radius: 150,
                speed: 0.0008,
                baseSize: 20,
                zoomSpeed: 0.03,
                image: moon,
            },
            {
                angle: Math.PI,
                radius: 220,
                speed: 0.0007,
                baseSize: 25,
                zoomSpeed: 0.02,
                image: satellite,
            },
        ];

        let frame = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Vẽ các vì sao
            starsRef.current.forEach((star) => {
                star.angle += star.speed;
                const x = centerX + Math.cos(star.angle) * star.radius;
                const y = centerY + Math.sin(star.angle) * star.radius;

                ctx.beginPath();
                ctx.arc(x, y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
            });

            // Vẽ các ảnh quay quanh
            orbitObjectsRef.current.forEach((obj, index) => {
                obj.angle += obj.speed;

                const x = centerX + Math.cos(obj.angle) * obj.radius;
                const y = centerY + Math.sin(obj.angle) * obj.radius;

                // Tạo hiệu ứng zoom
                const scale = 3 + Math.sin(frame * obj.zoomSpeed + index) * 0.2;
                const size = obj.baseSize * scale;

                if (obj.image.complete) {
                    ctx.drawImage(obj.image, x - size / 2, y - size / 2, size, size);
                }
            });

            // Vẽ Trái Đất
            if (earth.complete) {
                ctx.drawImage(earth, centerX - 80, centerY - 80, 160, 160);
            }

            frame++;
            requestAnimationFrame(animate);
        };

        animate();
        window.addEventListener('resize', setSize);
        return () => window.removeEventListener('resize', setSize);
    }, []);

    return <canvas ref={canvasRef} className="star-canvas" />;
};

export default StarField;
