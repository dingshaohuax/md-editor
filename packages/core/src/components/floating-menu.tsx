import type { Editor } from '@tiptap/react'
import { FloatingMenu, type FloatingMenuProps } from '@tiptap/react/menus'
import type {} from '@tiptap/starter-kit' // Load the extension command declarations.
import type { ReactElement } from 'react'
import { LuHeading2 } from 'react-icons/lu'

interface Props {
    editor: Editor
    options?: FloatingMenuProps['options']
}

export default function MyFloatingMenu({ editor, options }: Props): ReactElement {
    return (
        <FloatingMenu
            editor={editor}
            options={options}
            updateDelay={0}
            className="md-editor-floating-menu"
            role="group"
            aria-label="插入内容"
            shouldShow={({ editor, view, state }) => {
                const { $anchor, empty } = state.selection

                return (
                    editor.isEditable &&
                    view.hasFocus() &&
                    empty &&
                    $anchor.depth === 1 &&
                    $anchor.parent.type.name === 'paragraph' &&
                    $anchor.parent.childCount === 0
                )
            }}
        >
            <button
                type="button"
                onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
            >
                <LuHeading2 aria-hidden="true" />
                标题
            </button>
        </FloatingMenu>
    )
}
