import { useEffect, useMemo, useRef, useState } from "react";

type Dish = { id: number; name: string; description: string; price: number; category: string; image: string; tag?: string };

const dishes: Dish[] = [
  { id: 1, name: "Peixe na Brasa", description: "Peixe fresco grelhado, manteiga de ervas, limão e legumes tostados.", price: 68, category: "Pratos", image: "https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?auto=format&fit=crop&w=900&q=85", tag: "Favorito" },
  { id: 2, name: "Camarão Cremoso", description: "Camarões salteados em molho cremoso da casa, arroz soltinho e ervas.", price: 74, category: "Pratos", image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Moqueca da Maré", description: "Peixe, leite de coco, pimentões, tomate e coentro. Acompanha arroz.", price: 79, category: "Pratos", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=85", tag: "Especial da casa" },
  { id: 4, name: "Ceviche Tropical", description: "Peixe branco, limão, cebola roxa, coentro e toque de maracujá.", price: 42, category: "Entradas", image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Bolinho de Peixe", description: "Porção crocante com peixe fresco e maionese cítrica artesanal.", price: 32, category: "Entradas", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Limonada da Praia", description: "Limão espremido na hora, água gelada e um toque de hortelã.", price: 12, category: "Bebidas", image: "https://images.unsplash.com/photo-1513558161293-cbeb765b5b3c?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Água de Coco", description: "Água de coco natural, servida bem gelada.", price: 10, category: "Bebidas", image: "https://images.unsplash.com/photo-1513558161293-cbeb765b5b3c?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Pudim de Coco", description: "Pudim delicado com calda de caramelo e coco tostado.", price: 18, category: "Sobremesas", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85" }
];

const categories = ["Todos", "Entradas", "Pratos", "Bebidas", "Sobremesas"];
const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Fish() {
  const fishRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const move = (x: number, y: number) => {
      target.current = { x: x - window.innerWidth / 2, y: y - window.innerHeight / 2 };
    };
    const onMouse = (event: MouseEvent) => move(event.clientX, event.clientY);
    const onTouch = (event: TouchEvent) => {
      if (event.touches[0]) move(event.touches[0].clientX, event.touches[0].clientY);
    };
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.075;
      current.current.y += (target.current.y - current.current.y) * 0.075;
      if (fishRef.current) {
        const rotate = Math.max(-16, Math.min(16, (target.current.x - current.current.x) * 0.08));
        fishRef.current.style.transform = `translate3d(${current.current.x * 0.12}px, ${current.current.y * 0.12}px, 0) rotate(${rotate}deg)`;
      }
      frame.current = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    frame.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div ref={fishRef} className="cursor-fish" aria-hidden="true">
      <svg viewBox="0 0 240 130" fill="none">
        <defs>
          <linearGradient id="fishBody" x1="34" y1="22" x2="191" y2="112" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F6D9A0"/><stop offset=".48" stopColor="#D69A59"/><stop offset="1" stopColor="#A95F3F"/>
          </linearGradient>
          <filter id="fishGlow" x="0" y="0" width="240" height="130" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="7"/>
          </filter>
        </defs>
        <ellipse cx="118" cy="68" rx="76" ry="36" fill="#E7B779" opacity=".22" filter="url(#fishGlow)"/>
        <path d="M42 65C61 31 116 20 165 43C179 49 190 57 198 65C180 88 146 104 104 100C75 98 53 84 42 65Z" fill="url(#fishBody)" stroke="#F8D7A2" strokeWidth="2"/>
        <path d="M191 65L230 35L226 65L230 96L191 65Z" fill="#C98552" stroke="#F4C58B" strokeWidth="2"/>
        <path d="M100 36L122 10L144 39" fill="#B9754A" stroke="#F0C18A" strokeWidth="2"/>
        <path d="M100 96L124 119L145 95" fill="#B9754A" stroke="#F0C18A" strokeWidth="2"/>
        <path d="M87 45C100 59 100 76 88 91M119 37C132 57 132 80 119 99M149 43C158 58 158 75 149 91" stroke="#F6D9A0" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round"/>
        <path d="M44 65C54 58 63 55 74 54" stroke="#FFF0CE" strokeOpacity=".65" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="69" cy="57" r="5" fill="#17343A"/><circle cx="70.5" cy="55.5" r="1.5" fill="white"/>
        <path d="M44 70C37 73 32 72 27 68" stroke="#F3C68E" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const visibleDishes = useMemo(() => activeCategory === "Todos" ? dishes : dishes.filter(d => d.category === activeCategory), [activeCategory]);
  const cartItems = dishes.filter(d => cart[d.id]);
  const count = Object.values(cart).reduce((sum, n) => sum + n, 0);
  const total = cartItems.reduce((sum, d) => sum + d.price * cart[d.id], 0);

  const changeQty = (id: number, amount: number) => {
    setCart(prev => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] || 0) + amount) };
      if (!next[id]) delete next[id];
      return next;
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#061c22] text-white">
      <Fish />
      <div className="ocean-grain" />
      <header className="site-header">
        <a href="#inicio" className="brand"><span className="brand-symbol">✳</span> maré<span className="brand-dot">.</span></a>
        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          <a href="#cardapio" onClick={() => setMobileMenu(false)}>Cardápio</a>
          <a href="#historia" onClick={() => setMobileMenu(false)}>Nossa essência</a>
          <a href="#contato" onClick={() => setMobileMenu(false)}>Contato</a>
        </nav>
        <button className="header-order" onClick={() => setCartOpen(true)}><span aria-hidden="true">▱</span> <span>Meu pedido</span>{count > 0 && <b>{count}</b>}</button>
        <button className="mobile-toggle" onClick={() => setMobileMenu(v => !v)} aria-label="Abrir menu"><span/><span/></button>
      </header>

      <section id="inicio" className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span aria-hidden="true">〰</span> COZINHA DO MAR · FEITO COM TEMPO</div>
          <h1>O mar inspira.<br/><em>A gente transforma.</em></h1>
          <p>Ingredientes frescos, receitas cheias de afeto e uma experiência que tem gosto de litoral.</p>
          <a href="#cardapio" className="hero-button">Explorar cardápio <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-caption"><span>01 / 04</span><span>ARRASTE O DEDO E MOVA O PEIXE</span></div>
        <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
        <div className="hero-bottom-note">SABORES QUE VÊM<br/>DA NOSSA COSTA</div>
      </section>

      <section id="historia" className="manifesto">
        <div className="manifesto-kicker">MAIS QUE UMA REFEIÇÃO</div>
        <div className="manifesto-text">Da primeira onda ao último sabor, <span>cada detalhe celebra o melhor do mar.</span></div>
        <div className="manifesto-foot">FRESCO • LOCAL • MEMORÁVEL</div>
      </section>

      <section id="cardapio" className="menu-section">
        <div className="menu-heading">
          <div><div className="eyebrow">ESCOLHA SEU PRÓXIMO FAVORITO</div><h2>Cardápio <em>da casa</em></h2></div>
          <p>Uma seleção feita para despertar os sentidos.<br/>Toque em adicionar para montar seu pedido.</p>
        </div>
        <div className="category-row">
          {categories.map(cat => <button key={cat} onClick={() => setActiveCategory(cat)} className={activeCategory === cat ? "category active" : "category"}>{cat}</button>)}
        </div>
        <div className="dish-grid">
          {visibleDishes.map((dish, index) => (
            <article className="dish-card" key={dish.id} style={{ animationDelay: `${index * 70}ms` }}>
              <div className="dish-image-wrap">
                <img src={dish.image} alt={dish.name} loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?auto=format&fit=crop&w=900&q=80"; }}/>
                {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                <button className="add-round" onClick={() => changeQty(dish.id, 1)} aria-label={`Adicionar ${dish.name}`}>+</button>
              </div>
              <div className="dish-info">
                <div><h3>{dish.name}</h3><strong>{money(dish.price)}</strong></div>
                <p>{dish.description}</p>
                {cart[dish.id] ? <div className="quantity-control"><button onClick={() => changeQty(dish.id, -1)}>−</button><span>{cart[dish.id]} no pedido</span><button onClick={() => changeQty(dish.id, 1)}>+</button></div> : <button className="add-text" onClick={() => changeQty(dish.id, 1)}>Adicionar ao pedido <span aria-hidden="true">→</span></button>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-section" id="contato">
        <div className="closing-kicker">A MESA ESTÁ POSTA</div>
        <h2>Seu próximo<br/><em>momento favorito.</em></h2>
        <button onClick={() => setCartOpen(true)} className="closing-button">Montar meu pedido <span aria-hidden="true">→</span></button>
        <footer><a href="#inicio" className="brand">✳ maré<span className="brand-dot">.</span></a><span>UM SABOR DE CADA VEZ.</span><span>© 2026 MARÉ</span></footer>
      </section>

      {count > 0 && <button className="floating-cart" onClick={() => setCartOpen(true)}><span aria-hidden="true">▱</span><span>Ver meu pedido</span><b>{count}</b><strong>{money(total)}</strong></button>}

      <div className={`cart-backdrop ${cartOpen ? "cart-show" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "drawer-open" : ""}`} aria-label="Seu pedido">
        <div className="cart-head"><div><span className="eyebrow">SUA SELEÇÃO</span><h3>Meu pedido</h3></div><button onClick={() => setCartOpen(false)} aria-label="Fechar">×</button></div>
        {cartItems.length === 0 ? <div className="empty-cart"><span aria-hidden="true" style={{fontSize: 32}}>▱</span><p>Seu pedido está vazio.</p><span>Adicione seus favoritos do cardápio.</span></div> : <>
          <div className="cart-list">{cartItems.map(d => <div className="cart-line" key={d.id}><img src={d.image} alt=""/><div className="cart-line-info"><b>{d.name}</b><span>{money(d.price)}</span><div className="quantity-control"><button onClick={() => changeQty(d.id, -1)}>−</button><span>{cart[d.id]}</span><button onClick={() => changeQty(d.id, 1)}>+</button></div></div><strong>{money(d.price * cart[d.id])}</strong></div>)}</div>
          <div className="cart-total"><span>Total parcial</span><strong>{money(total)}</strong></div>
          <div className="cart-demo-note">✓ Pedido demonstrativo — personalize o contato do restaurante para receber pedidos reais.</div>
        </>}
        <button className="continue-button" onClick={() => setCartOpen(false)}>Continuar escolhendo <span aria-hidden="true">→</span></button>
      </aside>
    </main>
  );
}
