import { a as _, b as S, c as m, d as D, e as I, f as ee, g as T } from "@nf-internal/chunk-LOHFO5VT";
import { a as H, d as R } from "@nf-internal/chunk-4CLCTAJ7";
import { \u0275DomAdapter as te, \u0275setRootDomAdapter as ne, \u0275parseCookieValue as re, \u0275getDOM as j, DOCUMENT as B, \u0275PLATFORM_BROWSER_ID as oe, XhrFactory as ie, CommonModule as se } from "@angular/common";
import * as l from "@angular/core";
import { \u0275global as f, \u0275RuntimeError as ae, \u0275internalCreateApplication as U, \u0275resolveComponentResources as ot, PLATFORM_ID as ce, PLATFORM_INITIALIZER as ue, createPlatformFactory as le, platformCore as de, InjectionToken as it, \u0275TESTABILITY_GETTER as fe, \u0275TESTABILITY as pe, Testability as b, \u0275INJECTOR_SCOPE as me, ErrorHandler as x, RendererFactory2 as he, ApplicationModule as ge, \u0275setDocument as Ee } from "@angular/core";
var M = class t extends te {
    supportsDOMEvents = !0;
    static makeCurrent() { ne(new t); }
    onAndCancel(o, e, n, r) { return o.addEventListener(e, n, r), () => { o.removeEventListener(e, n, r); }; }
    dispatchEvent(o, e) { o.dispatchEvent(e); }
    remove(o) { o.remove(); }
    createElement(o, e) { return e = e || this.getDefaultDocument(), e.createElement(o); }
    createHtmlDocument() { return document.implementation.createHTMLDocument("fakeTitle"); }
    getDefaultDocument() { return document; }
    isElementNode(o) { return o.nodeType === Node.ELEMENT_NODE; }
    isShadowRoot(o) { return o instanceof DocumentFragment; }
    getGlobalEventTarget(o, e) { return e === "window" ? window : e === "document" ? o : e === "body" ? o.body : null; }
    getBaseHref(o) { let e = ve(); return e == null ? null : ye(e); }
    resetBaseElement() { h = null; }
    getUserAgent() { return window.navigator.userAgent; }
    getCookie(o) { return re(document.cookie, o); }
}, h = null;
function ve() { return h = h || document.head.querySelector("base"), h ? h.getAttribute("href") : null; }
function ye(t) { return new URL(t, document.baseURI).pathname; }
var w = class {
    addToWindow(o) { f.getAngularTestability = (n, r = !0) => { let i = o.findTestabilityInTree(n, r); if (i == null)
        throw new ae(5103, !1); return i; }, f.getAllAngularTestabilities = () => o.getAllTestabilities(), f.getAllAngularRootElements = () => o.getAllRootElements(); let e = n => { let r = f.getAllAngularTestabilities(), i = r.length, s = function () { i--, i == 0 && n(); }; r.forEach(a => { a.whenStable(s); }); }; f.frameworkStabilizers || (f.frameworkStabilizers = []), f.frameworkStabilizers.push(e); }
    findTestabilityInTree(o, e, n) { if (e == null)
        return null; let r = o.getTestability(e); return r ?? (n ? j().isShadowRoot(e) ? this.findTestabilityInTree(o, e.host, !0) : this.findTestabilityInTree(o, e.parentElement, !0) : null); }
}, _e = (() => { class t {
    build() { return new XMLHttpRequest; }
    static \u0275fac = function (n) { return new (n || t); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac });
} return t; })(), P = ["alt", "control", "meta", "shift"], Te = { "\b": "Backspace", "	": "Tab", "\x7F": "Delete", "\x1B": "Escape", Del: "Delete", Esc: "Escape", Left: "ArrowLeft", Right: "ArrowRight", Up: "ArrowUp", Down: "ArrowDown", Menu: "ContextMenu", Scroll: "ScrollLock", Win: "OS" }, Me = { alt: t => t.altKey, control: t => t.ctrlKey, meta: t => t.metaKey, shift: t => t.shiftKey }, F = (() => { class t extends _ {
    constructor(e) { super(e); }
    supports(e) { return t.parseEventName(e) != null; }
    addEventListener(e, n, r, i) { let s = t.parseEventName(n), a = t.eventCallback(s.fullKey, r, this.manager.getZone()); return this.manager.getZone().runOutsideAngular(() => j().onAndCancel(e, s.domEventName, a, i)); }
    static parseEventName(e) { let n = e.toLowerCase().split("."), r = n.shift(); if (n.length === 0 || !(r === "keydown" || r === "keyup"))
        return null; let i = t._normalizeKey(n.pop()), s = "", a = n.indexOf("code"); if (a > -1 && (n.splice(a, 1), s = "code."), P.forEach(N => { let k = n.indexOf(N); k > -1 && (n.splice(k, 1), s += N + "."); }), s += i, n.length != 0 || i.length === 0)
        return null; let u = {}; return u.domEventName = r, u.fullKey = s, u; }
    static matchEventFullKeyCode(e, n) { let r = Te[e.key] || e.key, i = ""; return n.indexOf("code.") > -1 && (r = e.code, i = "code."), r == null || !r ? !1 : (r = r.toLowerCase(), r === " " ? r = "space" : r === "." && (r = "dot"), P.forEach(s => { if (s !== r) {
        let a = Me[s];
        a(e) && (i += s + ".");
    } }), i += r, i === n); }
    static eventCallback(e, n, r) { return i => { t.matchEventFullKeyCode(i, e) && r.runGuarded(() => n(i)); }; }
    static _normalizeKey(e) { return e === "esc" ? "escape" : e; }
    static \u0275fac = function (n) { return new (n || t)(l.\u0275\u0275inject(B)); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac });
} return t; })();
function we(t, o, e) { return R(this, null, function* () { let n = H({ rootComponent: t }, z(o, e)); return U(n); }); }
function Re(t, o) { return R(this, null, function* () { return U(z(t, o)); }); }
function z(t, o) { return { platformRef: o?.platformRef, appProviders: [...Y, ...t?.providers ?? []], platformProviders: V }; }
function Se() { return [...G]; }
function De() { M.makeCurrent(); }
function Ie() { return new x; }
function be() { return Ee(document), document; }
var V = [{ provide: ce, useValue: oe }, { provide: ue, useValue: De, multi: !0 }, { provide: B, useFactory: be }], Ce = le(de, "browser", V);
var G = [{ provide: fe, useClass: w }, { provide: pe, useClass: b }, { provide: b, useClass: b }], Y = [{ provide: me, useValue: "root" }, { provide: x, useFactory: Ie }, { provide: m, useClass: S, multi: !0 }, { provide: m, useClass: F, multi: !0 }, T, I, D, { provide: he, useExisting: T }, { provide: ie, useClass: _e }, []], Ae = (() => { class t {
    constructor() { }
    static \u0275fac = function (n) { return new (n || t); };
    static \u0275mod = l.\u0275\u0275defineNgModule({ type: t });
    static \u0275inj = l.\u0275\u0275defineInjector({ providers: [...Y, ...G], imports: [se, ge] });
} return t; })();
import { \u0275getDOM as $, DOCUMENT as v } from "@angular/common";
import { \u0275getDOM as Ft } from "@angular/common";
import * as c from "@angular/core";
import { \u0275global as J, ApplicationRef as Oe, InjectionToken as W, \u0275Console as ht, Optional as Le, Injector as Ne, \u0275RuntimeError as C, SecurityContext as p, \u0275allowSanitizationBypassAndThrow as g, \u0275unwrapSafeValue as E, \u0275_sanitizeUrl as ke, \u0275_sanitizeHtml as He, \u0275bypassSanitizationTrustHtml as Pe, \u0275bypassSanitizationTrustStyle as je, \u0275bypassSanitizationTrustScript as Be, \u0275bypassSanitizationTrustUrl as Ue, \u0275bypassSanitizationTrustResourceUrl as xe, \u0275withI18nSupport as Fe, \u0275withEventReplay as ze, \u0275withIncrementalHydration as Ve, makeEnvironmentProviders as Ge, \u0275withDomHydration as Ye, ENVIRONMENT_INITIALIZER as _t, inject as Tt, \u0275IS_ENABLED_BLOCKING_INITIAL_NAVIGATION as Mt, \u0275formatRuntimeError as wt, Version as Je } from "@angular/core";
import { \u0275withHttpTransferCache as X } from "@angular/common/http";
var Dt = (() => { class t {
    _doc;
    _dom;
    constructor(e) { this._doc = e, this._dom = $(); }
    addTag(e, n = !1) { return e ? this._getOrCreateElement(e, n) : null; }
    addTags(e, n = !1) { return e ? e.reduce((r, i) => (i && r.push(this._getOrCreateElement(i, n)), r), []) : []; }
    getTag(e) { return e && this._doc.querySelector(`meta[${e}]`) || null; }
    getTags(e) { if (!e)
        return []; let n = this._doc.querySelectorAll(`meta[${e}]`); return n ? [].slice.call(n) : []; }
    updateTag(e, n) { if (!e)
        return null; n = n || this._parseSelector(e); let r = this.getTag(n); return r ? this._setMetaElementAttributes(e, r) : this._getOrCreateElement(e, !0); }
    removeTag(e) { this.removeTagElement(this.getTag(e)); }
    removeTagElement(e) { e && this._dom.remove(e); }
    _getOrCreateElement(e, n = !1) { if (!n) {
        let s = this._parseSelector(e), a = this.getTags(s).filter(u => this._containsAttributes(e, u))[0];
        if (a !== void 0)
            return a;
    } let r = this._dom.createElement("meta"); return this._setMetaElementAttributes(e, r), this._doc.getElementsByTagName("head")[0].appendChild(r), r; }
    _setMetaElementAttributes(e, n) { return Object.keys(e).forEach(r => n.setAttribute(this._getMetaKeyMap(r), e[r])), n; }
    _parseSelector(e) { let n = e.name ? "name" : "property"; return `${n}="${e[n]}"`; }
    _containsAttributes(e, n) { return Object.keys(e).every(r => n.getAttribute(this._getMetaKeyMap(r)) === e[r]); }
    _getMetaKeyMap(e) { return Ke[e] || e; }
    static \u0275fac = function (n) { return new (n || t)(c.\u0275\u0275inject(v)); };
    static \u0275prov = c.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })(), Ke = { httpEquiv: "http-equiv" }, It = (() => { class t {
    _doc;
    constructor(e) { this._doc = e; }
    getTitle() { return this._doc.title; }
    setTitle(e) { this._doc.title = e || ""; }
    static \u0275fac = function (n) { return new (n || t)(c.\u0275\u0275inject(v)); };
    static \u0275prov = c.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })();
function q(t, o) { if (typeof COMPILED > "u" || !COMPILED) {
    let e = J.ng = J.ng || {};
    e[t] = o;
} }
var A = class {
    msPerTick;
    numTicks;
    constructor(o, e) { this.msPerTick = o, this.numTicks = e; }
}, O = class {
    appRef;
    constructor(o) { this.appRef = o.injector.get(Oe); }
    timeChangeDetection(o) { let e = o && o.record, n = "Change Detection"; e && "profile" in console && typeof console.profile == "function" && console.profile(n); let r = performance.now(), i = 0; for (; i < 5 || performance.now() - r < 500;)
        this.appRef.tick(), i++; let s = performance.now(); e && "profileEnd" in console && typeof console.profileEnd == "function" && console.profileEnd(n); let a = (s - r) / i; return console.log(`ran ${i} change detection cycles`), console.log(`${a.toFixed(2)} ms per check`), new A(a, i); }
}, Z = "profiler";
function bt(t) { return q(Z, new O(t)), t; }
function Ct() { q(Z, null); }
var K = class {
    static all() { return () => !0; }
    static css(o) { return e => e.nativeElement != null ? $e(e.nativeElement, o) : !1; }
    static directive(o) { return e => e.providerTokens.indexOf(o) !== -1; }
};
function $e(t, o) { return $().isElementNode(t) ? t.matches && t.matches(o) || t.msMatchesSelector && t.msMatchesSelector(o) || t.webkitMatchesSelector && t.webkitMatchesSelector(o) : !1; }
var We = { pan: !0, panstart: !0, panmove: !0, panend: !0, pancancel: !0, panleft: !0, panright: !0, panup: !0, pandown: !0, pinch: !0, pinchstart: !0, pinchmove: !0, pinchend: !0, pinchcancel: !0, pinchin: !0, pinchout: !0, press: !0, pressup: !0, rotate: !0, rotatestart: !0, rotatemove: !0, rotateend: !0, rotatecancel: !0, swipe: !0, swipeleft: !0, swiperight: !0, swipeup: !0, swipedown: !0, tap: !0, doubletap: !0 }, L = new W(""), Q = new W(""), Xe = (() => { class t {
    events = [];
    overrides = {};
    options;
    buildHammer(e) { let n = new Hammer(e, this.options); n.get("pinch").set({ enable: !0 }), n.get("rotate").set({ enable: !0 }); for (let r in this.overrides)
        n.get(r).set(this.overrides[r]); return n; }
    static \u0275fac = function (n) { return new (n || t); };
    static \u0275prov = c.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac });
} return t; })(), qe = (() => { class t extends _ {
    _config;
    _injector;
    loader;
    _loaderPromise = null;
    constructor(e, n, r, i) { super(e), this._config = n, this._injector = r, this.loader = i; }
    supports(e) { return !(!We.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e) || !window.Hammer && !this.loader); }
    addEventListener(e, n, r) { let i = this.manager.getZone(); if (n = n.toLowerCase(), !window.Hammer && this.loader) {
        this._loaderPromise = this._loaderPromise || i.runOutsideAngular(() => this.loader());
        let s = !1, a = () => { s = !0; };
        return i.runOutsideAngular(() => this._loaderPromise.then(() => { if (!window.Hammer) {
            a = () => { };
            return;
        } s || (a = this.addEventListener(e, n, r)); }).catch(() => { a = () => { }; })), () => { a(); };
    } return i.runOutsideAngular(() => { let s = this._config.buildHammer(e), a = function (u) { i.runGuarded(function () { r(u); }); }; return s.on(n, a), () => { s.off(n, a), typeof s.destroy == "function" && s.destroy(); }; }); }
    isCustomEvent(e) { return this._config.events.indexOf(e) > -1; }
    static \u0275fac = function (n) { return new (n || t)(c.\u0275\u0275inject(v), c.\u0275\u0275inject(L), c.\u0275\u0275inject(c.Injector), c.\u0275\u0275inject(Q, 8)); };
    static \u0275prov = c.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac });
} return t; })(), At = (() => { class t {
    static \u0275fac = function (n) { return new (n || t); };
    static \u0275mod = c.\u0275\u0275defineNgModule({ type: t });
    static \u0275inj = c.\u0275\u0275defineInjector({ providers: [{ provide: m, useClass: qe, multi: !0, deps: [v, L, Ne, [new Le, Q]] }, { provide: L, useClass: Xe }] });
} return t; })(), Ze = (() => { class t {
    static \u0275fac = function (n) { return new (n || t); };
    static \u0275prov = c.\u0275\u0275defineInjectable({ token: t, factory: function (n) { let r = null; return n ? r = new (n || t) : r = c.\u0275\u0275inject(Qe), r; }, providedIn: "root" });
} return t; })(), Qe = (() => { class t extends Ze {
    _doc;
    constructor(e) { super(), this._doc = e; }
    sanitize(e, n) { if (n == null)
        return null; switch (e) {
        case p.NONE: return n;
        case p.HTML: return g(n, "HTML") ? E(n) : He(this._doc, String(n)).toString();
        case p.STYLE: return g(n, "Style") ? E(n) : n;
        case p.SCRIPT:
            if (g(n, "Script"))
                return E(n);
            throw new C(5200, !1);
        case p.URL: return g(n, "URL") ? E(n) : ke(String(n));
        case p.RESOURCE_URL:
            if (g(n, "ResourceURL"))
                return E(n);
            throw new C(5201, !1);
        default: throw new C(5202, !1);
    } }
    bypassSecurityTrustHtml(e) { return Pe(e); }
    bypassSecurityTrustStyle(e) { return je(e); }
    bypassSecurityTrustScript(e) { return Be(e); }
    bypassSecurityTrustUrl(e) { return Ue(e); }
    bypassSecurityTrustResourceUrl(e) { return xe(e); }
    static \u0275fac = function (n) { return new (n || t)(c.\u0275\u0275inject(v)); };
    static \u0275prov = c.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })(), d = (function (t) { return t[t.NoHttpTransferCache = 0] = "NoHttpTransferCache", t[t.HttpTransferCacheOptions = 1] = "HttpTransferCacheOptions", t[t.I18nSupport = 2] = "I18nSupport", t[t.EventReplay = 3] = "EventReplay", t[t.IncrementalHydration = 4] = "IncrementalHydration", t; })(d || {});
function y(t, o = [], e = {}) { return { \u0275kind: t, \u0275providers: o }; }
function Ot() { return y(d.NoHttpTransferCache); }
function Lt(t) { return y(d.HttpTransferCacheOptions, X(t)); }
function Nt() { return y(d.I18nSupport, Fe()); }
function kt() { return y(d.EventReplay, ze()); }
function Ht() { return y(d.IncrementalHydration, Ve()); }
function Pt(...t) { let o = [], e = new Set; for (let { \u0275providers: r, \u0275kind: i } of t)
    e.add(i), r.length && o.push(r); let n = e.has(d.HttpTransferCacheOptions); return Ge([[], [], Ye(), e.has(d.NoHttpTransferCache) || n ? [] : X({}), o]); }
var jt = new Je("21.1.0");
export { Ae as BrowserModule, K as By, Ze as DomSanitizer, m as EVENT_MANAGER_PLUGINS, D as EventManager, _ as EventManagerPlugin, L as HAMMER_GESTURE_CONFIG, Q as HAMMER_LOADER, Xe as HammerGestureConfig, At as HammerModule, d as HydrationFeatureKind, Dt as Meta, ee as REMOVE_STYLES_ON_COMPONENT_DESTROY, It as Title, jt as VERSION, we as bootstrapApplication, Re as createApplication, Ct as disableDebugTools, bt as enableDebugTools, Ce as platformBrowser, Pt as provideClientHydration, Se as provideProtractorTestingSupport, kt as withEventReplay, Lt as withHttpTransferCacheOptions, Nt as withI18nSupport, Ht as withIncrementalHydration, Ot as withNoHttpTransferCache, M as \u0275BrowserDomAdapter, w as \u0275BrowserGetTestability, S as \u0275DomEventsPlugin, T as \u0275DomRendererFactory2, Qe as \u0275DomSanitizerImpl, qe as \u0275HammerGesturesPlugin, F as \u0275KeyEventsPlugin, I as \u0275SharedStylesHost, Ft as \u0275getDOM };
/*! Bundled license information:

@angular/platform-browser/fesm2022/_browser-chunk.mjs:
@angular/platform-browser/fesm2022/platform-browser.mjs:
  (**
   * @license Angular v21.1.0
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
