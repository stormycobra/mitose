
import { PhaseData } from './types';

export const PHASES: PhaseData[] = [
    {
        titel: "Interfase",
        subtitel: "De Voorbereiding",
        beschrijving: "De cel is in rust en groeit. Het DNA in de kern wordt gekopieerd (gerepliceerd), maar is nog een warrige kluwen (chromatine). De celkern is intact.",
        details: ["DNA replicatie", "Celgroei", "Chromosomen nog niet zichtbaar"]
    },
    {
        titel: "Profase",
        subtitel: "De Start",
        beschrijving: "Het DNA rolt zich strak op en vormt zichtbare chromosomen (X-vorm). Het kernmembraan begint af te breken. De centriolen (poollichaampjes) bewegen naar de zijkanten.",
        details: ["Chromosomen condenseren", "Kernmembraan verdwijnt", "Centriolen verplaatsen"]
    },
    {
        titel: "Metafase",
        subtitel: "Het Midden",
        beschrijving: "De chromosomen worden door trekdraden naar het midden van de cel geduwd. Ze liggen nu netjes op één lijn (het equatorvlak).",
        details: ["Chromosomen op de evenaar", "Trekdraden hechten vast", "Maximale spiralisatie"]
    },
    {
        titel: "Anafase",
        subtitel: "De Splitsing",
        beschrijving: "De trekdraden trekken samen. De X-vormige chromosomen breken in tweeën. De chromatiden worden als V-vormen naar de tegenovergestelde polen getrokken.",
        details: ["Chromatiden splitsen", "Beweging naar polen", "Cel wordt iets langwerpiger"]
    },
    {
        titel: "Telofase",
        subtitel: "De Herbouwing",
        beschrijving: "De chromosomen zijn aangekomen bij de polen. Er vormen zich twee nieuwe celkernen. De chromosomen rollen zich weer langzaam uit.",
        details: ["Nieuwe kernmembranen", "Chromosomen despiraliseren", "Insnoering begint"]
    },
    {
        titel: "Cytokinese",
        subtitel: "De Deling",
        beschrijving: "Het celmembraan snoert volledig in. De cel splitst zich in twee identieke dochtercellen. Het proces is voltooid.",
        details: ["Twee losse cellen", "Identiek DNA", "Terug naar interfase"]
    }
];

export const MEIOSIS_PHASES: PhaseData[] = [
    {
        titel: "Interfase",
        subtitel: "De Voorbereiding",
        beschrijving: "De cel groeit en het DNA wordt gekopieerd. Net als bij mitose hebben we nu twee sets DNA, maar de chromosomen zijn nog niet zichtbaar.",
        details: ["DNA replicatie", "Celgroei", "Diplöide cel (2n)"]
    },
    {
        titel: "Profase I",
        subtitel: "Paring van Chromosomen",
        beschrijving: "Chromosomen worden zichtbaar. Homologe chromosomen (één van vader, één van moeder) zoeken elkaar op en vormen paren. Hier kan 'crossing-over' plaatsvinden (stukjes DNA uitwisselen).",
        details: ["Paring homologe chromosomen", "Crossing-over mogelijk", "Kernmembraan verdwijnt"]
    },
    {
        titel: "Metafase I",
        subtitel: "Paren op de Evenaar",
        beschrijving: "De homologe paren liggen naast elkaar in het midden van de cel. Dit is anders dan bij mitose, waar ze onder elkaar liggen.",
        details: ["Homologe paren op evenaar", "Willekeurige verdeling", "Trekdraden hechten aan"]
    },
    {
        titel: "Anafase I",
        subtitel: "Scheiding van Paren",
        beschrijving: "De homologe paren worden uit elkaar getrokken. De hele chromosomen (X-vorm) gaan naar de polen. Het aantal chromosomen wordt gehalveerd.",
        details: ["Homologe paren splitsen", "Chromosomen blijven heel (X)", "Reductiedeling"]
    },
    {
        titel: "Telofase I",
        subtitel: "Eerste Deling",
        beschrijving: "De chromosomen komen aan bij de polen. Er ontstaan tijdelijk twee kernen. De cel maakt zich klaar om te splitsen.",
        details: ["Twee kernen vormen", "Cel snoert in", "Haploïde sets (n)"]
    },
    {
        titel: "Cytokinese I / Profase II",
        subtitel: "Twee Cellen",
        beschrijving: "De cel deelt in tweeën. We hebben nu twee cellen met elk de helft van het aantal chromosomen, maar elk chromosoom bestaat nog uit twee chromatiden.",
        details: ["Twee dochtercellen", "Geen DNA replicatie!", "Start tweede deling"]
    },
    {
        titel: "Metafase II",
        subtitel: "Opnieuw op de Evenaar",
        beschrijving: "In beide cellen gaan de chromosomen weer naar het midden. Nu liggen ze, net als bij mitose, op één lijn.",
        details: ["Chromosomen op evenaar", "In beide cellen", "Dwars op eerste deling"]
    },
    {
        titel: "Anafase II",
        subtitel: "Splitsing van Chromatiden",
        beschrijving: "Nu worden de X-vormige chromosomen definitief gesplitst. De chromatiden worden uit elkaar getrokken naar de polen.",
        details: ["Centromeren breken", "Chromatiden splitsen", "Beweging naar polen"]
    },
    {
        titel: "Telofase II",
        subtitel: "Vier Kernen",
        beschrijving: "Er vormen zich nieuwe kernmembranen rond de vier groepen chromosomen. De chromosomen rollen zich weer uit.",
        details: ["Vier nieuwe kernen", "Decondensatie chromosomen", "Einde meiose"]
    },
    {
        titel: "Cytokinese II",
        subtitel: "Vier Cellen",
        beschrijving: "De cellen snoeren volledig in. Het resultaat: vier genetisch unieke geslachtscellen (gameten), elk met een enkele set chromosomen.",
        details: ["Vier haploïde cellen", "Genetisch uniek", "Gameten gevormd"]
    }
];
