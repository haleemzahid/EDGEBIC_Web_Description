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

const SELF_URL = `${getBaseUrl()}/logiciel-ordonnancement-production`;
const ENGLISH_URL = `${getBaseUrl()}/production-scheduling-software-france`;

const baseMetadata = createPageMetadata({
  title: "Logiciel d'ordonnancement de production à capacité finie | EDGEBIC",
  description:
    "EDGEBIC, logiciel d'ordonnancement de production à capacité finie pour sous-traitants aéronautiques, automobiles et ateliers d'usinage. Installé chez vous.",
  path: '/logiciel-ordonnancement-production',
  modifiedTime: '2026-08-28',
  keywords:
    "logiciel d'ordonnancement production, logiciel planification production, logiciel APS, planification capacité finie, logiciel ordonnancement atelier, logiciel ordonnancement capacité finie, planification de production à capacité finie, logiciel APS PME industrielle, ordonnancement Sage X3, ordonnancement Cegid, ordonnancement Divalto, logiciel ordonnancement décolletage, logiciel ordonnancement sous-traitance aéronautique"
});

export const metadata = {
  ...baseMetadata,
  alternates: {
    canonical: SELF_URL,
    languages: {
      fr: SELF_URL,
      en: ENGLISH_URL,
      'x-default': ENGLISH_URL
    }
  }
};

const FAQS = [
  {
    question: 'EDGEBIC est-il disponible en France ?',
    answer:
      "Oui. EDGEBIC est vendu et accompagné en France par User Solutions, Inc., éditeur basé dans le Michigan (États-Unis) qui publie des logiciels de planification à capacité finie depuis 1991. Les industriels français achètent directement auprès de l'éditeur, installent EDGEBIC sur leurs propres postes Windows et bénéficient à distance de la mise en œuvre, de la formation et du support."
  },
  {
    question: "Qu'est-ce qui distingue EDGEBIC de la planification de l'ERP ou de la GPAO ?",
    answer:
      "EDGEBIC est un logiciel d'ordonnancement, autrement dit un APS (Advanced Planning and Scheduling). Il séquence les ordres de fabrication réels sur les postes de charge réels, en tenant compte des temps de réglage et des opérateurs qualifiés, alors que l'ERP ou la GPAO planifie à capacité infinie. Le résultat est un planning que l'atelier peut exécuter et un taux de service que le commercial peut engager."
  },
  {
    question: 'Où sont stockées nos données de production ?',
    answer:
      "Sur vos propres systèmes. EDGEBIC est une application Windows installée, développée sur .NET 8, et non un service cloud hébergé. Les installations monoposte fonctionnent avec SQLite, les installations multipostes avec SQL Server sur votre propre serveur. Gammes de fabrication, ordres, capacités et données d'atelier restent dans votre réseau et sous votre juridiction, ce qui simplifie les revues de confidentialité exigées par un donneur d'ordres ou un client défense."
  },
  {
    question: "Avec quels ERP répandus en France EDGEBIC s'intègre-t-il ?",
    answer:
      "EDGEBIC s'intègre à tout système capable d'importer et d'exporter des données via Excel, CSV ou une connexion base de données. Sur le marché français, il s'agit le plus souvent de Sage X3 et Sage 100, Cegid, Divalto, SAP Business One et Microsoft Dynamics 365 Business Central. Les ordres de fabrication entrent dans EDGEBIC pour l'ordonnancement à capacité finie, et les déclarations de production reviennent vers l'ERP pour l'en-cours et le calcul des coûts."
  },
  {
    question: "Dans quelle langue sont l'interface, la documentation et le support ?",
    answer:
      "L'interface, la documentation et le support d'EDGEBIC sont en anglais. Il n'existe pas d'interface en français à ce jour. La plupart des équipes de planification et de méthodes en France l'utilisent sans difficulté : le diagramme de Gantt et le concepteur de gammes portent une grande partie de l'utilisation sans texte. Les sessions de mise en œuvre et de support sont programmées l'après-midi en France, ce qui correspond à la matinée dans le Michigan (six heures de décalage avec l'heure de Paris)."
  },
  {
    question: 'Comment EDGEBIC est-il tarifé pour les clients français ?',
    answer:
      "EDGEBIC est vendu sous licence perpétuelle, en un seul paiement, et non par abonnement. Les tarifs publics sont de 25 000 USD pour l'édition APS et de 35 000 USD pour l'édition Complete (APS plus MRP, stocks et achats), sans redevance par utilisateur. Un devis en euros est disponible sur demande. Consultez la page tarifs pour les détails à jour ou contactez-nous pour étudier votre cas."
  },
  {
    question: 'Comment EDGEBIC se positionne-t-il face à Siemens Opcenter, Asprova et Netronic ?',
    answer:
      "Siemens Opcenter APS (anciennement Preactor) et Asprova sont des APS grands comptes dont la mise en œuvre se compte en mois ; on les trouve en tête des chaînes d'approvisionnement aéronautiques et automobiles. Netronic et Just Plan It sont des planificateurs Gantt plus légers, sans matrices de réglage, sans véritables ressources alternatives ni compétences opérateurs. EDGEBIC se situe entre les deux : un ordonnancement complet à capacité finie pour un sous-traitant de taille intermédiaire, un atelier de décolletage ou un constructeur d'équipements, sur vos propres systèmes, opérationnel en cinq jours, sous licence perpétuelle."
  }
];

const REGIONAL_COMPETITORS = [
  {
    name: 'Siemens Opcenter APS (Preactor)',
    origin: 'Siemens Digital Industries',
    note: "L'APS grands comptes des filières aéronautique et automobile françaises. Très adapté à l'environnement Siemens ; mise en œuvre et licence lourdes pour un sous-traitant de taille intermédiaire."
  },
  {
    name: 'Asprova',
    origin: 'Japon',
    note: "APS haut de gamme répandu chez les équipementiers automobiles et dans les grandes usines multi-lignes. Très profond, mais tarifé et déployé comme un projet grands comptes."
  },
  {
    name: 'Netronic et Just Plan It',
    origin: 'Aix-la-Chapelle, Allemagne',
    note: "Compléments Gantt visuels pour Dynamics 365 Business Central et planificateur cloud simple pour ateliers. Moins profonds qu'EDGEBIC sur les matrices de réglage, les ressources alternatives et les compétences opérateurs."
  },
  {
    name: 'MRPeasy, Katana et PlanetTogether',
    origin: 'Estonie et États-Unis',
    note: "MRP cloud avec ordonnancement léger (MRPeasy, Katana) et APS par abonnement pour groupes multi-sites (PlanetTogether). EDGEBIC se distingue par une vraie capacité finie, des données conservées sur site et une licence perpétuelle."
  }
];

export default function LogicielOrdonnancementProductionPage(): React.JSX.Element {
  return (
    <div lang="fr">
      <IndustryPageJsonLd
        title="Logiciel d'ordonnancement de production à capacité finie"
        description="EDGEBIC, logiciel d'ordonnancement de production à capacité finie, vendu et accompagné en France pour les sous-traitants aéronautiques, les équipementiers automobiles, les ateliers d'usinage et de décolletage, le luxe et les constructeurs d'équipements industriels."
        url="/logiciel-ordonnancement-production"
        industryName="Industrie manufacturière française"
        industryDescription="Sous-traitants aéronautiques autour de Toulouse, équipementiers automobiles, ateliers d'usinage et de décolletage de Haute-Savoie, maisons de luxe et constructeurs d'équipements industriels en France, qui ordonnancent machines et opérateurs qualifiés à capacité finie."
        customerNames={['BAE Systems', 'GE', 'Cummins']}
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
                Logiciel d'ordonnancement de production à capacité finie
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] text-gray-700">
                EDGEBIC est un logiciel d'ordonnancement de production à
                capacité finie (APS) édité par User Solutions, Inc. (Michigan,
                États-Unis, fondée en 1991). Il est vendu et accompagné
                directement auprès des sous-traitants aéronautiques et
                automobiles, des ateliers d'usinage et de décolletage, et des
                constructeurs d'équipements industriels en France. Il
                s'installe sur vos propres postes Windows, fonctionne aux côtés
                de Sage X3, Cegid, Divalto et SAP Business One, et se vend sous
                licence perpétuelle plutôt que par abonnement.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-sm text-gray-600">
                L'interface, la documentation et le support sont en anglais.{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareFrance}
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
                La place d'EDGEBIC dans l'industrie française
              </h2>
              <p className="leading-relaxed text-gray-700">
                L'industrie française s'organise en filières régionales
                fortes. Autour de Toulouse et dans toute l'Occitanie, des
                centaines de sous-traitants en usinage, composites et
                assemblage alimentent des programmes aéronautiques dont les
                montées en cadence et les créneaux de livraison sont fixés par
                le donneur d'ordres. Les équipementiers automobiles des
                Hauts-de-France, du Grand Est et d'Auvergne-Rhône-Alpes
                produisent des pièces en grande diversité sous des indicateurs
                de livraison stricts. La vallée de l'Arve, en Haute-Savoie, est
                la capitale mondiale du décolletage. Les maisons de luxe et les
                constructeurs d'équipements ajoutent des affaires à la commande.
                L'ERP ou la GPAO enregistre l'ordre ; il n'ordonnance pas une
                cellule cinq axes ni un opérateur habilité rare à capacité
                finie.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {[
                  "Sous-traitants aéronautiques tenus par des montées en cadence et un taux de service audité par le donneur d'ordres",
                  'Équipementiers automobiles produisant des pièces en grande diversité sous les indicateurs de livraison des constructeurs',
                  'Ateliers de décolletage et d'usinage de précision où les temps de réglage décident de la semaine',
                  'Maisons de luxe et constructeurs d\'équipements mêlant affaires à la commande et séries répétitives',
                  "Sage X3, Cegid ou Divalto pour la gestion et les commandes, mais pas pour la séquence en atelier",
                  "Règles de confidentialité défense ou donneur d'ordres excluant un cloud d'ordonnancement hébergé à l'étranger"
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
                Ce qu'EDGEBIC apporte aux industriels français
              </h2>
              <p className="leading-relaxed text-gray-700">
                <Link
                  href={Routes.Edgebic}
                  className="text-cyan-700 underline"
                >
                  EDGEBIC
                </Link>{' '}
                est un moteur APS fondé sur la{' '}
                <Link
                  href={Routes.FiniteCapacityScheduling}
                  className="text-cyan-700 underline"
                >
                  planification à capacité finie
                </Link>{' '}
                pour la{' '}
                <Link
                  href={Routes.JobShopScheduling}
                  className="text-cyan-700 underline"
                >
                  production en atelier
                </Link>{' '}
                en grande diversité et la fabrication discrète. Il modélise les
                machines, les groupes de postes de charge, les véritables
                ressources alternatives, les matrices de temps de réglage
                dépendants de la séquence et les compétences des opérateurs,
                puis produit un planning que l'atelier peut exécuter et une
                date de livraison que le donneur d'ordres peut croire. Les
                scénarios de simulation montrent, avant validation, ce qu'une
                commande urgente, une panne machine ou une équipe
                supplémentaire en 2x8 ou 3x8 change pour toutes les autres
                dates.
              </p>
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  'Ordonnancement à capacité finie au plus tôt et au plus tard sur les machines et les opérateurs',
                  "Planification par les goulots selon la théorie des contraintes",
                  'Matrice de temps de réglage dépendants de la séquence, avec familles de réglage pour le décolletage et l\'usinage',
                  'Postes de charge parallèles, véritables ressources alternatives et groupes de postes',
                  'Compétences, habilitations et calendriers d\'équipes (2x8, 3x8) comme contraintes',
                  'Affaires et séries ordonnancées ensemble à partir d\'une seule base de données',
                  'Intégration ERP via import et export Excel, CSV et base de données',
                  'Installé sur vos propres postes Windows ; licence perpétuelle en un seul paiement'
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
                Installation, intégration et support en France
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    metric: 'Chez vous',
                    label:
                      "Application Windows installée sur .NET 8, SQLite en monoposte ou SQL Server en multiposte. Les données de production restent sur vos propres machines, sous votre juridiction ; rien n'est hébergé à l'étranger.",
                    company: 'Installation et localisation des données'
                  },
                  {
                    metric: 'Sage X3, Cegid, BC',
                    label:
                      'Sage X3 et Sage 100, Cegid, Divalto, SAP Business One et Dynamics 365 Business Central via import et export Excel, CSV ou base de données.',
                    company: 'Intégration ERP'
                  },
                  {
                    metric: 'Heure de Paris',
                    label:
                      "Mise en œuvre et support à distance depuis le Michigan (heure de l'Est), programmés l'après-midi en France. Programme de mise en œuvre en cinq jours, en anglais.",
                    company: 'Fuseau horaire et support'
                  },
                  {
                    metric: 'Un seul paiement',
                    label:
                      'Licence perpétuelle, tarif public en USD (25 000 APS, 35 000 Complete) ; devis en euros sur demande. Pas d\'abonnement, pas de redevance par utilisateur.',
                    company: 'Modèle tarifaire'
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
                Tous les détails sur la{' '}
                <Link
                  href={Routes.Pricing}
                  className="text-cyan-700 underline"
                >
                  page tarifs
                </Link>{' '}
                et la page{' '}
                <Link
                  href={Routes.EdgebicErpIntegration}
                  className="text-cyan-700 underline"
                >
                  intégration ERP
                </Link>
                . Couverture européenne sur la{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareEurope}
                  className="text-cyan-700 underline"
                >
                  page Europe
                </Link>
                ; cette page en anglais :{' '}
                <Link
                  href={Routes.ProductionSchedulingSoftwareFrance}
                  className="text-cyan-700 underline"
                >
                  Production Scheduling Software France
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
                EDGEBIC face aux éditeurs APS présélectionnés par les
                industriels français
              </h2>
              <p className="leading-relaxed text-gray-700">
                Un point de vue honnête : chacun de ces outils est la bonne
                réponse pour quelqu'un. EDGEBIC est la bonne réponse pour un
                sous-traitant ou un constructeur d'équipements qui veut un vrai
                ordonnancement à capacité finie, sur ses propres systèmes,
                opérationnel en une semaine, sans abonnement. Les comparatifs
                détaillés sont sur le{' '}
                <Link
                  href={Routes.CompareProducts}
                  className="text-cyan-700 underline"
                >
                  comparateur de produits
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
              Questions fréquentes : EDGEBIC en France
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
        industryTags={['Defense', 'Job Shop', 'Heavy Industry']}
        title="Industriels qui utilisent EDGEBIC et ses prédécesseurs"
        subtitle="Clients de l'aéronautique, de la défense, de la production en atelier et de l'industrie lourde qui ordonnancent à capacité finie avec les logiciels User Solutions."
      />

      <RelatedSolutions currentPath={Routes.FiniteCapacityScheduling} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">
            Voir EDGEBIC ordonnancer votre atelier
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Réservez une démonstration à distance aux heures de Paris avec vos
            propres gammes de fabrication et vos ordres en cours, ou téléchargez
            la version d'essai gratuite et lancez dès aujourd'hui un
            ordonnancement à capacité finie sur vos propres systèmes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={Routes.Contact}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-700"
            >
              Réserver une démonstration
            </Link>
            <Link
              href={Routes.ProductDownloads}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Télécharger la version d'essai
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
