import { d as b, e as _, f as h } from "@nf-internal/chunk-VTVCYZFL";
import { a as u } from "@nf-internal/chunk-X6NTZW3L";
import "@nf-internal/chunk-4CLCTAJ7";
import { _IdGenerator as g, FocusMonitor as w } from "@angular/cdk/a11y";
import { UniqueSelectionDispatcher as x } from "@angular/cdk/collections";
import * as i from "@angular/core";
import { forwardRef as M, InjectionToken as k, inject as o, ChangeDetectorRef as y, EventEmitter as I, booleanAttribute as n, ElementRef as v, NgZone as F, Renderer2 as z, Injector as T, HostAttributeToken as q, numberAttribute as f, afterNextRender as P } from "@angular/core";
import { NG_VALUE_ACCESSOR as A } from "@angular/forms";
import { _CdkPrivateStyleLoader as S } from "@angular/cdk/private";
import * as c from "@angular/core";
import "@angular/core";
var E = ["mat-internal-form-field", ""], G = ["*"], p = (() => {
    class r {
        labelPosition = "after";
        static \u0275fac = function (t) { return new (t || r); };
        static \u0275cmp = c.\u0275\u0275defineComponent({ type: r, selectors: [["div", "mat-internal-form-field", ""]], hostAttrs: [1, "mdc-form-field", "mat-internal-form-field"], hostVars: 2, hostBindings: function (t, a) { t & 2 && c.\u0275\u0275classProp("mdc-form-field--align-end", a.labelPosition === "before"); }, inputs: { labelPosition: "labelPosition" }, attrs: E, ngContentSelectors: G, decls: 1, vars: 0, template: function (t, a) { t & 1 && (c.\u0275\u0275projectionDef(), c.\u0275\u0275projection(0)); }, styles: [`.mat-internal-form-field{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-flex;align-items:center;vertical-align:middle}.mat-internal-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mat-internal-form-field>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0}
`], encapsulation: 2, changeDetection: 0 });
    }
    return r;
})();
import { BidiModule as O } from "@angular/cdk/bidi";
import "@angular/cdk/layout";
import "@angular/cdk/platform";
import "@angular/cdk/coercion";
var V = ["input"], B = ["formField"], L = ["*"], l = class {
    source;
    value;
    constructor(D, e) { this.source = D, this.value = e; }
}, j = { provide: A, useExisting: M(() => Q), multi: !0 }, C = new k("MatRadioGroup"), N = new k("mat-radio-default-options", { providedIn: "root", factory: () => ({ color: "accent", disabledInteractive: !1 }) }), Q = (() => { class r {
    _changeDetector = o(y);
    _value = null;
    _name = o(g).getId("mat-radio-group-");
    _selected = null;
    _isInitialized = !1;
    _labelPosition = "after";
    _disabled = !1;
    _required = !1;
    _buttonChanges;
    _controlValueAccessorChangeFn = () => { };
    onTouched = () => { };
    change = new I;
    _radios;
    color;
    get name() { return this._name; }
    set name(e) { this._name = e, this._updateRadioButtonNames(); }
    get labelPosition() { return this._labelPosition; }
    set labelPosition(e) { this._labelPosition = e === "before" ? "before" : "after", this._markRadiosForCheck(); }
    get value() { return this._value; }
    set value(e) { this._value !== e && (this._value = e, this._updateSelectedRadioFromValue(), this._checkSelectedRadioButton()); }
    _checkSelectedRadioButton() { this._selected && !this._selected.checked && (this._selected.checked = !0); }
    get selected() { return this._selected; }
    set selected(e) { this._selected = e, this.value = e ? e.value : null, this._checkSelectedRadioButton(); }
    get disabled() { return this._disabled; }
    set disabled(e) { this._disabled = e, this._markRadiosForCheck(); }
    get required() { return this._required; }
    set required(e) { this._required = e, this._markRadiosForCheck(); }
    get disabledInteractive() { return this._disabledInteractive; }
    set disabledInteractive(e) { this._disabledInteractive = e, this._markRadiosForCheck(); }
    _disabledInteractive = !1;
    constructor() { }
    ngAfterContentInit() { this._isInitialized = !0, this._buttonChanges = this._radios.changes.subscribe(() => { this.selected && !this._radios.find(e => e === this.selected) && (this._selected = null); }); }
    ngOnDestroy() { this._buttonChanges?.unsubscribe(); }
    _touch() { this.onTouched && this.onTouched(); }
    _updateRadioButtonNames() { this._radios && this._radios.forEach(e => { e.name = this.name, e._markForCheck(); }); }
    _updateSelectedRadioFromValue() { let e = this._selected !== null && this._selected.value === this._value; this._radios && !e && (this._selected = null, this._radios.forEach(t => { t.checked = this.value === t.value, t.checked && (this._selected = t); })); }
    _emitChangeEvent() { this._isInitialized && this.change.emit(new l(this._selected, this._value)); }
    _markRadiosForCheck() { this._radios && this._radios.forEach(e => e._markForCheck()); }
    writeValue(e) { this.value = e, this._changeDetector.markForCheck(); }
    registerOnChange(e) { this._controlValueAccessorChangeFn = e; }
    registerOnTouched(e) { this.onTouched = e; }
    setDisabledState(e) { this.disabled = e, this._changeDetector.markForCheck(); }
    static \u0275fac = function (t) { return new (t || r); };
    static \u0275dir = i.\u0275\u0275defineDirective({ type: r, selectors: [["mat-radio-group"]], contentQueries: function (t, a, d) { if (t & 1 && i.\u0275\u0275contentQuery(d, R, 5), t & 2) {
            let s;
            i.\u0275\u0275queryRefresh(s = i.\u0275\u0275loadQuery()) && (a._radios = s);
        } }, hostAttrs: ["role", "radiogroup", 1, "mat-mdc-radio-group"], inputs: { color: "color", name: "name", labelPosition: "labelPosition", value: "value", selected: "selected", disabled: [2, "disabled", "disabled", n], required: [2, "required", "required", n], disabledInteractive: [2, "disabledInteractive", "disabledInteractive", n] }, outputs: { change: "change" }, exportAs: ["matRadioGroup"], features: [i.\u0275\u0275ProvidersFeature([j, { provide: C, useExisting: r }])] });
} return r; })(), R = (() => {
    class r {
        _elementRef = o(v);
        _changeDetector = o(y);
        _focusMonitor = o(w);
        _radioDispatcher = o(x);
        _defaultOptions = o(N, { optional: !0 });
        _ngZone = o(F);
        _renderer = o(z);
        _uniqueId = o(g).getId("mat-radio-");
        _cleanupClick;
        id = this._uniqueId;
        name;
        ariaLabel;
        ariaLabelledby;
        ariaDescribedby;
        disableRipple = !1;
        tabIndex = 0;
        get checked() { return this._checked; }
        set checked(e) { this._checked !== e && (this._checked = e, e && this.radioGroup && this.radioGroup.value !== this.value ? this.radioGroup.selected = this : !e && this.radioGroup && this.radioGroup.value === this.value && (this.radioGroup.selected = null), e && this._radioDispatcher.notify(this.id, this.name), this._changeDetector.markForCheck()); }
        get value() { return this._value; }
        set value(e) { this._value !== e && (this._value = e, this.radioGroup !== null && (this.checked || (this.checked = this.radioGroup.value === e), this.checked && (this.radioGroup.selected = this))); }
        get labelPosition() { return this._labelPosition || this.radioGroup && this.radioGroup.labelPosition || "after"; }
        set labelPosition(e) { this._labelPosition = e; }
        _labelPosition;
        get disabled() { return this._disabled || this.radioGroup !== null && this.radioGroup.disabled; }
        set disabled(e) { this._setDisabled(e); }
        get required() { return this._required || this.radioGroup && this.radioGroup.required; }
        set required(e) { e !== this._required && this._changeDetector.markForCheck(), this._required = e; }
        get color() { return this._color || this.radioGroup && this.radioGroup.color || this._defaultOptions && this._defaultOptions.color || "accent"; }
        set color(e) { this._color = e; }
        _color;
        get disabledInteractive() { return this._disabledInteractive || this.radioGroup !== null && this.radioGroup.disabledInteractive; }
        set disabledInteractive(e) { this._disabledInteractive = e; }
        _disabledInteractive;
        change = new I;
        radioGroup;
        get inputId() { return `${this.id || this._uniqueId}-input`; }
        _checked = !1;
        _disabled = !1;
        _required = !1;
        _value = null;
        _removeUniqueSelectionListener = () => { };
        _previousTabIndex;
        _inputElement;
        _rippleTrigger;
        _noopAnimations = u();
        _injector = o(T);
        constructor() { o(S).load(_); let e = o(C, { optional: !0 }), t = o(new q("tabindex"), { optional: !0 }); this.radioGroup = e, this._disabledInteractive = this._defaultOptions?.disabledInteractive ?? !1, t && (this.tabIndex = f(t, 0)); }
        focus(e, t) { t ? this._focusMonitor.focusVia(this._inputElement, t, e) : this._inputElement.nativeElement.focus(e); }
        _markForCheck() { this._changeDetector.markForCheck(); }
        ngOnInit() { this.radioGroup && (this.checked = this.radioGroup.value === this._value, this.checked && (this.radioGroup.selected = this), this.name = this.radioGroup.name), this._removeUniqueSelectionListener = this._radioDispatcher.listen((e, t) => { e !== this.id && t === this.name && (this.checked = !1); }); }
        ngDoCheck() { this._updateTabIndex(); }
        ngAfterViewInit() { this._updateTabIndex(), this._focusMonitor.monitor(this._elementRef, !0).subscribe(e => { !e && this.radioGroup && this.radioGroup._touch(); }), this._ngZone.runOutsideAngular(() => { this._cleanupClick = this._renderer.listen(this._inputElement.nativeElement, "click", this._onInputClick); }); }
        ngOnDestroy() { this._cleanupClick?.(), this._focusMonitor.stopMonitoring(this._elementRef), this._removeUniqueSelectionListener(); }
        _emitChangeEvent() { this.change.emit(new l(this, this._value)); }
        _isRippleDisabled() { return this.disableRipple || this.disabled; }
        _onInputInteraction(e) { if (e.stopPropagation(), !this.checked && !this.disabled) {
            let t = this.radioGroup && this.value !== this.radioGroup.value;
            this.checked = !0, this._emitChangeEvent(), this.radioGroup && (this.radioGroup._controlValueAccessorChangeFn(this.value), t && this.radioGroup._emitChangeEvent());
        } }
        _onTouchTargetClick(e) { this._onInputInteraction(e), (!this.disabled || this.disabledInteractive) && this._inputElement?.nativeElement.focus(); }
        _setDisabled(e) { this._disabled !== e && (this._disabled = e, this._changeDetector.markForCheck()); }
        _onInputClick = e => { this.disabled && this.disabledInteractive && e.preventDefault(); };
        _updateTabIndex() { let e = this.radioGroup, t; if (!e || !e.selected || this.disabled ? t = this.tabIndex : t = e.selected === this ? this.tabIndex : -1, t !== this._previousTabIndex) {
            let a = this._inputElement?.nativeElement;
            a && (a.setAttribute("tabindex", t + ""), this._previousTabIndex = t, P(() => { queueMicrotask(() => { e && e.selected && e.selected !== this && document.activeElement === a && (e.selected?._inputElement.nativeElement.focus(), document.activeElement === a && this._inputElement.nativeElement.blur()); }); }, { injector: this._injector }));
        } }
        static \u0275fac = function (t) { return new (t || r); };
        static \u0275cmp = i.\u0275\u0275defineComponent({ type: r, selectors: [["mat-radio-button"]], viewQuery: function (t, a) { if (t & 1 && i.\u0275\u0275viewQuery(V, 5)(B, 7, v), t & 2) {
                let d;
                i.\u0275\u0275queryRefresh(d = i.\u0275\u0275loadQuery()) && (a._inputElement = d.first), i.\u0275\u0275queryRefresh(d = i.\u0275\u0275loadQuery()) && (a._rippleTrigger = d.first);
            } }, hostAttrs: [1, "mat-mdc-radio-button"], hostVars: 19, hostBindings: function (t, a) { t & 1 && i.\u0275\u0275listener("focus", function () { return a._inputElement.nativeElement.focus(); }), t & 2 && (i.\u0275\u0275attribute("id", a.id)("tabindex", null)("aria-label", null)("aria-labelledby", null)("aria-describedby", null), i.\u0275\u0275classProp("mat-primary", a.color === "primary")("mat-accent", a.color === "accent")("mat-warn", a.color === "warn")("mat-mdc-radio-checked", a.checked)("mat-mdc-radio-disabled", a.disabled)("mat-mdc-radio-disabled-interactive", a.disabledInteractive)("_mat-animation-noopable", a._noopAnimations)); }, inputs: { id: "id", name: "name", ariaLabel: [0, "aria-label", "ariaLabel"], ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"], ariaDescribedby: [0, "aria-describedby", "ariaDescribedby"], disableRipple: [2, "disableRipple", "disableRipple", n], tabIndex: [2, "tabIndex", "tabIndex", e => e == null ? 0 : f(e)], checked: [2, "checked", "checked", n], value: "value", labelPosition: "labelPosition", disabled: [2, "disabled", "disabled", n], required: [2, "required", "required", n], color: "color", disabledInteractive: [2, "disabledInteractive", "disabledInteractive", n] }, outputs: { change: "change" }, exportAs: ["matRadioButton"], ngContentSelectors: L, decls: 13, vars: 17, consts: [["formField", ""], ["input", ""], ["mat-internal-form-field", "", 3, "labelPosition"], [1, "mdc-radio"], [1, "mat-mdc-radio-touch-target", 3, "click"], ["type", "radio", "aria-invalid", "false", 1, "mdc-radio__native-control", 3, "change", "id", "checked", "disabled", "required"], [1, "mdc-radio__background"], [1, "mdc-radio__outer-circle"], [1, "mdc-radio__inner-circle"], ["mat-ripple", "", 1, "mat-radio-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mat-ripple-element", "mat-radio-persistent-ripple"], [1, "mdc-label", 3, "for"]], template: function (t, a) { if (t & 1) {
                let d = i.\u0275\u0275getCurrentView();
                i.\u0275\u0275projectionDef(), i.\u0275\u0275elementStart(0, "div", 2, 0)(2, "div", 3)(3, "div", 4), i.\u0275\u0275listener("click", function (m) { return i.\u0275\u0275restoreView(d), i.\u0275\u0275resetView(a._onTouchTargetClick(m)); }), i.\u0275\u0275elementEnd(), i.\u0275\u0275elementStart(4, "input", 5, 1), i.\u0275\u0275listener("change", function (m) { return i.\u0275\u0275restoreView(d), i.\u0275\u0275resetView(a._onInputInteraction(m)); }), i.\u0275\u0275elementEnd(), i.\u0275\u0275elementStart(6, "div", 6), i.\u0275\u0275element(7, "div", 7)(8, "div", 8), i.\u0275\u0275elementEnd(), i.\u0275\u0275elementStart(9, "div", 9), i.\u0275\u0275element(10, "div", 10), i.\u0275\u0275elementEnd()(), i.\u0275\u0275elementStart(11, "label", 11), i.\u0275\u0275projection(12), i.\u0275\u0275elementEnd()();
            } t & 2 && (i.\u0275\u0275property("labelPosition", a.labelPosition), i.\u0275\u0275advance(2), i.\u0275\u0275classProp("mdc-radio--disabled", a.disabled), i.\u0275\u0275advance(2), i.\u0275\u0275property("id", a.inputId)("checked", a.checked)("disabled", a.disabled && !a.disabledInteractive)("required", a.required), i.\u0275\u0275attribute("name", a.name)("value", a.value)("aria-label", a.ariaLabel)("aria-labelledby", a.ariaLabelledby)("aria-describedby", a.ariaDescribedby)("aria-disabled", a.disabled && a.disabledInteractive ? "true" : null), i.\u0275\u0275advance(5), i.\u0275\u0275property("matRippleTrigger", a._rippleTrigger.nativeElement)("matRippleDisabled", a._isRippleDisabled())("matRippleCentered", !0), i.\u0275\u0275advance(2), i.\u0275\u0275property("for", a.inputId)); }, dependencies: [b, p], styles: [`.mat-mdc-radio-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-radio-button .mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color;padding:calc((var(--mat-radio-state-layer-size, 40px) - 20px)/2)}.mat-mdc-radio-button .mdc-radio:hover>.mdc-radio__native-control:not([disabled]):not(:focus)~.mdc-radio__background::before{opacity:.04;transform:scale(1)}.mat-mdc-radio-button .mdc-radio:hover>.mdc-radio__native-control:not([disabled])~.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-unselected-hover-icon-color, var(--mat-sys-on-surface))}.mat-mdc-radio-button .mdc-radio:hover>.mdc-radio__native-control:enabled:checked+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-selected-hover-icon-color, var(--mat-sys-primary))}.mat-mdc-radio-button .mdc-radio:hover>.mdc-radio__native-control:enabled:checked+.mdc-radio__background>.mdc-radio__inner-circle{background-color:var(--mat-radio-selected-hover-icon-color, var(--mat-sys-primary, currentColor))}.mat-mdc-radio-button .mdc-radio:active>.mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-unselected-pressed-icon-color, var(--mat-sys-on-surface))}.mat-mdc-radio-button .mdc-radio:active>.mdc-radio__native-control:enabled:checked+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-selected-pressed-icon-color, var(--mat-sys-primary))}.mat-mdc-radio-button .mdc-radio:active>.mdc-radio__native-control:enabled:checked+.mdc-radio__background>.mdc-radio__inner-circle{background-color:var(--mat-radio-selected-pressed-icon-color, var(--mat-sys-primary, currentColor))}.mat-mdc-radio-button .mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mat-mdc-radio-button .mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 90ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms cubic-bezier(0.4, 0, 0.6, 1);width:var(--mat-radio-state-layer-size, 40px);height:var(--mat-radio-state-layer-size, 40px);top:calc(-1*(var(--mat-radio-state-layer-size, 40px) - 20px)/2);left:calc(-1*(var(--mat-radio-state-layer-size, 40px) - 20px)/2)}.mat-mdc-radio-button .mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 90ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-radio-button .mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0);border-radius:50%;transition:transform 90ms cubic-bezier(0.4, 0, 0.6, 1),background-color 90ms cubic-bezier(0.4, 0, 0.6, 1)}@media(forced-colors: active){.mat-mdc-radio-button .mdc-radio__inner-circle{background-color:CanvasText !important}}.mat-mdc-radio-button .mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;top:0;right:0;left:0;cursor:inherit;z-index:1;width:var(--mat-radio-state-layer-size, 40px);height:var(--mat-radio-state-layer-size, 40px)}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background,.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 90ms cubic-bezier(0, 0, 0.2, 1),transform 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background>.mdc-radio__outer-circle,.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__outer-circle{transition:border-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background>.mdc-radio__inner-circle,.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__inner-circle{transition:transform 90ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 90ms cubic-bezier(0, 0, 0.2, 1),transform 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-disabled-unselected-icon-color, var(--mat-sys-on-surface));opacity:var(--mat-radio-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background{cursor:default}.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface));opacity:var(--mat-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-radio-button .mdc-radio__native-control:disabled+.mdc-radio__background>.mdc-radio__inner-circle{background-color:var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface, currentColor));opacity:var(--mat-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-radio-button .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-unselected-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-selected-icon-color, var(--mat-sys-primary))}.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked+.mdc-radio__background>.mdc-radio__inner-circle{background-color:var(--mat-radio-selected-icon-color, var(--mat-sys-primary, currentColor))}.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-selected-focus-icon-color, var(--mat-sys-primary))}.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked+.mdc-radio__background>.mdc-radio__inner-circle{background-color:var(--mat-radio-selected-focus-icon-color, var(--mat-sys-primary, currentColor))}.mat-mdc-radio-button .mdc-radio__native-control:checked+.mdc-radio__background>.mdc-radio__inner-circle{transform:scale(0.5);transition:transform 90ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled{pointer-events:auto}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:not(:checked)+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-disabled-unselected-icon-color, var(--mat-sys-on-surface));opacity:var(--mat-radio-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled:hover .mdc-radio__native-control:checked+.mdc-radio__background>.mdc-radio__outer-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus+.mdc-radio__background>.mdc-radio__outer-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control+.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface));opacity:var(--mat-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled:hover .mdc-radio__native-control:checked+.mdc-radio__background>.mdc-radio__inner-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus+.mdc-radio__background>.mdc-radio__inner-circle,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control+.mdc-radio__background>.mdc-radio__inner-circle{background-color:var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface, currentColor));opacity:var(--mat-radio-disabled-selected-icon-opacity, 0.38)}.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__background::before,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__outer-circle,.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__inner-circle{transition:none !important}.mat-mdc-radio-button label{cursor:pointer}.mat-mdc-radio-button .mdc-radio__background::before{background-color:var(--mat-radio-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element,.mat-mdc-radio-button.mat-mdc-radio-checked .mdc-radio__background::before{background-color:var(--mat-radio-checked-ripple-color, var(--mat-sys-primary))}.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mat-ripple-element,.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__background::before{background-color:var(--mat-radio-ripple-color, var(--mat-sys-on-surface))}.mat-mdc-radio-button .mat-internal-form-field{color:var(--mat-radio-label-text-color, var(--mat-sys-on-surface));font-family:var(--mat-radio-label-text-font, var(--mat-sys-body-medium-font));line-height:var(--mat-radio-label-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mat-radio-label-text-size, var(--mat-sys-body-medium-size));letter-spacing:var(--mat-radio-label-text-tracking, var(--mat-sys-body-medium-tracking));font-weight:var(--mat-radio-label-text-weight, var(--mat-sys-body-medium-weight))}.mat-mdc-radio-button .mdc-radio--disabled+label{color:var(--mat-radio-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-radio-button .mat-radio-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:50%}.mat-mdc-radio-button .mat-radio-ripple>.mat-ripple-element{opacity:.14}.mat-mdc-radio-button .mat-radio-ripple::before{border-radius:50%}.mat-mdc-radio-button .mdc-radio>.mdc-radio__native-control:focus:enabled:not(:checked)~.mdc-radio__background>.mdc-radio__outer-circle{border-color:var(--mat-radio-unselected-focus-icon-color, var(--mat-sys-on-surface))}.mat-mdc-radio-button.cdk-focused .mat-focus-indicator::before{content:""}.mat-mdc-radio-disabled{cursor:default;pointer-events:none}.mat-mdc-radio-disabled.mat-mdc-radio-disabled-interactive{pointer-events:auto}.mat-mdc-radio-touch-target{position:absolute;top:50%;left:50%;height:var(--mat-radio-touch-target-size, 48px);width:var(--mat-radio-touch-target-size, 48px);transform:translate(-50%, -50%);display:var(--mat-radio-touch-target-display, block)}[dir=rtl] .mat-mdc-radio-touch-target{left:auto;right:50%;transform:translate(50%, -50%)}
`], encapsulation: 2, changeDetection: 0 });
    }
    return r;
})(), ke = (() => { class r {
    static \u0275fac = function (t) { return new (t || r); };
    static \u0275mod = i.\u0275\u0275defineNgModule({ type: r });
    static \u0275inj = i.\u0275\u0275defineInjector({ imports: [h, R, O] });
} return r; })();
export { N as MAT_RADIO_DEFAULT_OPTIONS, C as MAT_RADIO_GROUP, j as MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, R as MatRadioButton, l as MatRadioChange, Q as MatRadioGroup, ke as MatRadioModule };
