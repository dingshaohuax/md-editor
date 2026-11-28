import { Tiptap, useEditor, type UseEditorOptions } from '@tiptap/react'
import { Markdown } from '@tiptap/markdown'
import StarterKit from '@tiptap/starter-kit'
import { useState, type ReactElement } from 'react'
import BlockMenu, { createBlockMenuDragHandle } from './block-menu'
import BubbleMenu from "./bubble-menu"
import FloatingMenu from './floating-menu'

type EditorProps = Pick<UseEditorOptions, 'onCreate' | 'onUpdate'> & {
    initialMarkdown?: string
}

function Editor({ initialMarkdown = 'Hello World!', onCreate, onUpdate }: EditorProps): ReactElement | null {
    const [dragHandle] = useState(createBlockMenuDragHandle)
    const editor = useEditor({
        extensions: [StarterKit, Markdown, dragHandle],
        content: initialMarkdown,
        contentType: 'markdown',
        onCreate,
        onUpdate,
        editorProps: {
            attributes: {
                class: 'md-editor-content',
            },
        },
    })

    if (!editor) return null

    const menuOptions = { scrollTarget: editor.view.dom }

    return (
        <Tiptap editor={editor}>
            <Tiptap.Content className="md-editor" />
            <BlockMenu editor={editor} />
            <BubbleMenu editor={editor} options={menuOptions} />
            <FloatingMenu editor={editor} options={menuOptions} />
        </Tiptap>
    )
}

export default Editor