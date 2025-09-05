"use client";
import { motion } from "framer-motion";
import throttle from "lodash/throttle";
import { useEffect, useState } from "react";
// --- Simple runtime smoke tests to avoid silent breakage ---
function runSmokeTests(data) {
  try {
    console.assert(Array.isArray(data.plans), "plans must be an array");
    data.plans.forEach((p, i) => {
      console.assert(typeof p.name === "string", `plan[${i}].name must be string`);
      console.assert(typeof p.price === "string", `plan[${i}].price must be string`);
      console.assert(Array.isArray(p.includes), `plan[${i}].includes must be array`);
      console.assert(Array.isArray(p.excludes || []), `plan[${i}].excludes must be array or undefined`);
    });
    console.assert(Array.isArray(data.dayByDay) && data.dayByDay.length === 4, "dayByDay must have 4 days");
  } catch (e) {
    // Do not crash the UI; just report
    // eslint-disable-next-line no-console
    console.error("Smoke tests failed:", e);
  }
}

export default function LandingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const triggerPoint = document.body.scrollHeight * 0.2;
      setShowScrollTop(window.scrollY > triggerPoint);
    }, 200); 

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imgs = {
    goldenBridge: "./cauvang1.jpg",
    bana: "./captreo.jpeg",
    hoianLanterns: "./hoian.png",
    hoianBoat: "./thuyenthung.jpg",
  };

  const plans = [
    {
      name: "Basic",
      subtitle: "Tiết kiệm – Đi cho biết",
      price: "฿7,999",
      highlight: false,
      badge: null,
      includes: [
        "Private tour 4N3Đ (riêng tư, không ghép đoàn)",
        "3 đêm khách sạn 4★ tại Đà Nẵng",
        "Xe riêng đón/tiễn sân bay & di chuyển suốt hành trình",
        "SIM 5G 5GB/ngày cho mỗi thành viên",
      ],
      excludes: [
        "Không ngủ đêm trên Bà Nà Hills",
        "Không bao gồm tham quan Bà Nà Hills",
        "Thuyền thúng Cẩm Thanh",
        "Làm gốm Thanh Hà",
        "Vé Chùa Cầu & Nhà cổ Tấn Ký",
        "Show Ký Ức Hội An",
      ],
    },
    {
      name: "Standard",
      subtitle: "Khuyến nghị – Đáng tiền nhất",
      price: "฿10,399",
      highlight: true,
      badge: "Khuyến nghị",
      includes: [
        "Private tour 4N3Đ",
        "1 đêm khách sạn Bà Nà + 1 đêm Hội An + 1 đêm Đà Nẵng 4★",
        "Xe riêng trọn hành trình + đón/tiễn sân bay",
        "Vé cáp treo & tham quan Bà Nà Hills",
        "Trải nghiệm thuyền thúng Cẩm Thanh",
        "Trải nghiệm làm gốm Thanh Hà (tự tay tạo sản phẩm)",
        "SIM 5G 5GB/ngày cho mỗi thành viên",
        "Nhân viên tiếng Thái đón sân bay + hỗ trợ LINE 24/7",
        "Bảo hiểm du lịch + hỗ trợ bệnh viện đối tác (Hoàn Mỹ/Family)",
      ],
      excludes: [],
    },
    {
      name: "Premium",
      subtitle: "Đẳng cấp – Trải nghiệm đầy đủ",
      price: "฿11,999",
      highlight: false,
      badge: null,
      includes: [
        "Tất cả quyền lợi của gói Standard",
        "Lựa chọn: Vé show 'Ký Ức Hội An' HOẶC trải nghiệm tự tay làm đèn lồng cùng nghệ nhân (mang sản phẩm về)",
        "Xe Limousine VIP (nhận tối đa 9 khách/đoàn)",
        "Nâng cấp 1 bữa tối hải sản cao cấp tại Đà Nẵng",
      ],
      excludes: [],
    },
  ];

  const features = [
    { title: "Riêng tư tuyệt đối", text: "Xe riêng suốt hành trình, không ghép đoàn, lịch trình nhẹ nhàng cho gia đình." },
    { title: "Ngủ đêm trên Bà Nà", text: "Thức dậy giữa biển mây, tận hưởng không khí mát lành và check-in Cầu Vàng sáng sớm." },
    { title: "Thuyền thúng + Làm gốm", text: "Vừa vui nhộn vừa tạo kỷ niệm thực sự – mang sản phẩm gốm do chính tay bạn làm về." },
    { title: "SIM 5G mỗi người", text: "5GB/ngày để livestream – đăng TikTok/FB mọi lúc, không lo roaming." },
    { title: "Hỗ trợ tiếng Thái", text: "Đón sân bay tiếng Thái + hỗ trợ online 24/7 qua LINE – an tâm tuyệt đối." },
    { title: "Bảo hiểm & Bệnh viện đối tác", text: "Hệ thống hỗ trợ y tế khi cần – yên tâm cho gia đình có trẻ em/người lớn tuổi." },
  ];

  const dayByDay = [
    {
      day: "Ngày 1",
      title: "Đón sân bay – Bà Nà Hills – Ngủ đêm trên đỉnh",
      desc: "Đón sân bay (nhân viên tiếng Thái), di chuyển thẳng Bà Nà, cáp treo – check-in Cầu Vàng, ăn tối và lưu trú khách sạn trên đỉnh Bà Nà.",
    },
    {
      day: "Ngày 2",
      title: "Từ Bà Nà vào Hội An – Trải nghiệm bản địa – Ngủ đêm Hội An",
      desc: "Xe riêng đưa về Hội An: thuyền thúng Cẩm Thanh, dạo phố cổ – đèn lồng, ẩm thực địa phương. Nhận phòng và ngủ đêm tại Hội An.",
    },
    {
      day: "Ngày 3",
      title: "Từ Hội An về Đà Nẵng – City tour – Tắm biển – Ngủ đêm Đà Nẵng",
      desc: "Trả phòng Hội An, về khách sạn Đà Nẵng 4★. Khám phá city (cầu Rồng, chợ/đặc sản), tắm biển Mỹ Khê, nghỉ đêm tại Đà Nẵng.",
    },
    {
      day: "Ngày 4",
      title: "Đón bình minh Đà Nẵng – Bữa sáng & cà phê – Tiễn sân bay",
      desc: "Dậy sớm ngắm bình minh trên biển, ăn sáng, uống cà phê. Xe riêng tiễn sân bay – kết thúc hành trình an tâm.",
    },
  ];

  // run tests each render (cheap & harmless here)
  runSmokeTests({ plans, dayByDay });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0b1220] via-[#0b1220] to-[#0f1f3a] text-white">
      {/* Topbar */}
      <div className="sticky top-0 z-40 border-b border-white/10 backdrop-blur bg-[#0b1220]/70">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4 gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white/80">Private Tour 4N3Đ — Đà Nẵng • Bà Nà • Hội An</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70 flex-1 justify-center">
            <a href="#why" className="hover:text-white">Điểm khác biệt</a>
            <a href="#gallery" className="hover:text-white">Hình ảnh</a>
            <a href="#itinerary" className="hover:text-white">Lịch trình</a>
            <a href="#pricing" className="hover:text-white">Bảng giá</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          {/* Right button */}
          <div className="flex justify-end flex-1 min-w-max">
            <a
              href="#pricing"
              className="rounded-xl bg-emerald-400 text-black text-sm font-semibold px-4 py-2 hover:bg-emerald-300 md:w-auto text-center"
            >
              Giữ chỗ ngay
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={imgs.goldenBridge} alt="Cầu Vàng Đà Nẵng" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#0b1220]/60 to-[#0b1220]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl font-bold leading-tight">
            Trọn gói an tâm cho gia đình – <span className="text-emerald-400">Riêng tư tuyệt đối</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-4 text-white/80 max-w-2xl">
            Không bán tour. Chúng tôi bán <b>giải pháp</b>: xe riêng, khách sạn 4★, ngủ đêm Bà Nà, trải nghiệm bản địa <b>thuyền thúng + làm gốm</b>, SIM 5G mỗi người, đón Thái tại sân bay & hỗ trợ LINE 24/7.
          </motion.p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#pricing" className="rounded-2xl bg-emerald-400 text-black px-6 py-3 font-semibold hover:bg-emerald-300">Xem bảng giá</a>
            <a href="#gallery" className="rounded-2xl border border-white/20 px-6 py-3 hover:bg-white/10">Xem hình ảnh</a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xs text-white/60">
            <span>Chỉ 5 suất/tháng</span>
            <span>•</span>
            <span>Đặt giữ chỗ 24h – không phí</span>
            <span>•</span>
            <span>Thanh toán QR/Thẻ</span>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="why" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Vì sao gia đình chọn chúng tôi?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 text-emerald-300">★</div>
              <div className="font-semibold">{f.title}</div>
              <div className="text-sm text-white/70 mt-1">{f.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Hình ảnh nổi bật</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative rounded-3xl overflow-hidden">
            <img src={imgs.goldenBridge} alt="Cầu Vàng" className="w-full h-64 md:h-72 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-sm">Cầu Vàng – Đà Nẵng</div>
          </div>
          <div className="relative rounded-3xl overflow-hidden">
            <img src={imgs.bana} alt="Bà Nà Hills" className="w-full h-64 md:h-72 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-sm">Bà Nà Hills – Cáp treo & biển mây</div>
          </div>
          <div className="relative rounded-3xl overflow-hidden">
            <img src={imgs.hoianLanterns} alt="Hội An" className="w-full h-64 md:h-72 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-sm">Phố cổ Hội An – đèn lồng</div>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Lịch trình 4N3Đ (chuẩn)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {dayByDay.map((d, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-emerald-300 text-xs font-semibold">{d.day}</div>
              <div className="font-semibold mt-1">{d.title}</div>
              <div className="text-sm text-white/70 mt-1">{d.desc}</div>
            </div>
          ))}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-0 overflow-hidden md:row-span-2">
            <img src={imgs.hoianBoat} alt="Thuyền thúng Cẩm Thanh" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Bảng giá 3 gói • Chọn nhanh</h2>
          <p className="text-white/70 mt-2">Charm pricing + Decoy pricing: <b>Standard</b> là lựa chọn cân bằng nhất cho gia đình đi lần đầu.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                "relative rounded-3xl border p-6 backdrop-blur-sm " +
                (plan.highlight
                  ? "border-emerald-400/50 bg-white/5 shadow-emerald-500/20 shadow-xl"
                  : "border-white/10 bg-white/5")
              }
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {plan.badge}
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-white/70 text-sm">{plan.subtitle}</p>
              </div>

              <div className="flex items-end gap-1 mb-5">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-white/50 text-sm">/ người</span>
              </div>

              <div className="space-y-2">
                {plan.includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <span className="mt-1 h-4 w-4 rounded-full bg-emerald-400/20 border border-emerald-300/40 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>

              {plan.excludes?.length ? (
                <details className="mt-4 text-xs text-white/60">
                  <summary className="cursor-pointer hover:text-white/80">Không bao gồm</summary>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    {plan.excludes.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </details>
              ) : null}

              <a href="#cta" className={
                "mt-6 block text-center rounded-2xl px-5 py-3 text-sm font-semibold tracking-wide shadow-lg transition-all " +
                (plan.highlight
                  ? "bg-emerald-400 text-black hover:bg-emerald-300"
                  : "bg-white/10 hover:bg-white/20")
              }>
                Giữ chỗ ngay
              </a>
            </div>
          ))}
        </div>

        {/* Bonus / Policies */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold mb-2">Ưu đãi tháng này</h4>
            <ul className="text-sm text-white/80 space-y-2">
              <li>Giảm <b>20%</b> cho <b>trẻ em</b> đi cùng gia đình.</li>
              <li>Tặng <b>quà lưu niệm Hội An</b> cho 2 booking sớm nhất mỗi tuần.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold mb-2">An tâm tuyệt đối</h4>
            <ul className="text-sm text-white/80 space-y-2">
              <li>Nhân viên tiếng Thái đón sân bay + hỗ trợ <b>LINE 24/7</b>.</li>
              <li>Bảo hiểm du lịch + hỗ trợ bệnh viện đối tác (Hoàn Mỹ/Family).</li>
              <li>Xe đời mới, tài xế chuyên nghiệp, hotline khẩn cấp.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold mb-2">Chính sách minh bạch</h4>
            <ul className="text-sm text-white/80 space-y-2">
              <li>Cọc 50% • Huỷ trước 15 ngày: hoàn cọc (trừ 5% phí xử lý + phí cổng nếu có).</li>
              <li>Được đổi ngày <b>2 lần</b> (thông báo trước 15 ngày).</li>
              <li>Giá/người, <b>không bao gồm vé máy bay</b>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Khách đã nói gì?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Nok, 32 tuổi – Bangkok", text: "Đi lần đầu mà an tâm 100%. Thích nhất đêm Bà Nà và ảnh thuyền thúng – gia đình mình nói ‘đáng tiền’." },
            { name: "Mint, 35 tuổi – Nonthaburi", text: "Nhân viên Thái đón sân bay rất dễ chịu. SIM 5G mỗi người nên livestream suốt – bạn bè thích mê!" },
            { name: "Ann, 33 tuổi – Pathum Thani", text: "Không mệt, lịch trình hợp cho bố mẹ. Làm gốm mang về kỷ niệm – các bé cười cả ngày." },
          ].map((t, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-white/80">“{t.text}”</div>
              <div className="mt-3 text-xs text-white/50">— {t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Câu hỏi thường gặp</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { q: "Giá đã bao gồm vé máy bay chưa?", a: "Chưa. Giá là theo người cho gói tour trọn gói tại Đà Nẵng – Bà Nà – Hội An. Chúng tôi hỗ trợ săn vé theo yêu cầu." },
            { q: "Có thể đổi ngày/hoãn tour không?", a: "Được đổi ngày 2 lần nếu báo trước 15 ngày. Dịp cao điểm sẽ phụ thuộc tình trạng phòng." },
            { q: "Chính sách cọc & huỷ thế nào?", a: "Cọc 50%. Huỷ trước 15 ngày: hoàn cọc, trừ 5% phí xử lý + phí cổng thanh toán (nếu có)." },
            { q: "Có hướng dẫn viên tiếng Thái đi kèm không?", a: "Chúng tôi có nhân viên tiếng Thái đón tại sân bay và hỗ trợ online 24/7 qua LINE trong suốt hành trình." },
          ].map((f, i) => (
            <details key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="text-sm text-white/70 mt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-3xl border border-emerald-400/40 bg-emerald-400/10 p-6 md:p-8 text-center">
          <h3 className="text-2xl font-bold">Sẵn sàng giữ chỗ cho gia đình bạn?</h3>
          <p className="text-white/80 mt-2">Chỉ 5 suất/tháng. Đặt cọc 50% để khoá lịch – đổi ngày 2 lần nếu cần.</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a href="#pricing" className="rounded-2xl bg-emerald-400 text-black px-6 py-3 font-semibold hover:bg-emerald-300">Xem bảng giá</a>
            <a href="#" className="rounded-2xl border border-white/20 px-6 py-3 hover:bg-white/10">Chat Zalo/LINE</a>
          </div>
        </div>
      </section>

      {/* Sticky bar */}
      <div className="fixed bottom-3 left-3 right-3 z-40 md:left-auto md:right-6">
        <div className="mx-auto md:ml-auto md:w-[420px] rounded-2xl bg-white/10 backdrop-blur border border-white/15 shadow-lg p-3 flex items-center justify-between">
          <div className="text-xs text-white/70">Ưu đãi -20% cho trẻ em • Quà lưu niệm Hội An</div>
          <a href="#pricing" className="rounded-xl bg-emerald-400 text-black text-xs font-semibold px-3 py-2 hover:bg-emerald-300">Giữ chỗ</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto text-center py-10 text-xs text-white/50">
        Giá có thể thay đổi theo mùa cao điểm/lễ. Vui lòng liên hệ để được tư vấn lộ trình cá nhân hoá.
      </footer>
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full 
               bg-emerald-400 shadow-[0_0_0_4px_rgba(180,160,255,0.25)] hover:bg-emerald-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

    </div>
  );
}
