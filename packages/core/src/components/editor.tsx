import { Tiptap, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, type ReactElement } from 'react'
import BlockMenu, { createBlockMenuDragHandle } from './block-menu'
import BubbleMenu from "./bubble-menu"
import FloatingMenu from './floating-menu'

function Editor(): ReactElement | null {
    const [dragHandle] = useState(createBlockMenuDragHandle)
    const editor = useEditor({
        extensions: [StarterKit, dragHandle],
        content: '<p>Hello World!</p>',
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