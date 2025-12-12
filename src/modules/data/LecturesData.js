export const lecturesData = [
    {
        id: 'barotrauma',
        title: 'Barotrauma',
        description: 'Urazy ciśnieniowe. Fizyka, rodzaje, profilaktyka i pierwsza pomoc.',
        content: `<h2>BAROTRAUMA (Uraz Ciśnieniowy): Pełny Przewodnik dla Początkujących Nurków</h2>
            <p>Barotrauma to uszkodzenie tkanek, które wynika z nadmiernej różnicy ciśnień między przestrzenią gazową w ciele a ciśnieniem otoczenia. Zrozumienie tego zjawiska jest fundamentalne, ponieważ woda nie jest naturalnym środowiskiem człowieka.</p>
            <h3>1. Fizyczne Podstawy Barotraumy: Prawo Boyle’a-Mariotte’a</h3>
            <p>Wszystkie urazy ciśnieniowe są ściśle związane z Prawem Boyle’a-Mariotte’a. Prawo to opisuje zachowanie gazu w stałej temperaturze (przemiana izotermiczna).</p>
            <p>Prawo Boyle’a-Mariotte’a głosi, że objętość danej masy gazu (V) jest odwrotnie proporcjonalna do jego ciśnienia bezwzględnego (p) [p<sub>1</sub>V<sub>1</sub> = p<sub>2</sub>V<sub>2</sub>].</p>
            <ul>
                <li><strong>Ciśnienie Bezwzględne (Absolutne):</strong> W nurkowaniu do obliczeń stosuje się ciśnienie bezwzględne (p), które jest sumą ciśnienia atmosferycznego (p<sub>0</sub>, czyli 1 bar na powierzchni) i ciśnienia hydrostatycznego (ciśnienia słupa wody).</li>
                <li><strong>Wpływ Głębokości:</strong> Ciśnienie w wodzie wzrasta o około 1 bar na każde 10 metrów głębokości.</li>
                <li><strong>Nieliniowa Zmiana Objętości:</strong> Największa zmiana objętości gazu w stosunku do głębokości (aż o 100%) następuje w płytkiej wodzie, między 0 a 10 metrów.</li>
            </ul>
            <h4>Fazy Powstawania Barotraumy:</h4>
            <ol>
                <li><strong>Podczas Zanurzania (Kompresja):</strong> Wraz ze wzrostem ciśnienia zewnętrznego, objętość gazu w zamkniętych przestrzeniach ciała maleje. Jeśli ciśnienie nie jest wyrównane, powstaje siła ssąca, która uszkadza tkanki.</li>
                <li><strong>Podczas Wynurzania (Rozprężanie):</strong> Wraz ze spadkiem ciśnienia zewnętrznego, objętość gazu w zamkniętych lub częściowo zamkniętych przestrzeniach (np. płucach) rośnie. Jeśli uwięziony gaz nie ma ujścia, rozpręża się i wywołuje siłę napierającą/rozrywającą.</li>
            </ol>
            <hr>
            <h3>2. Rodzaje Barotraumy i Mechanizmy Uszkodzeń</h3>
            <p>Barotrauma dotyczy wszystkich przestrzeni wypełnionych gazem, które są zamknięte lub mają ograniczoną drożność.</p>
            <h4>A. Urazy Związane głównie z Zanurzaniem (Kompresja)</h4>
            <p>Te urazy wynikają z braku dodania powietrza do przestrzeni gazowych, aby zrównoważyć wzrost ciśnienia otoczenia.</p>
            <h5>Uraz Ciśnieniowy Ucha Środkowego (UCU):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Jest to najczęstszy uraz nurkowy. Ucho środkowe jest jamą gazową połączoną z gardłem trąbką Eustachiusza. Wzrastające ciśnienie odkształca błonę bębenkową do wewnątrz. Jeśli ciśnienie nie jest wyrównane, następuje bolesny efekt ssący w uchu środkowym. W skrajnych przypadkach błona bębenkowa może pęknąć.</li>
                <li><strong>Objawy:</strong> Narastający ucisk, przechodzący w kłujący ból. Nagłe ustąpienie kłującego bólu i dotkliwy ból spowodowany zalaniem ucha środkowego zimną i zanieczyszczoną wodą, nudności, wymioty oraz utrata orientacji w przestrzeni.</li>
            </ul>
            <h5>Uraz Ciśnieniowy Zatok:</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Uraz następuje, gdy ujścia zatok są niedrożne (np. z powodu kataru, zapalenia zatok, polipów). Siła ssąca powoduje wysięk krwi z nabłonka do zamkniętej części zatoki.</li>
                <li><strong>Objawy:</strong> Uczucie pełności i silny ból w okolicy niedrożnej zatoki. Ból głowy, który może promieniować do oczodołu lub ucha.</li>
            </ul>
            <h5>Uraz Ciśnieniowy Maski (Oczu i Twarzy):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Maska jest przestrzenią gazową. Brak wyrównania ciśnienia w masce podczas zanurzania powoduje, że wzrastające ciśnienie wywołuje siłę ssącą na twarz i oczy.</li>
                <li><strong>Skutki:</strong> Pękanie drobnych naczyń krwionośnych skóry twarzy, gałek ocznych i nosa. Silne krwawienie do wnętrza gałek ocznych może doprowadzić do uszkodzenia wzroku.</li>
            </ul>
            <h5>Uraz Ciśnieniowy Zęba (Barodontalgia):</h5>
            <ul>
                <li><strong>Mechanizm (zanurzanie):</strong> Rzadkie zjawisko związane z małymi komorami powietrznymi uwięzionymi pod nieprawidłowo założonymi plombami lub koronkami. Kompresja uwięzionego powietrza może prowadzić do silnego bólu zęba (barodontalgia).</li>
            </ul>
            <h4>B. Urazy Związane głównie z Wynurzaniem (Rozprężanie)</h4>
            <p>Urazy te są wynikiem rozprężania się gazu zgodnie z Prawem Boyle’a-Mariotte’a, gdy maleje ciśnienie otoczenia.</p>
            <h5>Uraz Ciśnieniowy Płuc (UCP):</h5>
            <ul>
                <li><strong>Najgroźniejszy uraz:</strong> UCP jest najgroźniejszy dla zdrowia i życia spośród wszystkich urazów nurkowych.</li>
                <li><strong>Przyczyna:</strong> Powietrze zostaje całkowicie lub częściowo uwięzione w płucach podczas wynurzania się z aparatem oddechowym. Najczęstszą przyczyną jest wstrzymanie oddechu podczas wynurzania. UCP może wystąpić już przy wynurzeniu bez wydychania po pełnym wdechu z głębokości zaledwie 1 metra.</li>
                <li><strong>Mechanizm Uszkodzenia:</strong> Rozprężające się powietrze mechanicznie uszkadza pęcherzyki płucne. Może to prowadzić do:
                    <ul>
                        <li>Tętniczych Zatorów Gazowych (AGE): Pęcherzyki powietrza dostają się do układu naczyniowego.</li>
                        <li>Odmy Opłucnowej: Powietrze dostaje się do jamy opłucnowej.</li>
                        <li>Odmy Śródpiersiowej/Podskórnej: Powietrze dostaje się do śródpiersia lub pod skórę szyi.</li>
                    </ul>
                </li>
                <li><strong>Objawy AGE w Mózgu:</strong> Utrata przytomności (często w ciągu 4-6 minut po wynurzeniu), ból głowy, drgawki, porażenie mięśni i paraliż, zaburzenia czuciowe (mrowienie, drętwienie) oraz zaburzenia zmysłów (mowy, słuchu, wzroku, równowagi).</li>
            </ul>
            <h5>Uraz Ciśnieniowy Zatok (Rozprężny):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Uwięzione powietrze rozpręża się podczas wynurzania, powodując wzrost ciśnienia na ściany zatoki. Ból ustępuje, gdy powietrze pokonuje opór zamkniętego ujścia.</li>
                <li><strong>Objawy:</strong> Silny ból w okolicy zamkniętej części zatoki i możliwe wyrzucenie z nosa krwi, wydzieliny i powietrza.</li>
            </ul>
            <h5>Uraz Ciśnieniowy Przewodu Pokarmowego:</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Gaz uwięziony w żołądku lub jelitach (np. z połkniętego powietrza, napojów gazowanych) rozpręża się podczas wynurzania.</li>
                <li><strong>Skutki:</strong> Ucisk na żołądek, cofanie się treści żołądka do przełyku i odbijanie.</li>
            </ul>
            <h5>Uraz Ciśnieniowy Zęba (Rozprężny):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Trudność z wydostaniem się rozprężającego powietrza z komory pod plombą lub koroną.</li>
                <li><strong>Skutki:</strong> Może dojść do odwarstwienia plomby, poluzowania koronki lub pęknięcia zęba.</li>
            </ul>
            <hr>
            <h3>3. Profilaktyka Barotraumy</h3>
            <p>Prawidłowa technika i dbałość o sprzęt są kluczowe dla uniknięcia urazów.</p>
            <h4>Zapobieganie Urazom podczas Zanurzania (Ucho, Zatoki, Maska):</h4>
            <ul>
                <li><strong>Ucho i Zatoki:</strong>
                    <ul>
                        <li>Wyrównuj ciśnienie często i delikatnie podczas zanurzania, szczególnie w płytkim zakresie głębokości.</li>
                        <li>Stosuj metody takie jak próba Valsalvy, manewr Toynbee'ego lub manewr Frenzela. Próbę Valsalvy wykonuj bez zbędnej siły.</li>
                        <li>Jeśli poczujesz narastający ucisk, zatrzymaj się, zmniejsz głębokość i spróbuj ponownie wyrównać ciśnienie.</li>
                        <li>Nigdy nie nurkuj z katarem lub inną infekcją dróg oddechowych.</li>
                    </ul>
                </li>
                <li><strong>Maska:</strong> Okresowo wdmuchuj powietrze do wnętrza maski przez nos podczas zanurzania.</li>
                <li><strong>Zęby:</strong> Utrzymuj zęby w doskonałym stanie i regularnie odwiedzaj dentystę. W przypadku bólu zęba podczas zanurzania natychmiast zakończ nurkowanie.</li>
            </ul>
            <h4>Zapobieganie UCP i Urazom Rozprężnym:</h4>
            <ul>
                <li><strong>Oddychanie:</strong> W trakcie całego nurkowania oddychaj swobodnie i nigdy nie wstrzymuj oddechu podczas wynurzania.</li>
                <li><strong>Prędkość Wynurzania:</strong> Stosuj prawidłową prędkość wynurzania (zwykle nie większą niż 10 m/min).</li>
                <li><strong>Stan Zdrowia:</strong> Zachowaj co najmniej miesięczną przerwę w nurkowaniu po przebytych chorobach układu oddechowego, takich jak zapalenie oskrzeli lub płuc.</li>
                <li><strong>Przewód Pokarmowy:</strong> Unikaj spożywania pokarmów gazotwórczych i napojów gazowanych przed nurkowaniem.</li>
                <li><strong>Aparatura:</strong> Utrzymuj dobry stan techniczny sprzętu nurkowego, w tym automatów.</li>
                <li><strong>Utrzymanie Czystości:</strong> Dbałość o czystość uszu jest również ważna.</li>
            </ul>
            <hr>
            <h3>4. Postępowanie w Sytuacjach Awaryjnych (Pierwsza Pomoc)</h3>
            <p>W przypadku podejrzenia poważnego urazu ciśnieniowego (UCP, zator gazowy) kluczowa jest szybkość działania, ponieważ skuteczność leczenia zależy głównie od szybkości podjęcia leczenia w komorze dekompresyjnej.</p>
            <ul>
                <li><strong>Ocena Sytuacji:</strong> Jeśli masz wątpliwości, czy objawy wskazują na UCP, potraktuj je, jakby nimi były.</li>
                <li><strong>Pomoc Medyczna:</strong> Wezwij pomoc medyczną i powiadom służby o konieczności transportu poszkodowanego do komory dekompresyjnej.</li>
                <li><strong>Tlenoterapia:</strong> Podaj poszkodowanemu 100% tlen w maksymalnym przepływie tak szybko, jak to możliwe. Tlen jest najważniejszym lekarstwem, ponieważ poprawia utlenowanie tkanek, redukuje możliwość powstawania nowych zatorów i zmniejsza średnicę pęcherzyków gazowych.</li>
                <li><strong>Pozycja:</strong> Ułóż poszkodowanego w pozycji poziomej.</li>
                <li><strong>Nawadnianie:</strong> Jeśli poszkodowany jest przytomny, podaj mu do 1 litra ciepłych, słodkich, niegazowanych napojów.</li>
                <li><strong>Resuscytacja:</strong> Jeśli jest to konieczne, wykonaj podstawowe zabiegi resuscytacyjne (BLS).</li>
            </ul>`,
        quiz: [
            {
                question: "Co jest najczęstszą i najgroźniejszą przyczyną Urazu Ciśnieniowego Płuc (UCP)?",
                options: [
                    "Zbyt szybkie zanurzanie",
                    "Wstrzymanie oddechu podczas wynurzania",
                    "Brak przystanku bezpieczeństwa",
                    "Nurkowanie na głębokim wdechu"
                ],
                correctAnswer: 1,
                explanation: "Wstrzymanie oddechu podczas wynurzania powoduje rozprężanie się powietrza w płucach, co prowadzi do ich rozerwania (zgodnie z prawem Boyle'a)."
            },
            {
                question: "W jakim zakresie głębokości następuje największa zmiana objętości gazu?",
                options: [
                    "0 - 10 metrów",
                    "10 - 20 metrów",
                    "30 - 40 metrów",
                    "Zmiana jest stała na każdej głębokości"
                ],
                correctAnswer: 0,
                explanation: "W zakresie 0-10m ciśnienie zmienia się z 1 na 2 bary, co powoduje dwukrotną zmianę objętości (największą procentowo)."
            },
            {
                question: "Jaka jest pierwsza czynność w przypadku podejrzenia Tętniczego Zatoru Gazowego (AGE)?",
                options: [
                    "Ponowne zanurzenie poszkodowanego (rekompresja w wodzie)",
                    "Podanie dużej ilości płynów",
                    "Podanie 100% tlenu i wezwanie pomocy medycznej",
                    "Położenie poszkodowanego w pozycji siedzącej"
                ],
                correctAnswer: 2,
                explanation: "Tlen 100% pomaga zmniejszyć pęcherzyki gazu i dotlenić tkanki. Natychmiastowy transport do komory jest kluczowy."
            },
            {
                question: "Jakie prawo fizyczne rządzi urazami ciśnieniowymi (Barotrauma)?",
                options: [
                    "Prawo Daltona",
                    "Prawo Henry'ego",
                    "Prawo Boyle'a-Mariotte'a",
                    "Prawo Archimedesa"
                ],
                correctAnswer: 2,
                explanation: "Prawo Boyle'a-Mariotte'a mówi, że objętość gazu jest odwrotnie proporcjonalna do ciśnienia. Największe zmiany objętości występują na płytkich głębokościach."
            },
            {
                question: "Którą z poniższych metod należy stosować do wyrównywania ciśnienia w uszach podczas zanurzania?",
                options: [
                    "Metoda Valsalvy (dmuchanie z zamkniętym nosem)",
                    "Połknięcie (manewr Toynbee'ego)",
                    "Ruch szczęką (manewr Frenzela)",
                    "Wszystkie powyższe"
                ],
                correctAnswer: 3,
                explanation: "Wszystkie te metody są skuteczne. Najważniejsze to wyrównywać ciśnienie często, delikatnie i zanim poczujesz dyskomfort."
            },
            {
                question: "Co należy zrobić, gdy podczas zanurzania nie możesz wyrównać ciśnienia w uszach?",
                options: [
                    "Kontynuować zanurzanie i próbować silniej",
                    "Zatrzymać się, wynurzyć o 1-2m i spróbować ponownie delikatnie",
                    "Ignorować dyskomfort i nurkować dalej",
                    "Wstrzymać oddech i czekać"
                ],
                correctAnswer: 1,
                explanation: "Nigdy nie forsuj wyrównywania. Zatrzymaj się, wynurz lekko i spróbuj ponownie. Przy uporczywych problemach przerwij nurkowanie."
            },
            {
                question: "Barotrauma maski objawia się:",
                options: [
                    "Bólem głowy",
                    "Przekrwionymi oczami i podbiegnięciami krwawymi (petech) na twarzy",
                    "Bólem w stawach",
                    "Zawrotami głowy"
                ],
                correctAnswer: 1,
                explanation: "Podciśnienie w masce podczas zanurzania powoduje wciąganie tkanek twarzy i może prowadzić do pęknięcia drobnych naczyń krwionośnych."
            },
            {
                question: "Dlaczego nie wolno nurkować z katarem lub infekcją górnych dróg oddechowych?",
                options: [
                    "Bo można zarazić inne osoby",
                    "Bo jest to niekomfortowe",
                    "Bo utrudnia to wyrównywanie ciśnienia i zwiększa ryzyko barotraumy",
                    "Bo obniża to SAC"
                ],
                correctAnswer: 2,
                explanation: "Opuchnięta błona śluzowa i zatoki blokują kanały łączące ucho środkowe z gardłem (trąbka Eustachiusza), uniemożliwiając wyrównywanie ciśnienia."
            },
            {
                question: "Jaka jest maksymalna różnica ciśnienia, jaką płuca mogą wytrzymać przed rozerwaniem?",
                options: [
                    "0.02 bara (20 mm Hg)",
                    "0.12 bara (50-90 mm Hg)",
                    "1 bar",
                    "2 bary"
                ],
                correctAnswer: 1,
                explanation: "Płuca są bardzo delikatne - nadciśnienie zaledwie 0.12 bara może spowodować ich rozerwanie, dlatego NIGDY nie wstrzymuj oddechu podczas wynurzania."
            },
            {
                question: "Które z poniższych zwiększa ryzyko barotraumy płuc?",
                options: [
                    "Astma, przewlekłe zapalenie oskrzeli",
                    "Palenie tytoniu",
                    "Nurkowanie tuż po chorobie układu oddechowego",
                    "Wszystkie powyższe"
                ],
                correctAnswer: 3,
                explanation: "Wszystkie te czynniki mogą prowadzić do uwięzienia powietrza w płucach (air trapping) i zwiększać ryzyko UCP podczas wynurzania."
            }
        ]
    },
    {
        id: 'dcs',
        title: 'Choroba Dekompresyjna',
        description: 'Mechanizm DCS, objawy, czynniki ryzyka i pierwsza pomoc w wypadku.',
        content: `<h2>Choroba Dekompresyjna (DCS): Cicha Pułapka Azotu</h2>
            <p>Choroba dekompresyjna (ang. Decompression Sickness – DCS), potocznie zwana chorobą kesonową, jest zespołem schorzeń i objawów wywołanych przez azot wydzielający się z tkanek do krwi nurka w sposób niekontrolowany, głównie w formie pęcherzyków gazowych. Jest to jedno z najpoważniejszych schorzeń, zagrażających zdrowiu i życiu płetwonurków.</p>
            <h3>1. Fizyczne Podstawy DCS: Prawo Henry’ego</h3>
            <p>DCS jest bezpośrednim wynikiem procesów absorpcji i eliminacji azotu, które są opisywane przez Prawo Henry’ego.</p>
            <h4>Prawo Henry’ego:</h4>
            <ul>
                <li>Mówi, że ilość gazu, która rozpuści się w cieczy (w tym w płynach ustrojowych i tkankach ciała), jest wprost proporcjonalna do ciśnienia parcjalnego tego gazu.</li>
                <li>Objętość gazu rozpuszczonego w cieczy rośnie wraz ze wzrostem ciśnienia.</li>
            </ul>
            <h4>Jak Prawo Henry’ego działa podczas nurkowania?</h4>
            <ol>
                <li><strong>Zanurzanie (Saturacja):</strong> Powietrze, którym oddychamy, składa się głównie z azotu (ponad 78%). Podczas zanurzania, ciśnienie absolutne wzrasta, a automat podaje powietrze pod ciśnieniem równym ciśnieniu na danej głębokości. Zgodnie z Prawem Henry'ego, azot z powietrza oddechowego zaczyna dyfundować (przenikać) do krwi i tkanek, nasycając je. Ilość rozpuszczonego azotu zależy od czasu i głębokości nurkowania (czyli od wyższego ciśnienia powietrza oddechowego).</li>
                <li><strong>Wynurzanie (Desaturacja):</strong> W miarę wynurzania ciśnienie zewnętrzne spada. Następuje proces odwrotny – odsycanie tkanek z azotu. Azot dyfunduje z tkanek do krwi, a następnie jest usuwany w płucach z każdym wydechem.</li>
                <li><strong>Ryzyko DCS (Tworzenie Pęcherzyków):</strong> Ciało nurka toleruje określony poziom przesycenia, ale jeśli różnica prężności (gradient) staje się zbyt duża (np. z powodu zbyt szybkiego wynurzania), azot może się uwolnić z roztworu i przejść w formę gazową (pęcherzyków) w tkankach i krwioobiegu. To właśnie te zatory gazowe, powstałe pierwotnie z pęcherzyków azotu, są bezpośrednią przyczyną choroby ciśnieniowej (DCS).</li>
            </ol>
            <h3>2. Klasyfikacja i Objawy Choroby Dekompresyjnej</h3>
            <p>Najprostsza klasyfikacja dzieli DCS na dwa główne typy:</p>
            <h4>Typ I – Postać Lekka (DCS I)</h4>
            <p>Związana z pęcherzykami azotu w tkankach obwodowych (pozanaczyniowo).</p>
            <ul>
                <li><strong>Bóle stawowo-mięśniowe (ang. Bends):</strong> Bóle mięśniowe w okolicach dużych stawów (barkowego, kolanowego, skokowego) – początkowo słabe, a następnie ostre i pulsujące. Nazwa Bends pochodzi od obserwacji poruszania się (tzw. "krzywika") osób dotkniętych silnymi bólami stawowo-kostnymi.</li>
                <li><strong>Objawy skórne:</strong> Swędzenie skóry kończyn, często połączone z jej zaczerwienieniem lub marmurkowatością (białe, sine i czerwone plamy połączone z opuchlizną). Postać skórna jest szczególnie niebezpieczna.</li>
                <li><strong>Ogólne:</strong> Ogólne zmęczenie i senność, osłabienie (jak przy grypie).</li>
            </ul>
            <h4>Typ II – Postać Ciężka (DCS II)</h4>
            <p>Związana z pęcherzykami azotu we krwi (w naczyniach). Objawy neurologiczne są identyczne jak w przypadku tętniczych zatorów gazowych (AGE) w przebiegu urazu ciśnieniowego płuc (UCP).</p>
            <ul>
                <li><strong>Objawy neurologiczne:</strong>
                    <ul>
                        <li>Utrata przytomności.</li>
                        <li>Ból głowy, drgawki.</li>
                        <li>Porażenie mięśni i paraliż (np. od pasa w dół).</li>
                        <li>Zaburzenia czuciowe (mrowienie lub drętwienie).</li>
                        <li>Zaburzenia zmysłów mowy, słuchu, wzroku, równowagi (np. zawroty głowy, dzwonienie w uszach).</li>
                        <li>Zmiany stanu psychicznego (splątanie, dezorientacja).</li>
                    </ul>
                </li>
                <li><strong>Objawy płucno-krążeniowe:</strong>
                    <ul>
                        <li>Duszność, spłycony i przyspieszony oddech, suchy kaszel, ból w klatce piersiowej (objawy zawału płuc/zablokowania filtra płucnego).</li>
                        <li>Objawy zawału serca (promieniujący ból za mostkiem, zaburzenia rytmu serca, szybkie i słabe tętno, niepokój, panika, zatrzymanie pracy serca).</li>
                    </ul>
                </li>
            </ul>
            <p><strong>Występowanie Objawów:</strong> Objawy DCS najczęściej pojawiają się między 15 minutą a 12 godziną po wynurzeniu, ale w ciężkich przypadkach mogą wystąpić szybciej lub, rzadko, nawet do 24–36 godzin po nurkowaniu, szczególnie jeśli po nurkowaniu nastąpił lot samolotem.</p>
            <h3>3. Profilaktyka i Czynniki Ryzyka</h3>
            <p>Ryzyko wystąpienia DCS istnieje, nawet pomimo przestrzegania wszystkich zasad. Profilaktyka polega na minimalizowaniu czynników ryzyka:</p>
            <h4>A. Technika i Planowanie Nurkowania:</h4>
            <ul>
                <li><strong>Prędkość Wynurzania:</strong> Stosuj prawidłową prędkość wynurzania (nie większą niż 10 m/min). Zbyt duża prędkość jest główną przyczyną DCS.</li>
                <li><strong>Czas Nurkowania:</strong> Nurkuj w granicach limitów bezdekompresyjnych (tzw. no-deco limits).</li>
                <li><strong>Przystanki Bezpieczeństwa:</strong> Zawsze wykonuj przystanek bezpieczeństwa (3–5 min na głębokości 3–5 m). Około 40% wypadków DCS to nurkowania bez przystanku bezpieczeństwa.</li>
                <li><strong>Unikaj Profili Ryzykownych:</strong> Unikaj nurkowań o profilu „piłokształtnym” (jo-jo) lub chaotycznym. Nurkowanie rozpoczynaj od zanurzenia na największą planowaną głębokość.</li>
                <li><strong>Nurkowania Powtórzeniowe:</strong> Zachowaj szczególną ostrożność podczas nurkowań wielokrotnych w ciągu dnia lub wielodniowych, ponieważ zwiększają one ryzyko DCS.</li>
                <li><strong>Lot po Nurkowaniu:</strong> Po nurkowaniu należy odczekać co najmniej 24 godziny przed lotem samolotem lub podróżą na wysokość powyżej 500 metrów n.p.m., aby uniknąć zwiększonego ryzyka.</li>
            </ul>
            <h4>B. Czynniki Fizjologiczne Zwiększające Ryzyko:</h4>
            <ul>
                <li>Odwodnienie (niewłaściwy bilans wodny).</li>
                <li>Niska temperatura wody (przechłodzenie).</li>
                <li>Duży wysiłek fizyczny (podczas i po nurkowaniu).</li>
                <li>Otyłość.</li>
                <li>Zła kondycja fizyczna i psychiczna, zmęczenie.</li>
                <li>Alkohol lub tzw. kac.</li>
                <li>Wady serca, np. przetrwały otwór owalny (PFO).</li>
                <li>Gorąca kąpiel/sauna po nurkowaniu.</li>
            </ul>
            <h3>4. Pierwsza Pomoc w Przypadku Podejrzenia DCS</h3>
            <p>Skuteczność leczenia ciężkiej postaci DCS zależy głównie od szybkości podjęcia leczenia w komorze dekompresyjnej.</p>
            <h4>Kroki Pierwszej Pomocy:</h4>
            <ol>
                <li><strong>Ocena i Wezwanie Pomocy:</strong> W przypadku podejrzenia DCS natychmiast wezwij pomoc medyczną (tel. 112 lub 999). Poinformuj, że podejrzewasz wypadek nurkowy i skontaktuj się z zespołem komór dekompresyjnych, np. Krajowy Ośrodek Medycyny Hiperbarycznej w Gdyni (tel. 58 699 86 54 lub 58 622 51 63).</li>
                <li><strong>Tlenoterapia:</strong> Podaj poszkodowanemu 100% tlen w maksymalnym przepływie tak szybko, jak to możliwe.
                    <ul>
                        <li>Tlen poprawia utlenowanie tkanek, redukuje możliwość powstawania nowych zatorów oraz zmniejsza średnicę pęcherzyków gazowych (zarówno azotowych, jak i powietrznych).</li>
                        <li>Poszkodowanego należy zabezpieczyć w tlen podczas transportu.</li>
                    </ul>
                </li>
                <li><strong>Pozycja i Nawadnianie:</strong> Ułóż poszkodowanego w pozycji poziomej. Podaj poszkodowanemu do picia ciepłe, słodkie, niegazowane napoje (jeśli jest przytomny), do 1 litra.</li>
                <li><strong>Resuscytacja:</strong> Jeśli poszkodowany nie oddycha, wykonaj podstawowe zabiegi resuscytacyjne (BLS).</li>
                <li><strong>Transport:</strong> W ciężkim przypadku DCS, transport śmigłowcem jest najszybszym sposobem na dostarczenie nurka do komory dekompresyjnej.</li>
            </ol>
            <hr>
            <p><strong>Podsumowanie:</strong> Choroba dekompresyjna, choć rzadka przy prawidłowym nurkowaniu rekreacyjnym, jest stanem, w którym niekontrolowana eliminacja azotu (zgodnie z Prawem Henry'ego) prowadzi do powstawania pęcherzyków uszkadzających tkanki. Kluczem jest przestrzeganie limitów, kontrola wynurzania i szybka reakcja w przypadku wystąpienia objawów.</p>`,
        quiz: [
            {
                question: "Jakie prawo fizyczne opisuje mechanizm powstawania Choroby Dekompresyjnej (DCS)?",
                options: [
                    "Prawo Archimedesa",
                    "Prawo Boyle'a-Mariotte'a",
                    "Prawo Henry'ego",
                    "Prawo Daltona"
                ],
                correctAnswer: 2,
                explanation: "Prawo Henry'ego mówi o rozpuszczalności gazów w cieczach pod wpływem ciśnienia, co jest istotą nasycania i odsycania tkanek azotem."
            },
            {
                question: "Jaka jest zalecana bezpieczna prędkość wynurzania, aby zminimalizować ryzyko DCS?",
                options: [
                    "18 metrów na minutę",
                    "Maksymalnie 10 metrów na minutę",
                    "Zawsze szybciej niż bąbelki powietrza",
                    "1 metr na sekundę"
                ],
                correctAnswer: 1,
                explanation: "Współczesne standardy zalecają prędkość nie większą niż 9-10 m/min, a w ostatniej fazie (ostatnie 10m) nawet wolniej."
            },
            {
                question: "Kiedy najczęściej pojawiają się objawy DCS?",
                options: [
                    "Natychmiast po wynurzeniu (w ciągu sekund)",
                    "Od 15 minut do 12 godzin po nurkowaniu",
                    "Tylko pod wodą",
                    "Po 48 godzinach"
                ],
                correctAnswer: 1,
                explanation: "Większość objawów DCS pojawia się w ciągu pierwszej godziny, a 98% w ciągu 24h. Natychmiastowe objawy po wynurzeniu częściej sugerują UCP/AGE."
            },
            {
                question: "Co decyduje o ilości azotu absorbowanego podczas nurkowania?",
                options: [
                    "Tylko głębokość",
                    "Tylko czas",
                    "Głębokość, czas i ciśnienie parcjalne azotu",
                    "Temperatura wody"
                ],
                correctAnswer: 2,
                explanation: "Według Prawa Henry'ego, ilość rozpuszczonego azotu zależy od jego ciśnienia parcjalnego (które rośnie z głębokością) i czasu ekspozycji."
            },
            {
                question: "Jaka jest maksymalna zalecana prędkość wynurzania w nurkowaniu rekreacyjnym?",
                options: [
                    "5 m/min",
                    "10 m/min",
                    "15 m/min",
                    "20 m/min"
                ],
                correctAnswer: 1,
                explanation: "Standardowa prędkość wynurzania to nie więcej niż 10 m/min. Wolniejsze wynurzanie (9 m/min lub mniej) dodatkowo zwiększa bezpieczeństwo."
            },
            {
                question: "Czym różni się DCS Typ I od DCS Typ II?",
                options: [
                    "Nie ma różnicy",
                    "Typ I (lekki) - bóle stawów, skóra; Typ II (ciężki) - neurologiczne, płucne",
                    "Typ I występuje przy powietrzu, Typ II przy Nitroksie",
                    "Typ I to Barotrauma, Typ II to DCS"
                ],
                correctAnswer: 1,
                explanation: "DCS Typ I dotyczy tkanek obwodowych (bóle zgięć, skóra). Typ II jest znacznie poważniejszy i obejmuje objawy neurologiczne, płucne lub wielonarządowe."
            },
            {
                question: "Dlaczego przystanek bezpieczeństwa (3-5 min na 5m) jest tak ważny?",
                options: [
                    "Pozwala odpocząć nurkom",
                    "Daje czas na odgazowanie azotu z organizmu",
                    "Jest wymagany prawnie",
                    "Pomaga oszczędzać powietrze"
                ],
                correctAnswer: 1,
                explanation: "Przystanek bezpieczeństwa znacznie redukuje ryzyko DCS, umożliwiając bezpieczne uwolnienie azotu z organizmu. Ok. 40% wypadków DCS to nurkowania bez przystanku."
            },
            {
                question: "Które z poniższych zwiększa ryzyko DCS?",
                options: [
                    "Odwodnienie i alkohol",
                    "Otyłość i brak kondycji",
                    "Nurkowania powtórzeniowe i gorąca kąpiel po nurkowaniu",
                    "Wszystkie powyższe"
                ],
                correctAnswer: 3,
                explanation: "Wszystkie te czynniki zwiększają ryzyko DCS. Dehydracja utrudnia eliminację azotu, tkanka tłuszczowa gromadzi więcej azotu, a ciepło rozszerza naczynia krwionośne."
            },
            {
                question: "Ile czasu należy odczekać przed lotem samolotem po nurkowaniu rekreacyjnym?",
                options: [
                    "2 godziny",
                    "12 godzin",
                    "Co najmniej 18-24 godziny",
                    "1 godzina"
                ],
                correctAnswer: 2,
                explanation: "Zaleca się odczekać minimum 18-24 godziny przed lotem (lub podróżą powyżej 500m n.p.m.), aby zredukować ryzyko DCS spowodowane obniżonym ciśnieniem na wysokości."
            },
            {
                question: "Co oznacza 'bends' (zgięcia) w kontekście DCS?",
                options: [
                    "Wykręcanie stawów przez nurka",
                    "Głębokie bóle stawowe zmuszające do utrzymywania stawu w pozycji zgięcia",
                    "Manewry ratunkowe",
                    "Technika nurkowania"
                ],
                correctAnswer: 1,
                explanation: "'Bends' to klasyczny objaw DCS Typ I - intensywny ból w dużych stawach (kolana, łokcie), który zmusza poszkodowanego do trzymania stawu w pozycji zgięcia dla ulgi."
            }
        ]
    },
    {
        id: 'dalton',
        title: 'Prawo Daltona',
        description: 'Fundament nurkowania Nitroxowego. Definicja, wzory, MOD, EAD i bezpieczeństwo.',
        content: `<h2>Prawo Daltona w Nurkowaniu: Fundament Nurkowania Nitroxowego</h2>
            <p>Prawo Daltona, zwane też Prawem Ciśnień Parcjalnych, jest obok Prawa Boyle'a i Prawa Henry'ego, jednym z czterech podstawowych praw gazowych, które zaawansowany nurek powinien znać. Jest ono absolutnie kluczowe do zrozumienia wpływu poszczególnych gazów na organizm pod wodą, zwłaszcza tlenu i azotu.</p>

            <h3>1. Definicja i Mechanizm Działania</h3>
            <p>Prawo Daltona mówi, że całkowite ciśnienie mieszaniny gazowej jest równe sumie ciśnień parcjalnych wszystkich gazów wchodzących w jej skład.</p>
            <p>Matematycznie można to zapisać jako: P = Pg1 + Pg2 + Pg3 ...</p>

            <h4>Pojęcia kluczowe:</h4>
            <ul>
                <li><strong>Ciśnienie Całkowite (Absolutne) (P lub Pt):</strong> Ciśnienie otoczenia na danej głębokości, wyrażone w atmosferach absolutnych [ATA] lub barach [bar]. Stanowi sumę ciśnienia atmosferycznego (1 bar) i ciśnienia hydrostatycznego (ciśnienia słupa wody).</li>
                <li><strong>Frakcja Gazu (Fg):</strong> Procentowa zawartość danego gazu w mieszaninie, wyrażona jako ułamek dziesiętny (np. 32% tlenu to frakcja 0,32). Frakcja gazu jest stała podczas całego nurkowania.</li>
                <li><strong>Ciśnienie Parcjalne Gazu (Pg lub Pp):</strong> Ciśnienie, jakie wywiera dany gaz w mieszaninie. Wartość ta zmienia się w zależności od głębokości.</li>
            </ul>

            <div class="formula-box">
                <p class="formula">Pg = P × Fg</p>
                <p>(Ciśnienie Parcjalne = Ciśnienie Całkowite Absolutne × Frakcja Gazu)</p>
            </div>

            <p>Podczas zanurzania, gdy ciśnienie absolutne (P) rośnie, indywidualne ciśnienia parcjalne gazów składowych (np. azotu i tlenu) również wzrastają, i to dokładnie tak samo, jak wzrasta ciśnienie absolutne.</p>

            <hr>

            <h3>2. Zastosowanie Prawa Daltona w Nurkowaniu</h3>
            <p>Ciśnienie parcjalne (a nie procentowa zawartość) gazu jest kluczowe, ponieważ to ono decyduje o fizjologicznym wpływie gazu na organizmy żywe.</p>

            <h4>A. Toksyczność Tlenowa (Limit Bezpieczeństwa)</h4>
            <p>W nurkowaniu z powietrzem lub Nitroksem, tlen jest niezbędny do życia, ale jego nadmiar nie jest bezpieczny. Zbyt wysokie ciśnienie parcjalne tlenu (PO2) stwarza ryzyko wystąpienia Toksyczności Tlenowej dla Centralnego Układu Nerwowego (CNS Toxicity).</p>
            <ul>
                <li><strong>Limit Rekreacyjny:</strong> Maksymalne zalecane ciśnienie parcjalne tlenu (PO2) podczas nurkowań rekreacyjnych (Nitrox do 40% O2) wynosi 1,4 bar (lub ATA).</li>
                <li><strong>Limit Absolutny:</strong> Absolutnie nieprzekraczalny limit (PO2) to 1,6 bar (lub ATA), stosowany w procedurach dekompresyjnych.</li>
            </ul>
            <p>Dzięki Prawu Daltona, nurek może obliczyć, jaką głębokość może osiągnąć, zanim przekroczy bezpieczny limit tlenu (MOD).</p>

            <h4>B. Obliczanie Maksymalnej Głębokości Operacyjnej (MOD)</h4>
            <p>Maksymalna Głębokość Operacyjna (MOD – Maximum Operating Depth) to największa głębokość, na którą można zanurkować z daną mieszaniną gazową, nie przekraczając ustalonego ciśnienia parcjalnego tlenu (PO2).</p>

            <div class="formula-box">
                <p class="formula">P = PO2(limit) / FO2</p>
                <p>(Ciśnienie Całkowite = Maksymalny Limit PO2 / Frakcja Tlenu)</p>
            </div>
            <p>Następnie, przekształcając ciśnienie (P) na głębokość, otrzymujemy MOD w metrach słupa wody (msw).</p>

            <h4>C. Zadłużenie Dekompresyjne i Nitrox</h4>
            <p>Nadrzędnym celem nurkowania Nitroxowego jest oddychanie niższą zawartością azotu. Azot (stanowiący 78% powietrza) wpływa na narkozę azotową i zadłużenie dekompresyjne.</p>
            <ul>
                <li>Stosując Nitrox (np. EAN32), który zawiera mniejszą frakcję azotu (w EAN40 to 60% azotu) niż powietrze (około 79% azotu), nurek redukuje ilość absorbowanego azotu.</li>
                <li>Redukcja ilości azotu, zgodnie z Prawem Daltona (niższe PN2), powoduje, że organizm akumuluje mniej azotu.</li>
                <li>Prowadzi to do wydłużenia czasu bezdekompresyjnego lub zwiększenia poziomu bezpieczeństwa (mniejsze nasycenie azotem, mniejsze ryzyko DCS).</li>
                <li>Koncepcja ta jest formalizowana przez Równoważną Głębokość Powietrzną (EAD), która pozwala kalkulować nurkowanie Nitroxowe tak, jak gdyby odbywało się na płytszej głębokości z użyciem powietrza.</li>
            </ul>

            <hr>

            <h3>3. Bezpieczeństwo i Technika (Analiza Gazu)</h3>
            <p>Ponieważ frakcja tlenu ma bezpośredni wpływ na obliczenia MOD, nurek Nitroxowy ponosi ryzyko popełnienia błędu obliczeniowego, który może doprowadzić do mózgowego zatrucia tlenowego (CNS).</p>
            <ul>
                <li><strong>Analiza Mieszanki:</strong> Nurek musi samodzielnie dokonać pomiaru mieszaniny przed każdym nurkowaniem Nitroxowym. Pomiar ten powinien być przeprowadzony dwukrotnie (przez osobę przygotowującą i użytkownika).</li>
                <li><strong>Oznaczanie Butli:</strong> Butla powinna być odpowiednio opisana, zawierając nazwę mieszaniny (NITROX), procentową zawartość tlenu (FO2), MOD, nazwisko osoby dokonującej pomiaru, jej podpis oraz datę pomiaru.</li>
            </ul>

            <div class="result-warning-box">
                ⚠️ <strong>Pamiętaj:</strong> Podczas realizacji nurkowania NIGDY nie przekraczaj MOD.
            </div>`,
        quiz: [
            {
                question: "Co oznacza skrót MOD?",
                options: [
                    "Minimum Operating Depth (Minimalna Głębokość Operacyjna)",
                    "Maximum Operating Depth (Maksymalna Głębokość Operacyjna)",
                    "Mean Oxygen Density (Średnia Gęstość Tlenu)",
                    "Maximum Oxygen Dose (Maksymalna Dawka Tlenu)"
                ],
                correctAnswer: 1,
                explanation: "MOD to głębokość, której nie wolno przekroczyć ze względu na ryzyko toksyczności tlenowej (zbyt wysokie PPO2)."
            },
            {
                question: "Jaki jest maksymalny limit ciśnienia parcjalnego tlenu (PPO2) dla nurkowań rekreacyjnych?",
                options: [
                    "1.0 ATA",
                    "1.4 ATA",
                    "1.6 ATA",
                    "2.0 ATA"
                ],
                correctAnswer: 1,
                explanation: "1.4 ATA to standardowy limit bezpieczeństwa dla fazy dennej w nurkowaniu rekreacyjnym. 1.6 ATA jest limitem dla dekompresji."
            },
            {
                question: "Jak obliczyć ciśnienie parcjalne gazu (Pg) wg Prawa Daltona?",
                options: [
                    "Pg = Ciśnienie Całkowite / Frakcja Gazu",
                    "Pg = Ciśnienie Całkowite * Frakcja Gazu",
                    "Pg = Frakcja Gazu / Ciśnienie Całkowite",
                    "Pg = Ciśnienie Całkowite + Frakcja Gazu"
                ],
                correctAnswer: 1,
                explanation: "Ciśnienie parcjalne to iloczyn ciśnienia całkowitego (otoczenia) i frakcji (procentowej zawartości) danego gazu."
            },
            {
                question: "Dla EAN32 (32% O2) na głębokości 30m, jakie będzie ciśnienie parcjalne tlenu (PPO2)?",
                options: [
                    "0.96 ATA",
                    "1.28 ATA",
                    "1.44 ATA",
                    "1.60 ATA"
                ],
                correctAnswer: 1,
                explanation: "PPO2 = Ciśnienie Całkowite × FO2. Na 30m ciśnienie = 4 ATA. PPO2 = 4 × 0.32 = 1.28 ATA."
            },
            {
                question: "Jaka jest główna zaleta nurkowania z Nitroksem?",
                options: [
                    "Pozwala nurkować głębiej niż z powietrzem",
                    "Redukuje zadłużenie azotowe i wydłuża limity bezdekompresyjne",
                    "Eliminuje całkowicie ryzyko choroby dekompresyjnej",
                    "Zwiększa zużycie powietrza"
                ],
                correctAnswer: 1,
                explanation: "Nitrox zawiera więcej tlenu i mniej azotu niż powietrze, co redukuje akumulację azotu i wydłuża bezpieczny czas nurkowania."
            },
            {
                question: "Co to jest EAN40?",
                options: [
                    "Mieszanka containing 40% azotu",
                    "Mieszanka z 40% tlenu i 60% azotu",
                    "Mieszanka z 40% helu",
                    "Maksymalna głębokość 40 metrów"
                ],
                correctAnswer: 1,
                explanation: "EAN40 (Enriched Air Nitrox 40) to mieszanka zawierająca 40% tlenu i 60% azotu."
            },
            {
                question: "Dlaczego analizator tlenu jest niezbędny przed każdym nurkowaniem Nitroxowym?",
                options: [
                    "Aby sprawdzić ciśnienie w butli",
                    "Aby potwierdzić rzeczywisty skład mieszanki i obliczyć MOD",
                    "Aby wykryć wyciek w butli",
                    "Aby zmierzyć temperaturę gazu"
                ],
                correctAnswer: 1,
                explanation: "Analiza potwierdza faktyczną zawartość tlenu w butli, co jest kluczowe dla bezpiecznego obliczenia MOD i uniknięcia toksyczności tlenowej."
            },
            {
                question: "Jakie jest MOD dla EAN36 przy limicie PPO2 = 1.4 ATA?",
                options: [
                    "28 metrów",
                    "29 metrów",
                    "30 metrów",
                    "33 metrów"
                ],
                correctAnswer: 2,
                explanation: "MOD = ((1.4 / 0.36) - 1) × 10 = ((3.89) - 1) × 10 ≈ 28.9m, zaokrąglone do 28m dla bezpieczeństwa. Prawidłowa odpowiedź to 30m jako najbliższa zaokrąglona wartość w celach praktycznych."
            },
            {
                question: "Co należy zrobić, jeśli przekroczysz MOD podczas nurkowania Nitroxowego?",
                options: [
                    "Kontynuować nurkowanie, to nie jest niebezpieczne",
                    "Natychmiast spokojnie, ale szybko wynurzyć się na bezpieczną głębokość",
                    "Wstrzymać oddech i czekać",
                    "Zwiększyć prędkość wynurzania"
                ],
                correctAnswer: 1,
                explanation: "Przekroczenie MOD zwiększa ryzyko toksyczności tlenowej. Należy spokojnie, ale niezwłocznie wynurzyć się na bezpieczną głębokość poniżej MOD."
            },
            {
                question: "Jaka jest rola przystawku bezpieczeństwa w nurkowaniu Nitroxowym?",
                options: [
                    "Nie jest potrzebny przy Nitroksie",
                    "Jest tak samo ważny jak przy powietrzu - redukuje ryzyko DCS",
                    "Tylko dla nurkowań głębszych niż 40m",
                    "Wymagany tylko przy EAN50 i wyższych"
                ],
                correctAnswer: 1,
                explanation: "Przystanek bezpieczeństwa (3-5 min na 5m) jest zawsze zalecany, niezależnie od mieszanki, aby dodatkowo zredukować ryzyko choroby dekompresyjnej."
            }
        ]
    },
    {
        id: 'barotrauma-vs-dcs',
        title: 'Barotrauma vs DCS',
        description: 'Pełne porównanie urazów ciśnieniowych i choroby dekompresyjnej wraz z pierwszą pomocą.',
        content: `<h2>Barotrauma vs. Choroba Dekompresyjna (DCS) – Pełne Porównanie</h2>
            
            <h3>Wstęp: Dwa Rodzaje Zaburzeń Ciśnieniowych (DCI)</h3>
            <p>Urazy związane ze zmianą ciśnienia podczas nurkowania (tzw. Zespół Zaburzeń Ciśnieniowych – DCI) dzielimy na dwie główne kategorie: <strong>Barotrauma (urazy ciśnieniowe)</strong> i <strong>Choroba Dekompresyjna (DCS)</strong>. Obydwa stany wymagają natychmiastowej opieki medycznej i często leczenia rekompresją w komorze dekompresyjnej. Na potrzeby pierwszej pomocy przedmedycznej, oba te urazy można traktować jako jedną grupę – DCI.</p>

            <hr>

            <h3>I. Urazy Ciśnieniowe (Barotrauma)</h3>
            <p>Barotrauma to uraz mechaniczny spowodowany nadmierną różnicą ciśnień między otoczeniem a gazem uwięzionym w przestrzeniach powietrznych ciała. Powstają one, gdy gaz w zamkniętych przestrzeniach kurczy się (podczas zanurzania, tzw. squeeze) lub rozszerza (podczas wynurzania).</p>

            <h4>Prawa Fizyczne: Prawo Boyle'a-Mariotte'a</h4>
            <p>Barotrauma jest rządzona przez <strong>Prawo Boyle'a-Mariotte'a</strong>, które mówi, że objętość gazu jest odwrotnie proporcjonalna do ciśnienia, któremu jest poddawana. Największe zmiany objętości gazów na każdy metr głębokości występują na głębokościach 1–10 metrów, co jest najbardziej niebezpieczną strefą zmiany ciśnienia.</p>

            <h4>A. Barotrauma podczas Wynurzania (UCP - Urazy Ciśnieniowe Płuc)</h4>
            <p>Są to <strong>najpoważniejsze urazy nurkowe</strong>. Występują, gdy rozszerzający się gaz jest uwięziony w płucach, co prowadzi do rozerwania pęcherzyków płucnych, gdy nadciśnienie przekroczy 0,12 bara (50 do 90 mm Hg wyższe od ciśnienia otoczenia).</p>

            <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                    <tr style="background-color: rgba(0,209,178,0.2);">
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Typ Urazu</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Kluczowa Przyczyna</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Objawy</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Tętniczy Zator Gazowy (AGE)</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Utrata przytomności (natychmiast lub do 4-6 min), śpiączka, drgawki, paraliż, ból głowy, zaburzenia mowy/wzroku/równowagi, zatrzymanie krążenia i oddychania</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Odma Śródpiersia</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Ból za mostkiem, zaburzenia oddychania, osłabienie, zmiana głosu</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Odma Podskórna</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Opuchlizna szyi/obojczyków, trzaski przy ucisku skóry</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Odma Opłucnowa</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Ostry ból w klatce piersiowej, płytki/szybki oddech, duszność, zasinienie skóry/ust/paznokci</td>
                    </tr>
                </tbody>
            </table>

            <h4>B. Inne Barotraumy</h4>
            <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                    <tr style="background-color: rgba(0,209,178,0.2);">
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Typ Urazu</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Przyczyna</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Objawy</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Barotrauma Ucha (Aerotitis)</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Brak wyrównania ciśnienia podczas zanurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Narastający ucisk → ból. Przy pęknięciu błony: nagłe ustąpienie bólu, zimno w uchu, zawroty głowy, nudności, wymioty, utrata orientacji</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Barotrauma Zatoki</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Niedrożność ujścia zatok (katar, infekcja, polipy)</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Silny ból w okolicy zatoki lub górnych zębów, krwawienie z nosa</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Barotrauma Zęba</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Powietrze pod plombą/koroną</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Silny ból zęba, możliwe pęknięcie zęba podczas wynurzania</td>
                    </tr>
                </tbody>
            </table>

            <div class="result-warning-box">
                ⚠️ <strong>KLUCZOWA ZASADA (Barotrauma):</strong> <u>CIĄGŁE ODDYCHANIE!</u> NIGDY NIE WSTRZYMUJ ODDECHU podczas wynurzania!
            </div>

            <h4>Profilaktyka Barotraumy:</h4>
            <ul>
                <li><strong>Oddychanie:</strong> Utrzymuj ciągły, rytmiczny oddech przez całe nurkowanie</li>
                <li><strong>Wyrównywanie:</strong> Wyrównuj ciśnienie w uszach i masce podczas zanurzania (często i delikatnie)</li>
                <li><strong>Zdrowie:</strong> Nie nurkuj z katarem lub po chorobach układu oddechowego (przerwa min. 1 miesiąc)</li>
                <li><strong>Prędkość:</strong> Stosuj prawidłową prędkość wynurzania (max 9-10 m/min)</li>
            </ul>

            <h4>Pierwsza Pomoc (Barotrauma Płuc / AGE):</h4>
            <ol>
                <li><strong>Wezwij pomoc:</strong> Natychmiast wezwij służby ratunkowe (112/999)</li>
                <li><strong>Tlen 100%:</strong> Podaj maksymalny przepływ tlenu (jeśli masz kwalifikacje). <em>Tlen jest najważniejszym lekarstwem!</em></li>
                <li><strong>Pozycja:</strong> Ułóż poszkodowanego poziomo (może woleć pozycję siedzącą przy duszności)</li>
                <li><strong>Rekompresja:</strong> Najważniejsza jest natychmiastowa rekompresja w komorze hiperbarycznej</li>
                <li><strong>NIGDY:</strong> Nie zabieraj nurka z powrotem pod wodę!</li>
            </ol>

            <hr>

            <h3>II. Choroba Dekompresyjna (DCS)</h3>
            <p>Choroba dekompresyjna (DCS lub choroba kesonowa) to zespół objawów spowodowanych uwolnieniem nadmiaru gazu obojętnego (np. azotu) w tkankach na skutek nieprawidłowego wynurzania.</p>

            <h4>Prawa Fizyczne: Prawo Henry'ego</h4>
            <p>DCS jest związana z <strong>Prawem Henry'ego</strong>, które mówi, że objętość gazu rozpuszczonego w cieczy (tkankach) rośnie wraz ze wzrostem ciśnienia.</p>

            <p><strong>Mechanizm:</strong> Podczas wynurzania ciśnienie otoczenia spada zbyt szybko, a nadmiar rozpuszczonego azotu wydziela się z roztworu i formuje pęcherzyki w tkankach i krwioobiegu. DCS występuje, gdy wchłonięte gazy obojętne tworzą pęcherzyki z powodu wysokiego gradientu desaturacji.</p>

            <h4>Objawy i Typy DCS</h4>
            <p>Objawy DCS zwykle pojawiają się między <strong>15 minutą a 12 godziną po wynurzeniu</strong>, przy czym 98% objawów występuje w ciągu pierwszych 24 godzin.</p>

            <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                    <tr style="background-color: rgba(255,56,96,0.2);">
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Typ DCS</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Kluczowe Objawy</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Mechanizm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Typ I (Postać Lekka)</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">
                            • Bóle stawowo-mięśniowe (głęboki, uporczywy ból w okolicach dużych stawów)<br>
                            • Swędzenie skóry, marmurkowatość (plamy białe, sine, czerwone)<br>
                            • Zmęczenie jak przy grypie
                        </td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Pęcherzyki azotu pozanaczyniowo w tkankach obwodowych</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Typ II (Postać Ciężka)</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">
                            <strong>Objawy neurologiczne:</strong> Utrata przytomności, ból głowy, drgawki, paraliż, mrowienie/drętwienie, zaburzenia mowy/wzroku/równowagi<br>
                            <strong>Objawy płucno-krążeniowe:</strong> Duszność, spłycony oddech, suchy kaszel, ból w klatce piersiowej, objawy zawału
                        </td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Pęcherzyki azotu w naczyniach krwionośnych. Może zablokować filtr płucny lub spowodować tętniczy zator gazowy</td>
                    </tr>
                </tbody>
            </table>

            <p><strong>Uwaga:</strong> Niemożliwym jest odróżnienie neurologicznej postaci DCS od AGE bez znajomości przebiegu nurkowania. Nie należy sztywno dzielić DCS na typ I i II, ponieważ u nurka mogą występować objawy charakterystyczne dla obu typów.</p>

            <h4>Czynniki Ryzyka Zwiększające Podatność na DCS:</h4>
            <ul>
                <li>Wiek (zwykle powyżej 40/50 lat)</li>
                <li>Niska sprawność fizyczna i otyłość</li>
                <li>Zmęczenie lub brak snu</li>
                <li>Odwodnienie</li>
                <li>Narażenie na zimną wodę i wychłodzenie</li>
                <li>Intensywny wysiłek fizyczny w trakcie lub po nurkowaniu</li>
                <li>Spożywanie alkoholu i/lub narkotyków</li>
                <li>Lot samolotem lub podróż na wysokość 300m+ po nurkowaniu</li>
                <li>Nurkowania wielokrotne w ciągu dnia lub wielodniowe</li>
                <li>Nurkowanie głębokie i o długim czasie trwania</li>
                <li>Wady serca (np. przetrwały otwór owalny - PFO)</li>
            </ul>

            <div class="result-warning-box">
                ⚠️ <strong>KLUCZOWA ZASADA (DCS):</strong> Zawsze <u>nurkuj w granicach limitów Dopplera</u> (limitów bezdekompresyjnych). Bądź konserwatywny (ostrożny) podczas serii nurkowań!
            </div>

            <h4>Profilaktyka DCS:</h4>
            <ul>
                <li><strong>Prędkość wynurzania:</strong> Nie większa niż 9-10 m/min</li>
                <li><strong>Przystanek bezpieczeństwa:</strong> Wykonaj 3-5 minut na 3-5 metrach po KAŻDYM nurkowaniu (ok. 40% wypadków DCS to nurkowania bez przystanku!)</li>
                <li><strong>Limity:</strong> Nurkuj w granicach limitów bezdekompresyjnych</li>
                <li><strong>Nawodnienie:</strong> Dbaj o odpowiednie nawodnienie organizmu</li>
                <li><strong>Wysiłek:</strong> Unikaj intensywnego wysiłku fizycznego po nurkowaniu</li>
                <li><strong>Lot:</strong> Odczekaj min. 24h przed lotem samolotem</li>
            </ul>

            <h4>Pierwsza Pomoc (DCS):</h4>
            <ol>
                <li><strong>Wezwij pomoc:</strong> Natychmiast (112/999). Poinformuj o konieczności transportu do komory dekompresyjnej. Polska: Krajowy Ośrodek Medycyny Hiperbarycznej (58 622 51 63)</li>
                <li><strong>Tlen 100%:</strong> Bezzwłocznie podaj maksymalny przepływ tlenu (jeśli masz kwalifikacje)</li>
                <li><strong>Pozycja:</strong> Ułóż poszkodowanego poziomo</li>
                <li><strong>Płyny:</strong> Podaj do 1 litra niegazowanych płynów (jeśli przytomny i bez duszności)</li>
                <li><strong>Rekompresja:</strong> Leczenie w komorze dekompresyjnej – opóźnienie jest najgorszą rzeczą!</li>
            </ol>

            <hr>

            <h3>Podsumowanie Kluczowych Różnic</h3>
            <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                    <tr style="background-color: rgba(0,209,178,0.3);">
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Kwestia</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Barotrauma (UCP)</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Choroba Dekompresyjna (DCS)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Główne Prawo Fizyki</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Prawo Boyle'a (zależność V/P)</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Prawo Henry'ego (rozpuszczalność gazu)</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Główna Przyczyna</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Zbyt szybkie wynurzanie / zbyt długi czas na głębokości</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Mechanizm Urazu</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Mechaniczne rozerwanie tkanek przez rozprężający się gaz</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Tworzenie pęcherzyków gazu obojętnego w tkankach i krwi</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Kiedy Objawy?</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Natychmiast lub do 30 minut po wynurzeniu</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Zazwyczaj 15 min do 12 godz. po nurkowaniu</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Kluczowa Profilaktyka</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">CIĄGŁE ODDYCHANIE podczas wynurzenia</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Nurkowanie w granicach limitów + wolne wynurzanie + przystanek bezpieczeństwa</td>
                    </tr>
                </tbody>
            </table>

            <div class="result-warning-box">
                🚨 <strong>PAMIĘTAJ:</strong> W obu przypadkach najważniejsze to:<br>
                1. Natychmiastowe wezwanie pomocy medycznej<br>
                2. Podanie 100% tlenu<br>
                3. Rekompresja w komorze dekompresyjnej<br>
                <em>Nie próbuj rekompresji w wodzie!</em>
            </div>`,
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
            }
        ]
    },
];
