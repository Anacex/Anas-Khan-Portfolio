import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";

export default function EmailButton() {
  const [showPopup, setShowPopup] = useState(false);
  const email = "anacekhanx@gmail.com";

  const handleHover = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000); // bubble persists ~2.5s
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard!");
  };

  const handleClick = () => {
    // open Gmail compose
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
      "_blank"
    );
  };

  return (
    <>
      {/* Keep original button style */}
      <button
        onMouseEnter={handleHover}
        onClick={handleClick}
        className="cta-button primary"
      >
        Email Me
      </button>

      {/* Floating bubble popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="email-popup"
          >
            <span>{email}</span>
            <button onClick={handleCopy} className="copy-btn">
              <Copy size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
