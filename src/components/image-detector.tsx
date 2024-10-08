'use client'

import { useEffect, useRef } from "react";

interface ImageBackgroundDetectorProps {
  imageUrl: any
}

export const ImageBackgroundDetector = ({ imageUrl }: ImageBackgroundDetectorProps) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(canvas) {
      //@ts-ignore
      const ctx = canvas.getContext('2d');

      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = imageUrl;

      image.onload = () => {
        // Draw the image onto the canvas
        ctx.drawImage(image, 0, 0);

        // Get the pixel data of the top-left corner (position: 0,0)
        const pixelData = ctx.getImageData(0, 0, 1, 1).data;

        // Extract RGB values from the pixel data
        const [red, green, blue] = pixelData;

        // Convert RGB values to hex code
        const hexCode = rgbToHex(red, green, blue);

        console.log('Background color:', hexCode);
      };
    }
  }, [imageUrl]);

  // Helper function to convert RGB values to hex code
  const rgbToHex = (r: number, g: number, b: number) =>
    `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;

  return <canvas ref={canvasRef} />;
};