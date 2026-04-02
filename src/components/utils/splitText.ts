import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// SplitText shim — same API as gsap-trial/SplitText
class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private _originals: { el: HTMLElement; html: string }[] = [];

  constructor(
    selector: string | string[] | HTMLElement | HTMLElement[],
    opts: { type?: string; linesClass?: string } = {}
  ) {
    const type = opts.type || "chars,words,lines";
    const selectors = Array.isArray(selector) ? selector : [selector];

    selectors.forEach((sel) => {
      const elements: HTMLElement[] =
        typeof sel === "string"
          ? Array.from(document.querySelectorAll<HTMLElement>(sel))
          : [sel as HTMLElement];

      elements.forEach((el) => {
        this._originals.push({ el, html: el.innerHTML });
        el.innerHTML = "";

        const text = el.innerText;
        const wordSpans: HTMLElement[] = [];

        text.split(" ").forEach((word, wi) => {
          if (wi > 0) el.appendChild(document.createTextNode(" "));

          const wordEl = document.createElement("span");
          wordEl.style.display = "inline-block";
          wordEl.style.overflow = "hidden";

          if (type.includes("chars")) {
            word.split("").forEach((char) => {
              const charEl = document.createElement("span");
              charEl.style.display = "inline-block";
              charEl.textContent = char;
              wordEl.appendChild(charEl);
              this.chars.push(charEl);
            });
          } else {
            wordEl.textContent = word;
          }

          el.appendChild(wordEl);
          wordSpans.push(wordEl);
          this.words.push(wordEl);
        });

        // Treat each element as one line for simplicity
        this.lines.push(el);
      });
    });
  }

  revert() {
    this._originals.forEach(({ el, html }) => {
      el.innerHTML = html;
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new SplitText(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = new SplitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
