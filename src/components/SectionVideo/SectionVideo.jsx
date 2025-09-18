import Container from '@/components/Container'
import Video from '@/components/Video'

import s from './SectionVideo.module.scss'

const SectionVideo = ({ src, cover, title, caption }) => {
  return (
    <section className={s.section}>
      <Container className={s.container}>
        <div className={s.content}>
          {title && <h2 className={s.title}>{title}</h2>}
          <Video src={src} cover={cover} caption={caption} className={s.video} />
        </div>
      </Container>
    </section>
  )
}
export default SectionVideo
