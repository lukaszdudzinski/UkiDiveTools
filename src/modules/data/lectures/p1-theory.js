export const p1TheoryLecture = {
    id: 'p1-theory',
    title: 'OWD/P1 (Open Water Diver)',
    description: 'Kompendium wiedzy kursu podstawowego: Sprzęt, Fizyka, Fizjologia, Środowisko i Technika.',
    content: [
        // ROZDZIAŁ 1: SPRZĘT PODSTAWOWY (ABC)
        { type: 'header', level: 2, value: 'ROZDZIAŁ 1: SPRZĘT PODSTAWOWY (ABC)' },
        { type: 'paragraph', value: 'Sprzęt podstawowy, znany jako ABC, to fundament wyposażenia każdego płetwonurka. Składa się z maski, fajki i płetw. Choć wydaje się prosty, jego właściwy dobór i zrozumienie budowy są kluczowe dla komfortu i bezpieczeństwa pod wodą.' },

        { type: 'header', level: 3, value: '1.1 Maska Nurkowa' },
        { type: 'paragraph', value: 'Ludzkie oko jest przystosowane do widzenia w powietrzu. W wodzie, która ma inną gęstość optyczną, światło załamuje się inaczej, co powoduje, że obraz staje się nieostry. Maska tworzy przed oczami przestrzeń powietrzną, która przywraca ostrość widzenia.' },
        {
            type: 'list', items: [
                '<strong>Szyba (Soczewka):</strong> Musi być wykonana ze szkła hartowanego (oznaczenie Tempered lub Safety Glass). Jest to wymóg bezpieczeństwa – w razie stłuczenia szkło to rozpada się na drobne, nieostre kawałki, co chroni oczy przed poważnym urazem. W maskach rekreacyjnych nie stosuje się zwykłego szkła ani plastiku (który łatwo się rysuje).',
                '<strong>Kołnierz uszczelniający (Fartuch):</strong> Wykonany z wysokiej jakości, hipoalergicznego silikonu (dawniej z gumy). Silikon jest trwały, elastyczny i odporny na działanie słońca oraz wody morskiej. Kołnierz musi posiadać podwójną krawędź uszczelniającą (wewnętrzny i zewnętrzny płaszcz), co znacznie zwiększa szczelność maski.',
                '<strong>Ramka:</strong> Element konstrukcyjny (zazwyczaj z tworzywa), w którym osadzona jest szyba i do którego przymocowany jest kołnierz. Nowoczesne maski typu frameless (bezramkowe) mają szybę wtopioną bezpośrednio w silikon.',
                '<strong>Kieszeń na nos (Noski):</strong> Elastyczna część kołnierza osłaniająca nos. Jest to niezbędny element maski nurkowej. Umożliwia ona zaciśnięcie nosa palcami w celu wyrównania ciśnienia w uszach (manewr Valsalvy) oraz wyrównanie ciśnienia wewnątrz samej maski.',
                '<strong>Pasek i klamry:</strong> Pasek utrzymuje maskę na głowie. Klamry powinny umożliwiać łatwą i precyzyjną regulację. Ważne jest, aby pasek nie był zbyt mocno dociągnięty – szczelność zapewnia ciśnienie wody dociskające maskę do twarzy.'
            ]
        },

        { type: 'header', level: 3, value: '1.2 Fajka (Rurka oddechowa)' },
        { type: 'paragraph', value: 'Fajka pozwala na oddychanie powietrzem atmosferycznym, gdy twarz nurka jest zanurzona pod powierzchnią wody. Służy do oszczędzania powietrza z butli podczas płynięcia po powierzchni do miejsca zanurzenia lub powrotu na brzeg/łódź.' },
        {
            type: 'list', items: [
                '<strong>Rurka:</strong> Powinna mieć odpowiednią średnicę (ok. 2 cm) i długość (ok. 30-35 cm). Zbyt długa lub szeroka rurka zwiększa tzw. przestrzeń martwą.',
                '<strong>Ustnik:</strong> Wykonany z miękkiego silikonu, anatomicznie dopasowany, aby nie męczyć szczęki.',
                '<strong>Zawór wylotowy (dolny):</strong> Umieszczony pod ustnikiem jednokierunkowy zawór grzybkowy. Ułatwia oczyszczanie fajki z wody.',
                '<strong>Zabezpieczenie przed falą (Labirynt/Deflektor):</strong> Element na szczycie fajki, który ogranicza wlewanie się wody do środka przy zafalowaniu.',
                '<strong>Zaczep (Klips):</strong> Służy do przymocowania fajki do paska maski. Fajkę nosimy zawsze po lewej stronie głowy.'
            ]
        },

        { type: 'header', level: 3, value: '1.3 Płetwy' },
        { type: 'paragraph', value: 'Większość napędu w nurkowaniu pochodzi z nóg. Płetwy zwiększają powierzchnię stopy, umożliwiając efektywne odpychanie się od wody.' },
        {
            type: 'list', ordered: true, items: [
                '<strong>Płetwy kaloszowe:</strong> Zakładane na gołą stopę. Posiadają pełny kalosz obejmujący piętę. Są lżejsze i używane głównie w ciepłych wodach oraz na basenie.',
                '<strong>Płetwy paskowe:</strong> Posiadają otwartą piętę i regulowany pasek. Są przeznaczone do używania wyłącznie z butami nurkowymi. Jest to standard w nurkowaniu w polskich wodach.'
            ]
        },
        { type: 'paragraph', value: '<strong>Budowa pióra:</strong> Pióra płetw mogą być wykonane z gumy, plastiku lub kompozytów. Często posiadają dysze, kanały przepływowe lub są wykonane z materiałów o różnej twardości.' },

        // ROZDZIAŁ 2: FIZYKA NURKOWANIA
        { type: 'header', level: 2, value: 'ROZDZIAŁ 2: FIZYKA NURKOWANIA' },
        { type: 'paragraph', value: 'Zrozumienie fizyki jest kluczem do bezpieczeństwa. Woda jest środowiskiem o gęstości około 800 razy większej niż powietrze, co drastycznie zmienia oddziaływanie na ludzkie ciało.' },

        { type: 'header', level: 3, value: '2.1 Ciśnienie' },
        { type: 'paragraph', value: 'Ciśnienie to siła nacisku działająca na jednostkę powierzchni. W nurkowaniu operujemy trzema rodzajami ciśnienia:' },
        {
            type: 'list', ordered: true, items: [
                '<strong>Ciśnienie atmosferyczne (barometryczne):</strong> Ciśnienie wywierane przez słup powietrza nad nami. Na poziomie morza przyjmujemy, że wynosi ono 1 bar (1 at).',
                '<strong>Ciśnienie hydrostatyczne (słupa wody):</strong> Ciśnienie wywierane przez wodę. Każde 10 metrów słupa wody (słonej) to dodatkowy 1 bar ciśnienia.',
                '<strong>Ciśnienie całkowite (absolutne/bezwzględne):</strong> To suma ciśnienia atmosferycznego i hydrostatycznego. To właśnie to ciśnienie oddziałuje na nurka i jego sprzęt.'
            ]
        },
        {
            type: 'list', items: [
                'Głębokość 0 m (powierzchnia) = 1 bar atmosferyczny + 0 bar wodnych = 1 bar (absolutny).',
                'Głębokość 10 m = 1 bar atm. + 1 bar wodny = 2 bary.',
                'Głębokość 20 m = 1 bar atm. + 2 bary wodne = 3 bary.',
                'Głębokość 30 m = 1 bar atm. + 3 bary wodne = 4 bary.'
            ]
        },

        { type: 'header', level: 3, value: '2.2 Prawo Boyle’a-Mariotte’a' },
        { type: 'paragraph', value: 'To fundamentalne prawo dla nurków. Mówi ono, że w stałej temperaturze objętość danej masy gazu jest odwrotnie proporcjonalna do ciśnienia.' },
        {
            type: 'list', items: [
                'Jeśli ciśnienie rośnie (zanurzanie), objętość gazu maleje.',
                'Jeśli ciśnienie maleje (wynurzanie), objętość gazu rośnie.'
            ]
        },
        {
            type: 'list', items: [
                '<strong>Skutki przy zanurzaniu:</strong> Powietrze w przestrzeniach zamkniętych (ucho, maska) kurczy się. Brak wyrównania ciśnienia grozi barotraumą ucisku.',
                '<strong>Skutki przy wynurzaniu:</strong> Powietrze w płucach i BCD rozpręża się. Wstrzymanie oddechu grozi urazem ciśnieniowym płuc.',
                '<strong>Strefa 0-10m:</strong> Tutaj zmiany objętości są największe (x2), co czyni tę strefę najbardziej krytyczną dla pływalności i urazów.'
            ]
        },

        { type: 'header', level: 3, value: '2.3 Prawo Archimedesa i Pływalność' },
        { type: 'paragraph', value: 'Prawo to mówi, że na ciało zanurzone w cieczy działa siła wyporu skierowana ku górze, równa ciężarowi cieczy wypartej przez to ciało.' },
        {
            type: 'list', ordered: true, items: [
                '<strong>Pływalność dodatnia:</strong> Nurek unosi się na powierzchni.',
                '<strong>Pływalność ujemna:</strong> Nurek tonie (opada na dno).',
                '<strong>Pływalność neutralna:</strong> Nurek "lewituje" w toni wodnej. Stan pożądany pod wodą.'
            ]
        },
        { type: 'paragraph', value: 'Do kontroli pływalności służy kamizelka (BCD) oraz płuca. Dodając powietrze – zwiększamy wyporność. Wypuszczając – tracimy ją.' },

        // ROZDZIAŁ 3: FIZJOLOGIA I PATOFIZJOLOGIA
        { type: 'header', level: 2, value: 'ROZDZIAŁ 3: FIZJOLOGIA I PATOFIZJOLOGIA NURKOWANIA' },
        { type: 'paragraph', value: 'Organizm człowieka reaguje na zmiany ciśnienia i składników oddechowych w sposób specyficzny. Zrozumienie tych mechanizmów pozwala unikać chorób nurkowych.' },

        { type: 'header', level: 3, value: '3.1 Urazy Ciśnieniowe (Barotraumy)' },
        { type: 'paragraph', value: 'Są to uszkodzenia tkanek wynikające z różnicy ciśnień między gazem wewnątrz ciała a otoczeniem.' },

        { type: 'header', level: 4, value: 'A. Barotraumy Ucisku (przy zanurzaniu)' },
        {
            type: 'list', items: [
                '<strong>Ucho środkowe:</strong> Błona bębenkowa jest zasysana do wewnątrz. Brak wyrównania może prowadzić do pęknięcia błony i zalania ucha zimną wodą (zawroty głowy).',
                '<strong>Zatoki:</strong> Jeśli ujścia są niedrożne, powstaje podciśnienie. Objawy: silny ból czoła/szczęki, krwawienie z nosa.',
                '<strong>Maska (Squeeze):</strong> Niewydmuchanie nosa do maski powoduje przyssanie jej do twarzy (krwawe wybroczyny w oczach).'
            ]
        },

        { type: 'header', level: 4, value: 'B. Barotraumy Rozprężeniowe (przy wynurzaniu)' },
        {
            type: 'list', items: [
                '<strong>Uraz ciśnieniowy płuc:</strong> Występuje przy wstrzymaniu oddechu podczas wynurzania. Rozdęte powietrze rozrywa pęcherzyki płucne. Gaz może dostać się do krwiobiegu (Zator Gazowy - AGE), co grozi śmiercią lub paraliżem.'
            ]
        },
        { type: 'info-box', style: 'warning', title: 'Zasada Bezpieczeństwa', content: 'W przypadku każdego awaryjnego wynurzania należy wydychać powietrze w sposób ciągły, wydając dźwięk (np. "ahhh").' },

        { type: 'header', level: 3, value: '3.2 Choroby związane z gazami' },

        { type: 'header', level: 4, value: 'A. Narkoza Azotowa (Ekstaza Głębin)' },
        { type: 'paragraph', value: 'Azot pod ciśnieniem (zazwyczaj poniżej 30m) działa jak środek odurzający.' },
        {
            type: 'list', items: [
                '<strong>Objawy:</strong> Euforia, lęk, spowolnienie reakcji, zawężenie pola widzenia (jak upojenie alkoholowe).',
                '<strong>Postępowanie:</strong> Natychmiastowe wynurzenie się na mniejszą głębokość. Objawy ustępują od razu.'
            ]
        },

        { type: 'header', level: 4, value: 'B. Choroba Dekompresyjna (DCS)' },
        {
            type: 'list', items: [
                '<strong>Mechanizm:</strong> Azot rozpuszcza się w tkankach (nasycanie). Przy zbyt szybkim wynurzaniu tworzy pęcherzyki gazu we krwi (efekt szampana).',
                '<strong>Objawy:</strong> Bóle stawów, wysypka, drętwienia, paraliż, duszność. Mogą wystąpić do 24h po nurkowaniu.',
                '<strong>Zapobieganie:</strong> Przestrzeganie limitów NDL i prędkości wynurzania (max 10 m/min) oraz Przystanek Bezpieczeństwa.'
            ]
        },

        { type: 'header', level: 3, value: '3.3 Hipotermia (Wychłodzenie)' },
        { type: 'paragraph', value: 'Woda przewodzi ciepło 25 razy szybciej niż powietrze.' },
        {
            type: 'list', items: [
                '<strong>Objawy:</strong> Dreszcze, gęsia skórka, zasinienie ust, apatia.',
                '<strong>Postępowanie:</strong> Przerwanie nurkowania przy pierwszych dreszczach. Ogrzanie po wyjściu.'
            ]
        },

        // ROZDZIAŁ 4: RYS HISTORYCZNY
        { type: 'header', level: 2, value: 'ROZDZIAŁ 4: RYS HISTORYCZNY NURKOWANIA' },
        { type: 'paragraph', value: 'Historia podboju głębin to opowieść o dążeniu człowieka do uniezależnienia się od powierzchni i wydłużenia czasu przebywania pod wodą.' },

        { type: 'header', level: 3, value: '4.1 Od starożytności do dzwonów nurkowych' },
        { type: 'paragraph', value: 'Próby penetracji środowiska wodnego sięgają tysięcy lat wstecz. Starożytni nurkowie polegali wyłącznie na pojemności własnych płuc. Z czasem zaczęto eksperymentować z dzwonami nurkowymi (otwarte od dołu naczynia), z którymi powiązany był już Aleksander Wielki (IV w. p.n.e.).' },

        { type: 'header', level: 3, value: '4.2 Era hełmów klasycznych' },
        { type: 'paragraph', value: 'W XIX wieku nastąpił przełom dzięki skafandrom klasycznym ("ciężki sprzęt"). Nurek w miedzianym hełmie otrzymywał powietrze wężem z powierzchni. Zapewniało to nieograniczony czas pracy, ale ograniczało swobodę ruchów ("pępowina").' },

        { type: 'header', level: 3, value: '4.3 Rewolucja Cousteau-Gagnana (1943)' },
        { type: 'paragraph', value: 'Kamieniem milowym był rok <strong>1943</strong>. Jacques-Yves Cousteau i Émile Gagnan skonstruowali <strong>"Aqualung"</strong> - pierwszy bezpieczny, automatyczny automat oddechowy.' },
        { type: 'paragraph', value: 'Urządzenie to redukowało ciśnienie z butli do ciśnienia otoczenia "na żądanie" (w momencie wdechu), dając nurkom pełną autonomię (SCUBA).' },

        { type: 'header', level: 3, value: '4.4 Nurkowanie w Polsce' },
        { type: 'paragraph', value: 'W Polsce rozwój nurkowania swobodnego ruszył w latach 50. XX wieku. Kluczowy był rok <strong>1956</strong>: powstanie Komisji Turystyki Podwodnej PTTK (dziś KDP) i pierwszych klubów (Warszawski Klub Płetwonurków, "Akwanauta" Poznań). KDP PTTK jest częścią światowej federacji CMAS.' },

        // ROZDZIAŁ 5: ŚRODOWISKO WODNE
        { type: 'header', level: 2, value: 'ROZDZIAŁ 5: ŚRODOWISKO WODNE' },
        { type: 'paragraph', value: 'Zrozumienie fizyki i biologii zbiorników wodnych (zwłaszcza jezior) jest kluczowe dla bezpieczeństwa.' },

        { type: 'header', level: 3, value: '5.1 Charakterystyka wód jeziornych' },
        { type: 'paragraph', value: 'Woda ma największą gęstość w +4°C. Wyróżniamy okresy cyrkulacji (wiosna/jesień - mieszanie wód) oraz stagnacji (lato/zima - warstwowanie).' },

        { type: 'header', level: 3, value: '5.2 Stratyfikacja termiczna latem' },
        {
            type: 'list', ordered: true, items: [
                '<strong>Epilimnion</strong>: Górna, ciepła, natleniona warstwa.',
                '<strong>Metalimnion (Termoklina)</strong>: Warstwa przejściowa z gwałtownym spadkiem temperatury.',
                '<strong>Hypolimnion</strong>: Najgłębsza, zimna (~4°C), ciemna warstwa bez tlenu.'
            ]
        },

        { type: 'header', level: 3, value: '5.3 Termoklina w praktyce' },
        {
            type: 'list', items: [
                '<strong>Szok termiczny:</strong> Nagła zmiana temperatury (np. z 20°C na 6°C).',
                '<strong>Zjawiska optyczne:</strong> "Rozmycie" obrazu na granicy warstw gęstości.',
                '<strong>Zmiana pływalności:</strong> Zimna woda jest gęstsza - może "wyrzucać" nurka w górę.'
            ]
        },

        { type: 'header', level: 3, value: '5.5 Ruchy wody' },
        { type: 'paragraph', value: '<strong>Falowanie:</strong> Utrudnia wejście/wyjście. <strong>Prądy:</strong> Zawsze rozpoczynaj nurkowanie "pod prąd", aby wracać z prądem.' },

        // ROZDZIAŁ 6: SPRZĘT SCUBA
        { type: 'header', level: 2, value: 'ROZDZIAŁ 6: SPRZĘT SCUBA' },
        { type: 'paragraph', value: 'SCUBA = Self Contained Underwater Breathing Apparatus.' },

        { type: 'header', level: 3, value: '6.1 Butla Nurkowa' },
        { type: 'paragraph', value: 'Butle stalowe (ujemna pływalność) lub aluminiowe. Standardowe ciśnienie to 200 bar. 12L * 200 bar = ~2400 litrów gazu. Zawór posiada rurkę (standpipe) chroniącą przed zanieczyszczeniami.' },

        { type: 'header', level: 3, value: '6.2 Automat Oddechowy' },
        {
            type: 'list', items: [
                '<strong>I stopień:</strong> Redukuje wysokie ciśnienie butli do ciśnienia średniego (~9-10 bar nad otoczenie).',
                '<strong>II stopień (główny):</strong> Podaje powietrze "na żądanie" (ciśnienie otoczenia). Posiada przycisk by-pass.',
                '<strong>Octopus (alternatywny):</strong> Żółty, zapasowy II stopień dla partnera.'
            ]
        },

        { type: 'header', level: 3, value: '6.3 BCD (Jacket)' },
        { type: 'paragraph', value: 'Służy do: utrzymania butli, kontroli pływalności pod wodą (neutralna) i na powierzchni (dodatnia). Elementy: Inflator, zawory nadmiarowe (spłuczki).' },

        // ROZDZIAŁ 7: TECHNIKA I BEZPIECZEŃSTWO
        { type: 'header', level: 2, value: 'ROZDZIAŁ 7: TECHNIKA I BEZPIECZEŃSTWO' },

        { type: 'header', level: 3, value: '7.1 System Partnerski' },
        { type: 'paragraph', value: 'Nigdy nie nurkuj sam. Procedura BWRAF przed wejściem: BCD, Weight (Balast), Releases (Klamry), Air (Powietrze), Final Check.' },

        { type: 'header', level: 3, value: '7.2 Kontrola Pływalności' },
        { type: 'paragraph', value: 'Cel: Pływalność neutralna. Prawidłowe wyważenie: na powierzchni z pustym BCD i na wdechu - poziom oczu. Pod wodą kompensuj utratę wyporności skafandra dodając powietrza.' },

        { type: 'header', level: 3, value: '7.3 Procedury' },
        {
            type: 'list', items: [
                '<strong>Wynurzanie:</strong> Max 9-10 m/min. Ręka nad głową, wypuszczaj powietrze z BCD, nigdy nie wstrzymuj oddechu.',
                '<strong>Przystanek Bezpieczeństwa:</strong> 5 metrów na 3-5 minut (dla nurkowań >10m).'
            ]
        },

        { type: 'header', level: 3, value: '7.4 Znaki nurkowe' },
        { type: 'paragraph', value: 'Kluczowe znaki: OK (kółko), Góra/Dół (kciuki), Stop (dłoń), Problem (wahadło), Brak Powietrza (podcięcie gardła).' },

        // ROZDZIAŁ 8: PLANOWANIE
        { type: 'header', level: 2, value: 'ROZDZIAŁ 8: PLANOWANIE' },

        { type: 'header', level: 3, value: '8.1 Tabele i Komputery' },
        { type: 'paragraph', value: 'Limit bezdekompresyjny (NDL) to czas, po którym możesz wynurzyć się bezpośrednio na powierzchnię. Komputer nurkowy liczy NDL w oparciu o profil rzeczywisty (nie prostokątny).' },
        { type: 'info-box', style: 'warning', content: '<strong>Złota zasada:</strong> Każdy nurek ma własny komputer. Nie wolno go wyłączać między nurkowaniami ani pożyczać innej osobie przed upływem 24h.' },

        // ROZDZIAŁ 9: PROCEDURY AWARYJNE
        { type: 'header', level: 2, value: 'ROZDZIAŁ 9: PROCEDURY AWARYJNE' },
        {
            type: 'list', items: [
                '<strong>Zagubienie:</strong> Szukaj 1 min. Jeśli brak - wynurz się. Spotkanie na powierzchni.',
                '<strong>Brak powietrza:</strong> Znak partnerowi, weź Octopus. Jeśli sam - awaryjne wynurzenie kontrolowane (mówiąc "aaaa").',
                '<strong>Zaplątanie:</strong> Stop -> Cofnij się -> Nóż (w ostateczności).'
            ]
        },

        // ROZDZIAŁ 10: RATOWNICTWO
        { type: 'header', level: 2, value: 'ROZDZIAŁ 10: RATOWNICTWO' },
        {
            type: 'list', items: [
                '<strong>Zmęczony nurek:</strong> Priorytet: napompuj BCD (pływalność!).',
                '<strong>BLS (Topielec):</strong> 5 oddechów ratowniczych na początek, potem 30:2.',
                '<strong>DCS:</strong> Podaj 100% tlen.'
            ]
        }
    ],
    quiz: [
        {
            question: "Kto i w którym roku wynalazł w pełni automatyczny 'Aqualung'?",
            options: [
                "Aleksander Wielki w 332 p.n.e.",
                "Jacques Cousteau i Émile Gagnan w 1943 roku.",
                "Komisja Działalności Podwodnej w 1956 roku.",
                "NASA w 1969 roku."
            ],
            correctAnswer: 1,
            explanation: "Cousteau i Gagnan zrewolucjonizowali nurkowanie w 1943 roku, tworząc automat 'na żądanie'."
        },
        {
            question: "Jaka jest maksymalna bezpieczna prędkość wynurzania?",
            options: [
                "18 metrów na minutę.",
                "30 metrów na minutę.",
                "9-10 metrów na minutę.",
                "Tak szybko, jak pozwalają płetwy."
            ],
            correctAnswer: 2,
            explanation: "9-10 m/min to standardowa bezpieczna prędkość, aby uniknąć choroby dekompresyjnej."
        },
        {
            question: "Co to jest termoklina w jeziorze?",
            options: [
                "Warstwa przy dnie, gdzie woda jest najcieplejsza.",
                "Strefa przejściowa, gdzie następuje gwałtowny spadek temperatury wody.",
                "Roślina wodna występująca w litoralu.",
                "Miejsce żerowania ryb drapieżnych."
            ],
            correctAnswer: 1,
            explanation: "Termoklina (Metalimnion) to warstwa skokowa, oddzielająca ciepłą wodę powierzchniową od zimnej głębinowej."
        },
        {
            question: "Jaka procedura obowiązuje w przypadku zagubienia partnera pod wodą?",
            options: [
                "Szukaj aż do skutku, nawet do wyczerpania powietrza.",
                "Szukaj przez 1 minutę, jeśli nie znajdziesz - wynurz się bezpiecznie na powierzchnię.",
                "Zostań w miejscu i czekaj, aż ktoś po Ciebie przypłynie.",
                "Płyń natychmiast do brzegu pod wodą."
            ],
            correctAnswer: 1,
            explanation: "Standardowa procedura to: rozglądanie się przez 1 minutę, a następnie wynurzenie i spotkanie na powierzchni."
        },
        {
            question: "Co robi I stopień automatu oddechowego?",
            options: [
                "Dostarcza powietrze bezpośrednio do ust nurka.",
                "Redukuje wysokie ciśnienie z butli do ciśnienia średniego.",
                "Mierzy głębokość nurkowania.",
                "Służy jako zapasowe źródło powietrza."
            ],
            correctAnswer: 1,
            explanation: "I stopień (przykręcany do butli) redukuje ciśnienie butlowe (np. 200 bar) do ciśnienia średniego (LP)."
        },
        {
            question: "Dlaczego nie wolno wstrzymywać oddechu podczas wynurzania?",
            options: [
                "Bo można się udusić.",
                "Grozi to urazem ciśnieniowym płuc (pęknięciem pęcherzyków) na skutek rozprężania się powietrza.",
                "Bo automat przestanie działać.",
                "Jest to dozwolone, jeśli płynie się szybko."
            ],
            correctAnswer: 1,
            explanation: "Powietrze w płucach rozpręża się przy wynurzaniu (prawo Boyle'a). Zatrzymanie oddechu może rozerwać płuca."
        },
        {
            question: "Jaki gaz należy podać nurkowi z podejrzeniem choroby dekompresyjnej?",
            options: [
                "Czyste powietrze.",
                "Mieszankę Heliox.",
                "100% Tlen.",
                "Dwutlenek węgla."
            ],
            correctAnswer: 2,
            explanation: "100% tlen przyspiesza eliminację azotu i dotlenia tkanki. Jest standardem w pierwszej pomocy nurkowej."
        },
        {
            question: "Co oznacza skrót SCUBA?",
            options: [
                "System Całkowitego Unikania Bezpiecznej Asekuracji.",
                "Self Contained Underwater Breathing Apparatus (Autonomiczny Podwodny Aparat Oddechowy).",
                "Super Cool Underwater Big Adventure.",
                "System Ciśnieniowy Ułatwiający Bardzo Aktywność."
            ],
            correctAnswer: 1,
            explanation: "SCUBA to międzynarodowy akronim określający sprzęt nurkowy."
        },
        {
            question: "Jak należy rozpocząć nurkowanie, jeśli w akwenie występuje prąd?",
            options: [
                "Z prądem, żeby było lżej.",
                "Pod prąd, aby powrót był łatwiejszy (z prądem).",
                "W poprzek prądu.",
                "Kierunek nie ma znaczenia."
            ],
            correctAnswer: 1,
            explanation: "Zawsze zaczynamy pod prąd, gdy mamy dużo sił i powietrza. Powrót z prądem jest bezpieczniejszy."
        },
        {
            question: "Co należy zrobić, jeśli komputer nurkowy ulegnie awarii w trakcie nurkowania?",
            options: [
                "Nurkować dalej, trzymając się blisko partnera.",
                "Natychmiast przerwać nurkowanie, wykonać przystanek bezpieczeństwa i wynurzyć się.",
                "Przełączyć się na tryb 'gauge'.",
                "Użyć tabel pod wodą."
            ],
            correctAnswer: 1,
            explanation: "Awaria komputera oznacza utratę kontroli nad dekompresją. Należy bezpiecznie zakończyć nurkowanie."
        }
    ]
};
