/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("resize-base",function(S){var W=S.Lang,b=W.isArray,aw=W.isBoolean,M=W.isNumber,aB=W.isString,ag=S.Array,ar=W.trim,k=ag.indexOf,r=",",ae=".",p="",H="{handle}",q=" ",o="active",K="activeHandle",A="activeHandleNode",u="all",ak="autoHide",au="border",ap="bottom",al="className",ao="color",aA="defMinHeight",aF="defMinWidth",v="handle",J="handles",N="handlesWrapper",ac="hidden",t="inner",a="left",I="margin",n="node",y="nodeName",U="none",D="offsetHeight",az="offsetWidth",aa="padding",d="parentNode",l="position",j="relative",aj="resize",m="resizing",g="right",aG="static",f="style",i="top",F="width",am="wrap",aC="wrapper",ah="wrapTypes",E="resize:mouseUp",s="resize:resize",w="resize:align",G="resize:end",Q="resize:start",X="t",aE="tr",Z="r",av="br",ai="b",ax="bl",af="l",aH="tl",aD=function(){return Array.prototype.slice.call(arguments).join(q);},aq=function(B){return Math.round(parseFloat(B))||0;},ad=function(B,L){return B.getComputedStyle(L);},aI=function(B){return v+B.toUpperCase();},O=function(B){return(B instanceof S.Node);},P=S.cached(function(B){return B.substring(0,1).toUpperCase()+B.substring(1);}),z=S.cached(function(){var L=[],B=ag(arguments,0,true);ag.each(B,function(R,T){if(T>0){R=P(R);}L.push(R);});return L.join(p);}),x=S.ClassNameManager.getClassName,at=x(aj),an=x(aj,v),ab=x(aj,v,o),e=x(aj,v,t),C=x(aj,v,t,H),aJ=x(aj,v,H),c=x(aj,ac,J),V=x(aj,J,aC),ay=x(aj,aC);function h(){h.superclass.constructor.apply(this,arguments);}S.mix(h,{NAME:aj,ATTRS:{activeHandle:{value:null,validator:function(B){return S.Lang.isString(B)||S.Lang.isNull(B);}},activeHandleNode:{value:null,validator:O},autoHide:{value:false,validator:aw},defMinHeight:{value:15,validator:M},defMinWidth:{value:15,validator:M},handles:{setter:"_setHandles",value:u},handlesWrapper:{readOnly:true,setter:S.one,valueFn:"_valueHandlesWrapper"},node:{setter:S.one},resizing:{value:false,validator:aw},wrap:{setter:"_setWrap",value:false,validator:aw},wrapTypes:{readOnly:true,value:/^canvas|textarea|input|select|button|img|iframe|table|embed$/i},wrapper:{readOnly:true,valueFn:"_valueWrapper",writeOnce:true}},RULES:{b:function(B,R,L){var Y=B.info,T=B.originalInfo;Y.offsetHeight=T.offsetHeight+L;},l:function(B,R,L){var Y=B.info,T=B.originalInfo;Y.left=T.left+R;Y.offsetWidth=T.offsetWidth-R;},r:function(B,R,L){var Y=B.info,T=B.originalInfo;Y.offsetWidth=T.offsetWidth+R;},t:function(B,R,L){var Y=B.info,T=B.originalInfo;Y.top=T.top+L;Y.offsetHeight=T.offsetHeight-L;},tr:function(B,R,L){this.t.apply(this,arguments);this.r.apply(this,arguments);},bl:function(B,R,L){this.b.apply(this,arguments);this.l.apply(this,arguments);},br:function(B,R,L){this.b.apply(this,arguments);this.r.apply(this,arguments);},tl:function(B,R,L){this.t.apply(this,arguments);this.l.apply(this,arguments);}},capitalize:z});S.Resize=S.extend(h,S.Base,{ALL_HANDLES:[X,aE,Z,av,ai,ax,af,aH],REGEX_CHANGE_HEIGHT:/^(t|tr|b|bl|br|tl)$/i,REGEX_CHANGE_LEFT:/^(tl|l|bl)$/i,REGEX_CHANGE_TOP:/^(tl|t|tr)$/i,REGEX_CHANGE_WIDTH:/^(bl|br|l|r|tl|tr)$/i,HANDLES_WRAP_TEMPLATE:'<div class="'+V+'"></div>',WRAP_TEMPLATE:'<div class="'+ay+'"></div>',HANDLE_TEMPLATE:'<div class="'+aD(an,aJ)+'">'+'<div class="'+aD(e,C)+'">&nbsp;</div>'+"</div>",totalHSurrounding:0,totalVSurrounding:0,nodeSurrounding:null,wrapperSurrounding:null,changeHeightHandles:false,changeLeftHandles:false,changeTopHandles:false,changeWidthHandles:false,delegate:null,info:null,lastInfo:null,originalInfo:null,initializer:function(){this.renderer();},renderUI:function(){var B=this;B._renderHandles();},bindUI:function(){var B=this;B._createEvents();B._bindDD();B._bindHandle();},syncUI:function(){var B=this;this.get(n).addClass(at);B._setHideHandlesUI(B.get(ak));},destructor:function(){var B=this,R=B.get(n),T=B.get(aC),L=T.get(d);S.Event.purgeElement(T,true);B.eachHandle(function(Y){B.delegate.dd.destroy();Y.remove(true);});if(B.get(am)){B._copyStyles(T,R);if(L){L.insertBefore(R,T);}T.remove(true);}R.removeClass(at);R.removeClass(c);},renderer:function(){this.renderUI();this.bindUI();this.syncUI();},eachHandle:function(L){var B=this;S.each(B.get(J),function(Y,R){var T=B.get(aI(Y));L.apply(B,[T,Y,R]);});},_bindDD:function(){var B=this;B.delegate=new S.DD.Delegate({bubbleTargets:B,container:B.get(N),dragConfig:{clickPixelThresh:0,clickTimeThresh:0,useShim:true,move:false},nodes:ae+an,target:false});B.on("drag:drag",B._handleResizeEvent);B.on("drag:dropmiss",B._handleMouseUpEvent);B.on("drag:end",B._handleResizeEndEvent);B.on("drag:start",B._handleResizeStartEvent);},_bindHandle:function(){var B=this,L=B.get(aC);L.on("mouseenter",S.bind(B._onWrapperMouseEnter,B));L.on("mouseleave",S.bind(B._onWrapperMouseLeave,B));L.delegate("mouseenter",S.bind(B._onHandleMouseEnter,B),ae+an);L.delegate("mouseleave",S.bind(B._onHandleMouseLeave,B),ae+an);},_createEvents:function(){var B=this,L=function(R,T){B.publish(R,{defaultFn:T,queuable:false,emitFacade:true,bubbles:true,prefix:aj});};L(Q,this._defResizeStartFn);L(s,this._defResizeFn);L(w,this._defResizeAlignFn);L(G,this._defResizeEndFn);L(E,this._defMouseUpFn);},_renderHandles:function(){var B=this,R=B.get(aC),L=B.get(N);B.eachHandle(function(T){L.append(T);});R.append(L);},_buildHandle:function(L){var B=this;return S.Node.create(S.substitute(B.HANDLE_TEMPLATE,{handle:L}));},_calcResize:function(){var B=this,T=B.handle,aK=B.info,Y=B.originalInfo,R=aK.actXY[0]-Y.actXY[0],L=aK.actXY[1]-Y.actXY[1];if(T&&S.Resize.RULES[T]){S.Resize.RULES[T](B,R,L);}else{}},_checkSize:function(aK,L){var B=this,Y=B.info,T=B.originalInfo,R=(aK==D)?i:a;Y[aK]=L;if(((R==a)&&B.changeLeftHandles)||((R==i)&&B.changeTopHandles)){Y[R]=T[R]+T[aK]-L;}},_copyStyles:function(R,Y){var B=R.getStyle(l).toLowerCase(),T=this._getBoxSurroundingInfo(R),L;if(B==aG){B=j;}L={position:B,left:ad(R,a),top:ad(R,i)};S.mix(L,T.margin);S.mix(L,T.border);Y.setStyles(L);R.setStyles({border:0,margin:0});Y.sizeTo(R.get(az)+T.totalHBorder,R.get(D)+T.totalVBorder);},_extractHandleName:S.cached(function(R){var L=R.get(al),B=L.match(new RegExp(x(aj,v,"(\\w{1,2})\\b")));
return B?B[1]:null;}),_getInfo:function(Y,B){var aK=[0,0],aM=B.dragEvent.target,aL=Y.getXY(),T=aL[0],R=aL[1],L=Y.get(D),aN=Y.get(az);if(B){aK=(aM.actXY.length?aM.actXY:aM.lastXY);}return{actXY:aK,bottom:(R+L),left:T,offsetHeight:L,offsetWidth:aN,right:(T+aN),top:R};},_getBoxSurroundingInfo:function(B){var L={padding:{},margin:{},border:{}};if(O(B)){S.each([i,g,ap,a],function(aK){var T=z(aa,aK),Y=z(I,aK),R=z(au,aK,F),aL=z(au,aK,ao),aM=z(au,aK,f);L.border[aL]=ad(B,aL);L.border[aM]=ad(B,aM);L.border[R]=ad(B,R);L.margin[Y]=ad(B,Y);L.padding[T]=ad(B,T);});}L.totalHBorder=(aq(L.border.borderLeftWidth)+aq(L.border.borderRightWidth));L.totalHPadding=(aq(L.padding.paddingLeft)+aq(L.padding.paddingRight));L.totalVBorder=(aq(L.border.borderBottomWidth)+aq(L.border.borderTopWidth));L.totalVPadding=(aq(L.padding.paddingBottom)+aq(L.padding.paddingTop));return L;},_syncUI:function(){var B=this,T=B.info,R=B.wrapperSurrounding,Y=B.get(aC),L=B.get(n);Y.sizeTo(T.offsetWidth,T.offsetHeight);if(B.changeLeftHandles||B.changeTopHandles){Y.setXY([T.left,T.top]);}if(!Y.compareTo(L)){L.sizeTo(T.offsetWidth-R.totalHBorder,T.offsetHeight-R.totalVBorder);}if(S.UA.webkit){L.setStyle(aj,U);}},_updateChangeHandleInfo:function(L){var B=this;B.changeHeightHandles=B.REGEX_CHANGE_HEIGHT.test(L);B.changeLeftHandles=B.REGEX_CHANGE_LEFT.test(L);B.changeTopHandles=B.REGEX_CHANGE_TOP.test(L);B.changeWidthHandles=B.REGEX_CHANGE_WIDTH.test(L);},_updateInfo:function(L){var B=this;B.info=B._getInfo(B.get(aC),L);},_updateSurroundingInfo:function(){var B=this,T=B.get(n),Y=B.get(aC),L=B._getBoxSurroundingInfo(T),R=B._getBoxSurroundingInfo(Y);B.nodeSurrounding=L;B.wrapperSurrounding=R;B.totalVSurrounding=(L.totalVPadding+R.totalVBorder);B.totalHSurrounding=(L.totalHPadding+R.totalHBorder);},_setActiveHandlesUI:function(R){var B=this,L=B.get(A);if(L){if(R){B.eachHandle(function(T){T.removeClass(ab);});L.addClass(ab);}else{L.removeClass(ab);}}},_setHandles:function(R){var B=this,L=[];if(b(R)){L=R;}else{if(aB(R)){if(R.toLowerCase()==u){L=B.ALL_HANDLES;}else{S.each(R.split(r),function(Y,T){var aK=ar(Y);if(k(B.ALL_HANDLES,aK)>-1){L.push(aK);}});}}}return L;},_setHideHandlesUI:function(L){var B=this,R=B.get(aC);if(!B.get(m)){if(L){R.addClass(c);}else{R.removeClass(c);}}},_setWrap:function(T){var B=this,R=B.get(n),Y=R.get(y),L=B.get(ah);if(L.test(Y)){T=true;}return T;},_defMouseUpFn:function(L){var B=this;B.set(m,false);},_defResizeFn:function(L){var B=this;B._resize(L);},_resize:function(L){var B=this;B._handleResizeAlignEvent(L.dragEvent);B._syncUI();},_defResizeAlignFn:function(L){var B=this;B._resizeAlign(L);},_resizeAlign:function(R){var B=this,T,L,Y;B.lastInfo=B.info;B._updateInfo(R);T=B.info;B._calcResize();if(!B.con){L=(B.get(aA)+B.totalVSurrounding);Y=(B.get(aF)+B.totalHSurrounding);if(T.offsetHeight<=L){B._checkSize(D,L);}if(T.offsetWidth<=Y){B._checkSize(az,Y);}}},_defResizeEndFn:function(L){var B=this;B._resizeEnd(L);},_resizeEnd:function(R){var B=this,L=R.dragEvent.target;L.actXY=[];B._syncUI();B._setActiveHandlesUI(false);B.set(K,null);B.set(A,null);B.handle=null;},_defResizeStartFn:function(L){var B=this;B._resizeStart(L);},_resizeStart:function(L){var B=this,R=B.get(aC);B.handle=B.get(K);B.set(m,true);B._updateSurroundingInfo();B.originalInfo=B._getInfo(R,L);B._updateInfo(L);},_handleMouseUpEvent:function(B){this.fire(E,{dragEvent:B,info:this.info});},_handleResizeEvent:function(B){this.fire(s,{dragEvent:B,info:this.info});},_handleResizeAlignEvent:function(B){this.fire(w,{dragEvent:B,info:this.info});},_handleResizeEndEvent:function(B){this.fire(G,{dragEvent:B,info:this.info});},_handleResizeStartEvent:function(B){if(!this.get(K)){this._setHandleFromNode(B.target.get("node"));}this.fire(Q,{dragEvent:B,info:this.info});},_onWrapperMouseEnter:function(L){var B=this;if(B.get(ak)){B._setHideHandlesUI(false);}},_onWrapperMouseLeave:function(L){var B=this;if(B.get(ak)){B._setHideHandlesUI(true);}},_setHandleFromNode:function(L){var B=this,R=B._extractHandleName(L);if(!B.get(m)){B.set(K,R);B.set(A,L);B._setActiveHandlesUI(true);B._updateChangeHandleInfo(R);}},_onHandleMouseEnter:function(B){this._setHandleFromNode(B.currentTarget);},_onHandleMouseLeave:function(L){var B=this;if(!B.get(m)){B._setActiveHandlesUI(false);}},_valueHandlesWrapper:function(){return S.Node.create(this.HANDLES_WRAP_TEMPLATE);},_valueWrapper:function(){var B=this,R=B.get(n),L=R.get(d),T=R;if(B.get(am)){T=S.Node.create(B.WRAP_TEMPLATE);if(L){L.insertBefore(T,R);}T.append(R);B._copyStyles(R,T);R.setStyles({position:aG,left:0,top:0});}return T;}});S.each(S.Resize.prototype.ALL_HANDLES,function(L,B){S.Resize.ATTRS[aI(L)]={setter:function(){return this._buildHandle(L);},value:null,writeOnce:true};});},"3.4.0",{requires:["base","widget","substitute","event","oop","dd-drag","dd-delegate","dd-drop"],skinnable:true});YUI.add("resize-proxy",function(c){var n="activeHandleNode",i="cursor",g="dragCursor",l="host",k="parentNode",f="proxy",d="proxyNode",b="resize",a="resize-proxy",j="wrapper",e=c.ClassNameManager.getClassName,m=e(b,f);function h(){h.superclass.constructor.apply(this,arguments);}c.mix(h,{NAME:a,NS:f,ATTRS:{proxyNode:{setter:c.one,valueFn:function(){return c.Node.create(this.PROXY_TEMPLATE);}}}});c.extend(h,c.Plugin.Base,{PROXY_TEMPLATE:'<div class="'+m+'"></div>',initializer:function(){var o=this;o.afterHostEvent("resize:start",o._afterResizeStart);o.beforeHostMethod("_resize",o._beforeHostResize);o.afterHostMethod("_resizeEnd",o._afterHostResizeEnd);},destructor:function(){var o=this;o.get(d).remove(true);},_afterHostResizeEnd:function(q){var o=this,p=q.dragEvent.target;p.actXY=[];o._syncProxyUI();o.get(d).hide();},_afterResizeStart:function(p){var o=this;o._renderProxy();},_beforeHostResize:function(q){var o=this,p=this.get(l);p._handleResizeAlignEvent(q.dragEvent);o._syncProxyUI();return new c.Do.Prevent();},_renderProxy:function(){var o=this,q=this.get(l),p=o.get(d);if(!p.inDoc()){q.get(j).get(k).append(p.hide());}},_syncProxyUI:function(){var o=this,q=this.get(l),s=q.info,r=q.get(n),p=o.get(d),t=r.getStyle(i);
p.show().setStyle(i,t);q.delegate.dd.set(g,t);p.sizeTo(s.offsetWidth,s.offsetHeight);p.setXY([s.left,s.top]);}});c.namespace("Plugin");c.Plugin.ResizeProxy=h;},"3.4.0",{requires:["resize-base","plugin"],skinnable:false});YUI.add("resize-constrain",function(a){var J=a.Lang,s=J.isBoolean,I=J.isNumber,g=J.isString,q=a.Resize.capitalize,e=function(K){return(K instanceof a.Node);},E=function(K){return parseFloat(K)||0;},b="borderBottomWidth",y="borderLeftWidth",A="borderRightWidth",f="borderTopWidth",C="border",r="bottom",t="con",j="constrain",n="host",o="left",m="maxHeight",h="maxWidth",c="minHeight",F="minWidth",H="node",x="offsetHeight",z="offsetWidth",B="preserveRatio",p="region",D="resizeConstrained",G="right",k="tickX",i="tickY",u="top",d="width",l="view",w="viewportRegion";function v(){v.superclass.constructor.apply(this,arguments);}a.mix(v,{NAME:D,NS:t,ATTRS:{constrain:{setter:function(K){if(K&&(e(K)||g(K)||K.nodeType)){K=a.one(K);}return K;}},minHeight:{value:15,validator:I},minWidth:{value:15,validator:I},maxHeight:{value:Infinity,validator:I},maxWidth:{value:Infinity,validator:I},preserveRatio:{value:false,validator:s},tickX:{value:false},tickY:{value:false}}});a.extend(v,a.Plugin.Base,{constrainSurrounding:null,initializer:function(){var K=this,L=K.get(n);L.delegate.dd.plug(a.Plugin.DDConstrained,{tickX:K.get(k),tickY:K.get(i)});L.after("resize:align",a.bind(K._handleResizeAlignEvent,K));L.on("resize:start",a.bind(K._handleResizeStartEvent,K));},_checkConstrain:function(M,V,N){var S=this,R,O,P,U,T=S.get(n),K=T.info,L=S.constrainSurrounding.border,Q=S._getConstrainRegion();if(Q){R=K[M]+K[N];O=Q[V]-E(L[q(C,V,d)]);if(R>=O){K[N]-=(R-O);}P=K[M];U=Q[M]+E(L[q(C,M,d)]);if(P<=U){K[M]+=(U-P);K[N]-=(U-P);}}},_checkHeight:function(){var K=this,M=K.get(n),O=M.info,L=(K.get(m)+M.totalVSurrounding),N=(K.get(c)+M.totalVSurrounding);K._checkConstrain(u,r,x);if(O.offsetHeight>L){M._checkSize(x,L);}if(O.offsetHeight<N){M._checkSize(x,N);}},_checkRatio:function(){var Y=this,R=Y.get(n),X=R.info,N=R.originalInfo,Q=N.offsetWidth,Z=N.offsetHeight,P=N.top,aa=N.left,T=N.bottom,W=N.right,M=function(){return(X.offsetWidth/Q);},O=function(){return(X.offsetHeight/Z);},S=R.changeHeightHandles,K,ab,U,V,L,ac;if(Y.get(j)&&R.changeHeightHandles&&R.changeWidthHandles){U=Y._getConstrainRegion();ab=Y.constrainSurrounding.border;K=(U.bottom-E(ab[b]))-T;V=aa-(U.left+E(ab[y]));L=(U.right-E(ab[A]))-W;ac=P-(U.top+E(ab[f]));if(R.changeLeftHandles&&R.changeTopHandles){S=(ac<V);}else{if(R.changeLeftHandles){S=(K<V);}else{if(R.changeTopHandles){S=(ac<L);}else{S=(K<L);}}}}if(S){X.offsetWidth=Q*O();Y._checkWidth();X.offsetHeight=Z*M();}else{X.offsetHeight=Z*M();Y._checkHeight();X.offsetWidth=Q*O();}if(R.changeTopHandles){X.top=P+(Z-X.offsetHeight);}if(R.changeLeftHandles){X.left=aa+(Q-X.offsetWidth);}a.each(X,function(ae,ad){if(I(ae)){X[ad]=Math.round(ae);}});},_checkRegion:function(){var K=this,L=K.get(n),M=K._getConstrainRegion();return a.DOM.inRegion(null,M,true,L.info);},_checkWidth:function(){var K=this,N=K.get(n),O=N.info,M=(K.get(h)+N.totalHSurrounding),L=(K.get(F)+N.totalHSurrounding);K._checkConstrain(o,G,z);if(O.offsetWidth<L){N._checkSize(z,L);}if(O.offsetWidth>M){N._checkSize(z,M);}},_getConstrainRegion:function(){var K=this,M=K.get(n),L=M.get(H),O=K.get(j),N=null;if(O){if(O==l){N=L.get(w);}else{if(e(O)){N=O.get(p);}else{N=O;}}}return N;},_handleResizeAlignEvent:function(M){var K=this,L=K.get(n);K._checkHeight();K._checkWidth();if(K.get(B)){K._checkRatio();}if(K.get(j)&&!K._checkRegion()){L.info=L.lastInfo;}},_handleResizeStartEvent:function(M){var K=this,N=K.get(j),L=K.get(n);K.constrainSurrounding=L._getBoxSurroundingInfo(N);}});a.namespace("Plugin");a.Plugin.ResizeConstrained=v;},"3.4.0",{requires:["resize-base","plugin"],skinnable:false});YUI.add("resize",function(a){},"3.4.0",{use:["resize-base","resize-proxy","resize-constrain"]});