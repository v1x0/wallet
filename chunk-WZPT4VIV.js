import { a as f, b as T, c as _ } from "@nf-internal/chunk-FVDLKYOC";
import { b as O, d as w } from "@nf-internal/chunk-KQD4JEVW";
import { a as p, c as b } from "@nf-internal/chunk-MQ6KVUBG";
import { b as z, c as V, e as E } from "@nf-internal/chunk-BZLND6O7";
import { a as g } from "@nf-internal/chunk-7RHXFCZM";
import * as o from "@angular/core";
import { InjectionToken as y, forwardRef as Z, inject as s, NgZone as v, RendererFactory2 as M, ElementRef as x, Renderer2 as G, DOCUMENT as L, ChangeDetectorRef as $, signal as S, Injector as q, effect as Y, ApplicationRef as Q, DestroyRef as K, untracked as X, afterNextRender as J, booleanAttribute as ee, ViewContainerRef as te, TemplateRef as re, IterableDiffers as ie } from "@angular/core";
import { Subject as u, of as I, Observable as P, Subscription as ne, animationFrameScheduler as oe, asapScheduler as se, isObservable as le } from "rxjs";
import { distinctUntilChanged as N, auditTime as D, filter as A, startWith as W, takeUntil as C, pairwise as ae, switchMap as de, shareReplay as ce } from "rxjs/operators";
import "@angular/common";
var he = ["contentWrapper"], ue = ["*"], j = new y("VIRTUAL_SCROLL_STRATEGY"), R = class {
    _scrolledIndexChange = new u;
    scrolledIndexChange = this._scrolledIndexChange.pipe(N());
    _viewport = null;
    _itemSize;
    _minBufferPx;
    _maxBufferPx;
    constructor(d, e, t) { this._itemSize = d, this._minBufferPx = e, this._maxBufferPx = t; }
    attach(d) { this._viewport = d, this._updateTotalContentSize(), this._updateRenderedRange(); }
    detach() { this._scrolledIndexChange.complete(), this._viewport = null; }
    updateItemAndBufferSize(d, e, t) { t < e, this._itemSize = d, this._minBufferPx = e, this._maxBufferPx = t, this._updateTotalContentSize(), this._updateRenderedRange(); }
    onContentScrolled() { this._updateRenderedRange(); }
    onDataLengthChanged() { this._updateTotalContentSize(), this._updateRenderedRange(); }
    onContentRendered() { }
    onRenderedOffsetChanged() { }
    scrollToIndex(d, e) { this._viewport && this._viewport.scrollToOffset(d * this._itemSize, e); }
    _updateTotalContentSize() { this._viewport && this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize); }
    _updateRenderedRange() { if (!this._viewport)
        return; let d = this._viewport.getRenderedRange(), e = { start: d.start, end: d.end }, t = this._viewport.getViewportSize(), r = this._viewport.getDataLength(), n = this._viewport.measureScrollOffset(), l = this._itemSize > 0 ? n / this._itemSize : 0; if (e.end > r) {
        let a = Math.ceil(t / this._itemSize), c = Math.max(0, Math.min(l, r - a));
        l != c && (l = c, n = c * this._itemSize, e.start = Math.floor(l)), e.end = Math.max(0, Math.min(r, e.start + a));
    } let h = n - e.start * this._itemSize; if (h < this._minBufferPx && e.start != 0) {
        let a = Math.ceil((this._maxBufferPx - h) / this._itemSize);
        e.start = Math.max(0, e.start - a), e.end = Math.min(r, Math.ceil(l + (t + this._minBufferPx) / this._itemSize));
    }
    else {
        let a = e.end * this._itemSize - (n + t);
        if (a < this._minBufferPx && e.end != r) {
            let c = Math.ceil((this._maxBufferPx - a) / this._itemSize);
            c > 0 && (e.end = Math.min(r, e.end + c), e.start = Math.max(0, Math.floor(l - this._minBufferPx / this._itemSize)));
        }
    } this._viewport.setRenderedRange(e), this._viewport.setRenderedContentOffset(Math.round(this._itemSize * e.start)), this._scrolledIndexChange.next(Math.floor(l)); }
};
function fe(i) { return i._scrollStrategy; }
var We = (() => { class i {
    get itemSize() { return this._itemSize; }
    set itemSize(e) { this._itemSize = p(e); }
    _itemSize = 20;
    get minBufferPx() { return this._minBufferPx; }
    set minBufferPx(e) { this._minBufferPx = p(e); }
    _minBufferPx = 100;
    get maxBufferPx() { return this._maxBufferPx; }
    set maxBufferPx(e) { this._maxBufferPx = p(e); }
    _maxBufferPx = 200;
    _scrollStrategy = new R(this.itemSize, this.minBufferPx, this.maxBufferPx);
    ngOnChanges() { this._scrollStrategy.updateItemAndBufferSize(this.itemSize, this.minBufferPx, this.maxBufferPx); }
    static \u0275fac = function (t) { return new (t || i); };
    static \u0275dir = o.\u0275\u0275defineDirective({ type: i, selectors: [["cdk-virtual-scroll-viewport", "itemSize", ""]], inputs: { itemSize: "itemSize", minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx" }, features: [o.\u0275\u0275ProvidersFeature([{ provide: j, useFactory: fe, deps: [Z(() => i)] }]), o.\u0275\u0275NgOnChangesFeature] });
} return i; })(), _e = 20, pe = (() => { class i {
    _ngZone = s(v);
    _platform = s(g);
    _renderer = s(M).createRenderer(null, null);
    _cleanupGlobalListener;
    constructor() { }
    _scrolled = new u;
    _scrolledCount = 0;
    scrollContainers = new Map;
    register(e) { this.scrollContainers.has(e) || this.scrollContainers.set(e, e.elementScrolled().subscribe(() => this._scrolled.next(e))); }
    deregister(e) { let t = this.scrollContainers.get(e); t && (t.unsubscribe(), this.scrollContainers.delete(e)); }
    scrolled(e = _e) { return this._platform.isBrowser ? new P(t => { this._cleanupGlobalListener || (this._cleanupGlobalListener = this._ngZone.runOutsideAngular(() => this._renderer.listen("document", "scroll", () => this._scrolled.next()))); let r = e > 0 ? this._scrolled.pipe(D(e)).subscribe(t) : this._scrolled.subscribe(t); return this._scrolledCount++, () => { r.unsubscribe(), this._scrolledCount--, this._scrolledCount || (this._cleanupGlobalListener?.(), this._cleanupGlobalListener = void 0); }; }) : I(); }
    ngOnDestroy() { this._cleanupGlobalListener?.(), this._cleanupGlobalListener = void 0, this.scrollContainers.forEach((e, t) => this.deregister(t)), this._scrolled.complete(); }
    ancestorScrolled(e, t) { let r = this.getAncestorScrollContainers(e); return this.scrolled(t).pipe(A(n => !n || r.indexOf(n) > -1)); }
    getAncestorScrollContainers(e) { let t = []; return this.scrollContainers.forEach((r, n) => { this._scrollableContainsElement(n, e) && t.push(n); }), t; }
    _scrollableContainsElement(e, t) { let r = b(t), n = e.getElementRef().nativeElement; do
        if (r == n)
            return !0;
    while (r = r.parentElement); return !1; }
    static \u0275fac = function (t) { return new (t || i); };
    static \u0275prov = o.\u0275\u0275defineInjectable({ token: i, factory: i.\u0275fac, providedIn: "root" });
} return i; })(), U = (() => { class i {
    elementRef = s(x);
    scrollDispatcher = s(pe);
    ngZone = s(v);
    dir = s(O, { optional: !0 });
    _scrollElement = this.elementRef.nativeElement;
    _destroyed = new u;
    _renderer = s(G);
    _cleanupScroll;
    _elementScrolled = new u;
    constructor() { }
    ngOnInit() { this._cleanupScroll = this.ngZone.runOutsideAngular(() => this._renderer.listen(this._scrollElement, "scroll", e => this._elementScrolled.next(e))), this.scrollDispatcher.register(this); }
    ngOnDestroy() { this._cleanupScroll?.(), this._elementScrolled.complete(), this.scrollDispatcher.deregister(this), this._destroyed.next(), this._destroyed.complete(); }
    elementScrolled() { return this._elementScrolled; }
    getElementRef() { return this.elementRef; }
    scrollTo(e) { let t = this.elementRef.nativeElement, r = this.dir && this.dir.value == "rtl"; e.left == null && (e.left = r ? e.end : e.start), e.right == null && (e.right = r ? e.start : e.end), e.bottom != null && (e.top = t.scrollHeight - t.clientHeight - e.bottom), r && _() != f.NORMAL ? (e.left != null && (e.right = t.scrollWidth - t.clientWidth - e.left), _() == f.INVERTED ? e.left = e.right : _() == f.NEGATED && (e.left = e.right ? -e.right : e.right)) : e.right != null && (e.left = t.scrollWidth - t.clientWidth - e.right), this._applyScrollToOptions(e); }
    _applyScrollToOptions(e) { let t = this.elementRef.nativeElement; T() ? t.scrollTo(e) : (e.top != null && (t.scrollTop = e.top), e.left != null && (t.scrollLeft = e.left)); }
    measureScrollOffset(e) { let t = "left", r = "right", n = this.elementRef.nativeElement; if (e == "top")
        return n.scrollTop; if (e == "bottom")
        return n.scrollHeight - n.clientHeight - n.scrollTop; let l = this.dir && this.dir.value == "rtl"; return e == "start" ? e = l ? r : t : e == "end" && (e = l ? t : r), l && _() == f.INVERTED ? e == t ? n.scrollWidth - n.clientWidth - n.scrollLeft : n.scrollLeft : l && _() == f.NEGATED ? e == t ? n.scrollLeft + n.scrollWidth - n.clientWidth : -n.scrollLeft : e == t ? n.scrollLeft : n.scrollWidth - n.clientWidth - n.scrollLeft; }
    static \u0275fac = function (t) { return new (t || i); };
    static \u0275dir = o.\u0275\u0275defineDirective({ type: i, selectors: [["", "cdk-scrollable", ""], ["", "cdkScrollable", ""]] });
} return i; })(), ge = 20, me = (() => { class i {
    _platform = s(g);
    _listeners;
    _viewportSize = null;
    _change = new u;
    _document = s(L);
    constructor() { let e = s(v), t = s(M).createRenderer(null, null); e.runOutsideAngular(() => { if (this._platform.isBrowser) {
        let r = n => this._change.next(n);
        this._listeners = [t.listen("window", "resize", r), t.listen("window", "orientationchange", r)];
    } this.change().subscribe(() => this._viewportSize = null); }); }
    ngOnDestroy() { this._listeners?.forEach(e => e()), this._change.complete(); }
    getViewportSize() { this._viewportSize || this._updateViewportSize(); let e = { width: this._viewportSize.width, height: this._viewportSize.height }; return this._platform.isBrowser || (this._viewportSize = null), e; }
    getViewportRect() { let e = this.getViewportScrollPosition(), { width: t, height: r } = this.getViewportSize(); return { top: e.top, left: e.left, bottom: e.top + r, right: e.left + t, height: r, width: t }; }
    getViewportScrollPosition() { if (!this._platform.isBrowser)
        return { top: 0, left: 0 }; let e = this._document, t = this._getWindow(), r = e.documentElement, n = r.getBoundingClientRect(), l = -n.top || e.body?.scrollTop || t.scrollY || r.scrollTop || 0, h = -n.left || e.body?.scrollLeft || t.scrollX || r.scrollLeft || 0; return { top: l, left: h }; }
    change(e = ge) { return e > 0 ? this._change.pipe(D(e)) : this._change; }
    _getWindow() { return this._document.defaultView || window; }
    _updateViewportSize() { let e = this._getWindow(); this._viewportSize = this._platform.isBrowser ? { width: e.innerWidth, height: e.innerHeight } : { width: 0, height: 0 }; }
    static \u0275fac = function (t) { return new (t || i); };
    static \u0275prov = o.\u0275\u0275defineInjectable({ token: i, factory: i.\u0275fac, providedIn: "root" });
} return i; })(), m = new y("VIRTUAL_SCROLLABLE"), k = (() => { class i extends U {
    constructor() { super(); }
    measureViewportSize(e) { let t = this.elementRef.nativeElement; return e === "horizontal" ? t.clientWidth : t.clientHeight; }
    static \u0275fac = function (t) { return new (t || i); };
    static \u0275dir = o.\u0275\u0275defineDirective({ type: i, features: [o.\u0275\u0275InheritDefinitionFeature] });
} return i; })();
function ve(i, d) { return i.start == d.start && i.end == d.end; }
var we = typeof requestAnimationFrame < "u" ? oe : se, H = new y("CDK_VIRTUAL_SCROLL_VIEWPORT"), je = (() => {
    class i extends k {
        elementRef = s(x);
        _changeDetectorRef = s($);
        _scrollStrategy = s(j, { optional: !0 });
        scrollable = s(m, { optional: !0 });
        _platform = s(g);
        _detachedSubject = new u;
        _renderedRangeSubject = new u;
        _renderedContentOffsetSubject = new u;
        get orientation() { return this._orientation; }
        set orientation(e) { this._orientation !== e && (this._orientation = e, this._calculateSpacerSize()); }
        _orientation = "vertical";
        appendOnly = !1;
        scrolledIndexChange = new P(e => this._scrollStrategy.scrolledIndexChange.subscribe(t => Promise.resolve().then(() => this.ngZone.run(() => e.next(t)))));
        _contentWrapper;
        renderedRangeStream = this._renderedRangeSubject;
        renderedContentOffset = this._renderedContentOffsetSubject.pipe(A(e => e !== null), N());
        _totalContentSize = 0;
        _totalContentWidth = S("");
        _totalContentHeight = S("");
        _renderedContentTransform;
        _renderedRange = { start: 0, end: 0 };
        _dataLength = 0;
        _viewportSize = 0;
        _forOf = null;
        _renderedContentOffset = 0;
        _renderedContentOffsetNeedsRewrite = !1;
        _changeDetectionNeeded = S(!1);
        _runAfterChangeDetection = [];
        _viewportChanges = ne.EMPTY;
        _injector = s(q);
        _isDestroyed = !1;
        constructor() { super(); let e = s(me); this._scrollStrategy, this._viewportChanges = e.change().subscribe(() => { this.checkViewportSize(); }), this.scrollable || (this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable"), this.scrollable = this); let t = Y(() => { this._changeDetectionNeeded() && this._doChangeDetection(); }, { injector: s(Q).injector }); s(K).onDestroy(() => void t.destroy()); }
        ngOnInit() { this._platform.isBrowser && (this.scrollable === this && super.ngOnInit(), this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => { this._measureViewportSize(), this._scrollStrategy.attach(this), this.scrollable.elementScrolled().pipe(W(null), D(0, we), C(this._destroyed)).subscribe(() => this._scrollStrategy.onContentScrolled()), this._markChangeDetectionNeeded(); }))); }
        ngOnDestroy() { this.detach(), this._scrollStrategy.detach(), this._renderedRangeSubject.complete(), this._detachedSubject.complete(), this._viewportChanges.unsubscribe(), this._isDestroyed = !0, super.ngOnDestroy(); }
        attach(e) { this._forOf, this.ngZone.runOutsideAngular(() => { this._forOf = e, this._forOf.dataStream.pipe(C(this._detachedSubject)).subscribe(t => { let r = t.length; r !== this._dataLength && (this._dataLength = r, this._scrollStrategy.onDataLengthChanged()), this._doChangeDetection(); }); }); }
        detach() { this._forOf = null, this._detachedSubject.next(); }
        getDataLength() { return this._dataLength; }
        getViewportSize() { return this._viewportSize; }
        getRenderedRange() { return this._renderedRange; }
        measureBoundingClientRectWithScrollOffset(e) { return this.getElementRef().nativeElement.getBoundingClientRect()[e]; }
        setTotalContentSize(e) { this._totalContentSize !== e && (this._totalContentSize = e, this._calculateSpacerSize(), this._markChangeDetectionNeeded()); }
        setRenderedRange(e) { ve(this._renderedRange, e) || (this.appendOnly && (e = { start: 0, end: Math.max(this._renderedRange.end, e.end) }), this._renderedRangeSubject.next(this._renderedRange = e), this._markChangeDetectionNeeded(() => this._scrollStrategy.onContentRendered())); }
        getOffsetToRenderedContentStart() { return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset; }
        setRenderedContentOffset(e, t = "to-start") { e = this.appendOnly && t === "to-start" ? 0 : e; let r = this.dir && this.dir.value == "rtl", n = this.orientation == "horizontal", l = n ? "X" : "Y", a = `translate${l}(${Number((n && r ? -1 : 1) * e)}px)`; this._renderedContentOffset = e, t === "to-end" && (a += ` translate${l}(-100%)`, this._renderedContentOffsetNeedsRewrite = !0), this._renderedContentTransform != a && (this._renderedContentTransform = a, this._markChangeDetectionNeeded(() => { this._renderedContentOffsetNeedsRewrite ? (this._renderedContentOffset -= this.measureRenderedContentSize(), this._renderedContentOffsetNeedsRewrite = !1, this.setRenderedContentOffset(this._renderedContentOffset)) : this._scrollStrategy.onRenderedOffsetChanged(); })); }
        scrollToOffset(e, t = "auto") { let r = { behavior: t }; this.orientation === "horizontal" ? r.start = e : r.top = e, this.scrollable.scrollTo(r); }
        scrollToIndex(e, t = "auto") { this._scrollStrategy.scrollToIndex(e, t); }
        measureScrollOffset(e) { let t; return this.scrollable == this ? t = r => super.measureScrollOffset(r) : t = r => this.scrollable.measureScrollOffset(r), Math.max(0, t(e ?? (this.orientation === "horizontal" ? "start" : "top")) - this.measureViewportOffset()); }
        measureViewportOffset(e) { let t, r = "left", n = "right", l = this.dir?.value == "rtl"; e == "start" ? t = l ? n : r : e == "end" ? t = l ? r : n : e ? t = e : t = this.orientation === "horizontal" ? "left" : "top"; let h = this.scrollable.measureBoundingClientRectWithScrollOffset(t); return this.elementRef.nativeElement.getBoundingClientRect()[t] - h; }
        measureRenderedContentSize() { let e = this._contentWrapper.nativeElement; return this.orientation === "horizontal" ? e.offsetWidth : e.offsetHeight; }
        measureRangeSize(e) { return this._forOf ? this._forOf.measureRangeSize(e, this.orientation) : 0; }
        checkViewportSize() { this._measureViewportSize(), this._scrollStrategy.onDataLengthChanged(); }
        _measureViewportSize() { this._viewportSize = this.scrollable.measureViewportSize(this.orientation); }
        _markChangeDetectionNeeded(e) { e && this._runAfterChangeDetection.push(e), !X(this._changeDetectionNeeded) && this.ngZone.runOutsideAngular(() => { Promise.resolve().then(() => { this.ngZone.run(() => { this._changeDetectionNeeded.set(!0); }); }); }); }
        _doChangeDetection() { this._isDestroyed || this.ngZone.run(() => { this._changeDetectorRef.markForCheck(), this._contentWrapper.nativeElement.style.transform = this._renderedContentTransform, this._renderedContentOffsetSubject.next(this.getOffsetToRenderedContentStart()), J(() => { this._changeDetectionNeeded.set(!1); let e = this._runAfterChangeDetection; this._runAfterChangeDetection = []; for (let t of e)
            t(); }, { injector: this._injector }); }); }
        _calculateSpacerSize() { this._totalContentHeight.set(this.orientation === "horizontal" ? "" : `${this._totalContentSize}px`), this._totalContentWidth.set(this.orientation === "horizontal" ? `${this._totalContentSize}px` : ""); }
        static \u0275fac = function (t) { return new (t || i); };
        static \u0275cmp = o.\u0275\u0275defineComponent({ type: i, selectors: [["cdk-virtual-scroll-viewport"]], viewQuery: function (t, r) { if (t & 1 && o.\u0275\u0275viewQuery(he, 7), t & 2) {
                let n;
                o.\u0275\u0275queryRefresh(n = o.\u0275\u0275loadQuery()) && (r._contentWrapper = n.first);
            } }, hostAttrs: [1, "cdk-virtual-scroll-viewport"], hostVars: 4, hostBindings: function (t, r) { t & 2 && o.\u0275\u0275classProp("cdk-virtual-scroll-orientation-horizontal", r.orientation === "horizontal")("cdk-virtual-scroll-orientation-vertical", r.orientation !== "horizontal"); }, inputs: { orientation: "orientation", appendOnly: [2, "appendOnly", "appendOnly", ee] }, outputs: { scrolledIndexChange: "scrolledIndexChange" }, features: [o.\u0275\u0275ProvidersFeature([{ provide: U, useFactory: () => s(m, { optional: !0 }) || s(i) }, { provide: H, useExisting: i }]), o.\u0275\u0275InheritDefinitionFeature], ngContentSelectors: ue, decls: 4, vars: 4, consts: [["contentWrapper", ""], [1, "cdk-virtual-scroll-content-wrapper"], [1, "cdk-virtual-scroll-spacer"]], template: function (t, r) { t & 1 && (o.\u0275\u0275projectionDef(), o.\u0275\u0275domElementStart(0, "div", 1, 0), o.\u0275\u0275projection(2), o.\u0275\u0275domElementEnd(), o.\u0275\u0275domElement(3, "div", 2)), t & 2 && (o.\u0275\u0275advance(3), o.\u0275\u0275styleProp("width", r._totalContentWidth())("height", r._totalContentHeight())); }, styles: [`cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}
`], encapsulation: 2, changeDetection: 0 });
    }
    return i;
})();
function B(i, d, e) { let t = e; if (!t.getBoundingClientRect)
    return 0; let r = t.getBoundingClientRect(); return i === "horizontal" ? d === "start" ? r.left : r.right : d === "start" ? r.top : r.bottom; }
var Ue = (() => { class i {
    _viewContainerRef = s(te);
    _template = s(re);
    _differs = s(ie);
    _viewRepeater = new E;
    _viewport = s(H, { skipSelf: !0 });
    viewChange = new u;
    _dataSourceChanges = new u;
    get cdkVirtualForOf() { return this._cdkVirtualForOf; }
    set cdkVirtualForOf(e) { this._cdkVirtualForOf = e, z(e) ? this._dataSourceChanges.next(e) : this._dataSourceChanges.next(new V(le(e) ? e : Array.from(e || []))); }
    _cdkVirtualForOf;
    get cdkVirtualForTrackBy() { return this._cdkVirtualForTrackBy; }
    set cdkVirtualForTrackBy(e) { this._needsUpdate = !0, this._cdkVirtualForTrackBy = e ? (t, r) => e(t + (this._renderedRange ? this._renderedRange.start : 0), r) : void 0; }
    _cdkVirtualForTrackBy;
    set cdkVirtualForTemplate(e) { e && (this._needsUpdate = !0, this._template = e); }
    get cdkVirtualForTemplateCacheSize() { return this._viewRepeater.viewCacheSize; }
    set cdkVirtualForTemplateCacheSize(e) { this._viewRepeater.viewCacheSize = p(e); }
    dataStream = this._dataSourceChanges.pipe(W(null), ae(), de(([e, t]) => this._changeDataSource(e, t)), ce(1));
    _differ = null;
    _data = [];
    _renderedItems = [];
    _renderedRange = { start: 0, end: 0 };
    _needsUpdate = !1;
    _destroyed = new u;
    constructor() { let e = s(v); this.dataStream.subscribe(t => { this._data = t, this._onRenderedDataChange(); }), this._viewport.renderedRangeStream.pipe(C(this._destroyed)).subscribe(t => { this._renderedRange = t, this.viewChange.observers.length && e.run(() => this.viewChange.next(this._renderedRange)), this._onRenderedDataChange(); }), this._viewport.attach(this); }
    measureRangeSize(e, t) { if (e.start >= e.end)
        return 0; e.start < this._renderedRange.start || e.end > this._renderedRange.end; let r = e.start - this._renderedRange.start, n = e.end - e.start, l, h; for (let a = 0; a < n; a++) {
        let c = this._viewContainerRef.get(a + r);
        if (c && c.rootNodes.length) {
            l = h = c.rootNodes[0];
            break;
        }
    } for (let a = n - 1; a > -1; a--) {
        let c = this._viewContainerRef.get(a + r);
        if (c && c.rootNodes.length) {
            h = c.rootNodes[c.rootNodes.length - 1];
            break;
        }
    } return l && h ? B(t, "end", h) - B(t, "start", l) : 0; }
    ngDoCheck() { if (this._differ && this._needsUpdate) {
        let e = this._differ.diff(this._renderedItems);
        e ? this._applyChanges(e) : this._updateContext(), this._needsUpdate = !1;
    } }
    ngOnDestroy() { this._viewport.detach(), this._dataSourceChanges.next(void 0), this._dataSourceChanges.complete(), this.viewChange.complete(), this._destroyed.next(), this._destroyed.complete(), this._viewRepeater.detach(); }
    _onRenderedDataChange() { this._renderedRange && (this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end), this._differ || (this._differ = this._differs.find(this._renderedItems).create((e, t) => this.cdkVirtualForTrackBy ? this.cdkVirtualForTrackBy(e, t) : t)), this._needsUpdate = !0); }
    _changeDataSource(e, t) { return e && e.disconnect(this), this._needsUpdate = !0, t ? t.connect(this) : I(); }
    _updateContext() { let e = this._data.length, t = this._viewContainerRef.length; for (; t--;) {
        let r = this._viewContainerRef.get(t);
        r.context.index = this._renderedRange.start + t, r.context.count = e, this._updateComputedContextProperties(r.context), r.detectChanges();
    } }
    _applyChanges(e) { this._viewRepeater.applyChanges(e, this._viewContainerRef, (n, l, h) => this._getEmbeddedViewArgs(n, h), n => n.item), e.forEachIdentityChange(n => { let l = this._viewContainerRef.get(n.currentIndex); l.context.$implicit = n.item; }); let t = this._data.length, r = this._viewContainerRef.length; for (; r--;) {
        let n = this._viewContainerRef.get(r);
        n.context.index = this._renderedRange.start + r, n.context.count = t, this._updateComputedContextProperties(n.context);
    } }
    _updateComputedContextProperties(e) { e.first = e.index === 0, e.last = e.index === e.count - 1, e.even = e.index % 2 === 0, e.odd = !e.even; }
    _getEmbeddedViewArgs(e, t) { return { templateRef: this._template, context: { $implicit: e.item, cdkVirtualForOf: this._cdkVirtualForOf, index: -1, count: -1, first: !1, last: !1, odd: !1, even: !1 }, index: t }; }
    static ngTemplateContextGuard(e, t) { return !0; }
    static \u0275fac = function (t) { return new (t || i); };
    static \u0275dir = o.\u0275\u0275defineDirective({ type: i, selectors: [["", "cdkVirtualFor", "", "cdkVirtualForOf", ""]], inputs: { cdkVirtualForOf: "cdkVirtualForOf", cdkVirtualForTrackBy: "cdkVirtualForTrackBy", cdkVirtualForTemplate: "cdkVirtualForTemplate", cdkVirtualForTemplateCacheSize: "cdkVirtualForTemplateCacheSize" } });
} return i; })(), He = (() => { class i extends k {
    constructor() { super(); }
    measureBoundingClientRectWithScrollOffset(e) { return this.getElementRef().nativeElement.getBoundingClientRect()[e] - this.measureScrollOffset(e); }
    static \u0275fac = function (t) { return new (t || i); };
    static \u0275dir = o.\u0275\u0275defineDirective({ type: i, selectors: [["", "cdkVirtualScrollingElement", ""]], hostAttrs: [1, "cdk-virtual-scrollable"], features: [o.\u0275\u0275ProvidersFeature([{ provide: m, useExisting: i }]), o.\u0275\u0275InheritDefinitionFeature] });
} return i; })(), Ze = (() => { class i extends k {
    constructor() { super(); let e = s(L); this.elementRef = new x(e.documentElement), this._scrollElement = e; }
    measureBoundingClientRectWithScrollOffset(e) { return this.getElementRef().nativeElement.getBoundingClientRect()[e]; }
    static \u0275fac = function (t) { return new (t || i); };
    static \u0275dir = o.\u0275\u0275defineDirective({ type: i, selectors: [["cdk-virtual-scroll-viewport", "scrollWindow", ""]], features: [o.\u0275\u0275ProvidersFeature([{ provide: m, useExisting: i }]), o.\u0275\u0275InheritDefinitionFeature] });
} return i; })(), F = (() => { class i {
    static \u0275fac = function (t) { return new (t || i); };
    static \u0275mod = o.\u0275\u0275defineNgModule({ type: i });
    static \u0275inj = o.\u0275\u0275defineInjector({});
} return i; })(), Ge = (() => { class i {
    static \u0275fac = function (t) { return new (t || i); };
    static \u0275mod = o.\u0275\u0275defineNgModule({ type: i });
    static \u0275inj = o.\u0275\u0275defineInjector({ imports: [w, F, w, F] });
} return i; })();
export { j as a, R as b, fe as c, We as d, _e as e, pe as f, U as g, ge as h, me as i, m as j, k, H as l, je as m, Ue as n, He as o, Ze as p, F as q, Ge as r };
