<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mitose Simulatie - Interactieve Animatie</title>
    
    <!-- Tailwind CSS laden -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- React en ReactDOM laden -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    
    <!-- Babel laden om JSX te vertalen -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- Google Fonts voor een nette look -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 min-h-screen">

    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef } = React;

        // Icoon componenten (vervanging voor lucide-react import)
        const IconPlay = ({ size = 24 }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        );
        const IconPause = ({ size = 24 }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        );
        const IconRotateCcw = ({ size = 24 }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
        );
        const IconChevronRight = ({ size = 24 }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        );
        const IconChevronLeft = ({ size = 24 }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        );
        const IconInfo = ({ size = 24 }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        );

        const MitoseSimulatie = () => {
            const [fase, setFase] = useState(0);
            const [isPlaying, setIsPlaying] = useState(false);
            const timerRef = useRef(null);

            const fasen = [
                {
                    titel: "Interfase",
                    subtitel: "De Voorbereiding",
                    beschrijving: "De cel is in rust en groeit. Het DNA in de kern wordt gekopieerd (gerepliceerd), maar is nog een warrige kluwen (chromatine). De celkern is intact.",
                    details: ["DNA replicatie", "Celgroei", "Chromosomen nog niet zichtbaar"]
                },
                {
                    titel: "Profase",
                    subtitel: "De Start",
                    beschrijving: "Het DNA rolt zich strak op en vormt zichtbare chromosomen (X-vorm). Het kernmembraan begint af te breken. De centriolen (poollichaampjes) bewegen naar de zijkanten.",
                    details: ["Chromosomen condenseren", "Kernmembraan verdwijnt", "Centriolen verplaatsen"]
                },
                {
                    titel: "Metafase",
                    subtitel: "Het Midden",
                    beschrijving: "De chromosomen worden door trekdraden naar het midden van de cel geduwd. Ze liggen nu netjes op één lijn (het equatorvlak).",
                    details: ["Chromosomen op de evenaar", "Trekdraden hechten vast", "Maximale spiralisatie"]
                },
                {
                    titel: "Anafase",
                    subtitel: "De Splitsing",
                    beschrijving: "De trekdraden trekken samen. De X-vormige chromosomen breken in tweeën. De chromatiden worden als V-vormen naar de tegenovergestelde polen getrokken.",
                    details: ["Chromatiden splitsen", "Beweging naar polen", "Cel wordt iets langwerpiger"]
                },
                {
                    titel: "Telofase",
                    subtitel: "De Herbouwing",
                    beschrijving: "De chromosomen zijn aangekomen bij de polen. Er vormen zich twee nieuwe celkernen. De chromosomen rollen zich weer langzaam uit.",
                    details: ["Nieuwe kernmembranen", "Chromosomen despiraliseren", "Insnoering begint"]
                },
                {
                    titel: "Cytokinese",
                    subtitel: "De Deling",
                    beschrijving: "Het celmembraan snoert volledig in. De cel splitst zich in twee identieke dochtercellen. Het proces is voltooid.",
                    details: ["Twee losse cellen", "Identiek DNA", "Terug naar interfase"]
                }
            ];

            const nextFase = () => {
                setFase((prev) => (prev + 1) % fasen.length);
            };

            const prevFase = () => {
                setFase((prev) => (prev - 1 + fasen.length) % fasen.length);
            };

            const reset = () => {
                setFase(0);
                setIsPlaying(false);
            };

            const togglePlay = () => {
                setIsPlaying(!isPlaying);
            };

            useEffect(() => {
                if (isPlaying) {
                    timerRef.current = setInterval(() => {
                        setFase((prev) => {
                            if (prev === fasen.length - 1) {
                                setIsPlaying(false);
                                return prev;
                            }
                            return prev + 1;
                        });
                    }, 3000); 
                } else {
                    clearInterval(timerRef.current);
                }
                return () => clearInterval(timerRef.current);
            }, [isPlaying]);

            // Hulpcomponenten
            const Chromosome = ({ type, position, rotation, opacity = 1 }) => {
                const baseStyle = `absolute transition-all duration-1000 ease-in-out w-8 h-8 flex items-center justify-center text-indigo-600 font-bold text-2xl`;
                
                const style = {
                    left: position.x,
                    top: position.y,
                    transform: `rotate(${rotation}deg)`,
                    opacity: opacity
                };

                if (type === 'messy') {
                    return (
                        <div className="absolute transition-all duration-1000" style={{ left: position.x, top: position.y, opacity }}>
                           <svg width="40" height="40" viewBox="0 0 100 100" className="stroke-indigo-400 fill-none stroke-2">
                             <path d="M10,50 Q30,10 50,50 T90,50" />
                             <path d="M10,30 Q30,70 50,30 T90,30" />
                           </svg>
                        </div>
                    );
                }

                if (type === 'v-split') {
                    return (
                        <React.Fragment>
                            <div style={{ ...style, transform: `rotate(${rotation - 90}deg) translate(-20px, 0)` }} className={baseStyle}>&lt;</div>
                            <div style={{ ...style, transform: `rotate(${rotation + 90}deg) translate(-20px, 0)` }} className={baseStyle}>&gt;</div>
                        </React.Fragment>
                    )
                }

                return <div style={style} className={baseStyle}>X</div>;
            };

            const getCellState = (fase) => {
                let cellShape = "w-64 h-64 rounded-full";
                let nucleusOpacity = 1;
                let nucleusBorder = "border-solid";
                let chromosomes = [];
                let showCentrioles = false;
                let spindleOpacity = 0;
                let cellGap = 0; 
                let membraneOpacity = 0; 

                switch(fase) {
                    case 0: // Interfase
                        cellShape = "w-64 h-64 rounded-full";
                        chromosomes = [
                            { id: 1, type: 'messy', x: '30%', y: '30%' },
                            { id: 2, type: 'messy', x: '50%', y: '40%' },
                            { id: 3, type: 'messy', x: '40%', y: '60%' },
                        ];
                        break;
                    case 1: // Profase
                        nucleusBorder = "border-dotted";
                        nucleusOpacity = 0.5;
                        showCentrioles = true;
                        chromosomes = [
                            { id: 1, type: 'x', x: '30%', y: '30%', r: 15 },
                            { id: 2, type: 'x', x: '60%', y: '40%', r: -10 },
                            { id: 3, type: 'x', x: '45%', y: '65%', r: 45 },
                        ];
                        break;
                    case 2: // Metafase
                        nucleusOpacity = 0;
                        showCentrioles = true;
                        spindleOpacity = 1;
                        chromosomes = [
                            { id: 1, type: 'x', x: '45%', y: '20%', r: 90 },
                            { id: 2, type: 'x', x: '45%', y: '45%', r: 90 },
                            { id: 3, type: 'x', x: '45%', y: '70%', r: 90 },
                        ];
                        break;
                    case 3: // Anafase
                        cellShape = "w-80 h-64 rounded-[40%]"; 
                        nucleusOpacity = 0;
                        showCentrioles = true;
                        spindleOpacity = 0.5;
                        chromosomes = [
                            { id: 1, type: 'v-split', x: '45%', y: '20%', r: 90 }, 
                            { id: 2, type: 'v-split', x: '45%', y: '45%', r: 90 },
                            { id: 3, type: 'v-split', x: '45%', y: '70%', r: 90 },
                        ];
                        break;
                    case 4: // Telofase
                        cellShape = "w-80 h-64 rounded-[3rem]"; 
                        nucleusOpacity = 0;
                        membraneOpacity = 1;
                        showCentrioles = true;
                        spindleOpacity = 0.2;
                        break;
                    case 5: // Cytokinese
                        cellShape = "w-64 h-64"; 
                        cellGap = 1; 
                        nucleusOpacity = 1;
                        nucleusBorder = "border-solid";
                        chromosomes = [
                            { id: 1, type: 'messy', x: '30%', y: '30%' },
                            { id: 2, type: 'messy', x: '50%', y: '50%' }
                        ];
                        break;
                    default: break;
                }
                return { cellShape, nucleusOpacity, nucleusBorder, chromosomes, showCentrioles, spindleOpacity, cellGap, membraneOpacity };
            };

            const currentState = getCellState(fase);

            return (
                <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 md:p-8">
                
                {/* Header */}
                <div className="max-w-3xl w-full text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-2">Mitose Simulator</h1>
                    <p className="text-slate-500">Een interactieve reis door de celdeling</p>
                </div>

                {/* Main Visualization Container */}
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full flex flex-col md:flex-row gap-8 items-center min-h-[500px]">
                    
                    {/* Animation Stage */}
                    <div className="flex-1 w-full h-[400px] bg-slate-100 rounded-xl relative flex items-center justify-center overflow-hidden border border-slate-200">
                        
                        {/* Achtergrond Grid */}
                        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

                        {currentState.cellGap === 1 ? (
                            <div className="flex gap-4 transition-all duration-1000">
                                {[1, 2].map((i) => (
                                    <div key={i} className="w-40 h-40 bg-indigo-100 border-4 border-indigo-300 rounded-full relative flex items-center justify-center animate-in fade-in zoom-in duration-1000">
                                        <div className="w-24 h-24 border-2 border-indigo-400 rounded-full opacity-60 flex items-center justify-center">
                                            <div className="opacity-50 text-indigo-800 text-xs">DNA</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={`${currentState.cellShape} bg-indigo-100 border-4 border-indigo-300 relative transition-all duration-1000 ease-in-out`}>
                                
                                {currentState.showCentrioles && (
                                    <React.Fragment>
                                        <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-4 bg-orange-400 rounded transition-all duration-1000 ${fase >= 2 ? '-top-8' : 'top-4'}`}></div>
                                        <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-4 bg-orange-400 rounded transition-all duration-1000 ${fase >= 2 ? '-bottom-8' : 'bottom-4'}`}></div>
                                    </React.Fragment>
                                )}

                                <div className={`absolute inset-0 transition-opacity duration-1000 ${currentState.spindleOpacity > 0 ? 'opacity-100' : 'opacity-0'}`} style={{ pointerEvents: 'none' }}>
                                    <svg width="100%" height="100%">
                                        <line x1="50%" y1="0%" x2="50%" y2="50%" stroke="#fb923c" strokeWidth="2" strokeDasharray="4" />
                                        <line x1="50%" y1="100%" x2="50%" y2="50%" stroke="#fb923c" strokeWidth="2" strokeDasharray="4" />
                                        <line x1="50%" y1="0%" x2="30%" y2="50%" stroke="#fb923c" strokeWidth="1" strokeDasharray="4" className="opacity-50" />
                                        <line x1="50%" y1="100%" x2="30%" y2="50%" stroke="#fb923c" strokeWidth="1" strokeDasharray="4" className="opacity-50" />
                                        <line x1="50%" y1="0%" x2="70%" y2="50%" stroke="#fb923c" strokeWidth="1" strokeDasharray="4" className="opacity-50" />
                                        <line x1="50%" y1="100%" x2="70%" y2="50%" stroke="#fb923c" strokeWidth="1" strokeDasharray="4" className="opacity-50" />
                                    </svg>
                                </div>

                                <div className={`absolute inset-0 m-auto w-40 h-40 border-4 border-indigo-400 rounded-full transition-all duration-1000 flex items-center justify-center ${currentState.nucleusBorder}`} 
                                    style={{ opacity: currentState.nucleusOpacity }}>
                                    {fase === 0 && <span className="text-xs text-indigo-400 font-semibold absolute bottom-2">Kern</span>}
                                </div>

                                {currentState.membraneOpacity > 0 && (
                                    <React.Fragment>
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-24 border-2 border-dotted border-indigo-500 rounded-full opacity-0 animate-in fade-in duration-1000" style={{opacity: 1}}></div>
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-24 border-2 border-dotted border-indigo-500 rounded-full opacity-0 animate-in fade-in duration-1000" style={{opacity: 1}}></div>
                                    </React.Fragment>
                                )}

                                {fase === 3 ? (
                                    <React.Fragment>
                                        <div className="absolute top-10 left-[30%] text-indigo-600 font-bold rotate-90 transition-all duration-1000 transform translate-y-[-20px]">&lt;</div>
                                        <div className="absolute top-10 left-[50%] text-indigo-600 font-bold rotate-90 transition-all duration-1000 transform translate-y-[-20px] translate-x-[-50%]">&lt;</div>
                                        <div className="absolute top-10 left-[70%] text-indigo-600 font-bold rotate-90 transition-all duration-1000 transform translate-y-[-20px]">&lt;</div>

                                        <div className="absolute bottom-10 left-[30%] text-indigo-600 font-bold rotate-90 transition-all duration-1000 transform translate-y-[20px]">&gt;</div>
                                        <div className="absolute bottom-10 left-[50%] text-indigo-600 font-bold rotate-90 transition-all duration-1000 transform translate-y-[20px] translate-x-[-50%]">&gt;</div>
                                        <div className="absolute bottom-10 left-[70%] text-indigo-600 font-bold rotate-90 transition-all duration-1000 transform translate-y-[20px]">&gt;</div>
                                    </React.Fragment>
                                ) : fase === 4 ? (
                                    <React.Fragment>
                                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-1">
                                            <span className="text-indigo-600 font-bold rotate-90 opacity-50">&lt;</span>
                                            <span className="text-indigo-600 font-bold rotate-90 opacity-50">&lt;</span>
                                            <span className="text-indigo-600 font-bold rotate-90 opacity-50">&lt;</span>
                                        </div>
                                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                                            <span className="text-indigo-600 font-bold rotate-90 opacity-50">&gt;</span>
                                            <span className="text-indigo-600 font-bold rotate-90 opacity-50">&gt;</span>
                                            <span className="text-indigo-600 font-bold rotate-90 opacity-50">&gt;</span>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    currentState.chromosomes.map((c) => (
                                        <Chromosome key={c.id} type={c.type} position={{x: c.x, y: c.y}} rotation={c.r || 0} />
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {/* Info Panel & Controls */}
                    <div className="flex-1 w-full flex flex-col gap-6">
                        
                        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">Fase {fase}</span>
                                <h2 className="text-2xl font-bold text-indigo-900">{fasen[fase].titel}</h2>
                            </div>
                            <h3 className="text-lg text-indigo-600 font-semibold mb-3">{fasen[fase].subtitel}</h3>
                            <p className="text-slate-700 leading-relaxed mb-4 min-h-[80px]">
                                {fasen[fase].beschrijving}
                            </p>
                            
                            <div className="bg-white p-4 rounded-lg border border-indigo-100">
                                <h4 className="flex items-center gap-2 font-semibold text-sm text-slate-500 mb-2">
                                    <IconInfo size={16} />
                                    Kenmerken:
                                </h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {fasen[fase].details.map((detail, idx) => (
                                        <li key={idx} className="text-sm text-slate-600">{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <button 
                                onClick={reset}
                                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                                title="Opnieuw beginnen"
                            >
                                <IconRotateCcw size={24} />
                            </button>

                            <div className="flex gap-4">
                                <button 
                                    onClick={prevFase}
                                    disabled={fase === 0}
                                    className="px-4 py-2 flex items-center gap-2 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <IconChevronLeft size={20} />
                                    Vorige
                                </button>

                                <button 
                                    onClick={togglePlay}
                                    className={`px-6 py-2 flex items-center gap-2 rounded-lg font-bold text-white transition-all shadow-md active:scale-95 ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                >
                                    {isPlaying ? <React.Fragment><IconPause size={20} /> Stop</React.Fragment> : <React.Fragment><IconPlay size={20} /> Start Auto</React.Fragment>}
                                </button>

                                <button 
                                    onClick={nextFase}
                                    disabled={fase === fasen.length - 1}
                                    className="px-4 py-2 flex items-center gap-2 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Volgende
                                    <IconChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-indigo-500 transition-all duration-500"
                                style={{ width: `${((fase + 1) / fasen.length) * 100}%` }}
                            ></div>
                        </div>

                    </div>
                </div>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<MitoseSimulatie />);
    </script>
</body>
</html>
