"use client";

import { useState } from "react";

interface GecmisItem {
  id: number;
  mesaj: string;
  cevap: string;
  kategori: string;
  saat: string;
}

const ornekMesajlar = [
  "Kargom 3 gündür gelmedi, nerede?",
  "Siparişimi iptal etmek istiyorum",
  "Yanlış ürün geldi",
  "Ürün hasarlı geldi",
  "Fatura istiyorum",
  "Teslimat adresimi değiştirmek istiyorum",
];

const kategoriRenkleri: { [key: string]: string } = {
  "Kargo Takip":       "bg-blue-100 text-blue-700",
  "Sipariş İptali":    "bg-red-100 text-red-700",
  "Yanlış Ürün":       "bg-orange-100 text-orange-700",
  "Hasarlı Ürün":      "bg-rose-100 text-rose-700",
  "Fatura/Belge":      "bg-purple-100 text-purple-700",
  "Adres Değişikliği": "bg-yellow-100 text-yellow-700",
  "İade":              "bg-green-100 text-green-700",
  "Stok":              "bg-teal-100 text-teal-700",
  "Fiyat":             "bg-indigo-100 text-indigo-700",
  "Genel":             "bg-gray-100 text-gray-700",
};

export default function Home() {
  const [mesaj, setMesaj] = useState("");
  const [cevap, setCevap] = useState("");
  const [kategori, setKategori] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [kopyalandi, setKopyalandi] = useState(false);
  const [gecmis, setGecmis] = useState<GecmisItem[]>([]);

  async function cevapUret() {
    if (!mesaj.trim()) {
      alert("Lütfen bir mesaj girin!");
      return;
    }
    setYukleniyor(true);
    setCevap("");
    setKategori("");

    const response = await fetch("/api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mesaj }),
    });

    const data = await response.json();
    setCevap(data.cevap);
    setKategori(data.kategori);
    setYukleniyor(false);

    setGecmis((onceki) => [
      {
        id: Date.now(),
        mesaj: mesaj,
        cevap: data.cevap,
        kategori: data.kategori,
        saat: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      },
      ...onceki,
    ]);
  }

  function kopyala() {
    navigator.clipboard.writeText(cevap);
    setKopyalandi(true);
    setTimeout(() => setKopyalandi(false), 2000);
  }

  return (
    <main
      translate="no"
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 flex flex-col items-center"
    >
      <div className="max-w-3xl w-full mx-auto py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold px-4 py-1 rounded-full mb-4 tracking-widest uppercase">
            ⚡ AI Destekli Müşteri Desteği
          </span>
          <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
            Reply<span className="text-blue-400">Flow</span>
          </h1>
          <p className="text-slate-400 text-base">
            Müşteri mesajlarını saniyeler içinde profesyonelce cevapla
          </p>
        </div>

        {/* Sayaç */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{gecmis.length}</div>
            <div className="text-xs text-slate-400 mt-1">Cevaplanan</div>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-green-400">
              {gecmis.length > 0 ? "~5sn" : "—"}
            </div>
            <div className="text-xs text-slate-400 mt-1">Ortalama Süre</div>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">
              {gecmis.length > 0
                ? [...new Set(gecmis.map((g) => g.kategori))].length
                : "—"}
            </div>
            <div className="text-xs text-slate-400 mt-1">Kategori</div>
          </div>
        </div>

        {/* Örnek Mesajlar */}
        <div className="mb-5">
          <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">
            💡 Hızlı test:
          </p>
          <div className="flex flex-wrap gap-2">
            {ornekMesajlar.map((ornek, i) => (
              <button
                key={i}
                onClick={() => setMesaj(ornek)}
                className="text-xs bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-blue-300 px-3 py-1.5 rounded-full transition"
              >
                {ornek}
              </button>
            ))}
          </div>
        </div>

        {/* Mesaj Kutusu */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-4">
          <label className="block text-slate-300 font-semibold mb-3 text-sm uppercase tracking-wider">
            📩 Müşteri Mesajı
          </label>
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
            rows={4}
            placeholder="Müşterinin mesajını buraya yapıştır..."
            value={mesaj}
            onChange={(e) => setMesaj(e.target.value)}
          />
          <button
            onClick={cevapUret}
            disabled={yukleniyor}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:text-blue-500 text-white font-bold py-3.5 rounded-xl transition text-sm tracking-wide"
          >
            {yukleniyor ? "⏳ Analiz ediliyor..." : "🤖 AI Cevap Üret"}
          </button>
        </div>

        {/* Cevap Kutusu */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
              ✅ Önerilen Cevap
            </label>
            {kategori && (
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${kategoriRenkleri[kategori] || "bg-gray-100 text-gray-700"}`}>
                {kategori}
              </span>
            )}
          </div>

          {cevap ? (
            <>
              <p className="text-slate-200 leading-relaxed bg-white/5 rounded-xl p-4 text-sm border border-white/10">
                {cevap}
              </p>
              <button
                onClick={kopyala}
                className="mt-4 w-full border border-white/10 hover:bg-white/10 text-slate-300 font-semibold py-3 rounded-xl transition text-sm"
              >
                {kopyalandi ? "✅ Kopyalandı!" : "📋 Cevabı Kopyala"}
              </button>
            </>
          ) : (
            <div className="text-center py-10 text-slate-600">
              <div className="text-5xl mb-3">💬</div>
              <p className="italic text-sm">
                Henüz cevap üretilmedi. Yukarıya mesaj yaz ve butona bas.
              </p>
            </div>
          )}
        </div>

        {/* Geçmiş */}
        {gecmis.length > 0 && (
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <h2 className="text-slate-300 font-semibold mb-4 text-sm uppercase tracking-wider">
              🕐 Mesaj Geçmişi
            </h2>
            <div className="flex flex-col gap-3">
              {gecmis.map((item) => (
                <div
                  key={item.id}
                  className="border border-white/10 rounded-xl p-4 hover:bg-white/5 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${kategoriRenkleri[item.kategori] || "bg-gray-100 text-gray-700"}`}>
                      {item.kategori}
                    </span>
                    <span className="text-xs text-slate-500">{item.saat}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">📩 {item.mesaj}</p>
                  <p className="text-xs text-slate-300 mt-1">✅ {item.cevap.slice(0, 90)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-slate-600 mt-8">
          ReplyFlow — E-ticaret müşteri desteği için AI asistan
        </p>

      </div>
    </main>
  );
}