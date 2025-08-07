import "./App.css";
import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";
import logoWI from "./assets/logo_wi.png";
import logoDC from "./assets/logo_dc.png";
import logoAGH from "./assets/logo_agh.jpg";
import logoBIT from "./assets/logo_bit.jpg";

interface Course {
  name: string;
  description: string;
  duration: string;
}

interface TeamMember {
  name: string;
  role: string;
  description: string;
  photo?: string;
  quote: string;
}

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          let startTime: number | null = null;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, isVisible]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const AnimatedCode: React.FC = () => {
  const [languageIndex, setLanguageIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);
  const [phase, setPhase] = useState<"typing" | "waiting" | "deleting">(
    "typing"
  );
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const codeExamples = [
    {
      name: "C++",
      lines: [
        "#include <iostream>",
        "using namespace std;",
        "",
        "int nwd(int a, int b) {",
        "    if (b == 0) return a;",
        "    return nwd(b, a % b);",
        "}",
        "",
        "int main() {",
        "    cout << nwd(48, 18) << endl;",
        "    return 0;",
        "}",
      ],
    },
    {
      name: "Python",
      lines: [
        "def fibonacci(n):",
        "    if n <= 1:",
        "        return n",
        "    a, b = 0, 1",
        "    for i in range(2, n + 1):",
        "        a, b = b, a + b",
        "    return b",
        "",
        "# Wywołanie funkcji",
        "result = fibonacci(10)",
        "print(f'Fibonacci(10) = {result}')",
      ],
    },
  ];

  useEffect(() => {
    const currentCode = codeExamples[languageIndex].lines;

    if (phase === "waiting") {
      const timer = setTimeout(() => {
        setPhase("deleting");
      }, 2000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(
      () => {
        if (phase === "deleting") {
          setDisplayedCode((prev) => {
            if (prev.length === 0) {
              // Przełącz na następny język
              setLanguageIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % codeExamples.length;
                console.log(
                  `Przełączanie z ${codeExamples[prevIndex].name} na ${codeExamples[nextIndex].name}`
                );
                return nextIndex;
              });
              setCurrentLineIndex(0);
              setCurrentCharIndex(0);
              setPhase("typing");
              return [];
            }

            const newCode = [...prev];
            const lastLineIndex = newCode.length - 1;

            if (
              lastLineIndex >= 0 &&
              newCode[lastLineIndex] &&
              newCode[lastLineIndex].length > 0
            ) {
              newCode[lastLineIndex] = newCode[lastLineIndex].slice(0, -1);
            } else if (lastLineIndex >= 0) {
              newCode.pop();
            }

            return newCode;
          });
        } else if (phase === "typing") {
          if (currentLineIndex < currentCode.length) {
            const currentLine = currentCode[currentLineIndex];

            if (currentCharIndex <= currentLine.length) {
              setDisplayedCode((prev) => {
                const newCode = [...prev];
                if (newCode.length <= currentLineIndex) {
                  newCode.push("");
                }
                // Zamień spacje na &nbsp; aby zachować tabulacje
                const displayLine = currentLine
                  .slice(0, currentCharIndex)
                  .replace(/ /g, "\u00A0");
                newCode[currentLineIndex] = displayLine;
                return newCode;
              });

              setCurrentCharIndex((prev) => prev + 1);
            } else {
              setCurrentLineIndex((prev) => prev + 1);
              setCurrentCharIndex(0);
            }
          } else {
            // Kod kompletny, przejdź do oczekiwania
            setPhase("waiting");
          }
        }
      },
      phase === "deleting" ? 25 : 70
    );

    return () => clearInterval(interval);
  }, [languageIndex, phase, currentLineIndex, currentCharIndex]);

  return (
    <div className="code-animation">
      <div className="code-header">
        <span className="code-language">
          {codeExamples[languageIndex].name}
        </span>
      </div>
      <div className="code-content">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="code-line">
            {displayedCode[index] || ""}
            {index === currentLineIndex && phase === "typing" && (
              <span className="cursor">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface ReviewCarouselProps {
  reviews: string[];
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setIsVisible(true);
      }, 500); // Czas na zniknięcie
    }, 4000); // Zmiana co 4 sekundy

    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div className="review-carousel">
      <div className="review-card-single">
        <div className={`review-text ${isVisible ? "visible" : "hidden"}`}>
          <p>"{reviews[currentIndex]}"</p>
        </div>
        <div className="review-counter">
          {currentIndex + 1}/{reviews.length}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(
    new Set()
  );
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const [isGroupVisible, setIsGroupVisible] = useState(true);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isTeamVisible, setIsTeamVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Reset carousel state when switching between desktop and mobile
      if (window.innerWidth >= 1250) {
        setIsGroupVisible(true);
        setCurrentGroupIndex(0);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            if (element.classList.contains("animate-on-scroll")) {
              element.classList.add("animate");

              // Dodaj animacje do dzieci z opóźnieniem
              const children = element.querySelectorAll(".animate-child");
              children.forEach((child, index) => {
                setTimeout(() => {
                  (child as HTMLElement).classList.add("animate");
                }, index * 200);
              });

              setAnimatedElements(
                (prev) => new Set(prev.add(element.id || element.className))
              );
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Obserwuj wszystkie elementy z klasą animate-on-scroll
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const courses: Course[] = [
    {
      name: "Świeżynki",
      description:
        "Podstawy programowania w Pythonie i algorytmiki - jest to idealny wybór dla osób, które dopiero zaczynają swoją przygodę z informatyką bądź dla uczniów, którzy maturę mają dopiero za rok.",
      duration: "Poziom: ★☆☆☆☆",
    },
    {
      name: "Początkujący",
      description:
        "Grupa dla osób które co nieco już potrafią, ale chcą dowiedzieć się więcej. Doskonały wybór dla maturzystów jak i uczniów piszących maturę za rok. Na tym poziomie prowadzimy zarówno grupy z C++ jak i Pythona.",
      duration: "Poziom: ★★☆☆☆",
    },
    {
      name: "Średniozaawansowani",
      description:
        "Grupa dla osób, które mają już solidne podstawy i chcą poszerzyć swoją wiedzę. Idealna dla maturzystów, którzy chcą poprawić swoje umiejętności przed egzaminem. Na tym poziomie prowadzimy zarówno grupy z C++ jak i Pythona.",
      duration: "Poziom: ★★★★☆",
    },
    {
      name: "Zaawansowani",
      description:
        "Grupa dla osób, które chcą głównie skupić się na Diamentowym Indeksie AGH. Tutaj skupiamy się na bardziej zaawansowanych zagadnieniach z algorytmiki i programowania.",
      duration: "Poziom: ★★★★★",
    },
  ];

  const team: TeamMember[] = [
    {
      name: "Aleksandra Poskróbek",
      role: "Pomysłodawczyni i koordynatorka projektu",
      description:
        "Studentka IV roku. Współprowadzi wykłady oraz odpowiada za organizację edycji, ich ład i porządek",
      photo: logo,
      quote:
        "Godzina informatyki tygodniowo to zdecydowanie za mało, żeby przygotować się do zdania matury z dobrym wynikiem, który pozwoli dostać się np. na wiele kierunków na AGH",
    },
    {
      name: "Bartosz Wójcik",
      role: "Koordynator projektu",
      description:
        "Student II roku. Zajmuje się technicznym przygotowaniem edycji, tworzy materiały oraz próbne matury i prowadzi grupy",
      photo: logo,
      quote:
        "Wiem, jak wygląda informatyka w wielu szkołach – sam do matury przygotowywałem się na własną rękę będąc na profilu matematyczno-fizycznym i wiem, że to wcale nie jest łatwe działając samemu. Dlatego właśnie wyciągamy pomocną dłoń tym, którzy chcą się rozwijać w tym kierunku, ale po prostu nie mają teraz jak",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Funkcje do obsługi carousel grup
  const allGroups = [
    ...courses,
    {
      name: "Excel i Access",
      description:
        "Ponadto dla każdej grupy oferujemy dodatkowe nieobowiązkowe kursy z Excela i Accessa stricte pod maturę.",
      duration: "",
    },
  ];

  const nextGroup = () => {
    setIsGroupVisible(false);
    setTimeout(() => {
      setCurrentGroupIndex((prev) => (prev + 1) % allGroups.length);
      setIsGroupVisible(true);
    }, 250);
  };

  const prevGroup = () => {
    setIsGroupVisible(false);
    setTimeout(() => {
      setCurrentGroupIndex((prev) =>
        prev === 0 ? allGroups.length - 1 : prev - 1
      );
      setIsGroupVisible(true);
    }, 250);
  };

  const goToGroup = (index: number) => {
    if (index !== currentGroupIndex) {
      setIsGroupVisible(false);
      setTimeout(() => {
        setCurrentGroupIndex(index);
        setIsGroupVisible(true);
      }, 250);
    }
  };

  // Funkcje do obsługi carousel zespołu
  const getTeamMembersPerSlide = () => {
    if (windowWidth >= 1200) return 3;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  const totalTeamSlides = Math.ceil(team.length / getTeamMembersPerSlide());

  const nextTeamSlide = () => {
    setIsTeamVisible(false);
    setTimeout(() => {
      setCurrentTeamIndex((prev) => (prev + 1) % totalTeamSlides);
      setIsTeamVisible(true);
    }, 300);
  };

  const prevTeamSlide = () => {
    setIsTeamVisible(false);
    setTimeout(() => {
      setCurrentTeamIndex((prev) =>
        prev === 0 ? totalTeamSlides - 1 : prev - 1
      );
      setIsTeamVisible(true);
    }, 300);
  };

  const goToTeamSlide = (index: number) => {
    if (index !== currentTeamIndex) {
      setIsTeamVisible(false);
      setTimeout(() => {
        setCurrentTeamIndex(index);
        setIsTeamVisible(true);
      }, 300);
    }
  };

  const getCurrentTeamMembers = () => {
    const membersPerSlide = getTeamMembersPerSlide();
    const startIndex = currentTeamIndex * membersPerSlide;
    return team.slice(startIndex, startIndex + membersPerSlide);
  };

  return (
    <div className="app">
      {/* Nagłówek i nawigacja */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <a onClick={() => scrollToSection("hero")}>
              <img src={logo} alt="BitMatura Logo" />
            </a>
          </div>
          <ul className="nav-links">
            <li>
              <a onClick={() => scrollToSection("about")}>O nas</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("classes")}>Zajęcia</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("groups")}>Grupy</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("effects")}>Efekty</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("reviews")}>Opinie</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("team")}>Zespół</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("contact")}>Kontakt</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Sekcja główna - Hero */}
      <section id="hero" className="hero">
        <div className="hero-content animate-on-scroll" id="hero-content">
          <div className="hero-text-logo animate-child">
            <div className="hero-text">
              <h1>Bit MaturaXDiament</h1>
              <h2>Przygotowujesz się do matury z informatyki?</h2>
              <p>
                My ci pomożemy całkowicie za darmo!
                <br /> Dlaczego? Bo warto!
              </p>
              <div className="hero-buttons">
                <button
                  className="btn-primary"
                  onClick={() => scrollToSection("contact")}
                >
                  Dołącz do nas!
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => scrollToSection("about")}
                >
                  Dowiedz się więcej
                </button>
              </div>
            </div>
            <div className="hero-logo">
              <img src={logo} alt="BitMatura Logo" />
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja O nas */}
      <section id="about" className="about">
        <div className="animate-on-scroll" id="about-content">
          <div className="animate-child">
            <h2>O nas</h2>
          </div>
          <div className="about-grid">
            <div className="about-text animate-child">
              <p>
                Bit MaturaXDiament to sekcja koła naukowego BiT założona przez
                studentów Wydziału Informatyki na Akademii Górniczo-Hutniczej w
                Krakowie. Naszym celem jest pomoc maturzystom (i nie tylko) w
                przygotowaniu się do matury z informatyki oraz konkursu o
                Diamentowy Indeks AGH.
              </p>
              <p>
                Kurs prowadzimy nieustannie od 2023 roku, a przed nami trzecia
                edycja. W zeszłym roku udało nam się zorganizować próbną maturę
                dla naszych kursantów, która pozwoliła im poczuć się jak na
                prawdziwej maturze już w kwietniu. Naszych kursantów dzielimy na
                cztery grupy w zależności od poziomu zaawansowania, co pozwala
                na skuteczniejsze nauczanie i lepsze przygotowanie do egzaminu,
                więc każdy znajdzie coś dla siebie.
              </p>
              <p>
                Działamy w pełni charytatywnie, więc żaden kursant nie musi
                wydawać <strong className="highlight-text">ani grosza</strong>{" "}
                aby uczestniczyć w kursie. Dlaczego? Bo doskonale wiemy, że w
                sporej części szkół (zwłaszcza w mniejszych miejscowościach)
                zajęcia z informatyki nie wystarczają do napisania matury, więc
                uczniowe którzy chcą wiązać przyszłość z IT często muszą
                przygotowywać się sami. Niestety, część z nas się tym spotkała,
                dlatego właśnie zrodził się nasz projekt - dajemy możliwość
                każdej chętnej i ambitnej osobie do rozwinięcia skrzydeł w
                branży oraz do pogoni za swoją pasją ❤
              </p>
            </div>
            <div className="about-code animate-child">
              <AnimatedCode />
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja Jak wyglądają zajęcia */}
      <section id="classes" className="classes">
        <div className="animate-on-scroll" id="classes-content">
          <div className="animate-child">
            <h2>Jak wyglądają nasze zajęcia?</h2>
          </div>
          <div className="classes-content">
            <div className="classes-text animate-child">
              <h3>Format zajęć</h3>
              <p>
                Nasz kurs dzieli się na dwie istotne części: wykłady oraz
                ćwiczenia. Wykłady prowadzimy w formie hybrydowej (czyli
                stacjonarnie wraz ze spotkaniem online) oraz całkowicie online.
                Ponieważ są one prowadzone na naszym wydziale w sali wykładowej
                nasi kursanci nie tylko zyskują wiedzę, ale również mają okazję
                poczuć się jak studenci.
              </p>
              <p>
                Drugą częścią są cotygodniowe ćwiczenia online, na których
                kursanci utrwalają wiedzę poprzez robienie zadań - zarówno
                takich przygotowanych przez nasz zespół, jak i tych które
                znalazły się w podręcznikach i maturach.
              </p>
            </div>
            <div className="classes-features animate-child">
              <div className="feature-item">
                <h4>📹 Wykłady online i stacjonarnie</h4>
                <p>
                  Teoretyczne podstawy przekazywane w formie interaktywnych
                  prezentacji i rozmowy z kursantami
                </p>
              </div>
              <div className="feature-item">
                <h4>💻 Ćwiczenia praktyczne</h4>
                <p>
                  Cotygodniowe spotkania z korepetytorami na których przerabiane
                  są wszystkie zagadnienia pod maturę
                </p>
              </div>
              <div className="feature-item">
                <h4>📚 Materiały</h4>
                <p>
                  Dostęp do wszystkich materiałów i zadań na naszej platformie
                </p>
              </div>
              <div className="feature-item">
                <h4>🎯 Próbna matura</h4>
                <p>
                  Organizujemy próbną maturę, żeby was sprawdzić i przygotować
                  na prawdziwy egzamin
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja Grupy */}
      <section id="groups" className="groups">
        <div className="animate-on-scroll" id="groups-content">
          <div className="animate-child">
            <h2>Nasze Grupy</h2>
          </div>

          {/* Desktop view - wszystkie grupy widoczne */}
          <div
            className={`groups-grid ${
              windowWidth >= 1250 ? "desktop-view" : "mobile-hidden"
            }`}
          >
            {courses.map((course, index) => (
              <div
                key={index}
                className={`group-card animate-child animate-delay-${
                  index + 1
                }`}
              >
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <div className="group-meta">
                  <span className="group-duration">{course.duration}</span>
                </div>
              </div>
            ))}
            <div className={`group-card animate-child animate-delay-5`}>
              <h3>Excel i Access</h3>
              <p>
                Ponadto dla każdej grupy oferujemy dodatkowe nieobowiązkowe
                kursy z Excela i Accessa stricte pod maturę.
              </p>
            </div>
          </div>

          {/* Mobile/Tablet view - carousel */}
          <div
            className={`groups-carousel ${
              windowWidth < 1250 ? "mobile-view" : "desktop-hidden"
            }`}
          >
            <button
              className="carousel-arrow carousel-arrow-left"
              onClick={prevGroup}
            >
              ←
            </button>

            <div className="group-card-carousel">
              <div
                className={`group-card group-card-animated ${
                  isGroupVisible ? "visible" : "hidden"
                }`}
              >
                <h3>{allGroups[currentGroupIndex].name}</h3>
                <p>{allGroups[currentGroupIndex].description}</p>
                {allGroups[currentGroupIndex].duration && (
                  <div className="group-meta">
                    <span className="group-duration">
                      {allGroups[currentGroupIndex].duration}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              className="carousel-arrow carousel-arrow-right"
              onClick={nextGroup}
            >
              →
            </button>

            <div className="carousel-indicators">
              {allGroups.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${
                    index === currentGroupIndex ? "active" : ""
                  }`}
                  onClick={() => goToGroup(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja Efekty */}
      <section id="effects" className="effects">
        <div className="animate-on-scroll" id="effects-content">
          <div className="animate-child">
            <h2>Nasze Efekty</h2>
          </div>
          <div className="effects-content">
            <div className="effects-text animate-child">
              <h3>Osiągnięcia naszych uczniów</h3>
              <p>
                Nasza praca przynosi wymierne rezultaty. Dzięki indywidualnemu
                podejściu i dobrze dobranych materiałach, nasi kursanci z
                łatwością przyswajają i systematyzują wiedzę, co pozwala im
                osiągać wysokie wyniki na maturze z informatyki.
              </p>
              <p>
                Wielu z naszych kursantów zostało przyjętych na prestiżowe
                kierunki informatyczne, a niektórym udało się zająć wysokie
                miejsca w konkursie o Diamentowy Indeks AGH. Dzięki naszym
                kursom, uczniowie nie tylko zdobywają wiedzę teoretyczną, ale
                także praktyczne umiejętności, które są niezbędne między innymi
                na studiach.
              </p>
            </div>
            <div className="effects-stats animate-child">
              <div className="stat">
                <span className="stat-number">
                  <AnimatedCounter end={400} />+
                </span>
                <span className="stat-label">Zadowolonych maturzystów</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  <AnimatedCounter end={87} />%
                </span>
                <span className="stat-label">Średni wynik z matury</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  <AnimatedCounter end={10} />+
                </span>
                <span className="stat-label">Korepetytorów i wykładowców</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja Opinie */}
      <section id="reviews" className="reviews">
        <div className="animate-on-scroll" id="reviews-content">
          <div className="animate-child">
            <h2>Co mówią nasi kursanci?</h2>
          </div>

          <div className="reviews-container">
            {/* Opinie o kursach - lewa strona */}
            <div className="reviews-section-half">
              <h3 className="reviews-subtitle animate-child">
                Opinie o kursach
              </h3>
              <div className="review-display">
                <ReviewCarousel
                  reviews={[
                    "Uważam, że kurs podbił moje umiejętności oraz pomógł mi zdobyć potrzebną wiedzę w kierunku matury z informatyki.",
                    "Kurs na pewno podniósł moje zdolności na maturę z informatyki, liczę na to że uda mi się dzięki temu dostać na waszą uczelnię :)",
                    "Dzięki za pomoc w przygotowaniu do matury i indeksu :)",
                    "Bardzo fajny i angażujący się prowadzący - polecam :)",
                    "Dzięki bardzo za pomoc w przygotowaniu do matury!",
                    "Mam nadzieję, że ten projekt będzie mógł pomóc również następnym rocznikom :)",
                    "Sam nie napisałbym na taki wynik, chciałbym podziękować całej ekipie a w szczególności prowadzącemu naszej grupy. Dzięki za wszystko i obyście dalej prowadzili taką inicjatywę",
                    "Prowadzący bardzo dużo pomógł :)",
                    "Jesteście CUDOWNI.",
                  ]}
                />
              </div>
            </div>

            {/* Opinie o próbnej maturze - prawa strona */}
            <div className="reviews-section-half">
              <h3 className="reviews-subtitle animate-child">
                Opinie o próbnej maturze
              </h3>
              <div className="review-display">
                <ReviewCarousel
                  reviews={[
                    "Ogólna organizacja matury i jej przygotowanie były na wysokim poziomie :)",
                    "Super, dziękuję za możliwość udziału! :)",
                    "Próbna matura bardzo mi się podobała - odniosłam wrażenie, że adekwatnie odwzorowywała treści, które pojawiają się w nowej formule.",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja Zespół */}
      <section id="team" className="team">
        <div className="animate-on-scroll" id="team-content">
          <div className="animate-child">
            <h2>Nasz Zespół</h2>
            <p className="team-subtitle">
              Poznaj ludzi, którzy z pasją dzielą się wiedzą i pomagają osiągać
              cele w informatyce
            </p>
          </div>

          <div className="team-carousel-container">
            <button
              className="carousel-arrow carousel-arrow-left team-arrow"
              onClick={prevTeamSlide}
              disabled={totalTeamSlides <= 1}
            >
              ←
            </button>

            <div className="team-carousel">
              <div
                className={`team-slide ${isTeamVisible ? "visible" : "hidden"}`}
              >
                {getCurrentTeamMembers().map((member, index) => (
                  <div
                    key={`${currentTeamIndex}-${index}`}
                    className="team-member-card"
                  >
                    <div className="member-photo">
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} />
                      ) : (
                        <div className="photo-placeholder">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                    </div>

                    <div className="member-info">
                      <h3 className="member-name">{member.name}</h3>
                      <h4 className="member-role">{member.role}</h4>
                      <p className="member-description">{member.description}</p>

                      <div className="member-quote">
                        <div className="quote-icon">"</div>
                        <p className="quote-text">{member.quote}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="carousel-arrow carousel-arrow-right team-arrow"
              onClick={nextTeamSlide}
              disabled={totalTeamSlides <= 1}
            >
              →
            </button>
          </div>

          {totalTeamSlides > 1 && (
            <div className="team-indicators">
              {Array.from({ length: totalTeamSlides }, (_, index) => (
                <button
                  key={index}
                  className={`indicator ${
                    index === currentTeamIndex ? "active" : ""
                  }`}
                  onClick={() => goToTeamSlide(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sekcja Kontakt */}
      <section id="contact" className="contact">
        <div className="contact-main">
          <div className="animate-on-scroll" id="contact-content">
            <div className="animate-child">
              <h2>Skontaktuj się z nami</h2>
            </div>
            <div className="contact-content">
              <div className="contact-info animate-child">
                <h3>Informacje kontaktowe</h3>
                <div className="contact-item">
                  <strong>Email:</strong> maturaxdiament@agh.edu.pl
                </div>
                <div className="contact-social">
                  <button
                    className="partner-btn discord-btn"
                    onClick={() => {}}
                  >
                    <img src={logoDC} alt="Discord" />
                    <span>Dołącz na Discord</span>
                  </button>
                </div>
              </div>
              <div className="contact-buttons animate-child">
                <div className="partner-buttons">
                  <button
                    className="partner-btn"
                    onClick={() =>
                      window.open(
                        "https://www.informatyka.agh.edu.pl/pl",
                        "_blank"
                      )
                    }
                  >
                    <img src={logoWI} alt="Wydział Informatyki AGH" />
                    <span>Wydział Informatyki AGH</span>
                  </button>
                  <button
                    className="partner-btn"
                    onClick={() =>
                      window.open("https://www.agh.edu.pl", "_blank")
                    }
                  >
                    <img src={logoAGH} alt="AGH" />
                    <span>Akademia Górniczo-Hutnicza</span>
                  </button>
                  <button
                    className="partner-btn"
                    onClick={() =>
                      window.open("https://knbit.edu.pl", "_blank")
                    }
                  >
                    <img src={logoBIT} alt="Koło Naukowe BiT" />
                    <span>Koło Naukowe BiT</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stopka zintegrowana z sekcją kontakt na desktop */}
        <footer className="footer">
          <div className="container">
            <p>&copy; 2025 BitMaturaXDiament. Wszystkie prawa zastrzeżone.</p>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default App;
