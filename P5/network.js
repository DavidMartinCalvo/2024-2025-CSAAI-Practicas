const canvas   = document.getElementById('networkCanvas');
const ctx      = canvas.getContext('2d');
const btnGen   = document.getElementById('btnGenerate');
const btnRoute = document.getElementById('btnRoute');
const dispCount = document.getElementById('nodeCount');
const dispTotal = document.getElementById('totalDelay');
const dispMsg   = document.getElementById('message');

const NODE_RADIUS    = 40;
const CONNECT_PER    = 2;
const MAX_NODE_DELAY = 1000;

let nodes = [];


const imgDefault = new Image();
imgDefault.src = '3ds.png';   
const imgUsed = new Image();
imgUsed.src = 'explosion.png';        

// --- Clase Nodo ---
class Nodo {
  constructor(id, x, y, delay) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.delay = delay;
    this.conns = []; 
  }
  conectar(nodo, peso) {
    this.conns.push({ to: nodo, weight: peso });
  }
  distanciaA(otro) {
    const dx = this.x - otro.x;
    const dy = this.y - otro.y;
    return Math.hypot(dx, dy);
  }
}


function crearRed() {
  const MAX_NODES = Math.floor(rand(2, 6)); 
  nodes = [];
  for (let i = 0; i < MAX_NODES; i++) {
    const x = rand(NODE_RADIUS, canvas.width - NODE_RADIUS);
    const y = rand(NODE_RADIUS, canvas.height - NODE_RADIUS);
    const delay = Math.random() * MAX_NODE_DELAY;
    nodes.push(new Nodo(i, x, y, delay));
  }
  nodes.forEach(n => {
    const candidatos = nodes.filter(m => m !== n)
      .map(m => ({ nodo: m, d: n.distanciaA(m) }))
      .sort((a,b) => a.d - b.d)
      .slice(0, CONNECT_PER);
    candidatos.forEach(c => {
      if (!n.conns.some(e => e.to === c.nodo)) {
        n.conectar(c.nodo, c.d);
        c.nodo.conectar(n, c.d);
      }
    });
  });
}

// --- Dibujo de la red usando imágenes ---
function dibujarRed(highlight = []) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
 
  nodes.forEach(n => {
    n.conns.forEach(c => {
      ctx.beginPath();
      ctx.moveTo(n.x, n.y);
      ctx.lineTo(c.to.x, c.to.y);
      ctx.strokeStyle = '#999';
      ctx.stroke();
     
      const mx = (n.x + c.to.x) / 2;
      const my = (n.y + c.to.y) / 2;
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(c.weight.toFixed(1), mx, my);
    });
  });

  nodes.forEach(n => {
    const isOnPath = highlight.includes(n.id);
    const img = isOnPath ? imgUsed : imgDefault;
  
    ctx.drawImage(
      img,
      n.x - NODE_RADIUS,
      n.y - NODE_RADIUS,
      NODE_RADIUS * 2,
      NODE_RADIUS * 2
    );
    
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`N${n.id} (${Math.floor(n.delay)}ms)`, n.x, n.y + NODE_RADIUS + 12);
  });
}

// --- Utilitarios ---
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// --- Dijkstra ---
function dijkstra(startId, endId) {
  const dist = nodes.map(_ => Infinity);
  const prev = nodes.map(_ => null);
  const Q = new Set(nodes.map(n => n.id));
  dist[startId] = nodes[startId].delay;
  while (Q.size) {
    let u = [...Q].reduce((a, b) => dist[a] < dist[b] ? a : b);
    Q.delete(u);
    if (u === endId) break;
    const nodoU = nodes[u];
    nodoU.conns.forEach(({ to, weight }) => {
      const alt = dist[u] + weight + to.delay;
      if (alt < dist[to.id]) {
        dist[to.id] = alt;
        prev[to.id] = u;
      }
    });
  }
  const path = [];
  let u = endId;
  while (u != null) {
    path.unshift(u);
    u = prev[u];
  }
  return { path, total: dist[endId] };
}


btnGen.addEventListener('click', () => {
  crearRed();
  dibujarRed();
  dispCount.textContent = nodes.length;
  dispTotal.textContent = '–';
  dispMsg.textContent = 'Consolas Pirateadas Encontradas.';
  btnRoute.disabled = false;
});

btnRoute.addEventListener('click', () => {
  if (!nodes.length) {
    dispMsg.textContent = 'Primero genera la red.';
    return;
  }
  const { path, total } = dijkstra(0, nodes.length - 1);
  dibujarRed(path);
  dispTotal.textContent = Math.floor(total);
  dispMsg.textContent = `Ruta mínima de Consola 0 a Consola${nodes.length - 1}: ${path.join(' → ')}`;
});