export async function POST(request) {
  const body = await request.json();
  const mesaj = body.mesaj.toLowerCase();

  const cevaplar = {
    kargo: "Merhaba! 📦 Kargonuz yola çıkmış olup 1-2 iş günü içinde teslim edilecektir. Takip numaranız SMS ile gönderilmiştir. Herhangi bir sorun olursa bize ulaşmaktan çekinmeyin!",
    iade: "Merhaba! 🔄 İade talebinizi aldık. Ürünü orijinal ambalajında, faturasıyla birlikte kargoya verin. Ürün bize ulaştıktan sonra 3-5 iş günü içinde ödemeniz iade edilecektir. Kargo ücreti tarafımızca karşılanır.",
    stok: "Merhaba! ✨ İlgilendiğiniz ürün şu an sınırlı stokta mevcuttur. Kaçırmamak için hemen sipariş verebilirsiniz. Stok tükenmeden harekete geçmenizi öneririz!",
    fiyat: "Merhaba! 🎯 Güncel fiyat bilgisi için ürün sayfamızı inceleyebilirsiniz. Aktif kampanyalarımızdan haberdar olmak için bültenimize abone olabilirsiniz!",
    iptal: "Merhaba! 🚫 Sipariş iptal talebinizi aldık. Siparişiniz henüz kargoya verilmediyse iptal işlemi gerçekleştirilebilir. Sipariş numaranızı paylaşırsanız en kısa sürede işleminizi tamamlarız.",
    yanlis_urun: "Merhaba! 😔 Yanlış ürün gönderildiği için özür dileriz. Lütfen ürünün fotoğrafını ve sipariş numaranızı paylaşın. Doğru ürünü en kısa sürede göndereceğiz, yanlış ürün için ücretsiz iade ayarlayacağız.",
    hasarli: "Merhaba! 😟 Ürününüzün hasarlı gelmesinden dolayı çok üzgünüz. Hasarın fotoğrafını ve sipariş numaranızı paylaşır mısınız? Yeni ürün gönderimi veya tam iade seçeneklerinden birini sunacağız.",
    fatura: "Merhaba! 🧾 Fatura talebinizi aldık. E-faturanız sipariş e-posta adresinize gönderilmiş olmalıdır. Ulaşmadıysa sipariş numaranızı paylaşın, faturanızı tekrar ileteceğiz.",
    adres: "Merhaba! 📍 Kargo adresi değişikliği talebinizi aldık. Eğer siparişiniz henüz kargoya verilmediyse adres güncellemesi yapabiliriz. Sipariş numaranızı ve yeni adresinizi paylaşır mısınız?",
    genel: "Merhaba! 😊 Mesajınız için teşekkür ederiz. Talebinizi en kısa sürede değerlendirip size dönüş yapacağız. Başka sorularınız için her zaman buradayız!"
  };

  let secilencevap = cevaplar.genel;
  let kategori = "Genel";

  if (mesaj.includes("kargo") || mesaj.includes("nerede") || mesaj.includes("gelmedi") || mesaj.includes("teslimat")) {
    secilencevap = cevaplar.kargo;
    kategori = "Kargo Takip";
  } else if (mesaj.includes("iptal") || mesaj.includes("vazgeç")) {
    secilencevap = cevaplar.iptal;
    kategori = "Sipariş İptali";
  } else if (mesaj.includes("yanlış") || mesaj.includes("yanlis") || mesaj.includes("farklı ürün") || mesaj.includes("başka ürün")) {
    secilencevap = cevaplar.yanlis_urun;
    kategori = "Yanlış Ürün";
  } else if (mesaj.includes("hasarlı") || mesaj.includes("hasarli") || mesaj.includes("kırık") || mesaj.includes("bozuk")) {
    secilencevap = cevaplar.hasarli;
    kategori = "Hasarlı Ürün";
  } else if (mesaj.includes("fatura") || mesaj.includes("belge") || mesaj.includes("makbuz")) {
    secilencevap = cevaplar.fatura;
    kategori = "Fatura/Belge";
  } else if (mesaj.includes("adres") || mesaj.includes("adres değiştir")) {
    secilencevap = cevaplar.adres;
    kategori = "Adres Değişikliği";
  } else if (mesaj.includes("iade") || mesaj.includes("geri")) {
    secilencevap = cevaplar.iade;
    kategori = "İade";
  } else if (mesaj.includes("stok") || mesaj.includes("var mı") || mesaj.includes("mevcut")) {
    secilencevap = cevaplar.stok;
    kategori = "Stok";
  } else if (mesaj.includes("fiyat") || mesaj.includes("kaç para") || mesaj.includes("ücret")) {
    secilencevap = cevaplar.fiyat;
    kategori = "Fiyat";
  }

  return Response.json({ cevap: secilencevap, kategori: kategori });
}