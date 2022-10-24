import { App } from 'vue'
import Avatar from './avatar'
import './index.less'

Avatar.install = (app: App) => {
    app.component(Avatar.name, Avatar)
}

export {
    Avatar
}
export default Avatar
