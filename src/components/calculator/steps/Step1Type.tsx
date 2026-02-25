"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { useCalculator } from "@/hooks/useCalculator";
import type { ProjectType } from "@/types/calculator.types";
import { PACKAGES } from "@/constants/pricing";
import type { PackageId } from "@/constants/pricing";

type CalculatorProps = ReturnType<typeof useCalculator>;

const OPTIONS = Object.values(PACKAGES).map((pkg) => ({
  id: pkg.id as ProjectType,
  title: pkg.name,
  desc: pkg.description,
  price: `od ${pkg.basePrice.toLocaleString("pl-PL")} zł`,
  tag: pkg.tag,
  coZawiera: pkg.coZawiera,
}));

export function Step1Type({ calculator }: { calculator: CalculatorProps }) {
  const { state, setProjectType } = calculator;
  const [openDropdownId, setOpenDropdownId] = useState<PackageId | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openDropdownId === null) return;
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current?.contains(e.target as Node)) return;
      setOpenDropdownId(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  return (
    <div className="step">
      <h2 className="step-title">Czego potrzebujesz?</h2>
      <p className="step-desc">Wybierz typ projektu.</p>

      <div className="step-options">
        {OPTIONS.map((opt) => (
          <div key={opt.id} className="option-card-wrapper" ref={openDropdownId === opt.id ? dropdownRef : undefined}>
            <motion.div
              role="button"
              tabIndex={0}
              onClick={() => setProjectType(opt.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setProjectType(opt.id);
                }
              }}
              whileTap={{ scale: 0.99 }}
              className={`option-card ${state.projectType === opt.id ? "selected" : ""}`}
              aria-pressed={state.projectType === opt.id}
            >
              {opt.tag && <span className="option-tag">{opt.tag}</span>}
              <div className="option-card-main">
                <div className="option-title">{opt.title}</div>
                <div className="option-desc">{opt.desc}</div>
                <div className="option-price">{opt.price}</div>
              </div>
              <button
                type="button"
                className="option-more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdownId((prev) => (prev === opt.id ? null : opt.id));
                }}
                aria-expanded={openDropdownId === opt.id}
                aria-haspopup="true"
              >
                Więcej
                <span className="option-more-chevron" aria-hidden>
                  ▼
                </span>
              </button>
            </motion.div>
            <AnimatePresence>
              {openDropdownId === opt.id && (
                <motion.div
                  className="option-dropdown"
                  role="dialog"
                  aria-label="Zawartość pakietu"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="option-dropdown-title">Co zawiera:</p>
                  <ul className="option-dropdown-list">
                    {opt.coZawiera.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
