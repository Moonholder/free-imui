import { defineComponent } from "vue";
import { Message } from "./types";
import { formatByte } from '../utils'
export default defineComponent({
    name: 'free-message-file',
    setup(_, { attrs }) {

        const onClick = ({ content }: Message) => {
            window.open(content, '_blank')
        }

        return () => {
            return (
                <free-message-template
                    class="free-message-file"
                    v-slots={{
                        content: (props: Message) => [
                            <div class="free-message-file__content" onClick={_ => onClick(props)}>
                                <div class="free-message-file__inner">
                                    <p class="free-message-file__name">{ props.fileName }</p>
                                    <p class="free-message-file__size">{ props.fileSize && formatByte(props.fileSize) }</p>
                                </div>
                                <i class="free-icon-file"></i>
                            </div>
                        ]
                    }}
                    { ...attrs }
                />
            )
        }
    }
})