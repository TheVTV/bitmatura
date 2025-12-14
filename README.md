# BitMaturaXDiament - Strona internetowa

Oficjalna strona internetowa projektu BitMaturaXDiament - bezpłatnego kursu przygotowawczego do matury z informatyki prowadzonego przez studentów Wydziału Informatyki AGH.

## 🚀 Technologie

- **React 19** z TypeScript
- **Vite** jako build tool
- **CSS3** z animacjami i responsive design
- **ESLint** do kontroli jakości kodu

## 📁 Struktura projektu

```
src/
├── assets/           # Obrazy i zasoby statyczne
│   ├── logo.png
│   ├── logo_agh.jpg
│   ├── logo_bit.jpg
│   ├── logo_dc.png
│   └── logo_wi.png
├── App.tsx          # Główny komponent aplikacji
├── App.css          # Style CSS
├── main.tsx         # Punkt wejścia aplikacji
├── index.css        # Globalne style bazowe
└── vite-env.d.ts    # Definicje typów dla Vite
```

## 🎨 Funkcjonalności

### Sekcje strony:

- **Hero** - Główna sekcja powitalna z animowanym logo
- **O nas** - Informacje o projekcie z animowanym kodem
- **Zajęcia** - Opis formatu zajęć i oferowanych usług
- **Grupy** - Prezentacja grup na różnych poziomach zaawansowania
- **Efekty** - Statystyki i osiągnięcia z animowanymi licznikami
- **Opinie** - Karuzela z opiniami kursantów
- **Zespół** - Prezentacja członków zespołu w formie karuzeli
- **Kontakt** - Informacje kontaktowe i linki do partnerów

### Responsywne funkcjonalności:

- **Adaptacyjne karuzele** - automatyczne przełączanie między widokiem siatki a karuzelą
- **Animacje scroll** - elementy animują się przy przewijaniu
- **Mobile-first design** - optymalizacja pod urządzenia mobilne
- **Płynne przejścia** - smooth scrolling między sekcjami

## 🛠 Instalacja i uruchomienie

### Wymagania:

- Node.js (v18 lub nowszy)
- npm lub yarn

### Kroki:

1. **Klonowanie repozytorium:**

   ```bash
   git clone [URL_REPOZYTORIUM]
   cd bitmatura
   ```

2. **Instalacja zależności:**

   ```bash
   npm install
   ```

3. **Uruchomienie serwera deweloperskiego:**

   ```bash
   npm run dev
   ```

   Aplikacja będzie dostępna pod adresem `http://localhost:5173`

4. **Build produkcyjny:**

   ```bash
   npm run build
   ```

5. **Podgląd buildu:**
   ```bash
   npm run preview
   ```

## 📱 Responsive Breakpoints

- **Desktop:** ≥ 1250px - pełna funkcjonalność
- **Tablet:** 768px - 1249px - adaptacyjne layouty
- **Mobile:** < 768px - zoptymalizowane dla telefonów
- **Small Mobile:** < 480px - dodatkowe optymalizacje

## 🎯 Animacje i UX

### Animacje scroll:

- Fade-in z przesunięciem dla sekcji
- Stopniowe pojawianie się elementów podrzędnych
- Intersection Observer API dla wydajności

### Karuzele:

- Automatyczne przełączanie co 4 sekundy (opinie)
- Fade transition między slajdami
- Wskaźniki postępu i nawigacja strzałkami
- Touch-friendly na urządzeniach mobilnych

### Animowany kod:

- Symulacja pisania kodu w czasie rzeczywistym
- Przełączanie między C++ i Python
- Efekt kursora tekstowego

## 🏗 Architektura kodu

### Komponenty:

- **AnimatedCounter** - liczniki z animacją
- **AnimatedCode** - animowana prezentacja kodu
- **ReviewCarousel** - karuzela opinii
- **App** - główny komponent zawierający całą stronę

### Style:

- Modułowa struktura CSS
- CSS Grid i Flexbox dla layoutów
- CSS Custom Properties dla kolorów
- Mobile-first media queries

## 🔧 Konfiguracja

### ESLint:

- Skonfigurowany dla React + TypeScript
- Sprawdzanie hooks i refresh patterns
- Optymalizacje dla produkcji

### TypeScript:

- Strict mode włączony
- Definicje interfejsów dla wszystkich komponentów
- Type safety dla wszystkich props

### Vite:

- Hot Module Replacement (HMR)
- Optymalizowane buildy
- Tree shaking dla mniejszych bundli

## 📧 Kontakt

- **Email:** maturaxdiament@agh.edu.pl
- **Discord:** [Link do serwera]
- **AGH:** [Akademia Górniczo-Hutnicza](https://www.agh.edu.pl)
- **Wydział Informatyki:** [WI AGH](https://www.informatyka.agh.edu.pl/pl)
- **Koło BiT:** [Koło Naukowe BiT](https://knbit.edu.pl)

## 📄 Licencja

© 2025 BitMaturaXDiament. Wszystkie prawa zastrzeżone.
