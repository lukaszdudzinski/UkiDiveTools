export const daltonLecture = {
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
        },
        {
            question: "Jaki jest główny objaw toksyczności tlenowej CNS?",
            options: [
                "Kaszel",
                "Drgawki (Convulsions)",
                "Wypieki na twarzy",
                "Ból stawów"
            ],
            correctAnswer: 1,
            explanation: "Drgawki (ataki padaczkowe) są najpoważniejszym i najgroźniejszym objawem toksyczności tlenowej pod wodą, grożącym utonięciem."
        },
        {
            question: "Czym jest 'Best Mix' (Najlepsza Mieszanka) dla danej głębokości?",
            options: [
                "Mieszanka, która ma 21% tlenu",
                "Mieszanka, która na planowanej głębokości osiąga dokładnie PPO2 = 1.4 ATA",
                "Mieszanka z helem",
                "Najtańsza mieszanka"
            ],
            correctAnswer: 1,
            explanation: "Best Mix to taka mieszanka Nitroksowa, która maksymalizuje zawartość tlenu (a tym samym minimalizuje azot) nie przekraczając limitu MOD."
        },
        {
            question: "Dlaczego butla z Nitroksem ma zielono-żółty pasek?",
            options: [
                "Dla ozdoby",
                "Aby odróżnić ją od butli z powietrzem (wymóg bezpieczeństwa)",
                "Oznacza butlę stalową",
                "Oznacza butlę aluminiową"
            ],
            correctAnswer: 1,
            explanation: "Standardowe oznaczenie butli Nitroxowych to pas koloru zielonego i żółtego oraz wyraźny napis NITROX lub EANx, aby uniknąć pomyłkowego użycia."
        },
        {
            question: "Jaki jest skład powietrza atmosferycznego?",
            options: [
                "100% tlen",
                "50% tlen, 50% azot",
                "21% tlen, 78% azot, 1% inne gazy",
                "100% azot"
            ],
            correctAnswer: 2,
            explanation: "Powietrze to w przybliżeniu 21% tlenu i 79% azotu. Nitrox to każda mieszanka, gdzie tlenu jest >21%."
        },
        {
            question: "Jakie ciśnienie absolutne (całkowite) panuje na głębokości 20 metrów?",
            options: [
                "1 ATA",
                "2 ATA",
                "3 ATA",
                "4 ATA"
            ],
            correctAnswer: 2,
            explanation: "Na powierzchni mamy 1 ATA. Co 10m dochodzi 1 ATA. 20m/10 = 2 ATA wody + 1 ATA atmosfery = 3 ATA."
        },
        {
            question: "Czym jest Hipoksja?",
            options: [
                "Niedoborem tlenu",
                "Nadmiarem tlenu",
                "Zatruciem azotowym",
                "Stachem przed wodą"
            ],
            correctAnswer: 0,
            explanation: "Hipoksja to stan niedotlenienia. Może wystąpić, gdy oddychamy mieszanką o zbyt niskiej zawartości tlenu na płytkiej głębokości."
        },
        {
            question: "Po co w ogóle stosujemy Nitrox w rekreacji?",
            options: [
                "Żeby nurkować głębiej",
                "Żeby wydłużyć czas bezdekompresyjny (limit NDL)",
                "Żeby zużywać mniej gazu",
                "Żeby nie było zimno"
            ],
            correctAnswer: 1,
            explanation: "Główny cel to mniej azotu w mieszance = wolniejsze nasycanie tkanek = dłuższy czas, jaki możemy spędzić na dnie bez dekompresji."
        },
        {
            question: "Co to jest EAD (Equivalent Air Depth)?",
            options: [
                "Rzeczywista głębokość nurkowania",
                "Głębokość, na której oddychając powietrzem wchłonęlibyśmy tyle samo azotu co na Nitroxie",
                "Głębokość przystanku bezpieczeństwa",
                "Maksymalna głębokość operacyjna"
            ],
            correctAnswer: 1,
            explanation: "EAD pozwala używać tabel powietrznych do nurkowań na Nitroxie, przeliczając głębokość na 'płytszą' (ekwiwalentną powietrzną)."
        },
        {
            question: "Do czego kalibrujemy analizator tlenu?",
            options: [
                "Do czystego tlenu (100%)",
                "Do powietrza atmosferycznego (20.9% / 21%)",
                "Do azotu",
                "Nie trzeba kalibrować"
            ],
            correctAnswer: 1,
            explanation: "Analizator kalibrujemy zazwyczaj na powietrzu atmosferycznym, przyjmując odczyt 20.9% lub 21.0% jako punkt odniesienia."
        },
        {
            question: "Jeśli Twój analizator pokazuje 32.5% O2, jaką wartość przyjmujesz do obliczeń MOD?",
            options: [
                "32% (bardziej konserwatywnie dla dekompresji, ale nie dla MOD)",
                "33% (bardziej konserwatywnie dla toksyczności tlenowej)",
                "Średnią",
                "Ignorujesz to"
            ],
            correctAnswer: 1,
            explanation: "Do obliczeń MOD (bezpieczeństwo tlenowe) zawsze przyjmujemy wartość wyższą/bardziej restrykcyjną. Jeśli analizator się waha, bezpieczniej założyć, że tlenu jest więcej."
        }
    ]
};
