import * as React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

import { IndustryPageJsonLd, FAQJsonLd } from '@/components/seo';
import { IndustrySuccessStories } from '@/components/marketing/sections/industry-success-stories';
import { RelatedSolutions } from '@/components/marketing/sections/related-solutions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Routes } from '@/constants/routes';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getBaseUrl } from '@/lib/urls/get-base-url';

const SELF_URL = `${getBaseUrl()}/feinplanung-software`;
const ENGLISH_URL = `${getBaseUrl()}/production-scheduling-software-germany`;

const baseMetadata = createPageMetadata({
  title: 'Feinplanung Software für Fertigung und Maschinenbau | EDGEBIC',
  description:
    'EDGEBIC Feinplanung Software: Kapazitätsplanung mit endlichen Kapazitäten für Mittelstand und Maschinenbau. Auf Ihren Systemen installiert, Kauflizenz.',
  path: '/feinplanung-software',
  modifiedTime: '2026-08-28',
  keywords:
    'Feinplanung Software, Produktionsplanung Software, APS Software, Fertigungsplanung Software Mittelstand, Kapazitätsplanung Software, Fertigungssteuerung Software, Feinplanung Maschinenbau, Produktionsplanung Software Mittelstand, APS Software Maschinenbau, Kapazitätsplanung endliche Kapazitäten, Feinplanung SAP Business One, Feinplanung Business Central, Netronic Alternative'
});

export const metadata = {
  ...baseMetadata,
  alternates: {
    canonical: SELF_URL,
    languages: {
      de: SELF_URL,
      en: ENGLISH_URL,
      'x-default': ENGLISH_URL
    }
  }
};

const FAQS = [
  {
    question: 'Ist EDGEBIC in Deutschland, Österreich und der Schweiz verfügbar?',
    answer:
      'Ja. EDGEBIC wird von User Solutions, Inc. aus Michigan (USA) direkt an Fertigungsunternehmen in Deutschland, Österreich und der Schweiz verkauft und betreut. User Solutions entwickelt seit 1991 Software für die Kapazitätsplanung mit endlichen Kapazitäten. Sie erwerben die Lizenz direkt beim Hersteller, installieren EDGEBIC auf Ihren eigenen Windows-Systemen und erhalten Einführung, Schulung und Support per Fernzugriff.'
  },
  {
    question: 'Was leistet EDGEBIC im Vergleich zur Planung im ERP-System?',
    answer:
      'EDGEBIC ist eine Feinplanung, also ein APS-System (Advanced Planning and Scheduling). Es terminiert Fertigungsaufträge gegen die tatsächlich verfügbare Kapazität von Maschinen und Mitarbeitern, statt wie die Grobplanung im ERP- oder PPS-System mit unendlicher Kapazität zu rechnen. Dazu gehören Kapazitätsplanung, Rüstzeitoptimierung über reihenfolgeabhängige Rüstmatrizen und eine Terminierung, auf die sich der Vertrieb verlassen kann.'
  },
  {
    question: 'Wo werden unsere Produktionsdaten gespeichert?',
    answer:
      'Auf Ihren eigenen Systemen. EDGEBIC ist eine installierte Windows-Anwendung auf Basis von .NET 8 und kein gehosteter Cloud-Dienst. Einzelplatzinstallationen laufen mit SQLite, Mehrplatzinstallationen mit SQL Server auf Ihrem eigenen Server. Arbeitspläne, Aufträge und Kapazitätsdaten bleiben in Ihrem Netzwerk und in Ihrem Rechtsraum; eine Datenschutzprüfung nach DSGVO fällt entsprechend kurz aus.'
  },
  {
    question: 'Mit welchen in Deutschland verbreiteten ERP-Systemen lässt sich EDGEBIC verbinden?',
    answer:
      'EDGEBIC lässt sich mit jedem System verbinden, das Daten über Excel, CSV oder eine Datenbankverbindung importieren und exportieren kann. Im DACH-Markt sind das in der Regel SAP Business One und SAP S/4HANA, Microsoft Dynamics 365 Business Central, abas ERP, proALPHA, Infor, Sage und Odoo. Fertigungsaufträge fließen zur Feinplanung nach EDGEBIC, Rückmeldungen fließen für Bestand und Kalkulation zurück ins ERP.'
  },
  {
    question: 'In welcher Sprache sind Software, Dokumentation und Support?',
    answer:
      'Die Benutzeroberfläche, die Dokumentation und der Support von EDGEBIC sind in englischer Sprache. Eine deutsche Oberfläche gibt es derzeit nicht. Die meisten Planungs- und Arbeitsvorbereitungsteams in Deutschland arbeiten damit problemlos; das grafische Gantt-Diagramm und der Arbeitsplan-Designer tragen einen großen Teil der Bedienung ohne Text. Support-Termine werden am deutschen Nachmittag angeboten, das entspricht dem Vormittag in Michigan (sechs Stunden Zeitunterschied zu MEZ/MESZ).'
  },
  {
    question: 'Wie wird EDGEBIC für deutsche Kunden lizenziert und bepreist?',
    answer:
      'EDGEBIC ist eine einmalige, unbefristete Kauflizenz und kein Abonnement. Die veröffentlichten Listenpreise betragen 25.000 USD für die Edition APS und 35.000 USD für die Edition Complete (APS plus MRP, Bestandsführung und Einkauf), ohne Gebühren pro Benutzer. Aktuelle Details finden Sie auf der Preisseite; ein Angebot in Euro erhalten Sie auf Anfrage.'
  },
  {
    question: 'Wie schneidet EDGEBIC im Vergleich zu Netronic, Siemens Opcenter und Asprova ab?',
    answer:
      'Netronic (Aachen) bietet Gantt-basierte Planungs-Add-ons für Business Central sowie den einfachen Cloud-Planer Just Plan It; beide berücksichtigen Rüstmatrizen, echte Alternativressourcen und Mitarbeiterqualifikationen weniger tief als EDGEBIC. Siemens Opcenter APS (ehemals Preactor) und Asprova sind Enterprise-APS-Systeme mit mehrmonatigen Einführungsprojekten, die vor allem für große Werke innerhalb dieser Ökosysteme passen. EDGEBIC liegt dazwischen: vollständige Feinplanung mit endlichen Kapazitäten, auf Ihren eigenen Systemen, in fünf Tagen produktiv, einmalig lizenziert.'
  }
];

const REGIONAL_COMPETITORS = [
  {
    name: 'Netronic und Just Plan It',
    origin: 'Aachen, Deutschland',
    note: 'Visuelle Gantt-Add-ons für Dynamics 365 Business Central und ein einfacher Cloud-Planer für Werkstattfertigung. Starke Visualisierung; bei Rüstmatrizen, Alternativressourcen und Mitarbeiterqualifikationen weniger tief als EDGEBIC.'
  },
  {
    name: 'Siemens Opcenter APS (Preactor)',
    origin: 'Siemens Digital Industries',
    note: 'Der Enterprise-APS-Standard in der deutschen Automobil- und Maschinenbauindustrie. Stark innerhalb der Siemens-Welt; für einen Mittelstandsbetrieb aufwendig in Einführung und Lizenzierung.'
  },
  {
    name: 'Asprova',
    origin: 'Japan, stark im DACH-Raum vertreten',
    note: 'High-End-APS, verbreitet in Automobil-Lieferketten. Sehr tief, aber als Enterprise-Projekt bepreist und eingeführt. EDGEBIC liefert die eigentliche Feinplanung innerhalb einer Woche.'
  },
  {
    name: 'MRPeasy, Katana und PlanetTogether',
    origin: 'Estland und USA',
    note: 'Cloud-MRP mit einfacher Planung (MRPeasy, Katana) und ein Abonnement-APS für große Mehrwerksbetriebe (PlanetTogether). EDGEBIC punktet mit echten endlichen Kapazitäten, Daten im eigenen Haus und Kauflizenz.'
  }
];

export default function FeinplanungSoftwarePage(): React.JSX.Element {
  return (
    <div lang="de">
      <IndustryPageJsonLd
        title="Feinplanung Software für Fertigung und Maschinenbau"
        description="EDGEBIC Feinplanung Software (APS) mit Kapazitätsplanung bei endlichen Kapazitäten für mittelständische Fertigungsbetriebe, Maschinenbauer und Zulieferer in Deutschland, Österreich und der Schweiz."
        url="/feinplanung-software"
        industryName="Fertigungsindustrie im deutschsprachigen Raum"
        industryDescription="Mittelständische Werkstattfertiger, Maschinenbauer, Automobilzulieferer und Präzisionsteilehersteller in Deutschland, Österreich und der Schweiz, die Maschinen und Fachkräfte mit endlichen Kapazitäten planen."
        customerNames={['GE', 'Cummins', 'BAE Systems']}
      />
      <FAQJsonLd
        questions={FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />

      <div className="min-h-screen text-[18px]">
        {/* Hero Section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Feinplanung Software für Fertigung und Maschinenbau
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                EDGEBIC ist eine Feinplanung Software (APS) mit
                Kapazitätsplanung bei endlichen Kapazitäten von User Solutions,
                Inc. (Michigan, USA, gegründet 1991). Sie wird direkt an
                mittelständische Werkstattfertiger, Maschinenbauer und
                Zulieferer in Deutschland, Österreich und der Schweiz verkauft
                und betreut. Die Software wird auf Ihren eigenen
                Windows-Systemen installiert, arbeitet neben SAP Business One,
                Dynamics 365 Business Central und abas und wird einmalig
                lizenziert statt im Abonnement.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-sm text-gray-600">
                Benutzeroberfläche, Dokumentation und Support sind in englischer
                Sprache.{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareGermany}
                  className="text-cyan-700 underline"
                >
                  English version
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Regional Fit Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Feinplanung für Mittelstand und Maschinenbau
              </h2>
              <p className="leading-relaxed text-gray-700">
                Die Stärke der deutschen Industrie liegt im Mittelstand:
                familiengeführte Maschinenbauer, Zulieferer für Automobil- und
                Maschinenbau-OEMs, Präzisionsteilehersteller und Werkzeugbauer.
                Industrie 4.0 hat die Maschinen vernetzt, aber vernetzte Daten
                sind noch kein Fertigungsplan. Das ERP- oder PPS-System macht
                die Grobplanung gegen unendliche Kapazität; die Fertigung
                braucht eine Feinplanung, die echte Aufträge über echte
                Arbeitsplätze, echte Rüstzeiten und echte Fachkräfte
                terminiert und dem Vertrieb einen Liefertermin gibt, der auch
                hält.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  'Einzel- und Kleinserienfertigung mit eigenem Arbeitsplan für jeden Auftrag',
                  'Qualifizierte Fachkräfte und Zertifizierungen als begrenzende Ressource',
                  'Reihenfolgeabhängige Rüstzeiten, die das ERP-Planungsmodul ignoriert',
                  'OEM-Kunden aus Automobil und Maschinenbau, die Liefertermintreue messen',
                  'SAP Business One, Business Central oder abas für Finanzen, aber nicht für die Reihenfolge',
                  'IT-Richtlinien und Datenschutz, die eine im Ausland gehostete Planungs-Cloud ausschließen'
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                So unterstützt EDGEBIC deutsche Fertigungsbetriebe
              </h2>
              <p className="leading-relaxed text-gray-700">
                <Link
                  href={Routes.Edgebic}
                  className="text-cyan-700 underline"
                >
                  EDGEBIC
                </Link>{' '}
                ist ein APS-System auf Basis der{' '}
                <Link
                  href={Routes.FiniteCapacityScheduling}
                  className="text-cyan-700 underline"
                >
                  Kapazitätsplanung mit endlichen Kapazitäten
                </Link>{' '}
                für variantenreiche{' '}
                <Link
                  href={Routes.JobShopScheduling}
                  className="text-cyan-700 underline"
                >
                  Werkstattfertigung
                </Link>{' '}
                und diskrete Fertigung. Es bildet Maschinen, Arbeitsplatzgruppen,
                echte Alternativressourcen, reihenfolgeabhängige Rüstmatrizen
                und Mitarbeiterqualifikationen ab und erzeugt daraus eine
                Feinplanung, die die Fertigung umsetzen kann, und einen
                Liefertermin, den der Vertrieb zusagen kann.
                Was-wäre-wenn-Szenarien zeigen vor der Freigabe, was ein Eilauftrag, ein
                Maschinenausfall oder eine zusätzliche Schicht im
                Mehrschichtbetrieb für alle anderen Termine bedeutet.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Vorwärts- und Rückwärtsterminierung mit endlichen Kapazitäten',
                  'Engpassorientierte Planung nach Theory of Constraints um die Engpassmaschinen',
                  'Reihenfolgeabhängige Rüstmatrix mit Rüstfamilien (Rüstzeitoptimierung)',
                  'Parallele Arbeitsplätze, echte Alternativressourcen und Arbeitsplatzgruppen',
                  'Mitarbeiterqualifikationen, Zertifizierungen und Schichtpläne als Restriktionen',
                  'Zweistufiger Planungsoptimierer mit Google OR-Tools CP-SAT',
                  'ERP-Anbindung über Excel, CSV und Datenbank-Import/-Export',
                  'Installation auf Ihren eigenen Windows-Systemen; einmalige, unbefristete Kauflizenz'
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <CheckCircle className="size-4 shrink-0 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Deployment, ERP, Support, Pricing Section */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                Installation, ERP-Anbindung und Support im DACH-Raum
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Bei Ihnen im Haus',
                    label:
                      'Installierte Windows-Anwendung auf .NET 8, SQLite als Einzelplatz oder SQL Server im Mehrplatzbetrieb. Produktionsdaten bleiben auf Ihrem eigenen Server in Ihrem Netzwerk; nichts wird im Ausland gehostet.',
                    company: 'Installation und Datenhaltung'
                  },
                  {
                    metric: 'SAP B1, BC, abas',
                    label:
                      'SAP Business One und S/4HANA, Dynamics 365 Business Central, abas, proALPHA, Infor, Sage und Odoo über Excel, CSV oder Datenbank-Import/-Export.',
                    company: 'ERP-Anbindung'
                  },
                  {
                    metric: 'MEZ / MESZ',
                    label:
                      'Einführung und Support per Fernzugriff aus Michigan (Eastern Time), terminiert am deutschen Nachmittag. Fünftägiges Einführungsprogramm, in englischer Sprache.',
                    company: 'Zeitzone und Support'
                  },
                  {
                    metric: 'Einmalig',
                    label:
                      'Unbefristete Kauflizenz, Listenpreis in USD (25.000 APS, 35.000 Complete). Kein Abonnement, keine Gebühren pro Benutzer. Angebot in Euro auf Anfrage.',
                    company: 'Preismodell'
                  }
                ].map((result) => (
                  <div
                    key={result.company}
                    className="rounded-lg border bg-white p-6 text-center"
                  >
                    <p className="mb-2 text-2xl font-bold text-cyan-600">
                      {result.metric}
                    </p>
                    <p className="mb-2 text-sm text-gray-700">{result.label}</p>
                    <p className="text-xs font-medium text-slate-500">
                      {result.company}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-gray-600">
                Alle Details auf der{' '}
                <Link
                  href={Routes.Pricing}
                  className="text-cyan-700 underline"
                >
                  Preisseite
                </Link>{' '}
                und der Seite zur{' '}
                <Link
                  href={Routes.EdgebicErpIntegration}
                  className="text-cyan-700 underline"
                >
                  ERP-Anbindung
                </Link>
                . EU-weite Abdeckung auf der{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareEurope}
                  className="text-cyan-700 underline"
                >
                  Europa-Seite
                </Link>
                ; diese Seite in englischer Sprache:{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareGermany}
                  className="text-cyan-700 underline"
                >
                  Production Scheduling Software Germany
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Competitor Comparison Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl space-y-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                EDGEBIC im Vergleich zu den APS-Anbietern auf deutschen
                Shortlists
              </h2>
              <p className="leading-relaxed text-gray-700">
                Eine ehrliche Einordnung: Jedes dieser Werkzeuge ist für
                bestimmte Betriebe die richtige Wahl. EDGEBIC ist die richtige
                Wahl für einen Mittelstandsbetrieb, der eine echte Feinplanung
                mit endlichen Kapazitäten will, auf eigenen Systemen, innerhalb
                einer Woche produktiv, ohne Abonnement. Detaillierte
                Gegenüberstellungen finden Sie im{' '}
                <Link
                  href={Routes.CompareProducts}
                  className="text-cyan-700 underline"
                >
                  Produktvergleich
                </Link>
                .
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {REGIONAL_COMPETITORS.map((competitor) => (
                  <div
                    key={competitor.name}
                    className="rounded-lg border bg-white p-6"
                  >
                    <p className="mb-1 text-lg font-semibold text-slate-900">
                      {competitor.name}
                    </p>
                    <p className="mb-3 text-xs font-medium text-slate-500">
                      {competitor.origin}
                    </p>
                    <p className="text-sm text-gray-700">{competitor.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Häufige Fragen: EDGEBIC in Deutschland, Österreich und der Schweiz
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                >
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>

      {/* Success Stories */}
      <IndustrySuccessStories
        industryTags={['Heavy Industry', 'Job Shop', 'Electronics']}
        title="Fertigungsbetriebe, die EDGEBIC und seine Vorgänger einsetzen"
        subtitle="Kunden aus Schwerindustrie, Werkstattfertigung und Elektronik planen ihre Kapazitäten mit Software von User Solutions."
      />

      <RelatedSolutions currentPath={Routes.FiniteCapacityScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            EDGEBIC mit Ihren eigenen Arbeitsplänen erleben
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Vereinbaren Sie eine Online-Demo zu MEZ-Zeiten mit Ihren eigenen
            Arbeitsplänen und offenen Aufträgen, oder laden Sie die kostenlose
            Testversion herunter und erstellen Sie noch heute eine Feinplanung
            mit endlichen Kapazitäten auf Ihren eigenen Systemen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={Routes.Contact}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
            >
              Online-Demo vereinbaren
            </Link>
            <Link
              href={Routes.ProductDownloads}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Kostenlose Testversion herunterladen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
