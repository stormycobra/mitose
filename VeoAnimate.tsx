
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Upload, Film, Loader2, AlertCircle, Play, Sparkles } from 'lucide-react';

export const VeoAnimate: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.indexOf("image") === -1) {
          setError("Upload alstublieft een geldig afbeeldingsbestand.");
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setVideoUrl(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;

    try {
        setLoading(true);
        setError(null);
        setStatus('Controleren van API sleutel...');

        // Check for API key access using the provided method in the prompt instructions
        if ((window as any).aistudio && !await (window as any).aistudio.hasSelectedApiKey()) {
             await (window as any).aistudio.openSelectKey();
        }

        // Initialize AI with the key from process.env (injected by the environment)
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        setStatus('Start generatie...');

        const base64Image = image.split(',')[1];
        const mimeType = image.split(';')[0].split(':')[1];
        
        // Default prompt if none provided
        const effectivePrompt = prompt.trim() || "Cinematic movement, high quality";

        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: effectivePrompt,
            image: {
                imageBytes: base64Image,
                mimeType: mimeType,
            },
            config: {
                numberOfVideos: 1,
                resolution: '1080p',
                aspectRatio: aspectRatio
            }
        });

        setStatus('Video wordt gegenereerd... (dit kan even duren)');

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            operation = await ai.operations.getVideosOperation({operation: operation});
        }

        if (operation.error) {
            throw new Error(operation.error.message || "Generatie mislukt");
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) throw new Error("Geen video link ontvangen");

        setStatus('Video ophalen...');
        
        // Fetch the actual video bytes using the URI + API Key
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!videoResponse.ok) throw new Error("Kon video niet downloaden");
        
        const videoBlob = await videoResponse.blob();
        const videoObjectUrl = URL.createObjectURL(videoBlob);
        
        setVideoUrl(videoObjectUrl);

    } catch (err: any) {
        console.error(err);
        setError(err.message || "Er is iets misgegaan tijdens het genereren.");
    } finally {
        setLoading(false);
        setStatus('');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-2 md:p-6 animate-in fade-in duration-500">
        <div className="max-w-3xl w-full text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-indigo-700 tracking-tight mb-3">
                Veo Animate
            </h1>
            <p className="text-slate-500 text-lg">
                Breng je afbeeldingen tot leven met Google's Veo AI
            </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full border border-slate-100">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Input Section */}
                <div className="flex-1 space-y-6">
                    
                    {/* Image Upload */}
                    <div 
                        className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all aspect-video ${image ? 'border-indigo-300 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {image ? (
                            <img src={image} alt="Preview" className="max-h-64 rounded shadow-sm object-contain" />
                        ) : (
                            <div className="text-center text-slate-500">
                                <Upload className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                                <p className="font-semibold">Klik om een foto te uploaden</p>
                                <p className="text-sm">of sleep een bestand hierheen</p>
                            </div>
                        )}
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileChange}
                        />
                        {image && (
                            <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full shadow-sm">
                                <span className="text-xs font-bold px-2 text-indigo-700">Afbeelding geladen</span>
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Beschrijf de animatie (optioneel)
                            </label>
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Bijv: Een filmisch shot van de cel die langzaam draait..."
                                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                rows={2}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Aspect Ratio
                            </label>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setAspectRatio('16:9')}
                                    className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${aspectRatio === '16:9' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600 hover:border-indigo-300'}`}
                                >
                                    Landscape (16:9)
                                </button>
                                <button 
                                    onClick={() => setAspectRatio('9:16')}
                                    className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${aspectRatio === '9:16' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600 hover:border-indigo-300'}`}
                                >
                                    Portrait (9:16)
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={handleGenerate}
                            disabled={!image || loading}
                            className={`w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${!image || loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]'}`}
                        >
                            {loading ? (
                                <><Loader2 className="animate-spin" /> {status || 'Genereren...'}</>
                            ) : (
                                <><Sparkles className="w-5 h-5" /> Genereer Video</>
                            )}
                        </button>
                        
                        {error && (
                            <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 border border-red-100">
                                <AlertCircle size={20} />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}
                        
                        <div className="text-xs text-center text-slate-400 mt-2">
                             Model: veo-3.1-fast-generate-preview
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] bg-slate-100 rounded-xl border border-slate-200 overflow-hidden">
                    {videoUrl ? (
                        <div className="relative w-full h-full flex items-center justify-center bg-black">
                            <video 
                                src={videoUrl} 
                                controls 
                                autoPlay 
                                loop 
                                className="max-w-full max-h-[500px]"
                            />
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 p-8">
                            <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="font-medium">Hier verschijnt je video</p>
                            <p className="text-sm opacity-75">Upload een foto en klik op genereer</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};
