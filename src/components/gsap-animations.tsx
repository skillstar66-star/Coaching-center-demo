"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function GsapAnimations() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach((st) => st.kill())

      document.querySelectorAll("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

      document.querySelectorAll("[data-scale]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        )
      })

      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-speed") || "0.2")
        gsap.fromTo(
          el,
          { y: 80 * speed },
          {
            y: -80 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      })

      const counterEls = document.querySelectorAll("[data-counter]")
      counterEls.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0", 10)
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              el,
              { textContent: 0 },
              {
                textContent: target,
                duration: 2.5,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: () => {
                  const val = Math.floor(parseInt(el.textContent || "0", 10))
                  el.textContent = val.toLocaleString("en-IN")
                },
              }
            )
          },
          once: true,
        })
      })

      document.querySelectorAll("[data-lift]").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, scale: 1.02, duration: 0.4, ease: "power2.out" })
        })
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" })
        })
      })

      const transformationSection = document.getElementById("transformation")
      if (transformationSection) {
        const steps = transformationSection.querySelectorAll("[data-step]")
        const progressBar = transformationSection.querySelector("[data-progress]")

        if (steps.length && progressBar) {
          const stepTriggers: ScrollTrigger[] = []

          steps.forEach((step, i) => {
            const st = ScrollTrigger.create({
              trigger: step,
              start: "top center",
              end: "bottom center",
              onEnter: () => {
                steps.forEach((s) => s.classList.remove("active"))
                step.classList.add("active")
                gsap.to(progressBar, {
                  scaleY: (i + 1) / steps.length,
                  duration: 0.6,
                  ease: "power2.out",
                })
              },
              onEnterBack: () => {
                steps.forEach((s) => s.classList.remove("active"))
                step.classList.add("active")
                gsap.to(progressBar, {
                  scaleY: (i + 1) / steps.length,
                  duration: 0.6,
                  ease: "power2.out",
                })
              },
            })
            stepTriggers.push(st)
          })

          ScrollTrigger.create({
            trigger: transformationSection,
            start: "top top",
            end: "bottom bottom",
            onLeave: () => {
              steps.forEach((s) => s.classList.remove("active"))
            },
          })
        }
      }

      document.querySelectorAll("[data-mask-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: "100%", rotate: 3 },
          {
            y: "0%",
            rotate: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top 85%",
            },
          }
        )
      })
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return <div ref={containerRef} className="hidden" />
}
