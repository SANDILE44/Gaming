// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ninja (simple but clean)
const ninja = new THREE.Mesh(
  new THREE.BoxGeometry(1,2,1),
  new THREE.MeshBasicMaterial({ color: 0x00ffcc })
);
scene.add(ninja);

// Enemy
const enemy = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: 0xff3333 })
);
enemy.position.x = 2;
scene.add(enemy);

camera.position.z = 5;

// Controls
let keys = { up:false, down:false, left:false, right:false };
let isAttacking = false;
let enemyHealth = 5;

function attack() {
  isAttacking = true;
  setTimeout(() => isAttacking = false, 200);
}

// Game loop
function animate() {
  requestAnimationFrame(animate);

  if (keys.left) ninja.position.x -= 0.06;
  if (keys.right) ninja.position.x += 0.06;
  if (keys.up) ninja.position.y += 0.06;
  if (keys.down) ninja.position.y -= 0.06;

  ninja.scale.x = isAttacking ? 1.5 : 1;

  const distance = ninja.position.distanceTo(enemy.position);

  if (isAttacking && distance < 1.5 && enemyHealth > 0) {
    enemyHealth--;
    enemy.position.x += 0.3;
    isAttacking = false;
  }

  if (enemyHealth <= 0) {
    scene.remove(enemy);
  }

  renderer.render(scene, camera);
}

animate();

// Resize fix
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});