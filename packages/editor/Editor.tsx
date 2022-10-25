import { defineComponent, ref, unref } from "vue";
import { makeObjectProp, formatByte } from '../utils'
import { Contact } from '../index'
import Emoji from "./Emoji";

const command = (command: string, val?: any) => {
    document.execCommand(command, false, val);
}

const editorProps = {
    contact: makeObjectProp<Contact>(),
}

export default defineComponent({
    name: 'free-editor',
    props: editorProps,
    emits: ['send', 'upload'],
    setup(props, { emit }) {
        const textarea = ref<HTMLElement>()
        // 上传文件留言
        const value = ref('')
        const onKeydown = (event: KeyboardEvent) => {
            if (event.code === 'Enter' && !event.ctrlKey && !event.shiftKey) {
                event.preventDefault()
                command("insertLineBreak")
            }
            if (event.code === 'Enter') {


                if (event.ctrlKey) {
                    handleSend()
                }

            }

        }

        function handleSend() {
            console.log('发送')
            emit('send', textarea.value?.innerHTML)
            clear()
        }

        function clear() {
            textarea.value!.innerHTML = ''
        }

        const fileRef = ref<HTMLInputElement>()
        const fileList = ref<FileList | null>()
        const changeFile = (event: Event) => {
            const { files } = event.target as HTMLInputElement
            if (!files || !files.length) return
            fileList.value = files
            console.log(files)
            show.value = true
        }

        const resetInput = () => {
            if (fileRef.value) {
                fileRef.value.value = '';
            }
        }

        const handleClickFile = () => {
            fileRef.value?.click()
        }

        const show = ref(false)

        const emojiData = Emoji

        const showEmoji = ref(false)

        const emojiClick = () => {
            show.value = false
            showEmoji.value = true
        }

        const renderImageGrid = (items: Array<any>) => {
            return items.map(item => (
                <img
                    src={item.src}
                    title={item.title}
                    class="free-editor-emoji__item"
                    onClick={() => handleSelectEmoji(item)}
                />
            ));
        };

        const selection = window.getSelection();
        let lastSelectionRange: any;

        function onKeyup() {
            saveLastRange()
        }

        function onClick() {
            saveLastRange()
        }

        function saveLastRange() {
            lastSelectionRange = selection?.getRangeAt(0);
        }

        function focusLastRange() {
            textarea.value?.focus();
            if (lastSelectionRange) {
                selection?.removeAllRanges();
                selection?.addRange(lastSelectionRange);
            }
        }

        const handleSelectEmoji = (item: any) => {
            showEmoji.value = false
            focusLastRange();
            command('insertHTML', `<img emoji-name="${item.name}" src="${item.src}" width="20px" height="20px"></img>`);
            saveLastRange();
        }

        const ok = () => {
            if (!fileList.value || !fileList.value.length) return
            Array.from(fileList.value).forEach(file => {
                emit('upload', file)
            })
            if (value.value) {
                emit('send', value.value)
            }

            show.value = false
            resetInput()
        }

        const cancel = () => {
            resetInput()
        }

        return () => {
            return (
                <div class="free-editor">
                    <free-dialog v-model={[showEmoji.value, 'show']} title={'表情'} width={465} footer={false}>
                        <div class="free-editor-files">
                            <div class="free-editor-emoji__content">
                                {renderImageGrid(emojiData)}
                            </div>
                        </div>
                    </free-dialog>
                    <free-dialog v-model={[show.value, 'show']} width={260} header={false} onOk={ok} onCancel={cancel}>
                        <div class="free-editor-files">
                            <div class="free-editor-files__title">发送给：</div>
                            <div class="free-editor-files__info">
                                <free-avatar avatar={props.contact.avatar}></free-avatar>
                                <div class="free-editor-files__nickname">{props.contact.nickname}</div>
                            </div>
                            <div class="free-editor-files__content">
                                <div class="free-editor-files__list">
                                    {
                                        fileList.value ? Array.from(fileList.value).map(file => {
                                            return (
                                                <div class="free-editor-files__item">
                                                    <i class="free-icon-files"></i>
                                                    <div class="free-editor-files__right">
                                                        <div class="free-editor-filename">{file.name}</div>
                                                        <div class="free-editor-filesize">{formatByte(file.size)}</div>
                                                    </div>
                                                </div>
                                            )
                                        }) : []
                                    }
                                </div>
                                <div class="free-editor-files__footer">
                                    <input v-model={value.value} class="free-editor-files__input" type="text" placeholder="给朋友留言" />
                                </div>
                            </div>
                        </div>
                    </free-dialog>
                    <input type="file" ref={fileRef} multiple style="display: none;" onChange={changeFile} />
                    <div class="free-editor-tool">
                        <div class="free-editor-tool__item" onClick={emojiClick}>
                            <i class="free-icon-emoji"></i>
                        </div>
                        <div class="free-editor-tool__item">
                            <i class="free-icon-file" onClick={handleClickFile}></i>
                        </div>
                    </div>
                    <div class="free-editor-content">
                        <div
                            ref={textarea}
                            class="free-editor-textarea"
                            contenteditable
                            spellcheck="false"
                            onKeydown={onKeydown}
                            onKeyup={onKeyup}
                            onClick={onClick}
                        />
                    </div>
                    <div class="free-editor-footer">
                        <div class="free-editor-footer__inner">
                            <div class="free-editor-footer__text">ctrl + enter 快捷发送消息</div>
                            <free-button onClick={handleSend}>发送</free-button>
                        </div>
                    </div>
                </div>
            )
        }
    }
})