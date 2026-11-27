import type { Editor } from '@tiptap/react'
import { createVizelDragHandleExtension, createVizelLocale, createVizelNodeTypes } from '@vizel/core'
import { VizelBlockMenu } from '@vizel/react'
import type { ReactElement } from 'react'

interface Props {
    editor: Editor
}

const blockMenuLocale = createVizelLocale({
    blockMenu: {
        label: '块菜单',
        delete: '删除',
        duplicate: '复制块',
        copy: '复制到剪贴板',
        cut: '剪切',
        turnInto: '转化为',
    },
    nodeTypes: {
        text: '正文',
        heading1: '一级标题',
        heading2: '二级标题',
        heading3: '三级标题',
        heading4: '四级标题',
        heading5: '五级标题',
        heading6: '六级标题',
        bulletList: '无序列表',
        numberedList: '有序列表',
        quote: '引用',
        code: '代码块',
    },
    dragHandle: {
        ariaLabel: '拖动排序，点击打开块菜单',
    },
})
const blockMenuNodeTypes = createVizelNodeTypes(blockMenuLocale).filter(({ name }) => name !== 'taskList')

export function createBlockMenuDragHandle(): ReturnType<typeof createVizelDragHandleExtension> {
    return createVizelDragHandleExtension({ locale: blockMenuLocale })
}

export default function BlockMenu({ editor }: Props): ReactElement {
    return (
        <VizelBlockMenu
            editor={editor}
            nodeTypes={blockMenuNodeTypes}
            locale={blockMenuLocale}
            className="md-editor-block-menu"
        />
    )
}
