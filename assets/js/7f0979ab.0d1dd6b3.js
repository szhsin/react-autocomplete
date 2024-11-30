"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[112],{1122:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>v,contentTitle:()=>j,default:()=>I,frontMatter:()=>P,metadata:()=>s,toc:()=>C});const s=JSON.parse('{"id":"docs/extras/select-only","title":"Select-Only Combobox","description":"This is not a separate feature, but it can be easily achieved by by making the input read-only.","source":"@site/docs/docs/extras/select-only.mdx","sourceDirName":"docs/extras","slug":"/docs/extras/select-only","permalink":"/react-autocomplete/docs/extras/select-only","draft":false,"unlisted":false,"editUrl":"https://github.com/szhsin/react-autocomplete/tree/master/website/docs/docs/extras/select-only.mdx","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"sidebar_label":"Select-Only"},"sidebar":"docsSidebar","previous":{"title":"Action items","permalink":"/react-autocomplete/docs/extras/action-items"},"next":{"title":"Async example","permalink":"/react-autocomplete/docs/extras/async"}}');var o=n(4848),l=n(8453),a=n(267),r=n(8860),i=n(1432);const c="import { useState } from 'react';\nimport { useCombobox, autocomplete } from '@szhsin/react-autocomplete';\nimport FRUITS from '../../data/fruits';\n\nconst SelectOnly = () => {\n  const [value, setValue] = useState<string>();\n  const [selected, setSelected] = useState<string>();\n\n  const {\n    getFocusCaptureProps,\n    getLabelProps,\n    getInputProps,\n    getClearProps,\n    getToggleProps,\n    getListProps,\n    getItemProps,\n    open,\n    focusIndex,\n    isInputEmpty\n  } = useCombobox({\n    // items are fixed\n    // highlight-next-line\n    items: FRUITS,\n    value,\n    onChange: setValue,\n    selected,\n    onSelectChange: setSelected,\n    feature: autocomplete({ select: true })\n  });\n\n  return (\n    <div>\n      <label {...getLabelProps()} {...getFocusCaptureProps()}>\n        Fruit\n      </label>\n\n      <div>\n        <input\n          // Make the input readonly\n          // highlight-next-line\n          readOnly\n          placeholder=\"Select...\"\n          {...getInputProps()}\n        />\n        {!isInputEmpty && <button {...getClearProps()}>X</button>}\n        <button {...getToggleProps()}>{open ? '\u2191' : '\u2193'}</button>\n      </div>\n\n      <ul\n        {...getListProps()}\n        style={{\n          display: open ? 'block' : 'none',\n          position: 'absolute',\n          listStyle: 'none',\n          color: '#000',\n          background: '#fff',\n          overflow: 'auto',\n          maxHeight: 300,\n          margin: 0,\n          padding: 0\n        }}\n      >\n        {FRUITS.map((item, index) => (\n          <li\n            style={{\n              background: focusIndex === index ? '#ddd' : 'none',\n              textDecoration: selected === item ? 'underline' : 'none'\n            }}\n            key={item}\n            {...getItemProps({ item, index })}\n          >\n            {item}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n};\n\nexport default SelectOnly;\n";var p=n(1516),d=n(6540),u=n(4164),m=n(6238),b=n(8185),g=n(1236),x=n(7210),h=n(6217),y=n(8155),f=n(7869),S=n(9094);const A=()=>{const[e,t]=(0,d.useState)(),[n,s]=(0,d.useState)(),l=y.A,{getFocusCaptureProps:a,getLabelProps:r,getInputProps:i,getClearProps:c,getToggleProps:p,getListProps:A,getItemProps:P,open:j,focusIndex:v,isInputEmpty:C}=(0,m.B)({items:l,value:e,onChange:t,selected:n,onSelectChange:s,feature:(0,b.n)({select:!0})}),k=(0,S.i)(j,l);return(0,o.jsxs)("div",{className:f.A.wrap,children:[(0,o.jsx)("label",{className:f.A.label,...r(),...a(),children:"Fruit"}),(0,o.jsxs)("div",{className:f.A.inputWrap,children:[(0,o.jsx)("input",{readOnly:!0,className:f.A.input,placeholder:"Select...",...i()}),!C&&(0,o.jsx)("button",{className:f.A.clear,...c(),children:(0,o.jsx)(g.A,{})}),(0,o.jsx)("button",{className:f.A.toggle,...p(),children:j?(0,o.jsx)(h.A,{}):(0,o.jsx)(x.A,{})})]}),(0,o.jsx)("ul",{ref:k,className:(0,u.$)(f.A.list,f.A.noScroll),...A(),style:{display:j?"block":"none"},children:l.map(((e,t)=>(0,o.jsx)("li",{className:(0,u.$)(f.A.item,v===t&&f.A.focused,n===e&&f.A.selected),...P({item:e,index:t}),children:e},e)))})]})},P={sidebar_position:5,sidebar_label:"Select-Only"},j="Select-Only Combobox",v={},C=[];function k(e){const t={h1:"h1",header:"header",p:"p",...(0,l.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"select-only-combobox",children:"Select-Only Combobox"})}),"\n",(0,o.jsx)(t.p,{children:"This is not a separate feature, but it can be easily achieved by by making the input read-only."}),"\n",(0,o.jsx)(A,{}),"\n",(0,o.jsxs)(a.A,{children:[(0,o.jsx)(r.A,{value:"ts",label:"SelectOnly.tsx",children:(0,o.jsx)(i.A,{language:"tsx",children:c})}),(0,o.jsx)(r.A,{value:"data",label:"data/fruits.ts",children:(0,o.jsx)(i.A,{language:"ts",children:p.A})})]})]})}function I(e={}){const{wrapper:t}={...(0,l.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(k,{...e})}):k(e)}},8185:(e,t,n)=>{n.d(t,{n:()=>c});var s=n(5430),o=n(1975),l=n(4444),a=n(9301),r=n(9635);var i=n(8321);const c=e=>(0,s.o)((0,o.d)(e),(e=>{let{id:t,inputRef:n,open:s,setOpen:o}=e;const[i,c]=(0,a.e)(s,o),[p,d,u]=(0,r._)(n);return{getToggleProps:()=>({...(0,l.l0)(t,s),onMouseDown:()=>{i(),p()},onClick:()=>{c(),u()}}),getInputProps:()=>({onBlur:d})}}),(0,i.P)())},8155:(e,t,n)=>{n.d(t,{A:()=>s});const s=["Apple","Banana","Blueberry","Cherry","Grape","Pineapple","Strawberry"]},1516:(e,t,n)=>{n.d(t,{A:()=>s});const s="export default ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Pineapple', 'Strawberry'];\n"}}]);