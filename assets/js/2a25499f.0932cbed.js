"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[875],{2411:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>A,contentTitle:()=>S,default:()=>N,frontMatter:()=>k,metadata:()=>a,toc:()=>C});const a=JSON.parse('{"id":"docs/features/dropdown","title":"Dropdown","description":"<TabItem","source":"@site/docs/docs/features/dropdown.mdx","sourceDirName":"docs/features","slug":"/docs/features/dropdown","permalink":"/react-autocomplete/docs/features/dropdown","draft":false,"unlisted":false,"editUrl":"https://github.com/szhsin/react-autocomplete/tree/master/website/docs/docs/features/dropdown.mdx","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"docsSidebar","previous":{"title":"Supercomplete","permalink":"/react-autocomplete/docs/features/supercomplete"},"next":{"title":"Multiple Selection","permalink":"/react-autocomplete/docs/features/multiSelect"}}');var o=t(4848),s=t(8453),r=t(267),i=t(8860),l=t(1432);const c="import { useState } from 'react';\nimport { useCombobox, dropdown } from '@szhsin/react-autocomplete';\nimport STATES from '../../data/states';\n\nconst Dropdown = () => {\n  const [value, setValue] = useState<string>();\n  const [selected, setSelected] = useState<string>();\n  // It's up to you how to filter items based on the input value\n  const items = value\n    ? STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))\n    : STATES;\n\n  const {\n    getInputProps,\n    getClearProps,\n    getToggleProps,\n    getListProps,\n    getItemProps,\n    open,\n    focusIndex,\n    isInputEmpty\n  } = useCombobox({\n    // flipOnSelect: true or false,\n    items,\n    value,\n    onChange: setValue,\n    selected,\n    onSelectChange: setSelected,\n    // highlight-next-line\n    feature: dropdown({\n      // Options: rovingText, closeOnSelect\n      rovingText: true\n    })\n  });\n\n  return (\n    <div>\n      <button {...getToggleProps()}>{selected || 'Select a state'}</button>\n\n      {open && (\n        <div\n          {...getListProps()}\n          style={{\n            position: 'absolute',\n            color: '#000',\n            background: '#fff'\n          }}\n        >\n          <div>\n            <input placeholder=\"Type to search...\" {...getInputProps()} />\n            {!isInputEmpty && <button {...getClearProps()}>X</button>}\n          </div>\n          <ul\n            style={{\n              listStyle: 'none',\n              overflow: 'auto',\n              maxHeight: 300,\n              padding: 0\n            }}\n          >\n            {items.length ? (\n              items.map((item, index) => (\n                <li\n                  style={{\n                    background: focusIndex === index ? '#ddd' : 'none',\n                    textDecoration: selected === item ? 'underline' : 'none'\n                  }}\n                  key={item}\n                  {...getItemProps({ item, index })}\n                >\n                  {item}\n                </li>\n              ))\n            ) : (\n              <li>No options</li>\n            )}\n          </ul>\n        </div>\n      )}\n    </div>\n  );\n};\n\nexport default Dropdown;\n";var d=t(8785),u=t(6540),p=t(4164),h=t(6238),m=t(9787),g=t(1236),x=t(2194),f=t(7869),w=t(8748),b=t(9094);const v=()=>{const[e,n]=(0,u.useState)(!0),[t,a]=(0,u.useState)(!0),[s,r]=(0,u.useState)(!0),[i,l]=(0,u.useState)(),[c,d]=(0,u.useState)(),v=i?x.A.filter((e=>e.toLowerCase().startsWith(i.toLowerCase()))):x.A,{getInputProps:k,getClearProps:S,getToggleProps:A,getListProps:C,getItemProps:j,open:N,focusIndex:y,isInputEmpty:I}=(0,h.B)({items:v,value:i,onChange:l,selected:c,onSelectChange:d,flipOnSelect:s,feature:(0,m.W)({rovingText:e,closeOnSelect:t})}),M=(0,b.i)(N,v);return(0,o.jsxs)("div",{className:f.A.wrap,children:[(0,o.jsxs)("div",{className:f.A.options,children:[(0,o.jsx)(w.S,{label:"flipOnSelect",checked:s,onChange:r}),(0,o.jsx)(w.S,{label:"rovingText",checked:e,onChange:n}),(0,o.jsx)(w.S,{label:"closeOnSelect",checked:t,onChange:a})]}),(0,o.jsx)("button",{className:f.A.button,...A(),children:c||"Select a state"}),N&&(0,o.jsxs)("div",{ref:M,className:(0,p.$)(f.A.dropdown,f.A.noScroll),...C(),children:[(0,o.jsxs)("div",{className:f.A.inputWrap,children:[(0,o.jsx)("input",{className:f.A.inputBorderless,placeholder:"Type to search...",...k()}),!I&&(0,o.jsx)("button",{className:f.A.dropdownClear,...S(),children:(0,o.jsx)(g.A,{})})]}),(0,o.jsx)("ul",{className:(0,p.$)(f.A.dropdownList,f.A.scroll),children:v.length?v.map(((e,n)=>(0,o.jsx)("li",{className:(0,p.$)(f.A.item,y===n&&f.A.focused,c===e&&f.A.selected),...j({item:e,index:n}),children:e},e))):(0,o.jsx)("li",{className:f.A.noResult,children:"No options"})})]})]})},k={sidebar_position:3},S="Dropdown",A={},C=[];function j(e){const n={h1:"h1",header:"header",p:"p",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"dropdown",children:"Dropdown"})}),"\n",(0,o.jsx)(v,{}),"\n",(0,o.jsxs)(r.A,{children:[(0,o.jsx)(i.A,{value:"ts",label:"Dropdown.tsx",children:(0,o.jsx)(l.A,{language:"tsx",children:c})}),(0,o.jsx)(i.A,{value:"data",label:"data/states.ts",children:(0,o.jsx)(l.A,{language:"ts",children:d.A})}),(0,o.jsx)(i.A,{value:"codesandbox",label:"CodeSandbox",attributes:{link:"https://codesandbox.io/p/sandbox/dropdown-v4hxk8"},children:(0,o.jsx)(n.p,{children:"CodeSandbox"})})]})]})}function N(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(j,{...e})}):j(e)}},9787:(e,n,t)=>{t.d(n,{W:()=>l});var a=t(5430),o=t(1975),s=t(6540),r=t(9301);const i=function(e){let{closeOnSelect:n=!0,toggleRef:t}=void 0===e?{}:e;return e=>{let{inputRef:a,open:o,setOpen:i,focusIndex:l,value:c,tmpValue:d}=e;const[u,p]=(0,r.e)(o,i),h=(0,s.useRef)(null),m=t||h,g=d||c||"";(0,s.useEffect)((()=>{o&&a.current?.focus()}),[o,a]);return{toggleRef:m,isInputEmpty:!g,getToggleProps:()=>({type:"button","aria-haspopup":!0,"aria-expanded":o,ref:m,onMouseDown:u,onClick:p,onKeyDown:e=>{const{key:n}=e;"ArrowDown"===n&&(e.preventDefault(),i(!0))}}),getInputProps:()=>({value:g,onKeyDown:e=>{const{key:t}=e;("Escape"===t||n&&l>=0&&"Enter"===t)&&setTimeout((()=>m.current?.focus()),0)}})}}},l=e=>(0,a.o)((0,o.d)({...e,select:!0,deselectOnClear:!1}),i(e))},8748:(e,n,t)=>{t.d(n,{S:()=>w});var a,o,s=t(4164),r=t(6540);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)({}).hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},i.apply(null,arguments)}const l=e=>{let{title:n,titleId:t,...s}=e;return r.createElement("svg",i({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,className:"icon icon-tabler icons-tabler-outline icon-tabler-square",viewBox:"0 0 24 24","aria-labelledby":t},s),n?r.createElement("title",{id:t},n):null,a||(a=r.createElement("path",{stroke:"none",d:"M0 0h24v24H0z"})),o||(o=r.createElement("path",{d:"M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"})))};var c,d;function u(){return u=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)({}).hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},u.apply(null,arguments)}const p=e=>{let{title:n,titleId:t,...a}=e;return r.createElement("svg",u({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"currentColor",className:"icon icon-tabler icons-tabler-filled icon-tabler-square-check",viewBox:"0 0 24 24","aria-labelledby":t},a),n?r.createElement("title",{id:t},n):null,c||(c=r.createElement("path",{fill:"none",d:"M0 0h24v24H0z"})),d||(d=r.createElement("path",{d:"M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005.195v12.666c0 1.96-1.537 3.56-3.472 3.662l-.195.005H5.667a3.667 3.667 0 0 1-3.662-3.472L2 18.333V5.667c0-1.96 1.537-3.56 3.472-3.662L5.667 2zm-2.626 7.293a1 1 0 0 0-1.414 0L11 12.585l-1.293-1.292-.094-.083a1 1 0 0 0-1.32 1.497l2 2 .094.083a1 1 0 0 0 1.32-.083l4-4 .083-.094a1 1 0 0 0-.083-1.32"})))},h="label_lSHF",m="input_rDJm",g="icon_wu1w",x="checked_X1o2";var f=t(4848);const w=e=>{let{label:n,checked:t,onChange:a}=e;return(0,f.jsxs)("label",{className:(0,s.$)(h,t&&x),children:[(0,f.jsx)("input",{className:m,type:"checkbox",checked:t,onChange:e=>a(e.target.checked)}),t?(0,f.jsx)(p,{className:g}):(0,f.jsx)(l,{className:g}),n]})}},2194:(e,n,t)=>{t.d(n,{A:()=>a});const a=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]},8785:(e,n,t)=>{t.d(n,{A:()=>a});const a="// https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States#States\n\nexport default [\n  'Alabama',\n  'Alaska',\n  'Arizona',\n  'Arkansas',\n  'California',\n  'Colorado',\n  'Connecticut',\n  'Delaware',\n  'Florida',\n  'Georgia',\n  'Hawaii',\n  'Idaho',\n  'Illinois',\n  'Indiana',\n  'Iowa',\n  'Kansas',\n  'Kentucky',\n  'Louisiana',\n  'Maine',\n  'Maryland',\n  'Massachusetts',\n  'Michigan',\n  'Minnesota',\n  'Mississippi',\n  'Missouri',\n  'Montana',\n  'Nebraska',\n  'Nevada',\n  'New Hampshire',\n  'New Jersey',\n  'New Mexico',\n  'New York',\n  'North Carolina',\n  'North Dakota',\n  'Ohio',\n  'Oklahoma',\n  'Oregon',\n  'Pennsylvania',\n  'Rhode Island',\n  'South Carolina',\n  'South Dakota',\n  'Tennessee',\n  'Texas',\n  'Utah',\n  'Vermont',\n  'Virginia',\n  'Washington',\n  'West Virginia',\n  'Wisconsin',\n  'Wyoming'\n];\n"}}]);