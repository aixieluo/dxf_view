(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-23de038c"],{"0f4c":function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container"},[o("el-steps",{staticStyle:{"margin-bottom":"30px"},attrs:{active:1,"align-center":""}},[o("el-step",{attrs:{title:"创建订单"}}),t._v(" "),o("el-step",{attrs:{title:"选择定制规格"}})],1),t._v(" "),o("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"auto-complete":"on","label-width":"120px"}},[o("el-form-item",{attrs:{label:"淘宝订单号",prop:"oid"}},[o("el-input",{ref:"oid",model:{value:t.form.oid,callback:function(e){t.$set(t.form,"oid",e)},expression:"form.oid"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"收件人信息",prop:"recipient_information"}},[o("el-input",{ref:"recipient_information",attrs:{type:"textarea"},model:{value:t.form.recipient_information,callback:function(e){t.$set(t.form,"recipient_information",e)},expression:"form.recipient_information"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"定制类型",prop:"sofa_cover_id"}},[o("el-radio-group",{ref:"sofa_cover_id",on:{change:t.getSofa},model:{value:t.form.sofa_cover_id,callback:function(e){t.$set(t.form,"sofa_cover_id",e)},expression:"form.sofa_cover_id"}},t._l(t.sofas,(function(e){return o("el-radio",{attrs:{label:e.id}},[t._v(t._s(e.name))])})),1)],1),t._v(" "),o("el-form-item",{attrs:{label:"材料选择",prop:"sofa_cover_item_id"}},[o("el-radio-group",{ref:"sofa_cover_item_id",model:{value:t.form.sofa_cover_item_id,callback:function(e){t.$set(t.form,"sofa_cover_item_id",e)},expression:"form.sofa_cover_item_id"}},t._l(t.sofaItems,(function(e){return o("el-radio",{attrs:{label:e.id}},[t._v(t._s(e.chain_name))])})),1)],1),t._v(" "),o("el-form-item",{attrs:{label:"备注",prop:"note"}},[o("el-input",{ref:"note",attrs:{type:"textarea"},model:{value:t.form.note,callback:function(e){t.$set(t.form,"note",e)},expression:"form.note"}})],1),t._v(" "),o("el-form-item",[o("el-button",{attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return t.onSubmit(e)}}},[t._v("创建")])],1)],1)],1)},n=[],a=o("71fa"),i=o("f8b7"),c={data:function(){return{form:{oid:"",recipient_information:"",sofa_cover_id:"",sofa_cover_item_id:"",note:""},sofas:[],sofaItems:[],rules:{oid:[{required:!0,trigger:"blur",message:"淘宝订单号必填"}],recipient_information:[{required:!0,trigger:"blur",message:"收件人信息必填"}],sofa_cover_id:[{required:!0,trigger:"blur",message:"规格型号必填"}],sofa_cover_item_id:[{required:!0,trigger:"blur",message:"材料选择必填"}]},loading:!1}},mounted:function(){var t=this;Object(a["g"])().then((function(e){var o=e.data;t.sofas=o}))},methods:{onSubmit:function(){var t=this;this.$refs.form.validate((function(e){e&&(t.loading=!0,Object(i["b"])(t.form).then((function(e){var o=e.data;t.$router.push("/order/".concat(o.id,"/design/update?step=1")),t.loading=!1})).catch((function(e){console.log(e),t.loading=!1})))}))},getSofa:function(){var t=this;Object(a["d"])(this.form.sofa_cover_id).then((function(e){var o=e.data;t.form.sofa_cover_item_id=null,t.sofaItems=o.items}))}}},u=c,f=(o("864c"),o("2877")),s=Object(f["a"])(u,r,n,!1,null,"7410575c",null);e["default"]=s.exports},"71fa":function(t,e,o){"use strict";o.d(e,"h",(function(){return n})),o.d(e,"g",(function(){return a})),o.d(e,"d",(function(){return i})),o.d(e,"a",(function(){return c})),o.d(e,"i",(function(){return u})),o.d(e,"f",(function(){return f})),o.d(e,"e",(function(){return s})),o.d(e,"b",(function(){return d})),o.d(e,"j",(function(){return l})),o.d(e,"c",(function(){return m}));var r=o("b775");function n(t){return Object(r["a"])({url:"sofa?".concat(t),method:"get"})}function a(){return Object(r["a"])({url:"sofa/list",method:"get"})}function i(t){return Object(r["a"])({url:"sofa/".concat(t),method:"get"})}function c(t){return Object(r["a"])({url:"sofa",method:"post",data:t})}function u(t,e){return Object(r["a"])({url:"sofa/".concat(t),method:"post",data:e})}function f(t,e){return Object(r["a"])({url:"sofa/".concat(t,"/items?").concat(e),method:"get"})}function s(t,e){return Object(r["a"])({url:"sofa/".concat(t,"/items/").concat(e),method:"get"})}function d(t,e){return Object(r["a"])({url:"sofa/".concat(t,"/items"),method:"post",data:e})}function l(t,e,o){return Object(r["a"])({url:"sofa/".concat(t,"/items/").concat(e),method:"post",data:o})}function m(){return Object(r["a"])({url:"designs",method:"get"})}},"773d":function(t,e,o){},"864c":function(t,e,o){"use strict";var r=o("773d"),n=o.n(r);n.a},f8b7:function(t,e,o){"use strict";o.d(e,"g",(function(){return n})),o.d(e,"e",(function(){return a})),o.d(e,"b",(function(){return i})),o.d(e,"h",(function(){return c})),o.d(e,"c",(function(){return u})),o.d(e,"a",(function(){return f})),o.d(e,"f",(function(){return s})),o.d(e,"i",(function(){return d})),o.d(e,"d",(function(){return l}));var r=o("b775");function n(t){return Object(r["a"])({url:"order?".concat(t),method:"get"})}function a(t){return Object(r["a"])({url:"order/".concat(t),method:"get"})}function i(t){return Object(r["a"])({url:"order",method:"post",data:t})}function c(t,e){return Object(r["a"])({url:"order/".concat(t,"/update"),method:"post",data:e})}function u(t){return Object(r["a"])({url:"order/".concat(t,"/delete"),method:"post"})}function f(t){return Object(r["a"])({url:"order/".concat(t,"/confirm"),method:"post"})}function s(t,e){return Object(r["a"])({url:"order/".concat(t,"/design/").concat(e),method:"get"})}function d(t,e,o){return Object(r["a"])({url:"order/".concat(t,"/design/").concat(e,"/update"),method:"post",data:o})}function l(t,e){return Object(r["a"])({url:"order/".concat(t,"/design/").concat(e,"/delete"),method:"post"})}}}]);