import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { systemVariants } from "@motion";
import { TypewriterText } from "@TypewriterText";

// Asset Import
import detailWeave3 from '@assets/detail-weave-3.jpeg';

const SplitManifesto = ({ sectionId = "manifesto-main" }) => {
  const containerRef = useRef(null);
  
  // Parallax logic for the left image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id={sectionId}
      ref={containerRef}
      className="bg-grid-texture border-border bg-background relative w-full overflow-hidden border-b"
    >
      <div className="flex flex-col lg:flex-row">
        
        {/* ── 01. VISUAL PANEL (Left) ─────────────────── */}
        <div className="relative h-[60vh] w-full overflow-hidden lg:h-screen lg:w-1/2">
          <motion.img
            style={{ y, scale: 1.2 }}
            src={detailWeave3}
            alt="Technical weave detail"
            className="h-full w-full object-cover grayscale brightness-[0.85] contrast-[1.1]"
          />
          
          {/* Surface Data Stamp */}
          <div className="border-primary absolute bottom-12 left-12 border-l pl-4">
            <p className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase">
              Surface_Analysis
            </p>
            <p className="text-foreground/40 font-mono text-[8px] tracking-[0.2em] uppercase">
              Micro_Mesh_v1 // 001
            </p>
          </div>
        </div>

        {/* ── 02. CONTENT PANEL (Right) ────────────────── */}
        <div className="flex w-full flex-col justify-center px-8 py-24 lg:w-1/2 lg:px-24">
          <motion.div
            variants={systemVariants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-xl"
          >
            <TypewriterText 
              text="The_Protocol"
              delay={0.2}
              className="text-primary mb-8 font-mono text-[10px] tracking-[0.5em] uppercase"
            />

            <h2 className="font-headline text-foreground mb-10 text-6xl leading-[0.85] font-black tracking-tighter uppercase italic lg:text-8xl">
              Engineered <br />
              To Move <br />
              <span 
                className="text-transparent" 
                style={{ WebkitTextStroke: "1.5px var(--foreground)" }}
              >
                Different
              </span>
            </h2>

            <div className="text-muted-foreground space-y-8 font-mono text-xs leading-relaxed tracking-tight lg:text-sm">
              <p>
                Standardization is the enemy of performance. We’ve stripped back 
                the traditional silhouette to reveal a high-density weave 
                capable of extreme kinetic response.
              </p>
              <p>
                Designed during the blue hour, optimized for the concrete. 
                Every stitch is a data point; every curve is a calculated trajectory.
              </p>
            </div>

            {/* Performance Metrics */}
            <div className="border-border mt-16 flex items-center gap-16 border-t pt-12">
              <div>
                <p className="text-foreground/30 mb-2 font-mono text-[8px] tracking-widest uppercase">
                  Response_Rate
                </p>
                <p className="text-foreground font-headline text-3xl font-bold italic">
                  99.8%
                </p>
              </div>
              <div>
                <p className="text-foreground/30 mb-2 font-mono text-[8px] tracking-widest uppercase">
                  Mass_Index
                </p>
                <p className="text-foreground font-headline text-3xl font-bold italic">
                  240G
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SplitManifesto;
