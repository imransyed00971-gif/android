// TechVision - Premium Android TV Box Website
// Main JavaScript functionality

// Global variables
let tvBoxData = [];
let scene, camera, renderer, tvBoxMesh;
let isRotating = true;
let currentProductIndex = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Load product data
        await loadProductData();
        
        // Initialize 3D scene
        initialize3DScene();
        
        // Setup featured products
        setupFeaturedProducts();
        
        // Initialize performance chart
        initializePerformanceChart();
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize scroll animations
        initializeScrollAnimations();
        
        // Setup mobile menu
        setupMobileMenu();
        
        console.log('TechVision website initialized successfully');
        
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Load product data from JSON
async function loadProductData() {
    try {
        const response = await fetch('android_tv_boxes.json');
        tvBoxData = await response.json();
        console.log('Loaded product data:', tvBoxData);
    } catch (error) {
        console.error('Error loading product data:', error);
        // Fallback data if JSON fails to load
        tvBoxData = [
            {
                id: "box_001",
                name: "NVIDIA Shield TV Pro",
                price: "AED 849.00",
                image: "https://m.media-amazon.com/images/I/61dYAL8L79L._AC_SL1500_.jpg",
                metadata: {
                    OS: "Android 11 (Upgradable)",
                    RAM: "3GB",
                    Storage: "16GB",
                    "4K_Support": true,
                    Processor: "Tegra X1+"
                }
            },
            {
                id: "box_002",
                name: "Xiaomi Mi Box S (2nd Gen)",
                price: "AED 185.00",
                image: "https://m.media-amazon.com/images/I/51f8W8zH9BL._AC_SL1500_.jpg",
                metadata: {
                    OS: "Google TV (Android 11)",
                    RAM: "2GB",
                    Storage: "8GB",
                    "4K_Support": true,
                    Processor: "Quad-core Cortex-A55"
                }
            },
            {
                id: "box_003",
                name: "Strong LEAP-S3 4K",
                price: "AED 215.00",
                image: "https://m.media-amazon.com/images/I/61NlU6mP0uL._AC_SL1500_.jpg",
                metadata: {
                    OS: "Android 11",
                    RAM: "2GB",
                    Storage: "16GB",
                    "4K_Support": true,
                    Processor: "Amlogic S905Y4"
                }
            }
        ];
    }
}

// Initialize 3D scene with Three.js
function initialize3DScene() {
    const container = document.getElementById('three-container');
    if (!container) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00d4ff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 0.6, 100);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Create TV Box geometry (placeholder)
    createTVBoxModel();

    // Start animation loop
    animate();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

// Create TV Box 3D model
function createTVBoxModel() {
    // Create a group for the TV box
    const tvBoxGroup = new THREE.Group();

    // Main body (box shape)
    const geometry = new THREE.BoxGeometry(2, 1.2, 0.3);
    const material = new THREE.MeshPhongMaterial({
        color: 0x1a1a1a,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    const mainBody = new THREE.Mesh(geometry, material);
    tvBoxGroup.add(mainBody);

    // Front panel (slightly smaller)
    const frontGeometry = new THREE.BoxGeometry(1.9, 1.1, 0.05);
    const frontMaterial = new THREE.MeshPhongMaterial({
        color: 0x2a2a2a,
        shininess: 80
    });
    const frontPanel = new THREE.Mesh(frontGeometry, frontMaterial);
    frontPanel.position.z = 0.15;
    tvBoxGroup.add(frontPanel);

    // LED indicator
    const ledGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const ledMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        emissive: 0x00d4ff,
        emissiveIntensity: 0.5
    });
    const led = new THREE.Mesh(ledGeometry, ledMaterial);
    led.position.set(0.8, 0.4, 0.2);
    tvBoxGroup.add(led);

    // Ports (small rectangles on the back)
    const portGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.02);
    const portMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
    
    for (let i = 0; i < 4; i++) {
        const port = new THREE.Mesh(portGeometry, portMaterial);
        port.position.set(-0.8 + i * 0.2, 0.3, -0.16);
        tvBoxGroup.add(port);
    }

    // Add to scene
    tvBoxMesh = tvBoxGroup;
    scene.add(tvBoxMesh);

    // Add hover interaction
    setup3DInteractions();
}

// Setup 3D interactions
function setup3DInteractions() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    renderer.domElement.addEventListener('mousemove', (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(tvBoxMesh, true);

        if (intersects.length > 0) {
            renderer.domElement.style.cursor = 'pointer';
            // Add glow effect
            tvBoxMesh.children.forEach(child => {
                if (child.material.emissive) {
                    child.material.emissive = new THREE.Color(0x00d4ff);
                    child.material.emissiveIntensity = 0.1;
                }
            });
        } else {
            renderer.domElement.style.cursor = 'default';
            // Remove glow effect
            tvBoxMesh.children.forEach(child => {
                if (child.material.emissive && child.material.color.getHex() !== 0x00d4ff) {
                    child.material.emissive = new THREE.Color(0x000000);
                    child.material.emissiveIntensity = 0;
                }
            });
        }
    });

    // Click to cycle through products
    renderer.domElement.addEventListener('click', () => {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(tvBoxMesh, true);

        if (intersects.length > 0) {
            cycleProductDisplay();
        }
    });
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (tvBoxMesh && isRotating) {
        tvBoxMesh.rotation.y += 0.01;
        tvBoxMesh.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }

    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    const container = document.getElementById('three-container');
    if (!container) return;

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Cycle through product displays
function cycleProductDisplay() {
    currentProductIndex = (currentProductIndex + 1) % tvBoxData.length;
    const product = tvBoxData[currentProductIndex];
    
    updateProductInfo(product);
    
    // Animate color change
    if (tvBoxMesh) {
        anime({
            targets: tvBoxMesh.children[0].material.color,
            r: Math.random() * 0.3 + 0.1,
            g: Math.random() * 0.3 + 0.1,
            b: Math.random() * 0.3 + 0.1,
            duration: 1000,
            easing: 'easeInOutQuad'
        });
    }
}

// Update product information display
function updateProductInfo(product) {
    const infoPanel = document.querySelector('.scene-container .glass');
    if (!infoPanel) return;

    infoPanel.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <span class="font-semibold text-cyan-400">${product.name}</span>
            <span class="text-green-400 font-bold">${product.price}</span>
        </div>
        <div class="text-sm text-gray-300">
            <span class="bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded text-xs mr-2">${product.metadata.OS.split(' ')[0]} ${product.metadata.OS.split(' ')[1]}</span>
            <span class="bg-purple-400/20 text-purple-400 px-2 py-1 rounded text-xs mr-2">${product.metadata.RAM} RAM</span>
            <span class="bg-green-400/20 text-green-400 px-2 py-1 rounded text-xs">${product.metadata['4K_Support'] ? '4K Support' : 'HD Support'}</span>
        </div>
    `;
}

// Setup featured products
function setupFeaturedProducts() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;

    // Show top 3 products
    const featuredProducts = tvBoxData.slice(0, 3);
    
    grid.innerHTML = featuredProducts.map(product => `
        <div class="product-card glass rounded-2xl p-6 cursor-pointer" onclick="openWhatsAppProduct('${product.id}')">
            <div class="relative mb-4">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg">
                <div class="absolute top-3 right-3">
                    <span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        ${product.metadata['4K_Support'] ? '4K' : 'HD'}
                    </span>
                </div>
            </div>
            
            <h3 class="text-xl font-semibold mb-2 text-white">${product.name}</h3>
            
            <div class="flex justify-between items-center mb-3">
                <span class="text-2xl font-bold text-cyan-400">${product.price}</span>
                <div class="flex space-x-1">
                    ${Array(5).fill().map((_, i) => `
                        <svg class="w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                    `).join('')}
                </div>
            </div>
            
            <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">OS:</span>
                    <span class="text-white">${product.metadata.OS}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">RAM:</span>
                    <span class="text-white">${product.metadata.RAM}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Storage:</span>
                    <span class="text-white">${product.metadata.Storage}</span>
                </div>
            </div>
            
            <button class="w-full glass py-3 rounded-lg font-semibold hover:neon-border transition-all duration-300">
                Inquire on WhatsApp
            </button>
        </div>
    `).join('');
}

// Initialize performance chart
function initializePerformanceChart() {
    const chartContainer = document.getElementById('performance-chart');
    if (!chartContainer) return;

    const chart = echarts.init(chartContainer);
    
    const option = {
        backgroundColor: 'transparent',
        textStyle: {
            color: '#ffffff'
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(26, 26, 26, 0.9)',
            borderColor: '#00d4ff',
            textStyle: {
                color: '#ffffff'
            }
        },
        legend: {
            data: ['Performance Score', 'Price (AED)'],
            textStyle: {
                color: '#ffffff'
            }
        },
        xAxis: {
            type: 'category',
            data: tvBoxData.slice(0, 4).map(product => product.name.split(' ').slice(0, 2).join(' ')),
            axisLine: {
                lineStyle: {
                    color: '#444444'
                }
            },
            axisLabel: {
                color: '#ffffff',
                rotate: 45
            }
        },
        yAxis: [
            {
                type: 'value',
                name: 'Performance',
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: '#00d4ff'
                    }
                },
                axisLabel: {
                    color: '#ffffff'
                }
            },
            {
                type: 'value',
                name: 'Price (AED)',
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: '#8b5cf6'
                    }
                },
                axisLabel: {
                    color: '#ffffff'
                }
            }
        ],
        series: [
            {
                name: 'Performance Score',
                type: 'bar',
                data: [95, 75, 80, 90],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#00d4ff' },
                        { offset: 1, color: '#0080ff' }
                    ])
                }
            },
            {
                name: 'Price (AED)',
                type: 'line',
                yAxisIndex: 1,
                data: [849, 185, 215, 450],
                lineStyle: {
                    color: '#8b5cf6',
                    width: 3
                },
                itemStyle: {
                    color: '#8b5cf6'
                }
            }
        ]
    };

    chart.setOption(option);

    // Handle window resize
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// Setup event listeners
function setupEventListeners() {
    // 3D controls
    const rotateBtn = document.getElementById('rotate-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    if (rotateBtn) {
        rotateBtn.addEventListener('click', () => {
            isRotating = !isRotating;
            rotateBtn.textContent = isRotating ? 'Stop Rotate' : 'Auto Rotate';
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (tvBoxMesh) {
                tvBoxMesh.rotation.set(0, 0, 0);
                tvBoxMesh.position.set(0, 0, 0);
            }
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Utility functions
function scrollToProducts() {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// WhatsApp integration functions
function openWhatsApp() {
    const message = encodeURIComponent(
        "Hi! I'm interested in learning more about your premium Android TV boxes. Can you help me choose the right one for my needs?"
    );
    window.open(`https://wa.me/971501234567?text=${message}`, '_blank');
}

function openWhatsAppProduct(productId) {
    const product = tvBoxData.find(p => p.id === productId);
    if (!product) return;
    
    const message = encodeURIComponent(
        `Hi! I'm interested in the ${product.name} (${product.price}). Can you provide more details about this product and current availability?`
    );
    window.open(`https://wa.me/971501234567?text=${message}`, '_blank');
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced resize handler
const debouncedResize = debounce(onWindowResize, 250);
window.addEventListener('resize', debouncedResize);

// Preload critical resources
function preloadResources() {
    const criticalImages = tvBoxData.map(product => product.image);
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadResources();