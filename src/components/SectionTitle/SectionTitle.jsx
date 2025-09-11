import Container from '@/components/Container'

import s from './SectionTitle.module.scss'

const SectionTitle = ({ title, subtitle }) => {
  return (
    <section className={s.section}>
      <Container className={s.container}>
        <header className={s.header}>
          <h2 className={s.title}>{title}</h2>
          {subtitle && <p className={s.subtitle}>{subtitle}</p>}
        </header>
      </Container>
    </section>
  )
}

export default SectionTitle
