import{m as p,q as _,s as g,b as m,a as h,f as o,x as P,o as x,j as d,y as i}from"./entry.31175190.js";import S from"./index.0d181675.js";import k from"./generator.5110f7ad.js";import v from"./finish.eb7acc34.js";import"./customButton.e743fb08.js";const b=p({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(t,{slots:n,attrs:f}){const c=_(!1);return g(()=>{c.value=!0}),e=>{var r;if(c.value)return(r=n.default)==null?void 0:r.call(n);const a=n.fallback||n.placeholder;if(a)return a();const l=e.fallback||e.placeholder||"",s=e.fallbackTag||e.placeholderTag||"span";return m(s,f,l)}}});const U={components:{Index:S,Generator:k,Finish:v},data(){return{currentPage:"index",fromwhomSelected:"fromman"}},methods:{updatePage(t){this.currentPage=t||"index",this.currentPage=="generator"&&this.$refs.generator.clearLayers()},updateSelected(t){this.fromwhomSelected=t??"fromman"}}},w={class:"content"};function y(t,n,f,c,e,a){const l=i("index"),s=i("generator"),r=i("finish"),u=b;return x(),m("div",w,[o(u,{placeholder:"loading"},{default:P(()=>[o(l,{class:d(["page",!e.currentPage||e.currentPage=="index"?"isActive":""]),onUpdatePage:a.updatePage,onUpdateSelected:a.updateSelected},null,8,["onUpdatePage","onUpdateSelected","class"]),o(s,{class:d(["page",e.currentPage=="generator"?"isActive":""]),onUpdatePage:a.updatePage,ref:"generator",fromwhomSelected:this.fromwhomSelected},null,8,["onUpdatePage","class","fromwhomSelected"]),o(r,{class:d(["page",e.currentPage=="finish"?"isActive":""]),onUpdatePage:a.updatePage},null,8,["onUpdatePage","class"])]),_:1})])}const q=h(U,[["render",y]]);export{q as default};