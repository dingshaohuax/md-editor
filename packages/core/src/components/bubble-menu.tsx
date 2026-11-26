import { useEditorState, type Editor } from '@tiptap/react'
import { BubbleMenu, type BubbleMenuProps } from '@tiptap/react/menus'
import type { ReactElement } from 'react'
import { LuBold, LuItalic } from 'react-icons/lu'

interface Props {
    editor: Editor
    options?: BubbleMenuProps['options']
}

export default function MyBubbleMenu({ editor, options }: Props): ReactElement {
    const { bold, italic } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            bold: editor.isActive('bold'),
            italic: editor.isActive('italic'),
        }),
    })

    return (
        <BubbleMenu
            editor={editor}
            options={options}
            className="md-editor-bubble-menu"
            role="group"
            aria-label="Text formatting"
        >
            <button
                type="button"
                aria-label="Bold"
                aria-pressed={bold}
                title="Bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <LuBold aria-hidden="true" />
            </button>
            <button
                type="button"
                aria-label="Italic"
                aria-pressed={italic}
                title="Italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <LuItalic aria-hidden="true" />
            </button>
        </BubbleMenu>
    )
}
