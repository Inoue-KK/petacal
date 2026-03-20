"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Shrikhand } from "next/font/google";
import { Kiwi_Maru } from "next/font/google";

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
});

const kiwiMaru = Kiwi_Maru({
  weight: "400",
  subsets: ["latin"],
});

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, #ddf0ff 0%, #ede8ff 40%, #fde8f5 100%)",
      }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(140,180,255,0.15) 1.5px, transparent 1.5px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* bg blobs */}
      <div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          background: "rgba(180,210,255,0.2)",
          top: -100,
          left: -100,
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 350,
          height: 350,
          background: "rgba(220,180,255,0.18)",
          bottom: -80,
          right: -80,
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          background: "rgba(255,200,230,0.15)",
          top: "40%",
          left: "60%",
          filter: "blur(50px)",
        }}
      />

      {/* bubbles */}
      {[
        {
          size: 80,
          top: "10%",
          left: "8%",
          delay: "0s",
          duration: "6s",
          color: "rgba(180,210,255,0.25)",
        },
        {
          size: 50,
          top: "20%",
          left: "80%",
          delay: "1s",
          duration: "7s",
          color: "rgba(220,180,255,0.2)",
        },
        {
          size: 100,
          top: "60%",
          left: "5%",
          delay: "2s",
          duration: "8s",
          color: "rgba(255,200,230,0.2)",
        },
        {
          size: 40,
          top: "75%",
          left: "75%",
          delay: "0.5s",
          duration: "5s",
          color: "rgba(160,230,210,0.22)",
        },
        {
          size: 65,
          top: "45%",
          left: "88%",
          delay: "1.5s",
          duration: "9s",
          color: "rgba(255,230,160,0.2)",
        },
        {
          size: 35,
          top: "85%",
          left: "30%",
          delay: "3s",
          duration: "6s",
          color: "rgba(200,180,255,0.25)",
        },
        {
          size: 55,
          top: "5%",
          left: "50%",
          delay: "2.5s",
          duration: "7s",
          color: "rgba(180,220,255,0.2)",
        },
        {
          size: 45,
          top: "55%",
          left: "60%",
          delay: "0.8s",
          duration: "8s",
          color: "rgba(255,190,220,0.2)",
        },
        {
          size: 70,
          top: "30%",
          left: "15%",
          delay: "1.8s",
          duration: "10s",
          color: "rgba(210,200,255,0.18)",
        },
        {
          size: 30,
          top: "90%",
          left: "55%",
          delay: "3.5s",
          duration: "6s",
          color: "rgba(160,210,255,0.22)",
        },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: b.color,
            border: "1px solid rgba(255,255,255,0.6)",
            backdropFilter: "blur(2px)",
            animation: `bubbleFloat ${b.duration} ease-in-out infinite ${b.delay}`,
          }}
        />
      ))}

      {/* particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 28 }).map((_, i) => {
          const colors = [
            "rgba(180,210,255,0.8)",
            "rgba(220,180,255,0.8)",
            "rgba(255,200,230,0.8)",
            "rgba(160,230,210,0.8)",
            "rgba(255,230,160,0.8)",
          ];
          const size = Math.random() * 4 + 2;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: size,
                height: size,
                background: colors[i % colors.length],
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 4}s`,
              }}
            />
          );
        })}
      </div>

      {/* orbit system */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          width: 1,
          height: 1,
          perspective: 700,
          transformStyle: "preserve-3d",
        }}
      >
        {[
          { size: 90, color: "rgba(160,190,255,0.35)", delay: "0s" },
          { size: 55, color: "rgba(210,170,255,0.3)", delay: "1s" },
        ].map((r, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: r.size,
              height: r.size,
              border: `1.5px solid ${r.color}`,
              animation: `pulseR 3s ease-in-out infinite ${r.delay}`,
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}

        {/* orbit A */}
        <div
          className="absolute rounded-full"
          style={{
            width: 680,
            height: 680,
            border: "1.5px solid rgba(140,190,255,0.22)",
            animation: "orbitA 30s linear infinite",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div
            className="absolute"
            style={{
              top: -18,
              left: "50%",
              animation: "cntA 30s linear infinite",
              fontSize: 32,
            }}
          >
            <span
              style={{
                display: "block",
                animation: "floatY 2.8s ease-in-out infinite",
              }}
            >
              🍀
            </span>
          </div>
          <div
            className="absolute"
            style={{
              bottom: -18,
              left: "50%",
              animation: "cntA 30s linear infinite",
              fontSize: 32,
            }}
          >
            <span
              style={{
                display: "block",
                animation: "floatY 2.8s ease-in-out infinite 1.4s",
              }}
            >
              🎉
            </span>
          </div>
        </div>

        {/* orbit B */}
        <div
          className="absolute rounded-full"
          style={{
            width: 540,
            height: 540,
            border: "1.5px solid rgba(200,165,255,0.2)",
            animation: "orbitB 40s linear infinite",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div
            className="absolute"
            style={{
              top: -17,
              left: "50%",
              animation: "cntB 40s linear infinite",
              fontSize: 30,
            }}
          >
            <span
              style={{
                display: "block",
                animation: "floatY 3.2s ease-in-out infinite 0.6s",
              }}
            >
              ⭐
            </span>
          </div>
          <div
            className="absolute"
            style={{
              bottom: -17,
              left: "50%",
              animation: "cntB 40s linear infinite",
              fontSize: 30,
            }}
          >
            <span
              style={{
                display: "block",
                animation: "floatY 3.2s ease-in-out infinite 2s",
              }}
            >
              🎀
            </span>
          </div>
        </div>

        {/* orbit C */}
        <div
          className="absolute rounded-full"
          style={{
            width: 620,
            height: 620,
            border: "1.5px solid rgba(120,215,220,0.18)",
            animation: "orbitC 15s linear infinite",
            transform: "translate(-50%,-50%) rotateX(60deg)",
          }}
        >
          <div
            className="absolute"
            style={{
              top: -17,
              left: "50%",
              animation: "cntC 15s linear infinite",
              fontSize: 28,
            }}
          >
            <span
              style={{
                display: "block",
                animation: "floatY 2.5s ease-in-out infinite 1s",
              }}
            >
              ☀️
            </span>
          </div>
          <div
            className="absolute"
            style={{
              bottom: -17,
              left: "50%",
              animation: "cntC 15s linear infinite",
              fontSize: 28,
            }}
          >
            <span
              style={{
                display: "block",
                animation: "floatY 2.5s ease-in-out infinite 2.2s",
              }}
            >
              🍰
            </span>
          </div>
        </div>

        {/* orbit D */}
        <div
          className="absolute rounded-full"
          style={{
            width: 460,
            height: 460,
            border: "1.5px solid rgba(230,165,255,0.17)",
            animation: "orbitD 20s linear infinite",
            transform: "translate(-50%,-50%) rotateX(60deg)",
          }}
        >
          <div
            className="absolute"
            style={{
              top: -16,
              left: "50%",
              animation: "cntD 20s linear infinite",
              fontSize: 26,
            }}
          >
            <span
              style={{
                display: "block",
                animation: "floatY 3.5s ease-in-out infinite 0.3s",
              }}
            >
              📖
            </span>
          </div>
          <div
            className="absolute"
            style={{
              bottom: -16,
              left: "50%",
              animation: "cntD 20s linear infinite",
              fontSize: 26,
            }}
          >
            <span
              style={{
                display: "block",
                animation: "floatY 3.5s ease-in-out infinite 1.8s",
              }}
            >
              🏃
            </span>
          </div>
        </div>
      </div>

      {/* card */}
      <div className="relative z-10" style={{ width: "100%", maxWidth: 300 }}>
        {/* rotating border */}
        <div
          className="absolute overflow-hidden"
          style={{
            width: "calc(100% + 4px)",
            height: "calc(100% + 4px)",
            top: -2,
            left: -2,
            borderRadius: 30,
            zIndex: -1,
          }}
        >
          <div
            className="absolute"
            style={{
              width: "200%",
              height: "200%",
              top: "50%",
              left: "50%",
              animation: "rotateBorder 4s linear infinite",
              transform: "translate(-50%,-50%)",
              background:
                "conic-gradient(from 0deg, rgba(180,140,255,0.6), rgba(120,200,255,0.6), rgba(255,180,220,0.6), rgba(180,140,255,0.6))",
            }}
          />
        </div>

        <div
          className="flex flex-col items-center relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(28px)",
            borderRadius: 28,
            padding: "2.5rem 2rem",
            gap: "1.1rem",
            border: "1px solid rgba(255,255,255,0.95)",
          }}
        >
          {/* inner bubbles */}
          {[
            { size: 80, top: -30, left: -30, color: "rgba(180,210,255,0.2)" },
            { size: 60, top: -20, right: -20, color: "rgba(220,180,255,0.2)" },
            { size: 50, top: 80, right: -15, color: "rgba(255,220,240,0.18)" },
            {
              size: 70,
              bottom: 60,
              left: -20,
              color: "rgba(200,230,255,0.18)",
            },
            {
              size: 90,
              bottom: -30,
              left: "50%",
              color: "rgba(255,200,230,0.15)",
            },
            {
              size: 40,
              top: "40%",
              left: -10,
              color: "rgba(210,190,255,0.18)",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: b.size,
                height: b.size,
                top: b.top,
                left: b.left,
                right: (b as any).right,
                bottom: (b as any).bottom,
                background: b.color,
                border: "1px solid rgba(255,255,255,0.7)",
                transform: b.left === "50%" ? "translateX(-50%)" : undefined,
              }}
            />
          ))}

          <div
            style={{
              fontSize: 50,
              animation: "titleFloat 3s ease-in-out infinite",
              filter: "drop-shadow(0 4px 12px rgba(160,180,255,0.5))",
            }}
          >
            🗓️
          </div>

          <div className="text-center">
            <div
              className={shrikhand.className}
              style={{
                fontSize: 30,
                letterSpacing: 3,
                background: "linear-gradient(135deg,#7b68cc,#a78bda,#c084bc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "titleFloat 3s ease-in-out infinite 0.5s",
              }}
            >
              Petacal
            </div>
            <div
              className={kiwiMaru.className}
              style={{
                fontSize: 11,
                color: "#9b8ec4",
                marginTop: 5,
                letterSpacing: 1.5,
              }}
            >
              スタンプで彩る、あなたの毎日
            </div>
          </div>

          <div
            className="flex items-center"
            style={{
              gap: 8,
              padding: "8px 16px",
              background: "rgba(255,255,255,0.5)",
              borderRadius: 50,
              border: "1px solid rgba(200,190,255,0.3)",
            }}
          >
            {["😊", "🏃", "🍜", "🎉", "🌤️"].map((e) => (
              <span key={e} style={{ fontSize: 16 }}>
                {e}
              </span>
            ))}
          </div>

          <div className="w-full flex items-center" style={{ gap: 8 }}>
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,rgba(180,160,255,0.4))",
              }}
            />
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(180,160,255,0.5)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(90deg,rgba(180,160,255,0.4),transparent)",
              }}
            />
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center"
            style={{
              gap: 10,
              background: "white",
              border: "1.5px solid rgba(0,0,0,0.08)",
              borderRadius: 50,
              padding: "13px 20px",
              fontSize: 14,
              fontWeight: 500,
              color: "#444",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(160,140,255,0.2)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"
              />
            </svg>
            Googleでログイン
          </button>

          <div
            className={kiwiMaru.className}
            style={{ fontSize: 10, color: "#c0b8e0", letterSpacing: 0.5 }}
          >
            ログインするとデータがクラウドに保存されます
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbitA { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes orbitB { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(-360deg)} }
        @keyframes orbitC { from{transform:translate(-50%,-50%) rotateX(60deg) rotate(0deg)} to{transform:translate(-50%,-50%) rotateX(60deg) rotate(360deg)} }
        @keyframes orbitD { from{transform:translate(-50%,-50%) rotateX(60deg) rotate(0deg)} to{transform:translate(-50%,-50%) rotateX(60deg) rotate(-360deg)} }
        @keyframes cntA { from{transform:translateX(-50%) rotate(0deg)} to{transform:translateX(-50%) rotate(-360deg)} }
        @keyframes cntB { from{transform:translateX(-50%) rotate(0deg)} to{transform:translateX(-50%) rotate(360deg)} }
        @keyframes cntC { from{transform:translateX(-50%) rotateX(-60deg) rotate(0deg)} to{transform:translateX(-50%) rotateX(-60deg) rotate(-360deg)} }
        @keyframes cntD { from{transform:translateX(-50%) rotateX(-60deg) rotate(0deg)} to{transform:translateX(-50%) rotateX(-60deg) rotate(360deg)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes pulseR { 0%,100%{opacity:.35;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.12;transform:translate(-50%,-50%) scale(1.07)} }
        @keyframes twinkle { 0%,100%{opacity:0;transform:scale(0.5)} 50%{opacity:1;transform:scale(1)} }
        @keyframes bubbleFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes titleFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        @keyframes rotateBorder { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
      `}</style>
    </div>
  );
}
