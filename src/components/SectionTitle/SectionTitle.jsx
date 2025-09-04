import Container from '@/components/Container'

import s from './SectionTitle.module.scss'

const SectionTitle = ({ title, subtitle }) => {
  return (
    <section className={s.section}>
      <Container>
        <h2
          className={s.title}
          data-scroll
          data-scroll-repeat
          data-scroll-position="middle,middle"
          data-scroll-css-progress
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={s.subtitle}
            data-scroll
            data-scroll-repeat
            data-scroll-position="middle,middle"
            data-scroll-css-progress
          >
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  )
}

export default SectionTitle
