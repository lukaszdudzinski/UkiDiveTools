export const barotraumaVsDcsLecture = {
    id: 'barotrauma-vs-dcs',
    title: 'Barotrauma vs DCS',
    description: 'Pełne porównanie urazów ciśnieniowych i choroby dekompresyjnej wraz z pierwszą pomocą.',
    content: [
        { type: 'header', level: 2, value: 'Barotrauma vs. Choroba Dekompresyjna (DCS) – Pełne Porównanie' },

        { type: 'header', level: 3, value: 'Wstęp: Dwa Rodzaje Zaburzeń Ciśnieniowych (DCI)' },
        { type: 'paragraph', value: 'Urazy związane ze zmianą ciśnienia podczas nurkowania (tzw. Zespół Zaburzeń Ciśnieniowych – DCI) dzielimy na dwie główne kategorie: <strong>Barotrauma (urazy ciśnieniowe)</strong> i <strong>Choroba Dekompresyjna (DCS)</strong>. Obydwa stany wymagają natychmiastowej opieki medycznej i często leczenia rekompresją w komorze dekompresyjnej. Na potrzeby pierwszej pomocy przedmedycznej, oba te urazy można traktować jako jedną grupę – DCI.' },

        { type: 'html', value: '<hr>' },

        { type: 'header', level: 3, value: 'Urazy Ciśnieniowe (Barotrauma)' },
        { type: 'paragraph', value: 'Barotrauma to uraz mechaniczny spowodowany nadmierną różnicą ciśnień między otoczeniem a gazem uwięzionym w przestrzeniach powietrznych ciała. Powstają one, gdy gaz w zamkniętych przestrzeniach kurczy się (podczas zanurzania, tzw. squeeze) lub rozszerza (podczas wynurzania).' },

        { type: 'header', level: 4, value: 'Prawa Fizyczne: Prawo Boyle\'a-Mariotte\'a' },
        { type: 'paragraph', value: 'Barotrauma jest rządzona przez <strong>Prawo Boyle\'a-Mariotte\'a</strong>, które mówi, że objętość gazu jest odwrotnie proporcjonalna do ciśnienia, któremu jest poddawana. Największe zmiany objętości gazów na każdy metr głębokości występują na głębokościach 1–10 metrów, co jest najbardziej niebezpieczną strefą zmiany ciśnienia.' },

        { type: 'header', level: 4, value: 'Barotrauma podczas Wynurzania (UCP - Urazy Ciśnieniowe Płuc)' },
        { type: 'paragraph', value: 'Są to <strong>najpoważniejsze urazy nurkowe</strong>. Występują, gdy rozszerzający się gaz jest uwięziony w płucach, co prowadzi do rozerwania pęcherzyków płucnych, gdy nadciśnienie przekroczy 0,12 bara (50 do 90 mm Hg wyższe od ciśnienia otoczenia).' },

        { type: 'image', src: 'img/lectures/UCP_wynurzanie.jpg', alt: 'Infografika: Urazy Ciśnieniowe Płuc - Wynurzanie', caption: 'Kliknij, aby powiększyć: Typy urazów płuc przy wstrzymaniu oddechu.' },

        { type: 'header', level: 4, value: 'Inne Barotraumy' },
        { type: 'image', src: 'img/lectures/UCP_barotrauma.jpg', alt: 'Infografika: Inne Barotraumy (Ucho, Zatoki, Zęby)', caption: 'Kliknij, aby powiększyć: Mechanizmy i objawy barotraumy ucha, zatok i zębów.' },

        { type: 'info-box', style: 'warning', content: '⚠️ <strong>KLUCZOWA ZASADA (Barotrauma):</strong> <u>CIĄGŁE ODDYCHANIE!</u> NIGDY NIE WSTRZYMUJ ODDECHU podczas wynurzania!' },

        { type: 'header', level: 4, value: 'Profilaktyka Barotraumy:' },
        {
            type: 'list', items: [
                '<strong>Oddychanie:</strong> Utrzymuj ciągły, rytmiczny oddech przez całe nurkowanie',
                '<strong>Wyrównywanie:</strong> Wyrównuj ciśnienie w uszach i masce podczas zanurzania (często i delikatnie)',
                '<strong>Zdrowie:</strong> Nie nurkuj z katarem lub po chorobach układu oddechowego (przerwa min. 1 miesiąc)',
                '<strong>Prędkość:</strong> Stosuj prawidłową prędkość wynurzania (max 9-10 m/min)'
            ]
        },

        { type: 'header', level: 4, value: 'Pierwsza Pomoc (Barotrauma Płuc / AGE):' },
        {
            type: 'list', ordered: true, items: [
                '<strong>Wezwij pomoc:</strong> Natychmiast wezwij służby ratunkowe (112/999)',
                '<strong>Tlen 100%:</strong> Podaj maksymalny przepływ tlenu (jeśli masz kwalifikacje). <em>Tlen jest najważniejszym lekarstwem!</em>',
                '<strong>Pozycja:</strong> Ułóż poszkodowanego poziomo (może woleć pozycję siedzącą przy duszności)',
                '<strong>Rekompresja:</strong> Najważniejsza jest natychmiastowa rekompresja w komorze hiperbarycznej',
                '<strong>NIGDY:</strong> Nie zabieraj nurka z powrotem pod wodę!'
            ]
        },

        { type: 'html', value: '<hr>' },

        { type: 'header', level: 3, value: 'Choroba Dekompresyjna (DCS)' },
        { type: 'paragraph', value: 'Choroba dekompresyjna (DCS lub choroba kesonowa) to zespół objawów spowodowanych uwolnieniem nadmiaru gazu obojętnego (np. azotu) w tkankach na skutek nieprawidłowego wynurzania.' },

        { type: 'header', level: 4, value: 'Prawa Fizyczne: Prawo Henry\'ego' },
        { type: 'paragraph', value: 'DCS jest związana z <strong>Prawem Henry\'ego</strong>, które mówi, że objętość gazu rozpuszczonego w cieczy (tkankach) rośnie wraz ze wzrostem ciśnienia.' },
        { type: 'paragraph', value: '<strong>Mechanizm:</strong> Podczas wynurzania ciśnienie otoczenia spada zbyt szybko, a nadmiar rozpuszczonego azotu wydziela się z roztworu i formuje pęcherzyki w tkankach i krwioobiegu. DCS występuje, gdy wchłonięte gazy obojętne tworzą pęcherzyki z powodu wysokiego gradientu desaturacji.' },

        { type: 'header', level: 4, value: 'Objawy i Typy DCS' },
        { type: 'paragraph', value: 'Objawy DCS zwykle pojawiają się między <strong>15 minutą a 12 godziną po wynurzeniu</strong>, przy czym 98% objawów występuje w ciągu pierwszych 24 godzin.' },

        { type: 'image', src: 'img/lectures/DCS_typy.jpg', alt: 'Infografika: Typy i Objawy Choroby Dekompresyjnej (DCS)', caption: 'Kliknij, aby powiększyć: Podział na typy DCS i ich charakterystyczne objawy.' },

        { type: 'paragraph', value: '<strong>Uwaga:</strong> Niemożliwym jest odróżnienie neurologicznej postaci DCS od AGE bez znajomości przebiegu nurkowania. Nie należy sztywno dzielić DCS na typ I i II, ponieważ u nurka mogą występować objawy charakterystyczne dla obu typów.' },

        { type: 'header', level: 4, value: 'Czynniki Ryzyka Zwiększające Podatność na DCS:' },
        {
            type: 'list', items: [
                'Wiek (zwykle powyżej 40/50 lat)',
                'Niska sprawność fizyczna i otyłość',
                'Zmęczenie lub brak snu',
                'Odwodnienie',
                'Narażenie na zimną wodę i wychłodzenie',
                'Intensywny wysiłek fizyczny w trakcie lub po nurkowaniu',
                'Spożywanie alkoholu i/lub narkotyków',
                'Lot samolotem lub podróż na wysokość 300m+ po nurkowaniu',
                'Nurkowania wielokrotne w ciągu dnia lub wielodniowe',
                'Nurkowanie głębokie i o długim czasie trwania',
                'Wady serca (np. przetrwały otwór owalny - PFO)'
            ]
        },

        { type: 'info-box', style: 'warning', content: '⚠️ <strong>KLUCZOWA ZASADA (DCS):</strong> Zawsze <u>nurkuj w granicach limitów Dopplera</u> (limitów bezdekompresyjnych). Bądź konserwatywny (ostrożny) podczas serii nurkowań!' },

        { type: 'header', level: 4, value: 'Profilaktyka DCS:' },
        {
            type: 'list', items: [
                '<strong>Prędkość wynurzania:</strong> Nie większa niż 9-10 m/min',
                '<strong>Przystanek bezpieczeństwa:</strong> Wykonaj 3-5 minut na 3-5 metrach po KAŻDYM nurkowaniu (ok. 40% wypadków DCS to nurkowania bez przystanku!)',
                '<strong>Limity:</strong> Nurkuj w granicach limitów bezdekompresyjnych',
                '<strong>Nawodnienie:</strong> Dbaj o odpowiednie nawodnienie organizmu',
                '<strong>Wysiłek:</strong> Unikaj intensywnego wysiłku fizycznego po nurkowaniu',
                '<strong>Lot:</strong> Odczekaj min. 24h przed lotem samolotem'
            ]
        },

        { type: 'header', level: 4, value: 'Pierwsza Pomoc (DCS):' },
        {
            type: 'list', ordered: true, items: [
                '<strong>Wezwij pomoc:</strong> Natychmiast (112/999). Poinformuj o konieczności transportu do komory dekompresyjnej. Polska: Krajowy Ośrodek Medycyny Hiperbarycznej (58 622 51 63)',
                '<strong>Tlen 100%:</strong> Bezzwłocznie podaj maksymalny przepływ tlenu (jeśli masz kwalifikacje)',
                '<strong>Pozycja:</strong> Ułóż poszkodowanego poziomo',
                '<strong>Płyny:</strong> Podaj do 1 litra niegazowanych płynów (jeśli przytomny i bez duszności)',
                '<strong>Rekompresja:</strong> Leczenie w komorze dekompresyjnej – opóźnienie jest najgorszą rzeczą!'
            ]
        },

        { type: 'html', value: '<hr>' },

        { type: 'header', level: 3, value: 'Podsumowanie Kluczowych Różnic' },
        { type: 'image', src: 'lectures/barotrauma-vs-dcs/Barotrauma_vs_DCS.jpg', alt: 'Infografika: Porównanie Barotrauma (UCP) vs DCS', caption: 'Kliknij, aby powiększyć: Kluczowe różnice między Urazami Ciśnieniowymi a DCS.' },

        { type: 'info-box', style: 'warning', content: '🚨 <strong>PAMIĘTAJ:</strong> W obu przypadkach najważniejsze to:<br>1. Natychmiastowe wezwanie pomocy medycznej<br>2. Podanie 100% tlenu<br>3. Rekompresja w komorze dekompresyjnej<br>4. <em>Nie próbuj rekompresji w wodzie!</em>' }
    ],
    audioSrc: 'public/assets/lectures/Barotrauma_i_DCS_czyli_mechanika_kontra_fizjologia.m4a',
    presentationSrc: 'public/assets/lectures/Diving_Illness_Barotrauma_and_DCS.pdf',
    quiz: [
        {
            question: "Jaka jest kluczowa różnica w przyczynie między Barotraumą Płuc a DCS?",
            options: [
                "Barotrauma wynika z wychłodzenia, a DCS z przegrzania",
                "Barotrauma to efekt wstrzymania oddechu (mechaniczny), a DCS to efekt nasycenia azotem (rozpuszczalność)",
                "Barotrauma dotyczy tylko uszu, a DCS tylko płuc",
                "Nie ma żadnej różnicy"
            ],
            correctAnswer: 1,
            explanation: "Barotrauma płuc to mechaniczne uszkodzenie przez rozszerzający się gaz (Boyle). DCS to wydzielanie się pęcherzyków gazu z tkanek (Henry)."
        },
        {
            question: "Które z poniższych jest objawem neurologicznym (ciężkim) DCS/AGE?",
            options: [
                "Lekki ból ucha",
                "Swędzenie skóry",
                "Utrata przytomności, paraliż, zaburzenia mowy",
                "Zmęczenie po nurkowaniu"
            ],
            correctAnswer: 2,
            explanation: "Objawy neurologiczne świadczą o zajęciu ośrodkowego układu nerwowego (mózg, rdzeń) i są stanem bezpośredniego zagrożenia życia."
        },
        {
            question: "Co jest najważniejszym 'lekarstwem' w pierwszej pomocy przy wypadkach nurkowych?",
            options: [
                "Ciepła herbata",
                "Aspiryna",
                "100% Tlen",
                "Zimny okład"
            ],
            correctAnswer: 2,
            explanation: "Tlen 100% przyspiesza eliminację azotu, zmniejsza obrzęki i niedotlenienie tkanek. Należy go podać jak najszybciej."
        },
        {
            question: "Kiedy najczęściej pojawiają się objawy Tętniczego Zatoru Gazowego (AGE) po nurkowaniu?",
            options: [
                "W ciągu 1-2 godzin",
                "Natychmiast lub w ciągu kilku minut (do 30 min)",
                "Po 24 godzinach",
                "Tylko pod wodą"
            ],
            correctAnswer: 1,
            explanation: "AGE (związany z Barotraumą płuc) pojawia się zazwyczaj natychmiast lub w ciągu kilku minut po wynurzeniu, w przeciwieństwie do DCS (15 min - 12h)."
        },
        {
            question: "Która procedura jest ZABRONIONA w pierwszej pomocy przy wypadkach nurkowych?",
            options: [
                "Podanie 100% tlenu",
                "Rekompresja w wodzie (zabieranie poszkodowanego z powrotem pod wodę)",
                "Wezwanie pomocy medycznej",
                "Ułożenie poszkodowanego poziomo"
            ],
            correctAnswer: 1,
            explanation: "NIGDY nie zabieraj poszkodowanego z powrotem pod wodę! To może pogorszyć stan i narazić na kolejne zagrożenia. Tylko rekompresja w komorze jest bezpieczna."
        },
        {
            question: "Jaki jest najważniejszy środek zapobiegawczy dla Barotraumy Płuc?",
            options: [
                "Nurkowanie z Nitroksem",
                "Wolne wynurzanie",
                "CIĄGŁE ODDYCHANIE - nigdy nie wstrzymuj oddechu podczas wynurzania",
                "Przystanek bezpieczeństwa na 5m"
            ],
            correctAnswer: 2,
            explanation: "Kluczowa zasada: NIGDY nie wstrzymuj oddechu podczas wynurzania! To najważniejszy środek zapobiegający UCP/AGE."
        },
        {
            question: "Który objaw sugeruje DCS Typ II (ciężki) zamiast Typ I?",
            options: [
                "Bóle stawów i mięśni",
                "Swędzenie skóry",
                "Paraliż, zaburzenia mowy, utrata przytomności",
                "Zmęczenie"
            ],
            correctAnswer: 2,
            explanation: "Objawy neurologiczne (paraliż, zaburzenia mowy/wzroku, utrata przytomności) wskazują na DCS Typ II - stan bezpośredniego zagrożenia życia."
        },
        {
            question: "Dlaczego przystanek bezpieczeństwa (3-5 min na 5m) jest tak ważny w zapobieganiu DCS?",
            options: [
                "Pozwala oszczędzać powietrze",
                "Daje czas na bezpieczne odgazowanie nadmiaru azotu",
                "Jest wymagany prawnie",
                "Pomaga wyrównać ciśnienie w uszach"
            ],
            correctAnswer: 1,
            explanation: "Przystanek bezpieczeństwa znacząco redukuje ryzyko DCS, umożliwiając bezpieczne uwolnienie azotu. Ok. 40% wypadków DCS to nurkowania bez przystanku!"
        },
        {
            question: "Ile czasu należy odczekać przed lotem samolotem po nurkowaniu?",
            options: [
                "1 godzina",
                "6 godzin",
                "Co najmniej 18-24 godziny",
                "Można lecieć od razu"
            ],
            correctAnswer: 2,
            explanation: "Minimum 18-24h przed lotem! Obniżone ciśnienie na wysokości zwiększa ryzyko DCS przez uwolnienie rozpuszczonego azotu."
        },
        {
            question: "Co wspólnego mają Barotrauma i DCS w leczeniu?",
            options: [
                "Oba leczy się antybiotykami",
                "Oba wymagają 100% tlenu i rekompresji w komorze dekompresyjnej",
                "Oba leczy się aspiryną",
                "Nie wymagają leczenia"
            ],
            correctAnswer: 1,
            explanation: "Mimo różnych mechanizmów, oba wymagają natychmiastowego podania 100% tlenu i leczenia w komorze dekompresyjnej. Czas jest kluczowy!"
        },
        {
            question: "Mechanizm bólu: Jaka jest różnica między bólem w Barotraumie a DCS?",
            options: [
                "Nie ma różnicy",
                "Barotrauma: ból ostry, miejscowy, narastający przy zmianie ciśnienia. DCS: ból tępy, głęboki, stały.",
                "Barotrauma nie boli, DCS boli bardzo",
                "Barotrauma to swędzenie, DCS to ból"
            ],
            correctAnswer: 1,
            explanation: "Barotrauma to uraz mechaniczny (np. naciągnięcie błony), co daje ostry ból skorelowany z ciśnieniem. Ból w DCS ('bends') jest często trudny do zlokalizowania, tępy i głęboki."
        },
        {
            question: "Który uraz jest bardziej prawdopodobny, jeśli objawy wystąpiły 2 minuty po wynurzeniu?",
            options: [
                "DCS (Choroba Dekompresyjna)",
                "AGE (Zator Gazowy / Barotrauma Płuc)",
                "Narkoza azotowa",
                "Hipotermia"
            ],
            correctAnswer: 1,
            explanation: "Objawy natychmiastowe (0-10 min) po wynurzeniu niemal zawsze sugerują zator gazowy (AGE) lub barotraumę płuc. DCS zazwyczaj rozwija się wolniej (powyżej 15-20 min)."
        },
        {
            question: "Które prawo gazowe odpowiada za Barotraumę, a które za DCS?",
            options: [
                "Oba Prawo Archimedesa",
                "Barotrauma: Boyle (objętość). DCS: Henry (rozpuszczalność).",
                "Barotrauma: Henry. DCS: Boyle.",
                "Barotrauma: Dalton. DCS: Charles."
            ],
            correctAnswer: 1,
            explanation: "Boyle wyjaśnia mechaniczne zmiany objętości (rozrywanie tkanek). Henry wyjaśnia nasycanie tkanek gazem (bąbelki w krwi)."
        },
        {
            question: "Co to są 'Silent Bubbles' (Ciche Pęcherzyki)?",
            options: [
                "Pęcherzyki, które nie pękają",
                "Mikropęcherzyki w żyle, które nie dają objawów DCS, ale są obecne po wielu nurkowaniach",
                "Pęcherzyki w napoju",
                "Pęcherzyki w masce"
            ],
            correctAnswer: 1,
            explanation: "Ciche pęcherzyki występują po wielu nurkowaniach bezobjawowo. Są filtrowane przez płuca, ale ich nadmiar może prowadzić do DCS."
        },
        {
            question: "Jakie nawodnienie jest zalecane w pierwszej pomocy przy DCS?",
            options: [
                "Kawa lub herbata",
                "Alkohol",
                "Woda niegazowana, jeśli poszkodowany jest przytomny",
                "Nic nie podawać"
            ],
            correctAnswer: 2,
            explanation: "Nawodnienie (ok. 1 litr w ciągu godziny) pomaga rozrzedzić krew i poprawić mikrokrążenie, co ułatwia eliminację azotu."
        },
        {
            question: "W którym przypadku transport do komory jest pilniejszy?",
            options: [
                "W obu jest krytycznie ważny",
                "Tylko przy DCS skórnym",
                "Tylko przy bólu ucha",
                "Można poczekać do jutra"
            ],
            correctAnswer: 0,
            explanation: "Zarówno AGE (zator) jak i ciężki DCS są stanami zagrożenia życia/zdrowia. W obu przypadkach czas dotarcia do komory decyduje o rokowaniach."
        },
        {
            question: "Czy podanie tlenu może zaszkodzić przy Barotraumie?",
            options: [
                "Tak, może rozerwać płuca",
                "Nie, tlen jest zawsze korzystny w wypadkach nurkowych",
                "Zależy od głębokości",
                "Tylko na receptę"
            ],
            correctAnswer: 1,
            explanation: "W pierwszej pomocy na powierzchni (1 ATA) tlen 100% jest bezpieczny i zawsze zalecany przy podejrzeniu jakiegokolwiek urazu ciśnieniowego."
        },
        {
            question: "Jakie jest ryzyko przy lataniu samolotem z nieleczoną odmą opłucnową (Barotrauma)?",
            options: [
                "Brak ryzyka",
                "Rozprężenie gazu w opłucnej na wysokości może doprowadzić do zapaści płuca i śmierci",
                "Tylko ból ucha",
                "Szybsze wyzdrowienie"
            ],
            correctAnswer: 1,
            explanation: "Obniżone ciśnienie w samolocie spowoduje rozprężenie powietrza w jamie opłucnej (zgodnie z prawem Boyle'a), co może być śmiertelne."
        },
        {
            question: "Czy utrata przytomności po wynurzeniu to zawsze DCS?",
            options: [
                "Tak",
                "Nie, częściej jest to objaw Zatoru Gazowego (AGE) wynikającego z Barotraumy Płuc",
                "To zawsze zmęczenie",
                "To wina sprzętu"
            ],
            correctAnswer: 1,
            explanation: "Nagła utrata przytomności tuż po wynurzeniu jest klasycznym objawem masywnego zatoru gazowego (AGE), który trafia do mózgu."
        }
    ]
};
