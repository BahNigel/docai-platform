import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  AiOutlineMessage, // ML NLP
  AiOutlineEye,     // Computer Vision
  AiOutlineNumber,  // Tabular ML (not available, use AiOutlineNumber as closest)
  AiOutlineLineChart, // Time Series
  AiOutlineCluster, // Clustering
} from "react-icons/ai";
import { GiArtificialIntelligence } from "react-icons/gi";

function TechLinesBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const lines = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 80 + 20,
      speed: Math.random() * 0.5 + 0.2,
      angle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
      ctx.lineWidth = 1;

      lines.forEach((line) => {
        ctx.beginPath();
        const x2 = line.x + Math.cos(line.angle) * line.length;
        const y2 = line.y + Math.sin(line.angle) * line.length;
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        // wrap around screen
        if (line.x > width || line.x < 0 || line.y > height || line.y < 0) {
          line.x = Math.random() * width;
          line.y = Math.random() * height;
          line.angle = Math.random() * Math.PI * 2;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default function LandingPage() {
  const features = [
    {
      title: "ML NLP",
      description: "Utilizes natural language processing for text analysis",
      icon: <AiOutlineMessage />,
    },
    {
      title: "Computer Vision",
      description: "Processes and understands visual data",
      icon: <AiOutlineEye />,
    },
    {
      title: "Tabular ML",
      description: "Analyzes and models tabular datasets",
      icon: <AiOutlineNumber />,
    },
    {
      title: "Time Series",
      description: "Handles and forecasts time-dependent data",
      icon: <AiOutlineLineChart />,
    },
    {
      title: "Clustering",
      description: "Discovers hidden patterns and groupings",
      icon: <AiOutlineCluster />,
    },
    {
      title: "Generative AI",
      description: "Generates new content and insights",
      icon: <GiArtificialIntelligence />,
    },
  ];

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        position: "relative",
        backgroundColor: "#0a0f1c",
        color: "white",
        padding: "4rem 1.5rem",
        zIndex: 1,
      }}
    >
      <TechLinesBackground />
      <div
        className="container p-5 rounded-4 d-flex flex-column align-items-center"
        style={{ backgroundColor: "#0a0f1c", maxWidth: "1100px", zIndex: 2 }}
      >
        <h1
          className="fw-bold mb-3"
          style={{
            fontSize: "2.5rem",
            lineHeight: "1.2",
            textAlign: "center",
          }}
        >
          AI-Powered Intelligent Knowledge Management Platform
        </h1>
        <p
          className="text-secondary mb-4"
          style={{ fontSize: "1.125rem", textAlign: "center" }}
        >
          A system that leverages advanced AI techniques to store, organize, and retrieve knowledge efficiently.
        </p>
        <div className="d-flex justify-content-center mb-5 w-100">
          <Link
            to="/home"
            className="btn btn-primary px-4 py-2 fs-5 fw-semibold mx-auto"
            style={{ backgroundColor: "#2563eb", borderColor: "#2563eb" }}
          >
            Get Started
          </Link>
        </div>

        <div className="row g-4 justify-content-center w-100">
          {features.map((feature, index) => (
            <div key={index} className="col-md-4 d-flex justify-content-center">
              <div
                className="p-4 rounded-4 h-100 text-center"
                style={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  minWidth: "220px",
                  maxWidth: "260px",
                  margin: "0 auto",
                }}
              >
                <div className="fs-2 mb-2">{feature.icon}</div>
                <h5 className="text-white fw-semibold mb-2">{feature.title}</h5>
                <p className="text-secondary small mb-0">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
