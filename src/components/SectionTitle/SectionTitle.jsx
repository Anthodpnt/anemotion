import Container from '@/components/Container'

import s from './SectionTitle.module.scss'

const SectionTitle = ({ title, subtitle }) => {
  return (
    <section className={s.section}>
      <Container>
        <h2 className={s.title}>{title}</h2>
        {subtitle && <p className={s.subtitle}>{subtitle}</p>}
      </Container>
    </section>
  )
}

export default SectionTitle
