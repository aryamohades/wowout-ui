webpackJsonp([1],{"5+O1":function(t,e){},"5xac":function(t,e,s){t.exports=s.p+"static/img/KiboLogo.1708470.png"},"7d/D":function(t,e){},"8nyy":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),o={name:"App",data:function(){return{name:localStorage.getItem("name"),profileImage:"/static/"+localStorage.getItem("profileImage")}},methods:{isAuth:function(){return null!==localStorage.getItem("token")}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"header"},[s("div",{staticClass:"header-section"},[s("router-link",{staticClass:"header-brand",attrs:{to:{path:"/"}}},[t._v("\n        Wowout\n      ")]),t._v(" "),s("router-link",{staticClass:"header-link",attrs:{to:{path:"/wowouts"}}},[t._v("Hall of Wowouts")]),t._v(" "),s("router-link",{staticClass:"header-link",attrs:{to:{path:"/shame"}}},[t._v("Hall of Shame on Yous")])],1),t._v(" "),t.isAuth()?s("div",{staticClass:"header-section"},[s("router-link",{staticClass:"profile-container",attrs:{to:{path:"/me"}}},[s("img",{staticClass:"profile-image",attrs:{src:t.profileImage}}),t._v(" "),s("div",{staticClass:"header-name",domProps:{textContent:t._s(t.name)}})])],1):t._e()]),t._v(" "),s("router-view")],1)},staticRenderFns:[]};var i=s("VU/8")(o,r,!1,function(t){s("o6s9")},null,null).exports,n=s("/ocq"),c=s("mtWM"),u={name:"Home",created:function(){var t=this;c.get("http://localhost:3000/api/users").then(function(e){t.users=e.data.data.users,t.userSearchResults=t.users}).catch(function(e){t.appError="Error retrieving data"}),this.refreshWowouts(),this.refreshShameOnYous(),this.dhm()},data:function(){return{apiBase:"https://obscure-bayou-43244.herokuapp.com/api",wowouts:[],shameOnYous:[],users:[],creatingWowout:!1,creatingShame:!1,userSearchResults:[],selectedUser:null,userSearchTerm:"",whyText:"",countdown:"",isSearchFocused:!1}},methods:{toggleSearch:function(t){var e=this;setTimeout(function(){e.isSearchFocused=t},200)},createShame:function(){var t=this;c({method:"post",url:this.apiBase+"/shameonyous",data:{userId:this.selectedUser.id,description:this.whyText},headers:{Authorization:localStorage.getItem("token")}}).then(function(e){t.refreshShameOnYous(),t.closeModal()}).catch(function(e){t.appError=e.message})},createWowout:function(){var t=this;c({method:"post",url:this.apiBase+"/wowouts",data:{userId:this.selectedUser.id,description:this.whyText},headers:{Authorization:localStorage.getItem("token")}}).then(function(e){t.refreshWowouts(),t.closeModal()}).catch(function(e){t.appError=e.message})},selectUser:function(t,e,s){this.selectedUser={id:e,name:t,image:s},this.userSearchTerm="",this.userSearchResults=this.users},updateSearchResults:function(t){var e=this;""===t.target.value?this.userSearchResults=this.users:this.userSearchResults=this.users.filter(function(t){return t.name.toLowerCase().startsWith(e.userSearchTerm.toLowerCase())})},createWowoutModal:function(){this.userSearchTerm="",this.userSearchResults=this.users,this.selectedUser=null,this.whyText="",this.creatingWowout=!0,this.creatingShame=!1,document.body.classList.add("active")},createShameModal:function(){this.userSearchTerm="",this.userSearchResults=this.users,this.selectedUser=null,this.whyText="",this.creatingWowout=!1,this.creatingShame=!0,document.body.classList.add("active")},closeModal:function(){this.creatingWowout=!1,this.creatingShame=!1,document.body.classList.remove("active")},refreshWowouts:function(){var t=this;c.get(this.apiBase+"/wowouts").then(function(e){t.wowouts=e.data.data.wowouts}).catch(function(e){t.appError="Error retrieving data"})},refreshShameOnYous:function(){var t=this;c.get(this.apiBase+"/shameonyous").then(function(e){t.shameOnYous=e.data.data.shameonyous}).catch(function(e){t.appError="Error retrieving data"})},getImageSrc:function(t){return"/static/"+t},updoot:function(t){var e=this;c({method:"post",url:this.apiBase+"/"+t+"/updoot",headers:{Authorization:localStorage.getItem("token")}}).then(function(t){e.refreshWowouts()}).catch(function(t){console.log(t.message)})},downdoot:function(t){var e=this;c({method:"post",url:this.apiBase+"/shameonyous/"+t+"/downdoot",headers:{Authorization:localStorage.getItem("token")}}).then(function(t){e.refreshShameOnYous()}).catch(function(t){console.log(t.message)})},whyMessage:function(t){return"WOWOUT <b>"+t+"</b>"},shameButtonText:function(){return this.selectedUser?"SHAME "+this.selectedUser.name:"SHAME"},wowoutButtonText:function(){return this.selectedUser?"WOWOUT "+this.selectedUser.name:"WOWOUT"},getWowoutLeaderText:function(){return this.wowouts.length>0?"Current Wowout Leader: <b>"+this.wowouts[0].wowoutReceiver.name+"</b>":"Current Wowout Leader"},getShameLeaderText:function(){return this.shameOnYous.length>0?"Current Shame on You Leader: <b>"+this.shameOnYous[0].shameReceiver.name+"</b>":"Current Shame on You Leader"},dhm:function(){var t=new Date,e=new Date(2018,5,29,0,0,0,0),s=t.getTime()-e.getTime(),a=Math.abs(s),o=Math.floor(a/864e5),r=a%864e5,i=Math.floor(r/36e5),n=a%36e5,c=Math.floor(n/6e4),u=a%6e4,l=Math.floor(u/1e3);this.countdown="Time Remaining: "+o+" days "+i+" hours "+c+" minutes "+l+" seconds",setTimeout(this.dhm,1e3)}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-container"},[s("div",{staticClass:"overlay",class:{active:t.creatingWowout||t.creatingShame},on:{click:t.closeModal}}),t._v(" "),t.creatingWowout?s("div",{staticClass:"create-wowout-modal"},[s("div",{staticClass:"close-modal-icon",on:{click:t.closeModal}},[s("i",{staticClass:"fas fa-times"})]),t._v(" "),s("div",{staticClass:"new-wowout-label"},[t._v("New Wowout")]),t._v(" "),s("div",{staticClass:"user-search-container"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.userSearchTerm,expression:"userSearchTerm"}],staticClass:"wowout-user-search",attrs:{placeholder:"Who?"},domProps:{value:t.userSearchTerm},on:{focus:function(e){t.toggleSearch(!0)},blur:function(e){t.toggleSearch(!1)},input:[function(e){e.target.composing||(t.userSearchTerm=e.target.value)},t.updateSearchResults]}}),t._v(" "),t.isSearchFocused?s("div",{staticClass:"user-search-results-container"},t._l(t.userSearchResults,function(e,a){return s("div",{key:a,staticClass:"user-search-result",on:{click:function(s){t.selectUser(e.name,e.id,e.image)}}},[s("img",{staticClass:"search-result-image",attrs:{src:t.getImageSrc(e.image)}}),t._v(" "),s("div",{staticClass:"search-result-name",domProps:{textContent:t._s(e.name)}})])})):t._e()]),t._v(" "),t.selectedUser?s("div",{staticClass:"selected-user-container"},[s("img",{staticClass:"selected-user-image",attrs:{src:t.getImageSrc(t.selectedUser.image)}}),t._v(" "),s("div",{staticClass:"selected-user-message",domProps:{innerHTML:t._s(t.whyMessage(t.selectedUser.name))}})]):t._e(),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.whyText,expression:"whyText"}],staticStyle:{resize:"none"},attrs:{placeholder:"Why?"},domProps:{value:t.whyText},on:{input:function(e){e.target.composing||(t.whyText=e.target.value)}}}),t._v(" "),s("button",{staticClass:"wowout-button",attrs:{disabled:null===t.selectedUser||""===t.whyText},domProps:{textContent:t._s(t.wowoutButtonText())},on:{click:t.createWowout}})]):t._e(),t._v(" "),t.creatingShame?s("div",{staticClass:"create-wowout-modal"},[s("div",{staticClass:"close-modal-icon",on:{click:t.closeModal}},[s("i",{staticClass:"fas fa-times"})]),t._v(" "),s("div",{staticClass:"new-wowout-label"},[t._v("New Shame On You")]),t._v(" "),s("div",{staticClass:"user-search-container"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.userSearchTerm,expression:"userSearchTerm"}],staticClass:"wowout-user-search",attrs:{placeholder:"Who?"},domProps:{value:t.userSearchTerm},on:{focus:function(e){t.toggleSearch(!0)},blur:function(e){t.toggleSearch(!1)},input:[function(e){e.target.composing||(t.userSearchTerm=e.target.value)},t.updateSearchResults]}}),t._v(" "),t.isSearchFocused?s("div",{staticClass:"user-search-results-container"},t._l(t.userSearchResults,function(e,a){return s("div",{key:a,staticClass:"user-search-result",on:{click:function(s){t.selectUser(e.name,e.id,e.image)}}},[s("img",{staticClass:"search-result-image",attrs:{src:t.getImageSrc(e.image)}}),t._v(" "),s("div",{staticClass:"search-result-name",domProps:{textContent:t._s(e.name)}})])})):t._e()]),t._v(" "),t.selectedUser?s("div",{staticClass:"selected-user-container"},[s("img",{staticClass:"selected-user-image",attrs:{src:t.getImageSrc(t.selectedUser.image)}}),t._v(" "),s("div",{staticClass:"selected-user-message",domProps:{innerHTML:t._s(t.whyMessage(t.selectedUser.name))}})]):t._e(),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.whyText,expression:"whyText"}],staticStyle:{resize:"none"},attrs:{placeholder:"Why?"},domProps:{value:t.whyText},on:{input:function(e){e.target.composing||(t.whyText=e.target.value)}}}),t._v(" "),s("button",{staticClass:"wowout-button shame-button",attrs:{disabled:null===t.selectedUser||""===t.whyText},domProps:{textContent:t._s(t.shameButtonText())},on:{click:t.createShame}})]):t._e(),t._v(" "),s("div",{staticClass:"section"},[s("div",{staticClass:"countdown-text",domProps:{textContent:t._s(t.countdown)}}),t._v(" "),s("div",{staticClass:"leader-text",domProps:{innerHTML:t._s(t.getWowoutLeaderText())}}),t._v(" "),s("div",{staticClass:"leader-text",domProps:{innerHTML:t._s(t.getShameLeaderText())}})]),t._v(" "),s("div",{staticClass:"section"},[s("div",{staticClass:"wowout-header"},[t._v("WOWOUTS")]),t._v(" "),s("button",{staticClass:"wowout-button hvr-pulse-grow",on:{click:t.createWowoutModal}},[t._v("WOWOUT")]),t._v(" "),s("div",{staticClass:"wowouts-container"},t._l(t.wowouts,function(e,a){return s("div",{key:a,staticClass:"wowout-container"},[0===a?s("img",{staticClass:"wowout-frontrunner",attrs:{src:"/static/crown.svg"}}):t._e(),t._v(" "),s("img",{staticClass:"wowout-image",attrs:{src:t.getImageSrc(e.wowoutReceiver.image)}}),t._v(" "),s("div",{staticClass:"wowout-name",domProps:{textContent:t._s(e.wowoutReceiver.name)}}),t._v(" "),s("div",{staticClass:"wowout-description",domProps:{textContent:t._s(e.description)}}),t._v(" "),s("div",{staticClass:"wowout-giver-container"},[s("img",{staticClass:"wowout-giver-image",attrs:{src:t.getImageSrc(e.wowoutGiver.image)}}),t._v(" "),s("div",{staticClass:"wowout-giver-name",domProps:{textContent:t._s(e.wowoutGiver.name)}})]),t._v(" "),s("div",{staticClass:"wowout-controls"},[s("div",{staticClass:"wowout-votes",domProps:{textContent:t._s(e.updoots)}}),t._v(" "),s("div",{staticClass:"wowout-updoot",on:{click:function(s){t.updoot(e.id)}}},[s("i",{staticClass:"fas fa-thumbs-up"})])])])}))]),t._v(" "),s("div",{staticClass:"section"},[s("div",{staticClass:"wowout-header"},[t._v("SHAME ON YOUS")]),t._v(" "),s("button",{staticClass:"wowout-button shame-button hvr-buzz",on:{click:t.createShameModal}},[t._v("SHAME")]),t._v(" "),s("div",{staticClass:"wowouts-container"},t._l(t.shameOnYous,function(e,a){return s("div",{key:a,staticClass:"wowout-container"},[0===a?s("img",{staticClass:"wowout-frontrunner",attrs:{src:"/static/buffoon.svg"}}):t._e(),t._v(" "),s("img",{staticClass:"wowout-image",attrs:{src:t.getImageSrc(e.shameReceiver.image)}}),t._v(" "),s("div",{staticClass:"wowout-name",domProps:{textContent:t._s(e.shameReceiver.name)}}),t._v(" "),s("div",{staticClass:"wowout-description",domProps:{textContent:t._s(e.description)}}),t._v(" "),s("div",{staticClass:"wowout-giver-container"},[s("img",{staticClass:"wowout-giver-image",attrs:{src:t.getImageSrc(e.shameGiver.image)}}),t._v(" "),s("div",{staticClass:"wowout-giver-name",domProps:{textContent:t._s(e.shameGiver.name)}})]),t._v(" "),s("div",{staticClass:"wowout-controls"},[s("div",{staticClass:"wowout-votes wowout-downdoot-votes",domProps:{textContent:t._s(e.updoots)}}),t._v(" "),s("div",{staticClass:"wowout-updoot wowout-downdoot",on:{click:function(s){t.downdoot(e.id)}}},[s("i",{staticClass:"fas fa-thumbs-down"})])])])}))])])},staticRenderFns:[]};var d=s("VU/8")(u,l,!1,function(t){s("gK4p")},"data-v-7e2e9e95",null).exports,m=s("mtWM"),h={name:"Login",data:function(){return{email:"",password:"",loginError:null,emailError:null,passwordError:null,apiBase:"https://obscure-bayou-43244.herokuapp.com/api"}},methods:{login:function(){var t=this,e=!1;""===this.email&&(this.emailError="Email cannot be empty",e=!0),""===this.password&&(this.passwordError="Password cannot be empty",e=!0),e||(this.emailError=null,this.passwordError=null,this.loginError=null,m.post(this.apiBase+"/login",{email:this.email,password:this.password}).then(function(e){localStorage.setItem("token",e.data.data.token),localStorage.setItem("name",e.data.data.name),localStorage.setItem("profileImage",e.data.data.image),t.$router.push("/")}).catch(function(e){t.loginError="Invalid credentials"}))}}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login-page"},[a("img",{staticClass:"logo",attrs:{src:s("5xac")}}),t._v(" "),t.loginError?a("div",{staticClass:"form-error",domProps:{textContent:t._s(t.loginError)}}):t._e(),t._v(" "),a("div",{staticClass:"input-container"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"email",placeholder:"email",novalidate:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),t.emailError?a("div",{staticClass:"input-error",domProps:{textContent:t._s(t.emailError)}}):t._e()]),t._v(" "),a("div",{staticClass:"input-container"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),t.passwordError?a("div",{staticClass:"input-error",domProps:{textContent:t._s(t.passwordError)}}):t._e()]),t._v(" "),a("button",{staticClass:"login-button",on:{click:t.login}},[t._v("Login")])])},staticRenderFns:[]};var w=s("VU/8")(h,v,!1,function(t){s("t/Sd")},"data-v-066e955e",null).exports,p=s("mtWM"),g={name:"Home",created:function(){var t=this;p.get(this.apiBase+"/wowouts/history").then(function(e){t.wowouts=e.data.data.wowouts}).catch(function(e){t.appError="Error retrieving data"})},data:function(){return{apiBase:"https://obscure-bayou-43244.herokuapp.com/api/",wowouts:[]}},methods:{getImageSrc:function(t){return"/static/"+t}}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-container"},[s("div",{staticClass:"page-header"},[t._v("Hall of Wowouts")]),t._v(" "),s("div",{staticClass:"wowouts-container"},t._l(t.wowouts,function(e,a){return s("div",{key:a,staticClass:"wowout-container"},[s("img",{staticClass:"wowout-image",attrs:{src:t.getImageSrc(e.wowoutReceiver.image)}}),t._v(" "),s("div",{staticClass:"wowout-name",domProps:{textContent:t._s(e.wowoutReceiver.name)}}),t._v(" "),s("div",{staticClass:"wowout-description",domProps:{textContent:t._s(e.description)}}),t._v(" "),s("div",{staticClass:"wowout-giver-container"},[s("img",{staticClass:"wowout-giver-image",attrs:{src:t.getImageSrc(e.wowoutGiver.image)}}),t._v(" "),s("div",{staticClass:"wowout-giver-name",domProps:{textContent:t._s(e.wowoutGiver.name)}})])])}))])},staticRenderFns:[]};var _=s("VU/8")(g,f,!1,function(t){s("8nyy")},"data-v-7f4b209a",null).exports,C=s("mtWM"),S={name:"Home",created:function(){var t=this;C.get(this.apiBase+"/shameonyous/history").then(function(e){t.shameOnYous=e.data.data.shameonyous}).catch(function(e){t.appError="Error retrieving data"})},data:function(){return{apiBase:"https://obscure-bayou-43244.herokuapp.com/api/",shameOnYous:[]}},methods:{getImageSrc:function(t){return"/static/"+t}}},x={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-container"},[s("div",{staticClass:"page-header"},[t._v("Hall of Shame on Yous")]),t._v(" "),s("div",{staticClass:"wowouts-container"},t._l(t.shameOnYous,function(e,a){return s("div",{key:a,staticClass:"wowout-container"},[s("img",{staticClass:"wowout-image",attrs:{src:t.getImageSrc(e.shameReceiver.image)}}),t._v(" "),s("div",{staticClass:"wowout-name",domProps:{textContent:t._s(e.shameReceiver.name)}}),t._v(" "),s("div",{staticClass:"wowout-description",domProps:{textContent:t._s(e.description)}}),t._v(" "),s("div",{staticClass:"wowout-giver-container"},[s("img",{staticClass:"wowout-giver-image",attrs:{src:t.getImageSrc(e.shameGiver.image)}}),t._v(" "),s("div",{staticClass:"wowout-giver-name",domProps:{textContent:t._s(e.shameGiver.name)}})])])}))])},staticRenderFns:[]};var b=s("VU/8")(S,x,!1,function(t){s("7d/D")},"data-v-e14cee88",null).exports,y=s("e7x4"),T=s("mtWM"),E={name:"Home",created:function(){this.refreshPoints()},data:function(){return{points:null,pointsText:"",apiBase:"https://obscure-bayou-43244.herokuapp.com/api/"}},methods:{refreshPoints:function(){var t=this;T({method:"get",url:this.apiBase+"/me",headers:{Authorization:localStorage.getItem("token")}}).then(function(e){t.points=e.data.user.points}).catch(function(e){t.appError="Error retrieving data"})},redeemText:function(t){return this.points>=t?"Redeem ("+t+" Points)":"Requires "+t+" Points"},hasEnoughPoints:function(t){return this.points>=t},redeem:function(t){var e=this;T({method:"post",url:this.apiBase+"/redeem",data:{cost:t},headers:{Authorization:localStorage.getItem("token")}}).then(function(t){e.refreshPoints(),y("Success!","Check your email to claim your reward!","success")}).catch(function(t){console.log(t.message)})}}},P={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-container"},[s("div",{staticClass:"page-header"},[t._v("Redeem your points")]),t._v(" "),null!==t.points?s("div",{staticClass:"points-text"},[t._v("Balance: "),s("b",[s("span",{domProps:{textContent:t._s(t.points)}})]),t._v(" Points")]):t._e(),t._v(" "),null!==t.points?s("div",{staticClass:"rewards-container"},[s("div",{staticClass:"rewards-header"},[t._v("Choose a reward:")]),t._v(" "),s("div",{staticClass:"reward-container"},[s("img",{staticClass:"reward-image",attrs:{src:"/static/amazon25.png"}}),t._v(" "),s("button",{staticClass:"redeem-button",attrs:{disabled:!t.hasEnoughPoints(10)},domProps:{textContent:t._s(t.redeemText(10))},on:{click:function(e){t.redeem(10)}}})]),t._v(" "),s("div",{staticClass:"reward-container"},[s("img",{staticClass:"reward-image",attrs:{src:"/static/amazon100.png"}}),t._v(" "),s("button",{staticClass:"redeem-button",attrs:{disabled:!t.hasEnoughPoints(100)},domProps:{textContent:t._s(t.redeemText(100))},on:{click:function(e){t.redeem(100)}}})])]):t._e(),t._v(" "),s("img")])},staticRenderFns:[]};var k=s("VU/8")(E,P,!1,function(t){s("kRIp")},"data-v-53a6abdb",null).exports;a.a.use(n.a);var W=function(t,e,s){if(!localStorage.getItem("token"))return s({path:"/login"});s()},I=new n.a({mode:"history",routes:[{path:"/",name:"Home",component:d,beforeEnter:W},{path:"/login",name:"Login",component:w,beforeEnter:function(t,e,s){localStorage.getItem("token")&&s({path:"/"}),s()}},{path:"/wowouts",name:"Wowouts",component:_,beforeEnter:W},{path:"/shame",name:"Shame",component:b,beforeEnter:W},{path:"/me",name:"Profile",component:k,beforeEnter:W}]});s("5+O1");a.a.config.productionTip=!1,new a.a({el:"#app",router:I,components:{App:i},template:"<App/>"})},gK4p:function(t,e){},kRIp:function(t,e){},o6s9:function(t,e){},"t/Sd":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f2eeb8979e7b686627a7.js.map