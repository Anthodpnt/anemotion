import Container from '@/components/Container'
import Image from '@/components/Image'

import s from './SectionCompare.module.scss'

const SectionCompare = ({ title, left, right }) => {
  return (
    <section className={s.section}>
      <Container className={s.container}>
        <div className={s.content}>
          {title && <h2 className={s.title}>{title}</h2>}

          <div className={s.compare}>
            <div className={s.leftSide} data-scroll data-scroll-speed="0.1">
              <Image {...left} />
            </div>
            <div className={s.rightSide} data-scroll data-scroll-speed="0.2">
              <Image {...right} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SectionCompare
