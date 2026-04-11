"use client";

import { useState } from "react";
import Link from "next/link";

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

const kategoriRenkleri: { [key: string]: { bg: string; color: string } } = {
  "Kargo Takip":       { bg: "#dbeafe", color: "#1d4ed8" },
  "Sipariş İptali":    { bg: "#fee2e2", color: "#b91c1c" },
  "Yanlış Ürün":       { bg: "#ffedd5", color: "#c2410c" },
  "Hasarlı Ürün":      { bg: "#ffe4e6", color: "#be123c" },
  "Fatura/Belge":      { bg: "#f3e8ff", color: "#7e22ce" },
  "Adres Değişikliği": { bg: "#fef9c3", color: "#a16207" },
  "İade":              { bg: "#dcfce7", color: "#15803d" },
  "Stok":              { bg: "#ccfbf1", color: "#0f766e" },
  "Fiyat":             { bg: "#e0e7ff", color: "#4338ca" },
  "Genel":             { bg: "#f3f4f6", color: "#374151" },
};

export default function Panel() {
  const [mesaj, setMesaj] = useState("");
  const [cevap, setCevap] = useState("");
  const [kategori, setKategori] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [kopyalandi, setKopyalandi] = useState(false);
  const [gecmis, setGecmis] = useState<GecmisItem[]>([]);

  async function cevapUret() {
    if (!mesaj.trim()) { alert("Lütfen bir mesaj girin!"); return; }
    setYukleniyor(true); setCevap(""); setKategori("");
    const response = await fetch("/api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mesaj }),
    });
    const data = await response.json();
    setCevap(data.cevap);
    setKategori(data.kategori);
    setYukleniyor(false);
    setGecmis((onceki) => [{
      id: Date.now(), mesaj, cevap: data.cevap, kategori: data.kategori,
      saat: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    }, ...onceki]);
  }

  function kopyala() {
    navigator.clipboard.writeText(cevap);
    setKopyalandi(true);
    setTimeout(() => setKopyalandi(false), 2000);
  }

  const s = {
    page:    { minHeight:"100vh", background:"#0f172a", padding:"24px", display:"flex", flexDirection:"column" as const, alignItems:"center" },
    wrap:    { width:"100%", maxWidth:"760px" },
    card:    { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"16px", padding:"24px", marginBottom:"16px" },
    label:   { color:"#94a3b8", fontSize:"11px", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase" as const, marginBottom:"12px", display:"block" },
    text:    { color:"#e2e8f0" },
    muted:   { color:"#64748b" },
    white:   { color:"#ffffff" },
    input:   { width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", padding:"16px", color:"#ffffff", fontSize:"14px", resize:"none" as const, outline:"none", boxSizing:"border-box" as const },
    btn:     { width:"100%", background:"#2563eb", color:"#ffffff", border:"none", borderRadius:"12px", padding:"14px", fontSize:"14px", fontWeight:700, cursor:"pointer", marginTop:"12px" },
    btnGray: { width:"100%", background:"transparent", color:"#94a3b8", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", padding:"14px", fontSize:"14px", fontWeight:600, cursor:"pointer", marginTop:"12px" },
    chip:    (kat: string) => ({ background: kategoriRenkleri[kat]?.bg || "#f3f4f6", color: kategoriRenkleri[kat]?.color || "#374151", fontSize:"11px", fontWeight:700, padding:"4px 10px", borderRadius:"999px" }),
    grid3:   { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"16px", marginBottom:"24px" },
    stat:    { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"16px", padding:"16px", textAlign:"center" as const },
    tags:    { display:"flex", flexWrap:"wrap" as const, gap:"8px", marginBottom:"20px" },
    tag:     { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"#94a3b8", fontSize:"12px", padding:"6px 14px", borderRadius:"999px", cursor:"pointer" },
  };

  return (
    <div style={s.page}>
      <div style={s.wrap}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"32px" }}>
          <div>
            <div style={{ fontSize:"28px", fontWeight:900, color:"#ffffff" }}>
              Reply<span style={{ color:"#60a5fa" }}>Flow</span>
            </div>
            <div style={{ color:"#64748b", fontSize:"13px" }}>Müşteri destek paneli</div>
          </div>
          <Link href="/" style={{ color:"#94a3b8", fontSize:"13px", border:"1px solid rgba(255,255,255,0.1)", padding:"8px 16px", borderRadius:"12px", textDecoration:"none" }}>
            ← Ana Sayfa
          </Link>
        </div>

        {/* Sayaçlar */}
        <div style={s.grid3}>
          <div style={s.stat}>
            <div style={{ fontSize:"28px", fontWeight:700, color:"#60a5fa" }}>{gecmis.length}</div>
            <div style={{ fontSize:"11px", color:"#64748b", marginTop:"4px" }}>Cevaplanan</div>
          </div>
          <div style={s.stat}>
            <div style={{ fontSize:"28px", fontWeight:700, color:"#4ade80" }}>{gecmis.length > 0 ? "~5sn" : "—"}</div>
            <div style={{ fontSize:"11px", color:"#64748b", marginTop:"4px" }}>Ort. Süre</div>
          </div>
          <div style={s.stat}>
            <div style={{ fontSize:"28px", fontWeight:700, color:"#c084fc" }}>
              {gecmis.length > 0 ? [...new Set(gecmis.map(g => g.kategori))].length : "—"}
            </div>
            <div style={{ fontSize:"11px", color:"#64748b", marginTop:"4px" }}>Kategori</div>
          </div>
        </div>

        {/* Hızlı Test */}
        <div style={{ marginBottom:"16px" }}>
          <div style={{ color:"#64748b", fontSize:"11px", fontWeight:700, letterSpacing:"2px", marginBottom:"8px" }}>💡 HIZLI TEST</div>
          <div style={s.tags}>
            {ornekMesajlar.map((o, i) => (
              <button key={i} onClick={() => setMesaj(o)} style={s.tag}>{o}</button>
            ))}
          </div>
        </div>

        {/* Mesaj Kutusu */}
        <div style={s.card}>
          <span style={s.label}>📩 Müşteri Mesajı</span>
          <textarea
            rows={4}
            style={s.input}
            placeholder="Müşterinin mesajını buraya yapıştır..."
            value={mesaj}
            onChange={(e) => setMesaj(e.target.value)}
          />
          <button onClick={cevapUret} disabled={yukleniyor} style={{ ...s.btn, background: yukleniyor ? "#1e3a8a" : "#2563eb" }}>
            {yukleniyor ? "⏳ Analiz ediliyor..." : "🤖 AI Cevap Üret"}
          </button>
        </div>

        {/* Cevap Kutusu */}
        <div style={s.card}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
            <span style={s.label}>✅ Önerilen Cevap</span>
            {kategori && <span style={s.chip(kategori)}>{kategori}</span>}
          </div>
          {cevap ? (
            <>
              <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"12px", padding:"16px", color:"#e2e8f0", fontSize:"14px", lineHeight:"1.7" }}>
                {cevap}
              </div>
              <button onClick={kopyala} style={s.btnGray}>
                {kopyalandi ? "✅ Kopyalandı!" : "📋 Cevabı Kopyala"}
              </button>
            </>
          ) : (
            <div style={{ textAlign:"center", padding:"40px 0", color:"#334155" }}>
              <div style={{ fontSize:"40px", marginBottom:"8px" }}>💬</div>
              <div style={{ fontSize:"13px", fontStyle:"italic" }}>Henüz cevap üretilmedi. Yukarıya mesaj yaz ve butona bas.</div>
            </div>
          )}
        </div>

        {/* Geçmiş */}
        {gecmis.length > 0 && (
          <div style={s.card}>
            <span style={s.label}>🕐 Mesaj Geçmişi</span>
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {gecmis.map((item) => (
                <div key={item.id} style={{ border:"1px solid rgba(255,255,255,0.08)", borderRadius:"12px", padding:"16px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                    <span style={s.chip(item.kategori)}>{item.kategori}</span>
                    <span style={{ fontSize:"11px", color:"#64748b" }}>{item.saat}</span>
                  </div>
                  <div style={{ fontSize:"12px", color:"#64748b", marginBottom:"4px" }}>📩 {item.mesaj}</div>
                  <div style={{ fontSize:"12px", color:"#94a3b8" }}>✅ {item.cevap.slice(0, 90)}...</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign:"center", fontSize:"11px", color:"#334155", marginTop:"24px" }}>
          ReplyFlow — E-ticaret müşteri desteği için AI asistan
        </div>

      </div>
    </div>
  );
}