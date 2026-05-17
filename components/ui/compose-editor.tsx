'use client';

import * as React from 'react';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { LinkNode } from '@lexical/link';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
  REMOVE_LIST_COMMAND
} from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import {
  $createQuoteNode,
  HeadingNode,
  QuoteNode
} from '@lexical/rich-text';
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
  $setBlocksType
} from '@lexical/selection';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister
} from '@lexical/utils';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  type ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  LexicalEditor,
  LineBreakNode,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND
} from 'lexical';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  IndentIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  OutdentIcon,
  QuoteIcon,
  RedoIcon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Gmail's font menu — label → CSS font stack.
const FONTS: { label: string; value: string }[] = [
  { label: 'Sans Serif', value: 'arial, sans-serif' },
  { label: 'Serif', value: 'georgia, serif' },
  { label: 'Fixed Width', value: '"courier new", monospace' },
  { label: 'Wide', value: '"arial black", sans-serif' },
  { label: 'Narrow', value: '"arial narrow", sans-serif' },
  { label: 'Comic Sans MS', value: '"comic sans ms", "comic sans", cursive' },
  { label: 'Garamond', value: 'garamond, serif' },
  { label: 'Tahoma', value: 'tahoma, sans-serif' },
  { label: 'Trebuchet MS', value: '"trebuchet ms", sans-serif' },
  { label: 'Verdana', value: 'verdana, sans-serif' }
];

// Gmail's "tT" size menu.
const SIZES: { label: string; value: string }[] = [
  { label: 'Small', value: '13px' },
  { label: 'Normal', value: '14px' },
  { label: 'Large', value: '18px' },
  { label: 'Huge', value: '24px' }
];

// Gmail's text-colour swatch grid.
const COLORS: string[] = [
  '#000000',
  '#434343',
  '#666666',
  '#999999',
  '#b7b7b7',
  '#cccccc',
  '#ffffff',
  '#980000',
  '#ff0000',
  '#ff9900',
  '#ffff00',
  '#00ff00',
  '#00ffff',
  '#4a86e8',
  '#0000ff',
  '#9900ff',
  '#ff00ff',
  '#e06666'
];

const TEXT_FORMATS = ['bold', 'italic', 'underline', 'strikethrough'] as const;

function ToolbarPlugin(): React.JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isQuote, setIsQuote] = React.useState(false);
  const [listType, setListType] = React.useState<'bullet' | 'number' | ''>('');
  const [align, setAlign] = React.useState<ElementFormatType>('left');
  const [canUndo, setCanUndo] = React.useState(false);
  const [canRedo, setCanRedo] = React.useState(false);
  const [fontFamily, setFontFamily] = React.useState('arial, sans-serif');
  const [fontSize, setFontSize] = React.useState('14px');

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;
    setIsBold(selection.hasFormat('bold'));
    setIsItalic(selection.hasFormat('italic'));
    setIsUnderline(selection.hasFormat('underline'));
    setIsStrikethrough(selection.hasFormat('strikethrough'));
    setFontFamily(
      $getSelectionStyleValueForProperty(
        selection,
        'font-family',
        'arial, sans-serif'
      )
    );
    setFontSize(
      $getSelectionStyleValueForProperty(selection, 'font-size', '14px')
    );

    // Block-level state (quote / list / alignment) — mirrors how the shared
    // editor resolves the nearest top-level element so the active Gmail
    // button highlights.
    const anchorNode = selection.anchor.getNode();
    const element =
      anchorNode.getKey() === 'root'
        ? anchorNode
        : ($findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          }) ?? anchorNode.getTopLevelElementOrThrow());

    if ($isListNode(element)) {
      const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
      const type = parentList
        ? parentList.getListType()
        : element.getListType();
      setListType(type === 'number' ? 'number' : 'bullet');
      setIsQuote(false);
    } else {
      setListType('');
      setIsQuote(element.getType() === 'quote');
    }
    setAlign(
      ((element as { getFormatType?: () => ElementFormatType }).getFormatType?.() ||
        'left') as ElementFormatType
    );
  }, []);

  React.useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => updateToolbar());
        }),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateToolbar();
            return false;
          },
          1
        ),
        editor.registerCommand(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload);
            return false;
          },
          1
        ),
        editor.registerCommand(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload);
            return false;
          },
          1
        )
      ),
    [editor, updateToolbar]
  );

  const applyStyle = (styles: Record<string, string | null>): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, styles);
      }
    });
  };

  // Gmail toggles a list off when you click its active button again.
  const toggleList = (kind: 'bullet' | 'number'): void => {
    if (listType === kind) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(
        kind === 'number'
          ? INSERT_ORDERED_LIST_COMMAND
          : INSERT_UNORDERED_LIST_COMMAND,
        undefined
      );
    }
  };

  const toggleQuote = (): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () =>
          isQuote ? $createParagraphNode() : $createQuoteNode()
        );
      }
    });
  };

  const clearFormatting = (): void => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      $patchStyleText(selection, {
        color: null,
        'background-color': null,
        'font-family': null,
        'font-size': null
      });
      for (const fmt of TEXT_FORMATS) {
        if (selection.hasFormat(fmt)) {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, fmt);
        }
      }
      $setBlocksType(selection, () => $createParagraphNode());
    });
  };

  const iconBtn = 'size-8 shrink-0 text-muted-foreground hover:text-foreground';
  const activeBtn = 'bg-accent text-foreground';

  return (
    <div className="flex items-center gap-0.5 overflow-x-auto rounded-md border bg-muted/40 px-1.5 py-1">
      {/* Undo / Redo */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={iconBtn}
        disabled={!canUndo}
        title="Undo"
        aria-label="Undo"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <UndoIcon className="size-4 shrink-0" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={iconBtn}
        disabled={!canRedo}
        title="Redo"
        aria-label="Redo"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <RedoIcon className="size-4 shrink-0" />
      </Button>
      <Separator
        orientation="vertical"
        className="mx-1 h-5"
      />

      {/* Font family */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1 px-2 font-normal text-muted-foreground hover:text-foreground"
            title="Font"
          >
            <span className="max-w-24 truncate">
              {FONTS.find((f) => f.value === fontFamily)?.label ?? 'Sans Serif'}
            </span>
            <ChevronDownIcon className="size-3.5 shrink-0 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {FONTS.map((f) => (
            <DropdownMenuItem
              key={f.value}
              onClick={() => applyStyle({ 'font-family': f.value })}
              style={{ fontFamily: f.value }}
            >
              {f.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator
        orientation="vertical"
        className="mx-1 h-5"
      />

      {/* Font size */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1 px-2 font-normal text-muted-foreground hover:text-foreground"
            title="Size"
          >
            <span>
              {SIZES.find((s) => s.value === fontSize)?.label ?? 'Normal'}
            </span>
            <ChevronDownIcon className="size-3.5 shrink-0 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {SIZES.map((s) => (
            <DropdownMenuItem
              key={s.value}
              onClick={() => applyStyle({ 'font-size': s.value })}
              style={{ fontSize: s.value }}
            >
              {s.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator
        orientation="vertical"
        className="mx-1 h-5"
      />

      {/* Bold / Italic / Underline */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(iconBtn, isBold && activeBtn)}
        title="Bold"
        aria-label="Bold"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
      >
        <BoldIcon className="size-4 shrink-0" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(iconBtn, isItalic && activeBtn)}
        title="Italic"
        aria-label="Italic"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
      >
        <ItalicIcon className="size-4 shrink-0" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(iconBtn, isUnderline && activeBtn)}
        title="Underline"
        aria-label="Underline"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
      >
        <UnderlineIcon className="size-4 shrink-0" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(iconBtn, isStrikethrough && activeBtn)}
        title="Strikethrough"
        aria-label="Strikethrough"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
        }
      >
        <StrikethroughIcon className="size-4 shrink-0" />
      </Button>
      <Separator
        orientation="vertical"
        className="mx-1 h-5"
      />

      {/* Text colour */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={iconBtn}
            title="Text color"
            aria-label="Text color"
          >
            <span className="text-sm font-semibold leading-none">A</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-auto"
        >
          <div className="px-2 pb-1 pt-1.5 text-xs font-medium text-muted-foreground">
            Text color
          </div>
          <div className="grid grid-cols-6 gap-1 px-1">
            {COLORS.map((c) => (
              <button
                key={`fg-${c}`}
                type="button"
                aria-label={`Text color ${c}`}
                className="size-5 rounded-sm border"
                style={{ backgroundColor: c }}
                onClick={() => applyStyle({ color: c })}
              />
            ))}
          </div>
          <DropdownMenuItem onClick={() => applyStyle({ color: null })}>
            Automatic
          </DropdownMenuItem>
          <Separator className="my-1" />
          <div className="px-2 pb-1 text-xs font-medium text-muted-foreground">
            Highlight color
          </div>
          <div className="grid grid-cols-6 gap-1 px-1">
            {COLORS.map((c) => (
              <button
                key={`bg-${c}`}
                type="button"
                aria-label={`Highlight color ${c}`}
                className="size-5 rounded-sm border"
                style={{ backgroundColor: c }}
                onClick={() => applyStyle({ 'background-color': c })}
              />
            ))}
          </div>
          <DropdownMenuItem
            onClick={() => applyStyle({ 'background-color': null })}
          >
            No fill
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator
        orientation="vertical"
        className="mx-1 h-5"
      />

      {/* Alignment — trigger shows the active alignment, like Gmail. */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={iconBtn}
            title="Align"
            aria-label="Align"
          >
            {align === 'center' ? (
              <AlignCenterIcon className="size-4 shrink-0" />
            ) : align === 'right' ? (
              <AlignRightIcon className="size-4 shrink-0" />
            ) : align === 'justify' ? (
              <AlignJustifyIcon className="size-4 shrink-0" />
            ) : (
              <AlignLeftIcon className="size-4 shrink-0" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            className={cn((align === 'left' || align === 'start') && activeBtn)}
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
            }
          >
            <AlignLeftIcon className="mr-2 size-4 shrink-0" />
            Left
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(align === 'center' && activeBtn)}
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
            }
          >
            <AlignCenterIcon className="mr-2 size-4 shrink-0" />
            Center
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(align === 'right' && activeBtn)}
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
            }
          >
            <AlignRightIcon className="mr-2 size-4 shrink-0" />
            Right
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(align === 'justify' && activeBtn)}
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
            }
          >
            <AlignJustifyIcon className="mr-2 size-4 shrink-0" />
            Justify
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator
        orientation="vertical"
        className="mx-1 h-5"
      />

      {/* Lists — toggle off when the active one is clicked again. */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(iconBtn, listType === 'number' && activeBtn)}
        title="Numbered list"
        aria-label="Numbered list"
        onClick={() => toggleList('number')}
      >
        <ListOrderedIcon className="size-4 shrink-0" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(iconBtn, listType === 'bullet' && activeBtn)}
        title="Bulleted list"
        aria-label="Bulleted list"
        onClick={() => toggleList('bullet')}
      >
        <ListIcon className="size-4 shrink-0" />
      </Button>
      <Separator
        orientation="vertical"
        className="mx-1 h-5"
      />

      {/* Indent */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={iconBtn}
        title="Decrease indent"
        aria-label="Decrease indent"
        onClick={() =>
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
        }
      >
        <OutdentIcon className="size-4 shrink-0" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={iconBtn}
        title="Increase indent"
        aria-label="Increase indent"
        onClick={() =>
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
        }
      >
        <IndentIcon className="size-4 shrink-0" />
      </Button>
      <Separator
        orientation="vertical"
        className="mx-1 h-5"
      />

      {/* Quote + remove formatting */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(iconBtn, isQuote && activeBtn)}
        title="Quote"
        aria-label="Quote"
        onClick={toggleQuote}
      >
        <QuoteIcon className="size-4 shrink-0" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={iconBtn}
        title="Remove formatting"
        aria-label="Remove formatting"
        onClick={clearFormatting}
      >
        <RemoveFormattingIcon className="size-4 shrink-0" />
      </Button>
    </div>
  );
}

export type ComposeEditorProps = {
  getText: () => string;
  setText: (text: string) => void;
  height?: string;
  placeholder?: string;
  /** Gmail toggles the formatting strip with the "Aa" button. */
  showToolbar?: boolean;
};

// Compose-only rich-text editor. Deliberately separate from the shared
// TextEditor (used by Notes) so the Gmail formatting strip — docked at the
// BOTTOM, above the Send bar — doesn't leak into Notes.
export function ComposeEditor(props: ComposeEditorProps): React.JSX.Element {
  const initEditor = React.useCallback((editor: LexicalEditor) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(props.getText(), 'text/html');
    const nodes = $generateNodesFromDOM(editor, dom);

    $getRoot().select();
    $insertNodes(nodes);

    editor.registerUpdateListener(({ editorState, prevEditorState }) => {
      editorState.read(() => {
        const textInHtml = $generateHtmlFromNodes(editor)
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');
        props.setText(textInHtml);
      });
      if (!prevEditorState._selection) {
        editor.blur();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialConfig = React.useMemo(
    () => ({
      editorState: initEditor,
      theme: {
        paragraph: 'editor-paragraph',
        quote: 'editor-quote',
        heading: {
          h1: 'editor-heading-h1',
          h2: 'editor-heading-h2'
        },
        list: {
          ol: 'editor-list-ol',
          ul: 'editor-list-ul',
          listitem: 'editor-listitem'
        },
        link: 'editor-link',
        text: {
          bold: 'editor-text-bold',
          italic: 'editor-text-italic',
          underline: 'editor-text-underline',
          strikethrough: 'editor-text-strikethrough',
          underlineStrikethrough: 'editor-text-underline-strikethrough'
        }
      },
      onError(error: Error) {
        throw error;
      },
      namespace: 'compose',
      nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        LineBreakNode,
        LinkNode
      ]
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex h-full min-h-0 flex-col">
        <style
          jsx
          global
        >{`
          .compose-editor-input {
            font-size: 14px;
            outline: none;
            padding: 4px 4px 12px;
          }
          .compose-editor-input a {
            color: rgb(0, 0, 238);
            text-decoration: underline;
          }
          .compose-editor-input .editor-paragraph {
            margin: 0 0 8px;
          }
          .compose-editor-input .editor-quote {
            margin: 0 0 8px;
            border-left: 4px solid #ccc;
            padding-left: 12px;
            color: #666;
          }
          .compose-editor-input .editor-text-bold {
            font-weight: bold;
          }
          .compose-editor-input .editor-text-italic {
            font-style: italic;
          }
          .compose-editor-input .editor-text-underline {
            text-decoration: underline;
          }
          .compose-editor-input .editor-text-strikethrough {
            text-decoration: line-through;
          }
          .compose-editor-input .editor-text-underline-strikethrough {
            text-decoration: underline line-through;
          }
          .compose-editor-input .editor-heading-h1 {
            font-size: 22px;
            font-weight: bold;
            margin: 0 0 12px;
          }
          .compose-editor-input .editor-heading-h2 {
            font-size: 18px;
            font-weight: bold;
            margin: 0 0 10px;
          }
          .compose-editor-input .editor-list-ul {
            list-style: disc inside;
            margin: 0 0 8px;
          }
          .compose-editor-input .editor-list-ol {
            list-style: decimal inside;
            margin: 0 0 8px;
          }
          .compose-editor-input .editor-listitem {
            margin: 0 0 0 20px;
          }
        `}</style>
        <div
          className="relative min-h-0 flex-1 overflow-y-auto"
          style={{ minHeight: props.height }}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="compose-editor-input"
                style={{ minHeight: props.height }}
              />
            }
            placeholder={
              <p className="pointer-events-none absolute select-none p-1 text-sm text-muted-foreground opacity-60">
                {props.placeholder || ''}
              </p>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ListPlugin />
          <LinkPlugin />
          <HistoryPlugin />
        </div>
        {props.showToolbar && (
          <div className="shrink-0 pt-2">
            <ToolbarPlugin />
          </div>
        )}
      </div>
    </LexicalComposer>
  );
}
