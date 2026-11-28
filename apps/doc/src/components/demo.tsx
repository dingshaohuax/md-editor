import Editor from '@dingshaohuax/md-editor'
import { useCallback, useEffect, useState, type ComponentProps } from 'react'
import { createPortal } from 'react-dom'

type EditorCreate = NonNullable<ComponentProps<typeof Editor>['onCreate']>
type EditorInstance = Parameters<EditorCreate>[0]['editor']

export default function Demo() {
  const [editor, setEditor] = useState<EditorInstance | null>(null)
  const [saveTarget, setSaveTarget] = useState<HTMLElement | null>(null)
  const [hasOutput, setHasOutput] = useState(false)

  useEffect(() => {
    setSaveTarget(document.getElementById('playground-save-controls'))
  }, [])

  const save = useCallback(() => {
    if (!editor || editor.isDestroyed) return

    console.log('[md-editor] 保存内容', editor.getMarkdown())
    setHasOutput(true)
  }, [editor])

  useEffect(() => {
    if (!editor) return

    function handleSaveShortcut(event: KeyboardEvent) {
      if (
        !(event.ctrlKey || event.metaKey) ||
        event.altKey ||
        event.shiftKey ||
        event.isComposing ||
        event.key.toLowerCase() !== 's'
      ) return

      event.preventDefault()
      if (!event.repeat) save()
    }

    window.addEventListener('keydown', handleSaveShortcut)
    return () => window.removeEventListener('keydown', handleSaveShortcut)
  }, [editor, save])

  return (
    <>
      <Editor
        initialMarkdown="Hello **World**!"
        onCreate={({ editor }) => setEditor(editor)}
        onUpdate={() => setHasOutput(false)}
      />
      {saveTarget && createPortal(
        <div className="playground-save-controls">
          <span className="playground-save-status" role="status">
            {hasOutput ? '已输出' : ''}
          </span>
          <button
            type="button"
            className="playground-save-button"
            aria-keyshortcuts="Control+S Meta+S"
            disabled={!editor}
            onClick={save}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 3h12l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
              <path d="M7 3v6h9V3M7 21v-8h10v8" />
            </svg>
            保存
          </button>
        </div>,
        saveTarget,
      )}
    </>
  )
}
