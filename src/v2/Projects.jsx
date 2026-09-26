import { ArrowUpRight, BookOpen, Hammer, Images, Languages, LayoutGrid, ListPlus, Mail, Phone, Users } from 'lucide-react'
import teamShot from '../assets/mc-fiduciaire/team.webp'
import infoShot from '../assets/mc-fiduciaire/info.webp'
import contactShot from '../assets/mc-fiduciaire/contact.webp'
import egmaHomeShot from '../assets/egma-construction/home.webp'
import egmaPavingShot from '../assets/egma-construction/paving.webp'
import egmaPhotoShot from '../assets/egma-construction/photo-viewer.webp'

// a fact only the studio can give: the value, or a loud yellow placeholder until it's filled in
const Fill = ({ value, hint }) => value ?? <mark>[{hint}]</mark>

const projects = [
  {
    name: 'MC Fiduciaire',
    domain: 'mc-fiduciaire.be',
    href: 'https://mc-fiduciaire.be',
    summary:
      'An accounting firm with 500+ clients. We built the website that welcomes each of them in their own language and puts a face on the people behind the numbers.',
    // ponytail: a real quote from the client, used with their OK; nulls render as placeholders
    quote: { text: null, name: null, role: null },
    features: [
      {
        icon: Languages,
        title: '7-language switcher',
        text: 'Visitors switch between 7 languages in one click.',
        // lang lets screen readers pronounce each name in its own language
        languages: [
          ['ro', 'Română'],
          ['fr', 'Français'],
          ['en', 'English'],
          ['nl', 'Nederlands'],
          ['pt', 'Português'],
          ['ru', 'Русский'],
          ['uk', 'Українська'],
        ],
      },
      {
        icon: Images,
        title: 'Team photos on the homepage',
        text: 'A carousel of team photos opens the homepage you saw at the top of this page, so the firm has a face from the first second.',
      },
      {
        icon: Users,
        title: 'The firm’s team page',
        text: 'A round portrait of every accountant, so clients know who they’re talking to.',
        image: teamShot,
        alt: 'MC Fiduciaire team page with a round portrait of each accountant',
        wide: true,
      },
      {
        icon: BookOpen,
        title: 'Guides sorted by topic',
        text: 'A resources page built around the most popular Belgian business subjects, like going self-employed or starting a company.',
        image: infoShot,
        alt: 'MC Fiduciaire resources page with category filters and guides',
      },
      {
        icon: Mail,
        title: 'Contact form, straight to email',
        text: 'Name, phone, subject and message land directly in the firm’s inbox, with privacy consent built in.',
        image: contactShot,
        alt: 'MC Fiduciaire contact page with the contact form',
      },
    ],
  },
  {
    name: 'EGMA Construction',
    domain: 'egmaconstruction.be',
    href: 'https://egmaconstruction.be',
    summary:
      'A renovation contractor in Booischot that covers twelve trades. We built the website that shows the work trade by trade and makes a phone call the first step.',
    quote: { text: null, name: null, role: null },
    features: [
      {
        icon: Hammer,
        title: 'Twelve trades on one page',
        text: 'Screed, plastering, painting, bathrooms, groundwork, roofing, paving, terraces, lawns, fencing, windows and doors, and electrics, each in one plain sentence, grouped into inside, outside and structural work.',
      },
      {
        icon: ListPlus,
        title: 'New jobs go up as they finish',
        text: 'The gallery reads from one list, so adding a finished job takes one short entry and its photos.',
      },
      {
        icon: LayoutGrid,
        title: 'Projects sorted by trade',
        text: 'Each trade opens into its jobs, every one with real photos from the site. Paving alone has thirteen.',
        image: egmaPavingShot,
        alt: 'EGMA Construction projects page opened on paving: driveway jobs, each with its own photos',
        wide: true,
      },
      {
        icon: Phone,
        title: 'Call first',
        text: 'The phone number is the main button, next to a finished bathroom on the first screen, so a visitor reaches the person doing the work.',
        image: egmaHomeShot,
        alt: 'EGMA Construction homepage: the headline next to a photo of a finished bathroom, with the call button below it',
      },
      {
        icon: Images,
        title: 'Every job, photo by photo',
        text: 'A job opens in a photo viewer with arrows and a count, so a homeowner can look at the work up close.',
        image: egmaPhotoShot,
        alt: 'A paved driveway by EGMA Construction in the project photo viewer, photo 1 of 6',
      },
    ],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="projects__intro">
        <h2 id="projects-title">Proof, <span>not promises.</span></h2>
        <p>Every project starts with a real business and a real problem. Here are two.</p>
      </div>

      {projects.map(({ name, domain, href, summary, quote, features }) => (
        <article key={name} className="project-card">
          <header className="project-card__header">
            <h3>{name}</h3>
            <a href={href} target="_blank" rel="noreferrer" className="project-card__link">
              {domain}
              <span className="sr-only"> (opens in a new tab)</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </header>

          <p className="project-card__summary">{summary}</p>

          <figure className="project-quote">
            <blockquote>
              <p><Fill value={quote.text} hint={`A sentence or two from ${name} about working with you`} /></p>
            </blockquote>
            <figcaption>
              <Fill value={quote.name} hint="name" />, <Fill value={quote.role} hint="role" />, {name}
            </figcaption>
          </figure>

          <ul className="project-card__features">
            {features.map(({ icon: Icon, title, text, image, alt, languages, wide }) => (
              <li key={title} className={wide ? 'feature--wide' : undefined}>
                {image && <img className="shot" src={image} alt={alt} width="1280" height="800" loading="lazy" />}
                <h4>
                  <Icon size={20} aria-hidden="true" />
                  {title}
                </h4>
                <p>{text}</p>
                {languages && (
                  <ul className="project-card__languages">
                    {languages.map(([code, label]) => (
                      <li key={code} lang={code}>{label}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}
