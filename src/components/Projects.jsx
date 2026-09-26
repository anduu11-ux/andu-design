import { ArrowUpRight, BookOpen, Images, Languages, Mail, Users } from 'lucide-react'
import homeShot from '../assets/mc-fiduciaire/home.webp'
import teamShot from '../assets/mc-fiduciaire/team.webp'
import infoShot from '../assets/mc-fiduciaire/info.webp'
import contactShot from '../assets/mc-fiduciaire/contact.webp'

const projects = [
  {
    label: 'Our first project',
    name: 'MC Fiduciaire',
    domain: 'mc-fiduciaire.be',
    href: 'https://mc-fiduciaire.be',
    summary:
      'An accounting firm with 500+ clients. We built the website that welcomes each of them in their own language and puts a face on the people behind the numbers.',
    features: [
      {
        icon: Languages,
        title: '7-language switcher',
        text: 'Visitors switch between 7 languages in one click.',
        chips: ['Română', 'Français', 'English', 'Nederlands', 'Português', 'Русский', 'Українська'],
      },
      {
        icon: Images,
        title: 'Hero photo carousel',
        text: 'A carousel of photos on the hero gives the firm a face from the first second.',
        image: homeShot,
        alt: 'MC Fiduciaire homepage with a photo carousel of the team in the hero',
      },
      {
        icon: Users,
        title: 'Our team page',
        text: 'A round portrait of every accountant, so clients know who they’re talking to.',
        image: teamShot,
        alt: 'MC Fiduciaire team page with a round portrait of each accountant',
      },
      {
        icon: BookOpen,
        title: 'Useful information',
        text: 'A page sorted by category, built around the most popular Belgian domains.',
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
]

export default function Projects() {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="projects__intro">
        <h2 id="projects-title">Proof, <span>not promises.</span></h2>
        <p>Every project starts with a real business and a real problem. Here’s the first one.</p>
      </div>

      {projects.map(({ label, name, domain, href, summary, features }) => (
        <article key={name} className="project-card">
          <header className="project-card__header">
            <div>
              <p className="project-card__label">{label}</p>
              <h3>{name}</h3>
            </div>
            <a href={href} target="_blank" rel="noreferrer" className="project-card__link">
              {domain}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </header>

          <p className="project-card__summary">{summary}</p>

          <ul className="project-card__features">
            {features.map(({ icon: Icon, title, text, image, alt, chips }) => (
              <li key={title} className={chips ? 'project-card__feature--wide' : undefined}>
                {image && <img src={image} alt={alt} width="1280" height="800" loading="lazy" />}
                <h4>
                  <Icon size={20} aria-hidden="true" />
                  {title}
                </h4>
                <p>{text}</p>
                {chips && (
                  <ul className="project-card__chips">
                    {chips.map((chip) => (
                      <li key={chip}>{chip}</li>
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
