"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[73],{5119:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"docs/design","title":"Design Concept","description":"The API consists of a main React hook and a feature that work together under a defined contract.","source":"@site/docs/docs/design.md","sourceDirName":"docs","slug":"/docs/design","permalink":"/react-autocomplete/docs/design","draft":false,"unlisted":false,"editUrl":"https://github.com/szhsin/react-autocomplete/tree/master/website/docs/docs/design.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"docsSidebar","previous":{"title":"Getting Started","permalink":"/react-autocomplete/docs/intro"},"next":{"title":"Install","permalink":"/react-autocomplete/docs/install"}}');var o=s(4848),a=s(8453);const r={sidebar_position:2},i="Design Concept",c={},l=[{value:"Main hook",id:"main-hook",level:3},{value:"Feature (A replaceable module)",id:"feature-a-replaceable-module",level:3}];function d(e){const t={a:"a",code:"code",em:"em",h1:"h1",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"design-concept",children:"Design Concept"})}),"\n",(0,o.jsx)(t.p,{children:"The API consists of a main React hook and a feature that work together under a defined contract."}),"\n",(0,o.jsx)(t.h3,{id:"main-hook",children:"Main hook"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:"useCombobox/useMultiSelect"})," - acts as the primary entry point, utilizing a classic headless React hook style API. It manages state and data, and must connect with a ",(0,o.jsx)(t.em,{children:"feature"})," to deliver the required functionalities."]}),"\n",(0,o.jsx)(t.h3,{id:"feature-a-replaceable-module",children:"Feature (A replaceable module)"}),"\n",(0,o.jsxs)(t.p,{children:["A feature implements the desired functionalities (behavior), such as ",(0,o.jsx)(t.code,{children:"autocomplete"})," or ",(0,o.jsx)(t.code,{children:"multiSelect"}),". There are two types of features:"]}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.a,{href:"https://github.com/szhsin/react-autocomplete/tree/master/src/features/atom",children:"Atom"})}),": A minimal, indivisible unit that can function independently or be combined into larger features."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.a,{href:"https://github.com/szhsin/react-autocomplete/tree/master/src/features/molecule",children:"Molecule"})}),": Composed of two or more atoms or other molecules, providing more advanced features."]}),"\n"]}),"\n",(0,o.jsx)(t.p,{children:"One advantage of this architecture is you can easily combine any number of atoms or molecules to create the feature you need, as long as the resulting feature conforms to the same contract."})]})}function h(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}}}]);