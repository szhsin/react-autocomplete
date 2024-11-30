"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[533],{4666:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>E,contentTitle:()=>T,default:()=>D,frontMatter:()=>L,metadata:()=>a,toc:()=>W});const a=JSON.parse('{"id":"docs/features/multiSelect","title":"Multiple Selection","description":"<TabItem","source":"@site/docs/docs/features/multiSelect.mdx","sourceDirName":"docs/features","slug":"/docs/features/multiSelect","permalink":"/react-autocomplete/docs/features/multiSelect","draft":false,"unlisted":false,"editUrl":"https://github.com/szhsin/react-autocomplete/tree/master/website/docs/docs/features/multiSelect.mdx","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"docsSidebar","previous":{"title":"Dropdown","permalink":"/react-autocomplete/docs/features/dropdown"},"next":{"title":"Multi-select Dropdown","permalink":"/react-autocomplete/docs/features/multiSelectDropdown"}}');var s=n(4848),l=n(8453),o=n(267),i=n(8860),r=n(1432);const c="import { useState } from 'react';\nimport { useMultiSelect, multiSelect } from '@szhsin/react-autocomplete';\nimport STATES from '../../data/states';\n\nconst MultiSelect = () => {\n  const [value, setValue] = useState<string>();\n  // You can set a few items to be selected initially\n  const [selected, setSelected] = useState<string[]>(['Alaska', 'Florida']);\n  // It's up to you how to filter items based on the input value\n  const items = value\n    ? STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))\n    : STATES;\n\n  const {\n    getLabelProps,\n    getFocusCaptureProps,\n    getInputProps,\n    getClearProps,\n    getToggleProps,\n    getListProps,\n    getItemProps,\n    isItemSelected,\n    removeSelect,\n    focused,\n    open,\n    focusIndex,\n    isInputEmpty\n    // highlight-next-line\n  } = useMultiSelect({\n    // flipOnSelect: true or false,\n    items,\n    value,\n    onChange: setValue,\n    selected,\n    onSelectChange: setSelected,\n    // highlight-next-line\n    feature: multiSelect({\n      // Options: rovingText, closeOnSelect\n      rovingText: true\n    })\n  });\n\n  return (\n    <div>\n      <label {...getLabelProps()} {...getFocusCaptureProps()}>\n        State\n      </label>\n      <div\n        {...getFocusCaptureProps()}\n        style={{\n          border: '2px solid',\n          borderColor: focused ? '#007bff' : '#aaa',\n          borderRadius: 4,\n          display: 'flex',\n          flexWrap: 'wrap',\n          maxWidth: 320,\n          gap: 6,\n          padding: 6\n        }}\n      >\n        {selected.map((item) => (\n          <button key={item} onClick={() => removeSelect(item)}>\n            {item}\n          </button>\n        ))}\n        <div>\n          <input placeholder=\"Type...\" {...getInputProps()} />\n          {!isInputEmpty && <button {...getClearProps()}>X</button>}\n        </div>\n        <button {...getToggleProps()}>{open ? '\u2191' : '\u2193'}</button>\n      </div>\n\n      <ul\n        {...getListProps()}\n        style={{\n          display: open ? 'block' : 'none',\n          position: 'absolute',\n          listStyle: 'none',\n          color: '#000',\n          background: '#fff',\n          overflow: 'auto',\n          maxHeight: 300,\n          margin: 0,\n          padding: 0\n        }}\n      >\n        {items.length ? (\n          items.map((item, index) => (\n            <li\n              style={{\n                background: focusIndex === index ? '#ddd' : 'none'\n              }}\n              key={item}\n              {...getItemProps({ item, index })}\n            >\n              {item}\n              {isItemSelected(item) && '\u2714\ufe0f'}\n            </li>\n          ))\n        ) : (\n          <li>No options</li>\n        )}\n      </ul>\n    </div>\n  );\n};\n\nexport default MultiSelect;\n";var u=n(8785),d=n(6540),p=n(4164),h=n(8824),m=n(5430),g=n(1975),b=n(4444);var x=n(8321);var v=n(9440);const f=e=>(0,m.o)((0,g.d)({...e,select:!0}),(e=>{let{id:t,open:n,setOpen:a}=e;return{getToggleProps:()=>({...(0,b.l0)(t,n),onClick:()=>a(!n)})}}),(0,x.P)(),(()=>{const[e,t]=(0,d.useState)(!1);return{focused:e,getInputProps:()=>({onFocusCapture:()=>t(!0),onBlurCapture:()=>t(!1)})}}),(0,v.I)());var S=n(1236),k=n(7210),w=n(6217),j=n(9580),C=n(2194),A=n(7869);const I="multiInputRoot_vkoW",N="multiInputRootFocused_YrWw",y="multiInputWrap_R9km";var M=n(8748),P=n(9094);const O=()=>{const[e,t]=(0,d.useState)(!0),[n,a]=(0,d.useState)(!0),[l,o]=(0,d.useState)(!1),[i,r]=(0,d.useState)(),[c,u]=(0,d.useState)(["Alaska","Florida"]),m=i?C.A.filter((e=>e.toLowerCase().startsWith(i.toLowerCase()))):C.A,{getLabelProps:g,getFocusCaptureProps:b,getInputProps:x,getClearProps:v,getToggleProps:O,getListProps:L,getItemProps:T,isItemSelected:E,removeSelect:W,open:_,focusIndex:D,focused:F,isInputEmpty:H}=(0,h.L)({items:m,value:i,onChange:r,selected:c,onSelectChange:u,flipOnSelect:l,feature:f({rovingText:e,closeOnSelect:n})}),z=(0,P.i)(_,m);return(0,s.jsxs)("div",{className:A.A.wrap,children:[(0,s.jsxs)("div",{className:A.A.options,children:[(0,s.jsx)(M.S,{label:"rovingText",checked:e,onChange:t}),(0,s.jsx)(M.S,{label:"closeOnSelect",checked:n,onChange:a}),(0,s.jsx)(M.S,{label:"flipOnSelect",checked:l,onChange:o})]}),(0,s.jsx)("label",{className:A.A.label,...g(),...b(),children:"State"}),(0,s.jsxs)("div",{className:(0,p.$)(I,F&&N),...b(),children:[(0,s.jsxs)("div",{className:y,children:[c.map((e=>(0,s.jsxs)("div",{className:A.A.selectedItem,children:[e,(0,s.jsx)("span",{className:A.A.removeItem,onClick:()=>W(e),children:(0,s.jsx)(S.A,{})})]},e))),(0,s.jsxs)("div",{className:A.A.multiInputWrap,children:[(0,s.jsx)("input",{className:A.A.multiInput,placeholder:"Type...",...x()}),!H&&(0,s.jsx)("button",{className:A.A.clear,...v(),children:(0,s.jsx)(S.A,{})})]})]}),(0,s.jsx)("button",{className:A.A.toggle,...O(),children:_?(0,s.jsx)(w.A,{}):(0,s.jsx)(k.A,{})})]}),(0,s.jsx)("ul",{ref:z,className:(0,p.$)(A.A.multiList,A.A.scroll),...L(),style:{display:_?"block":"none"},children:m.length?m.map(((e,t)=>{const n=E(e);return(0,s.jsxs)("li",{className:(0,p.$)(A.A.itemCheckable,D===t&&A.A.focused,n&&A.A.checked),...T({item:e,index:t}),children:[e,n&&(0,s.jsx)(j.A,{})]},e)})):(0,s.jsx)("li",{className:A.A.noResult,children:"No options"})})]})},L={sidebar_position:4},T="Multiple Selection",E={},W=[];function _(e){const t={h1:"h1",header:"header",p:"p",...(0,l.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"multiple-selection",children:"Multiple Selection"})}),"\n",(0,s.jsx)(O,{}),"\n",(0,s.jsxs)(o.A,{children:[(0,s.jsx)(i.A,{value:"ts",label:"MultiSelect.tsx",children:(0,s.jsx)(r.A,{language:"tsx",children:c})}),(0,s.jsx)(i.A,{value:"data",label:"data/states.ts",children:(0,s.jsx)(r.A,{language:"ts",children:u.A})}),(0,s.jsx)(i.A,{value:"codesandbox",label:"CodeSandbox",attributes:{link:"https://codesandbox.io/p/sandbox/multiselect-8t5plm"},children:(0,s.jsx)(t.p,{children:"CodeSandbox"})})]})]})}function D(e={}){const{wrapper:t}={...(0,l.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(_,{...e})}):_(e)}},9580:(e,t,n)=>{n.d(t,{A:()=>i});var a,s,l=n(6540);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)({}).hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o.apply(null,arguments)}const i=e=>{let{title:t,titleId:n,...i}=e;return l.createElement("svg",o({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,className:"icon icon-tabler icons-tabler-outline icon-tabler-check",viewBox:"0 0 24 24","aria-labelledby":n},i),t?l.createElement("title",{id:n},t):null,a||(a=l.createElement("path",{stroke:"none",d:"M0 0h24v24H0z"})),s||(s=l.createElement("path",{d:"m5 12 5 5L20 7"})))}},9440:(e,t,n)=>{n.d(t,{I:()=>a});const a=()=>e=>{let{removeSelect:t}=e;return{getInputProps:()=>({onKeyDown:e=>!e.target.value&&"Backspace"===e.key&&t?.()})}}},8824:(e,t,n)=>{n.d(t,{L:()=>l});var a=n(4444),s=n(8355);const l=e=>{let{isEqual:t=a.g4,selected:n,onSelectChange:l,flipOnSelect:o,...i}=e;const r=e=>l?.(n.filter((n=>!t(e,n)))),c=e=>{e?r(e):n.length&&l?.(n.slice(0,n.length-1))},u=e=>n.findIndex((n=>t(e,n)))>=0;return{...(0,s.m)({...i,selected:n,isEqual:t,isItemSelected:u,onSelectChange:e=>{e&&(u(e)?o&&r(e):l?.([...n,e]))},removeSelect:c}),removeSelect:c}}},8748:(e,t,n)=>{n.d(t,{S:()=>v});var a,s,l=n(4164),o=n(6540);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)({}).hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i.apply(null,arguments)}const r=e=>{let{title:t,titleId:n,...l}=e;return o.createElement("svg",i({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,className:"icon icon-tabler icons-tabler-outline icon-tabler-square",viewBox:"0 0 24 24","aria-labelledby":n},l),t?o.createElement("title",{id:n},t):null,a||(a=o.createElement("path",{stroke:"none",d:"M0 0h24v24H0z"})),s||(s=o.createElement("path",{d:"M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"})))};var c,u;function d(){return d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)({}).hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},d.apply(null,arguments)}const p=e=>{let{title:t,titleId:n,...a}=e;return o.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"currentColor",className:"icon icon-tabler icons-tabler-filled icon-tabler-square-check",viewBox:"0 0 24 24","aria-labelledby":n},a),t?o.createElement("title",{id:n},t):null,c||(c=o.createElement("path",{fill:"none",d:"M0 0h24v24H0z"})),u||(u=o.createElement("path",{d:"M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005.195v12.666c0 1.96-1.537 3.56-3.472 3.662l-.195.005H5.667a3.667 3.667 0 0 1-3.662-3.472L2 18.333V5.667c0-1.96 1.537-3.56 3.472-3.662L5.667 2zm-2.626 7.293a1 1 0 0 0-1.414 0L11 12.585l-1.293-1.292-.094-.083a1 1 0 0 0-1.32 1.497l2 2 .094.083a1 1 0 0 0 1.32-.083l4-4 .083-.094a1 1 0 0 0-.083-1.32"})))},h="label_lSHF",m="input_rDJm",g="icon_wu1w",b="checked_X1o2";var x=n(4848);const v=e=>{let{label:t,checked:n,onChange:a}=e;return(0,x.jsxs)("label",{className:(0,l.$)(h,n&&b),children:[(0,x.jsx)("input",{className:m,type:"checkbox",checked:n,onChange:e=>a(e.target.checked)}),n?(0,x.jsx)(p,{className:g}):(0,x.jsx)(r,{className:g}),t]})}},2194:(e,t,n)=>{n.d(t,{A:()=>a});const a=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]},8785:(e,t,n)=>{n.d(t,{A:()=>a});const a="// https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States#States\n\nexport default [\n  'Alabama',\n  'Alaska',\n  'Arizona',\n  'Arkansas',\n  'California',\n  'Colorado',\n  'Connecticut',\n  'Delaware',\n  'Florida',\n  'Georgia',\n  'Hawaii',\n  'Idaho',\n  'Illinois',\n  'Indiana',\n  'Iowa',\n  'Kansas',\n  'Kentucky',\n  'Louisiana',\n  'Maine',\n  'Maryland',\n  'Massachusetts',\n  'Michigan',\n  'Minnesota',\n  'Mississippi',\n  'Missouri',\n  'Montana',\n  'Nebraska',\n  'Nevada',\n  'New Hampshire',\n  'New Jersey',\n  'New Mexico',\n  'New York',\n  'North Carolina',\n  'North Dakota',\n  'Ohio',\n  'Oklahoma',\n  'Oregon',\n  'Pennsylvania',\n  'Rhode Island',\n  'South Carolina',\n  'South Dakota',\n  'Tennessee',\n  'Texas',\n  'Utah',\n  'Vermont',\n  'Virginia',\n  'Washington',\n  'West Virginia',\n  'Wisconsin',\n  'Wyoming'\n];\n"}}]);