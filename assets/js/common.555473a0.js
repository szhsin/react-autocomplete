(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[76],{7210:(e,t,n)=>{"use strict";n.d(t,{A:()=>c});var r,o,s=n(6540);function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(null,arguments)}const c=e=>{let{title:t,titleId:n,...c}=e;return s.createElement("svg",a({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,className:"icon icon-tabler icons-tabler-outline icon-tabler-chevron-down",viewBox:"0 0 24 24","aria-labelledby":n},c),t?s.createElement("title",{id:n},t):null,r||(r=s.createElement("path",{stroke:"none",d:"M0 0h24v24H0z"})),o||(o=s.createElement("path",{d:"m6 9 6 6 6-6"})))}},6217:(e,t,n)=>{"use strict";n.d(t,{A:()=>c});var r,o,s=n(6540);function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(null,arguments)}const c=e=>{let{title:t,titleId:n,...c}=e;return s.createElement("svg",a({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,className:"icon icon-tabler icons-tabler-outline icon-tabler-chevron-up",viewBox:"0 0 24 24","aria-labelledby":n},c),t?s.createElement("title",{id:n},t):null,r||(r=s.createElement("path",{stroke:"none",d:"M0 0h24v24H0z"})),o||(o=s.createElement("path",{d:"m6 15 6-6 6 6"})))}},3678:(e,t,n)=>{"use strict";n.d(t,{A:()=>c});var r,o,s=n(6540);function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(null,arguments)}const c=e=>{let{title:t,titleId:n,...c}=e;return s.createElement("svg",a({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,className:"icon icon-tabler icons-tabler-outline icon-tabler-external-link",viewBox:"0 0 24 24","aria-labelledby":n},c),t?s.createElement("title",{id:n},t):null,r||(r=s.createElement("path",{stroke:"none",d:"M0 0h24v24H0z"})),o||(o=s.createElement("path",{d:"M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6M11 13l9-9M15 4h5v5"})))}},1236:(e,t,n)=>{"use strict";n.d(t,{A:()=>c});var r,o,s=n(6540);function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(null,arguments)}const c=e=>{let{title:t,titleId:n,...c}=e;return s.createElement("svg",a({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,className:"icon icon-tabler icons-tabler-outline icon-tabler-x",viewBox:"0 0 24 24","aria-labelledby":n},c),t?s.createElement("title",{id:n},t):null,r||(r=s.createElement("path",{stroke:"none",d:"M0 0h24v24H0z"})),o||(o=s.createElement("path",{d:"M18 6 6 18M6 6l12 12"})))}},1432:(e,t,n)=>{"use strict";n.d(t,{A:()=>R});var r=n(6540),o=n(2303),s=n(4164),a=n(5293),c=n(6342);function l(){const{prism:e}=(0,c.p)(),{colorMode:t}=(0,a.G)(),n=e.theme,r=e.darkTheme||n;return"dark"===t?r:n}var i=n(7559),u=n(8426),d=n.n(u);const p=/title=(?<quote>["'])(?<title>.*?)\1/,m=/\{(?<range>[\d,-]+)\}/,b={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},h={...b,lua:{start:"--",end:""},wasm:{start:"\\;\\;",end:""},tex:{start:"%",end:""},vb:{start:"['\u2018\u2019]",end:""},vbnet:{start:"(?:_\\s*)?['\u2018\u2019]",end:""},rem:{start:"[Rr][Ee][Mm]\\b",end:""},f90:{start:"!",end:""},ml:{start:"\\(\\*",end:"\\*\\)"},cobol:{start:"\\*>",end:""}},f=Object.keys(b);function g(e,t){const n=e.map((e=>{const{start:n,end:r}=h[e];return`(?:${n}\\s*(${t.flatMap((e=>[e.line,e.block?.start,e.block?.end].filter(Boolean))).join("|")})\\s*${r})`})).join("|");return new RegExp(`^\\s*(?:${n})\\s*$`)}function v(e,t){let n=e.replace(/\n$/,"");const{language:r,magicComments:o,metastring:s}=t;if(s&&m.test(s)){const e=s.match(m).groups.range;if(0===o.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${s}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const t=o[0].className,r=d()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(r),code:n}}if(void 0===r)return{lineClassNames:{},code:n};const a=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return g(["js","jsBlock"],t);case"jsx":case"tsx":return g(["js","jsBlock","jsx"],t);case"html":return g(["js","jsBlock","html"],t);case"python":case"py":case"bash":return g(["bash"],t);case"markdown":case"md":return g(["html","jsx","bash"],t);case"tex":case"latex":case"matlab":return g(["tex"],t);case"lua":case"haskell":case"sql":return g(["lua"],t);case"wasm":return g(["wasm"],t);case"vb":case"vba":case"visual-basic":return g(["vb","rem"],t);case"vbnet":return g(["vbnet","rem"],t);case"batch":return g(["rem"],t);case"basic":return g(["rem","f90"],t);case"fsharp":return g(["js","ml"],t);case"ocaml":case"sml":return g(["ml"],t);case"fortran":return g(["f90"],t);case"cobol":return g(["cobol"],t);default:return g(f,t)}}(r,o),c=n.split("\n"),l=Object.fromEntries(o.map((e=>[e.className,{start:0,range:""}]))),i=Object.fromEntries(o.filter((e=>e.line)).map((e=>{let{className:t,line:n}=e;return[n,t]}))),u=Object.fromEntries(o.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.start,t]}))),p=Object.fromEntries(o.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.end,t]})));for(let d=0;d<c.length;){const e=c[d].match(a);if(!e){d+=1;continue}const t=e.slice(1).find((e=>void 0!==e));i[t]?l[i[t]].range+=`${d},`:u[t]?l[u[t]].start=d:p[t]&&(l[p[t]].range+=`${l[p[t]].start}-${d-1},`),c.splice(d,1)}n=c.join("\n");const b={};return Object.entries(l).forEach((e=>{let[t,{range:n}]=e;d()(n).forEach((e=>{b[e]??=[],b[e].push(t)}))})),{lineClassNames:b,code:n}}const k={codeBlockContainer:"codeBlockContainer_Ckt0"};var w=n(4848);function y(e){let{as:t,...n}=e;const r=function(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((e=>{let[r,o]=e;const s=t[r];s&&"string"==typeof o&&(n[s]=o)})),n}(l());return(0,w.jsx)(t,{...n,style:r,className:(0,s.A)(n.className,k.codeBlockContainer,i.G.common.codeBlock)})}const x={codeBlockContent:"codeBlockContent_biex",codeBlockTitle:"codeBlockTitle_Ktv7",codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm",buttonGroup:"buttonGroup__atx"};function _(e){let{children:t,className:n}=e;return(0,w.jsx)(y,{as:"pre",tabIndex:0,className:(0,s.A)(x.codeBlockStandalone,"thin-scrollbar",n),children:(0,w.jsx)("code",{className:x.codeBlockLines,children:t})})}var j=n(9532);const B={attributes:!0,characterData:!0,childList:!0,subtree:!0};function C(e,t){const[n,o]=(0,r.useState)(),s=(0,r.useCallback)((()=>{o(e.current?.closest("[role=tabpanel][hidden]"))}),[e,o]);(0,r.useEffect)((()=>{s()}),[s]),function(e,t,n){void 0===n&&(n=B);const o=(0,j._q)(t),s=(0,j.Be)(n);(0,r.useEffect)((()=>{const t=new MutationObserver(o);return e&&t.observe(e,s),()=>t.disconnect()}),[e,o,s])}(n,(e=>{e.forEach((e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),s())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}var I=n(1765);const E={codeLine:"codeLine_lJS_",codeLineNumber:"codeLineNumber_Tfdd",codeLineContent:"codeLineContent_feaV"};function N(e){let{line:t,classNames:n,showLineNumbers:r,getLineProps:o,getTokenProps:a}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");const c=o({line:t,className:(0,s.A)(n,r&&E.codeLine)}),l=t.map(((e,t)=>(0,w.jsx)("span",{...a({token:e})},t)));return(0,w.jsxs)("span",{...c,children:[r?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("span",{className:E.codeLineNumber}),(0,w.jsx)("span",{className:E.codeLineContent,children:l})]}):l,(0,w.jsx)("br",{})]})}var L=n(1312);function A(e){return(0,w.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,w.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})})}function S(e){return(0,w.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,w.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})})}const T={copyButtonCopied:"copyButtonCopied_obH4",copyButtonIcons:"copyButtonIcons_eSgA",copyButtonIcon:"copyButtonIcon_y97N",copyButtonSuccessIcon:"copyButtonSuccessIcon_LjdS"};function O(e){let{code:t,className:n}=e;const[o,a]=(0,r.useState)(!1),c=(0,r.useRef)(void 0),l=(0,r.useCallback)((()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;if("string"!=typeof e)throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);const r=document.createElement("textarea"),o=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";const s=document.getSelection(),a=s.rangeCount>0&&s.getRangeAt(0);n.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;let c=!1;try{c=document.execCommand("copy")}catch{}r.remove(),a&&(s.removeAllRanges(),s.addRange(a)),o&&o.focus()}(t),a(!0),c.current=window.setTimeout((()=>{a(!1)}),1e3)}),[t]);return(0,r.useEffect)((()=>()=>window.clearTimeout(c.current)),[]),(0,w.jsx)("button",{type:"button","aria-label":o?(0,L.T)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,L.T)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,L.T)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,s.A)("clean-btn",n,T.copyButton,o&&T.copyButtonCopied),onClick:l,children:(0,w.jsxs)("span",{className:T.copyButtonIcons,"aria-hidden":"true",children:[(0,w.jsx)(A,{className:T.copyButtonIcon}),(0,w.jsx)(S,{className:T.copyButtonSuccessIcon})]})})}function V(e){return(0,w.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,w.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})})}const P={wordWrapButtonIcon:"wordWrapButtonIcon_Bwma",wordWrapButtonEnabled:"wordWrapButtonEnabled_EoeP"};function D(e){let{className:t,onClick:n,isEnabled:r}=e;const o=(0,L.T)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,w.jsx)("button",{type:"button",onClick:n,className:(0,s.A)("clean-btn",t,r&&P.wordWrapButtonEnabled),"aria-label":o,title:o,children:(0,w.jsx)(V,{className:P.wordWrapButtonIcon,"aria-hidden":"true"})})}function M(e){let{children:t,className:n="",metastring:o,title:a,showLineNumbers:i,language:u}=e;const{prism:{defaultLanguage:d,magicComments:m}}=(0,c.p)(),b=function(e){return e?.toLowerCase()}(u??function(e){const t=e.split(" ").find((e=>e.startsWith("language-")));return t?.replace(/language-/,"")}(n)??d),h=l(),f=function(){const[e,t]=(0,r.useState)(!1),[n,o]=(0,r.useState)(!1),s=(0,r.useRef)(null),a=(0,r.useCallback)((()=>{const n=s.current.querySelector("code");e?n.removeAttribute("style"):(n.style.whiteSpace="pre-wrap",n.style.overflowWrap="anywhere"),t((e=>!e))}),[s,e]),c=(0,r.useCallback)((()=>{const{scrollWidth:e,clientWidth:t}=s.current,n=e>t||s.current.querySelector("code").hasAttribute("style");o(n)}),[s]);return C(s,c),(0,r.useEffect)((()=>{c()}),[e,c]),(0,r.useEffect)((()=>(window.addEventListener("resize",c,{passive:!0}),()=>{window.removeEventListener("resize",c)})),[c]),{codeBlockRef:s,isEnabled:e,isCodeScrollable:n,toggle:a}}(),g=function(e){return e?.match(p)?.groups.title??""}(o)||a,{lineClassNames:k,code:_}=v(t,{metastring:o,language:b,magicComments:m}),j=i??function(e){return Boolean(e?.includes("showLineNumbers"))}(o);return(0,w.jsxs)(y,{as:"div",className:(0,s.A)(n,b&&!n.includes(`language-${b}`)&&`language-${b}`),children:[g&&(0,w.jsx)("div",{className:x.codeBlockTitle,children:g}),(0,w.jsxs)("div",{className:x.codeBlockContent,children:[(0,w.jsx)(I.f4,{theme:h,code:_,language:b??"text",children:e=>{let{className:t,style:n,tokens:r,getLineProps:o,getTokenProps:a}=e;return(0,w.jsx)("pre",{tabIndex:0,ref:f.codeBlockRef,className:(0,s.A)(t,x.codeBlock,"thin-scrollbar"),style:n,children:(0,w.jsx)("code",{className:(0,s.A)(x.codeBlockLines,j&&x.codeBlockLinesWithNumbering),children:r.map(((e,t)=>(0,w.jsx)(N,{line:e,getLineProps:o,getTokenProps:a,classNames:k[t],showLineNumbers:j},t)))})})}}),(0,w.jsxs)("div",{className:x.buttonGroup,children:[(f.isEnabled||f.isCodeScrollable)&&(0,w.jsx)(D,{className:x.codeButton,onClick:()=>f.toggle(),isEnabled:f.isEnabled}),(0,w.jsx)(O,{className:x.codeButton,code:_})]})]})]})}function R(e){let{children:t,...n}=e;const s=(0,o.A)(),a=function(e){return r.Children.toArray(e).some((e=>(0,r.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),c="string"==typeof a?M:_;return(0,w.jsx)(c,{...n,children:a},String(s))}},8860:(e,t,n)=>{"use strict";n.d(t,{A:()=>a});n(6540);var r=n(4164);const o={tabItem:"tabItem_s4ch"};var s=n(4848);function a(e){let{children:t,hidden:n,className:a}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,r.A)(o.tabItem,a),hidden:n,children:t})}},267:(e,t,n)=>{"use strict";n.d(t,{A:()=>_});var r=n(6540),o=n(4164),s=n(3104),a=n(6347),c=n(205),l=n(7485),i=n(1682),u=n(679);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:o}}=e;return{value:t,label:n,attributes:r,default:o}}))}(n);return function(e){const t=(0,i.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:n}=e;const o=(0,a.W6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l.aZ)(s),(0,r.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(o.location.search);t.set(s,e),o.replace({...o.location,search:t.toString()})}),[s,o])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:o}=e,s=p(e),[a,l]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:s}))),[i,d]=b({queryString:n,groupId:o}),[h,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[o,s]=(0,u.Dv)(n);return[o,(0,r.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:o}),g=(()=>{const e=i??h;return m({value:e,tabValues:s})?e:null})();(0,c.A)((()=>{g&&l(g)}),[g]);return{selectedValue:a,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),f(e)}),[d,f,s]),tabValues:s}}var f=n(2303),g=n(3678);const v={tabList:"tabList_TRJ7",tabItem:"tabItem_hGfb",tabItemLink:"tabItemLink_ikUN",tabLink:"tabLink_FngV"};var k=n(4848);function w(e){let{className:t,block:n,selectedValue:r,selectValue:a,tabValues:c}=e;const l=[],{blockElementScrollPositionUntilNextRender:i}=(0,s.a_)(),u=e=>{const t=e.currentTarget,n=l.indexOf(t),{value:o,attributes:s}=c[n];o!==r&&(i(t),!s?.link&&a(o))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=l.indexOf(e.currentTarget)+1;t=l[n]??l[0];break}case"ArrowLeft":{const n=l.indexOf(e.currentTarget)-1;t=l[n]??l[l.length-1];break}}t?.focus()};return(0,k.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":n},t),children:c.map((e=>{let{value:t,label:n,attributes:s}=e;const a=n??t,c=s?.link;return(0,k.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>l.push(e),onKeyDown:d,onClick:u,...s,className:(0,o.A)("tabs__item",v.tabItem,c&&v.tabItemLink,s?.className,{"tabs__item--active":r===t}),children:c?(0,k.jsxs)("a",{className:v.tabLink,href:c,target:"_blank",rel:"noopener noreferrer",children:[a," ",(0,k.jsx)(g.A,{})]}):a},t)}))})}function y(e){let{lazy:t,children:n,selectedValue:s}=e;const a=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=a.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:(0,o.A)("margin-top--md",e.props.className)}):null}return(0,k.jsx)("div",{className:"margin-top--md",children:a.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function x(e){const t=h(e);return(0,k.jsxs)("div",{className:(0,o.A)("tabs-container",v.tabList),children:[(0,k.jsx)(w,{...t,...e}),(0,k.jsx)(y,{...t,...e})]})}function _(e){const t=(0,f.A)();return(0,k.jsx)(x,{...e,children:d(e.children)},String(t))}},9094:(e,t,n)=>{"use strict";n.d(t,{i:()=>o});var r=n(6540);const o=(e,t)=>{const n=(0,r.useRef)(null);return(0,r.useEffect)((()=>{if(e){const e=n.current;if(!e)return;e.getBoundingClientRect().bottom>window.innerHeight&&e.scrollIntoView({block:"end",behavior:"smooth"}),e.scrollTop=0}}),[e,t.length]),n}},7869:(e,t,n)=>{"use strict";n.d(t,{A:()=>r});const r={wrap:"wrap_OR2f",block:"block_TB_0",iconBtn:"iconBtn_jpeK",clear:"clear_UIaJ iconBtn_jpeK",toggle:"toggle_fuWN iconBtn_jpeK",label:"label_tjeK",inputWrap:"inputWrap_v6Wm",input:"input_yipn block_TB_0",inputBorderless:"inputBorderless_tfte input_yipn block_TB_0",multiInput:"multiInput_IOZh block_TB_0",multiInputWrap:"multiInputWrap_SA0w",selectedItem:"selectedItem_Y5vk",removeItem:"removeItem_A7gD iconBtn_jpeK",popup:"popup_r2d6",list:"list_s7Yq block_TB_0 popup_r2d6",multiList:"multiList_PSk_ list_s7Yq block_TB_0 popup_r2d6",noScroll:"noScroll_sC5i",scroll:"scroll_hiZj",dropdown:"dropdown_Dh4q block_TB_0 popup_r2d6",multiDropdown:"multiDropdown_RB2g dropdown_Dh4q block_TB_0 popup_r2d6",dropdownClear:"dropdownClear_gV5d iconBtn_jpeK",dropdownList:"dropdownList_KhBg",item:"item_yDgH",itemCheckable:"itemCheckable_pOZy item_yDgH",selected:"selected_ABJI",checked:"checked_DSOJ",focused:"focused_Mlzd",disabled:"disabled_m1hz",creatable:"creatable_l_CL",noResult:"noResult_n7yc item_yDgH",options:"options_IXd2",button:"button_ZS1m block_TB_0",groupHead:"groupHead_ysix"}},8426:(e,t)=>{function n(e){let t,n=[];for(let r of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(r))n.push(parseInt(r,10));else if(t=r.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,r,o,s]=t;if(r&&s){r=parseInt(r),s=parseInt(s);const e=r<s?1:-1;"-"!==o&&".."!==o&&"\u2025"!==o||(s+=e);for(let t=r;t!==s;t+=e)n.push(t)}}return n}t.default=n,e.exports=n},4801:(e,t,n)=>{"use strict";n.d(t,{D$:()=>a,Kf:()=>r,OX:()=>s,g4:()=>o,l0:()=>c});const r=-1,o=(e,t)=>e===t,s=(e,t)=>e&&e+t,a={tabIndex:-1,type:"button"},c=(e,t)=>({...a,"aria-expanded":t,"aria-controls":s(e,"l")})},5464:(e,t,n)=>{"use strict";n.d(t,{d:()=>a});var r=n(4801),o=n(7500);const s=e=>e?.scrollIntoView({block:"nearest"}),a=({select:e,rovingText:t=!e,deselectOnClear:n=!0,deselectOnChange:a=!0,closeOnSelect:c=!0}={})=>({getItemValue:l,onSelectChange:i,isItemSelected:u,isItemDisabled:d,isItemAction:p,onAction:m,selected:b,value:h,onChange:f,tmpValue:g,setTmpValue:v,focusIndex:k,setFocusIndex:w,open:y,setOpen:x,inputRef:_,items:j,id:B})=>{var C;const[I,E,N]=(0,o._)(_),L=null!=(C=g||h)?C:Array.isArray(b)?"":l(b),A=j[k],S=(0,r.OX)(B,"l"),T=t=>{if(p?.(t))return m?.(t),!0;const n=l(t);e||f(n);const r=n.length;_.current?.setSelectionRange(r,r),i(t)},O=t=>{w(r.Kf),v(),(t||c)&&(x(!1),e&&f())},V={onMouseDown:I,onMouseUp:N};return{isInputEmpty:!L,getFocusCaptureProps:()=>V,getClearProps:()=>({...r.D$,...V,onClick:()=>{v(),w(r.Kf),f(""),n&&i()}}),getListProps:()=>({...V,id:S,role:"listbox"}),getItemProps:({item:t,index:n})=>({id:(0,r.OX)(B,n),role:"option","aria-selected":e?u(t):n===k,ref:n===k?s:void 0,onClick:()=>!d?.(t)&&O(T(t)),onPointerMove:()=>!d?.(t)&&w(n)}),getInputProps:()=>({type:"text",role:"combobox",autoComplete:"off","aria-autocomplete":"list","aria-expanded":y,"aria-controls":S,"aria-activedescendant":k>=0?(0,r.OX)(B,k):void 0,ref:_,value:L,onChange:t=>{x(!0),w(r.Kf),v();const o=t.target.value;f(o),(!e&&a||n&&!o)&&i()},onBlur:()=>{E()||(e||f(L),O(!0))},onKeyDown:r=>{switch(r.key){case"ArrowUp":case"ArrowDown":r.preventDefault(),y?(e=>{const n=t?-1:0;let r,o=k,s=0;const a=j.length;for(;e?++o>=a&&(o=n):--o<n&&(o=a-1),r=j[o],r&&d?.(r);)if(++s>=a)return;w(o),t&&v(l(r))})("ArrowUp"!=r.key):x(!0);break;case"Enter":y&&(A?(r.preventDefault(),O(T(A))):e||O(!0));break;case"Escape":y?O(!0):(f(""),n&&i())}},onMouseDown:e=>e.stopPropagation(),onClick:()=>x(!0)})}}},2474:(e,t,n)=>{"use strict";n.d(t,{P:()=>o});var r=n(4801);const o=()=>({id:e})=>{const t=(0,r.OX)(e,"i"),n=(0,r.OX)(e,"a");return{getLabelProps:()=>({id:n,htmlFor:t}),getInputProps:()=>({id:t}),getListProps:()=>({"aria-labelledby":n})}}},1510:(e,t,n)=>{"use strict";n.d(t,{n:()=>i});var r=n(3862),o=n(5464),s=n(4801),a=n(7990),c=n(7500);var l=n(2474);const i=e=>(0,r.o)((0,o.d)(e),(({id:e,inputRef:t,open:n,setOpen:r})=>{const[o,l]=(0,a.e)(n,r),[i,u,d]=(0,c._)(t);return{getToggleProps:()=>({...(0,s.l0)(e,n),onMouseDown:()=>{o(),i()},onClick:()=>{l(),d()}}),getInputProps:()=>({onBlur:u})}}),(0,l.P)())},5675:(e,t,n)=>{"use strict";n.d(t,{m:()=>c});var r=n(6540);let o=0;const s=r.useId||(()=>{const[e,t]=(0,r.useState)();return(0,r.useEffect)((()=>t(++o)),[]),e&&`szh-ac${e}-`});var a=n(4801);const c=({onChange:e,feature:t,isItemSelected:n,inputRef:o,getItemValue:c,...l})=>{const i=(0,r.useRef)(null),[u,d]=(0,r.useState)(),[p,m]=(0,r.useState)(!1),[b,h]=(0,r.useState)(a.Kf),f={isItemSelected:n,inputRef:o||i,focusIndex:b,setFocusIndex:h,open:p,setOpen:m},g=t({id:s(),tmpValue:u,setTmpValue:d,onChange:t=>l.value!=t&&e?.(t),getItemValue:e=>null==e?"":c?c(e):e.toString(),...l,...f});return{...f,...g}}},6507:(e,t,n)=>{"use strict";n.d(t,{B:()=>s});var r=n(4801),o=n(5675);const s=({isEqual:e=r.g4,selected:t,onSelectChange:n,flipOnSelect:s,...a})=>(0,o.m)({...a,selected:t,isEqual:e,isItemSelected:n=>e(n,t),onSelectChange:r=>{e(r,t)?s&&n?.():n?.(r)}})},7500:(e,t,n)=>{"use strict";n.d(t,{_:()=>o});var r=n(5487);const o=e=>{const t=(0,r.d)({});return[()=>{t.a=1},()=>{if(t.a)return t.a=0,e.current?.focus(),!0},()=>{t.a=0,e.current?.focus()}]}},5487:(e,t,n)=>{"use strict";n.d(t,{d:()=>o});var r=n(6540);const o=e=>(0,r.useState)(e)[0]},7990:(e,t,n)=>{"use strict";n.d(t,{e:()=>o});var r=n(5487);const o=(e,t)=>{const n=(0,r.d)({});return[()=>n.a=e,()=>{n.a?n.a=0:t(!0)}]}},3862:(e,t,n)=>{"use strict";n.d(t,{o:()=>o});const r=(e,t)=>{const n={...e};return Object.entries(t).forEach((([t,o])=>{if("function"==typeof o){const s=e[t];n[t]=s?(...e)=>{const t=s(...e),n=o(...e);if("object"==typeof t)return r(t,n)}:o}else n[t]=o})),n},o=(...e)=>t=>e.reduce(((e,n)=>r(e,n(t))),{})},8453:(e,t,n)=>{"use strict";n.d(t,{R:()=>a,x:()=>c});var r=n(6540);const o={},s=r.createContext(o);function a(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);