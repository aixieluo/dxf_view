(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f74afa2"],{"11e5":function(e,t,i){"use strict";var r=i("a565"),o=i.n(r);o.a},6763:function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"auto-complete":"on","label-width":"120px"}},[i("el-form-item",{attrs:{label:"产品名称",prop:"sofa_name"}},[i("el-input",{ref:"sofa_name",attrs:{disabled:""},model:{value:e.sofa_name,callback:function(t){e.sofa_name=t},expression:"sofa_name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"材料名称",prop:"name"}},[i("el-input",{ref:"name",model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"材料编号",prop:"uid"}},[i("el-input",{ref:"uid",model:{value:e.form.uid,callback:function(t){e.$set(e.form,"uid",t)},expression:"form.uid"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"规格名称",prop:"color"}},[i("el-input",{ref:"color",model:{value:e.form.color,callback:function(t){e.$set(e.form,"color",t)},expression:"form.color"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"规格编号",prop:"fid"}},[i("el-input",{ref:"fid",model:{value:e.form.fid,callback:function(t){e.$set(e.form,"fid",t)},expression:"form.fid"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"材料单价",prop:"price"}},[i("el-input",{ref:"price",model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"预览图",prop:"preview"}},[i("el-upload",{ref:"upload",attrs:{limit:1,action:this.baseUrl+"/upload","list-type":"picture-card","file-list":e.files,"auto-upload":!0,"on-success":e.handleSuccess},scopedSlots:e._u([{key:"file",fn:function(t){var r=t.file;return i("div",{},[i("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:r.url,alt:""}}),e._v(" "),i("span",{staticClass:"el-upload-list__item-actions"},[i("span",{staticClass:"el-upload-list__item-preview",on:{click:function(t){return e.handlePictureCardPreview(r)}}},[i("i",{staticClass:"el-icon-zoom-in"})]),e._v(" "),e.disabled?e._e():i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(t){return e.handleRemove(r)}}},[i("i",{staticClass:"el-icon-delete"})])])])}}])},[i("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})]),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),i("el-form-item",[i("el-button",{attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return e.onSubmit(t)}}},[e._v("更新")])],1)],1)],1)},o=[],n=(i("7f7f"),i("71fa")),a={data:function(){return{form:{name:"",uid:"",color:"",fid:"",price:"",preview:""},sofa_name:"",dialogImageUrl:"",dialogVisible:!1,disabled:!1,files:[],rules:{name:[{required:!0,trigger:"blur",message:"必填"}],uid:[{required:!0,trigger:"blur",message:"必填"}],color:[{required:!0,trigger:"blur",message:"必填"}],fid:[{required:!0,trigger:"blur",message:"必填"}],price:[{required:!0,trigger:"blur",message:"必填"}],preview:[{required:!0,trigger:"blur",message:"必须上传一张图"}]},loading:!1}},computed:{id:function(){return this.$route.params.id},itemId:function(){return this.$route.params.itemId},baseUrl:function(){return"/api"}},mounted:function(){var e=this;Object(n["d"])(this.id).then((function(t){var i=t.data;e.sofa_name=i.name})),Object(n["e"])(this.id,this.itemId).then((function(t){var i=t.data;e.form=i,e.files=[{url:"http://dxf.ssl"+i.preview,name:"test"}]}))},methods:{onSubmit:function(){var e=this;this.$refs.form.validate((function(t){t&&(e.loading=!0,Object(n["j"])(e.id,e.itemId,e.form).then((function(t){e.$router.push("/sofa/".concat(e.id,"/items/index")),e.loading=!1})).catch((function(t){console.log(t),e.loading=!1})))}))},handleRemove:function(e,t){this.$refs.upload.handleRemove(e),this.form.preview=""},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},handleSuccess:function(e,t,i){this.form.preview=e.url}}},l=a,s=(i("11e5"),i("2877")),u=Object(s["a"])(l,r,o,!1,null,"0e9949cd",null);t["default"]=u.exports},"71fa":function(e,t,i){"use strict";i.d(t,"h",(function(){return o})),i.d(t,"g",(function(){return n})),i.d(t,"d",(function(){return a})),i.d(t,"a",(function(){return l})),i.d(t,"i",(function(){return s})),i.d(t,"f",(function(){return u})),i.d(t,"e",(function(){return c})),i.d(t,"b",(function(){return f})),i.d(t,"j",(function(){return d})),i.d(t,"c",(function(){return m}));var r=i("b775");function o(e){return Object(r["a"])({url:"sofa?".concat(e),method:"get"})}function n(){return Object(r["a"])({url:"sofa/list",method:"get"})}function a(e){return Object(r["a"])({url:"sofa/".concat(e),method:"get"})}function l(e){return Object(r["a"])({url:"sofa",method:"post",data:e})}function s(e,t){return Object(r["a"])({url:"sofa/".concat(e),method:"post",data:t})}function u(e,t){return Object(r["a"])({url:"sofa/".concat(e,"/items?").concat(t),method:"get"})}function c(e,t){return Object(r["a"])({url:"sofa/".concat(e,"/items/").concat(t),method:"get"})}function f(e,t){return Object(r["a"])({url:"sofa/".concat(e,"/items"),method:"post",data:t})}function d(e,t,i){return Object(r["a"])({url:"sofa/".concat(e,"/items/").concat(t),method:"post",data:i})}function m(){return Object(r["a"])({url:"designs",method:"get"})}},a565:function(e,t,i){}}]);