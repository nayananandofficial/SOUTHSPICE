import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  Mic,
  MicOff,
  AlertCircle,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface HeaderProps {
  onMenuClick: () => void;
}

// Speech Recognition types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
    | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any)
    | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Voice search states
  const [isListening, setIsListening] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [interimTranscript, setInterimTranscript] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    // Check for browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsVoiceSupported(true);

      // Initialize recognition instance
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      // Event handlers
      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
        setInterimTranscript("");
        console.log("Voice recognition started");
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        let interimTranscript = "";

        // Process all results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Update interim results for real-time feedback
        setInterimTranscript(interimTranscript);

        // Handle final result
        if (finalTranscript) {
          const cleanTranscript = finalTranscript.trim();
          setSearchTerm(cleanTranscript);
          setInterimTranscript("");

          // Auto-trigger search if we have a meaningful result
          if (cleanTranscript.length > 2) {
            handleVoiceSearchComplete(cleanTranscript);
          }
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setInterimTranscript("");

        let errorMessage = "Voice search failed. Please try again.";

        switch (event.error) {
          case "no-speech":
            errorMessage = "No speech detected. Please try speaking again.";
            break;
          case "audio-capture":
            errorMessage =
              "Microphone access denied. Please check your permissions.";
            break;
          case "not-allowed":
            errorMessage =
              "Microphone permission denied. Please enable microphone access.";
            break;
          case "network":
            errorMessage = "Network error. Please check your connection.";
            break;
          case "aborted":
            errorMessage = "Voice search was cancelled.";
            break;
          default:
            errorMessage = `Voice search error: ${event.error}`;
        }

        setVoiceError(errorMessage);
        toast.error(errorMessage);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript("");
        console.log("Voice recognition ended");
      };

      recognitionRef.current = recognition;
    } else {
      setIsVoiceSupported(false);
      console.warn("Speech Recognition not supported in this browser");
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        setVoiceError(null);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && searchOpen) {
        setSearchOpen(false);
        setVoiceError(null);
        if (isListening && recognitionRef.current) {
          recognitionRef.current.abort();
        }
      }
    };

    if (searchOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen, isListening]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/about", label: "About" },
    { path: "/help", label: "Help" },
  ];

  const handleUserClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchTerm("");
      setVoiceError(null);
      if (isListening && recognitionRef.current) {
        recognitionRef.current.abort();
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm("");
      setVoiceError(null);
    }
  };

  const handleVoiceSearchComplete = (transcript: string) => {
    // Navigate to menu with search query
    navigate(`/menu?search=${encodeURIComponent(transcript)}`);
    setSearchOpen(false);
    setSearchTerm("");
    setVoiceError(null);
    toast.success(`Searching for "${transcript}"`);
  };

  const toggleVoiceSearch = () => {
    if (!isVoiceSupported) {
      toast.error("Voice search is not supported in your browser");
      return;
    }

    if (!recognitionRef.current) {
      toast.error("Voice recognition not initialized");
      return;
    }

    if (isListening) {
      // Stop listening
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimTranscript("");
    } else {
      // Start listening
      try {
        setVoiceError(null);
        // Always abort any existing session before starting a new one
        recognitionRef.current.abort();
        // Add a small delay to ensure the abort is processed
        setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.start();
            toast.success("Listening... Speak now!");
          }
        }, 100);
      } catch (error) {
        console.error("Error starting voice recognition:", error);
        toast.error("Failed to start voice search. Please try again.");
      }
    }
  };

  const displayText = interimTranscript || searchTerm;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-warm-900" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            {/* SouthSpice Logo Image */}
            <div className="relative transform group-hover:scale-105 transition-transform duration-300">
              <img
                src="/southspice-2.png"
                alt="SouthSpice Logo"
                width={200}
                height={200}
                className="drop-shadow-sm"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body font-medium transition-colors relative ${
                  location.pathname === item.path
                    ? "text-primary-600"
                    : "text-warm-900 hover:text-primary-600"
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                    layoutId="activeTab"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <div ref={searchRef} className="relative">
              <button
                onClick={handleSearchToggle}
                className="p-2 rounded-lg hover:bg-primary-50 transition-colors"
                aria-label="Search"
              >
                {searchOpen ? (
                  <X className="h-5 w-5 text-warm-900" />
                ) : (
                  <Search className="h-5 w-5 text-warm-900" />
                )}
              </button>

              {/* Search Dropdown */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50"
                  >
                    <form onSubmit={handleSearchSubmit}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={displayText}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search for delicious South Indian dishes..."
                          className={`w-full pl-10 pr-16 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-body ${
                            interimTranscript ? "text-gray-500 italic" : ""
                          }`}
                          disabled={isListening}
                        />

                        {/* Voice Search Button */}
                        {isVoiceSupported && (
                          <button
                            type="button"
                            onClick={toggleVoiceSearch}
                            disabled={!isVoiceSupported}
                            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                              isListening
                                ? "bg-red-500 text-white animate-pulse-mic shadow-lg"
                                : "text-gray-400 hover:text-primary-600 hover:bg-primary-50"
                            }`}
                            aria-label={
                              isListening
                                ? "Stop voice search"
                                : "Start voice search"
                            }
                            title={
                              isListening ? "Stop listening" : "Voice search"
                            }
                          >
                            {isListening ? (
                              <MicOff className="h-4 w-4" />
                            ) : (
                              <Mic className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Voice Search Status */}
                    <AnimatePresence>
                      {isListening && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-recording-pulse"></div>
                            <span className="text-sm text-red-700 font-medium">
                              Listening... Speak now
                            </span>
                          </div>
                          {interimTranscript && (
                            <p className="text-sm text-gray-600 mt-2 italic">
                              "{interimTranscript}"
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Voice Error Display */}
                    <AnimatePresence>
                      {voiceError && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-red-700">
                              {voiceError}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Voice Search Help */}
                    {isVoiceSupported && !isListening && !voiceError && (
                      <div className="mt-4">
                        <p className="text-xs text-gray-500 font-body mb-2">
                          Voice search tips:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["Biryani", "Dosa", "Curry", "Idli"].map(
                            (suggestion) => (
                              <button
                                key={suggestion}
                                type="button"
                                onClick={() => {
                                  setSearchTerm(suggestion);
                                  navigate(
                                    `/menu?search=${encodeURIComponent(
                                      suggestion
                                    )}`
                                  );
                                  setSearchOpen(false);
                                  setSearchTerm("");
                                }}
                                className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-body hover:bg-primary-100 transition-colors"
                              >
                                {suggestion}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Browser Support Warning */}
                    {!isVoiceSupported && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm text-yellow-700">
                            Voice search is not supported in your browser
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-primary-50 transition-colors"
              aria-label={`Cart with ${cartItemsCount} items`}
            >
              <ShoppingCart className="h-5 w-5 text-warm-900" />
              {/* Only show badge when cart has items (quantity > 0) */}
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-[1.25rem]"
                >
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </motion.span>
              )}
            </Link>

            {/* User Button */}
            <button
              onClick={handleUserClick}
              className="p-2 rounded-lg hover:bg-primary-50 transition-colors"
              aria-label={user ? "Profile" : "Login"}
            >
              <User className="h-5 w-5 text-warm-900" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
