const lecturesData = [
    {
        id: 'fizyka-nurkowania',
        title: 'Fizyka Nurkowania',
        description: 'Podstawowe prawa fizyczne: Boyle, Archimedes, Dalton i Henry. Zrozum, jak ciśnienie wpływa na gaz i Twoje ciało.',
        content: `<h2>Fizyka Nurkowania: Fundament Bezpieczeństwa</h2>
        <p>Zrozumienie fizyki nurkowania nie jest tylko teorią akademicką – to wiedza, która bezpośrednio wpływa na Twoje bezpieczeństwo i komfort pod wodą. Woda jest środowiskiem o znacznie większej gęstości niż powietrze, co powoduje, że zmiany ciśnienia są odczuwalne znacznie szybciej i intensywniej.</p>

        <h3>1. Prawo Archimedesa (Pływalność)</h3>
        <p><strong>"Ciało zanurzone w cieczy traci na ciężarze tyle, ile waży ciecz wyparta przez to ciało."</strong></p>
        <p>To prawo wyjaśnia, dlaczego statki pływają, a nurkowie mogą unosić się w toni. W nurkowaniu wyróżniamy trzy rodzaje pływalności:</p>
        <ul>
            <li><strong>Dodatnia:</strong> Wypierasz więcej wody niż ważysz – unosisz się (np. na powierzchni).</li>
            <li><strong>Ujemna:</strong> Wypierasz mniej wody niż ważysz – toniesz (opadasz na dno).</li>
            <li><strong>Neutralna:</strong> Wypierasz dokładnie tyle wody, ile ważysz – "lewitujesz" w toni. To cel każdego nurka!</li>
        </ul>
        <div class="result-warning-box">
            💡 <strong>Zastosowanie:</strong> Używamy BCD (kamizelki) i płuc do zmiany objętości (a więc ilości wypartej wody), aby kontrolować pływalność.
        </div>

        <hr>

        <h3>2. Prawo Boyle’a-Mariotte’a (Ciśnienie i Objętość)</h3>
        <p><strong>"W stałej temperaturze objętość gazu jest odwrotnie proporcjonalna do ciśnienia."</strong></p>
        <p>To najważniejsze prawo dla nurka. Gdy schodzisz głębiej, ciśnienie rośnie, a objętość gazów (w Twoich płucach, masce, BCD, skafandrze) maleje.</p>
        <ul>
            <li><strong>0m (1 bar):</strong> 100% objętości</li>
            <li><strong>10m (2 bary):</strong> 50% objętości (powietrze jest 2x gęstsze)</li>
            <li><strong>20m (3 bary):</strong> 33% objętości</li>
            <li><strong>30m (4 bary):</strong> 25% objętości</li>
        </ul>
        <div class="result-warning-box">
            ⚠️ <strong>Zagrożenie:</strong> Nigdy nie wstrzymuj oddechu podczas wynurzania! Rozprężające się powietrze może rozerwać płuca (uraz ciśnieniowy).
        </div>

        <hr>

        <h3>3. Prawo Daltona (Ciśnienia Parcjalne)</h3>
        <p><strong>"Ciśnienie całkowite mieszaniny gazów jest sumą ciśnień parcjalnych jej składników."</strong></p>
        <p>To prawo jest kluczowe w nurkowaniu na Nitroxie. Powietrze to ~21% tlenu i ~79% azotu. Na powierzchni (1 bar) oddychasz tlenem o ciśnieniu 0.21 bara. Na głębokości 40m (5 barów) ten sam tlen ma ciśnienie parcjalne 1.05 bara (5 * 0.21).</p>
        <p><strong>Dlaczego to ważne?</strong> Gazy stają się toksyczne pod wysokim ciśnieniem. Tlen staje się toksyczny dla OUN powyżej 1.4 - 1.6 bara (ok. 56-66m na powietrzu).</p>

        <hr>

        <h3>4. Prawo Henry’ego (Rozpuszczalność Gazów)</h3>
        <p><strong>"Ilość gazu rozpuszczonego w cieczy jest wprost proporcjonalna do ciśnienia tego gazu nad cieczą."</strong></p>
        <p>To prawo wyjaśnia chorobę dekompresyjną. Pod wodą, pod wpływem ciśnienia, azot z powietrza rozpuszcza się w Twojej krwi i tkankach (jak CO2 w zamkniętej butelce szampana).</p>
        <ul>
            <li><strong>Zanurzanie:</strong> Tkanki "nasiąkają" azotem (saturacja).</li>
            <li><strong>Wynurzanie:</strong> Ciśnienie spada, azot chce opuścić tkanki (desaturacja).</li>
        </ul>
        <div class="result-warning-box">
            🚨 <strong>Ryzyko:</strong> Jeśli wynurzysz się zbyt szybko, azot nie zdąży dyfundować do płuc i stworzy pęcherzyki w krwi (jak po otwarciu szampana) – to jest Choroba Dekompresyjna (DCS).
        </div>`,
        quiz: [
            {
                question: "Zgodnie z Prawem Boyle'a, co dzieje się z objętością powietrza w BCD podczas zanurzania?",
                options: [
                    "Zwiększa się",
                    "Zmniejsza się",
                    "Pozostaje bez zmian",
                    "Zmienia kolor"
                ],
                correctAnswer: 1,
                explanation: "Wraz ze wzrostem ciśnienia (zanurzanie), objętość gazu maleje. Dlatego musisz dopompowywać BCD schodząc w dół, aby utrzymać pływalność."
            },
            {
                question: "Jaki jest najważniejszy skutek Prawa Henry'ego dla nurka?",
                options: [
                    "Konieczność wyrównywania ciśnienia w uszach",
                    "Ryzyko toksyczności tlenowej",
                    "Rozpuszczanie się azotu w tkankach i ryzyko choroby dekompresyjnej",
                    "Zwiększone zużycie powietrza"
                ],
                correctAnswer: 2,
                explanation: "Prawo Henry'ego opisuje mechanizm nasycania tkanek gazami obojętnymi (azotem) pod ciśnieniem, co jest bezpośrednią przyczyną ryzyka DCS przy zbyt szybkim wynurzaniu."
            },
            {
                question: "Jeśli na powierzchni balon ma objętość 4 litrów, jaką objętość będzie miał na głębokości 10 metrów?",
                options: [
                    "1 litr",
                    "2 litry",
                    "4 litry",
                    "8 litrów"
                ],
                correctAnswer: 1,
                explanation: "Na 10m panuje ciśnienie 2 bary (1 atm + 1 hydrostatyczna). Zgodnie z prawem Boyle'a: P1*V1 = P2*V2. 1*4 = 2*x -> x = 2 litry."
            },
            {
                question: "Które prawo fizyki wyjaśnia, dlaczego nie wolno wstrzymywać oddechu podczas wynurzania?",
                options: [
                    "Prawo Archimedesa",
                    "Prawo Boyle'a-Mariotte'a",
                    "Prawo Henry'ego",
                    "Prawo Daltona"
                ],
                correctAnswer: 1,
                explanation: "Prawo Boyle'a mówi, że gdy ciśnienie maleje (wynurzanie), objętość gazu rośnie. Wstrzymanie oddechu spowodowałoby nadmierne rozdęcie płuc i ich uszkodzenie."
            },
            {
                question: "Co to jest pływalność neutralna?",
                options: [
                    "Gdy nurek unosi się na powierzchni",
                    "Gdy nurek opada na dno",
                    "Gdy nurek ani nie tonie, ani nie wypływa, utrzymując stałą głębokość",
                    "Gdy nurek używa tylko płetw"
                ],
                correctAnswer: 2,
                explanation: "Pływalność neutralna (zerowa) występuje, gdy siła wyporu równoważy siłę ciężkości. Pozwala to na swobodne 'wiszenie' w toni wodnej."
            },
            {
                question: "Jak zmienia się zużycie powietrza wraz z głębokością?",
                options: [
                    "Maleje",
                    "Nie zmienia się",
                    "Rośnie wprost proporcjonalnie do ciśnienia otoczenia",
                    "Zależy tylko od temperatury"
                ],
                correctAnswer: 2,
                explanation: "Ponieważ oddychasz powietrzem pod ciśnieniem otoczenia, na 10m (2 bary) zużywasz 2x więcej powietrza (wagowo) na każdy oddech niż na powierzchni."
            },
            {
                question: "Które prawo jest odpowiedzialne za narkozę azotową?",
                options: [
                    "Prawo Archimedesa",
                    "Prawo Boyle'a-Mariotte'a",
                    "Prawo Henry'ego",
                    "Prawo Daltona"
                ],
                correctAnswer: 3,
                explanation: "Prawo Daltona (ciśnienia parcjalne). Narkoza zależy od ciśnienia parcjalnego azotu wdychanego przez nurka. Im głębiej, tym wyższe ppN2 i silniejszy efekt narkotyczny."
            },
            {
                question: "Jaka jest bezpieczna prędkość wynurzania?",
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
