import { useCallback, useState } from "react";
import "./App.css";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TECHNOS } from "@/lib/tech-icons";

/* ────────────────────────────────────────────────────────────
   Contenu
   ──────────────────────────────────────────────────────────── */

const SECTIONS = [
  { id: "projets", titre: "Projets" },
  { id: "stack", titre: "Stack" },
  { id: "parcours", titre: "Parcours" },
  { id: "contact", titre: "Contact" },
];

type Projet = {
  titre: string;
  organisation: string;
  periode: string;
  resume: string;
  points: string[];
  stack: string[];
  statut: string;
  codeSource: string;
  lien?: { href: string; texte: string };
};

const PROJETS: Projet[] = [
  {
    titre: "Plateforme de santé",
    organisation: "Famille Santé",
    periode: "2024 – 2026",
    resume:
      "Plateforme web pour des professionnels de santé, construite en stage puis en alternance.",
    points: [
      "API REST NestJS et modélisation du schéma PostgreSQL",
      "Chiffrement des données patients avec Seald",
      "Composants React réutilisables intégrés au produit",
      "Maquettes Figma travaillées avec l'équipe produit",
    ],
    stack: ["NestJS", "PostgreSQL", "React", "TypeScript", "Docker", "Seald"],
    statut: "En production",
    codeSource: "Non public, projet d'entreprise",
  },
  {
    titre: "Micro-DSP, moteur d'enchères",
    organisation: "Summer School Teads",
    periode: "Juillet 2026",
    resume:
      "Service d'enchères publicitaires en temps réel, construit en équipe autour d'une seule contrainte : rendre une enchère en moins de 100 ms.",
    points: [
      "Boucle de Real-Time Bidding de bout en bout",
      "Cache Redis sur les enchères chaudes",
      "Indexation et requêtage PostgreSQL optimisés",
    ],
    stack: ["Redis", "PostgreSQL", "RTB"],
    statut: "Projet d'équipe, terminé",
    codeSource: "Non public, projet d'équipe",
  },
  {
    titre: "GarageApp v2",
    organisation: "Projet personnel",
    periode: "En cours",
    resume:
      "Reprise d'une application de gestion de garage en PHP MVC, remontée sur une architecture actuelle.",
    points: [
      "Version historique en PHP MVC, servie en local",
      "API Laravel, en cours",
      "Interface React, Vite et TypeScript, en cours",
      "Migration de la base vers PostgreSQL, à venir",
    ],
    stack: ["Laravel", "PHP", "React", "Vite", "PostgreSQL"],
    statut: "Migration en cours",
    codeSource: "Dépôt public",
    lien: { href: "https://github.com/Skowzy/GarageApp", texte: "Voir le dépôt sur GitHub" },
  },
];

const AUTRES_TECHNOS = ["TypeScript", "Next.js", "Node.js", "Laravel", "Redis", "Seald"];

const PARCOURS = [
  {
    periode: "2025 – 2026",
    titre: "Développeur fullstack, en alternance",
    organisation: "Famille Santé",
    mention: "Titre professionnel niveau 6",
    resume:
      "Conception de l'API REST NestJS et modélisation de la base PostgreSQL de la plateforme, au rythme des besoins métier.",
    points: [
      "Intégration de Seald pour chiffrer les données patients",
      "Maquettage des interfaces sur Figma avec l'équipe produit",
      "Développement de composants React réutilisables",
    ],
    stack: ["NestJS", "PostgreSQL", "Seald", "React", "Figma"],
  },
  {
    periode: "2024 – 2025",
    titre: "Développeur fullstack, en stage",
    organisation: "Famille Santé",
    mention: "Titre professionnel niveau 5",
    resume:
      "Première contribution à la plateforme de santé, côté interface puis côté environnements de développement.",
    points: [
      "Interfaces responsives en Next.js, TypeScript et Tailwind CSS",
      "Conteneurisation des environnements avec Docker",
      "Structuration du back-end en programmation orientée objet",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Docker"],
  },
  {
    periode: "Avant 2024",
    titre: "Avant le développement",
    organisation: "Reconversion professionnelle",
    mention: "",
    resume:
      "BTSA Gestion et maîtrise de l'eau, puis plusieurs années en logistique et comme technicien réseaux d'eau, avant de me reconvertir vers le développement web.",
    points: [],
    stack: [],
  },
];

const EMAIL = "trullu.sebastien@gmail.com";
const TELEPHONE = "06 56 88 38 18";
const GITHUB = "https://github.com/Skowzy";
const LINKEDIN = "https://www.linkedin.com/in/s%C3%A9bastien-trullu";

/* ────────────────────────────────────────────────────────────
   Éléments partagés
   ──────────────────────────────────────────────────────────── */

function TitreSection({ titre, intro }: { titre: string; intro: string }) {
  return (
    <div className="flex max-w-2xl flex-col gap-space-sm">
      <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface">{titre}</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant">{intro}</p>
    </div>
  );
}

function LienExterne({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="font-body-md text-body-md text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
    >
      {children}
    </a>
  );
}

function App() {
  const [copieLabel, setCopieLabel] = useState("Copier");

  const copierEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopieLabel("Copié");
    } catch {
      setCopieLabel("Copie impossible");
    }
    setTimeout(() => setCopieLabel("Copier"), 2000);
  }, []);

  return (
    <>
      <a
        href="#projets"
        className="sr-only focus:not-sr-only focus:absolute focus:left-space-md focus:top-space-md focus:z-[60] focus:rounded-md focus:bg-primary focus:px-space-sm focus:py-space-xs focus:font-display focus:text-body-sm focus:text-on-primary"
      >
        Aller au contenu
      </a>

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-max-content-width items-center justify-between gap-space-md px-gutter-mobile lg:px-gutter-desktop">
          <a href="#" className="font-display text-body-md font-semibold tracking-tight text-on-surface">
            Sébastien Trullu
          </a>
          <nav aria-label="Sections du site">
            <ul className="flex items-center gap-space-2xs sm:gap-space-xs">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex h-8 items-center rounded-md px-space-xs font-display text-body-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface sm:px-space-sm"
                  >
                    {s.titre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-max-content-width px-gutter-mobile lg:px-gutter-desktop">
        {/* ─── Hero ─── */}
        <section className="flex flex-col items-start gap-space-lg pb-space-4xl pt-space-3xl lg:pt-space-4xl">
          <Badge
            variant="outline"
            className="h-auto gap-space-xs rounded-full border-outline-variant bg-surface-container px-space-sm py-1 text-on-surface-variant"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="font-micro-badge text-micro-badge uppercase">Disponible immédiatement</span>
          </Badge>

          <h1 className="max-w-[18ch] text-balance font-display text-display-mobile lg:text-display text-on-surface">
            Je suis Sébastien Trullu, développeur web fullstack.
          </h1>

          <p className="max-w-[60ch] font-body-lg text-body-lg text-on-surface-variant">
            Je conçois des API NestJS et des interfaces React, avec une attention particulière portée à la
            sécurité des données. Un an et demi chez Famille Santé, sur une plateforme de santé dont les
            dossiers patients sont chiffrés de bout en bout.
          </p>

          <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
            <a
              href="#projets"
              className="inline-flex h-10 items-center rounded-lg bg-primary px-space-md font-display text-body-sm font-semibold text-on-primary transition-colors hover:bg-primary-fixed"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="inline-flex h-10 items-center rounded-lg border border-outline-variant bg-surface-container px-space-md font-display text-body-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high"
            >
              Me contacter
            </a>
          </div>

          <dl className="flex flex-wrap items-center gap-x-space-xl gap-y-space-sm pt-space-md">
            {[
              { label: "Recherche", valeur: "CDI ou CDD" },
              { label: "Lieu", valeur: "Montpellier et périphérie" },
              { label: "Expérience", valeur: "1 an et demi en entreprise" },
            ].map((m) => (
              <div key={m.label} className="flex items-baseline gap-space-xs">
                <dt className="font-micro-badge text-micro-badge uppercase text-on-surface-variant">{m.label}</dt>
                <dd className="font-body-md text-body-md text-on-surface">{m.valeur}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Separator className="bg-outline-variant" />

        {/* ─── Projets ─── */}
        <section id="projets" className="scroll-mt-20 py-space-4xl">
          <div className="flex flex-wrap items-start justify-between gap-space-md">
            <TitreSection
              titre="Projets"
              intro="Trois projets menés en entreprise, en équipe et en autonomie. Les deux premiers sont sous accord de confidentialité."
            />
            <div className="pt-space-2xs">
              <LienExterne href={GITHUB}>github.com/Skowzy</LienExterne>
            </div>
          </div>

          <div className="mt-space-2xl grid gap-space-lg lg:grid-cols-3">
            {PROJETS.map((p) => (
              <Card
                key={p.titre}
                className="flex flex-col gap-space-md border-outline-variant bg-surface-container-high py-space-md"
              >
                <CardHeader className="gap-space-2xs px-space-md">
                  <div className="flex items-baseline justify-between gap-space-sm">
                    <span className="font-micro-badge text-micro-badge uppercase text-on-surface-variant">
                      {p.periode}
                    </span>
                    <span className="font-micro-badge text-micro-badge text-primary">{p.statut}</span>
                  </div>
                  <CardTitle className="font-headline-sm text-headline-sm text-on-surface">{p.titre}</CardTitle>
                  <CardDescription className="font-body-sm text-body-sm text-on-surface-variant">
                    {p.organisation}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-space-sm px-space-md">
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{p.resume}</p>

                  <ul className="flex flex-col gap-space-2xs">
                    {p.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface before:mt-[0.55em] before:size-1 before:shrink-0 before:rounded-full before:bg-outline before:content-['']"
                      >
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-space-xs pt-space-sm">
                    <div className="flex flex-wrap gap-space-2xs">
                      {p.stack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="rounded-md bg-surface-variant font-body-sm text-body-sm font-normal text-on-surface-variant"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {p.lien ? (
                      <LienExterne href={p.lien.href}>{p.lien.texte}</LienExterne>
                    ) : (
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{p.codeSource}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="bg-outline-variant" />

        {/* ─── Stack ─── */}
        <section id="stack" className="scroll-mt-20 py-space-4xl">
          <TitreSection
            titre="Stack"
            intro="Les technologies que j'utilise au quotidien, en entreprise comme sur mes projets."
          />

          <ul className="mt-space-2xl grid grid-cols-3 gap-space-xs sm:gap-space-sm md:grid-cols-4 lg:grid-cols-5">
            {TECHNOS.map((techno) => (
              <li key={techno.nom}>
                {/* La couleur de marque n'apparaît qu'au survol : au repos la
                    grille reste monochrome, comme le reste de la page. */}
                <div
                  style={{ "--brand": techno.couleur } as React.CSSProperties}
                  className="group flex h-full flex-col items-center justify-center gap-space-sm rounded-lg border border-outline-variant bg-surface-container px-space-xs py-space-md transition-colors hover:border-outline sm:px-space-sm sm:py-space-lg"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-7 fill-current text-on-surface-variant transition-colors group-hover:text-[var(--brand)]"
                  >
                    <path d={techno.path} />
                  </svg>
                  <span className="text-center font-display text-body-sm font-medium text-on-surface">
                    {techno.nom}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-space-lg font-body-md text-body-md text-on-surface-variant">
            Également en pratique : {AUTRES_TECHNOS.join(", ")}.
          </p>
        </section>

        {/* ─── Parcours ─── */}
        <section id="parcours" className="scroll-mt-20 py-space-4xl">
          <TitreSection
            titre="Parcours"
            intro="Une reconversion vers le développement web, formée en alternance et confirmée en entreprise."
          />

          <ol className="mt-space-2xl flex flex-col gap-space-lg">
            {PARCOURS.map((etape) => (
              <li key={etape.periode} className="grid gap-space-sm lg:grid-cols-[10rem_1fr] lg:gap-space-lg">
                <span className="pt-space-lg font-micro-badge text-micro-badge uppercase text-on-surface-variant">
                  {etape.periode}
                </span>
                <Card className="gap-space-md border-outline-variant bg-surface-container py-space-lg">
                  <CardHeader className="gap-space-2xs px-space-lg">
                    <CardTitle className="font-headline-sm text-headline-sm text-on-surface">
                      {etape.titre}
                    </CardTitle>
                    <CardDescription className="font-body-sm text-body-sm text-on-surface-variant">
                      {etape.organisation}
                      {etape.mention && ` · ${etape.mention}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-space-md px-space-lg">
                    <p className="max-w-[70ch] font-body-md text-body-md text-on-surface-variant">
                      {etape.resume}
                    </p>
                    {etape.points.length > 0 && (
                      <ul className="flex flex-col gap-space-xs">
                        {etape.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface before:mt-[0.55em] before:size-1 before:shrink-0 before:rounded-full before:bg-outline before:content-['']"
                          >
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {etape.stack.length > 0 && (
                      <div className="flex flex-wrap gap-space-2xs">
                        {etape.stack.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="rounded-md bg-surface-variant font-body-sm text-body-sm font-normal text-on-surface-variant"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        <Separator className="bg-outline-variant" />

        {/* ─── Contact ─── */}
        <section id="contact" className="scroll-mt-20 py-space-4xl">
          <TitreSection
            titre="Contact"
            intro="Écrivez-moi ou appelez-moi, je suis disponible immédiatement pour un CDI ou un CDD."
          />

          <Card className="mt-space-2xl border-outline-variant bg-surface-container-high py-space-xl">
            <CardContent className="grid gap-space-lg px-space-xl sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-space-2xs">
                <span className="font-micro-badge text-micro-badge uppercase text-on-surface-variant">Email</span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-display text-body-md font-medium break-all text-on-surface transition-colors hover:text-primary"
                >
                  {EMAIL}
                </a>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={copierEmail}
                  className="-ml-space-xs self-start font-display text-body-sm text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
                >
                  {copieLabel}
                </Button>
              </div>

              <div className="flex flex-col gap-space-2xs">
                <span className="font-micro-badge text-micro-badge uppercase text-on-surface-variant">
                  Téléphone
                </span>
                <a
                  href="tel:+33656883818"
                  className="font-display text-body-md font-medium text-on-surface transition-colors hover:text-primary"
                >
                  {TELEPHONE}
                </a>
              </div>

              <div className="flex flex-col gap-space-2xs">
                <span className="font-micro-badge text-micro-badge uppercase text-on-surface-variant">
                  En ligne
                </span>
                <LienExterne href={GITHUB}>github.com/Skowzy</LienExterne>
                <LienExterne href={LINKEDIN}>LinkedIn</LienExterne>
              </div>

              <div className="flex flex-col gap-space-2xs">
                <span className="font-micro-badge text-micro-badge uppercase text-on-surface-variant">
                  Disponibilité
                </span>
                <span className="font-display text-body-md font-medium text-on-surface">
                  Immédiate, CDI ou CDD
                </span>
              </div>

              <div className="flex flex-col gap-space-2xs">
                <span className="font-micro-badge text-micro-badge uppercase text-on-surface-variant">
                  Mobilité
                </span>
                <span className="font-display text-body-md font-medium text-on-surface">
                  Montpellier et périphérie, permis B et véhicule
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}

export default App;
