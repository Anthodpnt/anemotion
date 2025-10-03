import Mask from '@layout/Mask'
import Section from '@layout/Section'
import Slide from '@layout/Slide'
import Image from '@components/Image'

import s from './SectionCompare.module.scss'

const SectionCompare = ({ title, left, right }) => {
  return (
    <Section>
      <Slide>
        {title && <h2 className={s.title} dangerouslySetInnerHTML={{ __html: title }} />}

        <div className={s.compare}>
          <Mask className={s.leftSide}>
            <Image {...left} />
          </Mask>
          <Mask className={s.rightSide}>
            <Image {...right} />
          </Mask>
        </div>
      </Slide>
    </Section>
  )
}

export default SectionCompare
