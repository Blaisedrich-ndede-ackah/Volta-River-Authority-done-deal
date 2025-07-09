// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.querySelector(".navbar").style.boxShadow = "0 4px 20px rgba(30, 58, 138, 0.1)"
  } else {
    header.style.background = "transparent"
    header.querySelector(".navbar").style.boxShadow = "none"
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Counter animation for statistics
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        counter.textContent = target
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current)
      }
    }, 20)
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("service-card")) {
        entry.target.classList.add("fade-in-up")
      } else if (entry.target.classList.contains("project-card")) {
        entry.target.classList.add("slide-in-left")
      } else if (entry.target.classList.contains("about-item")) {
        entry.target.classList.add("slide-in-right")
      } else if (entry.target.classList.contains("hero-stats")) {
        animateCounters()
      } else {
        entry.target.classList.add("fade-in-up")
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document
  .querySelectorAll(
    ".service-card, .project-card, .about-item, .sustainability-card, .news-card, .contact-item, .hero-stats",
  )
  .forEach((el) => {
    observer.observe(el)
  })

// Contact form handling
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!firstName || !lastName || !email || !subject || !message) {
    showNotification("Please fill in all required fields", "error")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    showNotification("Please enter a valid email address", "error")
    return
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".btn-primary")
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    showNotification("Thank you for your message! Our team will respond within 24 hours.", "success")
    contactForm.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    max-width: 400px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `

  notification.querySelector(".notification-content").style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `

  notification.querySelector(".notification-close").style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    margin-left: auto;
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification)
  }, 5000)

  // Close button functionality
  notification.querySelector(".notification-close").addEventListener("click", () => {
    removeNotification(notification)
  })
}

function removeNotification(notification) {
  notification.style.transform = "translateX(100%)"
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 300)
}

// Scroll to top functionality
const createScrollToTopButton = () => {
  const button = document.createElement("button")
  button.innerHTML = '<i class="fas fa-arrow-up"></i>'
  button.className = "scroll-to-top"
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: var(--shadow-xl);
    transition: var(--transition);
    z-index: 1000;
  `

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  button.addEventListener("mouseenter", () => {
    button.style.background = "var(--accent-color)"
    button.style.color = "var(--primary-color)"
    button.style.transform = "translateY(-3px) scale(1.1)"
  })

  button.addEventListener("mouseleave", () => {
    button.style.background = "var(--primary-color)"
    button.style.color = "white"
    button.style.transform = "translateY(0) scale(1)"
  })

  document.body.appendChild(button)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      button.style.display = "flex"
    } else {
      button.style.display = "none"
    }
  })
}

// Initialize scroll to top button
createScrollToTopButton()

// Add hover effects to cards
document.querySelectorAll(".service-card, .project-card, .news-card, .sustainability-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".hero-bg-image")
  if (parallax) {
    const speed = scrolled * 0.3
    parallax.style.transform = `translateY(${speed}px)`
  }
})

// Loading screen
function showLoadingScreen() {
  const loader = document.createElement("div")
  loader.className = "loading-screen"
  loader.innerHTML = `
    <div class="loading-content">
      <div class="loading-logo">
      </div>
      <div class="loading-text">This is just a project not the official page...</div>
      <div class="loading-bar">
        <div class="loading-progress"></div>
      </div>
    </div>
  `

  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-replica);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    color: white;
  `

  document.body.appendChild(loader)

  // Simulate loading
  setTimeout(() => {
    loader.style.opacity = "0"
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader)
      }
    }, 500)
  }, 2000)
}

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  // Show loading screen
  showLoadingScreen()

  // Add stagger animation to service cards
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Add stagger animation to project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })

  console.log("VRA website loaded successfully!")
})

// Energy meter animation (optional feature)
function createEnergyMeter() {
  const meter = document.createElement("div")
  meter.className = "energy-meter"
  meter.innerHTML = `
    <div class="meter-title">Current Generation</div>
    <div class="meter-value">1,020 MW</div>
    <div class="meter-bar">
      <div class="meter-fill"></div>
    </div>
    <div class="meter-status">Optimal Performance</div>
  `

  // Add to hero section if desired
  // document.querySelector('.hero-content').appendChild(meter)
}

// Initialize energy meter
// createEnergyMeter()
