import React, { useEffect } from 'react';
import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.1.0/+esm";
import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.1.0/+esm";

const Particles = () => {
    const configs = {
        particles: {
            color: {
            value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"]
        },
        move: {
            enable: true,
            outModes: "out",
            speed: { min: 1, max: 3 },
            path: {
                enable: true,
                options: {
                    waveLength: { min: 3, max: 7 },
                    waveHeight: { min: 1, max: 5 }
                },
            generator: "zigZagPathGenerator"
            },
        trail: {
            enable: true,
            length: 70,
            fill: {
                color: "#fff"
            }
        }
    },
    number: {
        value: 50
        },
    opacity: {
        value: 0.9
    },
    shape: {
      type: "circle"
    },
    size: {
      value: 5
    }
  },
};

useEffect(() => {
    const loadParticles = async () => {
      await loadAll(tsParticles);
      await tsParticles.load({ id: "tsparticles", options: configs });
    };

    loadParticles();
  }, []);

  return <div id="tsparticles" className="particles" />;
};

export default Particles;