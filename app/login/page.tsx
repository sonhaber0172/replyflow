"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState(false);
  const router = useRouter();

  function girisYap() {
    if (sifre === "replyflow.054191238280172") {
      localStorage.setItem("giris", "true");
      router.push("/panel");
    } else {
      setHata(true);
      setTimeout(() => setHata(false), 2000);
    }
  }

  return (
    <main translate="no" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-80">
        
        <h1 className="text-2xl font-black text-white text-center mb-1">
          Reply<span className="text-blue-400">Flow</span>
        </h1>
        <p className="text-slate-500 text-xs text-center mb-6">Panel girişi</p>

        <input
          type="password"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && girisYap()}
          placeholder="Şifre"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm mb-3"
        />

        {hata && <p className="text-red-400 text-xs mb-3 text-center">❌ Yanlış şifre!</p>}

        <button
          onClick={girisYap}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition text-sm"
        >
          Giriş Yap →
        </button>

      </div>
    </main>
  );
}