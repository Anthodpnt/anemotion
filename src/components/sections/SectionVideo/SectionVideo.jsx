import Section from '@layout/Section'
import Slide from '@layout/Slide'
import Player from '@components/Player'

import s from './SectionVideo.module.scss'

const SectionVideo = ({ src, cover, title, caption }) => {
  return (
    <Section>
      <Slide className={s.grid}>
        <div className={s.content}>
          {title && <h2 className={s.title}>{title}</h2>}
          <Player src={src} cover={cover} caption={caption} />
        </div>
      </Slide>
    </Section>
  )
}
export default SectionVideo
