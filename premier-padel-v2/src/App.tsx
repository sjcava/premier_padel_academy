import { useState } from 'react'
import { MatchCard } from './components/MatchCard'

function App() {
  const [activeTab, setActiveTab] = useState('resultados')

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gradient-to-br from-empire-green via-[rgba(74,109,82,1)] to-deep-forest">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="Logo" className="w-16 h-16 rounded-xl border-2 border-golden-trophy shadow-md object-contain bg-white" />
            <div className="text-empire-green font-bold text-xl">PREMIER PADEL ACADEMY</div>
          </div>

          <nav className="flex flex-wrap justify-center gap-2">
            {['Inicio', 'Resultados', 'Estadísticas', 'Equipo', 'Calendario', 'Contacto'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === item.toLowerCase()
                  ? 'bg-gradient-to-br from-empire-green to-[rgba(74,109,82,1)] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-glass-white backdrop-blur-md rounded-3xl p-12 text-center mb-8 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-empire-green to-golden-trophy bg-clip-text text-transparent">
            Premier Padel Academy
          </h1>
          <p className="text-xl text-gray-600">Excelencia, dedicación y esfuerzo en cada partido</p>
        </section>

        {/* Content Section */}
        <section className="bg-glass-white backdrop-blur-md rounded-3xl p-8 shadow-xl min-h-[400px]">
          <h2 className="text-3xl font-bold text-empire-green border-b-4 border-golden-trophy inline-block mb-6 pb-2">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>

          {activeTab === 'resultados' ? (
            <div className="space-y-6">
              <MatchCard match={{
                id: 6,
                name: "Sexta Jornada",
                date: "30/10/2024",
                result: "VICTORIA",
                score: "3-0",
                opponent: "MUGA",
                totalStats: { w: 59, ue: 64, df: 1, eff: "48.0%", effW: "47.6%" },
                pairs: [
                  {
                    pair: "Pareja 1", result: "VICTORIA", players: "Omar Álvarez / Edgar Jaua vs Manuel Blanco / Jesús Itriago", score: "6-3, 7-5",
                    stats: [
                      { name: "Omar Álvarez", w: 9, ue: 10, df: 1, eff: "47.4%", effW: "45.0%" },
                      { name: "Edgar Jaua", w: 10, ue: 14, df: 0, eff: "41.7%", effW: "41.7%" }
                    ]
                  },
                  {
                    pair: "Pareja 2", result: "VICTORIA", players: "Ricardo Larrazabal / Alejandro Villoria vs Alexander Jean / Dionisio Martín", score: "6-2, 6-1",
                    stats: [
                      { name: "Ricardo Larrazabal", w: 10, ue: 8, df: 0, eff: "55.6%", effW: "55.6%" },
                      { name: "Alejandro Villoria", w: 9, ue: 8, df: 0, eff: "52.9%", effW: "52.9%" }
                    ]
                  },
                  {
                    pair: "Pareja 3", result: "VICTORIA", players: "Gustavo Barcos / Honorio Sigala vs José Fernández / Roberto Marques", score: "6-2, 6-3",
                    stats: [
                      { name: "Gustavo Barcos", w: 11, ue: 12, df: 0, eff: "47.8%", effW: "47.8%" },
                      { name: "Honorio Sigala", w: 10, ue: 12, df: 0, eff: "45.5%", effW: "45.5%" }
                    ]
                  }
                ]
              }} />

              <MatchCard match={{
                id: 5,
                name: "Quinta Jornada",
                date: "23/10/2024",
                result: "VICTORIA",
                score: "3-0",
                opponent: "Hogar Canario",
                totalStats: { w: 59, ue: 54, df: 2, eff: "51.3%", effW: "51.3%" },
                pairs: [
                  {
                    pair: "Pareja 1", result: "VICTORIA", players: "Simon Cava / Daniel Figuera vs Francisco Mota / Axel Patino", score: "6-3, 3-6, 10-7",
                    stats: [
                      { name: "Simon Cava", w: 6, ue: 6, df: 1, eff: "46.2%", effW: "46.2%" },
                      { name: "Daniel Figuera", w: 8, ue: 7, df: 0, eff: "53.3%", effW: "53.3%" }
                    ]
                  },
                  {
                    pair: "Pareja 2", result: "VICTORIA", players: "Christian Frendín / Alejandro Villoria vs Darwyn Blanco / Francisco Pérez", score: "6-1, 3-6, 10-4",
                    stats: [
                      { name: "Christian Frendín", w: 11, ue: 9, df: 0, eff: "55.0%", effW: "55.0%" },
                      { name: "Alejandro Villoria", w: 10, ue: 7, df: 0, eff: "58.8%", effW: "58.8%" }
                    ]
                  },
                  {
                    pair: "Pareja 3", result: "VICTORIA", players: "Gustavo Barcos / Edgar Jaua vs Jesús Galván / Marlon Márquez", score: "7-6, 7-6",
                    stats: [
                      { name: "Gustavo Barcos", w: 13, ue: 12, df: 1, eff: "50.0%", effW: "50.0%" },
                      { name: "Edgar Jaua", w: 11, ue: 13, df: 0, eff: "45.8%", effW: "45.8%" }
                    ]
                  }
                ]
              }} />

              <MatchCard match={{
                id: 4,
                name: "Cuarta Jornada",
                date: "16/10/2024",
                result: "VICTORIA",
                score: "2-1",
                opponent: "Padelazo",
                totalStats: { w: 56, ue: 59, df: 0, eff: "48.7%", effW: "48.7%" },
                pairs: [
                  {
                    pair: "Pareja 1", result: "VICTORIA", players: "Omar Álvarez / Ricardo Larrazabal vs Martín de Armas / Olaff Pérez", score: "6-7, 7-6, 10-6",
                    stats: [
                      { name: "Omar Álvarez", w: 9, ue: 13, df: 0, eff: "40.9%", effW: "40.9%" },
                      { name: "Ricardo Larrazabal", w: 7, ue: 10, df: 0, eff: "41.2%", effW: "41.2%" }
                    ]
                  },
                  {
                    pair: "Pareja 2", result: "VICTORIA", players: "Daniel Figuera / Christian Frendín vs Giorgio Bacopulus / Juan Novo", score: "6-7, 7-6, 10-3",
                    stats: [
                      { name: "Daniel Figuera", w: 10, ue: 10, df: 0, eff: "50.0%", effW: "50.0%" },
                      { name: "Christian Frendín", w: 10, ue: 10, df: 0, eff: "50.0%", effW: "50.0%" }
                    ]
                  },
                  {
                    pair: "Pareja 3", result: "DERROTA", players: "Gabriel Bárcena / Honorio Sigala vs Isidro Nordelo / José Martí", score: "2-6, 6-3, 7-10",
                    stats: [
                      { name: "Gabriel Bárcena", w: 10, ue: 4, df: 0, eff: "71.4%", effW: "71.4%" },
                      { name: "Honorio Sigala", w: 10, ue: 12, df: 0, eff: "45.5%", effW: "45.5%" }
                    ]
                  }
                ]
              }} />
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-xl mb-4">🚧 Contenido de {activeTab} aún no migrado</p>
              <p>Esta demo v2 muestra la sección de "Resultados" con datos reales.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-white/90 backdrop-blur-md mt-12 py-8 rounded-t-3xl text-center">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
          <div>
            <h3 className="font-bold text-empire-green mb-2 text-lg">📞 Contacto</h3>
            <p>Email: premierpadelacademy@gmail.com</p>
            <p>WhatsApp: +58 412 307 2396</p>
          </div>
          <div>
            <h3 className="font-bold text-empire-green mb-2 text-lg">📱 Redes Sociales</h3>
            <p>Instagram: @premierpadelccs</p>
          </div>
          <div>
            <h3 className="font-bold text-empire-green mb-2 text-lg">📋 Información</h3>
            <p>Reglamento del Equipo</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
