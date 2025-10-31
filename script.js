// Scroll suave e animações
document.addEventListener("DOMContentLoaded", () => {
  // Menu mobile toggle
  const menuToggle = document.getElementById("menuToggle")
  const navMenu = document.getElementById("navMenu")

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".nav-menu a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Botão voltar ao topo
  const btnTopo = document.getElementById("btnTopo")

  btnTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Mostrar/esconder botão de voltar ao topo
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      btnTopo.classList.add("visible")
    } else {
      btnTopo.classList.remove("visible")
    }

    // Adicionar sombra no header ao rolar
    const topo = document.getElementById("topo")
    if (window.pageYOffset > 50) {
      topo.classList.add("scrolled")
    } else {
      topo.classList.remove("scrolled")
    }
  })

  // Animação de scroll reveal
  const scrollRevealElements = document.querySelectorAll(".scroll-reveal")

  const revealOnScroll = () => {
    scrollRevealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", revealOnScroll)
  revealOnScroll() // Executar na carga inicial

  // Animação dos horários com delay
  const horariosItems = document.querySelectorAll(".lista-horarios li")
  horariosItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`
  })

  // Destacar dia atual
  const diasSemana = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"]
  const hoje = new Date().getDay()
  const diaAtual = diasSemana[hoje]

  horariosItems.forEach((item) => {
    const h3 = item.querySelector("h3")
    if (h3 && h3.textContent.trim() === diaAtual) {
      item.style.background = "rgba(196, 164, 124, 0.9)"
      item.style.transform = "scale(1.05)"
      h3.style.color = "#fff"

      // Adicionar indicador de "hoje"
      const badge = document.createElement("span")
      badge.textContent = " • HOJE"
      badge.style.color = "#fff"
      badge.style.fontSize = "12px"
      badge.style.fontWeight = "bold"
      h3.appendChild(badge)
    }
  })

  // Efeito parallax suave customizado para mobile
  if (window.innerWidth <= 768) {
    const parallaxElements = document.querySelectorAll('[class*="container-parallax"]')

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset

      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = 0.5
          const yPos = -(scrolled * speed)
          element.style.backgroundPosition = `center ${yPos}px`
        }
      })
    })
  }

  // Prevenção de clique duplo nos links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      this.style.pointerEvents = "none"
      setTimeout(() => {
        this.style.pointerEvents = "auto"
      }, 1000)
    })
  })

  console.log("[v0] Manhattan Coffee House - Site carregado com sucesso!")
})

// Otimização de performance - debounce para scroll
function debounce(func, wait = 10, immediate = true) {
  let timeout
  return function () {
    const args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}

// Aplicar debounce aos eventos de scroll
window.addEventListener(
  "scroll",
  debounce(() => {
    // Eventos de scroll otimizados
  }),
)
