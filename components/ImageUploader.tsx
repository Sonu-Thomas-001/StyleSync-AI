import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { removeBackground } from '../services/geminiService';
import { ClothingAnalysis } from '../types';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  selectedImage: string | null;
  onClear: () => void;
  analysis?: ClothingAnalysis | null;
  isAnalyzing?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelected, 
  selectedImage, 
  onClear,
  analysis,
  isAnalyzing
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isRemovingBg, setIsRemovingBg] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    if (isCameraOpen) {
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 }, // Try for higher res
          height: { ideal: 1080 } 
        } 
      })
      .then(s => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Camera access error:", err);
        setCameraError("Camera access denied.");
      });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1]; 
      onImageSelected(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const startCamera = () => {
    setCameraError(null);
    setIsCameraOpen(true);
  };

  const stopCamera = () => {
    setIsCameraOpen(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64String = canvas.toDataURL('image/jpeg', 0.9);
        const base64Data = base64String.split(',')[1];
        onImageSelected(base64Data);
        stopCamera();
      }
    }
  };

  const handleRemoveBg = async () => {
    if (!selectedImage || isRemovingBg) return;
    
    setIsRemovingBg(true);
    try {
      const newImageWithPrefix = await removeBackground(selectedImage);
      // The service returns data:image/png;base64,.... We need to strip the prefix for onImageSelected 
      // as per existing pattern, though ideally we should handle full data URLs.
      const base64Data = newImageWithPrefix.split(',')[1];
      onImageSelected(base64Data);
    } catch (err) {
      console.error("Failed to remove background", err);
      // Optional: Add a toast notification here
    } finally {
      setIsRemovingBg(false);
    }
  };

  if (selectedImage) {
    return (
      <div className="relative group w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-stone-200 animate-scale-in bg-white">
        <img 
          src={`data:image/jpeg;base64,${selectedImage}`} 
          alt="Selected Item" 
          className="w-full h-full object-contain bg-stone-50"
        />
        
        {/* Loading Overlay for BG Removal or Analysis */}
        {(isRemovingBg || isAnalyzing) && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center">
             <div className="w-10 h-10 border-2 border-stone-200 border-t-stone-800 rounded-full animate-spin mb-3"></div>
             <p className="text-xs font-bold uppercase tracking-widest text-stone-600">
               {isRemovingBg ? "Removing Background..." : "Analyzing Fabric & Texture..."}
             </p>
          </div>
        )}

        {/* Analysis Tags Overlay */}
        {!isRemovingBg && !isAnalyzing && analysis && (
          <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10 pointer-events-none">
            <span className="backdrop-blur-md bg-stone-900/10 text-stone-900 border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
              {analysis.fabric}
            </span>
            <span className="backdrop-blur-md bg-stone-900/10 text-stone-900 border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
              {analysis.seasonality}
            </span>
            <span className="backdrop-blur-md bg-stone-900/10 text-stone-900 border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
              {analysis.formality}
            </span>
            {analysis.colors?.[0] && (
               <span className="backdrop-blur-md bg-stone-900/10 text-stone-900 border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
               {analysis.colors[0]}
             </span>
            )}
          </div>
        )}

        <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 z-30">
          <Button variant="glass" onClick={handleRemoveBg} className="shadow-xl min-w-[170px]" disabled={isRemovingBg || !!isAnalyzing}>
            Remove Background
          </Button>
          <Button variant="secondary" onClick={onClear} className="shadow-xl min-w-[170px]" disabled={isRemovingBg || !!isAnalyzing}>
            Replace Item
          </Button>
        </div>
      </div>
    );
  }

  if (isCameraOpen) {
    return (
      <div className="relative w-full max-w-sm mx-auto aspect-[3/4] bg-black rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
        <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="absolute inset-0 w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Camera UI Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
          <div className="flex justify-end">
            <button onClick={stopCamera} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            {cameraError && <p className="text-red-400 bg-black/50 px-3 py-1 rounded-md text-sm">{cameraError}</p>}
            
            <button 
              onClick={capturePhoto}
              className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
            >
              <div className="w-14 h-14 rounded-full bg-white border-2 border-black"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl transition-all duration-500 ease-out flex flex-col items-center justify-center p-8 text-center cursor-pointer group overflow-hidden
        ${isDragging 
          ? 'bg-stone-100 ring-2 ring-stone-400 scale-[1.02]' 
          : 'bg-white border border-stone-100 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-stone-200/80 hover:-translate-y-1'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />
      
      {/* Decorative Background Element */}
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-50 via-white to-stone-50 opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 mb-6 rounded-full bg-stone-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <svg className="w-8 h-8 text-stone-400 group-hover:text-stone-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h3 className="text-xl font-serif text-stone-900 mb-2">The Wardrobe</h3>
        <p className="text-sm text-stone-500 mb-8 max-w-[200px] leading-relaxed">
          Upload a clear photo of your item to begin styling
        </p>
        
        <div className="flex flex-col w-full gap-3 px-4">
          <Button variant="outline" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="w-full">
            Select from Library
          </Button>
          <Button variant="primary" onClick={(e) => { e.stopPropagation(); startCamera(); }} className="w-full">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Camera
          </Button>
        </div>
      </div>
    </div>
  );
};