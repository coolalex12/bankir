(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{YOlj:function(t,e,a){"use strict";a.r(e),a.d(e,"GamesListModule",function(){return E});var c=a("ofXK"),s=a("tyNb"),n=a("fXoL"),r=a("9jGm"),o=a("l7P3");const i=Object(o.n)("[Game] Load Games Start"),b=Object(o.n)("[Game] Load Games Success",Object(o.s)()),m=Object(o.n)("[Game] Load Games Failure",Object(o.s)()),u="gamesList",l=Object(o.p)({gamesList:[]},Object(o.r)(b,(t,{games:e})=>Object.assign(Object.assign({},t),{gamesList:e}))),p=Object(o.o)(u),f=Object(o.q)(p,t=>t.gamesList);let g=(()=>{class t{constructor(t,e){this.store=t,this.action$=e,this.games$=this.store.pipe(Object(o.t)(f)),this.loadGamesSuccess$=this.action$.pipe(Object(r.d)(b))}loadGames(){this.store.dispatch(i())}}return t.\u0275fac=function(e){return new(e||t)(n.Xb(o.h),n.Xb(r.a))},t.\u0275prov=n.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var d=a("MutI");const h=function(t){return["/game/",t]};function j(t,e){if(1&t&&(n.Tb(0,"a",3),n.yc(1),n.Sb()),2&t){const t=e.$implicit;n.lc("routerLink",n.nc(3,h,t.id)),n.Db(1),n.Bc(" ",t.id,") \u043e\u0442 ",t.date,"")}}function O(t,e){if(1&t&&(n.Tb(0,"mat-nav-list"),n.wc(1,j,2,5,"a",2),n.Sb()),2&t){const t=n.fc();n.Db(1),n.lc("ngForOf",t.games)}}function v(t,e){1&t&&(n.Tb(0,"div",4),n.Tb(1,"span"),n.yc(2,"\u0421\u043f\u0438\u0441\u043e\u043a \u0438\u0433\u0440 \u043f\u0443\u0441\u0442"),n.Sb(),n.Sb())}let y=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Hb({type:t,selectors:[["app-games-list"]],inputs:{games:"games"},decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["empty",""],["mat-list-item","",3,"routerLink",4,"ngFor","ngForOf"],["mat-list-item","",3,"routerLink"],["fxLayout","row","fxLayoutAlign","center center",2,"height","100%"]],template:function(t,e){if(1&t&&(n.wc(0,O,2,1,"mat-nav-list",0),n.wc(1,v,3,0,"ng-template",null,1,n.xc)),2&t){const t=n.pc(2);n.lc("ngIf",e.games&&e.games.length)("ngIfElse",t)}},directives:[c.m,d.c,c.l,d.a,s.d],styles:[""],changeDetection:0}),t})();var L=a("bTqV"),w=a("NFeN");const S=function(){return["/game/create"]};let G=(()=>{class t{constructor(t){this.gameStoreFacade=t,this.games$=this.gameStoreFacade.games$}}return t.\u0275fac=function(e){return new(e||t)(n.Nb(g))},t.\u0275cmp=n.Hb({type:t,selectors:[["app-games-list-page"]],decls:5,vars:5,consts:[[3,"games"],["mat-fab","","color","warn","routerLinkActive","router-link-active",1,"floating-action-btn",3,"routerLink"]],template:function(t,e){1&t&&(n.Ob(0,"app-games-list",0),n.gc(1,"async"),n.Tb(2,"button",1),n.Tb(3,"mat-icon"),n.yc(4,"add"),n.Sb(),n.Sb()),2&t&&(n.lc("games",n.hc(1,2,e.games$)),n.Db(2),n.lc("routerLink",n.mc(4,S)))},directives:[y,L.a,s.c,s.b,w.a],pipes:[c.b],styles:[""],changeDetection:0}),t})();var k=a("IzEk"),F=a("CqXF");const $=[{path:"",component:G,resolve:{data:(()=>{class t{constructor(t){this.gameStoreFacade=t}resolve(t,e){return this.gameStoreFacade.loadGames(),this.gameStoreFacade.loadGamesSuccess$.pipe(Object(k.a)(1),Object(F.a)(!0))}}return t.\u0275fac=function(e){return new(e||t)(n.Xb(g))},t.\u0275prov=n.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}];let I=(()=>{class t{}return t.\u0275mod=n.Lb({type:t}),t.\u0275inj=n.Kb({factory:function(e){return new(e||t)},imports:[[s.e.forChild($)],s.e]}),t})();var X=a("hctd"),J=a("eIep"),T=a("lJxs"),D=a("JIr8"),x=a("LRne"),K=a("vcsO");let N=(()=>{class t{constructor(t,e){this.actions$=t,this.dbService=e,this.loadGames$=Object(r.c)(()=>this.actions$.pipe(Object(r.d)(i),Object(J.a)(()=>this.dbService.getGames().pipe(Object(T.a)(t=>b({games:t})),Object(D.a)(t=>Object(x.a)(m({error:t})))))))}}return t.\u0275fac=function(e){return new(e||t)(n.Xb(r.a),n.Xb(K.a))},t.\u0275prov=n.Jb({token:t,factory:t.\u0275fac}),t})(),q=(()=>{class t{}return t.\u0275mod=n.Lb({type:t}),t.\u0275inj=n.Kb({factory:function(e){return new(e||t)},imports:[[c.c,o.j.forFeature(u,l),r.b.forFeature([N])]]}),t})(),E=(()=>{class t{}return t.\u0275mod=n.Lb({type:t}),t.\u0275inj=n.Kb({factory:function(e){return new(e||t)},imports:[[c.c,I,X.a,q]]}),t})()}}]);