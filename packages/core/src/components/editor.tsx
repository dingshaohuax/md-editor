import { Tiptap, useEditor } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import type { ReactElement } from 'react'

function Editor(): ReactElement | null {
  const editor = useEditor({
    extensions: [StarterKit],
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

      <BubbleMenu editor={editor} options={menuOptions}>
        <button>Bold</button>
        <button>Italic</button>
      </BubbleMenu>

      <FloatingMenu editor={editor} options={menuOptions}>
        <button>Add heading</button>
      </FloatingMenu>
    </Tiptap>
  )
}

export default Editor