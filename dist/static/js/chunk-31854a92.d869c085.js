(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31854a92"],{2017:function(n,e,t){"use strict";var o=t("b12d"),s=t.n(o);s.a},"9ed6":function(n,e,t){"use strict";t.r(e);var o=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"login-container"},[t("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:n.loginForm,rules:n.loginRules,"auto-complete":"on","label-position":"left"}},[t("div",{staticClass:"title-container"},[t("h3",{staticClass:"title"},[n._v("Login Form")])]),n._v(" "),t("el-form-item",{attrs:{prop:"nickname"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"user"}})],1),n._v(" "),t("el-input",{ref:"nickname",attrs:{placeholder:"Account",name:"nickname",type:"text",tabindex:"1","auto-complete":"on"},model:{value:n.loginForm.nickname,callback:function(e){n.$set(n.loginForm,"nickname",e)},expression:"loginForm.nickname"}})],1),n._v(" "),t("el-form-item",{attrs:{prop:"password"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"password"}})],1),n._v(" "),t("el-input",{key:n.passwordType,ref:"password",attrs:{type:n.passwordType,placeholder:"Password",name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&n._k(e.keyCode,"enter",13,e.key,"Enter")?null:n.handleLogin(e)}},model:{value:n.loginForm.password,callback:function(e){n.$set(n.loginForm,"password",e)},expression:"loginForm.password"}}),n._v(" "),t("span",{staticClass:"show-pwd",on:{click:n.showPwd}},[t("svg-icon",{attrs:{"icon-class":"password"===n.passwordType?"eye":"eye-open"}})],1)],1),n._v(" "),t("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:n.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),n.handleLogin(e)}}},[n._v("Login")])],1)],1)},s=[],r=t("61f7"),a={name:"Login",data:function(){var n=function(n,e,t){Object(r["b"])(e)?t():t(new Error("账号必填"))},e=function(n,e,t){e.length<6?t(new Error("密码至少6位")):t()};return{loginForm:{nickname:"",password:""},loginRules:{nickname:[{required:!0,trigger:"blur",validator:n}],password:[{required:!0,trigger:"blur",validator:e}]},loading:!1,passwordType:"password",redirect:"/"}},watch:{$route:{handler:function(n){this.redirect=n.query&&n.query.redirect},immediate:!0}},methods:{showPwd:function(){var n=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){n.$refs.password.focus()}))},handleLogin:function(){var n=this;this.$refs.loginForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;n.loading=!0,n.$store.dispatch("user/login",n.loginForm).then((function(){n.$router.push({path:n.redirect||"/"}),n.loading=!1})).catch((function(){n.loading=!1}))}))}}},i=a,c=(t("2017"),t("acc2"),t("2877")),l=Object(c["a"])(i,o,s,!1,null,"3a1e5a94",null);e["default"]=l.exports},acc2:function(n,e,t){"use strict";var o=t("e072"),s=t.n(o);s.a},b12d:function(n,e,t){},e072:function(n,e,t){}}]);