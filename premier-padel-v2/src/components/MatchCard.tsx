import React from 'react';

type PlayerStats = {
    name: string;
    w: number;
    ue: number;
    df: number;
    eff: string;
    effW: string;
}

type PairResult = {
    pair: string;
    result: 'VICTORIA' | 'DERROTA';
    players: string; // "Player 1 / Player 2 vs Opponent 1 / Opponent 2"
    score: string;
    stats: PlayerStats[];
}

type MatchData = {
    id: number;
    name: string;
    date: string;
    result: 'VICTORIA' | 'DERROTA';
    score: string;
    opponent: string;
    pairs: PairResult[];
    totalStats: {
        w: number;
        ue: number;
        df: number;
        eff: string;
        effW: string;
    }
}

export const MatchCard = ({ match }: { match: MatchData }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-4 border-l-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${match.result === 'VICTORIA' ? 'border-victory-green' : 'border-defeat-red'
            }`}>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                <h3 className="font-bold text-empire-green text-lg">{match.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${match.result === 'VICTORIA' ? 'bg-victory-green' : 'bg-defeat-red'
                    }`}>
                    {match.result}
                </span>
                <span className="text-gray-500 text-sm font-bold">{match.date}</span>
            </div>

            {/* Main Score */}
            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-4">
                <div className="text-center font-bold text-gray-800">Premier Padel Academy</div>
                <div className="text-2xl font-bold bg-gradient-to-br from-empire-green to-[rgba(74,109,82,1)] text-white px-4 py-2 rounded-lg border-2 border-golden-trophy shadow-inner">
                    {match.score}
                </div>
                <div className="text-center text-gray-500">{match.opponent}</div>
            </div>

            {/* Footer / Toggle */}
            <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-200 pt-4">
                <span>3 Partidos Jugados</span>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-gradient-to-r from-empire-green to-[rgba(74,109,82,1)] text-white px-4 py-2 rounded-full font-bold text-xs hover:shadow-md transition-shadow flex items-center gap-2 border border-golden-trophy"
                >
                    {isOpen ? 'Ocultar Estadísticas' : '📊 Ver Estadísticas'}
                </button>
            </div>

            {/* Details */}
            {isOpen && (
                <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h4 className="text-center text-empire-green font-bold mb-4">RESULTADOS POR PAREJA</h4>

                    <div className="space-y-4">
                        {match.pairs.map((pair, idx) => (
                            <div key={idx} className={`p-4 rounded-xl ${pair.result === 'VICTORIA' ? 'bg-green-50/50' : 'bg-red-50/50'
                                }`}>
                                <h5 className="text-center font-bold text-empire-green mb-2">{pair.pair} - {pair.result}</h5>
                                <p className="text-center text-sm mb-2">{pair.players}</p>
                                <p className="text-center font-bold mb-4">Resultado: {pair.score}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pair.stats.map((stat, sIdx) => (
                                        <div key={sIdx} className="text-center bg-white/60 p-2 rounded-lg text-xs">
                                            <p className="font-bold mb-1">{stat.name}</p>
                                            <p className="text-gray-600">
                                                W: {stat.w} | UE: {stat.ue} | DF: {stat.df} | Ef: {stat.eff} | Ef.P: {stat.effW}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h4 className="text-center text-empire-green font-bold mt-8 mb-4">ESTADÍSTICAS TOTALES DEL EQUIPO</h4>
                    <div className="bg-white/40 p-4 rounded-xl text-center space-y-2">
                        <p><strong>Total Winners (W):</strong> {match.totalStats.w}</p>
                        <p><strong>Total Unforced Errors (UE):</strong> {match.totalStats.ue}</p>
                        <p><strong>Total Dobles Faltas (DF):</strong> {match.totalStats.df}</p>
                        <p><strong>Eficiencia General:</strong> {match.totalStats.eff}</p>
                        <p><strong>Eficiencia Ponderada General:</strong> {match.totalStats.effW}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
