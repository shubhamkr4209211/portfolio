import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// Lenis-backed smoother shim — same API as gsap-trial/ScrollSmoother
let lenisInstance: Lenis | null = null;

export const smoother = {
  scrollTop(val?: number) {
    if (val !== undefined && lenisInstance) {
      lenisInstance.scrollTo(val, { immediate: true });
    }
    return lenisInstance ? lenisInstance.scroll : window.scrollY;
  },
  scrollTo(target: string | null, _smooth?: boolean, _pos?: string) {
    if (!target || !lenisInstance) return;
    const el = document.querySelector(target);
    if (el) lenisInstance.scrollTo(el as HTMLElement, { duration: 1.4 });
  },
  paused(val?: boolean) {
    if (!lenisInstance) return;
    if (val) lenisInstance.stop();
    else lenisInstance.start();
  },
};

const Navbar = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // Create Lenis smooth scroll
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger on every tick
    lenisInstance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenisInstance?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Start paused (initialFX will unpause it)
    lenisInstance.stop();

    // Nav link clicks
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let el = e.currentTarget as HTMLAnchorElement;
          let section = el.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh(true);
    });

    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  return (
    <>
      <div className="header">
        <div className="navbar-brand" data-cursor="disable">
          <img 
            src="/images/profile_pic.jpg" 
            alt="Profile Logo" 
            className="navbar-profile-pic" 
            onClick={() => setIsZoomed(true)}
            style={{ cursor: "zoom-in" }}
          />
          <span 
            className="navbar-title"
            onClick={() => lenisInstance?.scrollTo(0, { duration: 1.4 })}
            style={{ cursor: "pointer" }}
          >
            SKM
          </span>
        </div>
        <a
          href="mailto:shubhamkr2021@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          shubhamkr2021@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#certifications" href="#certifications">
              <HoverLinks text="CERTS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>

      {isZoomed && (
        <div 
          className="image-zoom-overlay" 
          onClick={() => setIsZoomed(false)}
          data-cursor="disable"
        >
          <img src="/images/profile_pic.jpg" alt="Zoomed Profile" className="image-zoomed" />
        </div>
      )}
    </>
  );
};

export default Navbar;
