(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a3f6b3fe"],{6763:function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"auto-complete":"on","label-width":"120px"}},[r("el-form-item",{attrs:{label:"产品名称",prop:"sofa_name"}},[r("el-input",{ref:"sofa_name",attrs:{disabled:""},model:{value:e.sofa_name,callback:function(t){e.sofa_name=t},expression:"sofa_name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"材料名称",prop:"name"}},[r("el-input",{ref:"name",model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"材料编号",prop:"uid"}},[r("el-input",{ref:"uid",model:{value:e.form.uid,callback:function(t){e.$set(e.form,"uid",t)},expression:"form.uid"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"规格名称",prop:"color"}},[r("el-input",{ref:"color",model:{value:e.form.color,callback:function(t){e.$set(e.form,"color",t)},expression:"form.color"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"规格编号",prop:"fid"}},[r("el-input",{ref:"fid",model:{value:e.form.fid,callback:function(t){e.$set(e.form,"fid",t)},expression:"form.fid"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"材料单价",prop:"price"}},[r("el-input",{ref:"price",model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"预览图",prop:"preview"}},[r("el-upload",{ref:"upload",attrs:{limit:1,action:this.baseUrl+"/upload","list-type":"picture-card","file-list":e.files,"auto-upload":!0,"on-success":e.handleSuccess},scopedSlots:e._u([{key:"file",fn:function(t){var i=t.file;return r("div",{},[r("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:i.url,alt:""}}),e._v(" "),r("span",{staticClass:"el-upload-list__item-actions"},[r("span",{staticClass:"el-upload-list__item-preview",on:{click:function(t){return e.handlePictureCardPreview(i)}}},[r("i",{staticClass:"el-icon-zoom-in"})]),e._v(" "),e.disabled?e._e():r("span",{staticClass:"el-upload-list__item-delete",on:{click:function(t){return e.handleRemove(i)}}},[r("i",{staticClass:"el-icon-delete"})])])])}}])},[r("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})]),e._v(" "),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return e.onSubmit(t)}}},[e._v("更新")])],1)],1)],1)},n=[],o=(r("7f7f"),r("71fa")),a={data:function(){return{form:{name:"",uid:"",color:"",fid:"",price:"",preview:""},sofa_name:"",dialogImageUrl:"",dialogVisible:!1,disabled:!1,files:[],rules:{name:[{required:!0,trigger:"blur",message:"必填"}],uid:[{required:!0,trigger:"blur",message:"必填"}],color:[{required:!0,trigger:"blur",message:"必填"}],fid:[{required:!0,trigger:"blur",message:"必填"}],price:[{required:!0,trigger:"blur",message:"必填"}],preview:[{required:!0,trigger:"blur",message:"必须上传一张图"}]},loading:!1}},computed:{id:function(){return this.$route.params.id},itemId:function(){return this.$route.params.itemId},baseUrl:function(){return"/api"}},mounted:function(){var e=this;Object(o["f"])(this.id).then((function(t){var r=t.data;e.sofa_name=r.name})),Object(o["g"])(this.id,this.itemId).then((function(t){var r=t.data;e.form=r,e.files=[{url:r.preview,name:"test"}]}))},methods:{onSubmit:function(){var e=this;this.$refs.form.validate((function(t){t&&(e.loading=!0,Object(o["l"])(e.id,e.itemId,e.form).then((function(t){e.$router.push("/sofa/".concat(e.id,"/items/index")),e.loading=!1})).catch((function(t){console.log(t),e.loading=!1})))}))},handleRemove:function(e,t){this.$refs.upload.handleRemove(e),this.form.preview=""},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},handleSuccess:function(e,t,r){this.form.preview=e.url}}},l=a,s=(r("8396"),r("2877")),u=Object(s["a"])(l,i,n,!1,null,"aea3baac",null);t["default"]=u.exports},"71fa":function(e,t,r){"use strict";r.d(t,"j",(function(){return n})),r.d(t,"i",(function(){return o})),r.d(t,"f",(function(){return a})),r.d(t,"a",(function(){return l})),r.d(t,"k",(function(){return s})),r.d(t,"c",(function(){return u})),r.d(t,"h",(function(){return c})),r.d(t,"g",(function(){return f})),r.d(t,"b",(function(){return d})),r.d(t,"l",(function(){return m})),r.d(t,"d",(function(){return p})),r.d(t,"e",(function(){return b}));var i=r("b775");function n(e){return Object(i["a"])({url:"sofa?".concat(e),method:"get"})}function o(){return Object(i["a"])({url:"sofa/list",method:"get"})}function a(e){return Object(i["a"])({url:"sofa/".concat(e),method:"get"})}function l(e){return Object(i["a"])({url:"sofa",method:"post",data:e})}function s(e,t){return Object(i["a"])({url:"sofa/".concat(e),method:"post",data:t})}function u(e){return Object(i["a"])({url:"sofa/".concat(e,"/delete"),method:"post"})}function c(e,t){return Object(i["a"])({url:"sofa/".concat(e,"/items?").concat(t),method:"get"})}function f(e,t){return Object(i["a"])({url:"sofa/".concat(e,"/items/").concat(t),method:"get"})}function d(e,t){return Object(i["a"])({url:"sofa/".concat(e,"/items"),method:"post",data:t})}function m(e,t,r){return Object(i["a"])({url:"sofa/".concat(e,"/items/").concat(t),method:"post",data:r})}function p(e,t){return Object(i["a"])({url:"sofa/".concat(e,"/items/").concat(t,"/delete"),method:"post"})}function b(){return Object(i["a"])({url:"designs",method:"get"})}},8396:function(e,t,r){"use strict";var i=r("b606"),n=r.n(i);n.a},b606:function(e,t,r){}}]);